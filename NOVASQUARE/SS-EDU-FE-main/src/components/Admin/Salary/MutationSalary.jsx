import { Button, Col, DatePicker, Input, Modal, Row, Select } from "antd";
import { Form } from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useEffect } from "react";

const MutationSalary = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  salary,
  onUpdate,
  user,
  workingStatus
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { enqueueSnackbar } = useSnackbar();
  console.log("salary",salary)
  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    if (!Object.values(newData).length > 0) {
      // enqueueSnackbar("Please fill input!", { variant: "error" })
      return;
    }
    if (salary) {
      return onUpdate(form.getFieldValue(), salary.id, () =>
        handleCancel(),
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };
  const onFinish = (values) => {
    if (salary) {
      return onUpdate(values, salary.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };
  useEffect(() => {
    if (salary) {
      form.setFieldsValue({
        ...salary,
        SALARY_DATE : moment(new Date().getDate(),'DD/MM/YYYY')
        // PAYMENT_DATE: moment(salary?.PAYMENT_DATE)
      });
    } else {
      form.resetFields();
    }
  }, [salary]);
  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(salary);
  }, [salary, form]);

  return (
    <>
      <Modal
        width='60%'
        title={title}
        visible={isOpen}
        onOk={handleOk}
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
          autoComplete="off"
          labelCol={{
            span: 8,
          }}
          
          wrroleerCol={{
            span: 14,
          }}
        >
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 11 }}>
          <Form.Item
            label="IDNV"
            name="USER_ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select disabled={salary}
                        allowClear
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={user}

                    />
          </Form.Item>
          <Form.Item
            label="Tháng"
            name="SALARY_MONTH"
            rules={[
              {
                required: true,
                whitespace: true,
              },
            ]}
          >
            
            <Input disabled={salary} />
            
          </Form.Item>
          <Form.Item
            label="Năm"
            name="SALARY_YEAR"
            rules={[
              {
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input disabled={salary}/>
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
            {/* <DatePicker format={"DD/MM/YYYY"} /> */}
            <Input disabled={salary}/>
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
            <Input disabled={salary}/>
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
            <Input disabled={salary}/>
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
            <Input disabled={salary}/>
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
            <Input disabled={salary}/>
          </Form.Item>
        </Col>
          <Col xs={{ span: 40 }} lg={{ span: 13 }}>
          <Form.Item
            label="Thưởng"
            name="BONUS"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled={salary}/>
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
            <Input disabled={salary}/>
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
            <Input disabled={salary}/>
          </Form.Item>
          <Form.Item
            label="Bảo hiểm xã hội"
            name="SOCIAL_INSURANCE"
            rules={[
              {
                required: true,
                whitespace: true,
              },
            ]}
          >
            <Input disabled={salary}/>
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
            <Input disabled={salary}/>
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
            <Input disabled={salary} />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            name="STATUS"
            rules={[
              {
                required: true,
              },
            ]}
          >
            {/* <Select     
                        allowClear
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={workingStatus}

                    /> */}
          <Input/>
          </Form.Item>
          {/* <Form.Item
            label="Ngày thanh toán"
            name="PAYMENT_DATE"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker />
          </Form.Item> */}
          <Form.Item
            label="Loại chi"
            name="EXPENSE_TYPE_ID"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled={salary} />
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
            <Input disabled={salary} />
          </Form.Item>
          </Col>
        </Row>
        </Form>
      </Modal>
    </>
  );
};

export default MutationSalary;
