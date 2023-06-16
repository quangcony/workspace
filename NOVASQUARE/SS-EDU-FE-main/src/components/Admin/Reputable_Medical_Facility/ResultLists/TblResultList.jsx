import { Button, Table, Space, Pagination } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import {
  TblPagination,
  TblPaginationRepu,
  TblStyles,
} from "../../../../common";
import {
  levelMedicalData,
  medicalModelData,
  technicalData,
} from "../../../../common/dataJson";

const TblResultList = ({ medicalFacilities, onDelete, openEdit }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedAllDatas, setSelectedAllDatas] = useState([]);
  const [data, setData] = useState([]);

  // clear all select
  const handleClearAllRepu = () => {
    setSelectedRowKeys([]);
  };
  // set key data select all
  let rowKeyData = data?.map((item) => item.id);
  const handleSelectAllRepu = () => {
    setSelectedRowKeys(rowKeyData);
    setSelectedAllDatas(data);
  };

  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    // console.log("selectedRows changed: ", selectedRows);
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
  const handleDelete = async (id) => {
    await onDelete(id);
  };

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Bạn có chắc muốn xóa mục này?"
  );

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

  // revert data when create new
  useEffect(() => {
    var newMedicalFacilities = medicalFacilities.reduceRight(function (
      previous,
      current
    ) {
      previous.push(current);
      return previous;
    },
    []);
    setData(newMedicalFacilities);
  }, [medicalFacilities]);

  // set key for users data
  const newDataList = data.filter((item) => item.NAME !== null);
  let modifiedData = newDataList?.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: modifiedData.length > 0 ? 370 : 315,
          // top: 370,
        }}
      >
        <span className="btnSelectAll" onClick={() => handleSelectAllRepu()}>
          [Chọn hết]
        </span>{" "}
        <span className="btnClearAll" onClick={() => handleClearAllRepu()}>
          [Bỏ chọn]
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={modifiedData}
        pagination={TblPaginationRepu}
        rowClassName="editable-row"
        className="table-response"
        // loading={medicalFacilities.length > 0 ? false : true}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          bottom: modifiedData.length > 0 ? 60 : "unset",
        }}
      >
        <span className="btnSelectAll" onClick={() => handleSelectAllRepu()}>
          [Chọn hết]
        </span>{" "}
        <span className="btnClearAll" onClick={() => handleClearAllRepu()}>
          [Bỏ chọn]
        </span>
      </div>

      <div style={{ marginTop: modifiedData.length > 0 ? 0 : 50 }}>
        <Button type="primary" disabled={hasSelected ? false : true}>
          Xuất file tổng hợp Cơ sở khám chữa bệnh
        </Button>
      </div>
    </div>
  );
};

export default TblResultList;
