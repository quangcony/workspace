import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Menu,
  Modal,
  Space,
  Table,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import Item from "antd/lib/list/Item";
import { useEffect, useState } from "react";
import { TblPagination, TblStyles } from "../../../common";

const ListApps = ({
  apps,
  isLoading,
  onDelete,
  openEdit,
  openAssignRole,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
}) => {
  const [data, setData] = useState([]);

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
      editable: true,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "NAME",
      width: "30%",
      editable: true,
      sorter: (a, b) => a.NAME - b.NAME,

      render: (_, record) => (
        <Space>
          {" "}
          <Avatar
            src={<Image src={record.ICON_NAME} style={{ width: 32 }} />}
          />{" "}
          <Tooltip title={record.DESC}>{record.NAME}</Tooltip>{" "}
        </Space>
      ),
    },
    {
      title: "Assigned Roles",
      dataIndex: "roles",
      width: "30%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "Index",
      dataIndex: "INDEX",
      width: "20%",
      sorter: (a, b) => a.INDEX - b.INDEX,
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
    "Are you sure delete this app?"
  );

  useEffect(() => {
    const temp = [];
    apps.forEach((app) => {
      let roles = [];
      app.Roles.forEach((role) => {
        roles.push(role.NAME);
      });

      temp.push({
        ...app,
        roles: roles.join(", ").toString(),
      });
    });
    temp.sort((a,b) => a.INDEX - b.INDEX);
    setData(temp);
  }, [apps]);
  // import { TblPagination } from "../../../../common";
  return (
    <>
      <Table
        pagination={TblPagination}
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListApps;
