import { DeleteOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
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
} from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useHealthHis } from "../../../../hooks/healthHis";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import moment from "moment";
import { TblPagination, formatDate } from "../../../../common";

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
  setMedicalHistory,
  onKeyChange,
  diseaseOption,
  diseaseStatusOption,
  FrmHealthHisRef,
  onCreatePhysicalDetail,
  physicalExam,
  newPhysicalDetail,
}) => {
  const [form] = Form.useForm();
  const [diseaseName, setDiseaseName] = useState();
  const {
    createHealthHis,
    updateHealthHis,
    deleteHealthHis,
    healthHiss,
    healthHis,
    getHealthHis,
    setHealthHis,
  } = useHealthHis();

  const employeeSelect = useRecoilValue(employeeSelectState);

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

  const [listHealthisByUser, setListHealthisByUser] = useState([]);

  useEffect(() => {
    if (employeeSelect) {
      setListHealthisByUser(
        healthHiss.filter((item) => item.USER_ID === employeeSelect?.USER_ID)
      );
    } else if (physicalExam) {
      setListHealthisByUser(
        healthHiss.filter((item) => item.USER_ID === physicalExam?.USER_ID)
      );
    }
  }, [employeeSelect, physicalExam, healthHiss]);

  const handleGetFields = () => {
    if (physicalExam) {
      onKeyChange("3");
    } else if (newPhysicalDetail) {
      onKeyChange("3");
    } else {
      handleCreatePhysicalDetail();
      setMedicalHistory("done");
      onKeyChange("3");
    }
  };

  const handleAddNew = () => {
    const newData = {
      ...form.getFieldsValue(),
      DISEASE_NAME: diseaseName?.NAME,
      USER_ID: employeeSelect?.User?.id,
    };
    if (healthHis) {
      handleUpdateHealthHis(newData, healthHis?.id);
    } else {
      handleCreate(newData);
    }
  };
  const handleCreate = async (value) => {
    await createHealthHis(value);
    form.resetFields();
  };
  const handleCreatePhysicalDetail = async () => {
    await onCreatePhysicalDetail();
  };

  // update health his
  const onEdit = async (id) => {
    await getHealthHis(id);
  };

  const handleUpdateHealthHis = async (data, id) => {
    await updateHealthHis(data, id);
    form.resetFields();
    setHealthHis(undefined);
  };

  // delete health his
  const handleDelete = async (id) => {
    await deleteHealthHis(id);
  };

  const handleSelecDisease = (data, option) => {
    setDiseaseName(option);
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
        <p>{moment(record.START_DATE).format(formatDate.Type)}</p>
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
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            className={"btn-danger"}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Form
      name="form_tieu_su_benh"
      autoComplete="off"
      ref={FrmHealthHisRef}
      form={form}
    >
      <Row>
        <Col span={6} offset={4}>
          <h5 style={styleSetWidth.textAlign}>Tên bệnh</h5>
        </Col>
        <Col span={6}>
          <h5 style={styleSetWidth.textAlign}>Thời gian phát hiện</h5>
        </Col>
        <Col span={6}>
          <h5 style={styleSetWidth.textAlign}>Tình trạng hiện tại</h5>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={2}>
          <Form.Item name="DISEASE_ID">
            <TreeSelect
              style={styleSetWidth.styleWidth}
              treeData={diseaseOption}
              allowDrop={false}
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
        <Col span={6} offset={1}>
          <Form.Item name="START_DATE">
            <DatePicker
              format={formatDate.Type}
              style={styleSetWidth.styleWidth}
            />
          </Form.Item>
        </Col>
        <Col span={6} offset={1}>
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
          <Table pagination={TblPagination} columns={columns} dataSource={listHealthisByUser} />
        </Col>
      </Row>
      <Row>
        <Col offset={4}>
          <p>
            <span style={{ color: "red" }}>Lưu ý:</span> Trong trường hợp không
            có "Tiền Sử Bệnh Tật", vui lòng bấm nút [Tiếp] để sang trang tiếp
            theo{" "}
          </p>
        </Col>
      </Row>
      <Form.Item>
        <Row>
          <Col span={2} offset={2}>
            <Button onClick={() => onKeyChange("1")}>Quay lại</Button>
          </Col>
          <Col span={2} push={17}>
            <Button onClick={handleGetFields}>
              {/* {physicalExam ? "Cập nhật và Tiếp" : "Tiếp"} */}
              Tiếp
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default FrmMedicalHistory;
