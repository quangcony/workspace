import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag, Typography } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import i18n from "../../../lib/Language";
import { TblPagination, TblStyles, formatDate } from "../../../common";
import moment from "moment";
import { Link } from "react-router-dom";

const ListPersonalSalary = (props) => {
  const {
    onDelete,
    openEdit,
    isLoading,
    dataSource,
    setMonthYear,
    setFilterList,
  } = props;

  const handleView = () => {
    setMonthYear([]);
    setFilterList([]);
  };

  const columns = [
    {
      title: "Tháng",
      dataIndex: "SALARY_MONTH",
      width: "4%",
      fixed: "left",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: "Năm",
      dataIndex: "SALARY_YEAR",
      width: "4%",
      fixed: "left",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
    },
    {
      title: "Ngày thanh toán",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: "6%",
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
      width: "7%",
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
      width: "7%",
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
      width: "7%",
      align: "right",
    },
    {
      title: "Lương chức vụ",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: "7%",
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
      width: "7%",
      align: "right",
    },
    {
      title: "Tạm ứng",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "7%",
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
      width: "7%",
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
      width: "7%",
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
      width: "7%",
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
      width: "7%",
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
      title: "Tổng tiền",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: "5%",
      fixed: "right",
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
      width: "3%",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Link
              target="_blank"
              to={`personal_salary_list_result/${record?.id}`}
            >
              <Button
                type="primary"
                icon={<EyeOutlined />}
                className={"btn-success"}
                onClick={handleView}
              />
            </Link>
          </Space>
        </>
      ),
    },
  ];

  return (
    <Table
      pagination={TblPagination}
      dataSource={dataSource}
      columns={columns}
      loading={isLoading}
      scroll={{ x: 2700 }}
      rowClassName="editable-row"
      className={"table-response antd-tbl"}
    />
  );
};

export default ListPersonalSalary;
