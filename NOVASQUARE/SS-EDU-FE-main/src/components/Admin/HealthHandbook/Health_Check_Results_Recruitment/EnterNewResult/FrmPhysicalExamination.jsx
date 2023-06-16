import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Button, Form, Select, InputNumber } from "antd";
import Input from "antd/lib/input/Input";
import ToolTip from "../../../Tooltip";
import {
  handleBlockEnter,
  regexBP,
  validateMessages,
} from "../../../../../common";
import { newestPhysicalDetailRecruitState } from "../../../../../recoil/atom/physicalDetailState";
import { useRecoilValue } from "recoil";
import { physicalExamNewRecruitState } from "../../../../../recoil/atom/physicalExamNew";
import bloodPressuresApi from "../../../../../api/bloodPressuresApi";
import physicalDetailApi from "../../../../../api/physicalDetailApi";
import { physicalExamRecruitIdState } from "../../../../../recoil/atom/physicalExamState";

const { Option } = Select;
const style = {
  width: "100%",
};

const FrmPhysicalExamination = ({
  onKeyChange,
  FrmPhysicalExamRef,
  isDoctor,
}) => {
  const [form] = Form.useForm();
  const [selectValue, setSelectValue] = useState("m");
  const [valueHeight, setValueHeight] = useState(null);
  const [valueWeight, setValueWeight] = useState(null);
  const [minValue, setMinValue] = useState(0.5);
  const [maxValue, setMaxValue] = useState(2.5);
  const [bloodPressure, setBloodPressure] = useState();
  const [systolic, setSystolic] = useState();
  const [diastole, setDiastole] = useState();
  const [isChange, setIsChange] = useState(false);
  const physicalExamRecruitId = useRecoilValue(physicalExamRecruitIdState);
  const physicalDetailNew = useRecoilValue(newestPhysicalDetailRecruitState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewRecruitState);

  useEffect(() => {
    if (physicalExamRecruitId) {
      const data = physicalExamRecruitId?.Physical_Details[0];
      setValueHeight(data?.PERSONAL_HEIGH);
      setValueWeight(data?.PERSONAL_WEIGHT);
      setSelectValue("m");
      form.setFieldsValue({
        PERSONAL_HEIGH: data?.PERSONAL_HEIGH,
        PERSONAL_WEIGHT: data?.PERSONAL_WEIGHT,
        BMI_INDEX: data?.BMI_INDEX,
        BLOOD_PRESSURE: data?.Blood_Pressures[0]?.VALUE,
        BLOOD_VESSEL: data?.BLOOD_VESSEL,
      });
    } else {
      form.resetFields();
    }
  }, [physicalExamRecruitId, form]);

  // handle submit form
  const handleGetFields = () => {
    const newData = {
      ...form.getFieldsValue(),
    };

    if (
      !newData?.BLOOD_PRESSURE ||
      !newData?.PERSONAL_HEIGH ||
      !newData?.PERSONAL_WEIGHT ||
      !newData?.BLOOD_VESSEL
    ) {
      return;
    }
    const { BLOOD_PRESSURE, PERSONAL_HEIGH, ...data } = newData;
    const result = {
      ...data,
      PERSONAL_HEIGH: PERSONAL_HEIGH,
    };

    const bloodPressureData = {
      VALUE: newData?.BLOOD_PRESSURE,
      TYPE: 2,
      PHYSICAL_DETAIL_ID: physicalExamRecruitId
        ? physicalExamRecruitId?.Physical_Details[0]?.id
        : physicalDetailNew?.id,
      EXAM_DATE: physicalExamRecruitId
        ? physicalExamRecruitId?.PHYSICAL_DATE
        : physicalExamGetNew?.PHYSICAL_DATE,
    };

    if (physicalExamRecruitId) {
      // CHECK PHYSICAL DETAIL
      if (physicalExamRecruitId?.Physical_Details[0]?.id) {
        handleUpdatePhysicalDetail(
          result,
          physicalExamRecruitId?.Physical_Details[0]?.id
        );
        // CHECK BLOOD PRESSURE
        if (
          physicalExamRecruitId?.Physical_Details[0]?.Blood_Pressures[0]?.id
        ) {
          handleUpdateBloodPressure(
            bloodPressureData,
            physicalExamRecruitId?.Physical_Details[0]?.Blood_Pressures[0]?.id
          );
        } else {
          handleCreateBloodPressure(bloodPressureData);
        }
      }
    }

    if (physicalDetailNew) {
      handleUpdatePhysicalDetail(result, physicalDetailNew?.id);
      if (physicalDetailNew?.Blood_Pressures?.[0]?.id) {
        handleUpdateBloodPressure(
          bloodPressureData.VALUE,
          physicalDetailNew?.Blood_Pressures[0]?.id
        );
      } else {
        handleCreateBloodPressure(bloodPressureData);
      }
    }
    onKeyChange("3");
  };
  // UPDATE PHYSICAL DETAIL
  const handleUpdatePhysicalDetail = async (data, id) => {
    try {
      let res = await physicalDetailApi.updatePhysicalDetail(data, id);
      if (res.data) {
      }
    } catch (error) {
      console.log("Update physical detail fail!!!");
    }
  };
  // create blood pressure
  const handleCreateBloodPressure = async (data) => {
    try {
      await bloodPressuresApi.createBloodPressure(data);
    } catch (error) {
      console.log("Bloodpressure create fail!!");
    }
  };
  //update blood pressure
  const handleUpdateBloodPressure = async (data, id) => {
    try {
      await bloodPressuresApi.updateBloodPressure(data, id);
    } catch (error) {
      console.log("Update blood pressure fail!!");
    }
  };

  // const handleSelect = (value) => {
  //   setSelectValue(value);
  //   setIsChange(false);
  // };
  // const typingTimeoutRef = useRef(null);
  // const handleChangeHeight = (value) => {
  //   if (typingTimeoutRef.current) {
  //     clearTimeout(typingTimeoutRef.current);
  //   }
  //   typingTimeoutRef.current = setTimeout(() => {
  //     setValueHeight(Number(value));
  //   }, 500);
  //   setIsChange(true);
  // };

  // const handleChangeWeight = (valueWeight) => {
  //   setValueWeight(Number(valueWeight));
  // };
  const handleChangeBloodPressure = (valuePressure) => {
    setBloodPressure(valuePressure);
  };

  const handleChangeKey = async () => {
    await onKeyChange("1");
    setIsChange(false);
  };

  useEffect(() => {
    const getSystolicAndDiastole = form
      .getFieldValue("BLOOD_PRESSURE")
      ?.split("/");
    if (getSystolicAndDiastole?.length === 2) {
      setSystolic(Number(getSystolicAndDiastole[0]));
      setDiastole(Number(getSystolicAndDiastole[1]));
    }
  }, [form, bloodPressure]);

  return (
    <>
      <Form
        onFinish={handleGetFields}
        name="examination"
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        colon={false}
        form={form}
        validateMessages={validateMessages}
        ref={FrmPhysicalExamRef}
      >
        <Row>
          <Col span={12} offset={6}>
            <Row>
              <Col span={18}>
                <Form.Item
                  label="Chiều cao"
                  name="PERSONAL_HEIGH"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    // onChange={handleChangeHeight}
                    style={style}
                    step="any"
                    type="number"
                    disabled={isDoctor}
                    controls={false}
                    onPressEnter={handleBlockEnter}
                  />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <Form.Item noStyle name="PERSONAL_HEIGH_UNIT_DEFAULT">
                  <Select
                    defaultValue={selectValue}
                    // onSelect={handleSelect}
                    disabled={isDoctor}
                  >
                    <Option value="m">m</Option>
                    <Option value="cm">cm</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={18}>
                <Form.Item
                  label="Cân nặng"
                  name="PERSONAL_WEIGHT"
                  rules={[
                    { required: true },
                    {
                      type: "number",
                      min: 15,
                      max: 180,
                      message: "Cân nặng nằm trong khoảng ${min}kg - ${max}kg",
                    },
                  ]}
                >
                  <InputNumber
                    // onChange={handleChangeWeight}
                    style={style}
                    type="number"
                    disabled={isDoctor}
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
                <Form.Item
                  label={
                    <div style={{ display: "flex" }}>
                      <span>Huyết áp</span>
                      <span
                        style={{ color: "red", marginLeft: 5, fontSize: 12 }}
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
                    disabled={isDoctor}
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
                  label="Mạch"
                  name="BLOOD_VESSEL"
                  rules={[
                    { required: true },
                    {
                      type: "number",
                      min: 35,
                      max: 140,
                      message:
                        "Mạch nằm trong khoảng ${min}lần/phút - ${max}lần/phút",
                    },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: "Mạch chỉ nhận giá trị nguyên.",
                    },
                  ]}
                >
                  <InputNumber
                    style={style}
                    type="number"
                    disabled={isDoctor}
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
              <Button onClick={handleChangeKey} className="btn-submit">
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
