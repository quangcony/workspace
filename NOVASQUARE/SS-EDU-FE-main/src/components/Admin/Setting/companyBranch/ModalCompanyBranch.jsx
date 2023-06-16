import React, { useEffect } from "react";
import { Button, Modal, Input, Form } from "antd";
import i18n from "../../../../lib/Language";
const { TextArea } = Input;

const validateMessages = {
  required: i18n.t("setting.messageValidate"),
};

const ModalCompanyBranch = ({
  isOpenModal,
  workPlace,
  onCancel,
  setWorkPlaceId,
  onOk,
  onUpdate,
  workPlaceId,
  title,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (workPlace) {
      form.setFieldsValue(workPlace);
    }
  }, [workPlace, form]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
    const { DESC, CD, NAME } = newData;

    if (CD.trim() === "" || DESC.trim() === "" || NAME.trim() === "") {
      return;
    }
    if (workPlace) {
      return handleUpdateWorkPlace(newData);
    }
    handleCreateWorkPlace(newData);
  };
  const handleCreateWorkPlace = async (data) => {
    onOk(data, () => handleCancel());
  };
  const handleUpdateWorkPlace = async (data) => {
    onUpdate(data, workPlaceId, () => handleCancel());
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setWorkPlaceId(undefined);
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
            label={i18n.t("setting.workPlaces.wrkPlaceCD")}
            name="CD"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={i18n.t("setting.workPlaces.wrkPlaceName")}
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
export default ModalCompanyBranch;
