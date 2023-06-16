import { Button, Form, Input, Select } from "antd";
import { SyncOutlined, SearchOutlined } from "@ant-design/icons";
import React from "react";
const { Option } = Select;

const SearchParents = () => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    date: new Date().toLocaleDateString(),
  });

  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const styleFlex = {
    display: 'flex',
    flexDirection: 'column',
    alignItems:'flex-start'
  }
  return (
    <div style={{ marginBottom: 40, marginTop: 20 }}>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <div style={{ display: "flex", }}>
          <Form.Item name="CLASS" label="Class"style={ styleFlex } >
            <Select
              placeholder="Please select the city"
              allowClear
              style={{ width: 300, marginRight: 30 }}
            >
              <Option value="ALL_CITY">All</Option>
              <Option value="DA_NANG">Đà Nẵng</Option>
              <Option value="HO_CHI_MINH">Hồ Chí Minh</Option>
              <Option value="HA_NOI">Hà Nội</Option>
            </Select>
          </Form.Item>
          <Form.Item name="STUDENT_STATUS" label="Status student" style={ styleFlex }>
            <Select
              placeholder="Please choose district"
              allowClear
              style={{ width: 300, marginRight: 30 }}
            >
              <Option value="ALL_DISTRICT">All</Option>
              <Option value="HAI_CHAU">Hải Châu</Option>
              <Option value="SƠN_TRA">Sơn Trà</Option>
              <Option value="THANH_KHE">Thanh Khê</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" style={ styleFlex }>
            <Select
              placeholder="Please choose status"
              allowClear
              style={{ width: 300, marginRight: 30 }}
            >
              <Option value="ALL_STATUS">All</Option>
              <Option value="CONTRACTED">CONTRACTED</Option>
              <Option value="STOP">STOP</Option>
              <Option value="LEARNING">LEARNING</Option>
            </Select>
          </Form.Item>
          <Form.Item name="sales_agent" label=" Nhân viên sale" 
          style={ styleFlex }>
            <Select
              placeholder="Please select the facility"
              allowClear
              style={{ width: 300, marginRight: 30, display:"flex", flexDirection:"column" }}
            >
              <Option value="01">01</Option>
              <Option value="02">02</Option>
              <Option value="03">03</Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item>
          <div style={{ display: "flex" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginRight: 10,
                display: "flex",
                alignItems: "center",
                width: 100,
              }}
            >
              Search
              <SearchOutlined />
            </Button>
            <Button
              htmlType="button"
              onClick={onReset}
              style={{ display: "flex", alignItems: "center", width: 90 }}
            >
              Reset
              <SyncOutlined />
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SearchParents;

