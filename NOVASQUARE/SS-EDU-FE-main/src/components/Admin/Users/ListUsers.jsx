import { Avatar, Button, Dropdown, Image, Menu, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../../hooks/user";
import { TblPagination } from "../../../common";
const ListRoles = ({
  users,
  isLoading,
  onDelete,
  openEdit,
  openAssignRole,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
}) => {
  const { getUser, user } = useUser();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const newData = [];
    if (users && users.length > 0) {
      users.forEach((user) => {
        const FULL_NAME = user.FIRST_NAME + " " + user.LAST_NAME;
        let roles = [];
        user.Roles.forEach((role) => {
          roles.push(role.NAME);
        });
        newData.push({
          ...user,
          FULL_NAME,
          roles: roles.join(", ").toString(),
        });
      });
      setUserData(newData);
    } else {
      setUserData([]);
    }
  }, [users]);

  const handleMenuClick = (e, app) => {
    // message.info('Click on menu item.');
    if (e.key == "assign_role") {
      openAssignRole(app);
    }
  };

  const menu = (app) => (
    <Menu
      onClick={(e) => handleMenuClick(e, app)}
      items={[
        {
          label: "Assign Role",
          key: "assign_role",
        },
      ]}
    />
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
    },
    // {
    //   title: "Full Name",
    //   dataIndex: "FULL_NAME",
    //   width: "15%",
    //   sorter: (a, b) => a.NAME - b.NAME,
    //   render: (_, record) => (
    //     <Space>
    //       <Avatar src={<Image src={record.AVATAR} style={{ width: 32 }} />} />{" "}
    //       <Link to={`/profile/${record.id}`} className="nav-link">
    //         {record.FULL_NAME}
    //       </Link>
    //     </Space>
    //   ),
    // },
    {
      title: "Avatar",
      dataIndex: "Avatar",
      width: "5%",
      render: (_, record) => (
        <Space>
          <Avatar src={<Image src={record.AVATAR} style={{ width: 32 }} />} />
        </Space>
      ),
    },
    {
      title: "First Name",
      dataIndex: "FIRST_NAME",
      width: "15%",
      sorter: (a, b) => ("" + a.FIRST_NAME).localeCompare(b.FIRST_NAME),
      render: (_, record) => (
        <Space>
          <Link to={`/profile/${record.id}`} className="nav-link">
            {record.FIRST_NAME}
          </Link>
        </Space>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "LAST_NAME",
      width: "10%",
      sorter: (a, b) => ("" + a.LAST_NAME).localeCompare(b.LAST_NAME),
      render: (_, record) => (
        <Space>
          <Link to={`/profile/${record.id}`} className="nav-link">
            {record.LAST_NAME}
          </Link>
        </Space>
      ),
    },
    {
      title: "Gender",
      // dataIndex: "GENDER_ID",
      width: "10%",
      // sorter: (a, b) => a.GENDER_ID - b.GENDER_ID,
      render: (_, record) => <>{record?.Gender?.NAME}</>
    },
    {
      title: "Email",
      dataIndex: "EMAIL",
      width: "10%",
      sorter: (a, b) => ("" + a.EMAIL).localeCompare(b.EMAIL),
    },
    // {
    //   title: "User Name",
    //   dataIndex: "USER_NAME",
    //   width: "15%",
    //   sorter: (a, b) => ("" + a.EMAIL).localeCompare(b.EMAIL),
    // },
    {
      title: "Phone 1",
      dataIndex: "PRIMARY_PHONE",
      width: "15%",
      sorter: (a, b) => ("" + a.PRIMARY_PHONE).localeCompare(b.PRIMARY_PHONE),
    },
    {
      title: "Phone 2",
      dataIndex: "SECOND_PHONE",
      width: "15%",
      sorter: (a, b) => ("" + a.SECOND_PHONE).localeCompare(b.SECOND_PHONE),
    },
    {
      title: "Assigned Roles",
      dataIndex: "roles",
      width: "15%",
      sorter: (a, b) => ("" + a.roles).localeCompare(b.roles),
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
    "Are you sure delete this user?"
  );

  console.log("userData: ", userData);

  return (
    <>
      <Table
        pagination={TblPagination}
        dataSource={userData}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListRoles;
