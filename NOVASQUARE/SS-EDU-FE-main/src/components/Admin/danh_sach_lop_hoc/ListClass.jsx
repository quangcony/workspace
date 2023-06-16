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
  openEditClass,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
  onDeleteComment,
  dataFake,
  openInfoClass
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

  const handleDelete = async (id) => {
    console.log("check id delete:", id);
    // await onDelete(id);
  };

  const handleDeleteComment = async (id) => {
    await onDeleteComment(id);
  };

  const { confirm } = useConfirmDelete(
    // handleDelete,
    handleDeleteComment,
    "Are you sure delete this user?"
  );

  const columns = [
    {
      title: "Class CD",
      dataIndex: "CLASS_CD",
    },
    {
      title: "Class Name",
      dataIndex: "CLASS_NAME",
      width:"10%"
    },
    {
      title: "School CD",
      dataIndex: "SCHOOL_CD",
    },
    
    {
      title: "Open Date",
      dataIndex: "OPEN_DATE",
    },
    {
      title: "End date",
      dataIndex: "END_DATE",
    },
    {
      title: "Chairman",
      dataIndex: "CHAIRMAN",
    },
    {
      title: "Teacher Support",
      dataIndex: "TECHER_SUPPORT",
    },
    {
      title: "Class type cd",
      dataIndex: "CLASS_TYPE_CD",
    },
    {
      title: "Class Status",
      dataIndex: "CLASS_STATUS",
    },
    {
      title: "Subject CD",
      dataIndex: "SUBJECT_CD",
    },
    {
      title: "Day of week",
      dataIndex: "DAY_OF_WEEK",
    },
    {
      title: "Class time",
      dataIndex: "CLASS_TIME",
      width:"7%"
    },
    {
      title: "Unit Price",
      dataIndex: "UNIT_PRICE",
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
              onClick={() => openEditClass(record.id)}
            />
            <Button
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EyeOutlined />}
              className={"btn-primary"}
              onClick={() => openInfoClass(record.id)}
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
    <h5 style={{marginTop: 30}}>Infomation class</h5>
      <Table
        columns={columns}
        dataSource={dataFake}
      />
    </>
  );
};

export default ListStudents;
