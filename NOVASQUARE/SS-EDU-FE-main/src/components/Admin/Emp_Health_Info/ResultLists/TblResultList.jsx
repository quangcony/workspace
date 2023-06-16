import { Button, Table, Space } from "antd"
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import React, { useState } from "react"
import useConfirmDelete from "../../../../hooks/useConfirmDelete"
import { TblStyles } from "../../../../common"

const TblResultList = ({ openFilePDF, onOpenAddNew, users, onDelete }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)

  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 500)
  }
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    // console.log("selectedRows changed: ", selectedRows)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const hasSelected = selectedRowKeys.length > 0
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }
  const handleDelete = async (id) => {
    await onDelete(id)
  }

  const { confirm } = useConfirmDelete(
    handleDelete,
    "Bạn có chắc muốn xóa mục này?"
  )

  const columns = [
    {
      title: "Mã NV",
      dataIndex: "CD",
      width: TblStyles.CD,
      sorter: (a, b) => ("" + a.CD).localeCompare(b.CD),
      fixed: "left",
    },
    {
      title: "Họ và tên",
      sorter: (a, b) => ("" + a.LAST_NAME).localeCompare(b.LAST_NAME),
      render: (_, record) => (
        <p>
          {record.FIRST_NAME} {record.LAST_NAME}
        </p>
      ),
      width: TblStyles.FULL_NAME,
      fixed: "left",
    },
    {
      title: "Giới tính",
      sorter: (a, b) => ("" + a.BRANCH_NAME).localeCompare(b.BRANCH_NAME),
      render: (_, record) => <p>{record?.Gender?.NAME}</p>,
      width: TblStyles.GENDER,
    },
    {
      title: "Năm sinh",
      sorter: (a, b) => {
        var aa = a?.BOD?.split("/").reverse().join(),
          bb = b?.BOD?.split("/").reverse().join()
        return aa < bb ? -1 : aa > bb ? 1 : 0
      },
      render: (_, record) => new Date(record.BOD).toLocaleDateString("en-GB"),
      width: TblStyles.BOD,
    },
    {
      title: "Nơi làm việc",
      dataIndex: "BRANCH_NAME",
      sorter: (a, b) => ("" + a.BRANCH_NAME).localeCompare(b.BRANCH_NAME),
      width: TblStyles.BRANCH_NAME,
    },
    {
      title: "Khối",
      dataIndex: "AREA_NAME",
      sorter: (a, b) => ("" + a.AREA_NAME).localeCompare(b.AREA_NAME),
      width: TblStyles.AREA_NAME,
    },
    {
      title: "Phòng ban",
      dataIndex: "DEPARTMENT_NAME",
      sorter: (a, b) =>
        ("" + a.DEPARTMENT_NAME).localeCompare(b.DEPARTMENT_NAME),
      width: TblStyles.DEPARTMENT_NAME,
    },
    {
      title: "Số lần khám",
      dataIndex: "MEDICAL_VISIT_NUMBER",
      sorter: (a, b) =>
        ("" + a.MEDICAL_VISIT_NUMBER).localeCompare(b.MEDICAL_VISIT_NUMBER),
      width: TblStyles.MEDICAL_VISIT_NUMBER,
    },
    {
      title: "Năm khám",
      dataIndex: "MEDICAL_EXAM_YEAR",
      width: TblStyles.MEDICAL_EXAM_YEAR,
      // render: () => {
      //   return (
      //     <>
      //       <Select defaultValue={dateNow} style={{ width: "100%" }}>
      //         {listYear &&
      //           listYear.map((item, index) => (
      //             <Option key={index} value={item}>
      //               {item}
      //             </Option>
      //           ))}
      //       </Select>
      //     </>
      //   );
      // },
    },
    {
      title: "Người nhập",
      sorter: (a, b) =>
        ("" + a.USER_INPUT_NAME).localeCompare(b.USER_INPUT_NAME),
      render: (_, record) => (
        <p>
          {record.User_Input_Id?.FIRST_NAME} {record.User_Input_Id?.LAST_NAME}
        </p>
      ),
      width: TblStyles.USER_INPUT_NAME,
    },
    {
      title: "Ngày nhập",
      sorter: (a, b) => {
        var aa = a.INPUT_DATE.split("/").reverse().join(),
          bb = b.INPUT_DATE.split("/").reverse().join()
        return aa < bb ? -1 : aa > bb ? 1 : 0
      },
      render: (_, record) =>
        new Date(record.INPUT_DATE).toLocaleDateString("en-GB"),
      width: TblStyles.INPUT_DATE,
    },
    {
      title: "Nhập KQ KSKDK",
      render: (_, record) => (
        <Button type="link" onClick={() => onOpenAddNew(record)}>
          Nhập mới
        </Button>
      ),
      width: TblStyles.IMPORT,
    },
    // {
    //   title: "Xem file PDF",
    //   dataIndex: "",
    //   render: (_, record) => (
    //     <Button type="link" onClick={() => openFilePDF(record)}>
    //       Xem
    //     </Button>
    //   ),
    //   width: TblStyles.SHOW,
    // },
    {
      title: "Hành động",
      width: TblStyles.ACTION,
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
                />
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  className={"btn-danger"}
                  onClick={() => confirm(record.id)}
                />
              </Space>
            </>
          )}
        </>
      ),
      fixed: "right",
    },
  ]

  // set key for users data
  let modifiedData = users.map((item) => ({
    ...item,
    key: item.id,
  }))
  return (
    <div>
      {/* <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Bỏ chọn
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `${selectedRowKeys.length} mục được chọn` : ""}
        </span>
      </div> */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={modifiedData}
        pagination={{
          total: modifiedData.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 10,
          defaultCurrent: 1,
          size: "small",
        }}
        rowClassName="editable-row"
        className={"table-response"}
        scroll={{
          x: 2000,
        }}
      />
      <div>
        <Button type="primary" disabled={hasSelected ? false : true}>
          Xuất file tổng hợp KQ KSK ĐK
        </Button>
      </div>
    </div>
  )
}

export default TblResultList
