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
  permission,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  // const { enqueueSnackbar } = useSnackbar();
  const handleOk = () => {
    // const newData = { ...form.getFieldValue() }
    // if (!Object.keys(newData).length > 0) {
    //     // enqueueSnackbar("Please fill input!", { variant: "error" })
    //     return
    // }
    // if (permission) {
    //     return onUpdate(form.getFieldValue(), permission.id, () => handleCancel())
    // } else {
    //     onOk(form.getFieldValue(), () => handleCancel())
    // }

    const newData = { ...form.getFieldValue() };

    const { PERMISSION_NAME, DESC, INDEX } = newData;
    if (PERMISSION_NAME.trim() === "" || DESC.trim() === "" || !INDEX) {
      return;
    }

    if (permission) {
      return onUpdate(newData, permission, handleCancel);
    }
    onOk(newData);
  };

  const onFinish = (values) => {
    if (permission) {
      return onUpdate(values, permission.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(permission);
  }, [permission, form]);

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
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 5,
          }}
          wrpermissionerCol={{
            span: 19,
          }}
        >
          <Form.Item
            label="Name"
            name="NAME"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Permission Name!",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="DESC"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Description!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Permission CD"
            name="PERMISSION_CD"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Permission CD!",
              },
            ]}
          >
            <Select defaultValue={0} style={{ width: 200 }}>
              {permissions.map((permission) => (
                <Option key={permission.id} value={permission.PERMISSION_CD}>
                  {permission.PERMISSION_CD}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Index"
            name="INDEX"
            rules={[
              {
                required: true,
                message: "Please input index!",
              },
            ]}
          >
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MutationPermission;
