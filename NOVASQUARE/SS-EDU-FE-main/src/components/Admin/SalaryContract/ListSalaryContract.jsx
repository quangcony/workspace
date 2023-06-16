import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Image, Space, Table } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { formatDate, TblPagination, TblStyles } from "../../../common";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import i18n from "../../../lib/Language";

const ListSalaryContract = ({
  listEmployee,
  salaryContractOption,
  onCreate,
  openEdit,
  openView,
  openDelete,
}) => {
  const { confirm } = useConfirmDelete(
    openDelete,
    `${i18n.t("general.mesDelete")}`
  );
  const columns = [
    {
      title: "Mã NV",
      dataIndex: "CD",
      width: "7%",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      fixed: "left",
    },
    {
      title: "Avatar",
      width: "6%",
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
      width: "7%",
      fixed: "left",
    },
    {
      title: "Lương cơ bản",
      sorter: (a, b) =>
        ("" + a?.User?.Gender?.NAME).localeCompare(b?.User?.Gender?.NAME),
      render: (_, record) => (
        <>
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.BASIC_SALARY)
            : ""}
        </>
      ),
      width: "10%",
      align: "right",
    },
    {
      title: "Hiệu suất",
      render: (_, record) => (
        <>
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.PERFORMANCE_SALARY)
            : ""}
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
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.CERTIFICATE)
            : ""}
        </>
      ),
      width: "8%",
      align: "right",
    },
    {
      title: "Lương chức vụ",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      width: "10%",
      align: "right",
      render: (_, record) => (
        <>
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.POSITION)
            : ""}
        </>
      ),
    },
    {
      title: "Thưởng",
      sorter: (a, b) =>
        ("" + a.Area?.AREA_NAME).localeCompare(b.Area?.AREA_NAME),
      render: (_, record) => (
        <>
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.BONUS)
            : ""}
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
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.TEMPOLARY)
            : ""}
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
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.ALLOWANCE)
            : ""}
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
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.SOCIAL_INSURANCE)
            : ""}
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
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.SOCIAL_UNION)
            : ""}
        </>
      ),
    },
    {
      title: "Bảo hiểm nhân thọ",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "12%",
      align: "right",
      render: (_, record) => (
        <>
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.NON_LIFE_INSURANCE)
            : ""}
        </>
      ),
    },

    {
      title: "Ngày ký HĐ",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: TblStyles.DEPARTMENT_NAME,
      render: (_, record) =>
        moment(record?.salaryContract?.[0]?.CONTRACT_SALARY_DATE).format(
          formatDate.Type
        ),
    },
    {
      title: "Lương thực lĩnh",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "12%",
      align: "right",
      fixed: "right",
      render: (_, record) => (
        <>
          {record?.salaryContract?.length > 0
            ? new Intl.NumberFormat({
                style: "currency",
                currency: "VND",
              }).format(record?.salaryContract?.[0]?.TOTAL)
            : ""}
        </>
      ),
    },
    {
      render: (_, record) =>
        salaryContractOption?.filter((item) => item.USER_ID === record?.USER_ID)
          .length === 0 ? (
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => onCreate(record)}
          />
        ) : (
          <>
            <Space size="middle">
              <Link
                target="_blank"
                to={`employee_salary_contract_result/${record?.salaryContract[0]?.id}`}
              >
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  className={"btn-success"}
                />
              </Link>

              <Button
                type="primary"
                icon={<EditOutlined />}
                className={"btn-warning"}
                onClick={() => openEdit(record?.salaryContract[0]?.id)}
              />
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                className={"btn-danger"}
                onClick={() => confirm(record?.salaryContract[0]?.id)}
              />
            </Space>
          </>
        ),
      width: "10%",
      fixed: "right",
    },
  ];

  // const expandedRowRender = (datas) => {
  //   const data = salaryContractOption?.filter(
  //     (item) => item.USER_ID === datas?.USER_ID
  //   );

  //   const columns = [
  //     {
  //       title: "Lương cơ bản",
  //       dataIndex: "BASIC_SALARY",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Lương hiệu suất",
  //       dataIndex: "PERFORMANCE_SALARY",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Lương chức vụ",
  //       dataIndex: "POSITION",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Lương bằng cấp",
  //       dataIndex: "CERTIFICATE",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Thưởng",
  //       dataIndex: "BONUS",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Tạm ứng",
  //       dataIndex: "TEMPOLARY",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Trợ cấp",
  //       dataIndex: "ALLOWANCE",

  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Bảo hiểm xã hội",
  //       dataIndex: "SOCIAL_INSURANCE",

  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Tiền công đoàn",
  //       dataIndex: "SOCIAL_UNION",
  //       width: "10%",

  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //     },
  //     {
  //       title: "Bảo hiểm nhân thọ",
  //       dataIndex: "NON_LIFE_INSURANCE",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },

  //     {
  //       title: "Ngày thanh toán ",
  //       dataIndex: "PAYMENT_DATE",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       render: (_, record) =>
  //         moment(record?.PAYMENT_DATE).format(formatDate.Type),
  //       width: "10%",
  //     },
  //     {
  //       title: "Loại chi ",
  //       dataIndex: "EXPENSE_TYPE_ID",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Ghi chú ",
  //       dataIndex: "NOTE",
  //       sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
  //       width: "10%",
  //     },
  //     {
  //       title: "Hành động",
  //       dataIndex: "operation",
  //       key: "operation",
  //       width: "150px",
  //       align: "center",
  //       fixed: "right",
  //       render: (_, record) => (
  //         <>
  //           <Space size="middle">
  //             <Button
  //               type="primary"
  //               icon={<EyeOutlined />}
  //               className={"btn-success"}
  //               onClick={() => openView(record?.id)}
  //             />
  //             <Button
  //               type="primary"
  //               icon={<EditOutlined />}
  //               className={"btn-warning"}
  //               onClick={() => openEdit(record?.id)}
  //             />
  //             <Button
  //               type="primary"
  //               icon={<DeleteOutlined />}
  //               className={"btn-danger"}
  //               onClick={() => openDelete(record?.id)}
  //             />
  //           </Space>
  //         </>
  //       ),
  //     },
  //   ];

  //   return (
  //     <Table
  //       columns={columns}
  //       dataSource={datas?.salaryContract}
  //       pagination={false}
  //       className="gray-color-thead"
  //       scroll={{
  //         x: 2100,
  //       }}
  //     />
  //   );
  // };

  // SET KEY FOR DATA LIST EMPLOYEE
  let modifiedData = listEmployee?.map((item) => ({
    ...item,
    key: item.id,
  }));
  return (
    <div>
      {/* <Spin spinning={modifiedData?.length > 0 ? false : true}> */}
      <Table
        // rowSelection={rowSelection}
        // expandable={{
        //   expandedRowRender,
        //   rowExpandable: (record) => {
        //     const medicalNumber = salaryContractOption?.filter(
        //       (item) => item.USER_ID === record?.USER_ID
        //     ).length;
        //     return medicalNumber > 0;
        //   },
        //   columnWidth: 18,
        // }}
        columns={columns}
        dataSource={modifiedData}
        pagination={TblPagination}
        rowClassName="editable-row"
        className={"table-response"}
        scroll={{
          x: 2100,
        }}
        loading={modifiedData ? false : true}
      />
      {/* </Spin> */}
    </div>
  );
};

export default ListSalaryContract;
