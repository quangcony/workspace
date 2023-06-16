import { Button, Table, Space, Select } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { TblPagination, TblStyles, formatDate } from "../../../../common";
import { useRecoilValue } from "recoil";
import {
  physicalExamOptionHardToxicState,
  physicalExamOptionState,
} from "../../../../recoil/atom/physicalExamProcess";
import moment from "moment";

const TblResultList = ({
  openFilePDF,
  onOpenAddNew,
  users,
  onDelete,
  openEdit,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const physicalExamOption = useRecoilValue(physicalExamOptionHardToxicState);
  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };
  const handleDelete = async (id) => {
    await onDelete(id);
  };
  let rowKeyData = users?.map((item) => item.id);

  const handleSelectAll = () => {
    setSelectedRowKeys(rowKeyData);
  };
  const handleClearAll = () => {
    setSelectedRowKeys([]);
  };
  const { confirm } = useConfirmDelete(
    handleDelete,
    "Bạn có chắc muốn xóa mục này?"
  );

  const [valueYear, setValueYear] = useState(new Date().getFullYear());
  const handleSelect = (value) => {
    setValueYear(value);
  };

  const columns = [
    {
      title: "Mã NV",
      dataIndex: "CD",
      width: TblStyles.CD,
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      fixed: "left",
    },
    {
      title: "Họ lót",
      sorter: (a, b) =>
        ("" + a.User?.FIRST_NAME).localeCompare(b.User?.FIRST_NAME),
      render: (_, record) => <>{record.User?.FIRST_NAME}</>,
      width: TblStyles.FIRST_NAME,
      fixed: "left",
    },
    {
      title: "Tên NV",
      sorter: (a, b) =>
        ("" + a.User?.LAST_NAME).localeCompare(b.User?.LAST_NAME),
      render: (_, record) => <>{record.User?.LAST_NAME}</>,
      width: TblStyles.LAST_NAME,
      fixed: "left",
    },
    {
      title: "Giới tính",
      sorter: (a, b) =>
        ("" + a?.User?.Gender?.NAME).localeCompare(b?.User?.Gender?.NAME),
      render: (_, record) => <>{record?.User?.Gender?.NAME}</>,
      width: TblStyles.GENDER,
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
      width: TblStyles.BOD,
    },
    {
      title: "Nơi làm việc",
      dataIndex: "BRANCH_NAME",
      sorter: (a, b) =>
        ("" + a.Workplace?.BRANCH_NAME).localeCompare(b.Workplace?.BRANCH_NAME),
      render: (_, record) => <>{record?.Workplace?.BRANCH_NAME}</>,
      width: TblStyles.BRANCH_NAME,
    },
    {
      title: "Khối",
      sorter: (a, b) =>
        ("" + a.Area?.AREA_NAME).localeCompare(b.Area?.AREA_NAME),
      render: (_, record) => <>{record?.Area?.AREA_NAME}</>,
      width: TblStyles.AREA_NAME,
    },
    {
      title: "Phòng ban",
      sorter: (a, b) =>
        ("" + a.Department?.DEPARTMENT_NAME).localeCompare(
          b.Department?.DEPARTMENT_NAME
        ),
      width: TblStyles.DEPARTMENT_NAME,
      render: (_, record) => <>{record?.Department?.DEPARTMENT_NAME}</>,
    },
    {
      title: "Số lần khám",
      // sorter: (a, b) =>
      //   ("" + a.MEDICAL_VISIT_NUMBER).localeCompare(b.MEDICAL_VISIT_NUMBER),
      render: (_, record) => {
        const medicalNumber = physicalExamOption?.filter(
          (item) => item.USER_ID === record?.USER_ID
        );

        return <>{medicalNumber.length}</>;
      },
      width: TblStyles.MEDICAL_VISIT_NUMBER,
    },
    {
      title: "Năm khám",
      width: TblStyles.MEDICAL_EXAM_YEAR,
      render: (_, record) => {
        const medicalNumber = physicalExamOption?.filter(
          (item) => item.USER_ID === record?.USER_ID
        );

        // const list = [{ value: "all", label: "Tất cả" }];
        const list = [];
        for (let item of medicalNumber) {
          list.push({
            value: item.MEDICAL_EXAM_YEAR,
            label: item.MEDICAL_EXAM_YEAR,
          });
        }
        const sortList = list.sort(function (a, b) {
          return b.label - a.label;
        });
        return (
          <>
            {medicalNumber.length > 0 && (
              <Select
                options={sortList}
                showSearch
                defaultValue={new Date().getFullYear()}
                style={{ width: "100%" }}
                onSelect={handleSelect}
              ></Select>
            )}
          </>
        );
      },
    },
    {
      title: "Người nhập",
      render: (_, record) => {
        const FULL_NAME =
          record.Created_By &&
          record.Created_By?.FIRST_NAME + " " + record.Created_By?.LAST_NAME;
        return <>{FULL_NAME}</>;
      },
      sorter: (a, b) =>
        ("" + a.Created_By?.FIRST_NAME).localeCompare(b.Created_By?.FIRST_NAME),
      width: TblStyles.USER_INPUT_NAME,
    },
    {
      title: "Ngày nhập",
      sorter: (a, b) => {
        var aa = a.CREATED_DATE.split("/").reverse().join(),
          bb = b.CREATED_DATE.split("/").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      },
      render: (_, record) =>
        moment(record.CREATED_DATE).format(formatDate.Type),
      width: TblStyles.INPUT_DATE,
    },
    {
      title: "Nhập KQ KSK Nặng nhọc độc hại",
      render: (_, record) => (
        <Button type="link" onClick={() => onOpenAddNew(record)}>
          Nhập mới
        </Button>
      ),
      width: TblStyles.IMPORT,
      fixed: "right",
    },
  ];

  const expandedRowRender = (employeeInfo) => {
    const data = physicalExamOption?.filter(
      (item) => item.USER_ID === employeeInfo?.USER_ID
    );

    const columns = [
      {
        title: "STT",
        width: "5%",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Ngày khám",
        render: (_, record) => moment(record.PHYSICAL_DATE).format(formatDate.Type),
        sorter: (a, b) => ("" + a.PHYSICAL_DATE).localeCompare(b.PHYSICAL_DATE),
        width: "15%",
      },
      {
        title: "Năm khám",
        dataIndex: "MEDICAL_EXAM_YEAR",
        key: "MEDICAL_EXAM_YEAR",
        sorter: (a, b) =>
          ("" + a.MEDICAL_EXAM_YEAR).localeCompare(b.MEDICAL_EXAM_YEAR),
        width: "15%",
      },

      {
        title: "Cơ sở khám",
        render: (_, record) => <>{record?.MEDICAL_FACILITY_NAME}</>,
        sorter: (a, b) =>
          ("" + a.MEDICAL_FACILITY_NAME).localeCompare(b.MEDICAL_FACILITY_NAME),
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        width: "7%",
        render: (_, record) => (
          <>
            <Space size="middle">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                className={"btn-success"}
                onClick={() => openFilePDF(record?.id, employeeInfo)}
              />
              <Button
                type="primary"
                icon={<EditOutlined />}
                className={"btn-warning"}
                onClick={() => openEdit(record, employeeInfo)}
              />
              <Button
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
        columns={columns}
        dataSource={data}
        pagination={false}
        className="gray-color-thead"
      />
    );
  };

  // set key for users data
  let modifiedData = users?.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div>
      <div style={{ marginBottom: 5 }}>
        <span className="btnSelectAll" onClick={() => handleSelectAll()}>
          [Chọn hết]
        </span>{" "}
        <span className="btnClearAll" onClick={() => handleClearAll()}>
          [Bỏ chọn]
        </span>
        {selectedRowKeys.length > 0 && (
          <span style={{ marginLeft: 10 }}>
            (Có {selectedRowKeys.length} nhân viên được chọn)
          </span>
        )}
      </div>
      <Table
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => {
            const medicalNumber = physicalExamOption?.filter(
              (item) => item.USER_ID === record?.USER_ID
            ).length;
            return medicalNumber > 0;
          },
          columnWidth: 18,
        }}
        columns={columns}
        dataSource={modifiedData}
        pagination={TblPagination}
        rowClassName="editable-row"
        className={"table-response"}
        scroll={{
          x: 2500,
        }}
      />
      <div style={{ position: "absolute", zIndex: 2, bottom: 60 }}>
        <span className="btnSelectAll" onClick={() => handleSelectAll()}>
          [Chọn hết]
        </span>{" "}
        <span className="btnClearAll" onClick={() => handleClearAll()}>
          [Bỏ chọn]
        </span>
        {selectedRowKeys.length > 0 && (
          <span style={{ marginLeft: 10 }}>
            (Có {selectedRowKeys.length} nhân viên được chọn)
          </span>
        )}
      </div>
      <div>
        <Button type="primary" disabled={hasSelected ? false : true}>
          Xuất file tổng hợp kết quả khám sức khỏe nặng nhọc độc hại
        </Button>
      </div>
    </div>
  );
};

export default TblResultList;
