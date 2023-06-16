import { Button, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { useEffect, useState } from "react";
import { TblPagination } from "../../../common";
const ListWards = (props) => {
  const {
    zones,
    openEdit,
    onDelete,
    isDisplayEditBtn,
    isDisplayDeleteBtn,
    isLoading,
  } = props;
  console.log(zones);

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    if (zones && zones.length > 0) {
      setDataSource(zones);
    } else {
      setDataSource([]);
    }
  }, [zones]);

  const handleDelete = async (id) => {
    await onDelete(id);
  };
  const { confirm } = useConfirmDelete(
    handleDelete,
    "Are you sure delete this district?"
  );
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên vùng",
      dataIndex: "NAME",
      width: "15%",
      sorter: (a, b) => ("" + a.NAME).localeCompare(b.NAME),
    },
    {
      title: "Mã vùng",
      dataIndex: "CD",
      width: "15%",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: "Mô tả",
      width: "25%",
      dataIndex: "DESC",
      sorter: (a, b) => ("" + a.DESC).localeCompare(b.DESC),
    },
    {
      title: "Ghi chú",
      dataIndex: "NOTE",
      sorter: (a, b) => ("" + a.NOTE).localeCompare(b.NOTE),
    },
    {
      title: "Action",
      fixed: "right",
      width: "10%",
      align: "center",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button
              // disabled={!isDisplayEditBtn}
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
      <Table pagination={TblPagination}
        dataSource={dataSource}
        columns={columns}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListWards;
