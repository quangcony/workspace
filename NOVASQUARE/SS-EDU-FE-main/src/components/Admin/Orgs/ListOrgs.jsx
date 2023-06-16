import { Avatar, Button, Image, Modal, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import Item from "antd/lib/list/Item";
import { TblPagination } from "../../../common";
const ListOrgs = ({
  orgs,
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
      editable: true,
      sorter: (a, b) => a.ID - b.ID,
    },
    {
      title: "Name",
      dataIndex: "NAME",
      width: "20%",
      editable: true,
      sorter: (a, b) => a.NAME - b.NAME,
      render: (_, record) => (
        <Space>
          {" "}
          <Avatar
            src={<Image src={record.LOGO_NAME} style={{ width: 32 }} />}
          />{" "}
          {record.NAME}{" "}
        </Space>
      ),
    },

    {
      title: "Description",
      dataIndex: "DESC",
      width: "25%",
      editable: true,
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Abbreviations",
      dataIndex: "ABB",
      width: "10%",
      editable: true,
      sorter: (a, b) => a.ABB.length - b.ABB.length,
    },
    {
      title: "Note",
      dataIndex: "NOTE",
      width: "20%",
      editable: true,
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

  // const showDeleteConfirm = (id) => {
  //     confirm({
  //         title: 'Are you sure delete this app?',
  //         icon: <ExclamationCircleOutlined />,
  //         content: 'Cannot restore action!',
  //         okText: 'Yes',
  //         okType: 'danger',
  //         cancelText: 'No',
  //         onOk() {
  //             onDelete(id)
  //         }
  //     });
  // };

  const handleDelete = async (id) => {
    await onDelete(id);
  };

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure delete this organizations?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={orgs}
        columns={columns}
        rowClassName="editable-row"
        // loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListOrgs;
