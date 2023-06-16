import { Button } from "@mui/material";
import { Modal } from "antd";

const ModalCommentInfo = ({
  title = "",
  isOpen,
  onCancel,
  loading,
  userstatus
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
        <p>{(userstatus?.DESC)}</p>
      </Modal>
    </>
  );
};

export default ModalCommentInfo;
