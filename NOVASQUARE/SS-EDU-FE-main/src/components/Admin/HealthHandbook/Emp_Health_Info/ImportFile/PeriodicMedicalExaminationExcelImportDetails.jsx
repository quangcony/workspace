import { Button, Col, Descriptions, Row, Space, Typography } from "antd";
// import React, { useState, useRef, useEffect } from "react";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import clinicalDefaultApi from "../../../../../api/ClinicalDefaultApi";
import preClinicalDefaultApi from "../../../../../api/preClinicalDefaultApi";
import { formatDate } from "../../../../../common";
import moment from "moment";
import { Title } from "@mui/icons-material";

const PeriodicMedicalExaminationExcelImportDetails = ({
  title,
  onCancel,
  dataViewPDF,
}) => {
  // const printPage1Ref = useRef();
  // const printPage2Ref = useRef();
  // const [clinicRatings, setClinicRatings] = useState([]);
  // const [preClinicRatings, setPreClinicRatings] = useState([]);
  // const [preClinicRatingHasChildren, setPreClinicRatingHasChildren] = useState([]);
  // const fetchClinicRatings = async () => {
  //   try {
  //     let res = await clinicalDefaultApi.getAllClinicalDefaults();
  //     // console.log("clinicRatings: ", res.data)
  //     if (res.data?.elements?.length > 0) {
  //       const finalRatings = [];
  //       res.data?.elements?.forEach((e) => {
  //         finalRatings.push(e);
  //         //will empty cell in to the table after rendering
  //         finalRatings.push({
  //           Medical_Disease: {
  //             NAME: "empty",
  //           },
  //         });
  //       });
  //       setClinicRatings(finalRatings);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchClinicRatings();
  // }, []);

  // const fetchPreClinicRatings = async () => {
  //   try {
  //     let res = await preClinicalDefaultApi.getAllPreClinicalDefaults();
  //     // console.log("clinicRatings: ", res.data)
  //     if (res.data?.elements?.length > 0) {
  //       const preRatings = [];
  //       // const preRatingHasChildren = []
  //       res.data?.elements?.forEach((e) => {
  //         // if (e?.Medical_Disease?.Medical_Disease_Units?.length > 0) {
  //         //   preRatingHasChildren.push(e)
  //         // } else {
  //         preRatings.push(e);
  //         //will empty cell in to the table after rendering
  //         preRatings.push({
  //           Medical_Disease: {
  //             NAME: "empty",
  //           },
  //         });
  //         // }
  //       });
  //       console.log("preRatings: ", preRatings);
  //       // console.log("preRatingHasChildren: ", preRatingHasChildren)
  //       setPreClinicRatings(preRatings);
  //       // setPreClinicRatingHasChildren(preRatingHasChildren)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchPreClinicRatings();
  // }, []);

  const useStyles = {
    setCenter: {
      display: "flex",
      justifyContent: "center",
      alignItem: "center",
      marginBottom: 40,
      marginTop: 40,
    },
    setSpaceBetween: {
      display: "flex",
      justifyContent: "space-between",
      alignItem: "center",
    },
    textIndent: {
      textIndent: 30,
    },
    textResult: {
      whiteSpace: "pre-line",
      paddingLeft: 50,
    },
    normalUnitStyles: {
      borderRight: "none",
      verticalAlign: "top",
      color: "black",
      textAlign: "center",
    },
  };

  // const handleDownloadPDF = async () => {
  //   const canvasPage1 = await html2canvas(printPage1Ref.current, {
  //     scale: 1.5,
  //   });
  //   const canvasPage2 = await html2canvas(printPage2Ref.current, {
  //     scale: 1.5,
  //   });

  //   const dataPage1 = canvasPage1.toDataURL("image/png");
  //   const dataPage2 = canvasPage2.toDataURL("image/png");

  //   const pdf = new jsPDF("portrait", "px", "a4");

  //   const imgProperties = pdf.getImageProperties(dataPage1);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = Math.floor(
  //     (imgProperties.height * pdfWidth) / imgProperties.width
  //   );

  //   pdf.addImage(dataPage1, "PNG", 0, 10, pdfWidth, pdfHeight);
  //   pdf.setFontSize(8);
  //   pdf.setTextColor("Gray");
  //   pdf.text("page_01", 45, pdfHeight + 90, {
  //     baseline: "bottom",
  //     align: "right",
  //   });

  //   pdf.addPage();
  //   pdf.addImage(dataPage2, "PNG", 0, 10, pdfWidth, pdfHeight);
  //   pdf.text("page_02", 45, pdfHeight + 90, {
  //     baseline: "bottom",
  //     align: "right",
  //   });

  //   pdf.save("kqkskdk.pdf");
  // };
  return (
    <>
      <div
      //  ref={printPage1Ref}
      >
        <Row>
          <Col span={22} offset={1}>
            <Space wrap style={useStyles.setCenter} className="title">
              <Typography.Title level={3}>
                {/* KẾT QUẢ KHÁM SỨC KHỎE ĐỊNH KỲ */}
                {title}
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
                        style={{
                          width: 200,
                          // color:
                          //   dataViewPDF?.FIRST_NAME && dataViewPDF?.LAST_NAME
                          //     ? ""
                          //     : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        HỌ VÀ TÊN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        style={{
                          width: 200,
                        }}
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.FIRST_NAME && dataViewPDF?.LAST_NAME
                          ? dataViewPDF?.LAST_NAME +
                            " " +
                            dataViewPDF?.FIRST_NAME
                          : ""}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{
                          width: 100,
                          // color: dataViewPDF?.RECORD_CD
                          //   ? ""
                          //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        SỐ HỒ SƠ:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.RECORD_CD ? dataViewPDF?.RECORD_CD : ""}
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
                        style={{
                          width: 200,
                          // color: dataViewPDF?.Gender
                          //   ? ""
                          //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        GIỚI TÍNH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.Gender}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{
                          width: 100,
                          // color:
                          //   dataViewPDF?.DOB || dataViewPDF?.BOD
                          //     ? ""
                          //     : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        NGÀY SINH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.DOB
                          ? moment(dataViewPDF?.DOB, "DD/MM/YYYY").format(
                              formatDate.Type
                            )
                          : ""}
                        {/* {dataViewPDF?.DOB
                          ? moment(dataViewPDF?.DOB).format(formatDate.Type)
                          : ""} */}
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
                        style={{
                          width: 200,
                          // color: dataViewPDF?.EMPLOYEE_CD
                          //   ? ""
                          //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        MÃ NHÂN VIÊN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.EMPLOYEE_CD}
                      </Typography.Paragraph>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space className="m0-p0">
                      <Typography.Paragraph
                        className="fz16"
                        strong
                        style={{
                          width: 100,
                          // color: dataViewPDF?.DIVISION_NAME
                          //   ? ""
                          //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        BỘ PHẬN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.DIVISION_NAME}
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
                        style={{
                          width: 200,
                          // color: dataViewPDF?.BRANCH_NAME
                          //   ? ""
                          //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        CHI NHÁNH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.BRANCH_NAME}
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
              <Descriptions.Item
                style={
                  {
                    // color: dataViewPDF?.HEIGH
                    //   ? ""
                    //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }
                }
                label="Chiều cao:"
              >
                {
                  dataViewPDF?.HEIGH ? dataViewPDF?.HEIGH : ""
                  // : "1.657"
                }
              </Descriptions.Item>
              <Descriptions.Item label="m"></Descriptions.Item>
              <Descriptions.Item
                style={
                  {
                    // color: dataViewPDF?.WEIGHT
                    //   ? ""
                    //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }
                }
                label="Cân nặng:"
              >
                {
                  dataViewPDF?.WEIGHT ? dataViewPDF?.WEIGHT : ""
                  // : 45.7
                }
              </Descriptions.Item>
              <Descriptions.Item label="kg"></Descriptions.Item>
              <Descriptions.Item
                style={
                  {
                    // color: dataViewPDF?.BLOOD_PRESSURE
                    //   ? ""
                    //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }
                }
                label="Huyết áp:"
              >
                {
                  dataViewPDF?.BLOOD_PRESSURE ? dataViewPDF?.BLOOD_PRESSURE : ""
                  // : 130 / 70
                }
              </Descriptions.Item>
              <Descriptions.Item label="mmHg"></Descriptions.Item>
              <Descriptions.Item
                style={
                  {
                    // color: dataViewPDF?.BLOOD_VESSEL
                    //   ? ""
                    //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }
                }
                label="Mạch:"
              >
                {
                  dataViewPDF?.BLOOD_VESSEL ? dataViewPDF?.BLOOD_VESSEL : ""
                  // : 130 / 70
                }
              </Descriptions.Item>
              <Descriptions.Item label="lần/phút"></Descriptions.Item>
              <Descriptions.Item
                // style={{
                //   color:
                //     dataViewPDF?.WEIGHT && dataViewPDF?.HEIGH
                //       ? ""
                //       : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                // }}
                style={
                  {
                    // color: dataViewPDF?.BMI
                    //   ? ""
                    //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }
                }
                label="BMI:"
                span={2}
              >
                {
                  // dataViewPDF?.WEIGHT && dataViewPDF?.HEIGH
                  //   ? (
                  //       Math.round(
                  //         (dataViewPDF?.WEIGHT /
                  //           (dataViewPDF?.HEIGH * dataViewPDF?.HEIGH)) *
                  //           100
                  //       ) / 100
                  //     ).toFixed(2)
                  //   : ""
                  // : 45.7 / (1.657 * 1.657)
                  dataViewPDF?.BMI ? dataViewPDF?.BMI : ""
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
                padding: 4,
              }}
              contentStyle={{
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(0, 0, 0, 0.45)",
                padding: 4,
              }}
            >
              <Descriptions.Item
                label="NỘI DUNG KHÁM"
                labelStyle={{
                  width: "25%",
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
                  width: "25%",
                  fontWeight: 900,
                  textAlign: "center",
                  color: "black",
                  borderRight: "none",
                }}
              >
                CHỈ SỐ BÌNH THƯỜNG (Nếu có)
              </Descriptions.Item>
              <Descriptions.Item label="Nội khoa">
                {dataViewPDF?.INTERNAL_MEDICINE_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Ngoại khoa">
                {dataViewPDF?.SURGERY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Mắt">
                {dataViewPDF?.OPHTHALMOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Tai-Mũi-Họng">
                {dataViewPDF?.OTORHINOLARYNGOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Răng-Hàm-Mặt">
                {dataViewPDF?.DENTAL_DEPARTMENT_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Da liễu">
                {dataViewPDF?.DERMATOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Sản Phụ khoa">
                {dataViewPDF?.GYNECOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Siêu âm bụng tổng quát">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {dataViewPDF?.STOMACH_ULTRA_SOUND_DESC}
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  → {dataViewPDF?.STOMACH_ULTRA_SOUND_RESULT}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Điện tâm đồ">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {dataViewPDF?.ECG_DESC}
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  → {dataViewPDF?.ECG_RESULT}
                </Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Xquang phổi">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {dataViewPDF?.XRAY_DESC}
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  → {dataViewPDF?.XRAY_RESULT}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Tổng phân tích tế bào máu">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Bạch cầu/WBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.WBC_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.WBC_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Hồng cầu/RBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.RBC_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.RBC_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Huyết sắc tố/HGB: </Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.HGB_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.HGB_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Dung tích hồng cầu/HCT:{" "}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.HCT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.HCT_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Số lượng huyết sắc tố trung bình/MCH:{" "}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.MCH_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.MCH_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Thể tích hồng cầu/MCV:{" "}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.MCV_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.MCV_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Tiểu cầu/PLT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.PLT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.PLT_UNIT}</Typography.Text>
                  </Col>
                </Row>
                <Typography.Text type="secondary" className="m0-p0">
                  → {dataViewPDF?.BLOOD_RESULT}
                </Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Text>
                  {dataViewPDF?.WBC_MIN} - {dataViewPDF?.WBC_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {dataViewPDF?.RBC_MIN} - {dataViewPDF?.RBC_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {dataViewPDF?.HGB_MIN} - {dataViewPDF?.HGB_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {dataViewPDF?.HCT_MIN} - {dataViewPDF?.HCT_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {dataViewPDF?.MCH_MIN} - {dataViewPDF?.MCH_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {dataViewPDF?.MCV_MIN} - {dataViewPDF?.MCV_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {dataViewPDF?.PLT_MIN} - {dataViewPDF?.PLT_MAX}
                </Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item label="Đường huyết đói (Glucose)">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text></Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.GLUCOSE_HUNGRY_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.GLUCOSE_HUNGRY_UNIT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                {dataViewPDF?.GLUCOSE_HUNGRY_REFERENCE}
              </Descriptions.Item>
              <Descriptions.Item label="Chức năng thận">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Urea:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.UREA_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.UREA_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Creatine:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.CREA_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.CREA_UNIT}</Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Text>{dataViewPDF?.UREA_REFERENCE}</Typography.Text>
                <br />
                <Typography.Text>{dataViewPDF?.CREA_REFERENCE}</Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Chức năng gan">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGOT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.SGOT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.SGOT_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGPT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.SGPT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.SGPT_UNIT}</Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Paragraph>
                  {dataViewPDF?.SGOT_REFERENCE}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  {dataViewPDF?.SGPT_REFERENCE}
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Lipid máu (Bộ mỡ máu)">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Cholesterol:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.CHOLESTEROL_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.CHOLESTEROL_UNIT}
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>HDL: </Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.HDL_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.HDL_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>LDL:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.LDL_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>{dataViewPDF?.LDL_UNIT}</Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Triglyceride:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.TRIGLYCERIDE_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.TRIGLYCERIDE_UNIT}
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Text>
                  {dataViewPDF?.CHOLESTEROL_REFERENCE}
                </Typography.Text>
                <br />
                <Typography.Text>{dataViewPDF?.HDL_REFERENCE}</Typography.Text>
                <br />
                <Typography.Text>{dataViewPDF?.LDL_REFERENCE}</Typography.Text>
                <br />
                <Typography.Text>
                  {dataViewPDF?.TRIGLYCERIDE_REFERENCE}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Tổng phân tích nước tiểu">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  → {dataViewPDF?.URINALYSIS_RESULT}
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </div>
      <div
      //  ref={printPage2Ref}
      >
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
                    // color: dataViewPDF?.HEALTH_CLASSIFY
                    //   ? ""
                    //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
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
                  // color: dataViewPDF?.CURRENT_HEALTH_STATUS
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                2. Bệnh lý hiện tại:
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
                  // color: dataViewPDF?.CONCLUSION
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
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
                  // color: dataViewPDF?.SUGGESTION
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
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

              {/* ---------------------------------- */}

              <Typography.Title level={4}>
                IV. TƯ VẤN CỦA BÁC SĨ CHUYÊN KHOA:
              </Typography.Title>
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  // color: dataViewPDF?.NEXT_EXAMINATION
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                1. Căn cứ vào kết quả khám sức khỏe. Anh/ Chị cần đi khám kiểm
                tra:
              </Typography.Title>
              <Typography.Title
                type="secondary"
                level={5}
                style={{
                  ...useStyles.textResult,
                }}
              >
                {dataViewPDF?.REQUEST}
              </Typography.Title>
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                }}
              >
                2. Các biến chứng của căn bệnh nếu không đi khám kiểm tra và
                điều trị:
              </Typography.Title>
              <Typography.Title
                type="secondary"
                level={5}
                style={{
                  ...useStyles.textResult,
                }}
              >
                {dataViewPDF?.WARNING_REQUEST}
              </Typography.Title>
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                }}
              >
                3. Chế độ phòng bệnh, phòng biến chứng :
              </Typography.Title>
              <Typography.Title
                type="secondary"
                level={5}
                style={{
                  ...useStyles.textResult,
                }}
              >
                {dataViewPDF?.PREVENTION}
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                {/* {advise.map((item, index) => (
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
          <Button type="primary" onClick={onCancel}>
            Quay lại
          </Button>
        </Col>
        {/* <Col span={12} push={7}>
          <Button type="primary" onClick={handleDownloadPDF}>
            Tải file PDF
          </Button>
        </Col> */}
      </Row>
    </>
  );
};

export default PeriodicMedicalExaminationExcelImportDetails;
