import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  TreeSelect,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import diseaseStatusApi from "../../../../api/diseaseStatusApi";
import { selectOptions, formatDate } from "../../../../common";
import { healthHissData } from "../../../../common/getAllApi";
import { useDisease } from "../../../../hooks/disease";
import { useDiseaseStatus } from "../../../../hooks/diseaseStatus";
import { useHealthHis } from "../../../../hooks/healthHis";
import { diseaseOptionsState } from "../../../../recoil/atom/diseaseState";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import { healthHistoryState } from "../../../../recoil/atom/healthHistotyState";
import { newestPhysicalDetailState } from "../../../../recoil/atom/physicalDetailState";
import { physicalExamNewState } from "../../../../recoil/atom/physicalExamNew";
import { physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";

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
  const {
    createHealthHis,
    deleteHealthHis,
    healthHis,
    getHealthHis,
    setHealthHis,
  } = useHealthHis();
  useDisease();
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
    if (healthHis) {
      setDiseaseName(healthHis);
      setSelectInput(healthHis?.DISEASE_STATUS_ID);
      form.setFieldsValue({
        DISEASE_ID: healthHis?.DISEASE_ID,
        START_DATE: moment(healthHis?.START_DATE),
        DISEASE_STATUS_ID: healthHis?.DISEASE_STATUS_ID,
      });
    }
  }, [healthHis, form]);

  const [listHealthisByUser, setListHealthisByUser] = useState([]);
  const [data, setData] = useState([]);

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
    };
    const { NAME, DISEASE_STATUS_ID, ...newDataInfo } = dataGetForm;

    if (
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

  const handleCreate = async (value) => {
    await createHealthHis(value);
    setHealthHis(undefined);
    form.resetFields();
    setValueInput("");
    setSelectInput(undefined);
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

  const handleSelecDisease = (data, option) => {
    setDiseaseName(option);
  };

  const handleBack = () => {
    onKeyChange("1");
    setIsPersional(true);
    setIsHealthHis(true);
    // onGetPhysicalExam(physicalExamGetNew?.id);
  };

  const handleChangeInput = (e) => {
    setValueInput(e.target.value);
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
          {record.START_DATE !== null && moment(record?.START_DATE).format(formatDate.Type)}
        </p>
      ),
    },
    {
      title: "Thời gian cập nhật",
      render: (_, record) => (
        <p>
          {record.UPDATE_DATE !== null && moment(record?.UPDATE_DATE).format(formatDate.Type)}
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
          {/* <Button
            type="primary"
            icon={<DeleteOutlined />}
            className={"btn-danger"}
            onClick={() => handleDelete(record.id)}
          /> */}
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
    setData(newListHealthisByUser);
  }, [listHealthisByUser]);

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
                  (item?.title ?? "")
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                allowClear
                onSelect={handleSelecDisease}
                disabled={healthHis && true}
              />
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
            </Form.Item>
          </Col>
          <Col span={3} offset={1}>
            <Form.Item name="DISEASE_STATUS_ID">
              <Select
                allowClear
                options={diseaseStatusOption}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
            <Table columns={columns} dataSource={data} />
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
