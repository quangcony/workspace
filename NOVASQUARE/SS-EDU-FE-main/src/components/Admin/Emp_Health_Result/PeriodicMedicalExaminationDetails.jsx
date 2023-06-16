import { Button, Col, Descriptions, Row, Space, Typography } from "antd"
import React, { useRef } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

/* fake data to test*/
const blood_analysis = [
  {
    title: "- Bạch cầu/WBC:",
    value: "#",
    unit: "K/µL",
    normal: "4.1 - 10.9",
  },
  {
    title: "- Hồng cầu/RBC:",
    value: "4",
    unit: "M/µL",
    normal: "3.9 - 5.5",
  },
  {
    title: "- Huyết sắc tố/HGB:",
    value: "#",
    unit: "g/dL",
    normal: "12 - 18",
  },
  {
    title: "- Dung tích hồng cầu/HCT:",
    value: "#",
    unit: "%",
    normal: "37 - 50",
  },
  {
    title: "- Số lượng huyết sắc tố trung bình/MCH:",
    value: "#",
    unit: "Pg",
    normal: null,
  },
  {
    title: "- Thể tích hồng cầu/MCV:",
    value: "#",
    unit: "fL",
    normal: null,
  },
  {
    title: "- Tiểu cầu/PLT:",
    value: "231",
    unit: "K/uL",
    normal: "140 - 440",
  },
]

const blood_lipids = [
  {
    title: "Cholesterol",
    value: "6.70",
    unit: "mmol/l",
    normal: "3.9 - 6.5",
  },
  {
    title: "HDL",
    value: "0.80",
    unit: "mmol/l",
    normal: "0.9 - 2.2",
  },
  {
    title: "LDL",
    value: "3.50",
    unit: "mmol/l",
    normal: "0.5 - 3.4",
  },
  {
    title: "Triglyceride",
    value: "2.40",
    unit: "mmol/l",
    normal: "0.5 - 1.9",
  },
]

