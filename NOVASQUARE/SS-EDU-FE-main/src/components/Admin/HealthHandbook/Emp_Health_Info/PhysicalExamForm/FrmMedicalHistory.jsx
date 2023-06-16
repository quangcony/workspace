import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Select,
  DatePicker,
  Row,
  Col,
  TreeSelect,
  Space,
  Table,
  Input,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHealthHis } from "../../../../../hooks/healthHis";
import { employeeSelectState } from "../../../../../recoil/atom/employeeState";
import moment from "moment";
import { physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import { physicalExamNewState } from "../../../../../recoil/atom/physicalExamNew";
import {
  diseaseOptionsState,
  diseasesState,
} from "../../../../../recoil/atom/diseaseState";
import { useDiseaseStatus } from "../../../../../hooks/diseaseStatus";
import diseaseStatusApi from "../../../../../api/diseaseStatusApi";
import {
  selectOptions,
  formatDate,
  removeAccents,
} from "../../../../../common";
import { healthHistoryState } from "../../../../../recoil/atom/healthHistotyState";
import { newestPhysicalDetailState } from "../../../../../recoil/atom/physicalDetailState";
import { diseasesData, healthHissData } from "../../../../../common/getAllApi";
import { useDisease } from "../../../../../hooks/disease";
import useConfirmHealthHis from "../../../../../hooks/useConfirmAddHealthHis";
import healthHisApi from "../../../../../api/healthHisApi";
import { useSnackbar } from "notistack";
import Tree from "antd/lib/tree/Tree";

const styleSetWidth = {
  styleWidth: {
    width: "100%",
  },
  textAlign: {
    textAlign: "center",
    marginBottom: 10,
  },
};

const FrmMedicalHistory = ({
  setIsPersional,
  setIsHealthHis,
  setIsPhysicalDetail,
  onKeyChange,
  FrmHealthHisRef,
  onCreatePhysicalDetail,
  onGetPhysicalExam,
  setIsGetById,
  isGetById,
  listHealthHisOld,
  setListHealthHisOld,
  healthHis,
  setHealthHis,
}) => {
  useDisease();
  const typingTimeoutRef = useRef(null);
  const [form] = Form.useForm();
  const [diseaseName, setDiseaseName] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const employeeSelect = useRecoilValue(employeeSelectState);
  const physicalExamSelect = useRecoilValue(physicalExamSelectState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewState);
  const diseaseOptions = useRecoilValue(diseaseOptionsState);
  const { getAllDiseaseStatus, diseasesStatus } = useDiseaseStatus();
  const [valueInput, setValueInput] = useState("");
  const [selectInput, setSelectInput] = useState(undefined);

  const [diseaseStatusOption, setDiseaseStatusOption] = useState([]);
  const newPhysicalDetail = useRecoilValue(newestPhysicalDetailState);
  const [healthHisAll, setHealthHisAll] = useRecoilState(healthHistoryState);
  const [dataHealthHis, setDataHealthHis] = useState([]);
  const [listHealthisByUser, setListHealthisByUser] = useState([]);
  const [duplicate, setDuplicate] = useState([]);
  const [error, setError] = useState("");
  const [diseases, setDiseases] = useRecoilState(diseasesState);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (diseasesStatus && diseasesStatus.length > 0) {
      setDiseaseStatusOption(selectOptions(diseasesStatus));
    } else {
      setDiseaseStatusOption([]);
    }
  }, [diseasesStatus]);

  useEffect(() => {
    healthHissData(healthHisAll, setHealthHisAll);
  }, []);

  useEffect(() => {
    diseasesData(diseases, setDiseases);
  }, []);

  useEffect(() => {
    if (healthHis) {
      setDiseaseName(healthHis?.Disease);
      setSelectInput(healthHis?.DISEASE_STATUS_ID);
      setValue(healthHis?.Disease?.id);
      form.setFieldsValue({
        // DISEASE_ID: healthHis?.DISEASE_ID,
        START_DATE: moment(healthHis?.START_DATE),
        DISEASE_STATUS_ID: healthHis?.DISEASE_STATUS_ID,
      });
    }
  }, [healthHis, form]);

  useEffect(() => {
    if (employeeSelect) {
      setListHealthisByUser(
        healthHisAll.filter((item) => item.USER_ID === employeeSelect?.USER_ID)
      );
    } else if (physicalExamSelect) {
      setListHealthisByUser(
        healthHisAll.filter(
          (item) => item.USER_ID === physicalExamSelect?.USER_ID
        )
      );
    }
  }, [employeeSelect, physicalExamSelect, healthHisAll]);

  useEffect(() => {
    if (listHealthisByUser) {
      setDuplicate(listHealthisByUser.map((item) => item?.Disease?.id));
    }
  }, [listHealthisByUser]);

  // check health new
  useEffect(() => {
    if (employeeSelect) {
      setListHealthHisOld(
        healthHisAll.filter((item) => item.USER_ID === employeeSelect?.USER_ID)
      );
    } else if (physicalExamSelect) {
      setListHealthHisOld(
        healthHisAll.filter(
          (item) => item.USER_ID === physicalExamSelect?.USER_ID
        )
      );
    }
  }, [employeeSelect, physicalExamSelect]);
  const [dataHealthHiss, setDataHealthHiss] = useState([]);
  // FIND DISEASE CURRENT
  useEffect(() => {
    if (listHealthisByUser) {
      const r = listHealthisByUser.filter(
        (elem) => !listHealthHisOld.find((item) => elem?.id === item?.id)
      );
      setDataHealthHiss(r);
    }
  }, [listHealthisByUser]);

  const handleGetFields = () => {
    if (physicalExamSelect) {
      if (physicalExamSelect?.Physical_Details[0]?.id) {
        onGetPhysicalExam(physicalExamSelect?.id);
      } else if (newPhysicalDetail) {
        onGetPhysicalExam(physicalExamSelect?.id);
      } else {
        handleCreatePhysicalDetail();
      }
    }
    // if Go back
    else if (newPhysicalDetail) {
      onGetPhysicalExam(physicalExamGetNew?.id);
    }
    // new
    else {
      handleCreatePhysicalDetail();
    }
    onKeyChange("3");
    setIsGetById(!isGetById);
    setIsHealthHis(true);
    setIsPhysicalDetail(false);
  };

  const handleAddNew = async () => {
    const dataGetForm = {
      ...form.getFieldsValue(),
      DISEASE_NAME: diseaseName?.NAME,
      DISEASE_ID: diseaseName?.id,
    };

    const { NAME, DISEASE_STATUS_ID, ...newDataInfo } = dataGetForm;

    if (
      error.length > 0 ||
      dataGetForm.DISEASE_ID === undefined ||
      dataGetForm.START_DATE === undefined ||
      (valueInput && !selectInput && NAME?.trim() === "") ||
      (selectInput && !valueInput && DISEASE_STATUS_ID === undefined) ||
      (!selectInput && !valueInput)
    ) {
      return;
    }

    try {
      if (valueInput.length > 0) {
        let res = await diseaseStatusApi.createDiseaseStatus({
          TYPE: 1,
          NAME: valueInput,
        });

        if (res.data) {
          const newData = {
            ...newDataInfo,
            DISEASE_STATUS_ID: res.data.elements.id,
          };
          if (healthHis) {
            if (physicalExamSelect) {
              handleCreate({
                ...newData,
                USER_ID: physicalExamSelect?.USER_ID,
                DISEASE_NAME: healthHis?.DISEASE_NAME,
                PHYSICAL_EXAM_ID: physicalExamSelect?.id,
                UPDATE_DATE: new Date(),
              });
            } else if (physicalExamGetNew) {
              handleCreate({
                ...newData,
                DISEASE_NAME: healthHis?.DISEASE_NAME,
                PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
                UPDATE_DATE: new Date(),
                USER_ID: physicalExamGetNew?.USER_ID,
              });
            }
          } else if (physicalExamSelect) {
            const newResult = {
              ...newData,
              USER_ID: physicalExamSelect?.USER_ID,
              PHYSICAL_EXAM_ID: physicalExamSelect?.id,
            };
            handleCreate(newResult);
          } else if (employeeSelect && physicalExamGetNew) {
            const newResult = {
              ...newData,
              USER_ID: employeeSelect?.User?.id,
              PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
            };
            handleCreate(newResult);
          }
        }
        getAllDiseaseStatus();
      } else {
        const newData = {
          ...newDataInfo,
          DISEASE_STATUS_ID: dataGetForm?.DISEASE_STATUS_ID,
        };
        if (healthHis) {
          if (physicalExamSelect) {
            handleCreate({
              ...newData,
              USER_ID: physicalExamSelect?.USER_ID,
              DISEASE_NAME: healthHis?.DISEASE_NAME,
              PHYSICAL_EXAM_ID: physicalExamSelect?.id,
              UPDATE_DATE: new Date(),
              START_DATE: null,
            });
          } else if (physicalExamGetNew) {
            handleCreate({
              ...newData,
              DISEASE_NAME: healthHis?.DISEASE_NAME,
              PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
              UPDATE_DATE: new Date(),
              USER_ID: physicalExamGetNew?.USER_ID,
              START_DATE: null,
            });
          }
        } else if (physicalExamSelect) {
          const newResult = {
            ...newData,
            USER_ID: physicalExamSelect?.USER_ID,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          };
          handleCreate(newResult);
        } else if (employeeSelect && physicalExamGetNew) {
          const newResult = {
            ...newData,
            USER_ID: employeeSelect?.User?.id,
            PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
          };
          handleCreate(newResult);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createHealthHis = async (data) => {
    try {
      let res = await healthHisApi.createHealthHis(data);
      if (res.data) {
        getAllHealthHiss();
        setValue("");
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      console.log("Create health hiss fail!");
    }
  };

  const { confirmCreate } = useConfirmHealthHis(
    createHealthHis,
    "Bệnh trùng với bệnh đã có sẵn trong danh sách Tiền sử bệnh tật, bạn có chắc chắc muốn lưu?"
  );

  const handleCreate = async (value) => {
    if (Object.values(duplicate).includes(value?.DISEASE_ID)) {
      confirmCreate(value);
    } else {
      createHealthHis(value);
    }

    form.resetFields();
    setHealthHis(undefined);
    setValueInput("");
    setSelectInput(undefined);
  };
  const handleCreatePhysicalDetail = async () => {
    await onCreatePhysicalDetail();
  };

  const getAllHealthHiss = async () => {
    try {
      let res = await healthHisApi.getAllHealthHiss();
      if (res.data) {
        setHealthHisAll(res.data.elements);
      }
    } catch (error) {
      console.log("Get all health his fail!");
    }
  };

  // UPDATE HEALTH HISTORY
  const onEdit = async (id) => {
    try {
      let res = await healthHisApi.getHealthHis(id);
      if (res.data) {
        setHealthHis(res.data.elements.healthHis);
      }
    } catch (error) {
      console.log("Get health his fail!");
    }
  };

  // DELETE HEALTH HISTORY
  const handleDelete = async (id) => {
    try {
      let res = await healthHisApi.deleteHealthHis(id);
      if (res.data) {
        getAllHealthHiss();
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      console.log("Delete health hiss fail!");
    }
  };

  const handleBack = () => {
    onKeyChange("1");
    setIsPersional(true);
    setIsHealthHis(true);
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    if (value?.length > 0) {
      const isMatching = diseaseStatusOption?.some((item) => {
        const dataOfList = removeAccents(item?.label)?.toLowerCase()?.trim();
        const keyWord = removeAccents(value)?.toLowerCase()?.trim();
        return dataOfList == keyWord;
      });
      if (isMatching) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setError("Tình trạng bệnh đã tồn tại.");
        }, 200);
      } else {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setError("");
        }, 200);
      }
      setValueInput(value);
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setValueInput("");
        setError("");
      }, 200);
    }
  };

  const handleSelectInput = (value) => {
    setSelectInput(value);
  };

  const handleClearSelect = () => {
    setSelectInput(undefined);
  };
  const columns = [
    {
      title: "STT",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên bệnh",
      dataIndex: "DISEASE_NAME",
      width: "40%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thời gian phát hiện",
      render: (_, record) => (
        <p>
          {record.START_DATE !== null &&
            moment(record.START_DATE).format(formatDate.Type)}
        </p>
      ),
    },
    {
      title: "Thời gian cập nhật",
      render: (_, record) => (
        <p>
          {record.UPDATE_DATE !== null &&
            moment(record.UPDATE_DATE).format(formatDate.Type)}
        </p>
      ),
    },
    {
      title: "Tình trạng bệnh",
      render: (_, record) => <p>{record?.Disease_Status?.NAME}</p>,
    },
    {
      title: "Hành động",
      key: "action",
      width: "10%",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => onEdit(record.id)}
            />
            {(record?.PHYSICAL_EXAM_ID === physicalExamSelect?.id ||
              record?.PHYSICAL_EXAM_ID === physicalExamGetNew?.id) && (
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                className={"btn-danger"}
                onClick={() => handleDelete(record.id)}
              />
            )}
          </Space>
        );
      },
    },
  ];

  // revert data when create new
  useEffect(() => {
    var newHealtHiss = listHealthisByUser.reduceRight(function (
      previous,
      current
    ) {
      previous.push(current);
      return previous;
    },
    []);
    setDataHealthHis(newHealtHiss);
  }, [listHealthisByUser]);

  const handleChaneValue = (newvalue, data) => {
    const isMatching = diseases.some((item) => newvalue === item?.PARENT_ID);
    if (isMatching) {
      setValue("");
    } else {
      setValue(newvalue);
      setDiseaseName({ id: newvalue, NAME: data[0] });
    }
  };

  const handleCancel = () => {
    setValue("");
    setValueInput("");
    setSelectInput(undefined);
    setHealthHis(undefined);
    form.resetFields();
  };
  return (
    <>
      <Form
        name="form_tieu_su_benh"
        autoComplete="off"
        ref={FrmHealthHisRef}
        form={form}
      >
        <Row>
          <Col span={8} offset={2}>
            <h5 style={styleSetWidth.textAlign}>Tên bệnh</h5>
          </Col>
          <Col span={3} offset={1}>
            <h5 style={styleSetWidth.textAlign}>Thời gian phát hiện</h5>
          </Col>
          <Col span={4} offset={2}>
            <h5 style={styleSetWidth.textAlign}>Tình trạng hiện tại</h5>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={2}>
            <Form.Item name="DISEASE_ID">
              <TreeSelect
                style={styleSetWidth.styleWidth}
                dropdownStyle={{
                  maxHeight: 800,
                  overflow: "auto",
                }}
                listHeight={550}
                treeData={diseaseOptions}
                allowDrop={false}
                showSearch
                filterTreeNode={(input, item) =>
                  removeAccents(item?.title ?? "")
                    .toLowerCase()
                    .indexOf(removeAccents(input.toLowerCase())) >= 0
                }
                allowClear
                disabled={healthHis && true}
                onChange={handleChaneValue}
                value={value}
              />
              <Input style={{ display: "none" }} />
            </Form.Item>
          </Col>
          <Col span={3} offset={1}>
            <Form.Item name="START_DATE">
              <DatePicker
                format={formatDate.Type}
                style={styleSetWidth.styleWidth}
                disabled={healthHis && true}
                disabledDate={(current) =>
                  current && current.valueOf() > Date.now()
                }
              />
            </Form.Item>
          </Col>
          <Col span={3} offset={1}>
            <Form.Item name="NAME">
              <Input
                placeholder="Nhập tình trạng khác"
                onChange={handleChangeInput}
                disabled={selectInput ? true : false}
                allowClear
              />
              <span style={{ color: "red" }}>{error}</span>
            </Form.Item>
          </Col>
          <Col span={3} offset={1}>
            <Form.Item name="DISEASE_STATUS_ID">
              <Select
                allowClear
                options={diseaseStatusOption}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                disabled={valueInput?.length > 0 ? true : false}
                onSelect={handleSelectInput}
                onClear={handleClearSelect}
                placeholder="Chọn tình trạng bệnh"
              ></Select>
            </Form.Item>
          </Col>
          <Col span={2}>
            {healthHis ? (
              <Space>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  className={"btn-warning"}
                  onClick={() => handleAddNew()}
                  style={{
                    display: "block",
                    marginLeft: 15,
                  }}
                />
                <Button
                  onClick={() => handleCancel()}
                  type="primary"
                  className={"btn-danger"}
                  style={{
                    display: "block",
                  }}
                  icon={<UndoOutlined />}
                />
              </Space>
            ) : (
              <Button
                onClick={() => handleAddNew()}
                title="Create"
                type="primary"
                style={{
                  display: "block",
                  marginLeft: 15,
                }}
                icon={<PlusOutlined />}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <Table columns={columns} dataSource={dataHealthHis} />
          </Col>
        </Row>
        <Row>
          <Col offset={4}>
            <p>
              <span style={{ color: "red" }}>Lưu ý:</span> Trong trường hợp
              không có "Tiền Sử Bệnh Tật", vui lòng bấm nút [Tiếp] để sang trang
              tiếp theo{" "}
            </p>
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
              <Button onClick={handleGetFields} className="btn-submit">
                Tiếp
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};
export default FrmMedicalHistory;
