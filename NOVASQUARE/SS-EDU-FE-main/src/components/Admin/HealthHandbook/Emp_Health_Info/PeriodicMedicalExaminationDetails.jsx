import { Button, Col, Descriptions, Row, Space, Typography } from "antd";
import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import clinicalDefaultApi from "../../../api/ClinicalDefaultApi";
import preClinicalDefaultApi from "../../../api/preClinicalDefaultApi";
import { formatDate } from "../../../common";
import moment from "moment";
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
];

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
];

const PeriodicMedicalExaminationDetails = ({
  onCancel,
  dataViewPDF,
  employeeInfo,
}) => {
  const printPage1Ref = useRef();
  const printPage2Ref = useRef();
  const [clinicRatings, setClinicRatings] = useState([]);
  const [preClinicRatings, setPreClinicRatings] = useState([]);
  const [preClinicRatingHasChildren, setPreClinicRatingHasChildren] = useState(
    []
  );
  console.log(employeeInfo);
  console.log(dataViewPDF);
  const optionalProps = ["Calci máu", "Đo mật độ xương", "SIEUAMTIM"];
  const fetchClinicRatings = async () => {
    try {
      let res = await clinicalDefaultApi.getAllClinicalDefaults();
      // console.log("clinicRatings: ", res.data)
      if (res.data?.elements?.length > 0) {
        const finalRatings = [];
        res.data?.elements?.forEach((e) => {
          finalRatings.push(e);
          //will empty cell in to the table after rendering
          finalRatings.push({
            Medical_Disease: {
              NAME: "empty",
            },
          });
        });
        setClinicRatings(finalRatings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchClinicRatings();
  }, []);

  const fetchPreClinicRatings = async () => {
    try {
      let res = await preClinicalDefaultApi.getAllPreClinicalDefaults();
      // console.log("clinicRatings: ", res.data)
      if (res.data?.elements?.length > 0) {
        const preRatings = [];
        // const preRatingHasChildren = []
        res.data?.elements?.forEach((e) => {
          // if (e?.Medical_Disease?.Medical_Disease_Units?.length > 0) {
          //   preRatingHasChildren.push(e)
          // } else {
          preRatings.push(e);
          //will empty cell in to the table after rendering
          preRatings.push({
            Medical_Disease: {
              NAME: "empty",
            },
          });
          // }
        });
        console.log("preRatings: ", preRatings);
        // console.log("preRatingHasChildren: ", preRatingHasChildren)
        setPreClinicRatings(preRatings);
        // setPreClinicRatingHasChildren(preRatingHasChildren)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPreClinicRatings();
  }, []);

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
    emptyTextField: {
      backgroundColor: "yellow",
      ".ant-descriptions-item-content.span": {
        backgroundColor: "yellow",
      },
    },
  };

  const handleDownloadPDF = async () => {
    const canvasPage1 = await html2canvas(printPage1Ref.current, {
      scale: 1.5,
    });
    const canvasPage2 = await html2canvas(printPage2Ref.current, {
      scale: 1.5,
    });

    const dataPage1 = canvasPage1.toDataURL("image/png");
    const dataPage2 = canvasPage2.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "px", "a4");

    const imgProperties = pdf.getImageProperties(dataPage1);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = Math.floor(
      (imgProperties.height * pdfWidth) / imgProperties.width
    );

    pdf.addImage(dataPage1, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.setFontSize(8);
    pdf.setTextColor("Gray");
    pdf.text("page_01", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    });

    pdf.addPage();
    pdf.addImage(dataPage2, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.text("page_02", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    });

    pdf.save("kqkskdk.pdf");
  };
  console.log("dataViewPDF: ", dataViewPDF);
  console.log("employee: ", employeeInfo);
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
                        style={{
                          width: 200,
                          color:
                            dataViewPDF?.FIRST_NAME && dataViewPDF?.LAST_NAME
                              ? ""
                              : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
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
                        {employeeInfo[0]?.User?.FIRST_NAME &&
                        employeeInfo[0]?.User?.LAST_NAME
                          ? employeeInfo[0]?.User?.FIRST_NAME +
                            " " +
                            employeeInfo[0]?.User?.LAST_NAME
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
                          color: dataViewPDF?.RECORD_CD
                            ? ""
                            : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        SỐ HỒ SƠ:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.id ? dataViewPDF?.id : ""}
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
                          color: dataViewPDF?.Gender?.NAME
                            ? ""
                            : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        GIỚI TÍNH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {employeeInfo[0]?.User?.Gender?.NAME}
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
                          color:
                            dataViewPDF?.YOB || dataViewPDF?.BOD
                              ? ""
                              : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        Ngày sinh:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {dataViewPDF?.YOB
                          ? dataViewPDF?.YOB
                          : employeeInfo[0]?.User?.BOD
                          ? moment(employeeInfo[0]?.User?.BOD).format(
                              formatDate.Type
                            )
                          : ""}
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
                        style={{
                          width: 200,
                          color: dataViewPDF?.Division?.DIVISION_NAME
                            ? ""
                            : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        BỘ PHẬN:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {employeeInfo[0]?.Division?.DIVISION_NAME}
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
                          color: dataViewPDF?.BRANCH_NAME
                            ? ""
                            : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                        }}
                      >
                        CHI NHÁNH:
                      </Typography.Paragraph>
                      <Typography.Paragraph
                        className="fz16"
                        type="secondary"
                        strong
                      >
                        {employeeInfo[0]?.Workplace?.BRANCH_NAME}
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
                style={{
                  color: dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Chiều cao:"
              >
                {dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                  ? dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                  : ""}
              </Descriptions.Item>
              <Descriptions.Item label="m"></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color: dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Cân nặng:"
              >
                {
                  dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT
                    ? dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT
                    : ""
                  // : 45.7
                }
              </Descriptions.Item>
              <Descriptions.Item label="kg"></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color: dataViewPDF?.Physical_Details[0]?.BLOOD_PRESSURE
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Huyết áp:"
              >
                {
                  dataViewPDF
                    ? dataViewPDF?.Physical_Details[0]?.Blood_Pressures[0]
                        ?.VALUE
                    : ""
                  // : 130 / 70
                }
              </Descriptions.Item>
              <Descriptions.Item label="mmHg"></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color: dataViewPDF?.Physical_Details[0]?.BLOOD_VESSEL
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Mạch:"
              >
                {
                  dataViewPDF?.Physical_Details[0]?.BLOOD_VESSEL
                    ? dataViewPDF?.Physical_Details[0]?.BLOOD_VESSEL
                    : ""
                  // : 130 / 70
                }
              </Descriptions.Item>
              <Descriptions.Item label="lần/phút"></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color:
                    dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT &&
                    dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                      ? ""
                      : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="BMI:"
                span={2}
              >
                {dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT &&
                dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH
                  ? (
                      Math.round(
                        (dataViewPDF?.Physical_Details[0]?.PERSONAL_WEIGHT /
                          (dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH *
                            dataViewPDF?.Physical_Details[0]?.PERSONAL_HEIGH)) *
                          100
                      ) / 100
                    ).toFixed(2)
                  : ""}
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
              {/* <Descriptions.Item
                style={{
                  color: dataViewPDF["NOIKHOA"]
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Nội khoa"
              >
                {
                  dataViewPDF["NOIKHOA"] ? dataViewPDF["NOIKHOA"] : ""
                  // : "Bình thường"
                }
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item> */}
              {/* {clinicRatings.map((item, index) => ( */}
              {/* <Descriptions.Item
                  key={index}
                  label={
                    item?.Clinical_Details[0]?.NAME !== "empty"
                      ? item?.Clinical_Details[0]?.NAME
                      : ""
                  }
                  style={{
                    color: dataViewPDF[item?.Clinical_Details[0]?.CD]
                      ? ""
                      : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                    borderRight:
                      item?.Clinical_Details[0]?.NAME === "empty" ? "none" : "",
                    whiteSpace: "pre-line",
                  }}
                >
                  {dataViewPDF[item?.Clinical_Details[0]?.CD]
                    ? dataViewPDF[item?.Clinical_Details[0]?.CD]
                    : ""}
                </Descriptions.Item> */}
              {/* ))} */}
              <Descriptions.Item label="Nội khoa">
                {dataViewPDF?.Clinical_Details[0]?.INTERNAL_MEDICINE_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Ngoại khoa">
                {dataViewPDF?.Clinical_Details[0]?.SURGERY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Mắt">
                {dataViewPDF?.Clinical_Details[0]?.OPHTHALMOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Tai-Mũi-Họng">
                {dataViewPDF?.Clinical_Details[0]?.OTORHINOLARYNGOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Răng-Hàm-Mặt">
                {dataViewPDF?.Clinical_Details[0]?.DENTAL_DEPARTMENT_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Da liễu">
                {dataViewPDF?.Clinical_Details?.[0]?.DERMATOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Sản Phụ khoa">
                {dataViewPDF?.Clinical_Details[0]?.GYNECOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Siêu âm bụng tổng quát">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {
                    dataViewPDF?.Preclinical_Details[0]
                      ?.STOMACH_ULTRA_SOUND_DESC
                  }
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  →{" "}
                  {
                    dataViewPDF?.Preclinical_Details[0]
                      ?.STOMACH_ULTRA_SOUND_RESULT
                  }
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Điện tâm đồ">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {dataViewPDF?.Preclinical_Details?.[0]?.ECG_DESC}
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  → {dataViewPDF?.Preclinical_Details?.[0]?.ECG_RESULT}
                </Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Xquang phổi">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {dataViewPDF?.Preclinical_Details?.[0]?.XRAY_DESC}
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  → {dataViewPDF?.Preclinical_Details?.[0]?.XRAY_RESULT}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              {/* START OF PRE_CLINIC RESULT */}
              {preClinicRatings.map((item, index) => (
                <Descriptions.Item
                  key={index}
                  label={
                    item.Medical_Disease?.NAME !== "empty"
                      ? optionalProps.includes(item.Medical_Disease?.CD)
                        ? item.Medical_Disease?.NAME + " (Không bắt buộc)"
                        : item.Medical_Disease?.NAME
                      : ""
                  }
                  style={{
                    color:
                      // highlight the line that are empty and required
                      dataViewPDF[item.Medical_Disease?.CD] ||
                      optionalProps.includes(item.Medical_Disease?.CD)
                        ? ""
                        : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                    borderRight:
                      item.Medical_Disease?.NAME === "empty" ? "none" : "",
                    whiteSpace: "pre-line",
                  }}
                >
                  {dataViewPDF[item.Medical_Disease?.CD]
                    ? dataViewPDF[item.Medical_Disease?.CD]
                    : ""}
                </Descriptions.Item>
              ))}
              {/* <Descriptions.Item
                style={{
                  color:
                    dataViewPDF?.INNER_SCAN?.STOMACH ||
                    dataViewPDF?.INNER_SCAN?.THYROID ||
                    dataViewPDF?.INNER_SCAN?.MAMMARY
                      ? ""
                      : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Siêu âm"
              >
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {
                    dataViewPDF?.INNER_SCAN?.STOMACH
                      ? dataViewPDF?.INNER_SCAN?.STOMACH
                      : ""
                    // : "Chủ mô echo dày, giảm âm vùng sâu, đường mật không dãn"
                  }
                </Typography.Paragraph>
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {
                    dataViewPDF?.INNER_SCAN?.THYROID
                      ? dataViewPDF?.INNER_SCAN?.THYROID
                      : ""
                    // : "Gan nhiễm mỡ cấp độ 1"
                  }
                </Typography.Paragraph>
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {dataViewPDF?.INNER_SCAN?.MAMMARY
                    ? dataViewPDF?.INNER_SCAN?.MAMMARY
                    : ""}
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color: dataViewPDF?.ECG
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Điện tâm đồ"
              >
                {
                  dataViewPDF?.ECG ? dataViewPDF?.ECG : ""
                  // : "Nhịp xoang 56 lần/ phút, Block nhánh Phải không hoàn toàn"
                }
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item
                style={{
                  color: dataViewPDF?.XRAY
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
                label="Xquang phổi"
              >
                {
                  dataViewPDF?.XRAY ? dataViewPDF?.XRAY : ""
                  // : "Bình thường"
                }
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item> */}
              <Descriptions.Item label="Tổng phân tích tế bào máu">
                {/* {blood_analysis.map((item, index) => (
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
                ))} */}
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Bạch cầu/WBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.WBC_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.Preclinical_Details[0]?.WBC_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Hồng cầu/RBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.RBC_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.Preclinical_Details[0]?.RBC_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Huyết sắc tố/HGB:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.HGB_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.Preclinical_Details[0]?.HGB_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Dung tích hồng cầu/HCT:
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.HCT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.Preclinical_Details[0]?.HCT_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Số lượng huyết sắc tố trung bình/MCH:
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.MCH_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.Preclinical_Details[0]?.MCH_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Thể tích hồng cầu/MCV:
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.MCV_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.Preclinical_Details[0]?.MCV_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Tiểu cầu/PLT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {dataViewPDF?.Preclinical_Details[0]?.PLT_RESULT}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {dataViewPDF?.Preclinical_Details[0]?.PLT_UNIT_DEFAULT}
                    </Typography.Text>
                  </Col>
                </Row>
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
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Glucoses[0]
                            ?.GLUCOSE_HUNGRY
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        dataViewPDF?.Preclinical_Details[0]?.Glucoses[0]
                          ?.DEFAULT_UNIT
                      }
                    </Typography.Text>
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
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Ure_Creatines[0]
                            ?.UREA_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        dataViewPDF?.Preclinical_Details[0]?.Ure_Creatines[0]
                          ?.UREA_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Creatine:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Ure_Creatines[0]
                            ?.CREATINE_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        dataViewPDF?.Preclinical_Details[0]?.Ure_Creatines[0]
                          ?.CREATINE_DEFAULT_UNIT
                      }
                    </Typography.Text>
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
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Liver_Enzymes[0]
                            ?.SGOT_AST_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        dataViewPDF?.Preclinical_Details[0]?.Liver_Enzymes[0]
                          ?.SGOT_AST_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGPT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          dataViewPDF?.Preclinical_Details[0]?.Liver_Enzymes[0]
                            ?.SGPT_ALT_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        dataViewPDF?.Preclinical_Details[0]?.Liver_Enzymes[0]
                          ?.SGPT_ALT_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Paragraph>5 - 40</Typography.Paragraph>
                <Typography.Paragraph>5 - 44</Typography.Paragraph>
              </Descriptions.Item>
              {/*<Descriptions.Item label="Lipid máu (Bộ mỡ máu)">
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
              ></Descriptions.Item> */}
            </Descriptions>
          </Col>
        </Row>
      </div>
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
                    color: dataViewPDF?.Physical_Exam_Results[0]
                      ?.PHYSICAL_CLASSIFY_ID
                      ? ""
                      : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }}
                >
                  1. Phân loại sức khỏe:
                </Typography.Title>
                <Typography.Paragraph type="secondary" strong className="fz16">
                  {dataViewPDF?.Physical_Exam_Results[0]?.PHYSICAL_CLASSIFY_ID
                    ? "Loại " +
                      dataViewPDF?.Physical_Exam_Results[0]
                        ?.PHYSICAL_CLASSIFY_ID
                    : ""}
                </Typography.Paragraph>
              </Space>
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.Physical_Exam_Results[0]?.COMMENT
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                2. Bệnh lý hiện tại:
              </Typography.Title>
              {dataViewPDF?.Physical_Exam_Results[0]?.Disease_Currents &&
                dataViewPDF?.Physical_Exam_Results[0]?.Disease_Currents.length >
                  0 &&
                dataViewPDF?.Physical_Exam_Results[0]?.Disease_Currents.map(
                  (item, index) => (
                    <Typography.Paragraph
                      key={index}
                      className="m0-p0 txt-indent__60"
                      type="secondary"
                      strong
                      style={{
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.DISEASE_NAME}
                    </Typography.Paragraph>
                  )
                )}
              {/* </Space> */}
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.Physical_Exam_Results[0]?.RESULT
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
                {dataViewPDF?.Physical_Exam_Results[0]?.RESULT === 0
                  ? "Đủ sức khỏe để làm việc"
                  : "Không đủ sức khỏe để làm việc"}
              </Typography.Paragraph>
              {/* </Space> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.Physical_Exam_Results[0]?.SUGGESTION
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
                  {dataViewPDF?.Physical_Exam_Results[0]?.SUGGESTION
                    ? dataViewPDF?.Physical_Exam_Results[0]?.SUGGESTION
                    : ""}
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
                  color: dataViewPDF?.Physical_Exam_Results[0]?.REQUEST
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
                {dataViewPDF?.Physical_Exam_Results[0]?.REQUEST
                  ? dataViewPDF?.Physical_Exam_Results[0]?.REQUEST
                  : ""}
              </Typography.Paragraph>
              {/* </Space> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.Physical_Exam_Results[0]?.WARNING_REQUEST
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                2. Các biến chứng của căn bệnh nếu không đi khám kiểm tra và
                điều trị:
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
                {dataViewPDF?.Physical_Exam_Results[0]?.WARNING_REQUEST
                  ? dataViewPDF?.Physical_Exam_Results[0]?.WARNING_REQUEST
                  : ""}
              </Typography.Paragraph>
              {/* <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.Physical_Exam_Results[0]?.REQUEST
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
                style={{
                  whiteSpace: "pre-line",
                }}
              >
                {dataViewPDF?.Physical_Exam_Results[0]?.REQUEST
                  ? dataViewPDF?.Physical_Exam_Results[0]?.REQUEST
                  : ""}
              </Typography.Paragraph> */}
              {/* </Space> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  color: dataViewPDF?.Physical_Exam_Results[0]?.PREVENTION
                    ? ""
                    : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                3. Chế độ phòng bệnh, phòng biến chứng :
              </Typography.Title>
              <Space direction="vertical" size={0} className="m0-p0">
                <Typography.Paragraph
                  // key={index}
                  className="m0-p0 txt-indent__60"
                  type="secondary"
                  strong
                  style={{ whiteSpace: "pre-line" }}
                >
                  {dataViewPDF?.Physical_Exam_Results[0]?.PREVENTION
                    ? dataViewPDF?.Physical_Exam_Results[0]?.PREVENTION
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
        <Col span={12} push={7}>
          <Button type="primary" onClick={handleDownloadPDF}>
            Tải file PDF
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default PeriodicMedicalExaminationDetails;
