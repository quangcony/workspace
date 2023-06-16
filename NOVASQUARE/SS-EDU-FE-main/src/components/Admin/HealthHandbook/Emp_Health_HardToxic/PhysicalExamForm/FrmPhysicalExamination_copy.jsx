import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import bloodPressuresApi from "../../../../../api/bloodPressuresApi";
import {
  handleBlockEnter,
  regexBP,
  validateMessages,
} from "../../../../../common";
import { newestClinicalDetailState } from "../../../../../recoil/atom/clinicalDetailState";
import {
  newestPhysicalDetailState,
  physicalDetailIdState,
} from "../../../../../recoil/atom/physicalDetailState";
import { physicalExamNewState } from "../../../../../recoil/atom/physicalExamNew";
import { physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import ToolTip from "../../../Tooltip";

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
  const [valueHeight, setValueHeight] = useState(null);
  const [valueWeight, setValueWeight] = useState(null);
  const [minValue, setMinValue] = useState(0.5);
  const [maxValue, setMaxValue] = useState(2.5);
  // const { createBloodPressure, updateBloodPressure } = useBloodPressures();
  const physicalExamSelect = useRecoilValue(physicalExamSelectState);

  const physicalExamGetNew = useRecoilValue(physicalExamNewState);
  const physicalDetail = useRecoilValue(physicalDetailIdState);
  const newPhysicalDetail = useRecoilValue(newestPhysicalDetailState);
  const newClinicDetail = useRecoilValue(newestClinicalDetailState);

  const [bloodPressure, setBloodPressure] = useState();
  const [systolic, setSystolic] = useState();
  const [diastole, setDiastole] = useState();
  const [isChange, setIsChange] = useState(false);
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
    }
    if (physicalDetail) {
      const data = physicalDetail;
      form.setFieldsValue({
        PERSONAL_HEIGH: data?.PERSONAL_HEIGH,
        PERSONAL_WEIGHT: data?.PERSONAL_WEIGHT,
        BMI_INDEX: data?.BMI_INDEX,
        BLOOD_PRESSURE: data?.Blood_Pressures[0]?.VALUE,
        BLOOD_VESSEL: data?.BLOOD_VESSEL,
      });
      setValueHeight(physicalDetail?.PERSONAL_HEIGH);
      setValueWeight(physicalDetail?.PERSONAL_WEIGHT);
    } else if (newPhysicalDetail) {
      setValueHeight(null);
      setValueWeight(null);
    }
  }, [physicalExamSelect, physicalDetail, form]);

  // Kham the luc
  const handleGetFields = () => {
    const newData = {
      ...form.getFieldsValue(),
      PERSONAL_HEIGH_UNIT_DEFAULT: "m",
    };
    const { BLOOD_PRESSURE, ...data } = newData;
    const { BLOOD_VESSEL, PERSONAL_HEIGH, PERSONAL_WEIGHT, BMI_INDEX } =
      newData;
    const result = {
      ...data,
      PERSONAL_HEIGH:
        selectValue === "cm"
          ? newData?.PERSONAL_HEIGH / 100
          : newData?.PERSONAL_HEIGH,
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
      if (physicalExamSelect?.Clinical_Details?.length === 0) {
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
  // update The luc chi tiet
  const handleUpdatePhysicalDetail = async (value, id) => {
    await onUpdatePhysicalDetail(value, id);
    setValueWeight(undefined);
    setValueHeight(undefined);
  };
  // create blood pressure
  const handleCreateBloodPressure = async (data) => {
    // await createBloodPressure(data);
    try {
      let res = bloodPressuresApi.createBloodPressure(data);
      if (res.data) {
        await bloodPressuresApi.getAllBloodPressures();
      }
    } catch (error) {
      console.log("error");
    }
  };
  //update blood pressure
  const handleUpdateBloodPressure = async (data, id) => {
    // await updateBloodPressure(data, id);
    try {
      let res = bloodPressuresApi.updateBloodPressure(data, id);
      if (res.data) {
        await bloodPressuresApi.getAllBloodPressures();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleChangeHeight = (value) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setValueHeight(Number(value));
    }, 100);
    setIsChange(true);
  };

  const handleSelect = (value) => {
    setSelectValue(value);
    setIsChange(false);
    form.setFieldsValue({ PERSONAL_HEIGH: valueHeight ? valueHeight : null });
  };

  const handleChangeWeight = (valueWeight) => {
    setValueWeight(Number(valueWeight));
  };

  const handleBack = async () => {
    await onKeyChange("2");
    setIsHealthHis(false);
    setIsPhysicalDetail(true);
    setIsChange(false);
  };

  useEffect(() => {
    if (selectValue === "m" && valueHeight >= 50 && valueHeight <= 250) {
      const value1 = valueHeight / 100;
      setMinValue(0.5);
      setMaxValue(2.5);
      setValueHeight(value1);
      form.setFieldsValue({ PERSONAL_HEIGH: value1 });
    } else if (
      selectValue === "cm" &&
      valueHeight >= 0.5 &&
      valueHeight <= 2.5
    ) {
      if (isChange === false) {
        const value3 = valueHeight * 100;
        setMinValue(50);
        setMaxValue(250);
        setValueHeight(value3);
        form.setFieldsValue({ PERSONAL_HEIGH: value3 });
      } else {
        const value2 = valueHeight;
        setMinValue(50);
        setMaxValue(250);
        setValueHeight(value2);
        form.setFieldsValue({ PERSONAL_HEIGH: value2 });
      }
    } else if (
      selectValue === "cm" &&
      valueHeight >= 50 &&
      valueHeight <= 250
    ) {
      setMinValue(50);
      setMaxValue(250);
      setValueHeight(valueHeight);
    } else if (
      selectValue === "m" &&
      valueHeight >= 0.5 &&
      valueHeight <= 2.5
    ) {
      setMinValue(0.5);
      setMaxValue(2.5);
      setValueHeight(valueHeight);
    }
  }, [selectValue, valueHeight, valueWeight, isChange]);

  useEffect(() => {
    // if (physicalExamSelect?.Physical_Details[0]?.id) {
    //   setValueHeight(physicalExamSelect?.Physical_Details[0]?.PERSONAL_HEIGH);
    //   setValueWeight(physicalExamSelect?.Physical_Details[0]?.PERSONAL_WEIGHT);
    // }
    // if (newPhysicalDetail) {
    // setValueHeight(valueHeight);
    // setValueWeight(valueWeight);
    // }
    if (valueHeight && valueWeight && valueHeight >= 50) {
      const valueHeight1 = valueHeight / 100;
      const BMI1 = +(
        Math.round(valueWeight / (valueHeight1 * valueHeight1) + "e+2") + "e-2"
      );
      form.setFieldsValue({ BMI_INDEX: BMI1 });
    } else if (valueHeight && valueWeight && valueHeight <= 2.5) {
      const valueHeight2 = valueHeight;
      const BMI2 = +(
        Math.round(valueWeight / (valueHeight2 * valueHeight2) + "e+2") + "e-2"
      );
      form.setFieldsValue({ BMI_INDEX: BMI2 });
    } else {
      form.setFieldsValue({ BMI_INDEX: null });
    }
  }, [valueHeight, valueWeight]);

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
                    {
                      type: "number",
                      min: Number(minValue),
                      max: Number(maxValue),
                      message: "Chiều cao nằm trong khoảng ${min} - ${max}",
                    },
                  ]}
                >
                  <InputNumber
                    onChange={handleChangeHeight}
                    style={style}
                    step="any"
                    controls={false}
                    onPressEnter={handleBlockEnter}
                  />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <Select defaultValue="m" onSelect={handleSelect}>
                  <Option value="m">m</Option>
                  <Option value="cm">cm</Option>
                </Select>
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
                    {
                      type: "number",
                      min: 15,
                      max: 180,
                      message: "Cân nặng nằm trong khoảng ${min}kg - ${max}kg",
                    },
                  ]}
                >
                  <InputNumber
                    onChange={handleChangeWeight}
                    style={style}
                    controls={false}
                    onPressEnter={handleBlockEnter}
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
                <span>kg/m²</span>
              </Col>
            </Row>

            <Row>
              <Col span={18}>
                <Form.Item
                  label={
                    <div style={{ display: "flex" }}>
                      <h5 style={{ marginRight: 5 }}>Huyết áp </h5>
                      <span
                        style={{ fontSize: 12, color: "#ff4d4f", marginTop: 1 }}
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
              <Button onClick={handleBack}>Quay lại</Button>
            </Col>
            <Col span={2} push={17}>
              <Button
                // onClick={handleGetFields}
                htmlType="submit"
                key="examination"
                form="examination"
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
