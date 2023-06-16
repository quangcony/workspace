import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Select, Space, Table } from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { importApis } from "../../../../api/importApis";
import moduleApi from "../../../../api/moduleApi";
import { formatDate, TblPagination, TblStyles } from "../../../../common";
import Permissions_CD from "../../../../data_json/Permissions_CD.json";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import i18n from "../../../../lib/Language";
import { isDeleteState } from "../../../../recoil/atom/booleanState";
import { generalState } from "../../../../recoil/atom/generalState";
import { findExistance } from "../../../../utils/findExistance";

const PhysicalExamList = ({
  openFilePDF,
  onOpenAddNew,
  listEmployee,
  onDelete,
  openEdit,
  physicalExamOption,
  hideElements,
  loading,
  examType,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const setIsDelete = useSetRecoilState(isDeleteState);
  const { moduleSelected } = useRecoilValue(generalState);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [selectedRowKeys1, setSelectedRowKeys1] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);

  const [listDataExport, setListDataExport] = useState([]);
  const [dataSource, setDataSource] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [permissionsCD, setPermissionsCD] = useState();

  useEffect(() => {
    if (listEmployee) {
      setDataSource(listEmployee);
    }
  }, [listEmployee]);

  useEffect(() => {
    //get permissions of current user to page
    (async () => {
      const response = await moduleApi.getPermissionsByModuleId(
        moduleSelected?.id
      );
      if (response.status === 200 && response.data.elements.length > 0) {
        const temp = [
          ...response.data.elements.map((item) => item.PERMISSION_CD),
        ];
        setPermissionsCD(temp);
      } else {
        setPermissionsCD([]);
        history.push("/");
      }
    })();
  }, []);

  //CLEAR SELECT ALL IN TABLE
  const handleClearAll = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setListDataExport([]);
  };

  let rowKeyData = dataSource?.map((item) => item.id);

  // console.log("examType: ", examType);

  // SELETC ALL DATA IN TABLE
  const handleSelectAll = () => {
    setSelectedRowKeys(rowKeyData);
    setListDataExport(dataSource);
  };

  //HANDLE CHANGE SELECT ON TABLE
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    console.log("selectedRows changed: ", selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const hasSelected = selectedRowKeys.length > 0;
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //DELETE PHYSICAL EXAM
  const handleDelete = async (id) => {
    setIsDelete(false);
    await onDelete(id);
  };

  //CONFIRM DELETE
  const { confirm } = useConfirmDelete(
    handleDelete,
    // "Bạn có chắc muốn xóa mục này?"
    `${i18n.t("general.mesDelete")}`
  );

  //EXPROT FILE TO EXCEL
  const handleExportExcel = async () => {
    try {
      setIsloading(true);
      // await importApis.exportPhysicalExamsToExcel(selectedRows);
      switch (examType) {
        case 4:
        case 5:
          await importApis.exportPhysicalExamsToExcel(
            listDataExport?.length > 0 ? listDataExport : selectedRows,
            examType
          );
          break;
        case 6:
          await importApis.exportOccupationPhysicalExamsToExcelFile(
            listDataExport?.length > 0 ? listDataExport : selectedRows,
            examType
          );
          break;

        default:
          break;
      }
      setIsloading(false);
      //refetch the medical exam result list
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
      render: (_, record) => {
        const medicalNumber = physicalExamOption?.filter(
          (item) => item.USER_ID === record?.USER_ID
        );

        return <>{medicalNumber?.length}</>;
      },
      width: TblStyles.MEDICAL_VISIT_NUMBER,
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
    hideElements
      ? {
        width: 1,
      }
      : {
        title: "Nhập KQ KSK",
        render: (_, record) => (
          <Button
            type="link"
            onClick={() => onOpenAddNew(record)}
            disabled={!findExistance(permissionsCD, Permissions_CD.create)}
          >
            Nhập mới
          </Button>
        ),
        width: TblStyles.IMPORT,
        fixed: "right",
      },
  ];

  const expandedRowRender = (employeeInfo) => {
    let listPhysicalExam = employeeInfo?.Physical_Exams?.reduceRight(function (
      previous,
      current
    ) {
      previous.push(current);
      return previous;
    },
      []);

    //HANDLE CHANGE SELECT ON TABLE
    const onSelectChange1 = (newSelectedRowKeys, selectedRows) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      console.log("selectedRows changed: ", selectedRows);
      // setSelectedRowKeys(newSelectedRowKeys);
      // setSelectedRows(selectedRows);
    };

    const hasSelected1 = selectedRowKeys1.length > 0;
    const rowSelection1 = {
      selectedRowKeys1,
      onChange: onSelectChange1,
    };

    // SET KEY FOR DATA LIST PHYSICAL EXAM
    let modifiedData = listPhysicalExam?.map((item) => ({
      ...item,
      key: item.id,
    }));

    const columns = [
      {
        title: "STT",
        width: "5%",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Ngày khám",
        render: (_, record) =>
          moment(record.PHYSICAL_DATE).format(formatDate.Type),
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
      examType === 6 ? {
        title: "Hình thức khám",
        key: "SPECIAL_EXAMS_TYPE",
        render: (_, record) => record?.Special_Exams[0]?.TYPE ? "Định kỳ" : "Tầm soát",
      } : {},
      {
        title: "Hành động",
        dataIndex: "operation",
        key: "operation",
        width: "150px",
        align: "center",
        render: (_, record) => (
          <>
            <Space size="middle">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                className={"btn-success"}
                onClick={() => openFilePDF(record, employeeInfo)}
                disabled={!findExistance(permissionsCD, Permissions_CD.read)}
              />
              {hideElements ? (
                ""
              ) : (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  className={"btn-warning"}
                  onClick={() => openEdit(record, employeeInfo)}
                  disabled={
                    !findExistance(permissionsCD, Permissions_CD.update)
                  }
                />
              )}
              {hideElements ? (
                ""
              ) : (
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  className={"btn-danger"}
                  onClick={() => confirm(record.id)}
                  disabled={
                    !findExistance(permissionsCD, Permissions_CD.delete)
                  }
                />
              )}
            </Space>
          </>
        ),
      },
    ];

    return (
      <Table
        rowSelection={rowSelection1}
        columns={columns}
        dataSource={modifiedData}
        pagination={false}
        className="gray-color-thead"
      />
    );
  };

  // SET KEY FOR DATA LIST EMPLOYEE
  let modifiedData = dataSource?.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div>
      {hideElements ? (
        ""
      ) : (
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
      )}

      <Table
        rowSelection={hideElements ? null : rowSelection}
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
          x: 2100,
        }}
        loading={loading}
      />
      {hideElements ? (
        ""
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              bottom: modifiedData?.length > 0 ? 60 : "unset",
            }}
          >
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
          <div style={{ marginTop: modifiedData?.length > 0 ? 0 : 50 }}>
            <Button
              loading={isLoading}
              type="primary"
              disabled={hasSelected ? false : true}
              onClick={handleExportExcel}
            >
              Xuất file tổng hợp KQ KSK
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PhysicalExamList;
