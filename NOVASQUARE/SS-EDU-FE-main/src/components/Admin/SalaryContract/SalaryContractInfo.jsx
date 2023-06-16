import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { log } from "@antv/g2plot/lib/utils";
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
const SalaryContractInfo = ({
  dataOption,
  isView,
  salaryContractAddSelect,
  contractFormRef,
  salaryContractSelect,
  setTotalTemp,
  totalTemp,
}) => {
  const [form] = Form.useForm();
  const [isShow, setIsShow] = useState(true);
  const handleHideElement = () => {
    setIsShow(false);
  };
  useEffect(() => {
    if (salaryContractAddSelect) {
      form.setFieldsValue({
        USER_ID: salaryContractAddSelect?.USER_ID,
      });
    }
  }, [salaryContractAddSelect]);

  useEffect(() => {
    if (salaryContractSelect) {
      form.setFieldsValue({
        ...salaryContractSelect,
        CONTRACT_SALARY_DATE: moment(
          salaryContractSelect?.CONTRACT_SALARY_DATE
        ),
      });
      setTotalTemp(salaryContractSelect?.TOTAL);
    } else {
      form.resetFields();
    }
  }, [salaryContractSelect]);

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
              Bảng lương hợp đồng
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
              id="ContractForm"
              form={form}
              name="ContractForm"
              ref={contractFormRef}
              //   onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              width="50%"
              autoComplete="off"
              labelCol={{
                span: 8,
              }}
              // wrroleerCol={{
              //   span: 14,
              // }}
            >
              <Row gutter={10}>
                <Col span={12}>
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
                      disabled
                      allowClear
                      showSearch
                      options={dataOption}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Ngày hợp đồng"
                    name="CONTRACT_SALARY_DATE"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      disabled={isView}
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
                    initialValue={0}
                  >
                    {/* <Input /> */}
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%", textAlign: "right" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lương hiệu suất"
                    name="PERFORMANCE_SALARY"
                    initialValue={0}
                  >
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lương chức vụ"
                    name="POSITION"
                    initialValue={0}
                  >
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Lương bằng cấp"
                    name="CERTIFICATE"
                    initialValue={0}
                  >
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Thưởng" name="BONUS" initialValue={0}>
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Tạm ứng" name="TEMPOLARY" initialValue={0}>
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Trợ cấp" name="ALLOWANCE" initialValue={0}>
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Bảo hiểm xã hội"
                    name="SOCIAL_INSURANCE"
                    initialValue={0}
                  >
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tiền công đoàn"
                    name="SOCIAL_UNION"
                    initialValue={0}
                  >
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Bảo hiểm nhân thọ"
                    name="NON_LIFE_INSURANCE"
                    initialValue={0}
                  >
                    <InputNumber
                      className="salary-input"
                      onChange={onChange}
                      defaultValue={0}
                      style={{ width: "100%" }}
                      disabled={isView}
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                    />
                  </Form.Item>

                  <Form.Item label="Ghi chú" name="NOTE">
                    <Input.TextArea style={{ height: 100 }} disabled={isView} />
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

export default SalaryContractInfo;
