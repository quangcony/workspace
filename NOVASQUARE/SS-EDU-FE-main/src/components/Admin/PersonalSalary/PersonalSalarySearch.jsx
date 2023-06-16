import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";
import { SelectMonth, SelectMonthWithTotal, yearData } from "../../../common";

const PersonalSalarySearch = ({ setMonthYear, getAllSalarys }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const newData = form.getFieldValue();
    setMonthYear(newData);
    getAllSalarys();
  };
  const NumberMonth = SelectMonthWithTotal();
  return (
    <>
      <Form id="myForm" form={form} name="basic">
        <Row gutter={10}>
          <Col span={4}>
            <Typography.Title level={4}>Chọn thời gian</Typography.Title>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <Row gutter={10}>
              <Col md={12} sm={24} xs={24}>
                <Form.Item
                  name="MONTH_START"
                  label="Từ tháng"
                  initialValue={new Date().getMonth() + 1}
                >
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    options={NumberMonth}
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col md={12} sm={24} xs={24}>
                <Form.Item
                  name="YEAR_START"
                  label="Năm"
                  allowClear
                  initialValue={new Date().getFullYear()}
                >
                  {/* <Select showSearch allowClear style={{ width: "100%" }}>
                    {yearData &&
                      yearData.map((item, index) => (
                        <Option key={index} value={item}>
                          {item}
                        </Option>
                      ))}
                  </Select> */}
                  <Select showSearch allowClear style={{ width: "100%" }}>
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

          <Col md={6} sm={24} xs={24}>
            <Row gutter={10}>
              <Col md={12} sm={24} xs={24}>
                <Form.Item
                  name="MONTH_END"
                  label="Đến tháng"
                  initialValue={new Date().getMonth() + 1}
                >
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    options={NumberMonth}
                    showSearch
                  />
                </Form.Item>
              </Col>
              <Col md={12} sm={24} xs={24}>
                <Form.Item
                  name="YEAR_END"
                  label="Năm"
                  initialValue={new Date().getFullYear()}
                >
                  <Select showSearch allowClear style={{ width: "100%" }}>
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
          <Col md={6} sm={24} xs={24}>
            <Button type="primary" title="search" onClick={onFinish}>
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PersonalSalarySearch;
