import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button, Col, DatePicker, Form, Row, Select, Space,
  Table, TreeSelect
} from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDiseaseStatus } from "../../../../hooks/diseaseStatus";
import { useHealthHis } from "../../../../hooks/healthHis";
import { usePhysicalDetail } from "../../../../hooks/physicalDetail";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { diseaseOptionsState } from "../../../../recoil/atom/diseaseState";
import { diseaseStatusOptionsState } from "../../../../recoil/atom/diseaseStatusState";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import { healthHistoryByUserState } from "../../../../recoil/atom/healthHistotyState";
import { physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";
import { newestSpecialExamState } from "../../../../recoil/atom/specialExamState";
import { tabActiveState } from "../../../../recoil/atom/tabActiveState";
import { TblPagination, formatDate } from "../../../../common";
import { useDisease } from "../../../../hooks/disease";
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
        <p>{moment(record.START_DATE).format(formatDate.Type)}</p>
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
            onClick={() => onOpenEdit(record.id)}
          />
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            className={"btn-danger"}
            onClick={() => confirm(record.id)}
          />
        </Space>
      ),
    },
  ];

  useDiseaseStatus();
  useDisease();
  const { createPhysicalDetail } = usePhysicalDetail()
  const {
    createHealthHis,
    updateHealthHis,
    deleteHealthHis,
    healthHis,
    getHealthHis,
    setHealthHis,
    isLoading
  } = useHealthHis();

  const [tabActive, setTabActive] = useRecoilState(tabActiveState);
  const diseaseOptions = useRecoilValue(diseaseOptionsState);
  const diseaseStatusOptions = useRecoilValue(diseaseStatusOptionsState);
  const healthHistoryByUser = useRecoilValue(healthHistoryByUserState);
  const physicalExam = useRecoilValue(physicalExamSelectState);
  const employee = useRecoilValue(employeeSelectState);

  const [diseaseName, setDiseaseName] = useState();

  useEffect(() => {
    if (healthHis) {
      setDiseaseName(healthHis);
      form.setFieldsValue({
        DISEASE_ID: healthHis?.DISEASE_ID,
        START_DATE: moment(healthHis?.START_DATE),
        DISEASE_STATUS_ID: healthHis?.DISEASE_STATUS_ID,
      });
    }
  }, [healthHis, form]);

  const handleSelecDisease = (data, option) => {
    setDiseaseName(option);
  };

  const handleCreatePhysicalDetail = async () => {
    await createPhysicalDetail();
  }
  const handleCreate = async (value) => {
    await createHealthHis(value);
    form.resetFields();
  };
  const onOpenEdit = async (id) => {
    await getHealthHis(id);
  };

  const handleUpdateHealthHis = async (data, id) => {
    await updateHealthHis(data, id);
    form.resetFields();
    setHealthHis(undefined);
  };
  const handleDelete = async (id) => {
    await deleteHealthHis(id);
  };

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Bạn không thể khôi phục mục này!"
  );

  const handleAddNew = () => {
    const newData = {
      ...form.getFieldsValue(),
      DISEASE_NAME: diseaseName?.NAME,
      USER_ID: employee.USER_ID,
    };

    const { DISEASE_ID, START_DATE, DISEASE_STATUS_ID } = newData;
    if (
      DISEASE_ID === undefined || DISEASE_ID === null ||
      START_DATE === undefined || START_DATE === null ||
      DISEASE_STATUS_ID === undefined || DISEASE_STATUS_ID === null
    ) { return }

    if (healthHis) {
      const UPDATE_DATE = new Date();
      const PHYSICAL_EXAM_ID = physicalExam.id
      handleUpdateHealthHis(...newData, PHYSICAL_EXAM_ID, UPDATE_DATE);
    } else {
      handleCreate({ ...newData, PHYSICAL_EXAM_ID: physicalExam.id });
    }
  };

  const handleOk = () => {
    if (physicalExam) {
      onKeyChange("3");
      return;
    }
    if (tabActive.physicalExam) {
      handleCreatePhysicalDetail();
    }
    setTabActive({ ...tabActive, physicalExam: false });
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
          <Row>
            <Col span={7}>
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
                  onSelect={handleSelecDisease}
                />
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
              <Form.Item
                name="START_DATE"
                label={<h5 style={styleSetWidth.textAlign}>Thời gian phát hiện</h5>}
              >
                <DatePicker
                  format={formatDate.Type}
                  style={styleSetWidth.styleWidth}
                />
              </Form.Item>
            </Col>
            <Col span={7} offset={1}>
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
              <Table columns={columns} dataSource={healthHistoryByUser} loading={isLoading} pagination={TblPagination} />
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
