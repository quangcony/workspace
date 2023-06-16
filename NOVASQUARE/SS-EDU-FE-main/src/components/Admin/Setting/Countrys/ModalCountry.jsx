import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalCountry = ({
  isOpenModal,
  countryId,
  onCancel,
  setCountryGetId,
  onOk,
  onUpdate,
  countryGetId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (countryId) {
      form.setFieldsValue(countryId);
    }
  }, [countryId, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, CD, NAME } = newData;

    if (DESC.trim() === "" || CD.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (countryId) {
      return handleUpdateCountry(newData);
    }
    handleCreateCountry(newData);
  };
  const handleCreateCountry = async (data) => {
    onOk(data, () => handleCancel());
  };
  const handleUpdateCountry = async (data) => {
    onUpdate(data, countryGetId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setCountryGetId(undefined);
  };

  return (
    <>
      <Modal
        title={title}
        visible={isOpenModal}
        onCancel={handleCancel}
        maskClosable={false}
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
            label={i18n.t("setting.countries.countryCode")}
            name="CD"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.countries.countryName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.countries.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label={i18n.t("setting.countries.note")} name="NOTE">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalCountry;
