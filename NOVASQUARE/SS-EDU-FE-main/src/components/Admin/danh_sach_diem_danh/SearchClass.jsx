import { Button, Form, Input, Select } from "antd";
import { SyncOutlined, SearchOutlined } from "@ant-design/icons";
import React from "react";
const { Option } = Select;

const SearchClass = () => {
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

  return (
    <div style={{ marginBottom: 40, marginTop: 30 }}>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item name="location" label="Cơ sở">
            <Select
              placeholder="Please select the facility"
              allowClear
              style={{ width: 250 }}
            >
              <Option value="01">01</Option>
              <Option value="02">02</Option>
              <Option value="03">03</Option>
            </Select>
          </Form.Item>
          <Form.Item name="class" label="Lớp">
            <Select
              placeholder="Please choose class"
              allowClear
              style={{ width: 250 }}
            >
              <Option value="level 3">Level 3</Option>
              <Option value="level 2">Level 2</Option>
              <Option value="level 1">Level 1</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ngày" name="date">
            <Input disabled style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label="Buổi" name="session">
            <Input disabled style={{ width: 200 }} />
          </Form.Item>
        </div>
        <Form.Item name="couse" label="Môn học">
          <Select placeholder="Please choose a subject" allowClear>
            <Option value="HTML_CSS">HTML and CSS</Option>
            <Option value="PHP">PHP</Option>
            <Option value="JAVA">JAVA</Option>
          </Select>
        </Form.Item>
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
export default SearchClass;
