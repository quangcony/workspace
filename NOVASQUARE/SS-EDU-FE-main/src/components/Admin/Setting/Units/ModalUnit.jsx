import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalUnit = ({
  isOpenModal,
  unit,
  onCancel,
  setUnitId,
  onOk,
  onUpdate,
  unitId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (unit) {
      form.setFieldsValue(unit);
    }
  }, [unit, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, CD, NAME } = newData;

    if (DESC.trim() === "" || CD.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (unit) {
      return handleUpdateUnit(newData);
    }
    handleCreateUnit(newData);
  };
  const handleCreateUnit = async (data) => {
    onOk(data, () => handleCancel());
  };
  const handleUpdateUnit = async (data) => {
    onUpdate(data, unitId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setUnitId(undefined);
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
            label={i18n.t("setting.units.unitCode")}
            name="CD"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.units.unitName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.units.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label={i18n.t("setting.units.note")} name="NOTE">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUnit;
