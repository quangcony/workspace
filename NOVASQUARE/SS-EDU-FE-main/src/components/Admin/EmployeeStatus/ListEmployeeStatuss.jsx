import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../common";
import i18n from "../../../lib/Language";

const ListEmployeeStatuss = ({
  employeestatuss,
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
      title: `${i18n.t("setting.employeeStatus.lstName")}`,
      dataIndex: "NAME",
      width: "15%",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: `${i18n.t("setting.desc")}`,
      dataIndex: "DESC",
      width: "35%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: `${i18n.t("setting.note")}`,
      dataIndex: "NOTE",
      width: "35%",
      sorter: (a, b) => a.NOTE.length - b.NOTE.length,
    },
    {
      title: `${i18n.t("setting.action")}`,
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
    "Are you sure delete this employee status?"
  );

  return (
    <>
      <Table
        dataSource={employeestatuss}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
        pagination={TblPagination}
      />
    </>
  );
};

export default ListEmployeeStatuss;
