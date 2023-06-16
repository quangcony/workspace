import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Select,
  Radio,
  Typography,
  TreeSelect,
} from "antd";
import { usePhysicalClassification } from "../../../../hooks/physicalClassification";
import { removeAccents, selectOptions } from "../../../../common";
import { useRecoilState, useRecoilValue } from "recoil";
import { physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";
import { physicalExamNewState } from "../../../../recoil/atom/physicalExamNew";
import { useHealthHis } from "../../../../hooks/healthHis";
import { diseaseOptionsState } from "../../../../recoil/atom/diseaseState";
import {
  addHealthHisStatus,
  deleteHealthHisStatus,
  healthHistoryState,
  healthHistoryStatusState,
} from "../../../../recoil/atom/healthHistotyState";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import physicalExamResultApi from "../../../../api/physicalExamResultApi";
import {
  isCreateState,
  isDownloadState,
  isUpdateState,
} from "../../../../recoil/atom/booleanState";
import { newestPhysicalExamResultState } from "../../../../recoil/atom/physicalExamResult";
import { healthHissData } from "../../../../common/getAllApi";
const { Title } = Typography;

const styleDisplay = {
  marginBottom: {
    marginBottom: 0,
  },
  marginTop: {
    marginTop: 20,
  },
};

const validateMessages = {
  required: "Trường này không được để trống!",
};

const FrmConclusion = ({
  setIsPreClinicalExam,
  setIsPhysicalExamResult,
  onKeyChange,
  FrmConclusionRef,
  onUpdatePhysicalExamResult,
  openFilePDF,
  onUpdatePhysicalExam,
  onCancel,
  onCreateAgain,
}) => {
  const { createHealthHis, deleteHealthHis } = useHealthHis();
  const { physicalclassifications } = usePhysicalClassification();
  const [form] = Form.useForm();

  const [isDownload, setIsDownload] = useRecoilState(isDownloadState);
  const [isCreate, setIsCreate] = useRecoilState(isCreateState);
  const [isUpdate, setIsUpdate] = useRecoilState(isUpdateState);
  const [physicalExamSelect] = useRecoilState(physicalExamSelectState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewState);
  const diseaseOptions = useRecoilValue(diseaseOptionsState);
  const [healthHistoryStatus, setHealthHistoryStatus] = useRecoilState(
    healthHistoryStatusState
  );
  const newPhysicalResult = useRecoilValue(newestPhysicalExamResultState);
  const [healthHisAll, setHealthHisAll] = useRecoilState(healthHistoryState);
  const employeeSelect = useRecoilValue(employeeSelectState);

  const [physicalClassOption, setPhysicalClassOption] = useState([]);
  const [listHealthisByUser, setListHealthisByUser] = useState([]);
  const [dataHealthHiss, setDataHealthHiss] = useState([]);
  const [selectDisease, setSelectDisease] = useState("");

  useEffect(() => {
    if (healthHisAll.length === 0) {
      healthHissData(healthHisAll, setHealthHisAll);
    }
  }, [healthHisAll]);

  useEffect(() => {
    if (physicalclassifications && physicalclassifications.length > 0) {
      setPhysicalClassOption(selectOptions(physicalclassifications));
    } else {
      setPhysicalClassOption([]);
    }
  }, [physicalclassifications]);

  useEffect(() => {
    if (employeeSelect) {
      setListHealthisByUser(
        healthHisAll.filter((item) => item.USER_ID === employeeSelect?.USER_ID)
      );
    } else if (physicalExamSelect) {
      setListHealthisByUser(
        physicalExamSelect?.Health_His?.filter(
          (item) => item.USER_ID === physicalExamSelect?.USER_ID
        )
      );
    }
  }, [employeeSelect, physicalExamSelect, healthHisAll]);

  useEffect(() => {
    if (newPhysicalResult) {
      setHealthHistoryStatus(healthHistoryStatus);
    } else if (physicalExamSelect) {
      const data = healthHisAll.filter(
        (item) =>
          item.PHYSICAL_EXAM_RESULT_ID ===
          physicalExamSelect?.Physical_Exam_Results[0]?.id
      );
      setHealthHistoryStatus(data);
    }
  }, [physicalExamSelect, healthHisAll]);

  // find health
  useEffect(() => {
    if (healthHistoryStatus) {
      const r = healthHistoryStatus.filter(
        (elem) => !listHealthisByUser.find((item) => elem?.id === item?.id)
      );
      setDataHealthHiss(r);
    }
  }, [healthHistoryStatus]);

  useEffect(() => {
    if (physicalExamSelect) {
      const newData = physicalExamSelect?.Physical_Exam_Results[0];
      form.setFieldsValue({
        PHYSICAL_CLASSIFY_ID: newData?.PHYSICAL_CLASSIFY_ID,
        RESULT: newData?.RESULT,
        REASON: newData?.REASON,
        SUGGESTION: newData?.SUGGESTION,
        REQUEST: newData?.REQUEST,
        WARNING_REQUEST: newData?.WARNING_REQUEST,
        PREVENTION: newData?.PREVENTION,
      });
    }
  }, [physicalExamSelect, form]);

  //close
  const handleClose = () => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const { DISEASE_ID, ...result } = newData;

    if (physicalExamSelect) {
      if (physicalExamSelect?.Physical_Exam_Results[0]?.id) {
        handleUpdateResult(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          physicalExamSelect?.Physical_Exam_Results[0]?.id
        );
      } else if (newPhysicalResult) {
        handleUpdateResult(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          newPhysicalResult?.id
        );
      }
    } else {
      const newResult = {
        ...result,
        PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
      };
      handleUpdateResult(newResult, newPhysicalResult?.id);
    }

    onUpdatePhysicalExam(
      {
        ...physicalExamSelect,
        INPUT_STATUS: physicalExamSelect?.PHYSICAL_DATE,
      },
      physicalExamSelect?.id
    );
    setIsPhysicalExamResult(true);
  };

  const handleUpdateResult = async (value, id) => {
    await onUpdatePhysicalExamResult(value, id);
    await onCancel();
  };

  //save and close
  const handleSaveAndClose = () => {
    const newData = {
      ...form.getFieldsValue(),
    };

    const { DISEASE_ID, ...result } = newData;
    const { PHYSICAL_CLASSIFY_ID } = result;

    if (PHYSICAL_CLASSIFY_ID === null || PHYSICAL_CLASSIFY_ID === undefined) {
      return;
    }
    if (physicalExamSelect) {
      if (physicalExamSelect?.Physical_Exam_Results[0]?.id) {
        handleUpdateAndClose(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          physicalExamSelect?.Physical_Exam_Results[0]?.id
        );
      } else if (newPhysicalResult) {
        handleUpdateAndClose(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          newPhysicalResult?.id
        );
      }
      onUpdatePhysicalExam(
        {
          ...physicalExamSelect,
          INPUT_STATUS: 1,
        },
        physicalExamSelect?.id
      );
      dataHealthHiss.map((item) => {
        const { id, ...newData } = item;
        handleCreateHealthHis(newData);
      });
      setIsUpdate(true);
    } else {
      handleUpdateAndClose(
        {
          ...result,
          PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
        },
        newPhysicalResult?.id
      );
      onUpdatePhysicalExam(
        {
          ...physicalExamGetNew,
          INPUT_STATUS: 1,
        },
        physicalExamGetNew?.id
      );
      healthHistoryStatus &&
        healthHistoryStatus.length > 0 &&
        healthHistoryStatus.map((item) => {
          const { id, ...newData } = item;
          handleCreateHealthHis(newData);
        });
    }
    setIsCreate(true);
    setIsPhysicalExamResult(false);
  };

  const handleUpdateAndClose = async (value, id) => {
    await onUpdatePhysicalExamResult(value, id);
    await onCancel();
    setIsPhysicalExamResult(true);
  };

  //save and create new
  const handleSaveAndCreate = () => {
    const newData = {
      ...form.getFieldsValue(),
    };

    const { DISEASE_ID, ...result } = newData;
    const { PHYSICAL_CLASSIFY_ID } = result;
    if (PHYSICAL_CLASSIFY_ID === null || PHYSICAL_CLASSIFY_ID === undefined) {
      return;
    }

    if (physicalExamSelect) {
      if (physicalExamSelect?.Physical_Exam_Results[0]?.id) {
        handleCreateAndSave(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          physicalExamSelect?.Physical_Exam_Results[0]?.id
        );
      } else if (newPhysicalResult) {
        handleCreateAndSave(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          newPhysicalResult?.id
        );
      }
      onUpdatePhysicalExam(
        {
          ...physicalExamSelect,
          INPUT_STATUS: 1,
        },
        physicalExamSelect?.id
      );
      dataHealthHiss.map((item) => {
        const { id, ...newData } = item;
        handleCreateHealthHis(newData);
      });
      setIsUpdate(true);
    } else {
      handleCreateAndSave({
        ...result,
        PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
      });
    }
    onUpdatePhysicalExam(
      {
        ...physicalExamGetNew,
        INPUT_STATUS: 1,
      },
      physicalExamGetNew?.id
    );
    healthHistoryStatus &&
      healthHistoryStatus.length > 0 &&
      healthHistoryStatus.map((item) => {
        const { id, ...newData } = item;
        handleCreateHealthHis(newData);
      });
    setIsCreate(true);
    setIsPhysicalExamResult(false);
  };

  const handleCreateAndSave = async (value, id) => {
    await onUpdatePhysicalExamResult(value, id);
    await onCreateAgain();
    setIsPhysicalExamResult(true);
  };

  //save and PDF
  const handleSaveAndPDF = () => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const { DISEASE_ID, ...result } = newData;

    const { RESULT, PHYSICAL_CLASSIFY_ID } = result;

    if (PHYSICAL_CLASSIFY_ID === null || PHYSICAL_CLASSIFY_ID === undefined) {
      return;
    }

    if (physicalExamSelect) {
      if (physicalExamSelect?.Physical_Exam_Results[0]?.id) {
        handleCreateAndPDF(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          physicalExamSelect?.Physical_Exam_Results[0]?.id
        );
      } else if (newPhysicalResult) {
        handleCreateAndPDF(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          newPhysicalResult?.id
        );
      }
      onUpdatePhysicalExam(
        {
          ...physicalExamSelect,
          INPUT_STATUS: 1,
        },
        physicalExamSelect?.id
      );
      dataHealthHiss.map((item) => {
        const { id, ...newData } = item;
        handleCreateHealthHis(newData);
      });
      setIsUpdate(true);
    } else {
      handleCreateAndPDF(
        {
          ...result,
          PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
        },
        newPhysicalResult?.id
      );
    }
    onUpdatePhysicalExam(
      {
        ...physicalExamGetNew,
        INPUT_STATUS: 1,
      },
      physicalExamGetNew?.id
    );
    healthHistoryStatus &&
      healthHistoryStatus.length > 0 &&
      healthHistoryStatus.map((item) => {
        const { id, ...newData } = item;
        handleCreateHealthHis(newData);
      });
    setIsCreate(true);
    setIsPhysicalExamResult(false);
  };

  const handleCreateAndPDF = async (value, id) => {
    try {
      let resPhysicalResult =
        await physicalExamResultApi.updatePhysicalExamResult(value, id);
      if (resPhysicalResult.data) {
        await onCancel();
        await openFilePDF(
          physicalExamSelect ? physicalExamSelect?.id : physicalExamGetNew?.id,
          employeeSelect
        );
        setIsDownload(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsPhysicalExamResult(true);
  };

  const handleCreateHealthHis = async (data) => {
    await createHealthHis(data);
  };

  const handleSelectDisease = (value, option) => {
    setSelectDisease(option);
  };

  // add new disease current
  const handleAddDiseaseCurrent = () => {
    const newList = {
      DISEASE_ID: selectDisease?.id,
      DISEASE_NAME: selectDisease?.NAME,
      TYPE: 1,
    };
    if (!selectDisease) {
      return;
    }

    if (newPhysicalResult) {
      console.log("333");
      const result = {
        ...newList,
        PHYSICAL_EXAM_RESULT_ID: newPhysicalResult?.id,
        PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
        USER_ID: physicalExamGetNew?.USER_ID,
        START_DATE: physicalExamGetNew?.PHYSICAL_DATE,
      };
      handleCreateDiseaseCurrent(result);
    } else if (physicalExamSelect) {
      console.log("444");
      const result = {
        ...newList,
        PHYSICAL_EXAM_RESULT_ID:
          physicalExamSelect?.Physical_Exam_Results[0]?.id,
        PHYSICAL_EXAM_ID: physicalExamSelect?.id,
        USER_ID: physicalExamSelect?.USER_ID,
        START_DATE: physicalExamSelect?.PHYSICAL_DATE,
      };
      handleCreateDiseaseCurrent(result);
    }
  };

  const handleCreateDiseaseCurrent = (data) => {
    console.log("data:", data);
    const newListHealthHis = addHealthHisStatus(healthHistoryStatus, data);
    setHealthHistoryStatus(newListHealthHis);
    form.setFieldsValue({
      DISEASE_ID: undefined,
    });
    setSelectDisease(undefined);
  };

  // delete disease current
  const handleDelete = async (data) => {
    const newLisst = deleteHealthHisStatus(healthHistoryStatus, data);
    setHealthHistoryStatus(newLisst);
    await deleteHealthHis(data?.id);
  };

  const handleBack = () => {
    onKeyChange("5");
    setIsPreClinicalExam(false);
    setIsPhysicalExamResult(true);
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
              <Title level={5}>
                1. Phân loại sức khỏe{" "}
                <span
                  style={{ color: "red", marginLeft: 10, fontWeight: "normal" }}
                >
                  (*)
                </span>
              </Title>
            </Col>
            <Col span={10}>
              <Form.Item
                name="PHYSICAL_CLASSIFY_ID"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear
                  options={physicalClassOption}
                  showSearch
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.toLowerCase()))
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").localeCompare(
                      (optionB?.label ?? "").toLowerCase()
                    )
                  }
                  // onSelect={handleSelect}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={4}>
              <p style={{ textAlign: "center" }}>Kết luận</p>
            </Col>
            <Col span={10}>
              <Form.Item name="RESULT" initialValue={0}>
                <Radio.Group>
                  <Radio value={0}> Đủ sức khỏe để làm việc </Radio>
                  <Radio value={1}> Không đủ sức khỏe để làm việc </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={4}>
              <p style={{ marginLeft: 20 }}>Lý do</p>
            </Col>
            <Col span={10}>
              <Form.Item name="REASON">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>2. Bệnh lý hiện tại</Title>
            </Col>
            <Col span={9}>
              <div style={{ display: "flex" }}>
                <Form.Item name="DISEASE_ID" style={{ width: "100%" }}>
                  <TreeSelect
                    treeData={diseaseOptions}
                    allowDrop={false}
                    showSearch
                    onSelect={handleSelectDisease}
                    filterTreeNode={(input, item) =>
                      (item?.title ?? "")
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    allowClear
                  />
                </Form.Item>
              </div>
            </Col>
            <Col style={{ marginLeft: 14 }}>
              <Button onClick={handleAddDiseaseCurrent}>+</Button>
            </Col>
          </Row>
          {healthHistoryStatus &&
            healthHistoryStatus.length > 0 &&
            healthHistoryStatus.map((item, index) => (
              <Row key={index}>
                <Col span={1} offset={9}>
                  <p>{index + 1}</p>
                </Col>
                <Col span={9}>
                  <div style={{ display: "flex" }}>
                    <Form.Item style={{ width: "100%" }}>
                      <Input value={item.DISEASE_NAME} />
                    </Form.Item>
                  </div>
                </Col>
                <Col>
                  <Button
                    onClick={() => handleDelete(item)}
                    style={{ marginLeft: 15 }}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            ))}
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>3. Đề nghị của bác sĩ</Title>
            </Col>
            <Col span={10}>
              <Form.Item name="SUGGESTION">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>
                4. Căn cứ vào kết quả khám sức khỏe. Anh/Chị cần đi khám kiểm
                tra
              </Title>
            </Col>
            <Col span={10}>
              <Form.Item name="REQUEST">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>
                5. Các biến chứng của căn bệnh nếu không đi khám và điều trị
              </Title>
            </Col>
            <Col span={10}>
              <Form.Item name="WARNING_REQUEST">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>6. Chế độ phòng bệnh, phòng biến chứng</Title>
            </Col>
            <Col span={10}>
              <Form.Item name="PREVENTION">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={4} offset={5}>
              <Button
                type="primary"
                onClick={handleClose}
                htmlType="submit"
                form="result"
                key="result"
              >
                Đóng
              </Button>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={handleSaveAndCreate}
                htmlType="submit"
                form="result"
                key="result"
              >
                Lưu &amp; tạo mới
              </Button>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={handleSaveAndClose}
                htmlType="submit"
                form="result"
                key="result"
              >
                Lưu &amp; đóng
              </Button>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                onClick={handleSaveAndPDF}
                // disabled
                htmlType="submit"
                form="result"
                key="result"
              >
                Lưu &amp; xuất PDF
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={2} offset={2}>
              <Button onClick={handleBack}>Quay lại</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default FrmConclusion;
