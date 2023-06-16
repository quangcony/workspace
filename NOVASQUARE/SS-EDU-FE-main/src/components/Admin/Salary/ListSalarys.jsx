import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Space, Table, Tag, Typography } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import i18n from "../../../lib/Language";
import { TblPagination, TblStyles, formatDate } from "../../../common";
import moment from "moment";
import { Link } from "react-router-dom";

const ListSalarys = (props) => {
  const {
    onDelete,
    openEdit,
    isLoading,
    salarys,
    setSalarySelect,
    setSelectedRowKeys,
    selectedRowKeys,
  } = props;

  //HANDLE CHANGE SELECT ON TABLE
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    setSelectedRowKeys(newSelectedRowKeys);
    setSalarySelect(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDelete = async (id) => {
    await onDelete(id);
  };
  const { confirm } = useConfirmDelete(
    handleDelete,
    `${i18n.t("general.mesDelete")}`
  );

  const columns = [
    {
      title: "Mã NV",
      render: (_, record) => <>{record?.employee?.[0]?.CD}</>,
      width: "4%",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      fixed: "left",
    },
    {
      title: "Avatar",
      width: "4%",
      fixed: "left",
      render: (_, record) => (
        <Avatar
          src={<Image src={record?.User?.AVATAR} style={{ width: 32 }} />}
        />
      ),
    },
    {
      title: "Họ lót",
      sorter: (a, b) =>
        ("" + a.User?.FIRST_NAME).localeCompare(b.User?.FIRST_NAME),
      render: (_, record) => <>{record.User?.FIRST_NAME}</>,
      width: "7%",
      fixed: "left",
    },
    {
      title: "Tên",
      sorter: (a, b) =>
        ("" + a.User?.LAST_NAME).localeCompare(b.User?.LAST_NAME),
      render: (_, record) => <>{record.User?.LAST_NAME}</>,
      width: "4%",
      fixed: "left",
    },
    {
      title: "Tháng",
      dataIndex: "SALARY_MONTH",
      width: "3%",

      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: "Năm",
      dataIndex: "SALARY_YEAR",
      width: "3%",

      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: "Ngày",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: "5%",
      render: (_, record) =>
        moment(record?.SALARY_DATE).format(formatDate.Type),
    },
    {
      title: "Lương cơ bản",
      sorter: (a, b) =>
        ("" + a?.User?.Gender?.NAME).localeCompare(b?.User?.Gender?.NAME),
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.BASIC_SALARY)}
        </>
      ),
      width: "8%",
      align: "right",
    },
    {
      title: "Hiệu suất",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.PERFORMANCE_SALARY)}
        </>
      ),
      sorter: (a, b) =>
        new Date(a.User?.BOD ? a.User?.BOD : "1/1/1900") -
        new Date(b.User?.BOD ? b.User?.BOD : "1/1/1900"),
      width: "8%",
      align: "right",
    },
    {
      title: "Bằng cấp",
      dataIndex: "BRANCH_NAME",
      sorter: (a, b) =>
        ("" + a.Workplace?.BRANCH_NAME).localeCompare(b.Workplace?.BRANCH_NAME),
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.CERTIFICATE)}
        </>
      ),
      width: "8%",
      align: "right",
    },
    {
      title: "Lương chức vụ",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: "8%",
      align: "right",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.POSITION)}
        </>
      ),
    },
    {
      title: "Thưởng",
      sorter: (a, b) =>
        ("" + a.Area?.AREA_NAME).localeCompare(b.Area?.AREA_NAME),
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.BONUS)}
        </>
      ),
      width: "8%",
      align: "right",
    },
    {
      title: "Tạm ứng",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "8%",
      align: "right",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.TEMPOLARY)}
        </>
      ),
    },
    {
      title: "Trợ cấp",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "8%",
      align: "right",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.ALLOWANCE)}
        </>
      ),
    },
    {
      title: "BHXH",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "8%",
      align: "right",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.SOCIAL_INSURANCE)}
        </>
      ),
    },
    {
      title: "Công đoàn",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "8%",
      align: "right",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.SOCIAL_UNION)}
        </>
      ),
    },
    {
      title: "Bảo hiểm nhân thọ",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "8%",
      align: "right",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.NON_LIFE_INSURANCE)}
        </>
      ),
    },
    {
      title: "Ngày thanh toán ",
      dataIndex: "PAYMENT_DATE",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      render: (_, record) =>
        moment(record?.PAYMENT_DATE).format(formatDate.Type),
      width: "6%",
    },
    {
      title: "Loại chi ",
      dataIndex: "EXPENSE_TYPE_ID",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: "7%",
    },
    {
      title: "Lương thực lĩnh",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "8%",
      align: "right",
      render: (_, record) => (
        <>
          {new Intl.NumberFormat({
            style: "currency",
            currency: "VND",
          }).format(record?.TOTAL)}
        </>
      ),
    },
    {
      title: "Trạng thái ",
      render: (_, record) => (
        <Tag
          color={
            record?.Working_Status?.NAME === "INIT"
              ? "red"
              : record?.Working_Status?.NAME === "APPROVE"
              ? "red"
              : record?.Working_Status?.NAME === "PROCESSING"
              ? "blue"
              : record?.Working_Status?.NAME === "DONE"
              ? "green"
              : ""
          }
          style={{ fontSize: "15px" }}
        >
          {record?.Working_Status?.NAME}
        </Tag>
      ),
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: "5%",
      fixed: "right",
    },
    {
      title: "Action",
      fixed: "right",
      width: "6%",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Link target="_blank" to={`salary_list_result/${record?.id}`}>
              <Button
                type="primary"
                icon={<EyeOutlined />}
                className={"btn-success"}
              />
            </Link>
            {record?.Working_Status?.NAME === "DONE" ? (
              ""
            ) : (
              <Button
                type="primary"
                icon={<EditOutlined />}
                className={"btn-warning"}
                onClick={() => openEdit(record?.id)}
              />
            )}
            {record?.Working_Status?.NAME === "DONE" ? (
              ""
            ) : (
              <Button
                // disabled={!isDisplayDeleteBtn}
                type="primary"
                icon={<DeleteOutlined />}
                className={"btn-danger"}
                onClick={() => confirm(record.id)}
              />
            )}
          </Space>
        </>
      ),
    },
  ];
  let modifiedData = salarys?.map((item) => ({
    ...item,
    key: item.id,
  }));
  return (
    <Table
      rowSelection={rowSelection}
      pagination={TblPagination}
      dataSource={modifiedData}
      columns={columns}
      loading={isLoading}
      scroll={{ x: 3500 }}
      rowClassName="editable-row"
      className={"table-response antd-tbl"}
    />
  );
};

export default ListSalarys;
