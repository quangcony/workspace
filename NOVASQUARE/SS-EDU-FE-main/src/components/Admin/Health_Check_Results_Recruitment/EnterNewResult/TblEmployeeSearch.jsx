import { Table, Button } from "antd";
import React from "react";
import { TblPagination, TblStyles, formatDate } from "../../../../common";
import moment from "moment";

const TblEmployeeSearch = ({ datas, onAddNew }) => {
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    //   fixed: "left",
    //   width: TblStyles.CD,
    // },
    {
      title: "Họ lót",
      sorter: (a, b) => ("" + a.FIRST_NAME).localeCompare(b.FIRST_NAME),
      render: (_, record) => <>{record.FIRST_NAME}</>,
      fixed: "left",
      width: TblStyles.FIRST_NAME,
    },
    {
      title: "Tên",
      sorter: (a, b) => ("" + a.LAST_NAME).localeCompare(b.LAST_NAME),
      render: (_, record) => <>{record.LAST_NAME}</>,
      fixed: "left",
      width: TblStyles.LAST_NAME,
    },
    {
      title: "MSNV",
      dataIndex: "CD",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: TblStyles.LAST_NAME,
    },
    {
      title: "NTNS",
      sorter: (a, b) => {
        return new Date(b?.BOD) - new Date(a?.BOD);
      },
      width: TblStyles.LAST_NAME,
      render: (_, record) => moment(record.BOD).format(formatDate.Type),
    },
    {
      title: "Giới tính",
      sorter: (a, b) => ("" + a.GENDER_ID).localeCompare(b.GENDER_ID),
      render: (_, record) => <>{record.Gender?.NAME}</>,
      width: TblStyles.LAST_NAME,
    },
    {
      title: "Phòng ban",
      dataIndex: "DEPARTMENT_NAME",
      width: TblStyles.DEPARTMENT_NAME,
      sorter: (a, b) =>
        ("" + a.DEPARTMENT_NAME).localeCompare(b.DEPARTMENT_NAME),
    },
    {
      title: "Bộ phận",
      dataIndex: "DIVISION_NAME",
      sorter: (a, b) => ("" + a.DIVISION_NAME).localeCompare(b.DIVISION_NAME),
      width: TblStyles.DEPARTMENT_NAME,
    },
    {
      title: "Đơn vị",
      dataIndex: "UNIT_NAME",
      sorter: (a, b) => ("" + a.UNIT_NAME).localeCompare(b.UNIT_NAME),
      width: TblStyles.DEPARTMENT_NAME,
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
      width: TblStyles.ACTION,
    },
  ];
  return (
    <Table pagination={TblPagination}
      columns={columns}
      dataSource={datas}
      rowClassName="editable-row"
      className={"table-response"}
      scroll={{
        x: 2000,
      }}
    />
  );
};

export default TblEmployeeSearch;
