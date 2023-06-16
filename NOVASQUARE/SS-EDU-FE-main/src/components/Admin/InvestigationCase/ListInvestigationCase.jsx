import { Button, Space, Table, Tag } from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
  UpOutlined,
} from "@ant-design/icons";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import { TblPagination, formatDate } from "../../../common";
import { useState, useEffect } from "react";
import { Reorder } from "@mui/icons-material";
import moment from "moment";

// import { color } from "@mui/system";
const ListInvestigationCase = ({
  investigationCases,
  isLoading,
  onDelete,
  openEdit,
  openHistory,
  isDisplayEditBtn,
}) => {
  // console.log("investigationCases", investigationCases)
  const [datas, setDatas] = useState();
  // Add color for InvestigationCases with STATUS === "Đã xác minh" && "Hết hạn điều tra"
  useEffect(() => {
    const newInvestigationCases = investigationCases?.map((item, index) => {
      if (item.STATUS === "Đã xác minh") {
        return {
          ...item,
          textColor: "FBC02D",
          key: item.id,
        };
      } else if (item.STATUS === "Hết hạn điều tra") {
        return {
          ...item,
          textColor: "ff8433",
          key: item.id,
        };
      } else {
        return {
          ...item,
          textColor: null,
          key: item.id,
        };
      }
    });
    setDatas(newInvestigationCases);
  }, [investigationCases]);
  // console.log(datas);

  const columns = [
    {
      title: "Hợp lệ",
      width: "5%",
      sorter: (a, b) => a.valid - b.valid,
      render: (_, record) => (
        <Button
        title= {(record.valid===false?(record.NOTE==="APIAttack"?"Có sự thay đổi từ API":"Có sự thay đổi từ DB"):"")}
          type="primary"
          style={{
            backgroundColor: record.valid === true ? "#73d13d" : "#f50",
            border: "none",
          }}
          icon={
            record.valid === true ? (
              <CheckCircleOutlined style={{ fontSize: "20px" }} />
            ) : (
              <CloseCircleOutlined
                style={{
                  fontSize: "20px",
                }}
              />
            )
          }
        />
      ),
    },
    {
      title: "ID hồ sơ",
      dataIndex: "USER_ID",
      width: "6%",
      sorter: (a, b) => a.USER_ID - b.USER_ID,
    },

    {
      title: "Loại bệnh",
      dataIndex: "SUBJECT_TO_PASS_PORT_NUMBER",
      width: "5%",
      sorter: (a, b) =>
        a.SUBJECT_TO_PASS_PORT_NUMBER - b.SUBJECT_TO_PASS_PORT_NUMBER,
    },
    {
      title: "Tên",
      dataIndex: "SUBJECT_TO_FULLNAME",
      width: "10%",
      sorter: (a, b) => a.SUBJECT_TO_FULLNAME - b.SUBJECT_TO_FULLNAME,
    },
    {
      title: "Ngày sinh",
      width: "6%",
      render: (_, record) => moment(record.SUBJECT_TO_DATE_OF_BIRTH).format(formatDate.Type),
      sorter: (a, b) => a.SUBJECT_TO_DATE_OF_BIRTH - b.SUBJECT_TO_DATE_OF_BIRTH,
    },
    {
      title: "Địa chỉ",
      dataIndex: "ADDRESS_NAME",
      width: "15%",
      sorter: (a, b) => a.ADDRESS_NAME - b.ADDRESS_NAME,
    },
    {
      title: "Nằm trong ổ dịch",
      dataIndex: "SUBJECT_TO_GENDER",
      width: "7%",
      sorter: (a, b) => a.SUBJECT_TO_GENDER - b.SUBJECT_TO_GENDER,
    },
    {
      title: "SĐT",
      dataIndex: "SUBJECT_TO_PHONE_NUMBER",
      width: "7%",
      sorter: (a, b) => a.SUBJECT_TO_PHONE_NUMBER - b.SUBJECT_TO_PHONE_NUMBER,
    },
    {
      title: "Loại ca bệnh",
      dataIndex: "ADDRESS_ROOM",
      width: "7%",
      sorter: (a, b) => a.SUBJECT_TO_PHONE_NUMBER - b.SUBJECT_TO_PHONE_NUMBER,
    },
    {
      title: "Cơ sở y tế chuyển đi",
      dataIndex: "REPORTER_NAME",
      width: "7%",

      sorter: (a, b) => a.REPORTER_NAME - b.REPORTER_NAME,
    },
    {
      title: "Nơi chuyển tới",
      dataIndex: "ADDRESS_FLOOR",
      width: "10%",

      sorter: (a, b) => a.REPORTER_NAME - b.REPORTER_NAME,
    },
    
    // {
    //   title: "User Id",
    //   dataIndex: "USER_ID",
    //   width: "5%",
    //   sorter: (a, b) => a.USER_ID - b.USER_ID,
    // },
    

    


    // {
    //   title: "Nationality",
    //   dataIndex: "SUBJECT_TO_NATIONALITY",
    //   width: "5%",
    //   sorter: (a, b) => a.SUBJECT_TO_NATIONALITY - b.SUBJECT_TO_NATIONALITY,
    // },
    // {
    //   title: "Dân tộc",
    //   dataIndex: "SUBJECT_TO_ETHNIC",
    //   width: "5%",
    //   sorter: (a, b) => a.SUBJECT_TO_ETHNIC - b.SUBJECT_TO_ETHNIC,
    // },
    // {
    //   title: "Nghề nghiệp",
    //   dataIndex: "SUBJECT_TO_JOB",
    //   width: "5%",
    //   sorter: (a, b) => a.SUBJECT_TO_JOB - b.SUBJECT_TO_JOB,
    // },
    // {
    //   title: "Người tiếp xúc",
    //   dataIndex: "SUBJECT_FROM_FULLNAME",
    //   width: "10%",
    //   sorter: (a, b) => a.SUBJECT_FROM_FULLNAME - b.SUBJECT_FROM_FULLNAME,
    // },

    // {
    //   title: "Triệu chứng",
    //   dataIndex: "SYMTOMS",
    //   width: "5%",
    //   sorter: (a, b) => a.SYMTOMS - b.SYMTOMS,
    // },
    {
      title: "Trạng thái",
      width: "7%",
      // dataIndex: "STATUS",

      render: (_, record) => {
        return <Tag style={{fontSize: "14px", color: "black"}} color={record.textColor !== null ? `#${record.textColor}` : null}>{record.STATUS}</Tag>;
        //  <p style={{backgroundColor: `#${record.textColor}`, justifyContent:"center", padding: "1px", borderRadius: "5px",}}>{record.STATUS}</p>
      },
      sorter: (a, b) => a.STATUS.length - b.STATUS.length,
    },
    {
      title: "Action",
      dataIndex: "operation",
      fixed: "right",
      width: "7%",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button
              style={{ backgroundColor: "#bfbfbf", border: "none" }}
              type="primary"
              icon={<HistoryOutlined />}
              disabled={record.STATUS === "Đã xác minh" ? false : true}
              onClick={() => openHistory(record.id)}
            />
            <Button
              disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record.id)}
            />
            <Button
              disabled={record.STATUS === "Đã xác minh" ? true : false}
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
    "Are you sure delete this investigation case?"
  );
  // const { confirm } = useConfirmDelete(
  //   handleDelete,
  //   "Are you sure delete this investigation case?"
  // );
  return (
    <>
      <Table pagination={TblPagination}
        dataSource={datas}
        columns={columns}
        scroll={{ x: 2000 }}
        rowClassName="editable-row"
        loading={isLoading}
        className={"table-response"}
        // pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default ListInvestigationCase;
