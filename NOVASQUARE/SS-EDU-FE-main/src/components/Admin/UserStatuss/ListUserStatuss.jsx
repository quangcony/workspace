import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../common";
const ListUserStatuss = ({
  userStatuses,
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
      width: "20%",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "Description",
      dataIndex: "DESC",
      width: "20%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    
    {
      title: "Action Link",
      dataIndex: "ACTION_LINK",
      width: "20%",
      sorter: (a, b) => a.ACTION_LINK - b.ACTION_LINK,
    },
    {
      title: "Is Login",
      dataIndex: "IS_LOGIN",
      render: (a, b) => a ? "True": "False",
      width: "10%",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "Note",
      dataIndex: "NOTE",
      width: "25%",
      sorter: (a, b) => a.NOTE.length - b.NOTE.length,
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
    "Are you sure delete this user status?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={userStatuses}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListUserStatuss;
