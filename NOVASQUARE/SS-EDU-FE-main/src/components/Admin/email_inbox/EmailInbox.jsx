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

const EmailInbox = ({
  users,
  isLoading,
  onDelete,
  openEdit,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
  openEmailHistory,
  openEmailSelect,
  openSendEmail,
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

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure delete this user?"
  );

  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setSelectedInfo([]);
      setLoading(false);
    }, 500);
  };
  // const onSelectChange = (selectedRowKeys, selectedRows) => {
  //   setSelectedInfo(selectedRows);
  //   setSelectedRowKeys(selectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: (selectedRowKeys, selectedRows) =>
  //     onSelectChange(selectedRowKeys, selectedRows),
  // };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys,selectedRows) => {
    setSelectedInfo(selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };
  const columns = [
    {
      title: "NV sale",
      dataIndex: "USER_NAME",
    },
    {
      title: "Tên khách",
      dataIndex: "FULL_NAME",
      key: "FULL_NAME",
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
    },
    {
      title: "Mã hợp đồng",
      dataIndex: "USER_NAME",
    },
    {
      title: "Loại khách",
      dataIndex: "PRIMARY_PHONE",
    },
    {
      title: "Ngày tạo/Cập nhật",
      dataIndex: "roles",
    },
    {
      title: "Tình trạng",
      dataIndex: "roles",
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
  const modifiedData = userData.map((item) => ({
    ...item,
    key: item.id,
  }));

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <h5 style={{ marginTop: 20 }}>List sale tracking</h5>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reset
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <div>
          <Button type="primary" onClick={() => openEmailHistory()}>
            Email history info
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 15 }}
            className={"btn-warning"}
            onClick={() => openEmailSelect(selectedInfo)}
          >
            Get emails address
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 15 }}
            className={"btn-success"}
            onClick={() => openSendEmail(selectedInfo)}
          >
            Compose
          </Button>
        </div>
      </div>
      <Table
        rowSelection={{ ...rowSelection }}
        columns={columns}
        dataSource={modifiedData}
      />
    </>
  );
};

export default EmailInbox;
