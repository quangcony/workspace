import { Button, Col, Form, Input, Row, Select, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import bloodPressuresApi from "../../../../api/bloodPressuresApi";
import physicalDetailApi from "../../../../api/physicalDetailApi";
import { newestPhysicalDetailState } from "../../../../recoil/atom/physicalDetailState";
import {
  newestPhysicalExamState,
  physicalExamSelectState
} from "../../../../recoil/atom/physicalExamState";
import { tabActiveState } from "../../../../recoil/atom/tabActiveState";

const validateMessages = {
  required: "Trường này không được để trống!",
};

const FrmPhysicalExamination = ({ onKeyChange, FrmPhysicalExamRef }) => {
  const newestPhysicalExam = useRecoilValue(newestPhysicalExamState);
  const newestPhysicalDetail = useRecoilValue(newestPhysicalDetailState);
  const physicalExam = useRecoilValue(physicalExamSelectState);
  const [validateHeigh, setValidateHeigh] = useState(true);
  const [tabActive, setTabActive] = useRecoilState(tabActiveState);

  const regexNum = /^\d+$/;
  const regexHeigh = /^\d+\.?\d*$/;
  const regexBP = /^\d{2,3}\/+\d{2,3}$/;

  const [form] = Form.useForm();
  const [selectValue, setSelectValue] = useState("m");
  const [BMI, setBMI] = useState({
    PERSONAL_HEIGH: undefined,
    PERSONAL_WEIGHT: undefined,
  });

  const handleSelect = (value) => {
    setSelectValue(value);
  };

  const handleFormChange = (value) => {
    setBMI({
      ...BMI,
      ...value,
    });
  };
  useEffect(() => {
    if (physicalExam) {
      const physicalDetail = physicalExam?.Physical_Details[0];
      setBMI({
        PERSONAL_HEIGH: physicalDetail?.PERSONAL_HEIGH,
        PERSONAL_WEIGHT: physicalDetail?.PERSONAL_WEIGHT,
      });
      setSelectValue('m')
      form.setFieldsValue({
        PERSONAL_HEIGH: physicalDetail?.PERSONAL_HEIGH,
        PERSONAL_WEIGHT: physicalDetail?.PERSONAL_WEIGHT,
        BLOOD_PRESSURE: physicalDetail?.Blood_Pressures[0]?.VALUE,
        BLOOD_VESSEL: physicalDetail?.BLOOD_VESSEL,
      });
    }
  }, [physicalExam, form]);

  useEffect(() => {
    if (BMI.PERSONAL_HEIGH) {
      form
        .validateFields(["PERSONAL_HEIGH"])
        .then(() => {
          setValidateHeigh(true);
        })
        .catch(() => {
          setValidateHeigh(false);
        });
    }
    if (BMI.PERSONAL_HEIGH && BMI.PERSONAL_WEIGHT && validateHeigh) {
      if (selectValue === "cm") {
        const newHeight = BMI.PERSONAL_HEIGH / 100;
        form.setFieldsValue({
          BMI_INDEX: (
            Number(BMI.PERSONAL_WEIGHT) / Math.pow(newHeight, 2)
          ).toFixed(2),
        });
        return;
      }
      form.setFieldsValue({
        BMI_INDEX: (
          Number(BMI.PERSONAL_WEIGHT) / Math.pow(Number(BMI.PERSONAL_HEIGH), 2)
        ).toFixed(2),
      });
      return;
    }
    form.setFieldsValue({ BMI_INDEX: undefined });
  }, [form, BMI, selectValue, validateHeigh]);

  const handleUpdatePhysicalDetail = async (value, id) => {
    await physicalDetailApi.updatePhysicalDetail(value, id);
  };
  const handleCreateBloodPressure = async (value) => {
    await bloodPressuresApi.createBloodPressure(value);
  };
  const handleUpdateBloodPressure = async (data, id) => {
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

    const bloodPressureData = {
      VALUE: newData?.BLOOD_PRESSURE,
      TYPE: 6,
      PHYSICAL_DETAIL_ID: newestPhysicalDetail?.id,
      EXAM_DATE: newestPhysicalExam?.PHYSICAL_DATE,
    };

    if (selectValue === "cm") {
      result.PERSONAL_HEIGH /= 100;
    }

    if (physicalExam) {
      if (
        PERSONAL_HEIGH !== physicalExam?.Physical_Details[0]?.PERSONAL_HEIGH ||
        PERSONAL_WEIGHT !==
        physicalExam?.Physical_Details[0]?.PERSONAL_WEIGHT ||
        BLOOD_VESSEL !== physicalExam?.Physical_Details[0]?.BLOOD_VESSEL
      ) {
        const data = { ...result, PHYSICAL_EXAM_ID: physicalExam.id };
        handleUpdatePhysicalDetail(data, physicalExam?.Physical_Details[0]?.id);
      }
      if (
        BLOOD_PRESSURE !==
        physicalExam?.Physical_Details[0]?.Blood_Pressures[0]?.VALUE
      ) {
        handleUpdateBloodPressure(
          BLOOD_PRESSURE,
          physicalExam?.Physical_Details[0]?.Blood_Pressures[0]?.id
        );
      }
      onKeyChange("4");
      return;
    }

    const newResult = { ...result, PHYSICAL_EXAM_ID: newestPhysicalExam?.id };
    handleUpdatePhysicalDetail(newResult, newestPhysicalDetail?.id);
    if (tabActive.conclusions) {
      handleCreateBloodPressure(bloodPressureData);
    }
    setTabActive({ ...tabActive, conclusions: false });
    onKeyChange("4");
  };

  return (
    <>
      <Form
        form={form}
        colon={false}
        validateMessages={validateMessages}
        ref={FrmPhysicalExamRef}
        name="physicalExamination"
        labelAlign="left"
        labelCol={{ span: 6 }}
        autoComplete="off"
        style={{ marginTop: 20 }}
        onValuesChange={handleFormChange}
        onFinish={handleCreateData}
      >
        <Row justify="center">
          <Col xs={24} md={16} lg={12}>
            <Row>
              <Col span={20}>
                <Form.Item
                  name="PERSONAL_HEIGH"
                  label={<h5 style={{ color: "red" }}>Chiều cao</h5>}
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
                  label={<h5 style={{ color: "red" }}>Cân nặng</h5>}
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
                  label={<h5 style={{ color: "red" }}>Chỉ số BMI</h5>}
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
                  label={
                    <div style={{ display: "flex" }}>
                      <h5 style={{ marginRight: 5, color: "red" }}>Huyết áp</h5>
                      <Tooltip
                        indexConten="Huyết áp"
                        description="Chỉ số huyết áp là con số đo thể hiện áp lực của máu lên động mạch khi tim co bóp và khi tim giãn ra.Thường chỉ số huyết áp khi dưới dạng tỉ lệ, nghĩa là tâm thu/tâm trương.  Cụ thể, có 2 loại chỉ số đo huyết áp mà bạn cần quan tâm:"
                        description1="Huyết áp tâm thu: là chỉ số huyết áp lớn nhất khi đo (thường nằm ở vị trí phía trên), thể hiện áp lực của máu lên động mạch khi tim đang co bóp."
                        description2="Huyết áp tâm trương: là chỉ số huyết áp thấp nhất khi đo (thường nằm ở vị trí phía dưới), thể hiện áp lực của máu lên động mạch khi tim giãn ra."
                      />
                    </div>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập huyết áp.",
                    },
                    {
                      validator(_, value) {
                        if (!value || regexBP.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "Huyết áp chỉ nhận giá trị là số có định dạng xx/yy (vd: 120/80)"
                        );
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
                  label={<h5 style={{ color: "red" }}>Mạch</h5>}
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
                        return Promise.reject("Mạch chỉ nhận giá trị là số");
                      },
                    },
                    {
                      validator(_, value) {
                        let min = 50,
                          max = 180;
                        if (
                          (value && Number(value) < min) ||
                          (value && Number(value) > max)
                        ) {
                          return Promise.reject(
                            `Mạch nằm trong khoảng ${min} lần/phút -  ${max} lần/phút`
                          );
                        }
                        return Promise.resolve();
                      },
                    },
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
        </Row>
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
      </Form>
    </>
  );
};
export default FrmPhysicalExamination;
