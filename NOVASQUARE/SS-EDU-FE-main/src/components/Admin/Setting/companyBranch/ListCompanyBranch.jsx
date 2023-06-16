import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import i18n from "../../../../lib/Language";
import { TblPagination } from "../../../../common";
const ListCompanyBranch = ({ workPlaces, isLoading, onDelete, openEdit }) => {
  const columns = [
    {
      title: `${i18n.t("setting.id")}`,
      dataIndex: "id",
      sorter: (a, b) => ("" + a.id).localeCompare(b.id),
    },
    {
      title: `${i18n.t("setting.workPlaces.wrkPlaceCD")}`,
      dataIndex: "CD",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: `${i18n.t("setting.workPlaces.wrkPlaceName")}`,
      dataIndex: "NAME",
      sorter: (a, b) => ("" + a.NAME).localeCompare(b.NAME),
    },

    {
      title: `${i18n.t("setting.desc")}`,
      dataIndex: "DESC",
    },

    {
      title: `${i18n.t("setting.note")}`,
      dataIndex: "NOTE",
    },
    {
      title: `${i18n.t("setting.action")}`,
      dataIndex: "operation",
      fixed: "right",
      width: 120,
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
        dataSource={workPlaces}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListCompanyBranch;
