import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Input, Select, Radio, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { newestPhysicalExamResultRecruitState } from "../../../../recoil/atom/physicalExamResult";
import { useRecoilState, useRecoilValue } from "recoil";
import physicalExamResultApi from "../../../../api/physicalExamResultApi";
import physicalExamApi from "../../../../api/physicalExamApi";
import { physicalExamNewRecruitState } from "../../../../recoil/atom/physicalExamNew";
import { physicalExamByQueryData } from "../../../../common/getAllApi";
import { physicalExamOptionStateRecruit } from "../../../../recoil/atom/physicalExamState";
import { physicalExamRecruitIdState } from "../../../../recoil/atom/physicalExamState";
import { isLoadingState } from "../../../../recoil/atom/booleanState";
import { useSnackbar } from "notistack";
import { physicalExamFirseCreateRecruitState } from "../../../../recoil/atom/physicalExamProcess";
const { Title } = Typography;

const styleDisplay = {
  marginBottom: {
    marginBottom: 0,
  },
  marginTop: {
    marginTop: 20,
  },
  btnWidth: {
    width: 160,
  },
};

const validateMessages = {
  required: "Trường này không được để trống!",
};
const doctorSelect = [
  {
    value: 1,
    label: "Tư vấn kết quả",
  },
  {
    value: 0,
    label: "Từ chối tư vấn",
  },
];
const managerSelect = [
  {
    value: 1,
    label: "Xác nhận",
  },
  {
    value: 0,
    label: "Yêu cầu tư vấn lại",
  },
];

const { TextArea } = Input;

