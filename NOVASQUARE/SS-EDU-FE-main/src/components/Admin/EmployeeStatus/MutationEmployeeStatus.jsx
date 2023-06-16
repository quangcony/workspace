import { Button, Input, Modal } from "antd";
import { Form } from "antd";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import i18n from "../../../lib/Language";

const MutationEmployeeStatus = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  employeestatus,
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
    if (employeestatus) {
      return onUpdate(form.getFieldValue(), employeestatus.id, () =>
        handleCancel()
      );
    }
    onOk(form.getFieldValue(), () => handleCancel());
  };

  const onFinish = (values) => {
    if (employeestatus) {
      return onUpdate(values, employeestatus.id, () => handleCancel());
    }
    onOk(values, () => handleCancel());
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(employeestatus);
  }, [employeestatus, form]);

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
            label={i18n.t("setting.employeeStatus.lstName")}
            name="NAME"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please input Employee Status!",
              },
            ]}
          >
            <Input autoFocus={true} />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.desc")}
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
          <Form.Item label={i18n.t("setting.note")} name="NOTE">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MutationEmployeeStatus;
