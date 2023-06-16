import { Button, Space, Table, Tag } from "antd";
import { useState } from "react";
import { TblPagination, TblStyles, formatDate } from "../../../common";
import moment from "moment";

// import { color } from "@mui/system";
const ListHistory = ({
  investigationCase,
  isLoading,
}) => {
  const columns = [
    {
        title: "Thời gian sửa",
        render: (_, record) => moment(record.Timestamp).format(formatDate.Type),
        width: "5%",
        sorter: (a, b) => a.USER_ID - b.USER_ID,
      },
      {
          title: "ID hồ sơ",
          width: "5%",
          render: (_,record)=>(
            <p>{record.Value?.userId}</p>
          ),
          sorter: (a, b) => a.USER_ID - b.USER_ID,
        },
        {
          title: "Loại bệnh",
          width: "5%",
          render: (_,record)=>(
              <p>{record.Value?.passport}</p>
            ),
          sorter: (a, b) => a.passport - b.passport,
        },
        {
          title: "Tên",
          width: "7%",
          render: (_,record)=>(
              <p>{record.Value?.fullName}</p>
            ),
          sorter: (a, b) => a.fullName - b.fullName,
        },
        {
          title: "Ngày sinh",
          width: "6%",
          render: (_, record) => moment(record?.Value?.DOB).format(formatDate.Type),
          sorter: (a, b) => a.DOB - b.DOB,
        },
        {
          title: "Địa chỉ",
          render: (_,record)=>(
            <p>{record.Value?.addressName}</p>
          ),      
          width: "10%",
          sorter: (a, b) => a.addressName - b.addressName,
        },
    
    {
      title: "Nằm trong ổ dịch",
      width: "7%",
      render: (_,record)=>(
          <p>{record.Value?.gender}</p>
        ),
      sorter: (a, b) => a.gender - b.gender,
    },
    {
      title: "SĐT",
      width: "5%",
      render: (_,record)=>(
          <p>{record.Value?.phone}</p>
        ),
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: "Loại ca bệnh",
      width: "5%",
      render: (_,record)=>(
          <p>{record.Value?.addressRoom}</p>
        ),
      sorter: (a, b) => a.addressRoom - b.addressRoom,
    },
    {
      title: "Nơi chuyển tới",
      width: "5%",
      render: (_,record)=>(
          <p>{record.Value?.reporter}</p>
        ),
      sorter: (a, b) => a.reporter - b.reporter,
    },
      {
        title: "Trạng thái",
        width: "7%",
        render: (_,record)=>(
          <p>{record.Value?.status}</p>
        ),
        sorter: (a, b) => a.SUBJECT_TO_FULLNAME - b.SUBJECT_TO_FULLNAME,
      },
   ];
   console.log(investigationCase)
  return (
    <>
      <Table pagination={TblPagination}
        
        dataSource={investigationCase}
        columns={columns}
        scroll={{ x: 2000 }}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
      />
    </>
  );
};

export default ListHistory;
