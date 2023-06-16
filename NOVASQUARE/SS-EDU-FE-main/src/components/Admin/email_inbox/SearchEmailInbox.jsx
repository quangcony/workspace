import { Button, Form, Input, Select } from "antd";
import { SyncOutlined, SearchOutlined } from "@ant-design/icons";
import React from "react";
const { Option } = Select;

const SearchEmailInbox = () => {
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
        <div style={{ display: "flex", marginBottom: -15}}>
          <Form.Item name="city" label="Thành phố"style={ styleFlex } >
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
          <Form.Item name="district" label="Quận" style={ styleFlex }>
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
          
        </div>
        <div style={{ display: "flex" }}>
          <Form.Item name="sales_agent" label=" User CD" 
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
          <Form.Item name="FIRST_NAME" label="Họ" style={ styleFlex }>
            <Select
              placeholder="Please choose first name"
              allowClear
              style={{ width: 300, marginRight: 30 }}
            >
              <Option value="level 3">Level 3</Option>
              <Option value="level 2">Level 2</Option>
              <Option value="level 1">Level 1</Option>
            </Select>
          </Form.Item>
          <Form.Item name="LAST_NAME" label="Tên" style={ styleFlex }>
            <Select
              placeholder="Please choose last name"
              allowClear
              style={{ width: 300, marginRight: 30 }}
            >
              <Option value="level 3">Level 3</Option>
              <Option value="level 2">Level 2</Option>
              <Option value="level 1">Level 1</Option>
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
export default SearchEmailInbox;
