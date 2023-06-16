import { Empty, Modal, Form,Button } from "antd";

const ModalEmailHistory = ({
  title = "",
  isOpen,
  onCancel,
  loading,
  user
}) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    onCancel();
  };


  return (
    <>
      <Modal
        title={`${title} sending history`}
        visible={isOpen}
        confirmLoading={loading}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button type="primary" onClick={handleCancel}>
              Close
          </Button>
        ]}
      >
        <Form
          form={form}
          name="basic"
          autoComplete="off"
          wrpermissionerCol={{
            span: 20,
          }}
        >
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Form>
      </Modal>
    </>
  );
};

export default ModalEmailHistory;
