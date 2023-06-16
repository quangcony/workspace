import { Button, Col, Descriptions, Row, Space, Typography } from "antd";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { generalSettingState } from "../../../recoil/atom/generalSettingState";
import { useGeneralSetting } from "../../../hooks/generalSettings";
import { formatDate } from "../../../common";
import moment from "moment";

const InputMedicalExaminationDetails = ({ onCancel, dataViewPDF }) => {
  const printRef = useRef();
  const useStyle = {
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
  };

  const { getAllGeneralSettings } = useGeneralSetting();
  const [generalSettings, setGeneralSettings] =
    useRecoilState(generalSettingState);

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 1.5,
    });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "px", "a4");

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = Math.floor(
      (imgProperties.height * pdfWidth) / imgProperties.width
    );

    pdf.addImage(data, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.setFontSize(8);
    pdf.setTextColor("Gray");
    pdf.text("page_01", 45, pdfHeight + 140, {
      baseline: "bottom",
      align: "right",
    });
    const pdfName = dataViewPDF.CD
      ? dataViewPDF?.CD +
        "_" +
        dataViewPDF?.FIRST_NAME +
        " " +
        dataViewPDF?.LAST_NAME +
        "_" +
        dataViewPDF?.Department?.CD +
        "_KSKTD.pdf"
      : dataViewPDF?.FIRST_NAME +
        " " +
        dataViewPDF?.LAST_NAME +
        "_" +
        dataViewPDF?.Department?.CD +
        "_KSKTD.pdf";

    console.log("pdfName: ", pdfName);
    pdf.save(pdfName);
  };

  return (
    <>
      <div ref={printRef}>
        <Row>
          <Col span={22} offset={1}>
            <Space style={useStyle.setCenter} wrap className="title">
              <Typography.Title level={3}>
                KẾT QUẢ KHÁM SỨC KHỎE ĐẦU VÀO
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
                    <Space style={{ padding: 0 }}>
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
                        {dataViewPDF
                          ? dataViewPDF?.FIRST_NAME +
                            " " +
                            dataViewPDF?.LAST_NAME
                          : ""}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        PHÒNG BAN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.DEPARTMENT_NAME
                          ? dataViewPDF?.DEPARTMENT_NAME
                          : ""}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        NGÀY SINH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.YOB
                          ? dataViewPDF?.YOB
                          : dataViewPDF?.BOD
                          ? moment(dataViewPDF?.BOD).format(formatDate.Type)
                          : ""}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        BỘ PHẬN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.Division?.DIVISION_NAME}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
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
                        {dataViewPDF?.Gender?.NAME}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        ĐƠN VỊ:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.UNIT_NAME}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        PHÂN LOẠI SỨC KHỎE:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.Physical_Classification?.NAME}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 100 }}
                      >
                        CẤP BẬC:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.Position?.POSITION_NAME}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item>
                <Row>
                  <Col span={24}>
                    <Space style={{ padding: 0 }}>
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{ width: 200 }}
                      >
                        NGÀY KHÁM:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.PHYSICAL_DATE
                          ? moment(dataViewPDF?.PHYSICAL_DATE).format(
                              formatDate.Type
                            )
                          : ""}
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
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(0, 0, 0, 0.45)",
                borderRight: "none",
                width: 80,
                padding: 4,
              }}
              column={4}
              size="small"
            >
              <Descriptions.Item label="Chiều cao:">
                {dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                  ? dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                  : ""}
              </Descriptions.Item>
              <Descriptions.Item label="m"></Descriptions.Item>
              <Descriptions.Item label="Cân nặng:">
                {
                  dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT
                    ? dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT
                    : ""
                  // : 45.7
                }
              </Descriptions.Item>
              <Descriptions.Item label="kg"></Descriptions.Item>
              <Descriptions.Item label="Huyết áp:">
                {
                  dataViewPDF
                    ? dataViewPDF?.Physical_Details[0]?.Blood_Pressures[0]
                        ?.VALUE
                    : ""
                  // : 130 / 70
                }
              </Descriptions.Item>
              <Descriptions.Item label="mmHg"></Descriptions.Item>
              <Descriptions.Item label="Mạch:">
                {
                  dataViewPDF?.Physical_Details[0]?.BLOOD_VESSEL
                    ? dataViewPDF?.Physical_Details[0]?.BLOOD_VESSEL
                    : ""
                  // : 130 / 70
                }
              </Descriptions.Item>
              <Descriptions.Item label="lần/phút"></Descriptions.Item>
            </Descriptions>

            <Space className="title">
              <Typography.Title level={4}>
                II. TÓM TẮT KẾT QUẢ KHÁM
              </Typography.Title>
            </Space>

            <Descriptions
              bordered
              column={1}
              size="small"
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
                borderRight: "none",

                width: "70%",
                color: "rgba(0, 0, 0, 0.45)",
                padding: 4,
              }}
            >
              <Descriptions.Item
                label="NỘI DUNG KHÁM"
                labelStyle={{
                  fontWeight: 900,
                  textAlign: "center",
                  padding: "16px 0",
                }}
                contentStyle={{
                  fontWeight: 900,
                  textAlign: "center",
                  padding: "16px 0",
                  color: "black",
                }}
              >
                KẾT QUẢ KHÁM VÀ KẾT LUẬN
              </Descriptions.Item>
              <Descriptions.Item label="Nội khoa">
                {dataViewPDF?.Clinical_Details[0]?.INTERNAL_MEDICINE_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Ngoại khoa">
                {dataViewPDF?.Clinical_Details[0]?.SURGERY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Mắt">
                {dataViewPDF?.Clinical_Details[0]?.OPHTHALMOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Tai-Mũi-Họng">
                {dataViewPDF?.Clinical_Details[0]?.OTORHINOLARYNGOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Răng-Hàm-Mặt">
                {dataViewPDF?.Clinical_Details[0]?.DENTAL_DEPARTMENT_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Da liễu">
                {dataViewPDF?.Clinical_Details[0]?.DERMATOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Sản Phụ khoa">
                {dataViewPDF?.Clinical_Details[0]?.GYNECOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Siêu âm ">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {
                    dataViewPDF?.Preclinical_Details[0]
                      ?.OVERAL_ULTRA_SOUND_RESULT
                  }
                </Typography.Paragraph>
                {/* <Typography.Paragraph className="m0-p0" type="secondary">
                  → {"Gan nhiễm mỡ cấp độ 1"}
                </Typography.Paragraph> */}
              </Descriptions.Item>
              <Descriptions.Item label="Xquang">
                {dataViewPDF?.Preclinical_Details[0]?.XRAY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item label="Công thức máu">
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <div style={useStyle.setSpaceBetween}>
                      <Typography.Text>- Hồng cầu/RBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.RBC_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSettings?.RBC_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <div style={useStyle.setSpaceBetween}>
                      <Typography.Text>- Bạch cầu/WBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.WBC_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSettings?.WBC_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <div style={useStyle.setSpaceBetween}>
                      <Typography.Text>- Tiểu cầu/PLT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.PLT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSettings?.PLT_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Đường huyết">
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <div style={useStyle.setSpaceBetween}>
                      <Typography.Text>Glucose</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Glucoses[0]
                            ?.GLUCOSE_HUNGRY
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSettings?.GLUCOSE_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Chức năng thận">
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <div style={useStyle.setSpaceBetween}>
                      <Typography.Text>Urea:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Ure_Creatines[0]
                            ?.UREA_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSettings?.UREA_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <div style={useStyle.setSpaceBetween}>
                      <Typography.Text>Creatine:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Ure_Creatines[0]
                            ?.CREATINE_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSettings?.CREATINE_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Men gan">
                <Row gutter={[8, 0]}>
                  <Col span={12}>
                    <div style={useStyle.setSpaceBetween}>
                      <Typography.Text>SGOT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Liver_Enzymes[0]
                            ?.SGOT_AST_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSettings?.SGOT_AST_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                  <Col span={12}>
                    <div style={useStyle.setSpaceBetween}>
                      <Typography.Text>SGPT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Liver_Enzymes[0]
                            ?.SGPT_ALT_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>
                      {generalSettings?.SGPT_ALT_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Tổng phân tích nước tiểu">
                {dataViewPDF?.Preclinical_Details[0]?.URINALYSIS_RESULT}
              </Descriptions.Item>
            </Descriptions>

            <Space className="title">
              <Typography.Title level={4}>
                III. KẾT LUẬN CỦA BÁC SĨ CHUYÊN KHOA:
              </Typography.Title>
            </Space>

            <Typography.Paragraph
              strong
              style={{ fontSize: 16, padding: "0 0 24px 30px" }}
            >
              {dataViewPDF?.Physical_Exam_Results[0]?.GENERAL_RESULT}
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={12} push={3}>
          <Button type="primary" onClick={onCancel}>
            Quay lại
          </Button>
        </Col>
        <Col span={12} push={4}>
          <Button type="primary" onClick={handleDownloadPDF}>
            Tải file PDF
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default InputMedicalExaminationDetails;
