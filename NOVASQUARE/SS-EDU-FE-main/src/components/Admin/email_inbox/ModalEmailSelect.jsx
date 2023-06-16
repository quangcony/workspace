import { Modal, Empty, Button } from "antd";

const ModalEmailSelect = ({
  title = "",
  isOpen,
  onCancel,
  loading,
  allEmailSelect,
}) => {
  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <Modal
        title={`All ${title} select`}
        visible={isOpen}
        confirmLoading={loading}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button type="primary" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div style={{ maxHeight: 500, overflowX: "hidden" }}>
          <ul>
            {allEmailSelect &&
              allEmailSelect.length > 0 &&
              allEmailSelect.map((item) => <li key={item.id}>{item.EMAIL}</li>)}
          </ul>
          {allEmailSelect <= 0 && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalEmailSelect;
