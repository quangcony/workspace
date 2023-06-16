import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../../common";
const ListSourceRegistrations = ({
  sourceRegistrations,
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
      width: "15%",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "Description",
      dataIndex: "DESC",
      width: "35%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Note",
      dataIndex: "NOTE",
      width: "35%",
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
    "Are you sure delete this Source Registrations?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={sourceRegistrations}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListSourceRegistrations;
