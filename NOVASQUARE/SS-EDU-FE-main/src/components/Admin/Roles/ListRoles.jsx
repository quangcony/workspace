import { Button, Dropdown, Menu, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { TblPagination } from "../../../common";
const ListRoles = ({
  roles,
  isLoading,
  onDelete,
  openEdit,
  openAssignUser,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
}) => {
  const handleMenuClick = (e, role) => {
    // message.info('Click on menu item.');
    if (e.key == "assign_user") {
      openAssignUser(role);
    }
  };

  const menu = (role) => (
    <Menu
      onClick={(e) => handleMenuClick(e, role)}
      items={[
        {
          label: "Assign User",
          key: "assign_user",
        },
      ]}
    />
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "NAME",
      width: "30%",
      sorter: (a, b) => a.NAME - b.NAME,
    },
    {
      title: "Description",
      dataIndex: "DESC",
      width: "30%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Total Users Assigned",
      dataIndex: "total_users",
      width: "20%",
      sorter: (a, b) => a.total_users - b.total_users,
      render: (_, record) => <span>{record.Users.length}</span>,
    },
    {
      title: "Action",
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Space size="middle">
            <Dropdown overlay={(e) => menu(record)}>
              <Button icon={<MoreOutlined />} />
            </Dropdown>
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
    "Are you sure delete this role?"
  );

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={roles}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListRoles;
