import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalEmployeeContracType = ({
  isOpenModal,
  employeeContractType,
  onCancel,
  setEmployeeContractTypeId,
  onOk,
  onUpdate,
  employeeContractTypeId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (employeeContractType) {
      form.setFieldsValue(employeeContractType);
    }
  }, [employeeContractType, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, NAME } = newData;

    if (DESC.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (employeeContractType) {
      return handleUpdateEmployeeContractType(newData);
    }
    handleCreateEmployeeContractType(newData);
  };
  const handleCreateEmployeeContractType = async (data) => {
    onOk(data, () => handleCancel());
  };
  const handleUpdateEmployeeContractType = async (data) => {
    onUpdate(data, employeeContractTypeId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setEmployeeContractTypeId(undefined);
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
            label={i18n.t("setting.employeeContractTypes.empTypeName")}
            name="NAME"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.employeeContractTypes.desc")}
            name="DESC"
            rules={[{ required: true }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.employeeContractTypes.note")}
            name="NOTE"
          >
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalEmployeeContracType;
