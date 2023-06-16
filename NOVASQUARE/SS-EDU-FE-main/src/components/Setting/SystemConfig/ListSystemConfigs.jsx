import { Button, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../common";
const ListSystemConfigs = ({
  systemConfigs,
  isLoading,
  onDelete,
  openEdit,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Sender Email Address",
      dataIndex: "EMAIL_ADDRESS",
      width: "15%",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "Email Client ID",
      dataIndex: "EMAIL_CLIENT_ID",
      width: "20%",
      sorter: (a, b) => a.PERMISSION_CD.length - b.PERMISSION_CD.length,
    },
    {
      title: "Email Client Secret",
      dataIndex: "EMAIL_CLIENT_SECRET",
      width: "20%",
      sorter: (a, b) => a.PERMISSION_CD.length - b.PERMISSION_CD.length,
    },
    {
      title: "Email Refresh Token",
      dataIndex: "EMAIL_REFRESH_TOKEN",
      width: "20%",
      sorter: (a, b) => a.PERMISSION_CD.length - b.PERMISSION_CD.length,
    },
    {
      title: "Action",
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record.id)}
            />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              className={"btn-danger"}
              onClick={() => confirm(record.id)}
            />
          </Space>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    await onDelete(id);
  };

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure delete this systemConfig?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={systemConfigs}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListSystemConfigs;
