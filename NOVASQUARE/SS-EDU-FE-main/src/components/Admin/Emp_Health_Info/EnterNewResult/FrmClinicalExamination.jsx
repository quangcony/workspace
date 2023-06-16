import React, { useEffect } from "react";
import { Col, Row, Button, Form, Input } from "antd";

const validateMessages = {
  required: "${label} không được để trống!",
};

const FrmClinicalExamination = ({
  setClinicalValue,
  onKeyChange,
  physicalExamId,
  onCreateClinicalExam,
  clinicaldefaults,
  FrmClinicalExaminationRef,
}) => {
  const onFinish = (fieldsValue) => {
    const result = Object.keys(fieldsValue).map((key) => [
      key,
      fieldsValue[key],
    ]);
    const newData = [];
    result.forEach((item) => {
      newData.push({
        MEDICAL_DISEASE_ID: Number(item[0]),
        MEDICAL_DISEASE_RESULT: item[1],
      });
    });

    const newData_2 = [];
    newData.forEach((item) => {
      let MEDICAL_DISEASE_NAME;
      clinicaldefaults.forEach((clinic) => {
        if (item.MEDICAL_DISEASE_ID === clinic.Medical_Disease.id) {
          MEDICAL_DISEASE_NAME = clinic.Medical_Disease.NAME;
        }
      });
      newData_2.push({
        ...item,
        MEDICAL_DISEASE_NAME: MEDICAL_DISEASE_NAME,
        PHYSICAL_EXAM_ID: physicalExamId.id,
      });
    });

    newData_2.forEach((item) => {
      handleCreateClinicalExam(item);
    });
    setClinicalValue(newData);
    onKeyChange("5");
  };

  const handleCreateClinicalExam = async (value) => {
    console.log("ClinicalExam:", value);
    await onCreateClinicalExam(value);
  };
  return (
    <div style={{ margin: "30px 0" }}>
      <Form
        name="form_khamlamsan"
        onFinish={onFinish}
        colon={false}
        validateMessages={validateMessages}
        ref={FrmClinicalExaminationRef}
      >
        {clinicaldefaults &&
          clinicaldefaults.length > 0 &&
          clinicaldefaults.map((item, index) => (
            <Row>
              <Col span={4} offset={6}>
                <h5>
                  {index + 1}. {item.Medical_Disease?.NAME}
                </h5>
              </Col>
              <Col span={9}>
                <Form.Item
                  label="Kết luận"
                  name={item.Medical_Disease?.id}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          ))}
        <Form.Item>
          <Row>
            <Col span={2} offset={2}>
              <Button onClick={() => onKeyChange("3")}>Quay lại</Button>
            </Col>
            <Col span={2} push={17}>
              <Button htmlType="submit">Tiếp</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FrmClinicalExamination;
