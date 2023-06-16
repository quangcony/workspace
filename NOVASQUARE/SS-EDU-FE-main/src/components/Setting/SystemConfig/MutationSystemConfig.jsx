import { Button, Input, Modal, Select } from "antd";
import { Form } from "antd";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import permissions from "../../../data_json/Permissions.json";

const { Option } = Select;

const MutationPermission = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  systemConfig,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  // const { enqueueSnackbar } = useSnackbar();
  const handleOk = () => {


    const newData = { ...form.getFieldValue() };

    const { EMAIL_ADDRESS, EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_REFRESH_TOKEN } = newData;
    if (EMAIL_ADDRESS.trim() === "" || EMAIL_CLIENT_ID.trim() === "" || EMAIL_CLIENT_SECRET.trim() === "" || EMAIL_REFRESH_TOKEN.trim() === "") {
      return;
    }

    if (systemConfig) {
      return onUpdate(newData, systemConfig.id, handleCancel);
    }
    onOk(newData, handleCancel);
  };



  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(systemConfig);
  }, [systemConfig, form]);

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        // onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" type="second" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={handleOk}
          >
            OK
          </Button>,
        ]}
      >
        <Form
          id="myForm"
          form={form}
          name="basic"
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 8,
          }}
          wrpermissionerCol={{
            span: 19,
          }}
        >
          <Form.Item
            label="Sender Email Address"
            name="EMAIL_ADDRESS"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Sender Email Address!",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Email Client ID"
            name="EMAIL_CLIENT_ID"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Email Client ID!",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Email Client Secret"
            name="EMAIL_CLIENT_SECRET"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Email Client Secret!",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Email Refresh Token"
            name="EMAIL_REFRESH_TOKEN"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Email Refresh Token!",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Note"
            name="NOTE"
            
          >
            <TextArea rows={4} />
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
};

export default MutationPermission;
