import { Modal, Empty, Button } from "antd";

const ModalCommentInfo = ({
  title = "",
  isOpen,
  onCancel,
  loading,
}) => {
  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Modal
        title={`${title}`}
        visible={isOpen}
        confirmLoading={loading}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button type="primary" onClick={handleCancel}>
              Close
          </Button>
        ]}
      >
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Modal>
    </>
  );
};

export default ModalCommentInfo;
