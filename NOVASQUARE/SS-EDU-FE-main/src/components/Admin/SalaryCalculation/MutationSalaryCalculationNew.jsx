import { Button, Col, DatePicker, Input, Modal, Row, Select } from "antd";
import { Form } from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { formatDate, removeAccents } from "../../../common";
import { employeeState } from "../../../recoil/atom/employeeState";
import { useSearch } from "react-use-search";
import { logDOM } from "@testing-library/react";
import {
  salarySelect,
  salarySelectstate,
} from "../../../recoil/atom/salaryState";
import { salaryCalculationCreateState } from "../../../recoil/atom/salaryCalculation";
const predicate = (EmployeeData, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const CD = removeAccents(String(EmployeeData.CD)).toLowerCase().trim();
  return CD.includes(newQuery);
};
const MutationSalaryCalculationNew = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  salary,
  onUpdate,
  user,
  workingStatus,
}) => {
  const [salarySelect, setSalarySelect] = useRecoilState(salarySelectstate);
  const employees = useRecoilValue(employeeState);
  const [form] = Form.useForm();
  const [dataOption, setDataOption] = useState([]);
  const dataContract = useRecoilValue(salaryCalculationCreateState);
  useEffect(() => {
    setDataOption(() =>
      employees.map((item) => ({
        // ...item,
        label: item.CD,
        value: item.USER_ID,
      }))
    );
  }, [employees]);
  const onFinish = (values) => {
    const newData = { ...values };
    if (salary) {
      return onUpdate(newData, salary.id, () => handleCancel());
    } else {
      onOk(newData, () => handleCancel());
    }
  };
  useEffect(() => {
    if (salarySelect) {
      form.setFieldsValue({
        ...salarySelect,
        SALARY_DATE: moment(salarySelect?.SALARY_DATE),
        PAYMENT_DATE: moment(salarySelect?.PAYMENT_DATE),
      });
    } else {
      form.resetFields();
    }
  }, [salarySelect]);

  const handleCancel = () => {
    onCancel();
    setSalarySelect(undefined);
    form.resetFields();
  };

  return (
    <>
      <Modal
        width="70%"
        title={title}
        visible={isOpen}
        onOk={onFinish}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" type="second" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            OK
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          form={form}
          name="basic"
          onFinish={onFinish}
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
                label="ID NV"
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Select allowClear showSearch options={workingStatus} />
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
                <Input />
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
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default MutationSalaryCalculationNew;
