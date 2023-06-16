import { Table, Button } from "antd";
import moment from "moment";
import React from "react";
import { TblPagination, TblStyles, formatDate } from "../../../../common";
const TblEmployeeSearch = ({ datas, onAddNew }) => {
  const columns = [
    {
      title: "Họ lót",
      sorter: (a, b) =>
        ("" + a.User?.FIRST_NAME).localeCompare(b.User?.FIRST_NAME),
      render: (_, record) => <p>{record.User?.FIRST_NAME}</p>,
      fixed: "left",
      width: TblStyles.FIRST_NAME,
    },
    {
      title: "Tên",
      sorter: (a, b) =>
        ("" + a.User?.LAST_NAME).localeCompare(b.User?.LAST_NAME),
      render: (_, record) => <p>{record.User?.LAST_NAME}</p>,
      fixed: "left",
      width: TblStyles.LAST_NAME,
    },
    {
      title: "MSNV",
      dataIndex: "CD",
      sorter: (a, b) => ("" + a?.CD?.trim()).localeCompare(b?.CD?.trim()),
      width: TblStyles.CD,
    },
    {
      title: "NTNS",
      render: (_, record) =>
        record.User?.BOD
          ? moment(record.User?.BOD).format(formatDate.Type)
          : "",
      sorter: (a, b) =>
        new Date(a.User?.BOD ? a.User?.BOD : "1/1/1900") -
        new Date(b.User?.BOD ? b.User?.BOD : "1/1/1900"),
      width: TblStyles.BOD,
    },
    {
      title: "Giới tính",
      sorter: (a, b) =>
        ("" + a.User?.Gender?.NAME).localeCompare(b.User?.Gender?.NAME),
      render: (_, record) => <p>{record.User?.Gender?.NAME}</p>,
      width: TblStyles.GENDER,
    },
    {
      title: "Nơi làm việc",
      sorter: (a, b) =>
        ("" + a.Workplace?.BRANCH_NAME).localeCompare(b.Workplace?.BRANCH_NAME),
      render: (_, record) => <p>{record.Workplace?.BRANCH_NAME}</p>,
      width: TblStyles.BRANCH_NAME,
    },
    {
      title: "Khối",
      sorter: (a, b) =>
        ("" + a.Area?.AREA_NAME).localeCompare(b.Area?.AREA_NAME),
      render: (_, record) => <p>{record.Area?.AREA_NAME}</p>,
      width: TblStyles.AREA_NAME,
    },
    {
      title: "Phòng ban",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      render: (_, record) => <p>{record.Department?.DEPARTMENT_NAME}</p>,
      width: TblStyles.BRANCH_NAME,
    },
    {
      title: "Bộ phận",
      sorter: (a, b) =>
        ("" + a.Division?.DIVISION_NAME).localeCompare(
          b.Division?.DIVISION_NAME
        ),
      render: (_, record) => <p>{record.Division?.DIVISION_NAME}</p>,
      width: TblStyles.BRANCH_NAME,
    },
    {
      title: "Đơn vị",
      sorter: (a, b) =>
        ("" + a.Unit?.UNIT_NAME?.trim()).localeCompare(
          b.Unit?.UNIT_NAME?.trim()
        ),
      render: (_, record) => <p>{record.Unit?.UNIT_NAME}</p>,
      width: TblStyles.BRANCH_NAME,
    },
    {
      title: "Hành động",
      dataIndex: "",
      render: (_, record) => (
        <Button type="link" onClick={() => onAddNew(record)}>
          Nhập mới
        </Button>
      ),
      fixed: "right",
      width: "5%",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={datas}
      rowClassName="editable-row"
      className={"table-response"}
      pagination={TblPagination}
    />
  );
};

export default TblEmployeeSearch;
