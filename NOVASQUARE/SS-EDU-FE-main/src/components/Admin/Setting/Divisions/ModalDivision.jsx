import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalDivision = ({
  isOpenModal,
  division,
  onCancel,
  setDivisionId,
  onOk,
  onUpdate,
  divisionId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (division) {
      form.setFieldsValue(division);
    }
  }, [division, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, NAME } = newData;

    if (DESC.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (division) {
      return handleUpdateDivision(newData);
    }
    handleCreateDivision(newData);
  };
  const handleCreateDivision = async (data) => {
    onOk(data, () => handleCancel());
  };
  const handleUpdateDivision = async (data) => {
    onUpdate(data, divisionId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setDivisionId(undefined);
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
            label={i18n.t("setting.divisions.divCD")}
            name="CD"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.divisions.divName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label={i18n.t("setting.note")} name="NOTE">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDivision;
