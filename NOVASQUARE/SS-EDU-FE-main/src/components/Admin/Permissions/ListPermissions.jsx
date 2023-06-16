import { Button, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../common";
const ListPermissions = ({
  permissions,
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
      title: "Name",
      dataIndex: "NAME",
      width: "25%",
      sorter: (a, b) => a.NAME - b.NAME,
      render: (_, record) => (
        <Tooltip title={record.DESC}>{record.NAME}</Tooltip>
      ),
    },
    {
      title: "Permission CD",
      dataIndex: "PERMISSION_CD",
      width: "50%",
      sorter: (a, b) => a.PERMISSION_CD.length - b.PERMISSION_CD.length,
    },
    {
      title: "Index",
      dataIndex: "INDEX",
      width: "20%",
      sorter: (a, b) => a.INDEX - b.INDEX,
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
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record.id)}
            />
            <Button
              disabled={!isDisplayDeleteBtn}
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
    "Are you sure delete this permission?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={permissions}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListPermissions;
