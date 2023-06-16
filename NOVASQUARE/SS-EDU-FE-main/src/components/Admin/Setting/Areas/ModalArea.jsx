import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalArea = ({
  isOpenModal,
  areaId,
  onCancel,
  setAreaGetId,
  onOk,
  onUpdate,
  areaGetId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (areaId) {
      form.setFieldsValue(areaId);
    }
  }, [areaId, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, NAME } = newData;

    if (DESC.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (areaId) {
      return handleUpdateArea(newData);
    }
    handleCreateArea(newData);
  };
  const handleCreateArea = async (data) => {
    await onOk(data, () => handleCancel());
  };
  const handleUpdateArea = async (data) => {
    await onUpdate(data, areaGetId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setAreaGetId(undefined);
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
            label={i18n.t("setting.areas.areaCode")}
            name="CD"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.areas.areaName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.areas.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label={i18n.t("setting.areas.note")} name="NOTE">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalArea;
