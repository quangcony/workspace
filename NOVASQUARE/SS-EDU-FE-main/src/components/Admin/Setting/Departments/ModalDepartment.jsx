import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalDepartment = ({
  isOpenModal,
  departmentId,
  onCancel,
  setDepartId,
  onOk,
  onUpdate,
  departId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (departmentId) {
      form.setFieldsValue(departmentId);
    }
  }, [departmentId, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, CD, NAME } = newData;

    if (DESC.trim() === "" || CD.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (departmentId) {
      return handleUpdateDepartment(newData);
    }
    handleCreateDepartment(newData);
  };
  const handleCreateDepartment = async (data) => {
    onOk(data, () => handleCancel());
  };
  const handleUpdateDepartment = async (data) => {
    onUpdate(data, departId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setDepartId(undefined);
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
            label={i18n.t("setting.departments.departCode")}
            name="CD"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.departments.departName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.departments.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label={i18n.t("setting.departments.note")} name="NOTE">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDepartment;
