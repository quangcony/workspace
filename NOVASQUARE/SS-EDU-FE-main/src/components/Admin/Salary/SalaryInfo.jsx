import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { formatDate } from "../../../common";
import i18n from "../../../lib/Language";
const useStyles = {
  headStyles: {
    backgroundColor: `#${process.env.REACT_APP_CARD_HEADER_COLOR}`,
    borderTop: "5px solid #051a5a",
    height: "48px",
  },
  titleStyles: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
  },
  iconStyles: {
    fontSize: 16,
    color: "white",
    paddingBottom: 10,
  },
  workPlace: {
    color: "rgba(0, 0, 0, 0.7)",
    fontSize: 12,
  },
  titColor: {
    color: "rgba(0, 0, 0, 0.45)",
    paddingRight: 16,
  },
};
const SalaryInfo = ({
  salarySelect,
  dataOption,
  workingStatus,
  salaryRef,
  setTotalTemp,
  totalTemp,
  expenseTypeOption,
}) => {
  const [form] = Form.useForm();
  const [isShow, setIsShow] = useState(true);
  const handleHideElement = () => {
    setIsShow(false);
  };

  useEffect(() => {
    if (salarySelect) {
      form.setFieldsValue({
        ...salarySelect,
        SALARY_DATE: moment(salarySelect?.SALARY_DATE),
        PAYMENT_DATE: moment(salarySelect?.PAYMENT_DATE),
      });
      setTotalTemp(salarySelect?.TOTAL);
    } else {
      form.resetFields();
    }
  }, [salarySelect]);

  const onChangeStatus = (value) => {
    if (value === 15) {
      form.setFieldsValue({ PAYMENT_DATE: moment(new Date()) });
    }
  };

  const onChange = () => {
    const newData = form.getFieldValue();
    setTotalTemp(
      newData?.BASIC_SALARY +
        newData?.PERFORMANCE_SALARY +
        newData?.POSITION +
        newData?.CERTIFICATE +
        newData?.BONUS +
        newData?.ALLOWANCE -
        newData?.TEMPOLARY -
        newData?.SOCIAL_INSURANCE -
        newData?.SOCIAL_UNION -
        newData?.NON_LIFE_INSURANCE
    );
  };

  return (
    <>
      <Card
        title={
          <Space>
            {isShow ? (
              <CaretUpOutlined
                onClick={handleHideElement}
                style={useStyles.iconStyles}
              />
            ) : (
              <CaretDownOutlined
                onClick={() => setIsShow(true)}
                style={useStyles.iconStyles}
              />
            )}
            <Typography.Title style={useStyles.titleStyles}>
              Thông tin lương
            </Typography.Title>
          </Space>
        }
        headStyle={useStyles.headStyles}
        bodyStyle={{
          opacity: isShow ? 1 : 0,
          visibility: isShow ? "visible" : "hidden",
          height: isShow ? "" : 0,
          transition: "0.3s",
          padding: isShow ? "24px 24px 0" : 0,
        }}
        className="card-header"
      >
        <Row>
          <Col
            xs={{
              span: 24,
            }}
            lg={{
              span: 18,
              offset: 3,
            }}
          >
            <Form
              id="salaryInfo"
              form={form}
              name="basic"
              ref={salaryRef}
              //   onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              width="50%"
              autoComplete="off"
              labelAlign="left"
              labelWrap
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 14,
              }}
            >
              <Row>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <Form.Item
                    label="Staff CD"
                    name="USER_ID"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      disabled={salarySelect}
                      allowClear
                      showSearch
                      options={dataOption}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tháng"
                    name="SALARY_MONTH"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Năm"
                    name="SALARY_YEAR"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                  <Form.Item
                    label="Ngày"
                    name="SALARY_DATE"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      format={formatDate.Type}
                      style={{ width: "100%" }}
                      placeholder={false}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lương cơ bản"
                    name="BASIC_SALARY"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lương hiệu suất"
                    name="PERFORMANCE_SALARY"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lương chức vụ"
                    name="POSITION"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lương bằng cấp"
                    name="CERTIFICATE"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                  <Form.Item
                    label="Thưởng"
                    name="BONUS"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tạm ứng"
                    name="TEMPOLARY"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Trợ cấp"
                    name="ALLOWANCE"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Bảo hiểm xã hội"
                    name="SOCIAL_INSURANCE"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tiền công đoàn"
                    name="SOCIAL_UNION"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Bảo hiểm nhân thọ"
                    name="NON_LIFE_INSURANCE"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={onChange}
                      className="salary-input"
                      defaultValue={0}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Trạng thái"
                    name="WORKING_STATUS_ID"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      showSearch
                      options={workingStatus}
                      onChange={onChangeStatus}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ngày thanh toán"
                    name="PAYMENT_DATE"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker format={formatDate.Type} />
                  </Form.Item>
                  <Form.Item
                    label="Loại chi"
                    name="EXPENSE_TYPE_ID"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select allowClear showSearch options={expenseTypeOption} />
                  </Form.Item>
                  <Form.Item
                    label="Ghi chú"
                    name="NOTE"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.TextArea style={{ height: 100 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row>
              <Typography.Title level={4}>
                Tổng tiền:{" "}
                {new Intl.NumberFormat({
                  style: "currency",
                  currency: "VND",
                }).format(totalTemp)}
              </Typography.Title>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default SalaryInfo;
