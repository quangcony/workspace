import { Button, Col, Form, Input, Row, Select, Tooltip } from "antd";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import bloodPressuresApi from "../../../../../api/bloodPressuresApi";
import physicalDetailApi from "../../../../../api/physicalDetailApi";
import { newestPhysicalDetailState } from "../../../../../recoil/atom/physicalDetailState";
import {
  newestPhysicalExamState,
  physicalExamSelectState
} from "../../../../../recoil/atom/physicalExamState";
import { tabActiveState } from "../../../../../recoil/atom/tabActiveState";

const FrmPhysicalExamination = ({ onKeyChange, FrmPhysicalExamRef }) => {
  const [form] = Form.useForm();
  const PersonalHeigh = Form.useWatch('PERSONAL_HEIGH', form);
  const PersonalWeight = Form.useWatch('PERSONAL_WEIGHT', form);
  const { enqueueSnackbar } = useSnackbar();

  const newestPhysicalExam = useRecoilValue(newestPhysicalExamState);
  const physicalExam = useRecoilValue(physicalExamSelectState);
  const [newestPhysicalDetail, setNewestPhysicalDetail] = useRecoilState(newestPhysicalDetailState);
  const [tabActive, setTabActive] = useRecoilState(tabActiveState);

  const regexNum = /^\d+$/;
  const regexHeigh = /^\d+\.?\d*$/;
  const regexBP = /^\d{2,3}\/+\d{2,3}$/;

  const [validateHeigh, setValidateHeigh] = useState(true);
  const [isChangeUnit, setIsChangeUnit] = useState(false);
  const [selectValue, setSelectValue] = useState("m");

  const handleSelect = (value) => {
    setSelectValue(value);
    setIsChangeUnit(true);
  };

  useEffect(() => {
    if (physicalExam) {
      const physicalDetail = physicalExam?.Physical_Details[0];
      setSelectValue('m');
      form.setFieldsValue({
        PERSONAL_HEIGH: physicalDetail?.PERSONAL_HEIGH,
        PERSONAL_WEIGHT: physicalDetail?.PERSONAL_WEIGHT,
        BLOOD_PRESSURE: physicalDetail?.Blood_Pressures[0]?.VALUE,
        BLOOD_VESSEL: physicalDetail?.BLOOD_VESSEL,
      })
    }
  }, [physicalExam, form])

  useEffect(() => {
    if (PersonalHeigh) {
      form
        .validateFields(["PERSONAL_HEIGH"])
        .then(() => {
          setValidateHeigh(true);
        })
        .catch(() => {
          setValidateHeigh(false);
        });
    }
    if (PersonalHeigh && PersonalWeight && validateHeigh) {
      if (selectValue === "cm") {
        const newHeight = PersonalHeigh / 100;
        form.setFieldsValue({
          BMI_INDEX: (Number(PersonalWeight) / Math.pow(newHeight, 2)).toFixed(2)
        });
        return;
      }
      form.setFieldsValue({
        BMI_INDEX: (Number(PersonalWeight) / Math.pow(Number(PersonalHeigh), 2)).toFixed(2)
      });
      return;
    }
    form.setFieldsValue({ BMI_INDEX: undefined });
  }, [form, PersonalHeigh, PersonalWeight, selectValue, validateHeigh]);

  useEffect(() => {
    if (validateHeigh) {
      if (isChangeUnit) {
        if (selectValue === 'm') {
          form.setFieldsValue({ PERSONAL_HEIGH: (Number(PersonalHeigh) / 100).toFixed(2) });
        } else {
          form.setFieldsValue({ PERSONAL_HEIGH: Number(PersonalHeigh) * 100 });
        }
        setIsChangeUnit(false);
      }
    }
  }, [selectValue, form])

  const handleUpdatePhysicalDetail = async (value) => {
    const id = physicalExam ? physicalExam?.Physical_Details[0]?.id : newestPhysicalDetail?.id;
    try {
      const res = await physicalDetailApi.updatePhysicalDetail(value, id);
      if (res.data) {
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };
  const handleCreateBloodPressure = async (value) => {
    await bloodPressuresApi.createBloodPressure(value);
  };
  const handleUpdateBloodPressure = async (data) => {
    const id = physicalExam
      ? physicalExam?.Physical_Details[0]?.Blood_Pressures[0]?.id
      : newestPhysicalDetail?.Blood_Pressures[0]?.id
    await bloodPressuresApi.updateBloodPressure(data, id);
  };

  const handleCreateData = () => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const { BLOOD_PRESSURE, ...result } = newData;
    const { BLOOD_VESSEL, PERSONAL_HEIGH, PERSONAL_WEIGHT } = newData;
    if (
      BLOOD_PRESSURE === undefined ||
      BLOOD_VESSEL === undefined ||
      PERSONAL_HEIGH === undefined ||
      PERSONAL_WEIGHT === undefined ||
      validateHeigh === false
    ) {
      return;
    }

    if (selectValue === "cm") {
      result.PERSONAL_HEIGH /= 100;
    }

    if (physicalExam?.Physical_Details.length || newestPhysicalDetail) {
      handleUpdatePhysicalDetail(result);
      handleUpdateBloodPressure({ VALUE: BLOOD_PRESSURE });
    } else {
      (async () => {
        try {
          const res = await physicalDetailApi.createPhysicalDetail({
            PHYSICAL_EXAM_ID: physicalExam ? physicalExam.id : newestPhysicalExam.id,
            ...result
          });
          if (res.data) {
            setNewestPhysicalDetail(res.data.elements);
            handleCreateBloodPressure({
              VALUE: BLOOD_PRESSURE,
              TYPE: 6,
              PHYSICAL_DETAIL_ID: res.data.elements.id,
              EXAM_DATE: physicalExam ? physicalExam?.PHYSICAL_DATE : newestPhysicalExam?.PHYSICAL_DATE,
            })
            enqueueSnackbar(res.data.message, { variant: "success" });
          }
        } catch (error) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
      })()
    }
    setTabActive({ ...tabActive, clinicalExam: false });
    onKeyChange("4");
  };

  return (
    <>
      <Form
        form={form}
        colon={false}
        ref={FrmPhysicalExamRef}
        name="physicalExamination"
        labelAlign="left"
        labelCol={{ span: 6 }}
        autoComplete="off"
        style={{ marginTop: 20 }}
        onFinish={handleCreateData}
      >
        <Row justify="center">
          <Col xs={24} md={16} lg={12}>
            <Row>
              <Col span={20}>
                <Form.Item
                  name="PERSONAL_HEIGH"
                  label='Chiều cao'
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập chiều cao.",
                    },
                    {
                      validator(_, value) {
                        if (!value || regexHeigh.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "Chiều cao chỉ nhận giá trị là số"
                        );
                      },
                    },
                    {
                      validator(_, value) {
                        let min, max;
                        if (selectValue === "m") {
                          min = 1;
                          max = 2.5;
                        } else {
                          min = 100;
                          max = 250;
                        }
                        if (
                          (value && Number(value) < min) ||
                          (value && Number(value) > max)
                        ) {
                          return Promise.reject(
                            `Chiều cao nằm trong khoảng ${min + selectValue
                            } -  ${max + selectValue}`
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input allowClear placeholder="Ví dụ: 1.60m hoặc 160cm" />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Select defaultValue={selectValue} onSelect={handleSelect}>
                  <Select.Option value="m">m</Select.Option>
                  <Select.Option value="cm">cm</Select.Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Form.Item
                  name="PERSONAL_WEIGHT"
                  label='Cân nặng'
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập cân nặng.",
                    },
                    {
                      validator(_, value) {
                        if (!value || regexNum.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "Cân nặng chỉ nhận giá trị là số (tối đa 3 ký tự)"
                        );
                      },
                    },
                    {
                      validator(_, value) {
                        let min = 30,
                          max = 120;
                        if (
                          (value && Number(value) < min) ||
                          (value && Number(value) > max)
                        ) {
                          return Promise.reject(
                            `Cân nặng nằm trong khoảng ${min}kg -  ${max}kg`
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input allowClear placeholder="Ví dụ: 50kg" />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <span>kg</span>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Form.Item
                  name="BMI_INDEX"
                  label='Chỉ số BMI'
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <span>
                  kg/m<sup>2</sup>
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Form.Item
                  name="BLOOD_PRESSURE"
                  label='Huyết áp'
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập huyết áp.",
                    },
                    {
                      validator(_, value) {
                        if (!value) {
                          return Promise.resolve();
                        }
                        if (!value || regexBP.test(value)) {
                          const data = value.split('/');
                          if (data[0] / data[1] > 1) {
                            return Promise.resolve();
                          }
                          if (data[0] / data[1] < 1) {
                            return Promise.reject('Chỉ số tâm thu phải lớn hơn chỉ số tâm trương!');
                          }
                          return Promise.reject();
                        }
                        else {
                          return Promise.reject(`Hình thức nhập không đúng. 
                          Vui lòng nhập theo hình thức [tâm thu/tâm trương]. Ví dụ: 120/90`);
                        }
                      },
                    },
                  ]}
                >
                  <Input allowClear placeholder="Ví dụ: 120/80" />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <span>mmHg</span>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Form.Item
                  name="BLOOD_VESSEL"
                  label='Mạch'
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mạch.",
                    },
                    {
                      validator(_, value) {
                        if (!value || regexNum.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Mạch chỉ nhận giá trị là số');
                      },
                    },
                    {
                      validator(_, value) {
                        let min = 35, max = 140;
                        if ((value && Number(value) < min) || (value && Number(value) > max)) {
                          return Promise.reject(`Mạch nằm trong khoảng ${min} lần/phút -  ${max} lần/phút`);
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input allowClear placeholder="Ví dụ: 89 lần/phút" />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <span>Lần/phút</span>
              </Col>
            </Row>
          </Col>
          <Col span={20}>
            <Form.Item>
              <Row justify="space-between">
                <Col>
                  <Button onClick={() => onKeyChange("2")}>Quay lại</Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Tiếp
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default FrmPhysicalExamination;