const current_illness = [
  "Tăng huyết áp đang điều trị",
  "Nhịp chậm xoang, block nhánh phải không hoàn toàn.",
  "Nhẹ cân, thiếu máu hồng cầu nhỏ nhược sắc.",
  "Gan nhiễm mỡ độ I, tăng men gan",
  "Vẹo vách ngăn mũi (P), viêm mũi xoang dị ứng.",
  "Tật khúc xạ hai mắt.",
  "Rối loạn chuyển hóa Lipid máu.",
  "Nang tuyến giáp hai bên.",
  "Nhiễm trùng tiểu.",
]
const advise = [
  "Khám chuyên khoa: Nội tim mạch, dinh dưỡng, huyết học, tiêu hóa - gan mật, tai mũi họng, mắt, nội tiết, thận - tiết niệu.",
  "Đề nghị làm thêm xét nghiệm kiểm tra hormon tuyến giáp, nội soi mũi họng.",
  "Ăn nhạt, giảm muối. Hạn chế đồ ăn nhiều dầu mỡ, mỡ động vật, nội tạng, ăn nhiều rau xanh, trái cây. Uống nhiều nước, tránh nhịn tiểu.",
]
const examination = [
  "Chuyên khoa Nội tim mạch",
  "Chuyên khoa Dinh dưỡng",
  "Chuyên khoa Huyết học",
  "Chuyên khoa Tiêu hóa - Gan mật",
  "Chuyên khoa Tai mũi họng",
  "Chuyên khoa Mắt",
  "Chuyên khoa Nội tiết",
  "Chuyên Khoa Thận - Tiết niệu",
]
const complications = [
  "Tăng huyết áp có thể gây đột quỵ, tai biến mạch máu não, suy thận, biến chứng võng mạc mắt",
  "Gan nhiễm mỡ có thể dẫn đến Xơ gan(15%), Ung Thư gan (4%)",
  "Bệnh lý vách ngăn có thể gây viêm mũi xoang, nghẹt mũi, chảy máu mũi, ngủ ngáy, nhức đầu.",
  "Tật khúc xạ có thể làm tăng độ cận thị, giảm thị lực, nhức mắt, mỏi mắt, đau đầu.",
  "Rối loạn lipid máu gây xơ vữa mạch máu, bóc tách động mạch vành, bệnh lý tim mạch",
  "Tuyến giáp có thể gây biến chứng chèn ép, rối loạn chức năng tuyến giáp",
  "Nhiễm trùng tiểu có thể gây viêm đài bể thận cấp do abces quanh thận, suy thận cấp, nhiễm trùng huyết",
]
const examinationDetails = [
  "Khám chuyên khoa tim mạch theo chỉ định của bác sĩ",
  "Kiểm tra công thức máu (Hồng cầu, huyết sắc tố, dung tích hồng cầu) xem có thiếu máu hay không, chức năng thận, men gan, kiểm tra xem có đang nhiễm vi khuẩn dạ dày hay không. Điện di Hemoglobin",
  "Siêu âm bụng tổng quát định kỳ kiểm tra mức độ gan nhiễm mỡ. Kiểm tra lại men gan theo chỉ định của bác sĩ",
  "Khám chuyên khoa TMH, chụp xoang, xét nghiệm máu",
  "Kiểm tra thị lực, độ cận của mắt, mang kính có đúng với độ của mắt không",
  "Siêu âm tuyến giáp, xét nghiệm chức năng tuyến giáp khi có chỉ định của bác sĩ Nội tiết. Xét nghiệm kiểm tra lipid máu định kỳ",
  "Xét nghiệm tổng phân tích nước tiểu, công thức máu, chức năng thận",
]
const prevention = [
  "Ăn nhạt, giảm muối. Hạn chế đồ ăn nhiều dầu mỡ, mỡ động vật, nội tạng, ăn nhiều rau xanh, trái cây. ",
  "Thiếu cân cần ăn uống đủ chất dinh dưỡng, uống thêm sữa, tập thể cần khám dạ dày và nội tiết, chuyên khoa huyết học nếu sau 6 tháng không cải thiện",
  "Để giảm viêm nhiễm, bệnh lý vùng hầu họng và mũi cần vệ sinh vùng mũi-hầu họng, tránh khói bụi cần mang khẩu trang, súc họng với nước ấm pha muối loãng. Cần khám TMH khi có triệu chứng sốt, đau họng.",
  "Để giảm tật khúc xạ cần đủ ánh sáng để làm việc, không ngồi lâu trước màn hình, mỗi tiếng phải cho mắt được nghỉ 5 phút, massage và nhỏ nước mắt nhân tạo.	",
  "Để giảm bệnh lý tuyến giáp nên có chế độ hạn chế khoai mì (sắn), đậu nành, các loại cải sẽ làm giảm hấp thu Iode.",
  "Để giảm viêm nhiễm và bệnh lý đường tiết niệu cần vệ sinh bộ phận sinh dục ngoài sau mỗi lần đi tiểu, uống nhiều nước, không nhịn tiểu",
]
/* ------ */

