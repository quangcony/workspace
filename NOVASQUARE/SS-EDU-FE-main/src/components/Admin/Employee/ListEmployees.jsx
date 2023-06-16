import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Space, Table, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { formatDate } from "../../../common";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import i18n from "../../../lib/Language";
import { useStyles } from "./style";
import { TblPagination } from "../../../common";

function getWindowSize() {
  const { innerWidth } = window;
  return { innerWidth };
}

const ListEmployees = (props) => {
  const { onDelete, openEdit, isLoading, employees } = props;

  const [dataSource, setDataSource] = useState([]);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    if (employees && employees.length > 0) setDataSource(employees);
    else setDataSource([]);
  }, [employees]);
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleDelete = async (id) => {
    await onDelete(id);
  };
  const { confirm } = useConfirmDelete(
    handleDelete,
    `${i18n.t("general.mesDelete")}`
  );

  const columns = [
    {
      title: `${i18n.t("hr.id")}`,
      dataIndex: "USER_ID",
      width: 100,
      sorter: (a, b) => a.id - b.id,
      fixed: windowSize.innerWidth > 1024 ? "left" : false,
    },
    {
      title: `${i18n.t("hr.cd")}`,
      dataIndex: "CD",
      width: 140,
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      fixed: windowSize.innerWidth > 1248 ? "left" : false,
    },
    {
      title: `${i18n.t("hr.avatar")}`,
      width: 75,
      render: (_, record) => (
        <Avatar
          src={<Image src={record?.User?.AVATAR} style={{ width: 32 }} />}
        />
      ),
    },
    {
      title: `${i18n.t("hr.f_name")}`,
      render: (_, record) => (
        <Typography.Text key={19}>{record?.User?.FIRST_NAME}</Typography.Text>
      ),
      sorter: (a, b) =>
        ("" + a?.User?.FIRST_NAME).localeCompare(b?.User?.FIRST_NAME),
    },
    {
      title: `${i18n.t("hr.l_name")}`,
      width: 120,
      render: (_, record) => (
        <Typography.Text key={20}>{record?.User?.LAST_NAME}</Typography.Text>
      ),
      sorter: (a, b) =>
        ("" + a?.User?.LAST_NAME).localeCompare(b?.User?.LAST_NAME),
    },
    {
      title: `${i18n.t("hr.gender")}`,
      width: 120,
      render: (_, record) => (
        <Typography.Text key={21}>{record?.User?.Gender?.NAME}</Typography.Text>
      ),
      sorter: (a, b) =>
        ("" + a?.User?.Gender?.NAME).localeCompare(b?.User?.Gender?.NAME),
    },
    {
      title: `${i18n.t("hr.birth")}`,
      width: 120,
      render: (_, record) => (
        <Typography.Text key={22}>
          {record?.User?.BOD
            ? moment(new Date(record?.User?.BOD)).format(formatDate.Type)
            : ""}
        </Typography.Text>
      ),
    },
    {
      title: `${i18n.t("hr.email")}`,
      render: (_, record) => (
        <Typography.Text key={23}>{record?.User?.EMAIL}</Typography.Text>
      ),
      sorter: (a, b) => ("" + a?.User?.EMAIL).localeCompare(b?.User?.EMAIL),
    },
    {
      title: `${i18n.t("hr.p_phone")}`,
      width: 150,
      render: (_, record) => (
        <Typography.Text key={24}>
          {record?.User?.PRIMARY_PHONE}
        </Typography.Text>
      ),
      sorter: (a, b) =>
        ("" + a?.User?.PRIMARY_PHONE).localeCompare(b?.User?.PRIMARY_PHONE),
    },
    {
      title: `${i18n.t("hr.work_place")}`,
      width: 320,
      render: (_, record) => (
        <>
          <Typography.Paragraph key={1}>
            {record?.City?.CITY_NAME}
          </Typography.Paragraph>
          <Typography.Paragraph style={useStyles.workPlace} key={2}>
            Khối: {record?.Area?.AREA_NAME}
          </Typography.Paragraph>
          <Typography.Paragraph style={useStyles.workPlace} key={3}>
            Phòng ban: {record?.Department?.DEPARTMENT_NAME}
          </Typography.Paragraph>
          <Typography.Paragraph style={useStyles.workPlace} key={4}>
            Bộ phận: {record?.Division?.DIVISION_NAME}
          </Typography.Paragraph>
          <Typography.Paragraph style={useStyles.workPlace} key={5}>
            Đơn vị: {record?.Unit?.UNIT_NAME}
          </Typography.Paragraph>
          <Typography.Paragraph style={useStyles.workPlace} key={6}>
            Chi nhánh: {record?.Workplace?.BRANCH_NAME}
          </Typography.Paragraph>
        </>
      ),
    },
    {
      title: `${i18n.t("hr.job_position")}`,
      render: (_, record) => (
        <>
          <Typography.Paragraph style={useStyles.workPlace} key={10}>
            Vị trí: {record?.Position?.POSITION_NAME}
          </Typography.Paragraph>
          <Typography.Paragraph style={useStyles.workPlace} key={12}>
            Level: {record?.JOB_LEVEL_ID}
          </Typography.Paragraph>
          <Typography.Paragraph style={useStyles.workPlace} key={13}>
            Loại NV: {record?.Employee_Contract_Type?.EMPLOYEE_CONTRACT_NAME}
          </Typography.Paragraph>
        </>
      ),
      ellipsis: true,
    },
    {
      title: `${i18n.t("hr.marital")}`,
      width: 150,
      render: (_, record) => (
        <Typography.Paragraph>
          {record?.Marital_Status?.MARITAL_STATUS_NAME}
        </Typography.Paragraph>
      ),
    },
    {
      title: `${i18n.t("hr.social")}`,
      width: 150,
      dataIndex: "SOCIAL_CD",
    },
    {
      title: `${i18n.t("hr.graduate")}`,
      dataIndex: "GRADUATE_SCHOOL",
    },
    {
      title: `${i18n.t("hr.academic_lv")}`,
      dataIndex: "ACADEMIC_LEVEL",
    },
    {
      title: `${i18n.t("hr.specialized")}`,
      dataIndex: "SPECIALIZED",
    },
    {
      title: `${i18n.t("hr.f_lang")}`,
      dataIndex: "FOREIGN_LANGUAGE",
    },
    {
      title: `${i18n.t("hr.f_lv")}`,
      dataIndex: "FOREIGN_LEVEL",
    },
    {
      title: `${i18n.t("hr.job_desc")}`,
      dataIndex: "JOB_NOTE",
      ellipsis: true,
    },
    {
      title: `${i18n.t("hr.short_desc")}`,
      dataIndex: "JOB_SHORT_DESC",
    },
    {
      title: `${i18n.t("hr.working_process")}`,
      dataIndex: "JOB_FULL_DESC",
    },
    {
      title: `${i18n.t("hr.fb")}`,
      dataIndex: "FACEBOOK_LINK",
    },
    {
      title: `${i18n.t("hr.zalo")}`,
      dataIndex: "ZALO_LINK",
    },
    {
      title: `${i18n.t("hr.show")}`,
      render: (_, record) => <>{record?.SHOW_WEB ? "Yes" : "No"}</>,
    },
    {
      title: `${i18n.t("hr.working_time")}`,
      render: (_, record) => (
        <>
          <Typography.Paragraph key={7}>
            {record?.START_WORKING_DATE
              ? moment(new Date(record?.START_WORKING_DATE)).format(
                  formatDate.Type
                )
              : ""}
          </Typography.Paragraph>
          <Typography.Paragraph key={8}>
            {record?.STOP_WORKING_DATE
              ? moment(new Date(record?.STOP_WORKING_DATE)).format(
                  formatDate.Type
                )
              : ""}
          </Typography.Paragraph>
        </>
      ),
    },
    {
      title: `${i18n.t("hr.emp_status")}`,
      render: (_, record) => (
        <> {record?.Employee_Status?.EMPLOYEE_STATUS_NAME} </>
      ),
    },
    // {
    //     title: `${i18n.t("hr.recruit")}`,
    //     dataIndex: "CANDIDATE_ID",
    // },
    {
      title: `${i18n.t("hr.note")}`,
      dataIndex: "NOTE",
    },
    {
      title: `${i18n.t("hr.action")}`,
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button
              // disabled={!isDisplayEditBtn}
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record)}
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
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={!dataSource?.length}
      scroll={{ x: 4500 }}
      rowClassName="editable-row"
      className={"table-response antd-tbl"}
      pagination={TblPagination}
    />
  );
};

export default ListEmployees;
