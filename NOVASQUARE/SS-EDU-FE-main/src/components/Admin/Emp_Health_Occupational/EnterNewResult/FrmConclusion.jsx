import { Button, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import physicalExamApi from "../../../../api/physicalExamApi";
import specialExamApi from "../../../../api/specialExamApi";
import specialExamResultApi from "../../../../api/specialExamResultApi";
import { useSpecialExamResult } from "../../../../hooks/specialExamResult";
import { employeeIdState } from "../../../../recoil/atom/employeeState";
import { newestPhysicalExamState, physicalExamIdState, physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";
import { specialExamResultOptionsState } from "../../../../recoil/atom/specialExamResultState";
import { newestSpecialExamState, specialDiseaseTypeState, specialExamTypeState } from "../../../../recoil/atom/specialExamState";
import { tabActiveState } from "../../../../recoil/atom/tabActiveState";
import OccupationalMedicalExamPDF from "../OccupationalMedicalExamPDF";

const validateMessages = {
  required: "Trường này không được để trống!",
};

const makeYearSelectOptions = (n) => {
  const thisYear = new Date().getFullYear();
  const options = [];
  for (let i = 0; i < n; i++) {
    options.push({
      value: `${thisYear - i}`,
      label: thisYear - i,
    })
  }
  return options;
}

const FrmConclusion = ({ onKeyChange, FrmConclusionRef, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  useSpecialExamResult();

  const [isOpenFilePDF, setIsOpenFilePDF] = useState(false);
  const [reload, setReload] = useState(false);

  const specialExamType = useRecoilValue(specialExamTypeState);
  const specialExamResultOptions = useRecoilValue(specialExamResultOptionsState);
  const specialDiseaseType = useRecoilValue(specialDiseaseTypeState);
  const newSpecialExam = useRecoilValue(newestSpecialExamState);
  const setTabActive = useSetRecoilState(tabActiveState);
  const setEmployeeId = useSetRecoilState(employeeIdState);
  const setPhysicalExamId = useSetRecoilState(physicalExamIdState);
  const [physicalExam, setPhysicalExam] = useRecoilState(physicalExamSelectState);
  const newPhysicalExam = useRecoilValue(newestPhysicalExamState);

  useEffect(() => {
    if (physicalExam || newPhysicalExam) {
      setPhysicalExamId(physicalExam?.id || newPhysicalExam?.id);
    }
  }, [physicalExam, newPhysicalExam]);

  const handleUpdateSpecialExam = async (data) => {
    let id;
    if (physicalExam) {
      id = physicalExam?.Special_Exams[0].id;
    } else if (newSpecialExam) {
      id = newSpecialExam.id;
    }
    await specialExamApi.updateSpecialExam(data, id);
  }
  const handleUpdatePhysicalExam = async (data) => {
    let id;
    if (physicalExam) {
      id = physicalExam.id;
    } else if (newPhysicalExam) {
      id = newPhysicalExam.id;
    }
    await physicalExamApi.updatePhysicalExam(data, id)
  }

  useEffect(() => {
    if (physicalExam) {
      const specialExams = physicalExam?.Special_Exams[0];
      form.setFieldsValue({
        RESULT_SELECT_ID: String(specialExams.RESULT_SELECT_ID).concat("*-*", specialExams.RESULT_SELECT_NAME),
        RESULT_INPUT_NAME: specialExams.RESULT_INPUT_NAME,
        RESULT_SELECT_ID_2: String(specialExams.RESULT_SELECT_ID_2).concat("*-*", specialExams.RESULT_SELECT_NAME_2),
        RESULT_INPUT_NAME_2: specialExams.RESULT_INPUT_NAME_2,
        NOTE: specialExams.NOTE ?? specialExams?.Result_Input?.NOTE,
        DISEASE_JOB_NAME: specialExams?.Result_Input?.DISEASE_JOB_NAME,
        YEAR_DETECTED: specialExams?.Result_Input?.YEAR_DETECTED,
        LABOR_LOSS_RATE: specialExams?.Result_Input?.LABOR_LOSS_RATE,
        CURRENT_JOB: specialExams?.Result_Input?.CURRENT_JOB,
        DIANOSE: specialExams?.Result_Input?.DIANOSE,
        SYMPTOMS: specialExams?.Result_Input?.SYMPTOMS,
        SOLUTION: specialExams?.Result_Input?.SOLUTION
      })
    }
  }, [physicalExam, form])

  const handleSubmitScreeningExamResult = async () => {
    const data = { ...form.getFieldsValue() };
    const {
      RESULT_SELECT_ID,
      RESULT_INPUT_NAME,
      RESULT_SELECT_ID_2,
      RESULT_INPUT_NAME_2,
      NOTE
    } = data;

    if (RESULT_SELECT_ID === undefined || RESULT_SELECT_ID === null) { return }
    if (
      specialDiseaseType === 3
      && (RESULT_SELECT_ID_2 === undefined || RESULT_SELECT_ID_2 === null)
    ) { return }

    if (specialDiseaseType !== 3) {
      if (physicalExam) {
        const resultSelect = RESULT_SELECT_ID.split("*-*");
        const specialExams = physicalExam?.Special_Exams[0];
        if (RESULT_INPUT_NAME && (RESULT_INPUT_NAME.trim() !== specialExams.RESULT_INPUT_NAME)) {
          const res = await specialExamResultApi.createSpecialExamResult({
            NAME: RESULT_INPUT_NAME,
            TYPE: specialExams.SPECIAL_DISEASE_TYPE,
          });
          if (res.data) {
            const specialExamData = {
              RESULT_SELECT_ID: Number(resultSelect[0]),
              RESULT_SELECT_NAME: resultSelect[1],
              RESULT_INPUT_ID: res.data.elements.id,
              RESULT_INPUT_NAME: RESULT_INPUT_NAME,
              NOTE,
            }
            handleUpdateSpecialExam(specialExamData);
          }
        } else {
          handleUpdateSpecialExam({
            RESULT_SELECT_ID: Number(resultSelect[0]),
            RESULT_SELECT_NAME: resultSelect[1],
            NOTE: NOTE,
          })
        }
      } else {
        const resultSelect = RESULT_SELECT_ID.split("*-*");
        if (RESULT_INPUT_NAME && (RESULT_INPUT_NAME.trim() !== "")) {
          const res = await specialExamResultApi.createSpecialExamResult({
            NAME: RESULT_INPUT_NAME,
            TYPE: specialDiseaseType,
          });
          if (res.data) {
            const specialExamData = {
              RESULT_SELECT_ID: Number(resultSelect[0]),
              RESULT_SELECT_NAME: resultSelect[1],
              RESULT_INPUT_ID: res.data.elements.id,
              RESULT_INPUT_NAME: RESULT_INPUT_NAME,
              NOTE,
            }
            handleUpdateSpecialExam(specialExamData);
          }
        } else {
          handleUpdateSpecialExam({
            RESULT_SELECT_ID: Number(resultSelect[0]),
            RESULT_SELECT_NAME: resultSelect[1],
            NOTE: NOTE,
          })
        }
      }
    }
    // run when specialDiseaseType is 3
    else {
      const resultSelect = RESULT_SELECT_ID.split("*-*");
      const resultSelect_2 = RESULT_SELECT_ID_2.split("*-*");
      let id1 = null, id2 = null;
      if (physicalExam) {
        const specialExams = physicalExam?.Special_Exams[0];
        if (RESULT_INPUT_NAME && (RESULT_INPUT_NAME.trim() !== specialExams.RESULT_INPUT_NAME)) {
          const res = await specialExamResultApi.createSpecialExamResult({
            NAME: RESULT_INPUT_NAME,
            TYPE: specialExams.SPECIAL_DISEASE_TYPE,
          });
          if (res.data) {
            id1 = res.data.elements.id;
          }
        }
        if (RESULT_INPUT_NAME_2 && (RESULT_INPUT_NAME_2.trim() !== specialExams.RESULT_INPUT_NAME_2)) {
          const res = await specialExamResultApi.createSpecialExamResult({
            NAME: RESULT_INPUT_NAME_2,
            TYPE: specialExams.SPECIAL_DISEASE_TYPE,
          });
          if (res.data) {
            id2 = res.data.elements.id;
          }
        }
        const specialExamData = {
          RESULT_SELECT_ID: Number(resultSelect[0]),
          RESULT_SELECT_NAME: resultSelect[1],
          RESULT_INPUT_ID: id1,
          RESULT_INPUT_NAME: RESULT_INPUT_NAME,
          RESULT_SELECT_ID_2: Number(resultSelect_2[0]),
          RESULT_SELECT_NAME_2: resultSelect_2[1],
          RESULT_INPUT_ID_2: id2,
          RESULT_INPUT_NAME_2: RESULT_INPUT_NAME_2,
          NOTE,
        }
        handleUpdateSpecialExam(specialExamData);
      } else {
        if (RESULT_INPUT_NAME && (RESULT_INPUT_NAME.trim() !== "")) {
          const res = await specialExamResultApi.createSpecialExamResult({
            NAME: RESULT_INPUT_NAME,
            TYPE: specialDiseaseType,
          });
          if (res.data) {
            id1 = res.data.elements.id;
          }
        }
        if (RESULT_INPUT_NAME_2 && (RESULT_INPUT_NAME_2.trim() !== "")) {
          const res = await specialExamResultApi.createSpecialExamResult({
            NAME: RESULT_INPUT_NAME_2,
            TYPE: specialDiseaseType,
          });
          if (res.data) {
            id2 = res.data.elements.id;
          }
        }
        const specialExamData = {
          RESULT_SELECT_ID: Number(resultSelect[0]),
          RESULT_SELECT_NAME: resultSelect[1],
          RESULT_INPUT_ID: id1,
          RESULT_INPUT_NAME: RESULT_INPUT_NAME,
          RESULT_SELECT_ID_2: Number(resultSelect_2[0]),
          RESULT_SELECT_NAME_2: resultSelect_2[1],
          RESULT_INPUT_ID_2: id2,
          RESULT_INPUT_NAME_2: RESULT_INPUT_NAME_2,
          NOTE,
        }
        handleUpdateSpecialExam(specialExamData);
      }
    }
    form.resetFields();
    setTabActive({
      personalInformation: false,
      medicalHistory: true,
      physicalExam: true,
      conclusions: true,
    });
    setPhysicalExam(undefined);
  }

  const handleSubmitPeriodicExamResult = async () => {
    const data = { ...form.getFieldsValue() };

    const {
      CURRENT_JOB, DIANOSE,
      DISEASE_JOB_NAME, LABOR_LOSS_RATE,
      NOTE, SOLUTION,
      SYMPTOMS, YEAR_DETECTED,
    } = data;

    if (
      CURRENT_JOB === undefined || (CURRENT_JOB.trim() === "") ||
      DIANOSE === undefined || (DIANOSE.trim() === "") ||
      DISEASE_JOB_NAME === undefined || (DISEASE_JOB_NAME.trim() === "") ||
      LABOR_LOSS_RATE === undefined ||
      NOTE === undefined || (NOTE.trim() === "") ||
      SOLUTION === undefined || (SOLUTION.trim() === "") ||
      SYMPTOMS === undefined || (SYMPTOMS.trim() === "") ||
      YEAR_DETECTED === undefined || YEAR_DETECTED === null
    ) { return }
    else {
      try {
        const res = await specialExamResultApi.createSpecialExamResult({
          ...data,
          TYPE: specialDiseaseType,
        })
        if (res.data) {
          handleUpdateSpecialExam({ RESULT_INPUT_ID: res.data.elements.id })
        }
      } catch (err) {
        console.error(err);
      }
      form.resetFields();
      setTabActive({
        personalInformation: false,
        medicalHistory: true,
        physicalExam: true,
        conclusions: true,
      });
      setPhysicalExam(undefined);
    }
  }

  const handleSaveThenClose = () => {
    setEmployeeId(undefined);
    setPhysicalExamId(undefined);
    if (specialExamType === 0) {
      handleSubmitScreeningExamResult();
    } else {
      handleSubmitPeriodicExamResult()
    }
    if (physicalExam && (physicalExam.INPUT_STATUS === 1)) {
      onCancel();
      return;
    } else {
      handleUpdatePhysicalExam({
        ...newPhysicalExam,
        INPUT_STATUS: 1,
      });
      onCancel();
    }
  }

  const handleSaveThenCreateNew = () => {
    setEmployeeId(undefined);
    setPhysicalExamId(undefined);
    if (specialExamType === 0) {
      handleSubmitScreeningExamResult();
    } else {
      handleSubmitPeriodicExamResult()
    }
    if (physicalExam && (physicalExam.INPUT_STATUS === 1)) {
      onCreate();
      return;
    } else {
      handleUpdatePhysicalExam({
        ...newPhysicalExam,
        INPUT_STATUS: 1,
      });
      onCreate();
    }
  }

  const handleSaveThenOpenPDF = () => {
    if (specialExamType === 0) {
      handleSubmitScreeningExamResult();
    } else {
      handleSubmitPeriodicExamResult();
    }
    if (physicalExam && (physicalExam.INPUT_STATUS === 1)) {
      setReload(true);
      setIsOpenFilePDF(true);
      onCancel();
      return;
    } else {
      handleUpdatePhysicalExam({
        ...newPhysicalExam,
        INPUT_STATUS: 1,
      });
      setIsOpenFilePDF(true);
      onCancel();
    }
  }

  const handleClose = () => {
    setEmployeeId(undefined);
    setPhysicalExamId(undefined);
    if (specialExamType === 0) {
      handleSubmitScreeningExamResult();
    } else {
      handleSubmitPeriodicExamResult()
    }
    onCancel();
  }

  return (
    <>
      <Form
        name="wrap"
        colon={false}
        style={{ marginTop: 20 }}
        ref={FrmConclusionRef}
        form={form}
        labelAlign="left"
        labelCol={{
          span: 6,
        }}
        validateMessages={validateMessages}
      >
        {
          specialExamType === 0 &&
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="RESULT_SELECT_ID"
                label={specialDiseaseType === 3 ? "Kết Quả Chức Năng Hô Hấp" : "Kết luận"}
                rules={[
                  { required: true },
                ]}
                labelCol={specialDiseaseType === 3 ? { span: 10 } : { span: 6 }}
              >
                <Select
                  placeholder="Chọn kết luận tại đây"
                  allowClear
                  options={specialExamResultOptions}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="RESULT_INPUT_NAME"
                wrapperCol={specialDiseaseType === 3 ? { md: { offset: 10 } } : { md: { offset: 6 } }}
              >
                <Input placeholder="Nhập kết luận tại đây" />
              </Form.Item>
            </Col>
            {
              specialDiseaseType === 3 &&
              <>
                <Col span={20}>
                  <Form.Item
                    name="RESULT_SELECT_ID_2"
                    label="Kết Quả X-Quang Bụi Phổi Sillic Nghề Nghiệp"
                    rules={[
                      { required: true },
                    ]}
                    labelCol={{ span: 10 }}
                  >
                    <Select
                      placeholder="Chọn kết luận tại đây"
                      allowClear
                      options={specialExamResultOptions}
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item
                    name="RESULT_INPUT_NAME_2"
                    wrapperCol={{ md: { offset: 10 } }}
                  >
                    <Input placeholder="Nhập kết luận tại đây" />
                  </Form.Item>
                </Col>
              </>
            }
            <Col span={20}>
              <Form.Item
                name="NOTE"
                label="Ghi chú"
              >
                <Input.TextArea rows={2} placeholder="Nhập ghi chú tại đây" />
              </Form.Item>
            </Col>
          </Row>
        }
        {
          specialExamType === 1 &&
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="DISEASE_JOB_NAME"
                label="Nghề khi bị bệnh nghề nghiệp"
                rules={[{
                  required: true,
                  whitespace: true,
                }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="YEAR_DETECTED"
                label="Năm phát hiện bệnh"
                rules={[{
                  required: true,
                }]}
              >
                <Select
                  allowClear
                  showSearch
                  options={makeYearSelectOptions(30)}
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="LABOR_LOSS_RATE"
                label="Tỷ lệ mất khả năng lao động"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  },
                  {
                    validator(_, value) {
                      if (!value || /^\d+$/.test(value)) {
                        if (value >= 0 && value <= 100) {
                          return Promise.resolve();
                        }
                      }
                      return Promise.reject('Tỉ lệ nằm trong khoảng từ 0 đến 100%');
                    },
                  },
                ]}
              >
                <Input suffix="%" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="CURRENT_JOB"
                label="Công việc hiện nay"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  }
                ]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="DIANOSE"
                label="Chẩn đoán"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  }
                ]}
              >
                <Input.TextArea rows={2} allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="SYMPTOMS"
                label="Biến chứng"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  }
                ]}
              >
                <Input.TextArea rows={2} allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="SOLUTION"
                label="Hướng giải quyết"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  }
                ]}
              >
                <Input.TextArea rows={2} allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="NOTE"
                label="Ghi chú"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  }
                ]}
              >
                <Input.TextArea rows={2} allowClear />
              </Form.Item>
            </Col>
          </Row>
        }
      </Form>
      <Row justify={{ xs: "center", lg: "center" }} gutter={[48, 24]}>
        <Col>
          <Button
            type="primary"
            onClick={handleClose}
            style={{ minWidth: 120 }}
            htmlType="submit"
          >
            Đóng
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleSaveThenCreateNew}
            style={{ minWidth: 120 }}
            htmlType="submit"
          >
            Lưu &amp; tạo mới
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleSaveThenClose}
            style={{ minWidth: 120 }}
            htmlType="submit"
          >
            Lưu &amp; đóng
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleSaveThenOpenPDF}
            style={{ minWidth: 120 }}
            htmlType="submit"
          >
            Lưu &amp; xuất PDF
          </Button>
        </Col>
      </Row>
      <div style={{ padding: 12 }}></div>
      <Row>
        <Col offset={1}>
          <Button onClick={() => onKeyChange("3")}>Quay lại</Button>
        </Col>
      </Row>
      <OccupationalMedicalExamPDF
        isOpen={isOpenFilePDF}
        onCancel={() => {
          setIsOpenFilePDF(false);
          onCancel();
        }}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
};

export default FrmConclusion;
