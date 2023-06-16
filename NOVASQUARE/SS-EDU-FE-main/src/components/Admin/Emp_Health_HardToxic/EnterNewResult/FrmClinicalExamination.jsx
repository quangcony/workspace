import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Input } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";
import { physicalExamNewState } from "../../../../recoil/atom/physicalExamNew";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import { newestPhysicalDetailState } from "../../../../recoil/atom/physicalDetailState";
import {
  clinicalDetailState,
  newestClinicalDetailState,
} from "../../../../recoil/atom/clinicalDetailState";
import { newestPreclinicalDetailState } from "../../../../recoil/atom/preClinicalDetailState";

const validateMessages = {
  required: "Trường này không được để trống!",
};

const FrmClinicalExamination = ({
  setIsPhysicalDetail,
  setIsClinicalExam,
  setIsPreClinicalExam,
  onKeyChange,
  onUpdateClinicalExam,
  onCreatePreClinicExam,
  FrmClinicalExaminationRef,
  onGetPhysicalDetai,
  onGetPhysicalExam,
}) => {
  const [form] = Form.useForm();
  const [physicalExamSelect] = useRecoilState(physicalExamSelectState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewState);
  const newPhysicalDetail = useRecoilValue(newestPhysicalDetailState);
  const newClinicDetail = useRecoilValue(newestClinicalDetailState);
  const newPreClinicDetail = useRecoilValue(newestPreclinicalDetailState);
  const [clinicalDetail, setClinicalDetail] =
    useRecoilState(clinicalDetailState);
  const [isShow, setIsShow] = useState(true);
  const employeeSelect = useRecoilValue(employeeSelectState);

  useEffect(() => {
    if (employeeSelect?.User?.Gender?.id === 2) {
      setIsShow(() => true);
    } else {
      setIsShow(() => false);
    }
  }, [employeeSelect]);

  useEffect(() => {
    if (physicalExamSelect) {
      const newData = physicalExamSelect?.Clinical_Details[0];
      form.setFieldsValue({
        INTERNAL_MEDICINE_RESULT: newData?.INTERNAL_MEDICINE_RESULT,
        SURGERY_RESULT: newData?.SURGERY_RESULT,
        DERMATOLOGY_RESULT: newData?.DERMATOLOGY_RESULT,
        GYNECOLOGY_RESULT: newData?.GYNECOLOGY_RESULT,
        OPHTHALMOLOGY_RESULT: newData?.OPHTHALMOLOGY_RESULT,
        OTORHINOLARYNGOLOGY_RESULT: newData?.OTORHINOLARYNGOLOGY_RESULT,
        DENTAL_DEPARTMENT_RESULT: newData?.DENTAL_DEPARTMENT_RESULT,
      });
    }
    if (clinicalDetail) {
      const newData = clinicalDetail;
      form.setFieldsValue({
        INTERNAL_MEDICINE_RESULT: newData?.INTERNAL_MEDICINE_RESULT,
        SURGERY_RESULT: newData?.SURGERY_RESULT,
        DERMATOLOGY_RESULT: newData?.DERMATOLOGY_RESULT,
        GYNECOLOGY_RESULT: newData?.GYNECOLOGY_RESULT,
        OPHTHALMOLOGY_RESULT: newData?.OPHTHALMOLOGY_RESULT,
        OTORHINOLARYNGOLOGY_RESULT: newData?.OTORHINOLARYNGOLOGY_RESULT,
        DENTAL_DEPARTMENT_RESULT: newData?.DENTAL_DEPARTMENT_RESULT,
      });
    }
  }, [physicalExamSelect, clinicalDetail, form]);

  const handleOk = () => {
    const newData = {
      ...form.getFieldValue(),
    };
    const {
      INTERNAL_MEDICINE_RESULT,
      SURGERY_RESULT,
      DERMATOLOGY_RESULT,
      GYNECOLOGY_RESULT,
      OPHTHALMOLOGY_RESULT,
      OTORHINOLARYNGOLOGY_RESULT,
      DENTAL_DEPARTMENT_RESULT,
    } = newData;

    if (
      !INTERNAL_MEDICINE_RESULT ||
      !SURGERY_RESULT ||
      !DERMATOLOGY_RESULT ||
      // (isBoolean === true && !GYNECOLOGY_RESULT) ||
      !OPHTHALMOLOGY_RESULT ||
      !OTORHINOLARYNGOLOGY_RESULT ||
      !DENTAL_DEPARTMENT_RESULT ||
      isShow
        ? !GYNECOLOGY_RESULT
        : "" ||
          INTERNAL_MEDICINE_RESULT.trim() === "" ||
          SURGERY_RESULT.trim() === "" ||
          DERMATOLOGY_RESULT.trim() === "" ||
          // (isBoolean === true && GYNECOLOGY_RESULT.trim() === "") ||
          OPHTHALMOLOGY_RESULT.trim() === "" ||
          OTORHINOLARYNGOLOGY_RESULT.trim() === "" ||
          DENTAL_DEPARTMENT_RESULT.trim() === ""
    ) {
      return;
    }

    if (physicalExamSelect) {
      if (physicalExamSelect?.Clinical_Details[0]?.id) {
        handleUpdateClinicalExam(
          {
            ...newData,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          physicalExamSelect?.Clinical_Details[0]?.id
        );
        setIsClinicalExam(true);
        setIsPreClinicalExam(false);
        onKeyChange("5");
      } else if (newClinicDetail) {
        handleUpdateClinicalExam(
          {
            ...newData,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          newClinicDetail?.id
        );
        setIsClinicalExam(true);
        setIsPreClinicalExam(false);
        onKeyChange("5");
      }
      if (physicalExamSelect?.Preclinical_Details?.length === 0) {
        onCreatePreClinicExam();
      }
      setIsClinicalExam(true);
      setIsPreClinicalExam(false);
      onKeyChange("5");
    }
    // go back
    else if (newPreClinicDetail) {
      const result = { ...newData, PHYSICAL_EXAM_ID: physicalExamGetNew?.id };
      handleUpdateClinicalExam(result, newClinicDetail?.id);
      setIsClinicalExam(true);
      setIsPreClinicalExam(false);
      onKeyChange("5");
    }
    // create new
    else {
      const result = { ...newData, PHYSICAL_EXAM_ID: physicalExamGetNew?.id };
      handleUpdateClinicalExam(result, newClinicDetail?.id);
      onCreatePreClinicExam();
      setIsClinicalExam(true);
      setIsPreClinicalExam(false);
      onKeyChange("5");
    }
    onGetPhysicalExam(physicalExamSelect?.id);
  };

  // update kham lam san
  const handleUpdateClinicalExam = async (value, id) => {
    await onUpdateClinicalExam(value, id);
  };

  const handleBack = async () => {
    if (physicalExamSelect) {
      await onGetPhysicalDetai(physicalExamSelect?.Physical_Details[0]?.id);
    }
    if (newPhysicalDetail) {
      await onGetPhysicalDetai(newPhysicalDetail?.id);
    }

    await onKeyChange("3");
    setIsClinicalExam(true);
    setIsPhysicalDetail(false);
  };
  return (
    <div style={{ margin: "30px 0" }}>
      <Form
        name="clinical"
        form={form}
        colon={false}
        validateMessages={validateMessages}
        ref={FrmClinicalExaminationRef}
        labelCol={{
          span: 6,
        }}
        labelAlign="left"
      >
        <Row>
          <Col span={4} offset={6}>
            <h5 style={{ paddingTop: "7px" }}>1. Nội khoa</h5>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Kết luận"
              name="INTERNAL_MEDICINE_RESULT"
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
        <Row>
          <Col span={4} offset={6}>
            <h5 style={{ paddingTop: "7px" }}>2. Ngoại khoa</h5>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Kết luận"
              name="SURGERY_RESULT"
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

        <Row>
          <Col span={4} offset={6}>
            <h5 style={{ paddingTop: "7px" }}>3. Sản phụ khoa</h5>
          </Col>
          <Col span={9}>
            <Form.Item
              label={<lable>Kết luận</lable>}
              name="GYNECOLOGY_RESULT"
              rules={[
                {
                  required: isShow ? true : false,
                },
              ]}
            >
              <Input disabled={isShow ? false : true} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={4} offset={6}>
            <h5 style={{ paddingTop: "7px" }}>4. Mắt</h5>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Kết luận"
              name="OPHTHALMOLOGY_RESULT"
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
        <Row>
          <Col span={4} offset={6}>
            <h5 style={{ paddingTop: "7px" }}>5. Tai-Mũi-Họng</h5>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Kết luận"
              name="OTORHINOLARYNGOLOGY_RESULT"
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
        <Row>
          <Col span={4} offset={6}>
            <h5 style={{ paddingTop: "7px" }}>6. Răng-Hàm-Mặt</h5>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Kết luận"
              name="DENTAL_DEPARTMENT_RESULT"
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
        <Row>
          <Col span={4} offset={6}>
            <h5 style={{ paddingTop: "7px" }}>7. Da liễu</h5>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Kết luận"
              name="DERMATOLOGY_RESULT"
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
        <Form.Item>
          <Row>
            <Col span={2} offset={2}>
              <Button onClick={handleBack}>Quay lại</Button>
            </Col>
            <Col span={2} push={17}>
              <Button
                htmlType="submit"
                onClick={handleOk}
                form="clinical"
                key="clinical"
              >
                Tiếp
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FrmClinicalExamination;
