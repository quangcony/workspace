import { Button, Input, Modal } from "antd";
import { Form } from "antd";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const MutationRole = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  role,
  onUpdate,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { enqueueSnackbar } = useSnackbar();
  const handleOk = () => {
    // const newData = { ...form.getFieldValue() }

    // if (!Object.values(newData).length > 0) {
    //     // enqueueSnackbar("Please fill input!", { variant: "error" })
    //     return
    // }
    // if (role) {
    //     return onUpdate(form.getFieldValue(), role.id, () => handleCancel())
    // }
    // onOk(form.getFieldValue(), () => handleCancel())

    const newData = { ...form.getFieldValue() };

    const { ROLE_NAME, DESC, CD } = newData;
    if (ROLE_NAME.trim() === "" || DESC.trim() === "" || CD.trim() === "") {
      return;
    }

    if (role) {
      return onUpdate(newData, role, handleCancel);
    }
    onOk(newData);
  };

  const onFinish = (values) => {
    if (role) {
      return onUpdate(values, role.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    console.log("role ne", role);
    form.setFieldsValue(role);
  }, [role, form]);

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        onOk={handleOk}
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
          wrroleerCol={{
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
                message: "Please input Role Name!",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label="CD"
            name="CD"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Role CD!",
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
        </Form>
      </Modal>
    </>
  );
};

export default MutationRole;
