import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalPosition = ({
  isOpenModal,
  positionId,
  onCancel,
  setPositId,
  onOk,
  onUpdate,
  positId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (positionId) {
      form.setFieldsValue(positionId);
    }
  }, [positionId, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, CD, NAME, JOB_TYPE_DESC } = newData;

    if (
      DESC.trim() === "" ||
      CD.trim() === "" ||
      NAME.trim() === "" ||
      JOB_TYPE_DESC.trim() === ""
    ) {
      return;
    }
    if (positionId) {
      return handleUpdateApp(newData);
    }
    handleCreateApp(newData);
  };
  const handleCreateApp = async (data) => {
    handleCancel();
    onOk(data);
  };
  const handleUpdateApp = async (data) => {
    onUpdate(data, positId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setPositId(undefined);
  };

  return (
    <>
      <Modal
        title={title}
        visible={isOpenModal}
        onCancel={handleCancel}
        style={{ top: 30 }}
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
            label={i18n.t("setting.positions.localCode")}
            name="CD"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.positions.localName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.positions.rank")}
            name="RANK"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.positions.typeDesc")}
            name="JOB_TYPE_DESC"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.positions.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item label={i18n.t("setting.positions.note")} name="NOTE">
            <TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalPosition;
