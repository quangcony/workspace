import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Menu,
  Space,
  Table,
  Tooltip,
} from "antd";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { generalState } from "../../../recoil/atom/generalState";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { TblPagination } from "../../../common";

const ListModules = ({
  modules,
  isLoading,
  onDelete,
  openEdit,
  isDisplayEditBtn,
  isDisplayDeleteBtn,
}) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "NAME",
      width: "25%",
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
      width: "20%",
      sorter: (a, b) => a.DESC.length - b.DESC.length,
    },
    {
      title: "App",
      dataIndex: "APP_NAME",
      width: "30%",
      sorter: (a, b) => a.APP_ID - b.APP_ID,
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
    "Are you sure delete this module?"
  );

  useEffect(() => {
    const temp = [];
    modules?.forEach((module) => {
      let roles = [];
      module.roles?.forEach((role) => {
        roles.push(role.NAME);
      });

      temp.push({
        ...module,
        roles: roles.join(", ").toString(),
      });
    });

    setData(temp);
  }, [modules]);

  return (
    <>
      <Table pagination={TblPagination}
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListModules;