const FrmConclusion = ({
  onKeyChange,
  FrmConclusionRef,
  onCancel,
  isDoctor,
  isManager,
}) => {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSendDoctor, setIsSendDoctor] = useState(false);
  const [isConsultAgain, setIsConsultAgain] = useState(false);
  const [isRefuse, setIsRefuse] = useState(false);
  const [isSendResult, setIsSendResult] = useState(false);

  const physicalExamResultNew = useRecoilValue(
    newestPhysicalExamResultRecruitState
  );
  const physicalExamGetNew = useRecoilValue(physicalExamNewRecruitState);
  const [physicalExamOption, setPhysicalExamOption] = useRecoilState(
    physicalExamOptionStateRecruit
  );
  const physicalExamRecruitId = useRecoilValue(physicalExamRecruitIdState);
  const [doctorConclusion, setDoctorConclusion] = useState(undefined);
  // const [doctorStatus, setDoctorStatus] = useState(1);
  const [managerConclusion, setManagerConclusion] = useState({ value: 1 });
  // const [managerStatus, setManagerStatus] = useState(1);
  const [status, setStatus] = useState(
    physicalExamRecruitId?.Physical_Exam_Results[0]?.STATUS
  );
  const [physicalExamFirstCreate, setPhysicalExamFirstCreate] = useRecoilState(
    physicalExamFirseCreateRecruitState
  );

  useEffect(() => {
    if (physicalExamRecruitId) {
      setStatus(physicalExamRecruitId?.Physical_Exam_Results[0]?.STATUS);
      const newData = physicalExamRecruitId?.Physical_Exam_Results[0];
      setDoctorConclusion(
        newData?.DOCTOR_STATUS === "Tư vấn kết quả"
          ? { value: 1 }
          : { value: 0 }
      );
      setManagerConclusion(
        newData?.HR_STATUS === "Xác nhận" ? { value: 1 } : { value: 0 }
      );
      form.setFieldsValue({
        RESULT: newData?.RESULT,
        REASON: newData?.REASON,
        DOCTOR_STATUS: newData?.DOCTOR_STATUS,
        RESULT_2: newData?.RESULT_2,
        REASON_2: newData?.REASON_2,
        HR_STATUS: newData?.HR_STATUS,
      });
      // if (physicalExamRecruitId?.Physical_Exam_Results[0]?.STATUS === 2) {
      //   setDoctorStatus(0);
      // } else {
      //   setDoctorStatus(1);
      // }
      // if (physicalExamRecruitId?.Physical_Exam_Results[0]?.STATUS === 4) {
      //   setManagerStatus(0);
      // } else {
      //   setManagerStatus(1);
      // }
    }
  }, [physicalExamRecruitId, form]);

  //close
  const handleClose = (Status) => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const dataHr = {
      RESULT_2: newData.RESULT_2,
      REASON_2: newData.REASON_2,
      HR_STATUS: managerConclusion?.label,
    };

    const dataDoctor = {
      RESULT: newData.RESULT,
      REASON: newData.REASON,
      DOCTOR_STATUS: doctorConclusion?.label,
    };
    switch (Status) {
      case 1: {
        setIsSendDoctor(true);
        break;
      }
      case 2: {
        setIsRefuse(true);
        break;
      }
      case 3: {
        setIsSendResult(true);
        break;
      }
      case 4: {
        setIsConsultAgain(true);
        break;
      }
      case 5: {
        setIsConfirm(true);
        break;
      }
      default: {
        setIsLoading(true);
      }
    }

    if (Status === undefined) {
      setIsLoading(true);
      handlCancel();
    }

    if (physicalExamRecruitId) {
      // CHECK PHYSICAL EXAM RESULT
      if (physicalExamRecruitId?.Physical_Exam_Results[0]?.id) {
        // CHECK SUBMIT STATUS
        if (Status === 0 || Status === 1 || Status === 4 || Status === 5) {
          handleUpdateResult(
            { ...dataHr, STATUS: Status },
            physicalExamRecruitId?.Physical_Exam_Results[0]?.id
          );
          handleUpdatePhysicalExam(
            { INPUT_STATUS: 1 },
            physicalExamRecruitId?.id
          );
        }
        if (Status === 2 || Status === 3) {
          handleUpdateResult(
            { ...dataDoctor, STATUS: Status },
            physicalExamRecruitId?.Physical_Exam_Results[0]?.id
          );
          handleUpdatePhysicalExam(
            { INPUT_STATUS: 1 },
            physicalExamRecruitId?.id
          );
        }
      }
    } else if (physicalExamResultNew) {
      if (Status === 0 || Status === 1 || Status === 4) {
        handleUpdateResult(
          { ...dataHr, STATUS: Status },
          physicalExamResultNew?.id
        );
        handleUpdatePhysicalExam({ INPUT_STATUS: 1 }, physicalExamGetNew?.id);
      }
    }
  };

  // UPDATE PHYSICAL EXAM RESULT
  const handleUpdateResult = async (data, id) => {
    try {
      await physicalExamResultApi.updatePhysicalExamResult(data, id);
    } catch (error) {
      console.log("Update physical exam result fail!!!");
    }
    handlCancel();
  };
  // UPDATE PHYSICAL EXAM
  const handleUpdatePhysicalExam = async (data, id) => {
    try {
      let res = await physicalExamApi.updatePhysicalExam(data, id);
      if (res.data) {
        physicalExamByQueryData(physicalExamOption, setPhysicalExamOption, {
          INPUT_STATUS: 1,
          TYPE: 3,
        });
        physicalExamByQueryData(
          physicalExamFirstCreate,
          setPhysicalExamFirstCreate,
          {
            INPUT_STATUS: 0,
            TYPE: 3,
          }
        );
        if (physicalExamGetNew) {
          enqueueSnackbar("Physical exam created successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar(res.data.message, {
            variant: "success",
          });
        }
        handlCancel();
      }
    } catch (error) {
      console.log("Update physical exam fail!!!");
    }
  };

  const handleSelectHr = (value, data) => {
    setManagerConclusion(data);
  };

  const handleSelectDoctor = (value, data) => {
    setDoctorConclusion(data);
  };

  const handlCancel = () => {
    onCancel();
    setIsConfirm(false);
    setIsSendDoctor(false);
    setIsRefuse(false);
    setIsSendResult(false);
    setIsConsultAgain(false);
    setIsLoading(false);
    setDoctorConclusion(undefined);
    setManagerConclusion({ value: 1 });
  };

  return (
    <>
      <Form
        name="result"
        colon={false}
        style={styleDisplay.marginTop}
        ref={FrmConclusionRef}
        form={form}
        validateMessages={validateMessages}
      >
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>1. Kết luận của bác sĩ</Title>
            </Col>
            <Col span={10}>
              <Form.Item name="DOCTOR_STATUS">
                <Select
                  style={{ width: "50%" }}
                  options={doctorSelect}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").localeCompare(
                      (optionB?.label ?? "").toLowerCase()
                    )
                  }
                  disabled={!isDoctor}
                  allowClear
                  placeholder="Chọn kết luận"
                  onSelect={handleSelectDoctor}
                  onClear={() => setDoctorConclusion(undefined)}
                ></Select>
              </Form.Item>
              {doctorConclusion?.value === 1 && (
                <Form.Item name="RESULT">
                  <Radio.Group disabled={!isDoctor}>
                    <Radio value={1}> Đủ sức khỏe để làm việc </Radio>
                    <Radio value={2}> Không đủ sức khỏe để làm việc </Radio>
                  </Radio.Group>
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>Lý do</Title>
            </Col>
            <Col span={10}>
              <Form.Item name="REASON">
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  disabled={!isDoctor}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>2. Kết luận của phòng QTNNL</Title>
            </Col>
            <Col span={10}>
              <Form.Item name="HR_STATUS">
                <Select
                  style={{ width: "50%" }}
                  options={managerSelect}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").localeCompare(
                      (optionB?.label ?? "").toLowerCase()
                    )
                  }
                  disabled={isDoctor || !physicalExamRecruitId ? true : false}
                  onClear={() => setManagerConclusion({ value: 1 })}
                  onSelect={handleSelectHr}
                  placeholder="Chọn kết luận"
                  allowClear
                ></Select>
              </Form.Item>
              {managerConclusion?.value === 1 && (
                <Form.Item name="RESULT_2">
                  <Radio.Group
                    disabled={isDoctor || !physicalExamRecruitId ? true : false}
                  >
                    <Radio value={3}> Đủ điều kiện nhận việc </Radio>
                    <Radio value={4}> Không đủ điều kiện nhận việc </Radio>
                  </Radio.Group>
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>Lý do</Title>
            </Col>
            <Col span={10}>
              <Form.Item name="REASON_2">
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  disabled={isDoctor || !physicalExamRecruitId ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={4} offset={6}>
              <Button
                type="primary"
                onClick={() => {
                  if (isDoctor) {
                    handleClose();
                  } else {
                    handleClose(physicalExamRecruitId ? undefined : 0);
                  }
                }}
                htmlType="submit"
                form="result"
                key="result"
                style={styleDisplay.btnWidth}
              >
                {isDoctor ? (
                  isLoading ? (
                    <LoadingOutlined />
                  ) : (
                    "Đóng"
                  )
                ) : physicalExamRecruitId ? (
                  isLoading ? (
                    <LoadingOutlined />
                  ) : (
                    "Đóng"
                  )
                ) : isLoading ? (
                  <LoadingOutlined />
                ) : (
                  "Lưu"
                )}
              </Button>
            </Col>
            {isDoctor ? (
              <>
                <Col span={4} offset={1}>
                  <Button
                    type="primary"
                    onClick={() => handleClose(2)}
                    htmlType="submit"
                    form="result"
                    key="result"
                    style={styleDisplay.btnWidth}
                    disabled={doctorConclusion?.value === 0 ? false : true}
                  >
                    {isRefuse ? <LoadingOutlined /> : "Từ chối tư vấn"}
                  </Button>
                </Col>
                <Col span={4} offset={1}>
                  <Button
                    type="primary"
                    onClick={() => handleClose(3)}
                    htmlType="submit"
                    form="result"
                    key="result"
                    style={styleDisplay.btnWidth}
                    disabled={doctorConclusion?.value === 1 ? false : true}
                  >
                    {isSendResult ? <LoadingOutlined /> : "Gửi kết quả tư vấn"}
                  </Button>
                </Col>
              </>
            ) : (
              <>
                {!physicalExamRecruitId && managerConclusion?.value === 1 ? (
                  <>
                    <Col span={4} offset={1}>
                      <Button
                        type="primary"
                        onClick={() => handleClose(1)}
                        htmlType="submit"
                        form="result"
                        key="result"
                        style={styleDisplay.btnWidth}
                      >
                        {isSendDoctor ? (
                          <LoadingOutlined />
                        ) : (
                          "Gửi bác sĩ tư vấn"
                        )}
                      </Button>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col span={4} offset={1}>
                      <Button
                        type="primary"
                        onClick={() => handleClose(4)}
                        htmlType="submit"
                        form="result"
                        key="result"
                        disabled={managerConclusion?.value === 0 ? false : true}
                        style={styleDisplay.btnWidth}
                      >
                        {isConsultAgain ? (
                          <LoadingOutlined />
                        ) : (
                          "Yêu cầu tư vấn lại"
                        )}
                      </Button>
                    </Col>
                    <Col span={4} offset={1}>
                      <Button
                        type="primary"
                        onClick={() => handleClose(5)}
                        htmlType="submit"
                        form="result"
                        key="result"
                        disabled={managerConclusion?.value === 1 ? false : true}
                        style={styleDisplay.btnWidth}
                      >
                        {isConfirm ? <LoadingOutlined /> : "Xác nhận"}
                      </Button>
                    </Col>
                  </>
                )}
              </>
            )}
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={2} offset={2}>
              <Button onClick={() => onKeyChange("4")} className="btn-submit">
                Quay lại
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default FrmConclusion;
