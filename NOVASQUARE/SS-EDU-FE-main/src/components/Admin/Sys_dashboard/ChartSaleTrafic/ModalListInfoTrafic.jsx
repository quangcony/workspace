import { Modal, Button, Table } from "antd";

const ModalListInfoTrafic = ({
  title = "",
  isOpen,
  onCancel,
  loading,
  showDataInfo,
}) => {
  const handleCancel = () => {
    onCancel();
  };
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
  ];

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
          </Button>,
        ]}
      >
        <Table columns={columns} dataSource={showDataInfo} />
      </Modal>
    </>
  );
};

export default ModalListInfoTrafic;
