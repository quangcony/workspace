import { Table, Tag } from "antd";
import moment from "moment";
import { useState } from "react";
import { formatDate, TblPagination, TblStyles } from "../../../common";

const ListSalaryCalculation = ({
  listEmployee,
  setEmployeeSelect,
  selectedRowKeys,
  setSelectedRowKeys,
  monthYear,
}) => {
  console.log("monthYear", monthYear);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  //HANDLE CHANGE SELECT ON TABLE
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    console.log("selectedRows changed: ", selectedRows);

    setSelectedRowKeys(newSelectedRowKeys);
    setEmployeeSelect(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns = [
    {
      title: "Mã NV",
      dataIndex: "CD",
      width: "8%",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      fixed: "left",
    },
    {
      title: "Họ lót",
      sorter: (a, b) =>
        ("" + a.User?.FIRST_NAME).localeCompare(b.User?.FIRST_NAME),
      render: (_, record) => <>{record.User?.FIRST_NAME}</>,
      width: "10%",
      fixed: "left",
    },
    {
      title: "Tên",
      sorter: (a, b) =>
        ("" + a.User?.LAST_NAME).localeCompare(b.User?.LAST_NAME),
      render: (_, record) => <>{record.User?.LAST_NAME}</>,
      width: "6%",
      fixed: "left",
    },
    {
      title: "Giới tính",
      sorter: (a, b) =>
        ("" + a?.User?.Gender?.NAME).localeCompare(b?.User?.Gender?.NAME),
      render: (_, record) => <>{record?.User?.Gender?.NAME}</>,
      width: "8%",
    },
    {
      title: "Ngày sinh",
      render: (_, record) =>
        record.User?.BOD
          ? moment(record.User?.BOD).format(formatDate.Type)
          : "",
      sorter: (a, b) =>
        new Date(a.User?.BOD ? a.User?.BOD : "1/1/1900") -
        new Date(b.User?.BOD ? b.User?.BOD : "1/1/1900"),
      width: "10%",
    },
    {
      title: "Nơi làm việc",
      dataIndex: "BRANCH_NAME",
      sorter: (a, b) =>
        ("" + a.Workplace?.BRANCH_NAME).localeCompare(b.Workplace?.BRANCH_NAME),
      render: (_, record) => <>{record?.Workplace?.BRANCH_NAME}</>,
      width: "10%",
    },
    {
      title: "Khối",
      sorter: (a, b) =>
        ("" + a.Area?.AREA_NAME).localeCompare(b.Area?.AREA_NAME),
      render: (_, record) => <>{record?.Area?.AREA_NAME}</>,
      width: "10%",
    },
    {
      title: "Phòng ban",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "12%",
      render: (_, record) => <>{record?.Department?.DEPARTMENT_NAME}</>,
    },
    {
      title: "Tháng",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "5%",
      fixed: "right",

      render: (_, record) =>
        record?.salarys.filter(
          (item) =>
            item?.SALARY_MONTH === monthYear?.MONTH &&
            item?.SALARY_YEAR === monthYear?.YEAR
        )?.[0]?.SALARY_MONTH,
    },
    {
      title: "Năm",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "5%",
      fixed: "right",

      render: (_, record) =>
        record?.salarys.filter(
          (item) =>
            item?.SALARY_MONTH === monthYear?.MONTH &&
            item?.SALARY_YEAR === monthYear?.YEAR
        )?.[0]?.SALARY_YEAR,
    },
    {
      title: "Trạng thái lương",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: "12%",
      fixed: "right",
      render: (_, record) => (
        <Tag
          color={
            record?.salarys.filter(
              (item) =>
                item?.SALARY_MONTH === monthYear?.MONTH &&
                item?.SALARY_YEAR === monthYear?.YEAR
            )?.[0]?.Working_Status?.NAME === "INIT"
              ? "red"
              : record?.salarys.filter(
                  (item) =>
                    item?.SALARY_MONTH === monthYear?.MONTH &&
                    item?.SALARY_YEAR === monthYear?.YEAR
                )?.[0]?.Working_Status?.NAME === "APPROVE"
              ? "green"
              : record?.salarys.filter(
                  (item) =>
                    item?.SALARY_MONTH === monthYear?.MONTH &&
                    item?.SALARY_YEAR === monthYear?.YEAR
                )?.[0]?.Working_Status?.NAME === "PROCESSING"
              ? "blue"
              : record?.salarys.filter(
                  (item) =>
                    item?.SALARY_MONTH === monthYear?.MONTH &&
                    item?.SALARY_YEAR === monthYear?.YEAR
                )?.[0]?.Working_Status?.NAME === "DONE"
              ? "green"
              : ""
          }
          style={{ fontSize: "15px" }}
        >
          {
            record?.salarys.filter(
              (item) =>
                item?.SALARY_MONTH === monthYear?.MONTH &&
                item?.SALARY_YEAR === monthYear?.YEAR
            )?.[0]?.Working_Status?.NAME
          }
        </Tag>
      ),
    },
    // {
    //   render: (_, record) =>
    //     salaryCalculationOption?.filter(
    //       (item) => item.USER_ID === record?.USER_ID
    //     ).length === 0 ? (
    //       <Button
    //         icon={<PlusOutlined />}
    //         type="primary"
    //         onClick={() => onApprove(record)}
    //       />
    //     ) : (
    //       ""
    //     ),
    //   width: "3%",
    //   fixed: "right",
    // },
  ];

  // SET KEY FOR DATA LIST EMPLOYEE
  let modifiedData = listEmployee?.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div>
      {/* <Spin spinning={modifiedData?.length > 0 ? false : true}> */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={modifiedData}
        pagination={TblPagination}
        rowClassName="editable-row"
        className={"table-response"}
        scroll={{
          x: 1400,
        }}
        // loading={modifiedData ? false : true}
      />
      {/* </Spin> */}
    </div>
  );
};

export default ListSalaryCalculation;
