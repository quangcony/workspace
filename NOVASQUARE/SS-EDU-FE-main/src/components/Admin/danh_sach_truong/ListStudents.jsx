import { Avatar, Button, Dropdown, Image, Menu, Space, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  CommentOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStudent } from "../../../hooks/student";
import { useUserStatus } from "../../../hooks/userStatus";

const ListStudents = ({
  users,
  userstatuss,
  isLoading,
  onDelete,
  openEdit,
  openAssignRole,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
  openComment,
  openCommentInfo,
  openEditComment,
  onDeleteComment
}) => {
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

  const handleDelete = async (id) => {
    console.log("check id delete:", id);
    // await onDelete(id);
  };

  const handleDeleteComment = async (id) => {
    await onDeleteComment(id)
  };

  const { confirm } = useConfirmDelete(
    // handleDelete,
    handleDeleteComment,
    "Are you sure delete this user?"
  );

  //reverse
  const newUserstatuss = userstatuss.reduceRight(function (previous, current) {
    previous.push(current);
    return previous;
  }, []);

  //set button show info table for user
  const [activeExpRow, setActiveExpRow] = useState();
  const modifiedData = userData.map((item) => ({
    ...item,
    key: item.id,
  }));

  const expandedRowRender = () => {
    const columns = [
      {
        title: "STT",
        dataIndex: "",
        key: "",
        width: "5%",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Date",
        dataIndex: "CREATED_DATE",
        key: "CREATED_DATE",
        width: "25%",
        sorter: (a, b) => a.DESC.length - b.DESC.length,
      },
      {
        title: "Description",
        dataIndex: "",
        key: "des",
        render: (record) => (
          <p className="comment-description">{record.DESC}</p>
        ),
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        width: "15%",

        render: (_, record) => (
          <>
            <Button
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEditComment(record.id)}
            />
            <Button
              style={{
                marginRight: 10,
                marginLeft: 10,
              }}
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EyeOutlined />}
              className={"btn-primary"}
              onClick={() => openCommentInfo(record.id)}
            />
            <Button
              // disabled={!isDisplayDeleteBtn}
              type="primary"
              icon={<DeleteOutlined />}
              className={"btn-danger"}
              onClick={() => confirm(record.id)}
            />
          </>
        ),
      },
    ];

    return (
      <Table columns={columns} dataSource={newUserstatuss} pagination={false} />
    );
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "FULL_NAME",
      width: "15%",
      key: "FULL_NAME",
      sorter: (a, b) => a.NAME - b.NAME,
      render: (_, record) => (
        <Space>
          <Avatar src={<Image src={record.AVATAR} style={{ width: 32 }} />} />{" "}
          <Link to={`/profile/${record.id}`} className="nav-link">
            {record.FULL_NAME}
          </Link>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "EMAIL",
      width: "15%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "User Name",
      dataIndex: "USER_NAME",
      width: "15%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Phone Number",
      dataIndex: "PRIMARY_PHONE",
      width: "15%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Assigned Roles",
      dataIndex: "roles",
      width: "20%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
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

            {/*add  button commnet */}
            <Button
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<CommentOutlined />}
              className={"btn-success"}
              onClick={() => openComment(record.id)}
            />

            <Button
              // disabled={!isDisplayDeleteBtn}
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

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          // add into userTable
          rowExpandable: (record) => true,
          expandedRowKeys: activeExpRow,
          onExpand: (expanded, record) => {
            const keys = [];
            if (expanded) {
              keys.push(record.id);
            }
            setActiveExpRow(keys);
          },
          //
        }}
        dataSource={modifiedData}
      />
    </>
  );
};

export default ListStudents;
