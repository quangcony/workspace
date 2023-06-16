import { Input, Modal, Form } from "antd";

const ModalComment = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  user
}) => {
  const [form] = Form.useForm();
  const FULL_NAME = user?.FIRST_NAME + ' ' + user?.LAST_NAME
  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

const handleOk = () => {
  const newData = { ...form.getFieldValue(), NAME: `${FULL_NAME}` };
  if (newData.DESC.trim() === "") return;
  onOk(newData);
  handleCancel();
}

  return (
    <>
      <Modal
        title={`${title} to user ${FULL_NAME}`}
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

export default ModalComment;
