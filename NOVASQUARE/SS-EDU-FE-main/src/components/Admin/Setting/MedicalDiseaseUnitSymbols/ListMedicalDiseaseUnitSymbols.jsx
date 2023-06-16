import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../../common";
const ListMedicalDiseaseUnitSymbols = ({
  medicalDiseaseUnitSymbols,
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
      fixed: "left",
    },
    {
      title: "Medical disease unit ID",
      dataIndex: "MEDICAL_DISEASE_UNIT_ID",
      width: "15%",
      sorter: (a, b) => a - b,
      fixed: "left",
    },
    {
      title: "Unit symbol",
      dataIndex: "UNIT_SYMBOL",
      width: "15%",
      sorter: (a, b) => a.UNIT_SYMBOL.localeCompare(b.UNIT_SYMBOL),
      fixed: "left",
    },
    {
      title: "Is default",
      dataIndex: "IS_DEFAULT",
      width: "20%",
      render: (isDefault) => {
        return (
          <Space size="middle">
            {isDefault ? "Yes" : "No"}
          </Space>
        );
      },
      // sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "DESC",
      dataIndex: "DESC",
      width: "25%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "NOTE",
      dataIndex: "NOTE",
      width: "20%",
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
    "Are you sure delete this medical disease unit?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={medicalDiseaseUnitSymbols}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListMedicalDiseaseUnitSymbols;
