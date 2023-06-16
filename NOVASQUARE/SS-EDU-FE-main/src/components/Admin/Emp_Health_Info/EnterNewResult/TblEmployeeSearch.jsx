import { Table, Button } from "antd";
import React from "react";

const TblEmployeeSearch = ({ datas, onAddNew }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => ("" + a.id).localeCompare(b.id),
    },
    {
      title: "Họ và tên",
      sorter: (a, b) => ("" + a.name).localeCompare(b.name),
      render: (_, record) => (
        <p>
          {record.FIRST_NAME} {record.LAST_NAME}
        </p>
      ),
    },
    {
      title: "MSNV",
      dataIndex: "CD",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: "NTNS",
      sorter: (a, b) => {
        var aa = a.BOD.split("/").reverse().join(),
          bb = b.BOD.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      },
      render: (_, record) => new Date(record.BOD).toLocaleDateString("en-GB"),
    },
    {
      title: "Giới tính",
      sorter: (a, b) => ("" + a.GENDER_ID).localeCompare(b.GENDER_ID),
      render: (_, record) => <p>{record.Gender?.NAME}</p>,
    },
    {
      title: "Nơi làm việc",
      dataIndex: "BRANCH_NAME",
      sorter: (a, b) => ("" + a.BRANCH_NAME).localeCompare(b.BRANCH_NAME),
    },
    {
      title: "Khối",
      dataIndex: "AREA_NAME",
      sorter: (a, b) => ("" + a.AREA_NAME).localeCompare(b.AREA_NAME),
    },
    {
      title: "Phòng ban",
      dataIndex: "DEPARTMENT_NAME",
      sorter: (a, b) =>
        ("" + a.DEPARTMENT_NAME).localeCompare(b.DEPARTMENT_NAME),
    },
    {
      title: "Bộ phân",
      dataIndex: "DIVISION_NAME",
      sorter: (a, b) => ("" + a.DIVISION_NAME).localeCompare(b.DIVISION_NAME),
    },
    {
      title: "Đơn vị",
      dataIndex: "UNIT_NAME",
      sorter: (a, b) => ("" + a.UNIT_NAME).localeCompare(b.UNIT_NAME),
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <Button type="link" onClick={() => onAddNew(record)}>
          Nhập mới
        </Button>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={datas}
      rowClassName="editable-row"
      className={"table-response"}
      pagination={{
        total: datas.length,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize: 10,
        defaultCurrent: 1,
        size: "small",
      }}
    />
  );
};

export default TblEmployeeSearch;