const PeriodicMedicalExaminationDetails = ({ onCancel, dataViewPDF }) => {
  const printPage1Ref = useRef()
  const printPage2Ref = useRef()
  const useStyles = {
    setCenter: {
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
    },
    setSpaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItem: "center",
    },
    textIndent: {
      textIndent: 30,
    },
    normalUnitStyles: {
      borderRight: "none",
      verticalAlign: "top",
      color: "black",
      textAlign: "center",
    },
  }

  const handleDownloadPDF = async () => {
    const canvasPage1 = await html2canvas(printPage1Ref.current, {
      scale: 1.5,
    })
    const canvasPage2 = await html2canvas(printPage2Ref.current, {
      scale: 1.5,
    })

    const dataPage1 = canvasPage1.toDataURL("image/png")
    const dataPage2 = canvasPage2.toDataURL("image/png")

    const pdf = new jsPDF("portrait", "px", "a4")

    const imgProperties = pdf.getImageProperties(dataPage1)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = Math.floor(
      (imgProperties.height * pdfWidth) / imgProperties.width
    )

    pdf.addImage(dataPage1, "PNG", 0, 10, pdfWidth, pdfHeight)
    pdf.setFontSize(8)
    pdf.setTextColor("Gray")
    pdf.text("page_01", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    })

    pdf.addPage()
    pdf.addImage(dataPage2, "PNG", 0, 10, pdfWidth, pdfHeight)
    pdf.text("page_02", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    })

    pdf.save("kqkskdk.pdf")
  }

  console.log("dataViewPDF: ", dataViewPDF)
  return (
    <>
      <div ref={printPage1Ref}>
        <Row>
          <Col span={22} offset={1}>
            <Space wrap style={useStyles.setCenter} className="title">
              <Typography.Title level={3}>
                KẾT QUẢ KHÁM SỨC KHỎE ĐỊNH KỲ
              </Typography.Title>
            </Space>

            <Descriptions
              bordered
              column={1}
              size="small"
              labelStyle={{ width: 0 }}
              contentStyle={{ width: "100%", padding: "5px 2px" }}
            >
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        HỌ VÀ TÊN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        LÊ VĂN A
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        SỐ HỒ SƠ:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        10
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        GIỚI TÍNH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        NAM
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        Ngày sinh:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        1990
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={24}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        BỘ PHẬN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        #
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        CHI NHÁNH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        NHÀ MÁY BIÊN HÒA
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph className="fz16" strong>
                        CÔNG TY AJINOMOTO VIỆT NAM
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
            </Descriptions>
            <Space className="title">
              <Typography.Title level={4}>I. KHÁM THỂ LỰC</Typography.Title>
            </Space>
            <Descriptions
              bordered
              labelStyle={{
                background: "none",
                borderRight: "none",
                fontWeight: 600,
                fontSize: "16px",
                padding: "2px 4px",
              }}
              contentStyle={{
                borderRight: "none",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(0, 0, 0, 0.45)",
                width: 80,
                padding: 4,
              }}
              column={4}
              size="small"
            >
              {/* <Descriptions.Item label="Chiều cao:">1.657</Descriptions.Item>
              <Descriptions.Item label="m"></Descriptions.Item>
              <Descriptions.Item label="Cân nặng:">45.7</Descriptions.Item>
              <Descriptions.Item label="kg"></Descriptions.Item>
              <Descriptions.Item label="Huyết áp:">130/70</Descriptions.Item>
              <Descriptions.Item label="mmHg"></Descriptions.Item>
              <Descriptions.Item label="BIM:" span={2}>
                #
              </Descriptions.Item> */}
              <Descriptions.Item
                style={{
                  color: dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Chiều cao :"
              >
                {
                  dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                    ? dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                    : ""
                  // : "1.657"
                }
              </Descriptions.Item>
              <Descriptions.Item label="m"></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color: dataViewPDF?.WEIGHT
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Cân nặng:"
              >
                {
                  dataViewPDF?.WEIGHT ? dataViewPDF?.WEIGHT : ""
                  // : 45.7
                }
              </Descriptions.Item>
              <Descriptions.Item label="kg"></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color: dataViewPDF?.BLOOD_PRESSURE
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Huyết áp:"
              >
                {
                  dataViewPDF?.BLOOD_PRESSURE ? dataViewPDF?.BLOOD_PRESSURE : ""
                  // : 130 / 70
                }
              </Descriptions.Item>
              <Descriptions.Item label="mmHg"></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color:
                    dataViewPDF?.WEIGHT && dataViewPDF?.HEIGH
                      ? ""
                      : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="BMI:"
                span={2}
              >
                {
                  dataViewPDF?.WEIGHT && dataViewPDF?.HEIGH
                    ? (
                        Math.round(
                          (dataViewPDF?.WEIGHT /
                            (dataViewPDF?.HEIGH * dataViewPDF?.HEIGH)) *
                            100
                        ) / 100
                      ).toFixed(2)
                    : ""
                  // : 45.7 / (1.657 * 1.657)
                }
              </Descriptions.Item>
            </Descriptions>
            <Space className="title">
              <Typography.Title level={4}>
                II. TÓM TẮT KẾT QUẢ KHÁM
              </Typography.Title>
            </Space>
            <Descriptions
              column={2}
              bordered
              labelStyle={{
                background: "none",
                fontWeight: 600,
                fontSize: "16px",

                verticalAlign: "top",
                borderRight: "1px solid black",
                padding: 4,
              }}
              contentStyle={{
                fontWeight: 600,
                fontSize: "16px",
                borderRight: "1px solid black",
                color: "rgba(0, 0, 0, 0.45)",
                padding: 4,
              }}
            >
              <Descriptions.Item
                label="NỘI DUNG KHÁM"
                labelStyle={{
                  width: "30%",
                  fontWeight: 900,
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
                contentStyle={{
                  fontWeight: 900,
                  textAlign: "center",
                  color: "black",
                }}
              >
                KẾT QUẢ KHÁM VÀ KẾT LUẬN
              </Descriptions.Item>
              <Descriptions.Item
                label=""
                labelStyle={{
                  width: "0%",
                  borderRight: "none",
                }}
                contentStyle={{
                  width: "20%",
                  fontWeight: 900,
                  textAlign: "center",
                  color: "black",
                  borderRight: "none",
                }}
              >
                CHỈ SỐ BÌNH THƯỜNG (Nếu có)
              </Descriptions.Item>
              <Descriptions.Item label="Nội khoa">
                Bình thường
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Ngoại khoa">
                Tiền căn mổ ruột thừa năm 2016
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Mắt">
                Hai mắt tật khúc xạ
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Tai-Mũi-Họng">
                Vẹo vách ngăn mũi P, viêm mũi xoang dị ứng
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Răng-Hàm-Mặt">
                Mất răng 46, sức nhai 97%
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Da liễu">Bình thường</Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Sản Phụ khoa">
                Bình thường
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Siêu âm">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  Chủ mô echo dày, giảm âm vùng sâu, đường mật không dãn
                </Typography.Paragraph>
                <Typography.Paragraph className="m0-p0" type="secondary">
                  → {"Gan nhiễm mỡ cấp độ 1"}
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Điện tâm đồ">
                Nhịp xoang 56 lần/ phút, Block nhánh Phải không hoàn toàn
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Xquang phổi">
                Bình thường
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Tổng phân tích tế bào máu">
                {blood_analysis.map((item, index) => (
                  <Row gutter={[8, 0]} key={index}>
                    <Col span={18}>
                      <div style={useStyles.setSpaceBetween}>
                        <Typography.Text>{item.title}</Typography.Text>
                        <Typography.Text type="secondary">
                          {item.value}
                        </Typography.Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <Typography.Text>{item.unit}</Typography.Text>
                    </Col>
                  </Row>
                ))}
                <Typography.Text type="secondary" className="m0-p0">
                  → {"Thiếu máu hồng cầu nhỏ nhược sắc. Bạch cầu tăng nhẹ"}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                {blood_analysis.map((item, index) => (
                  <Typography.Paragraph key={index}>
                    {item.normal !== null ? item.normal : "-"}
                  </Typography.Paragraph>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Đường huyết đói (Glucose)">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text></Typography.Text>
                      <Typography.Text type="secondary">7.0</Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>mmol/l</Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                3.9 - 6.4
              </Descriptions.Item>
              <Descriptions.Item label="Chức năng thận">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Urea:</Typography.Text>
                      <Typography.Text type="secondary">5.0</Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>mmol/l</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Creatine:</Typography.Text>
                      <Typography.Text type="secondary">#</Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>µmol/l</Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Paragraph>2.5 - 8.3</Typography.Paragraph>
                <Typography.Paragraph>53 - 120</Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Chức năng gan">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGOT:</Typography.Text>
                      <Typography.Text type="secondary">#</Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>UI/L</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGPT:</Typography.Text>
                      <Typography.Text type="secondary">#</Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>UI/L</Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Paragraph>5 - 40</Typography.Paragraph>
                <Typography.Paragraph>5 - 44</Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Lipid máu (Bộ mỡ máu)">
                {blood_lipids.map((item, index) => (
                  <Row gutter={[8, 0]} key={index}>
                    <Col span={18}>
                      <div style={useStyles.setSpaceBetween}>
                        <Typography.Text>{item.title}</Typography.Text>
                        <Typography.Text type="secondary">
                          {item.value}
                        </Typography.Text>
                      </div>
                    </Col>
                    <Col span={6}>
                      <Typography.Text>{item.unit}</Typography.Text>
                    </Col>
                  </Row>
                ))}
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                {blood_lipids.map((item, index) => (
                  <Typography.Paragraph key={index}>
                    {item.normal !== null ? item.normal : "-"}
                  </Typography.Paragraph>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng phân tích nước tiểu">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {"Hồng cầu +; Bạch cầu ++"}
                </Typography.Paragraph>
                <Typography.Paragraph className="m0-p0" type="secondary">
                  → {"Theo dõi Nhiễm trùng tiểu"}
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </div>
      {/* <div ref={printPage2Ref}>
        <Row>
          <Col span={22} offset={1}>
            <Space direction="vertical" size={4} className="title">
              <Typography.Title level={4}>
                III. KẾT LUẬN CỦA BÁC SĨ CHUYÊN KHOA:
              </Typography.Title>
              <Space className="m0-p0">
                <Typography.Title level={5} style={useStyles.textIndent}>
                  1. Phân loại sức khỏe: Loại
                </Typography.Title>
                <Typography.Paragraph type="secondary" strong className="fz16">
                  {3}
                </Typography.Paragraph>
              </Space>
              <Typography.Title level={5} style={useStyles.textIndent}>
                2. Bệnh lý hiện tại:
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                {current_illness.map((item, index) => (
                  <Typography.Paragraph
                    key={index}
                    className="m0-p0 txt-indent__60"
                    type="secondary"
                    strong
                  >
                    - {item}
                  </Typography.Paragraph>
                ))}
              </Space>
              <Space className="m0-p0">
                <Typography.Title level={5} style={useStyles.textIndent}>
                  3. Kết luận:
                </Typography.Title>
                <Typography.Paragraph type="secondary" strong className="fz16">
                  {"Đủ sức khỏe làm việc"}
                </Typography.Paragraph>
              </Space>
              <Typography.Title level={5} style={useStyles.textIndent}>
                4. Đề nghị:
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                {advise.map((item, index) => (
                  <Typography.Paragraph
                    key={index}
                    className="m0-p0 txt-indent__60"
                    type="secondary"
                    strong
                  >
                    - {item}
                  </Typography.Paragraph>
                ))}
              </Space>
              <Typography.Title level={4} style={{ paddingTop: 24 }}>
                IV. TƯ VẤN CỦA BÁC SĨ CHUYÊN KHOA:
              </Typography.Title>
              <Typography.Title level={5} style={useStyles.textIndent}>
                1. Căn cứ vào kết quả khám sức khỏe. Anh/ Chị cần đi khám kiểm
                tra:
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                {examination.map((item, index) => (
                  <Typography.Paragraph
                    key={index}
                    className="m0-p0 txt-indent__60"
                    type="secondary"
                    strong
                  >
                    - {item}
                  </Typography.Paragraph>
                ))}
              </Space>
              <Typography.Title level={5} style={useStyles.textIndent}>
                2. Các biến chứng của căn bệnh nếu không đi khám kiểm tra và
                điều trị:
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                {complications.map((item, index) => (
                  <Typography.Paragraph
                    key={index}
                    className="m0-p0 txt-indent__60"
                    type="secondary"
                    strong
                  >
                    - {item}
                  </Typography.Paragraph>
                ))}
              </Space>
              <Typography.Title level={5} style={useStyles.textIndent}>
                3. Nội dung cần khám kiểm tra, điều trị đối với căn bệnh:
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                {examinationDetails.map((item, index) => (
                  <Typography.Paragraph
                    key={index}
                    className="m0-p0 txt-indent__60"
                    type="secondary"
                    strong
                  >
                    - {item}
                  </Typography.Paragraph>
                ))}
              </Space>
              <Typography.Title level={5} style={useStyles.textIndent}>
                4. Chế độ phòng bệnh, phòng biến chứng:
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                {prevention.map((item, index) => (
                  <Typography.Paragraph
                    key={index}
                    className="m0-p0 txt-indent__60"
                    type="secondary"
                    strong
                  >
                    - {item}
                  </Typography.Paragraph>
                ))}
              </Space>
            </Space>
          </Col>
        </Row>
      </div> */}
      <div ref={printPage2Ref}>
        <Row>
          <Col span={22} offset={1}>
            <Space direction="vertical" size={4} className="title">
              <Typography.Title level={4}>
                III. KẾT LUẬN CỦA BÁC SĨ CHUYÊN KHOA:
              </Typography.Title>
              <Space className="m0-p0">
                <Typography.Title
                  level={5}
                  style={{
                    ...useStyles.textIndent,
                    color: dataViewPDF?.HEALTH_CLASSIFY
                      ? ""
                      : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }}
                >
                  1. Phân loại sức khỏe:
                </Typography.Title>
                <Typography.Paragraph type="secondary" strong className="fz16">
                  {dataViewPDF?.HEALTH_CLASSIFY
                    ? "Loại " + dataViewPDF?.HEALTH_CLASSIFY
                    : ""}
                </Typography.Paragraph>
              </Space>
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.CURRENT_HEALTH_STATUS
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                2. Bệnh lý hiện tại:
              </Typography.Title>
              <Typography.Paragraph
                // key={index}
                className="m0-p0 txt-indent__60"
                type="secondary"
                strong
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {dataViewPDF?.CURRENT_HEALTH_STATUS
                  ? dataViewPDF?.CURRENT_HEALTH_STATUS
                  : ""}
              </Typography.Paragraph>
              {/* </Space> */}
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.CONCLUSION
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                3. Kết luận:
              </Typography.Title>
              <Typography.Paragraph
                className="m0-p0 txt-indent__60"
                type="secondary"
                strong
              >
                {dataViewPDF?.CONCLUSION ? dataViewPDF?.CONCLUSION : ""}
              </Typography.Paragraph>
              {/* </Space> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.SUGGESTION
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                4. Đề nghị:
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                <Typography.Paragraph
                  // key={index}
                  className="m0-p0 txt-indent__60"
                  type="secondary"
                  strong
                  style={{ whiteSpace: "pre-line" }}
                >
                  {dataViewPDF?.SUGGESTION ? dataViewPDF?.SUGGESTION : ""}
                </Typography.Paragraph>
              </Space>
              <Typography.Title level={4}>
                IV. TƯ VẤN CỦA BÁC SĨ CHUYÊN KHOA:
              </Typography.Title>
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.NEXT_EXAMINATION
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                1. Căn cứ vào kết quả khám sức khỏe. Anh/ Chị cần đi khám kiểm
                tra:
              </Typography.Title>
              <Typography.Paragraph
                className="m0-p0 txt-indent__60"
                type="secondary"
                strong
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {dataViewPDF?.NEXT_EXAMINATION
                  ? dataViewPDF?.NEXT_EXAMINATION
                  : ""}
              </Typography.Paragraph>
              {/* </Space> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.NEXT_PHENOMENON
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                2. Các biến chứng của căn bệnh nếu không đi khám kiểm tra và
                điều trị:
              </Typography.Title>
              {/* <Space direction="vertical" size={0} className="m0-p0"> */}
              {/* {current_illness.map((item, index) => (
                  <Typography.Paragraph
                    key={index}
                    className="m0-p0 txt-indent__60"
                    type="secondary"
                    strong
                  >
                    - {item}
                  </Typography.Paragraph>
                ))} */}
              <Typography.Paragraph
                // key={index}
                className="m0-p0 txt-indent__60"
                type="secondary"
                strong
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {dataViewPDF?.NEXT_PHENOMENON
                  ? dataViewPDF?.NEXT_PHENOMENON
                  : ""}
              </Typography.Paragraph>
              {/* </Space> */}
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.NEXT_CONTENT
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                3. Nội dung cần khám kiểm tra, điều trị đối với căn bệnh:
              </Typography.Title>
              <Typography.Paragraph
                className="m0-p0 txt-indent__60"
                type="secondary"
                strong
              >
                {dataViewPDF?.NEXT_CONTENT ? dataViewPDF?.NEXT_CONTENT : ""}
              </Typography.Paragraph>
              {/* </Space> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.NEXT_SUGGESTION
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                4. Chế độ phòng bệnh, phòng biến chứng :
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                <Typography.Paragraph
                  // key={index}
                  className="m0-p0 txt-indent__60"
                  type="secondary"
                  strong
                  style={{ whiteSpace: "pre-line" }}
                >
                  {dataViewPDF?.NEXT_SUGGESTION
                    ? dataViewPDF?.NEXT_SUGGESTION
                    : ""}
                </Typography.Paragraph>
              </Space>
            </Space>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={12} push={3}>
          <Button type="primary">Quay lại</Button>
        </Col>
        <Col span={12} push={7}>
          <Button type="primary" onClick={handleDownloadPDF}>
            Tải file PDF
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default PeriodicMedicalExaminationDetails
