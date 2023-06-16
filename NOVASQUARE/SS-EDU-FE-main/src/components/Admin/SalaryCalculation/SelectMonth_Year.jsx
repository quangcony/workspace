import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";
import { SelectMonth, yearData } from "../../../common";

const SelectMonthYear = ({ setMonthYear }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const newData = form.getFieldValue();
    setMonthYear(newData);
  };
  const NumberMonth = SelectMonth();

  return (
    <>
      <Form id="myForm" form={form} name="basic">
        <Row>
          <Col span={5}>
            <Typography.Title level={4}>Chọn thời gian</Typography.Title>
          </Col>
          <Col span={19}>
            <Row style={{ width: "70%" }}>
              <Col span={8}>
                <Form.Item
                  name="MONTH"
                  label="Tháng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={new Date().getMonth() + 1}
                >
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    options={NumberMonth}
                    showSearch
                    onSelect={onFinish}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  name="YEAR"
                  label="Năm"
                  style={{ marginLeft: "20px" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={new Date().getFullYear()}
                >
                  <Select
                    showSearch
                    allowClear
                    onSelect={onFinish}
                    style={{ width: "50%" }}
                    defaultValue={new Date().getFullYear()}
                  >
                    {yearData &&
                      yearData.map((item, index) => (
                        <Option key={index} value={item}>
                          {item}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SelectMonthYear;
