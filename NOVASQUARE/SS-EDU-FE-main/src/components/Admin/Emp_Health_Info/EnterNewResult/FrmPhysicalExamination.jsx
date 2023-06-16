import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Select, InputNumber } from "antd";
const { Option } = Select;
const style = {
  width: "100%",
};
const validateMessages = {
  required: "Trường này không được để trống!",
};

const FrmPhysicalExamination = ({
  onKeyChange,
  onCreatePhysicalDetail,
  FrmPhysicalExamRef,
  physicalExamId,
  setPhysicalExamination,
}) => {
  const [form] = Form.useForm();
  const [selectValue, setSelectValue] = useState("m");
  const [valueHeight, setValueHeight] = useState(null);
  const [valueWeight, setValueWeight] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);

  const handleGetFields = () => {
    const newData = {
      ...form.getFieldsValue(),
      PHYSICAL_EXAM_ID: physicalExamId?.id,
    };
    handleCreate(newData);
    setPhysicalExamination(newData);
    onKeyChange("4");
  };

  const handleCreate = async (value) => {
    console.log("PhysicalDetail:", value);
    await onCreatePhysicalDetail(value);
    setValueHeight(null);
    setValueWeight(null);
  };

  const handleSelect = (value) => {
    setSelectValue(value);
  };

  const handleChangeHeight = (value) => {
    setValueHeight(Number(value));
  };

  const handleChangeWeight = (valueWeight) => {
    setValueWeight(Number(valueWeight));
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
      const value2 = valueHeight * 100;
      setMinValue(50);
      setMaxValue(250);
      setValueHeight(value2);
      form.setFieldsValue({ PERSONAL_HEIGH: value2 });
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
  }, [selectValue, valueHeight, valueWeight]);

  useEffect(() => {
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
      form.setFieldsValue({ BMI_INDEX: 0 });
    }
  }, [valueHeight, valueWeight]);

  return (
    <>
      <Form
        name="Kham_the_luc"
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
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "number",
                      min: Number(minValue),
                      max: Number(maxValue),
                      // pattern: "[3-9]|[1-3][0-9]|4[0-2]",
                      message: "Chiều cao nằm trong khoảng ${min} - ${max}",
                    },
                  ]}
                >
                  <InputNumber
                    value={valueHeight}
                    onChange={handleChangeHeight}
                    style={style}
                    step="any"
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
                  label="Cân nặng"
                  name="PERSONAL_WEIGHT"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "number",
                      min: 30,
                      max: 180,
                      // pattern: "[3-9]|[1-3][0-9]|4[0-2]",
                      message: "Cân nặng nằm trong khoảng ${min}kg - ${max}kg",
                    },
                  ]}
                >
                  <InputNumber
                    value={valueWeight}
                    onChange={handleChangeWeight}
                    style={style}
                    type="number"
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
                  label="Chỉ số BMI"
                  name="BMI_INDEX"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber style={style} type="number" />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <span></span>
              </Col>
            </Row>

            <Row>
              {/* <Col span={1}>
                  <Title level={5}>?</Title>
                </Col> */}
              <Col span={18}>
                <Form.Item
                  label="Huyết áp"
                  name="BLOOD_PRESSURE"
                  rules={[
                    {
                      required: true,
                    },
                    {
                      type: "number",
                      min: 120,
                      max: 159,
                      // pattern: "[3-9]|[1-3][0-9]|4[0-2]",
                      message:
                        "Huyết áp nằm trong khoảng ${min}mmHg - ${max}mmHg",
                    },
                  ]}
                >
                  <InputNumber style={style} type="number" />
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
                    {
                      required: true,
                    },
                    {
                      type: "number",
                      min: 35,
                      max: 140,
                      // pattern: "[3-9]|[1-3][0-9]|4[0-2]",
                      message:
                        "Mạch nằm trong khoảng ${min}lần/phút - ${max}lần/phút",
                    },
                  ]}
                >
                  <InputNumber style={style} type="number" />
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
              <Button onClick={() => onKeyChange("2")}>Quay lại</Button>
            </Col>
            <Col span={2} push={18}>
              <Button onClick={handleGetFields}>Tiếp</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};
export default FrmPhysicalExamination;
