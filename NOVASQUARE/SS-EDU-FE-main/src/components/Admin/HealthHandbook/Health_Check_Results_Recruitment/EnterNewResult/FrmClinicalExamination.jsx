import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Input } from "antd";
import { useRecoilValue } from "recoil";
import { newestClinicalDetailRecruitState } from "../../../../../recoil/atom/clinicalDetailState";
import clinicalDetailApi from "../../../../../api/clinicDetailApi";
import { physicalExamRecruitIdState } from "../../../../../recoil/atom/physicalExamState";
import { isShowState } from "../../../../../recoil/atom/booleanState";
import { handleBlockEnter, validateMessages } from "../../../../../common";

const FrmClinicalExamination = ({
  onKeyChange,
  FrmClinicalExaminationRef,
  isDoctor,
}) => {
  const [form] = Form.useForm();
  const isShow = useRecoilValue(isShowState);
  const clinicalDetailNew = useRecoilValue(newestClinicalDetailRecruitState);
  const physicalExamRecruitId = useRecoilValue(physicalExamRecruitIdState);

  useEffect(() => {
    if (physicalExamRecruitId) {
      const newData = physicalExamRecruitId?.Clinical_Details[0];
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
  }, [physicalExamRecruitId, form]);

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
      (isShow && !GYNECOLOGY_RESULT) ||
      !OPHTHALMOLOGY_RESULT ||
      !OTORHINOLARYNGOLOGY_RESULT ||
      !DENTAL_DEPARTMENT_RESULT ||
      INTERNAL_MEDICINE_RESULT.trim() === "" ||
      SURGERY_RESULT.trim() === "" ||
      DERMATOLOGY_RESULT.trim() === "" ||
      OPHTHALMOLOGY_RESULT.trim() === "" ||
      OTORHINOLARYNGOLOGY_RESULT.trim() === "" ||
      (isShow && GYNECOLOGY_RESULT.trim() === "") ||
      DENTAL_DEPARTMENT_RESULT.trim() === ""
    ) {
      return;
    }
    if (physicalExamRecruitId) {
      if (physicalExamRecruitId?.Clinical_Details[0]?.id) {
        handleUpdateClinicalExam(
          newData,
          physicalExamRecruitId?.Clinical_Details[0]?.id
        );
      }
    } else if (clinicalDetailNew) {
      handleUpdateClinicalExam(newData, clinicalDetailNew?.id);
    } else {
      handleCreateClinicalExam(newData);
    }
    onKeyChange("4");
  };

  // update kham lam san
  const handleUpdateClinicalExam = async (data, id) => {
    try {
      let res = await clinicalDetailApi.updateClinicalDetail(data, id);
    } catch (error) {
      console.log("Update clinical detail fail!!");
    }
  };

  // create can lam san
  const handleCreateClinicalExam = async (data) => {
    try {
      await clinicalDetailApi.createClinicalDetail(data);
    } catch (error) {
      console.log("Create clinical detail fail!!");
    }
  };

  const handleChangeKey = async () => {
    await onKeyChange("2");
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
            <h5>1. Nội khoa</h5>
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
              <Input disabled={isDoctor} onPressEnter={handleBlockEnter} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={6}>
            <h5>2. Ngoại khoa</h5>
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
              <Input disabled={isDoctor} onPressEnter={handleBlockEnter} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={6}>
            <h5>3. Da liễu</h5>
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
              <Input disabled={isDoctor} onPressEnter={handleBlockEnter} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={6}>
            <h5>4. Sản phụ khoa</h5>
          </Col>
          <Col span={9}>
            <Form.Item
              label="Kết luận"
              name="GYNECOLOGY_RESULT"
              rules={[
                {
                  required: isShow ? true : false,
                },
              ]}
            >
              <Input
                disabled={isDoctor ? true : isShow ? false : true}
                onPressEnter={handleBlockEnter}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={4} offset={6}>
            <h5>5. Mắt</h5>
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
              <Input disabled={isDoctor} onPressEnter={handleBlockEnter} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={6}>
            <h5>6. Tai-Mũi-Họng</h5>
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
              <Input disabled={isDoctor} onPressEnter={handleBlockEnter} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4} offset={6}>
            <h5>7. Răng-Hàm-Mặt</h5>
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
              <Input disabled={isDoctor} onPressEnter={handleBlockEnter} />
            </Form.Item>
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
                onClick={handleOk}
                form="clinical"
                key="clinical"
                className="btn-submit"
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
