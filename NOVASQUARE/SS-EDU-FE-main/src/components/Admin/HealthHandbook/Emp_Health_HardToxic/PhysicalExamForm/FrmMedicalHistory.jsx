import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  TreeSelect,
} from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import diseaseStatusApi from "../../../../../api/diseaseStatusApi";
import healthHisApi from "../../../../../api/healthHisApi";
import {
  selectOptions,
  formatDate,
  removeAccents,
} from "../../../../../common";
import { diseasesData, healthHissData } from "../../../../../common/getAllApi";
import { useDisease } from "../../../../../hooks/disease";
import { useDiseaseStatus } from "../../../../../hooks/diseaseStatus";
import { useHealthHis } from "../../../../../hooks/healthHis";
import useConfirmHealthHis from "../../../../../hooks/useConfirmAddHealthHis";
import {
  diseaseOptionsState,
  diseasesState,
} from "../../../../../recoil/atom/diseaseState";
import { employeeSelectState } from "../../../../../recoil/atom/employeeState";
import { healthHistoryState } from "../../../../../recoil/atom/healthHistotyState";
import { newestPhysicalDetailState } from "../../../../../recoil/atom/physicalDetailState";
import { physicalExamNewState } from "../../../../../recoil/atom/physicalExamNew";
import { physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";

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
}) => {
  const [form] = Form.useForm();
  const [diseaseName, setDiseaseName] = useState();
  const { deleteHealthHis, healthHis, getHealthHis, setHealthHis } =
    useHealthHis();
  const { enqueueSnackbar } = useSnackbar();

  useDisease();
  const typingTimeoutRef = useRef(null);
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
  const [diseases, setDiseases] = useRecoilState(diseasesState);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (diseasesStatus && diseasesStatus.length > 0) {
      setDiseaseStatusOption(selectOptions(diseasesStatus));
    } else {
      setDiseaseStatusOption([]);
    }
  }, [diseasesStatus]);

  useEffect(() => {
    if (healthHisAll.length === 0) {
      healthHissData(healthHisAll, setHealthHisAll);
    }
  }, [healthHisAll]);

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

  const [listHealthisByUser, setListHealthisByUser] = useState([]);
  const [datas, setDatas] = useState([]);
  const [cvtData, setCvtData] = useState([]);
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

  const handleGetFields = () => {
    // if physicalExam
    if (physicalExamSelect) {
      if (physicalExamSelect?.Physical_Details?.length === 0) {
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
      if (valueInput) {
        let res = await diseaseStatusApi.createDiseaseStatus({
          TYPE: 1,
          NAME: NAME,
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
                // START_DATE: null,
              });
            } else if (physicalExamGetNew) {
              handleCreate({
                ...newData,
                DISEASE_NAME: healthHis?.DISEASE_NAME,
                PHYSICAL_EXAM_ID: physicalExamGetNew?.id,
                UPDATE_DATE: new Date(),
                USER_ID: physicalExamGetNew?.USER_ID,
                // START_DATE: null,
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
    if (Object.values(cvtData).includes(value?.DISEASE_ID)) {
      confirmCreate(value);
      setHealthHis(undefined);
      form.resetFields();
      setValueInput("");
      setSelectInput(undefined);
    } else {
      await createHealthHis(value);
      setHealthHis(undefined);
      form.resetFields();
      setValueInput("");
      setSelectInput(undefined);
    }
  };

  const handleCreatePhysicalDetail = async () => {
    await onCreatePhysicalDetail();
  };

  // update health his
  const onEdit = async (id) => {
    await getHealthHis(id);
  };

  // delete health his
  const handleDelete = async (id) => {
    await deleteHealthHis(id);
  };
  useEffect(() => {
    if (datas) {
      setCvtData(datas.map((item) => item?.Disease?.id));
    }
  }, [datas]);

  const handleBack = () => {
    onKeyChange("1");
    setIsPersional(true);
    setIsHealthHis(true);
    // onGetPhysicalExam(physicalExamGetNew?.id);
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
    // setValueInput(value);
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
            moment(record?.START_DATE).format(formatDate.Type)}
        </p>
      ),
    },
    {
      title: "Thời gian cập nhật",
      render: (_, record) => (
        <p>
          {record.UPDATE_DATE !== null &&
            moment(record?.UPDATE_DATE).format(formatDate.Type)}
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
      render: (_, record) => (
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
      ),
    },
  ];

  // revert data when create new
  useEffect(() => {
    var newListHealthisByUser = listHealthisByUser.reduceRight(function (
      previous,
      current
    ) {
      previous.push(current);
      return previous;
    },
    []);
    setDatas(newListHealthisByUser);
  }, [listHealthisByUser]);

  //CHECK SELECT DISEASE CHILDREN
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
                // onSelect={handleSelecDisease}
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
                disabled={valueInput ? true : false}
                onSelect={handleSelectInput}
                onClear={handleClearSelect}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={1}>
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
            <Table
              columns={columns}
              dataSource={datas}
              loading={datas ? false : true}
            />
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
              <Button onClick={handleBack}>Quay lại</Button>
            </Col>
            <Col span={2} push={17}>
              <Button onClick={handleGetFields}>Tiếp</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};
export default FrmMedicalHistory;
