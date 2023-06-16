import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../../common";
const ListMedicalDiseases = ({
    medicaldiseases,
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
      fixed: 'left',
    },
    {
      title: "Name",
      dataIndex: "NAME",
      width: "15%",
      sorter: (a, b) => a.NAME - b.NAME,
      fixed: 'left',

    },
    {
      title: "Description",
      dataIndex: "DESC",
      width: "35%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "CD",
      dataIndex: "CD",
      width: "35%",
      sorter: (a, b) => a.CD.length - b.CD.length,
    },
    {
        title: "Type Id",
        dataIndex: "TYPE_ID",
        width: "35%",
        sorter: (a, b) => a.TYPE_ID.length - b.TYPE_ID.length,
      },
      {
        title: "NOTE",
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
    "Are you sure delete this medical disease?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={medicaldiseases}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListMedicalDiseases;
