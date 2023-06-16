import { Button, Table, Space } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import { TblPagination, formatDate } from "../../../../common";
import i18n from "../../../../lib/Language";
import { importApis } from "../../../../api/importApis";
import {
  healthResultRecruitmentData,
  healthStatusRecruitmentData,
} from "../../../../common/dataJson";
import moment from "moment";

const TblResultList = ({
  openFilePDF,
  listPhysicalExam,
  onDelete,
  openEdit,
  isDisplayDeleteBtn,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsloading] = useState(false);
  const [selectAllData, setSelectAllData] = useState([]);

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(selectedRows);
  };
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

  const { confirm } = useConfirmDelete(
    handleDelete,
    `${i18n.t("general.mesDelete")}`
  );

  // CLEAR ALL DATA SELECT
  const handleClearAll = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setSelectAllData([]);
  };
  // GET ALL DATA KEY FOR SELECT ALL
  let rowKeyData = listPhysicalExam?.map((item) => item.id);

  // SELECT ALL DATA IN TABLE
  const handleSelectAll = () => {
    setSelectedRowKeys(rowKeyData);
    setSelectAllData(listPhysicalExam);
  };

  //EXPROT FILE TO EXCEL
  const handleExportExcel = async () => {
    try {
      setIsloading(true);
      await importApis.exportRecruitPhysicalExamsToExcel(
        selectAllData?.length > 0 ? selectAllData : selectedRows
      );
      setIsloading(false);
      enqueueSnackbar(
        // `Xuất kết quả khám thành công.`,
        `${i18n.t("healthHandbooks.employeeHealthInfo.exportSuccessfully")}`,
        {
          variant: "success",
        }
      );
    } catch (error) {
      setIsloading(false);
      enqueueSnackbar(`export failed with error: ${error}`, {
        variant: "error",
      });

      console.log(error);
    }
  };

  const columns = [
    {
      title: "Mã NV",
      dataIndex: "CD",
      width: "5%",
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      fixed: "left",
    },
    {
      title: "Họ lót",
      sorter: (a, b) => ("" + a.FIRST_NAME).localeCompare(b.FIRST_NAME),
      render: (_, record) => <>{record.FIRST_NAME}</>,
      width: "10%",
      fixed: "left",
    },
    {
      title: "Tên NV",
      sorter: (a, b) => ("" + a.LAST_NAME).localeCompare(b.LAST_NAME),
      render: (_, record) => <>{record.LAST_NAME}</>,
      width: "10%",
      fixed: "left",
    },
    {
      title: "Giới tính",
      dataIndex: "GENDER_ID",
      sorter: (a, b) => a.GENDER_ID - b.GENDER_ID,
      render: (_, record) => <>{record?.Gender?.NAME}</>,
      width: "10%",
    },
    {
      title: "Ngày sinh",
      dataIndex: "BOD",
      sorter: (a, b) => {
        return new Date(b.BOD) - new Date(a.BOD);
      },
      render: (_, record) => moment(record?.BOD).format(formatDate.Type),
      width: "10%",
    },
    {
      title: "Phòng ban",
      dataIndex: "DEPT_NAME",
      sorter: (a, b) => ("" + a.DEPT_NAME).localeCompare(b.DEPT_NAME),
      width: "15%",
    },
    {
      title: "Kết luận",
      dataIndex: ["RESULT"],
      render: (text, record) => {
        let result = "";
        if (record.RESULT_2) {
          healthResultRecruitmentData.forEach((item) => {
            if (record.RESULT_2 === item.value) {
              result = item.label;
            }
          });
        } else {
          healthResultRecruitmentData.forEach((item) => {
            if (record.RESULT === item.value) {
              result = item.label;
            }
          });
        }
        return result;
      },
      sorter: (a, b) => ("" + a.RESULT).localeCompare(b.RESULT),
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "STATUS",
      render: (test) => {
        let result = "";
        healthStatusRecruitmentData.forEach((item) => {
          if (test === item.value) {
            result = item.label;
          }
        });
        return result;
      },
      sorter: (a, b) => ("" + a.STATUS).localeCompare(b.STATUS),
      width: "15%",
    },
    {
      title: "Hành động",
      width: "15%",
      render: (_, record) => (
        <>
          {record.age === 0 ? (
            " "
          ) : (
            <>
              <Space size="middle">
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  className={"btn-success"}
                  onClick={() => openFilePDF(record)}
                />
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  className={"btn-warning"}
                  onClick={() => openEdit(record)}
                />
                {isDisplayDeleteBtn && (
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    className={"btn-danger"}
                    onClick={() => confirm(record.id)}
                  />
                )}
              </Space>
            </>
          )}
        </>
      ),
      fixed: "right",
    },
  ];

  // set key for listPhysicalExam data
  let modifiedData = listPhysicalExam?.map((item) => ({
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
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={modifiedData}
        pagination={TblPagination}
        rowClassName="editable-row"
        className={"table-response"}
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
        <Button
          loading={isLoading}
          type="primary"
          disabled={hasSelected ? false : true}
          onClick={handleExportExcel}
        >
          Xuất file tổng hợp KQ KSK
        </Button>
      </div>
    </div>
  );
};

export default TblResultList;
