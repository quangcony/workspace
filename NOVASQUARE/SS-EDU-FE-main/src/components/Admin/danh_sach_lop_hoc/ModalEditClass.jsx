import { Input, Modal, Form } from "antd";
import { useEffect } from "react";

const ModalEditComment = ({
  title = "",
  isOpen,
  onCancel,
  loading,
  userstatus,
  onUpdate,
  commentId
}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };
   onUpdate(newData, commentId, () => handleCancel());
  };

  useEffect(() => {
    if (userstatus) {
      form.setFieldsValue({
        DESC: userstatus.DESC,
      });
    }
  }, [userstatus]);

  return (
    <>
      <Modal
        title={`${title} to user `}
        visible={isOpen}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
        width={700}
      >
        <Form
          form={form}
          name="basic"
          autoComplete="off"
          wrpermissionerCol={{
            span: 20,
          }}
        >
          <Form.Item name="DESC" label="Comment">
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditComment;
