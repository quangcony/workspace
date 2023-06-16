import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button, Col, DatePicker, Form, Input, Row, Select, Space,
  Table, TreeSelect
} from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import diseaseApi from "../../../../../api/diseaseApi";
import diseaseStatusApi from "../../../../../api/diseaseStatusApi";
import healthHisApi from "../../../../../api/healthHisApi";
import { formatDate, TblPagination } from "../../../../../common";
import useConfirmHealthHis from "../../../../../hooks/useConfirmAddHealthHis";
import useConfirmDelete from "../../../../../hooks/useConfirmDelete";
import { diseaseOptionsState, diseasesState } from "../../../../../recoil/atom/diseaseState";
import { diseasesStatusState, diseaseStatusOptionsState } from "../../../../../recoil/atom/diseaseStatusState";
import { employeeSelectState } from "../../../../../recoil/atom/employeeState";
import { newestPhysicalExamState, physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import { tabActiveState } from "../../../../../recoil/atom/tabActiveState";

const styleSetWidth = {
  styleWidth: {
    width: "100%",
  },
  textAlign: {
    textAlign: "center",
    marginBottom: 10,
  },
};

const FrmMedicalHistory = ({ onKeyChange, FrmHealthHisRef }) => {
  const [form] = Form.useForm();
  const diseaseStatusInput = Form.useWatch('DISEASE_STATUS_INPUT', form);
  const diseaseStatusSelect = Form.useWatch('DISEASE_STATUS_ID', form);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      title: "STT",
      width: "5%",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Tên bệnh",
      dataIndex: "DISEASE_NAME",
      width: "40%",
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
      render: (_, record) => record?.Disease_Status?.NAME,
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
            onClick={() => setHealthHis(record)}
          />
          <Button
            className={
              record?.PHYSICAL_EXAM_ID === physicalExamId ? 'btn-danger' : 'hide__elm'
            }
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => confirm(record.id)}
          />
        </Space>
      ),
    },
  ];

  // STATE MANAGEMENT
  const [diseases, setDiseases] = useRecoilState(diseasesState);
  const [diseasesStatus, setDiseasesStatus] = useRecoilState(diseasesStatusState);
  const [tabActive, setTabActive] = useRecoilState(tabActiveState);
  const diseaseOptions = useRecoilValue(diseaseOptionsState);
  const diseaseStatusOptions = useRecoilValue(diseaseStatusOptionsState);
  const physicalExam = useRecoilValue(physicalExamSelectState);
  const newPhysicalExam = useRecoilValue(newestPhysicalExamState);
  const employee = useRecoilValue(employeeSelectState);

  const [diseaseName, setDiseaseName] = useState();
  const [healthHistoryByUser, setHealthHistoryByUser] = useState([]);
  const [physicalExamId, setPhysicalExamId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [healthHis, setHealthHis] = useState();
  const [diseaseSelect, setDiseaseSelect] = useState();

  // SIDE EFFECT
  useEffect(() => {
    if (physicalExam) {
      setPhysicalExamId(physicalExam.id);
    } else if (newPhysicalExam) {
      setPhysicalExamId(newPhysicalExam.id);
    }
  }, [physicalExam, newPhysicalExam]);

  useEffect(() => {
    handleGetAllHealthHis();
    handleGetAllDiseases();
    handleGetAllDiseaseStatus();
  }, []);

  useEffect(() => {
    if (healthHistoryByUser.length) {
      const newData = healthHistoryByUser.reduceRight((a, b) => {
        a.push(b);
        return a;
      }, []);
      setData(newData);
    } else setData([]);
  }, [healthHistoryByUser]);

  useEffect(() => {
    if (healthHis) {
      setDiseaseName(healthHis);
      setDiseaseSelect(healthHis?.Disease?.id);
      form.setFieldsValue({
        DISEASE_ID: healthHis?.DISEASE_ID,
        START_DATE: moment(new Date(healthHis?.START_DATE)),
        DISEASE_STATUS_ID: healthHis?.DISEASE_STATUS_ID,
      });
    }
  }, [healthHis, form]);

  // WORKING WITH API
  // GET DATA
  // Get health history list
  const handleGetAllHealthHis = async () => {
    setIsLoading(true);
    let res = await healthHisApi.getAllHealthHiss();

    if (res.data) {
      const newData = res.data.elements.filter((item) => item?.TYPE === 1);
      setHealthHistoryByUser(() => {
        const result = newData.filter(item => item?.USER_ID === employee?.USER_ID);
        return result;
      });
      setIsLoading(false);
    }
  };
  // Get disease status list
  const handleGetAllDiseaseStatus = async () => {
    const res = await diseaseStatusApi.getAllDiseaseStatus();
    if (res.data)
      setDiseasesStatus(res.data.elements);
  };
  // Get disease list
  const handleGetAllDiseases = async () => {
    const res = await diseaseApi.getAllDisease();
    if (res.data)
      setDiseases(res.data.elements);
  };

  // CREATE HEALTH HISTORY
  const handleCreateHealthHis = async (value) => {
    setIsLoading(true);
    try {
      const res = await healthHisApi.createHealthHis(value);
      if (res.data) {
        enqueueSnackbar(res.data.message, { variant: "success" });
        handleGetAllHealthHis();
        setDiseaseSelect("");
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false)
    }
    form.resetFields();
    setHealthHis(undefined);
  };

  // DELETE HEALTH HISTORY
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const res = await healthHisApi.deleteHealthHis(id);
      if (res.data) {
        enqueueSnackbar(res.data.message, { variant: "success" });
        handleGetAllHealthHis();
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false)
    }
  };

  // HANDLER EVENT FUNCTION 
  const { confirmCreate } = useConfirmHealthHis(
    handleCreateHealthHis,
    "Bệnh trùng với bệnh đã có sẵn trong danh sách Tiền sử bệnh tật, bạn có chắc chắc muốn lưu?"
  );
  const { confirm } = useConfirmDelete(
    handleDelete,
    "Bạn không thể khôi phục mục này!"
  );

  // Check same name of disease status
  const isCheckDiseaseStatus = (name) => {
    return diseasesStatus.some((item) => item.NAME === name);
  }

  const handleChaneValue = (value, data) => {
    const isMatching = diseases.some((item) => value === item?.PARENT_ID);
    if (isMatching) {
      setDiseaseSelect("");
    } else {
      setDiseaseSelect(value);
      setDiseaseName({ id: value, NAME: data[0] });
    }
  };

  const handleAddNew = () => {
    const newData = { ...form.getFieldsValue() };

    const { START_DATE, DISEASE_STATUS_INPUT, DISEASE_STATUS_ID } = newData;
    if (
      diseaseName.id === undefined || diseaseName.NAME === undefined ||
      START_DATE === undefined || START_DATE === null
    ) return;

    if (isCheckDiseaseStatus(DISEASE_STATUS_INPUT?.trim())) {
      enqueueSnackbar('Tình trạng bệnh đã tồn tại.', { variant: 'warning' });
      return;
    }

    const data = {
      DISEASE_ID: diseaseName?.id,
      START_DATE,
      DISEASE_NAME: diseaseName?.NAME || diseaseName?.DISEASE_NAME,
      USER_ID: employee.USER_ID,
      PHYSICAL_EXAM_ID: physicalExam ? physicalExam?.id : newPhysicalExam?.id,
      TYPE: 1
    }

    const DiseaseIdCheck = healthHistoryByUser?.find((item) => item?.DISEASE_ID === diseaseName?.id);

    if (healthHis) {
      if (diseaseStatusInput) {
        (async () => {
          try {
            const res = await diseaseStatusApi.createDiseaseStatus({
              TYPE: 1,
              NAME: DISEASE_STATUS_INPUT,
            })
            if (res.data) {
              handleGetAllDiseaseStatus();
              handleCreateHealthHis({
                ...data,
                DISEASE_STATUS_ID: res.data.elements.id,
                UPDATE_DATE: new Date(),
                START_DATE: null,
              }, healthHis.id)
            }
          } catch (error) {
            console.log(error);
          }
        })()
      } else {
        handleCreateHealthHis({
          ...data,
          DISEASE_STATUS_ID,
          UPDATE_DATE: new Date(),
          START_DATE: null,
        }, healthHis.id);
      }
    } else {
      if (diseaseStatusInput) {
        (async () => {
          try {
            const res = await diseaseStatusApi.createDiseaseStatus({
              TYPE: 1,
              NAME: DISEASE_STATUS_INPUT,
            })
            if (res.data) {
              handleGetAllDiseaseStatus();
              if (DiseaseIdCheck) {
                confirmCreate({
                  ...data,
                  DISEASE_STATUS_ID: res.data.elements.id,
                })
              } else {
                handleCreateHealthHis({
                  ...data,
                  DISEASE_STATUS_ID: res.data.elements.id,
                })
              }
            }
          } catch (error) {
            console.log(error);
          }
        })()
      } else {
        if (DiseaseIdCheck) {
          confirmCreate({
            ...data,
            DISEASE_STATUS_ID,
          })
        } else {
          handleCreateHealthHis({
            ...data,
            DISEASE_STATUS_ID,
          });
        }
      }
    }
  };

  const handleOk = () => {
    if (!physicalExam) {
      setTabActive({ ...tabActive, physicalExam: false });
    }
    onKeyChange("3");
  }

  return (
    <Row justify="center">
      <Col span={20}>
        <Form
          name="medical-history"
          autoComplete="off"
          ref={FrmHealthHisRef}
          form={form}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col xs={22} lg={6}>
              <Form.Item
                name="DISEASE_ID"
                label={<h5 style={styleSetWidth.textAlign}>Tên bệnh</h5>}
              >
                <TreeSelect
                  style={styleSetWidth.styleWidth}
                  treeData={diseaseOptions}
                  showSearch
                  filterTreeNode={(input, item) =>
                    (item?.title ?? "")
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                  onChange={handleChaneValue}
                  value={diseaseSelect}
                />
                <Input style={{ display: "none" }} />
              </Form.Item>
            </Col>
            <Col xs={22} lg={5}>
              <Form.Item
                name="START_DATE"
                label={<h5 style={styleSetWidth.textAlign}>Thời gian phát hiện</h5>}
              >
                <DatePicker
                  format={formatDate.Type}
                  style={styleSetWidth.styleWidth}
                  disabledDate={(current) => current && current > new Date()}
                />
              </Form.Item>
            </Col>
            <Col xs={22} lg={6}>
              <Form.Item
                name="DISEASE_STATUS_INPUT"
                label={
                  <h5 style={styleSetWidth.textAlign}>Tình trạng hiện tại</h5>
                }
              >
                <Input
                  allowClear
                  placeholder='Nhập tình trạng bệnh'
                  disabled={diseaseStatusSelect ? true : false}
                />
              </Form.Item>
            </Col>
            <Col xs={22} lg={5}>
              <Form.Item
                name="DISEASE_STATUS_ID"
                label={<h5 style={styleSetWidth.textAlign}>Tình trạng hiện tại</h5>}
              >
                <Select
                  allowClear
                  options={diseaseStatusOptions}
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
                  placeholder="Chọn tình trạng bệnh"
                  disabled={diseaseStatusInput ? true : false}
                />
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
                    marginTop: 37,
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
                    marginTop: 37,
                  }}
                  icon={<PlusOutlined />}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={TblPagination}
              />
            </Col>
          </Row>
          <Row justify={{ xs: "center", lg: "start" }}>
            <Col>
              <p>
                <span style={{ color: "red" }}>Lưu ý:</span> Trong trường hợp không
                có "Tiền Sử Bệnh Tật", vui lòng bấm nút [Tiếp] để sang trang tiếp
                theo{" "}
              </p>
            </Col>
          </Row>
          <Form.Item>
            <Row justify={{ xs: "space-between", lg: "space-between" }}>
              <Col>
                <Button onClick={() => onKeyChange("1")}>Quay lại</Button>
              </Col>
              <Col>
                <Button onClick={handleOk}>Tiếp</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default FrmMedicalHistory;
