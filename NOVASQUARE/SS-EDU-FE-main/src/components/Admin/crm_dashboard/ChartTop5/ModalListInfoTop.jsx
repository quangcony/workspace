import { Modal,Button,Empty } from "antd";

const ModalListInfoTop = ({
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
        width={1000}
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

export default ModalListInfoTop;
