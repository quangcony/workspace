import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalMaritalStatus = ({
  isOpenModal,
  maritalStatus,
  onCancel,
  setMaritalStatusId,
  onOk,
  onUpdate,
  maritalStatusId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (maritalStatus) {
      form.setFieldsValue(maritalStatus);
    }
  }, [maritalStatus, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, NAME } = newData;

    if (DESC.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (maritalStatus) {
      return handleUpdateMaritalStatus(newData);
    }
    handleCreateMaritalStatus(newData);
  };
  const handleCreateMaritalStatus = async (data) => {
    onOk(data, () => handleCancel());
  };
  const handleUpdateMaritalStatus = async (data) => {
    onUpdate(data, maritalStatusId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setMaritalStatusId(undefined);
  };

  return (
    <>
      <Modal
        title={title}
        visible={isOpenModal}
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
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
          id="myForm"
          validateMessages={validateMessages}
        >
          <Form.Item
            label={i18n.t("setting.maritalStatuses.maritalName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.maritalStatuses.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label={i18n.t("setting.maritalStatuses.note")} name="NOTE">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalMaritalStatus;
