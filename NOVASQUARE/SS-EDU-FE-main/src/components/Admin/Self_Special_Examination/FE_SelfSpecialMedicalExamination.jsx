import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Space, Table, Typography } from "antd"
import React, { useState } from "react"
import { TblPagination,formatDate } from "../../../common";
import moment from "moment";

/* --- fake table's data to test ---*/
const Hopitals = ["BV Hoàn Mỹ", "BV Gia ĐÌnh", "BV Chợ Rẫy", "BV Việt Đức"];
const ExaminationType = ["Khám Xương Khớp", "Khám Tai-Mũi-Họng", "Xét nghiệm máu", "Khám bệnh BV Chợ Rẫy"];
const ExaminationPack = ["Tự khám", "Đặc biệt"];
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString()
}
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    id: Date.now(),
    date: randomDate(new Date(2022, 0, 1), new Date()),
    hopital: Hopitals[Math.floor(Math.random() * Hopitals.length)],
    examinationType: ExaminationType[Math.floor(Math.random() * ExaminationType.length)],
    examinationPack: ExaminationPack[Math.floor(Math.random() * ExaminationPack.length)],
  })
}
/* ------ */

const FESelfSpecialMedicalExamination = ({ setModalOpen }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [dataSource, setDataSource] = useState(data || [])

  const handlePickStartDate = (value) => {
    setStartDate(value?.format(formatDate.Type))
  }
  const handlePickEndtDate = (value) => {
    setEndDate(value?.format(formatDate.Type))
  }
  const handleSeachData = () => {
    if (startDate === undefined || endDate === undefined) {
      setDataSource(data)
      return
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Input wrong!!!")
      setDataSource(data)
      return
    }

    const resultData = data?.filter((a) => {
      return (
        new Date(a.date) >= new Date(startDate) &&
        new Date(a.date) <= new Date(endDate)
      )
    })
    setDataSource(resultData)
  }

  const useStyles = {
    setSpaceBetween: {
      display: "flex",
      alignItem: "center",
      justifyContent: "space-between",

      padding: "24px 0",
    },
  }

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: 70,
      align: "center",
      fixed: "left",
    },
    {
      title: "Ngày nhập",
      key: "ngay_nhap",
      width: 150,
      render: (_, record) => {
        const date =  moment(record.date).format(formatDate.Type)
        return date
      },
    },
    {
      title: "Gói khám",
      key: "goi_kham",
      width: 150,
      dataIndex: "examinationPack",
    },
    {
      title: "Nội dung khám",
      key: "nd_kham",
      width: 250,
      dataIndex: "examinationType",
    },
    {
      title: "Ngày Khám",
      render: (_, record) => {
        const date = moment(record.date).format(formatDate.Type)
        return date
      },
      key: "date",
      width: 150,
      align: "center",
      sorter: (a, b) => {
        a = new Date(a.date)
          .toLocaleDateString("en-GB")
          .split("/")
          .reverse()
          .join("")
        b = new Date(b.date)
          .toLocaleDateString("en-GB")
          .split("/")
          .reverse()
          .join("")
        return a > b ? 1 : a < b ? -1 : 0
      },
    },
    {
      title: "Cơ sở khám",
      dataIndex: "hopital",
      key: "hopital",
      width: 250,
      align: "center",
      sorter: (a, b) => ("" + a.hopital).localeCompare(b.hopital),
    },
    {
      title: "Chọn",
      colSpan: 4,
      fixed: "right",
      key: "action",
      width: 70,
      render: () => <Button type="link">Xem</Button>,
    },
    {
      title: "x",
      colSpan: 0,
      fixed: "right",
      width: 70,
      render: () => <Button type="link">Sửa</Button>,
    },
    {
      title: "x",
      colSpan: 0,
      fixed: "right",
      width: 70,
      render: () => <Button type="link">Xóa</Button>,
    },
    {
      title: "x",
      colSpan: 0,
      fixed: "right",
      width: 100,
      render: () => <Button type="link">Tải file</Button>,
    },
  ]

  return (
    <Row>
      <Col span={22} offset={1}>
        <Space style={{ display: "block" }} className="title">
          <Typography.Title level={3}>
            Kết quả KSK Tự khám/Đặc biệt
          </Typography.Title>
        </Space>
        <Row justify="space-between" gutter={[24, 24]}>
          <Col>
            <Space size={24} wrap>
              Nội dung khám:
              <Input allowClear placeholder="Nhập nội dung khám vào đây" />
            </Space>
          </Col>
          <Col>
            <Space size={24} wrap>
              <Typography.Text>Ngày khám:</Typography.Text>
              <Space wrap size={24}>
                <DatePicker onChange={handlePickStartDate} format={formatDate.Type} />
                <DatePicker onChange={handlePickEndtDate} format={formatDate.Type} />
              </Space>
            </Space>
          </Col>
        </Row>
        <div style={useStyles.setSpaceBetween}>
          <Button type="primary" onClick={handleSeachData}>
            Tìm kiếm
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalOpen(true)}
          />
        </div>
        {dataSource.length && <Table pagination={TblPagination}
          columns={columns}
          dataSource={dataSource}
          bordered
          scroll={{ x: 1000 }}
          
        />}
        {!dataSource.length &&
          <h2 style={{ fontStyle: 'italic', color: 'grey' }}>
            Hiện tại bạn chưa có dữ liệu kết quả KSK Tự khám/ Đặc biệt
          </h2>
        }
      </Col>
    </Row>
  )
}

export default FESelfSpecialMedicalExamination
