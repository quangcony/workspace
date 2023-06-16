import { Button, Col, DatePicker, Form, Row, Select, Table } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 12,
  },
  labelAlign: "left",
};

const fileImporter = ["Tùng", "Bình", "Tin", ["Duy"]];

function randomDate(start, end) {
  const newDay = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return newDay.toLocaleDateString();
}

const data = [];
for (let i = 0; i < 40; i++) {
  data.push({
    key: i,
    id: ` ${i + 1}`,
    name: fileImporter[Math.floor(Math.random() * fileImporter.length)],
    Ngay_nhap: randomDate(new Date(2022, 0, 1), new Date()),
  });
}

const FileImportHistory = () => {
  const history = useHistory();
  const [newData, setNewData] = useState(data);

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      START_DATE: fieldsValue["START_DATE"]?.format("MM/DD/YYYY"),
      END_DATE: fieldsValue["END_DATE"]?.format("MM/DD/YYYY"),
    };
    if (!values.START_DATE && !values.END_DATE && !values.NGUOI_NHAP_FILE) {
      setNewData(data);
      return;
    }
    if (new Date(values?.START_DATE) > new Date(values?.END_DATE)) {
      alert("Input wrong!!!");
      setNewData(data);
      return;
    }
    const resultData = data?.filter(
      (a) =>
        new Date(a.Ngay_nhap) >= new Date(values?.START_DATE) &&
        new Date(a.Ngay_nhap) <= new Date(values?.END_DATE)
    );

    setNewData(resultData);
  };

  const handleDelete = () => {
    console.log("Okokokok");
  };
  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure close this field?"
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ngày nhập file",
      dataIndex: "Ngay_nhap",
      width: "30%",
      sorter: (a, b) => {
        var aa = a.Ngay_nhap.split("/").reverse().join(),
          bb = b.Ngay_nhap.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      },
    },
    {
      title: "Ngươi nhập file",
      dataIndex: "name",
      width: "30%",
      sorter: (a, b) => ("" + a.name).localeCompare(b.name),
    },
    {
      title: "Xem kết quả nhập file",
      dataIndex: "math",
      render: () => <Button type="link">Xem</Button>,
    },
    {
      title: "Tải file",
      dataIndex: "english",
      render: () => <Button type="link">Download file</Button>,
    },
  ];

  return (
    <div style={{ marginTop: 20 }}>
      <Form {...layout} name="time_related_controls" onFinish={onFinish}>
        <Row>
          <Col span={12} offset={7}>
            <Form.Item
              label="Ngày nhập file"
              style={{
                marginBottom: 0,
              }}
            >
              <Form.Item
                name="START_DATE"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 12px)",
                }}
              >
                <DatePicker format={"DD/MM/YYYY"} />
              </Form.Item>
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  lineHeight: "32px",
                  textAlign: "center",
                }}
              >
                -
              </span>
              <Form.Item
                name="END_DATE"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 12px)",
                }}
              >
                <DatePicker format={"DD/MM/YYYY"} />
              </Form.Item>
            </Form.Item>
            <Form.Item name="NGUOI_NHAP_FILE" label="Người nhập file">
              <Select placeholder="Select a item" allowClear>
                <Option value="Bình">Bình</Option>
                <Option value="Tùng">Tùng</Option>
                <Option value="Duy">Duy</Option>
                <Option value="Tin">Tin</Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 2, offset: 9 }}>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: 15 }}>
        <h5>Danh sách file đã tải lên</h5>
        <Table columns={columns} dataSource={newData} />
      </div>
      <Row>
        <Col span={2} offset={12}>
          <Button type="primary" onClick={() => confirm()}>
            Đóng
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FileImportHistory;
