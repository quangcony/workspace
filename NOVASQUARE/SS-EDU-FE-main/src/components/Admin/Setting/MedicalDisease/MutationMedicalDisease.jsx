import { Button, Input, Modal } from "antd";
import { Form } from "antd";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const MutationMedicalDisease = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  medicaldisease,
  onUpdate,
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
    if (medicaldisease) {
      return onUpdate(form.getFieldValue(), medicaldisease.id, () =>
        handleCancel()
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };

  const onFinish = (values) => {
    if (medicaldisease) {
      return onUpdate(values, medicaldisease.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(medicaldisease);
  }, [medicaldisease, form]);

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
                message: "Please input Medical Disease!",
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
            label="CD"
            name="CD"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input CD!",
              },
            ]}
          >
            <Input autoFocus={true} />
            </Form.Item>
            <Form.Item
            label="Type Id"
            name="TYPE_ID"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input type id!",
              },
            ]}
          >
            <Input autoFocus={true} />
            </Form.Item>
          <Form.Item label="Note" name="NOTE">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MutationMedicalDisease;
