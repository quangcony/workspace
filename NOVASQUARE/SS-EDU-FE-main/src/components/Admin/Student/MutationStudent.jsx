import { Button, Col, Input, Modal, Row, Select} from "antd";
import { Form } from "antd";
import Column from "antd/lib/table/Column";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const MutationStudent = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  student,
  onUpdate,
  user,
  branch,
  school,
  studentStatus,
  sourceRegistration,
  studentRegistration
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { enqueueSnackbar } = useSnackbar();
  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    if (!Object.values(newData).length > 0) {
      // enqueueSnackbar("Please fill input!", { variant: "error" })
      return;
    }
    if (student) {
      return onUpdate(form.getFieldValue(), student.id, () =>
        handleCancel()
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };
  const onFinish = (values) => {
    if (student) {
      return onUpdate(values, student.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(student);
  }, [student, form]);

  return (
    <>
      <Modal width='60%'
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
                form={form}
                id="myForm"
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                scrollToFirstError
                labelCol={{
                    span: 12,
                }}

                labelAlign='center'
            >
            <Row>
                <Col span='10'>
                <Form.Item
                    name="USER_ID"
                    label="user Id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
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
                    name="BRANCH_ID"
                    label="Nơi học tập"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={branch}
                    />
                </Form.Item>
                <Form.Item
                    name="SCHOOL_ID"
                    label="Trường"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={school}
                    />
                </Form.Item>
                <Form.Item
                    name="STATUS_ID"
                    label="Trạng thái "
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={studentStatus}
                    />
                </Form.Item>
            
            
                <Form.Item
                    name="SOURCE_REGISTERED_ID"
                    label="Nguồn đăng ký"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={sourceRegistration}
                    />
                </Form.Item>
                <Form.Item
                    name="STUDENT_REGISTERED_ID"
                    label="student registered"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        allowClear
                        showSearch
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={studentRegistration}
                    />
                </Form.Item>
                <Form.Item
                    name="CONSULTANT_ID"
                    label="Tư vấn"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
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
                    name="FOLLOWING_USER_ID"
                    label="following user"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
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
                    name="REGISTERED_USER_ID"
                    label="registered user"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
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
            label="Lớp"
            name="SCHOOL_CLASS_NAME"
          >
            <Input autoFocus={true} />
          </Form.Item>
          </Col>
          <Col>
                <Form.Item
            label="Loại học sinh"
            name="STUDENT_TYPE_ID"
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="GRADUATE_SCHOOL"
            name="GRADUATE_SCHOOL"
            
          >
            <Input autoFocus={true} />
            </Form.Item>
            <Form.Item
            label="ACADEMIC_LEVEL"
            name="ACADEMIC_LEVEL"
          >
            <Input autoFocus={true} />
            </Form.Item>
                <Form.Item
                label="Chuyên ngành"
                name="SPECIALIZED"
                >
            <Input autoFocus={true} />
                </Form.Item>
                <Form.Item
                label="Ngôn ngữ"
                name="FOREIGN_LANGUAGE"
                >
            <Input autoFocus={true} />
                </Form.Item>
                <Form.Item
                label="FOREIGN_LEVEL"
                name="FOREIGN_LEVEL"
                >
            <Input autoFocus={true} />
                </Form.Item>
                <Form.Item
                label="Link facebook"
                name="FACEBOOK_LINK"
                >
            <Input autoFocus={true} />
                </Form.Item>
                <Form.Item
                label="Link zalo"
                name="ZALO_LINK"
                >
            <Input autoFocus={true} />
                </Form.Item>
            <Form.Item
                label="Note"
                name="NOTE"
                >
            <Input autoFocus={true} />
                </Form.Item>
        </Col>
        </Row>
            </Form>
      </Modal>
    </>
  );
};

export default MutationStudent;
