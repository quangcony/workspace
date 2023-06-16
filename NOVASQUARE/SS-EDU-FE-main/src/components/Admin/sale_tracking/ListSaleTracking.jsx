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

const ListSaleTracking = ({
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

  const columns = [
    {
      title: "NV sale",
      dataIndex: "USER_NAME",
    },
    {
      title: "Tên khách",
      dataIndex: "FULL_NAME",
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
      title: "Mã trường",
      dataIndex: "EMAIL",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Mã hợp đồng",
      dataIndex: "USER_NAME",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Loại khách",
      dataIndex: "PRIMARY_PHONE",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Ngày tạo/Cập nhật",
      dataIndex: "roles",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },{
      title: "Tình trạng",
      dataIndex: "roles",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Quản lý",
      dataIndex: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <>
          <Space size="middle">
          <Button
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EyeOutlined />}
              className={"btn-primary"}
              onClick={() => openEdit(record.id)}
            />
            <Button
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record.id)}
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
    <h5 style={{marginTop: 20}}>List sale tracking</h5>
      <Table
        columns={columns}
        dataSource={userData}
      />
    </>
  );
};

export default ListSaleTracking;
