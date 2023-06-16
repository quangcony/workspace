import { Button, Table, Space } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import useConfirmDelete from "../../../../../hooks/useConfirmDelete";
import { TblPagination, formatDate, TblStyles } from "../../../../../common";
import i18n from "../../../../../lib/Language";
import { importApis } from "../../../../../api/importApis";
import {
  levelMedicalData,
  medicalModelData,
  technicalData,
} from "../../../../../common/dataJson";

const TblResultList = ({
  medicalFacilities,
  onDelete,
  openEdit,
  isUpdateBtn,
  isDeleteBtn,
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
  let rowKeyData = medicalFacilities?.map((item) => item.id);

  // SELECT ALL DATA IN TABLE
  const handleSelectAll = () => {
    setSelectedRowKeys(rowKeyData);
    setSelectAllData(medicalFacilities);
  };

  //EXPROT FILE TO EXCEL
  const handleExportExcel = async () => {
    try {
      setIsloading(true);
      await importApis.exportMedicalFacilityToExcel(
        selectAllData?.length > 0 ? selectAllData : selectedRows
      );
      setIsloading(false);
      enqueueSnackbar(
        `Xuất kết quả cơ sở khám thành công.`,
        // `${i18n.t("healthHandbooks.employeeHealthInfo.exportSuccessfully")}`,
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
      title: "STT",
      width: "3%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên cơ sở",
      dataIndex: "NAME",
      width: TblStyles.MEDICAL_NAME,
      sorter: (a, b) => ("" + a.NAME).localeCompare(b.NAME),
    },
    {
      title: "Tỉnh/Thành phố",
      sorter: (a, b) => ("" + a.City?.NAME).localeCompare(b.City?.NAME),
      render: (_, record) => <p>{record?.City?.NAME}</p>,
      width: TblStyles.CITY,
    },
    {
      title: "Mã BHYT",
      sorter: (a, b) => a.SOCIAL_CD - b.SOCIAL_CD,
      render: (_, record) => <p>{record?.SOCIAL_CD}</p>,
      width: TblStyles.SOCIAL_CD,
    },
    {
      title: "Mô hình tổ chức",
      sorter: (a, b) => ("" + a.MEDICAL_MODEL).localeCompare(b.MEDICAL_MODEL),
      render: (_, record) => {
        const newName = medicalModelData.filter(
          (item) => item.value === record?.MEDICAL_MODEL
        );
        return <p>{newName[0]?.label}</p>;
      },
      width: TblStyles.MODEL_CD,
    },
    {
      title: "Điện thoại",
      sorter: (a, b) => a.PHONE - b.PHONE,
      render: (_, record) => <p>{record?.PHONE}</p>,
      width: TblStyles.PHONE,
    },
    {
      title: "Tuyến kỹ thuật",
      dataIndex: "",
      sorter: (a, b) => ("" + a.TECHNICAL_AREA).localeCompare(b.TECHNICAL_AREA),
      width: TblStyles.AREA_CD,
      render: (_, record) => {
        const newName = technicalData.filter(
          (item) => item.value === record?.TECHNICAL_AREA
        );
        return <p>{newName[0]?.label}</p>;
      },
    },
    {
      title: "Hạng bệnh viện",
      dataIndex: "",
      sorter: (a, b) => ("" + a.LEVEL).localeCompare(b.LEVEL),
      width: TblStyles.LEVEL_CD,
      render: (_, record) => {
        const newName = levelMedicalData.filter(
          (item) => item.value === record?.LEVEL
        );
        return <p>{newName[0]?.label}</p>;
      },
    },
    {
      title: "Hành động",
      width: "7%",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              className={"btn-warning"}
              onClick={() => openEdit(record.id)}
              disabled={isUpdateBtn}
            />
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              className={"btn-danger"}
              onClick={() => confirm(record.id)}
              disabled={isDeleteBtn}
            />
          </Space>
        </>
      ),
    },
  ];

  // // set key for medicalFacilities data
  // let modifiedData = medicalFacilities?.map((item) => ({
  //   ...item,
  //   key: item.id,
  // }));
  const [modifiedData, setmodifiedData] = useState([]);
  // revert data when create new
  useEffect(() => {
    if (medicalFacilities) {
      var newMedicalFacilities = medicalFacilities.reduceRight(function (
        previous,
        current
      ) {
        previous.push(current);
        return previous;
      },
      []);
      // set key for listPhysicalExam data
      setmodifiedData(
        newMedicalFacilities?.map((item) => ({
          ...item,
          key: item.id,
        }))
      );
    }
  }, [medicalFacilities]);

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
          Xuất file danh sách cơ sở khám chữa bệnh
        </Button>
      </div>
    </div>
  );
};

export default TblResultList;
