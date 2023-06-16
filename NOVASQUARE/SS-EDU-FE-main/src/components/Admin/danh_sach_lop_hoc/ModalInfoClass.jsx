import { Button } from "@mui/material";
import { Modal } from "antd";

const ModalInfoClass = ({
  title = "",
  isOpen,
  onCancel,
  loading,
  classById
}) => {
  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Modal
        title={`${title} to user`}
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
        <p>{classById.CLASS_NAME}</p>
      </Modal>
    </>
  );
};

export default ModalInfoClass;
