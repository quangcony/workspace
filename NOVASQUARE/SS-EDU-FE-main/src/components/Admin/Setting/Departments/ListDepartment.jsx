import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import i18n from "../../../../lib/Language";
import { TblPagination } from "../../../../common";
const ListDepartment = ({ departments, isLoading, onDelete, openEdit }) => {
  const columns = [
    {
      title: `${i18n.t("setting.id")}`,
      dataIndex: "id",
      width: "15%",
      sorter: (a, b) => ("" + a.id).localeCompare(b.id),
    },
    {
      title: `${i18n.t("setting.departments.departCode")}`,
      dataIndex: "CD",
      width: "15%",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: `${i18n.t("setting.departments.departName")}`,
      dataIndex: "NAME",
      sorter: (a, b) => ("" + a.NAME).localeCompare(b.NAME),
    },
    {
      title: `${i18n.t("setting.departments.desc")}`,
      dataIndex: "DESC",
    },
    {
      title: `${i18n.t("setting.departments.note")}`,
      dataIndex: "NOTE",
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
    `${i18n.t("general.mesDelete")}`
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={departments}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListDepartment;
