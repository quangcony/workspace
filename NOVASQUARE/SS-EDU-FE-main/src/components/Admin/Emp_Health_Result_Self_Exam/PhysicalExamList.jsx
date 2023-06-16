import { EyeOutlined } from "@ant-design/icons";
import { Button, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TblPagination, TblStyles, formatDate } from "../../../common";
import moment from "moment";
// import i18n from "../../../lib/Language";

const PhysicalExamList = ({
    openFilePDF,
    users,
    physicalExamOption,
    loading
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [physicalExams, setPhysicalExams] = useState([]);
    const [modifiedData, setModifiedData] = useState([]);

    useEffect(() => {
        if (physicalExamOption?.length) {
            setPhysicalExams(physicalExamOption)
        }
    }, [physicalExamOption]);

    useEffect(() => {
        const data = users?.map((item) => ({
            ...item,
            key: item.id,
        }));
        setModifiedData(data);
    }, [users]);

    const handleClearAll = () => {
        setSelectedRowKeys([]);
    };
    let rowKeyData = users?.map((item) => item.id);
    const handleSelectAll = () => {
        setSelectedRowKeys(rowKeyData);
    };

    const onSelectChange = (newSelectedRowKeys, selectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        // selections: [
        //   Table.SELECTION_ALL,
        //   Table.SELECTION_INVERT,
        //   Table.SELECTION_NONE,
        // ],
    };

    const columns = [
        {
            title: "Mã NV",
            dataIndex: "CD",
            width: TblStyles.CD,
            sorter: (a, b) => ("" + a?.CD?.trim()).localeCompare(b?.CD?.trim()),
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
            title: "Ngày sinh",
            render: (_, record) =>
                record.User?.BOD ? moment(record.User?.BOD).format(formatDate.Type) : "",
            sorter: (a, b) => new Date(a.User?.BOD ? a.User?.BOD : "1/1/1900") - new Date(b.User?.BOD ? b.User?.BOD : "1/1/1900"),
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
            // render: (_, record) => {
            //     const medicalNumber = physicalExamOption?.filter(
            //         (item) => item.USER_ID === record?.USER_ID
            //     );

            //     return <>{medicalNumber.length}</>;
            // },
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
                            // onSelect={handleSelect}
                            ></Select>
                        )}
                    </>
                );
            },
        },
        {
            title: "Người nhập",
            // render: (_, record) => {
            //   const FULL_NAME =
            //     createBy[0]?.User?.FIRST_NAME + " " + createBy[0]?.User?.LAST_NAME;
            //   return <>{FULL_NAME}</>;
            // // },
            // sorter: (a, b) =>
            //   ("" + a?.Created_By?.FIRST_NAME).localeCompare(
            //     b?.Created_By?.FIRST_NAME
            //   ),
            width: TblStyles.USER_INPUT_NAME,
        },
        {
            title: "Ngày nhập",
            sorter: (a, b) => new Date(a.CREATED_DATE) - new Date(b.CREATED_DATE),
            render: (_, record) => moment(record?.CREATED_DATE).format(formatDate.Type),
            width: TblStyles.INPUT_DATE,
        },
    ];

    const expandedRowRender = (employeeInfo) => {
        const data = physicalExams?.filter(
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
                render: (_, record) =>  moment(record?.PHYSICAL_DATE).format(formatDate.Type),
                sorter: (a, b) => ("" + a.PHYSICAL_DATE).localeCompare(b.PHYSICAL_DATE),
                width: "15%",
            },
            {
                title: "Năm khám",
                dataIndex: "MEDICAL_EXAM_YEAR",
                key: "MEDICAL_EXAM_YEAR",
                width: "15%",
            },

            {
                title: "Cơ sở khám",
                key: "upgradeNum",
                render: (_, record) => <>{record?.MEDICAL_FACILITY_NAME}</>,
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
                                onClick={() => openFilePDF(record, employeeInfo)}
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

    return (
        <div>
            <div style={{ marginBottom: 5 }}>
                <span className="btnSelectAll" onClick={() => handleSelectAll()}>
                    [Chọn hết]
                </span>{" "}
                <span className="btnClearAll" onClick={() => handleClearAll()}>
                    [Bỏ chọn]
                </span>
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
                    columnWidth: 17,
                }}
                columns={columns}
                dataSource={modifiedData}
                pagination={TblPagination}
                rowClassName="editable-row"
                className={"table-response"}
                scroll={{
                    x: 2200,
                }}
                loading={loading}
            />
            <div style={{ position: "absolute", zIndex: 2, bottom: 60 }}>
                <span className="btnSelectAll" onClick={() => handleSelectAll()}>
                    [Chọn hết]
                </span>{" "}
                <span className="btnClearAll" onClick={() => handleClearAll()}>
                    [Bỏ chọn]
                </span>
            </div>
            <div>
                <Button type="primary" disabled={hasSelected ? false : true}>
                    Xuất file tổng hợp Kết quả KSK Tự khám/ Đặc biệt
                </Button>
            </div>
        </div>
    );
};

export default PhysicalExamList;
