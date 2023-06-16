import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Button, Form, Select, InputNumber, Input } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import { physicalExamNewState } from "../../../../../recoil/atom/physicalExamNew";
import {
  handleBlockEnter,
  regexBP,
  validateMessages,
} from "../../../../../common";
import {
  newestPhysicalDetailState,
  physicalDetailIdState,
  valueHeightState,
  valueWeightState,
} from "../../../../../recoil/atom/physicalDetailState";
import { newestClinicalDetailState } from "../../../../../recoil/atom/clinicalDetailState";
import bloodPressuresApi from "../../../../../api/bloodPressuresApi";

const { Option } = Select;
const style = {
  width: "100%",
};

const FrmPhysicalExamination = ({
  setIsHealthHis,
  setIsPhysicalDetail,
  setIsClinicalExam,
  onKeyChange,
  onUpdatePhysicalDetail,
  onCreateClinicalExam,
  FrmPhysicalExamRef,
}) => {
  const [form] = Form.useForm();
  const typingTimeoutRef = useRef(null);
  const [selectValue, setSelectValue] = useState("m");
  const [valueHeight, setValueHeight] = useRecoilState(valueHeightState);
  const [valueWeight, setValueWeight] = useRecoilState(valueWeightState);
  const [minValue, setMinValue] = useState(0.5);
  const [maxValue, setMaxValue] = useState(2.5);
  const physicalExamSelect = useRecoilValue(physicalExamSelectState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewState);
  const physicalDetail = useRecoilValue(physicalDetailIdState);
  const newPhysicalDetail = useRecoilValue(newestPhysicalDetailState);
  const newClinicDetail = useRecoilValue(newestClinicalDetailState);

  const [bloodPressure, setBloodPressure] = useState();
  const [systolic, setSystolic] = useState();
  const [diastole, setDiastole] = useState();
  const [isChange, setIsChange] = useState(false);

  // GET SYSTOLIC END DIASTOLE
  useEffect(() => {
    const getSystolicAndDiastole = form
      .getFieldValue("BLOOD_PRESSURE")
      ?.split("/");
    if (getSystolicAndDiastole?.length === 2) {
      setSystolic(Number(getSystolicAndDiastole[0]));
      setDiastole(Number(getSystolicAndDiastole[1]));
    }
  }, [form, bloodPressure]);

  const handleChangeBloodPressure = (valuePressure) => {
    setBloodPressure(valuePressure);
  };

  // SET FIELD VALUE FORM
  useEffect(() => {
    if (physicalExamSelect) {
      const data = physicalExamSelect?.Physical_Details[0];
      setValueHeight(data?.PERSONAL_HEIGH);
      setValueWeight(data?.PERSONAL_WEIGHT);
      form.setFieldsValue({
        PERSONAL_HEIGH: data?.PERSONAL_HEIGH,
        PERSONAL_WEIGHT: data?.PERSONAL_WEIGHT,
        BMI_INDEX: data?.BMI_INDEX,
        BLOOD_PRESSURE: data?.Blood_Pressures[0]?.VALUE,
        BLOOD_VESSEL: data?.BLOOD_VESSEL,
      });
    } else if (physicalDetail) {
      setValueHeight(physicalDetail?.PERSONAL_HEIGH);
      setValueWeight(physicalDetail?.PERSONAL_WEIGHT);
    } else if (newPhysicalDetail) {
      setValueHeight(null);
      setValueWeight(null);
    } else {
      form.resetFields();
    }
  }, [physicalExamSelect, physicalDetail, form]);

  // SUBMIT FORM PHYSICAL DETAIL
  const handleGetFields = () => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const { BLOOD_PRESSURE, PERSONAL_HEIGH, ...data } = newData;
    const { BLOOD_VESSEL, PERSONAL_WEIGHT, BMI_INDEX } = newData;
    const result = {
      ...data,
      PERSONAL_HEIGH: PERSONAL_HEIGH,
    };

    if (
      BLOOD_PRESSURE === undefined ||
      BLOOD_VESSEL === undefined ||
      PERSONAL_HEIGH === undefined ||
      PERSONAL_WEIGHT === undefined ||
      BMI_INDEX === undefined
    ) {
      return;
    }
    const bloodPressureData = {
      VALUE: newData?.BLOOD_PRESSURE,
      TYPE: 2,
    };
    // have phisycalExamSelect -> update
    if (physicalExamSelect) {
      if (physicalExamSelect?.Physical_Details[0]?.id) {
        handleUpdatePhysicalDetail(
          {
            ...result,
          },
          physicalExamSelect?.Physical_Details[0]?.id
        );
        if (physicalExamSelect?.Physical_Details[0]?.Blood_Pressures[0]?.id) {
          handleUpdateBloodPressure(
            {
              ...bloodPressureData,
              EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
            },
            physicalExamSelect?.Physical_Details[0]?.Blood_Pressures[0]?.id
          );
        } else {
          handleCreateBloodPressure({
            ...bloodPressureData,
            PHYSICAL_DETAIL_ID: physicalExamSelect?.Physical_Details[0]?.id,
            EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
          });
        }
      } else if (newPhysicalDetail) {
        handleUpdatePhysicalDetail(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          newPhysicalDetail?.id
        );
        handleCreateBloodPressure({
          ...bloodPressureData,
          PHYSICAL_DETAIL_ID: newPhysicalDetail?.id,
          EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
        });
      }
      if (!physicalExamSelect?.Clinical_Details[0]?.id) {
        onCreateClinicalExam();
      }
      setIsPhysicalDetail(true);
      setIsClinicalExam(false);
      setIsChange(false);
      onKeyChange("4");
    }
    // if go back
    else if (newClinicDetail) {
      const newResult = { ...result, PHYSICAL_EXAM_ID: physicalExamGetNew?.id };
      const newBlood = {
        ...bloodPressureData,
        PHYSICAL_DETAIL_ID: newPhysicalDetail?.id,
        EXAM_DATE: physicalExamGetNew?.PHYSICAL_DATE,
      };
      handleUpdatePhysicalDetail(newResult, newPhysicalDetail?.id);
      handleUpdateBloodPressure(
        newBlood,
        physicalDetail?.Blood_Pressures[0]?.id
      );
      setIsPhysicalDetail(true);
      setIsClinicalExam(false);
      setIsChange(false);
      onKeyChange("4");
    }
    // create new
    else {
      const newResult = { ...result, PHYSICAL_EXAM_ID: physicalExamGetNew?.id };
      const newBloodPressure = {
        ...bloodPressureData,
        PHYSICAL_DETAIL_ID: newPhysicalDetail?.id,
        EXAM_DATE: physicalExamGetNew?.PHYSICAL_DATE,
      };
      handleUpdatePhysicalDetail(newResult, newPhysicalDetail?.id);
      handleCreateBloodPressure(newBloodPressure);
      onCreateClinicalExam();
      setIsPhysicalDetail(true);
      setIsClinicalExam(false);
      setIsChange(false);
      onKeyChange("4");
    }
  };
  // UPDATE PHYSYCAL DETAIL
  const handleUpdatePhysicalDetail = async (value, id) => {
    await onUpdatePhysicalDetail(value, id);
    setValueWeight(undefined);
    setValueHeight(undefined);
  };
  // CREATE BLOOD PRESSURE
  const handleCreateBloodPressure = async (data) => {
    try {
      let res = bloodPressuresApi.createBloodPressure(data);
      if (res.data) {
        await bloodPressuresApi.getAllBloodPressures();
      }
    } catch (error) {
      console.log("error");
    }
  };
  //UPDATE BLOOD PRESSURE
  const handleUpdateBloodPressure = async (data, id) => {
    try {
      let res = bloodPressuresApi.updateBloodPressure(data, id);
      if (res.data) {
        await bloodPressuresApi.getAllBloodPressures();
      }
    } catch (error) {
      console.log("error");
    }
  };

  // GET VALUE HEIGHT
  const handleChangeHeight = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setValueHeight(Number(value));
    }, 100);
    setIsChange(true);
  };

  // SELECT UNIT HEIGHT
  const handleSelect = (value) => {
    setSelectValue(value);
    setIsChange(false);
    form.setFieldsValue({ PERSONAL_HEIGH: valueHeight ? valueHeight : null });
  };

  // GET VALUE WEIGHT
  const handleChangeWeight = (valueWeight) => {
    setValueWeight(Number(valueWeight));
  };

  // HANDLE BACK
  const handleBack = async () => {
    await onKeyChange("2");
    setIsHealthHis(false);
    setIsPhysicalDetail(true);
    setIsChange(false);
  };

  // HANDLE CHANGE BMI
  useEffect(() => {
    if (valueHeight && valueWeight && selectValue === "m") {
      const BMI1 = +(
        Math.round(valueWeight / (valueHeight * valueHeight) + "e+2") + "e-2"
      );
      form.setFieldsValue({ BMI_INDEX: BMI1 });
    } else if (valueHeight && valueWeight && selectValue === "cm") {
      const valueHeight2 = valueHeight / 100;
      const BMI2 = +(
        Math.round(valueWeight / (valueHeight2 * valueHeight2) + "e+2") + "e-2"
      );
      form.setFieldsValue({ BMI_INDEX: BMI2 });
    } else {
      form.setFieldsValue({ BMI_INDEX: null });
    }
  }, [valueHeight, valueWeight, selectValue]);

  return (
    <>
      <Form
        name="examination"
        labelCol={{
          flex: "150px",
        }}
        labelAlign="left"
        colon={false}
        form={form}
        validateMessages={validateMessages}
        ref={FrmPhysicalExamRef}
        onFinish={handleGetFields}
      >
        <Row>
          <Col span={12} offset={6}>
            <Row>
              <Col span={18}>
                <Form.Item
                  label={<h5>Chiều cao</h5>}
                  name="PERSONAL_HEIGH"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    onChange={handleChangeHeight}
                    style={style}
                    step="any"
                    type="number"
                    controls={false}
                    onPressEnter={handleBlockEnter}
                  />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <Form.Item noStyle name="PERSONAL_HEIGH_UNIT_DEFAULT">
                  <Select defaultValue="m" onSelect={handleSelect}>
                    <Option value="m">m</Option>
                    <Option value="cm">cm</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={18}>
                <Form.Item
                  label={<h5>Cân nặng</h5>}
                  name="PERSONAL_WEIGHT"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    onChange={handleChangeWeight}
                    onPressEnter={handleBlockEnter}
                    style={style}
                    controls={false}
                  />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <span>kg</span>
              </Col>
            </Row>

            <Row>
              <Col span={18}>
                <Form.Item label={<h5>Chỉ số BMI</h5>} name="BMI_INDEX">
                  <InputNumber style={style} type="number" disabled />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <span>
                  kg/m<sup>2</sup>
                </span>
              </Col>
            </Row>

            <Row>
              <Col span={18}>
                <Form.Item
                  label={
                    <div style={{ display: "flex" }}>
                      <h5 style={{ marginRight: 5 }}>Huyết áp</h5>
                      <span
                        style={{ color: "#ff4d4f", fontSize: 13, marginTop: 1 }}
                      >
                        (*)
                      </span>
                    </div>
                  }
                  name="BLOOD_PRESSURE"
                  rules={[
                    {
                      validator(_, value) {
                        if (!value) {
                          return Promise.reject(
                            "Trường này không được để trống!"
                          );
                        }
                        if (!value || !regexBP.test(value)) {
                          return Promise.reject(
                            "Hình thức nhập không đúng. Vui lòng nhập theo hình thức [tâm thu/tâm trương]. Ví dụ: 120/90"
                          );
                        }
                        if (systolic <= diastole) {
                          return Promise.reject(
                            "Chỉ số tâm thu phải lớn hơn chỉ số tâm trương"
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="Ví dụ: 120/80"
                    onChange={handleChangeBloodPressure}
                    onPressEnter={handleBlockEnter}
                  />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <span>mmHg</span>
              </Col>
            </Row>
            <Row>
              <Col span={18}>
                <Form.Item
                  label={<h5>Mạch</h5>}
                  name="BLOOD_VESSEL"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "number",
                      min: 35,
                      max: 140,
                      message:
                        "Mạch nằm trong khoảng ${min}lần/phút - ${max}lần/phút",
                    },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: "Giá trị phải là số nguyên",
                    },
                  ]}
                >
                  <InputNumber
                    style={style}
                    controls={false}
                    onPressEnter={handleBlockEnter}
                  />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <span>Lần/phút</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Row>
            <Col span={2} offset={2}>
              <Button onClick={handleBack} className="btn-submit">
                Quay lại
              </Button>
            </Col>
            <Col span={2} push={17}>
              <Button
                htmlType="submit"
                key="examination"
                form="examination"
                className="btn-submit"
              >
                Tiếp
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};
export default FrmPhysicalExamination;
