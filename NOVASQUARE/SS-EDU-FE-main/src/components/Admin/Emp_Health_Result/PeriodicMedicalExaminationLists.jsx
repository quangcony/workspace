import { Button, Col, DatePicker, Row, Space, Table, Typography } from "antd"
import React, { useState } from "react"
import { TblPagination, formatDate,  } from "../../../common";
import moment from "moment";
/* --- fake table's data to test ---*/
const Hopitals = ["BV Hoàn Mỹ", "BV Gia ĐÌnh", "BV Chợ Rẫy", "BV Việt Đức"]
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString()
}
const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    id: Date.now(),
    date: randomDate(new Date(2022, 0, 1), new Date()),
    hopital: Hopitals[Math.floor(Math.random() * Hopitals.length)],
  })
}
/* ------ */

const PeriodicMedicalExaminationLists = () => {
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
    console.log("dataSource: ", resultData)
    setDataSource(resultData)
  }

  const useStyles = {
    setSpaceBetween: {
      width: "70%",
      justifyContent: "space-between",
    },
  }

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
      width: "5%",
      align: "center",
    },
    {
      title: "Ngày Khám",
      render: (_, record) => {
        const date = moment(record.date).format(formatDate.Type)
        return date
      },
      key: "date",
      width: "30%",
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
      width: "30%",
      align: "center",
      sorter: (a, b) => ("" + a.hopital).localeCompare(b.hopital),
    },
    {
      title: "Chọn",
      colSpan: 2,
      key: "action",
      width: "15%",
      align: "center",
      render: () => <Button type="link">Xem</Button>,
    },
    {
      title: "x",
      colSpan: 0,
      align: "center",
      width: "15%",
      render: () => <Button type="link">Tải file</Button>,
    },
  ]

  return (
    <Row>
      <Col span={22} offset={1}>
        <Space style={{ display: "block" }} className="title">
          <Typography.Title level={3}>
            Danh sách kết quả khám sức khỏe định kỳ
          </Typography.Title>
        </Space>
        <Space style={useStyles.setSpaceBetween} className="title">
          <Typography.Text>Ngày khám</Typography.Text>
          <Space>
            <DatePicker onChange={handlePickStartDate} format={formatDate.Type} />
            <Typography.Text>-</Typography.Text>
            <DatePicker onChange={handlePickEndtDate} format={formatDate.Type} />
          </Space>
          <Button type="primary" onClick={handleSeachData}>
            Tìm kiếm
          </Button>
        </Space>
        <Row>
          <Col span={20} offset={2}>
            <Table
              columns={columns}
              dataSource={dataSource}
              bordered
              pagination={TblPagination}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PeriodicMedicalExaminationLists
