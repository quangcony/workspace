import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import i18n from "../../../../lib/Language";
import { TblPagination } from "../../../../common";
const ListPositions = ({ positions, isLoading, onDelete, openEdit }) => {
  const columns = [
    {
      title: `${i18n.t("setting.id")}`,
      dataIndex: "id",
      width: "15%",
      sorter: (a, b) => ("" + a.id).localeCompare(b.id),
    },
    {
      title: `${i18n.t("setting.positions.localCode")}`,
      dataIndex: "CD",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: `${i18n.t("setting.positions.localName")}`,
      dataIndex: "NAME",
      sorter: (a, b) => ("" + a.NAME).localeCompare(b.NAME),
    },
    {
      title: `${i18n.t("setting.positions.rank")}`,
      dataIndex: "RANK",
      sorter: (a, b) => ("" + a.RANK).localeCompare(b.RANK),
    },
    {
      title: `${i18n.t("setting.positions.typeDesc")}`,
      dataIndex: "JOB_TYPE_DESC",
      sorter: (a, b) => ("" + a.JOB_TYPE_DESC).localeCompare(b.JOB_TYPE_DESC),
    },
    {
      title: `${i18n.t("setting.positions.desc")}`,
      dataIndex: "DESC",
    },
    {
      title: `${i18n.t("setting.positions.note")}`,
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
        dataSource={positions}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListPositions;
