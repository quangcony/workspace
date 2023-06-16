import { Button, Col, Descriptions, Row, Space, Typography } from "antd";
import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import clinicalDefaultApi from "../../../api/ClinicalDefaultApi";
import preClinicalDefaultApi from "../../../api/preClinicalDefaultApi";
import { useEmployee } from "../../../hooks/employee";
import { useRecoilState, useRecoilValue } from "recoil";
import { generalSettingState } from "../../../recoil/atom/generalSettingState";
import { employeeSelectState } from "../../../recoil/atom/employeeState";
import { useHealthHis } from "../../../hooks/healthHis";
import {
  physicalExamPDFState,
  physicalExamSelectState,
} from "../../../recoil/atom/physicalExamState";
import { useGeneralSetting } from "../../../hooks/generalSettings";
import {
  getPDFState,
  physicalExamOptionHardToxicState,
} from "../../../recoil/atom/physicalExamProcess";
import { isDownloadState } from "../../../recoil/atom/booleanState";
import { useSnackbar } from "notistack";
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
    paddingLeft: 30,
  },
  normalUnitStyles: {
    borderRight: "none",
    verticalAlign: "top",
    color: "black",
    textAlign: "center",
  },
  emptyTextField: {
    backgroundColor: "black",
    ".ant-descriptions-item-content.span": {
      backgroundColor: "black",
    },
  },
};
const PeriodicMedicalExaminationDetails = ({ onCancel }) => {
  useGeneralSetting();
  const { enqueueSnackbar } = useSnackbar();

  const [disease, setDisease] = useState();
  const [physicalExamSelect, setPhysicalExamSelect] = useRecoilState(
    physicalExamSelectState
  );
  const [isDownload, setIsDownload] = useRecoilState(isDownloadState);

  useEffect(() => {
    if (physicalExamSelect) {
      setDisease(
        physicalExamSelect?.Health_His.filter(
          (item) =>
            item.PHYSICAL_EXAM_RESULT_ID ===
            physicalExamSelect?.Physical_Exam_Results?.[0]?.id
        )
      );
    }
  }, [physicalExamSelect]);
  const printPage1Ref = useRef();
  const printPage2Ref = useRef();
  const [clinicRatings, setClinicRatings] = useState([]);
  const [preClinicRatings, setPreClinicRatings] = useState([]);

  const employeeSelect = useRecoilValue(employeeSelectState);
  // const { employees } = useEmployee();
  // const [employee, setEmployee] = useState(undefined);
  const generalSetting = useRecoilValue(generalSettingState);
  // useEffect(() => {
  //   if (employees.length && physicalExamSelect) {
  //     const data = employees.filter(
  //       (item) => item.USER_ID === physicalExamSelect.USER_ID
  //     );
  //     setEmployee(() => data);
  //   }
  // }, [employees, physicalExamSelect]);
  const fetchClinicRatings = async () => {
    try {
      let res = await clinicalDefaultApi.getAllClinicalDefaults();
      if (res.data?.elements?.length > 0) {
        const finalRatings = [];
        res.data?.elements?.forEach((e) => {
          finalRatings.push(e);
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

  useEffect(() => {
    if (isDownload) {
      handleDownloadPDF();
    }
  }, [isDownload]);

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
    const imgProperties2 = pdf.getImageProperties(dataPage2);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = Math.floor(
      (imgProperties.height * pdfWidth) / imgProperties.width
    );
    const pdfHeight2 = Math.floor(
      (imgProperties2.height * pdfWidth) / imgProperties2.width
    );
    pdf.addImage(dataPage1, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.setFontSize(8);
    pdf.setTextColor("Gray");
    pdf.text("page_01", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    });

    pdf.addPage();
    pdf.addImage(dataPage2, "PNG", 0, 10, pdfWidth, pdfHeight2);
    pdf.text("page_02", 45, pdfHeight + 90, {
      baseline: "bottom",
      align: "right",
    });

    const pdfName = employeeSelect.CD
      ? employeeSelect?.CD.trim() +
        "_" +
        employeeSelect?.User?.FIRST_NAME +
        " " +
        employeeSelect?.User?.LAST_NAME +
        "_" +
        employeeSelect?.Department?.CD +
        "_KSKNNDH.pdf"
      : employeeSelect?.User?.FIRST_NAME +
        " " +
        employeeSelect?.User?.LAST_NAME +
        "_" +
        employeeSelect?.Department?.CD +
        "_KSKNNDH.pdf";

    pdf.save(pdfName);
    onCancel();
    enqueueSnackbar("Tải file PDF thành công", {
      variant: "success",
    });
  };

  return (
    <>
      <div ref={printPage1Ref}>
        <Row>
          <Col span={22} offset={1}>
            <Space wrap style={useStyles.setCenter} className="title">
              <Typography.Title level={3}>
                KẾT QUẢ KHÁM SỨC KHỎE NẶNG NHỌC, ĐỘC HẠI
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
                        {employeeSelect?.User.FIRST_NAME}{" "}
                        {employeeSelect?.User.LAST_NAME}
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
                        {physicalExamSelect?.RECORD_CD
                          ? physicalExamSelect?.RECORD_CD
                          : ""}
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
                        {employeeSelect?.User?.Gender?.NAME}
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
                        {new Date(employeeSelect?.User?.BOD).getFullYear()}
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
                        {employeeSelect?.Division?.DIVISION_NAME}
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
                        {employeeSelect?.Workplace?.BRANCH_NAME}
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
              column={5}
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
                // style={{
                //   color: physicalExamSelect?.Physical_Details[0]?.PERSONAL_HEIGH
                //     ? ""
                //     : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                // }}
                label="Chiều cao :"
              >
                {physicalExamSelect?.Physical_Details?.[0]?.PERSONAL_HEIGH}
              </Descriptions.Item>
              <Descriptions.Item label="m"></Descriptions.Item>
              <Descriptions.Item label="Cân nặng:">
                {physicalExamSelect?.Physical_Details?.[0]?.PERSONAL_WEIGHT}
              </Descriptions.Item>
              <Descriptions.Item label="kg"></Descriptions.Item>
              <Descriptions.Item label="BMI:" span={2}>
                {physicalExamSelect?.Physical_Details?.[0]?.BMI_INDEX}
              </Descriptions.Item>
              <Descriptions.Item label="Huyết áp:">
                {
                  physicalExamSelect?.Physical_Details?.[0]
                    ?.Blood_Pressures?.[0]?.VALUE
                }
              </Descriptions.Item>
              <Descriptions.Item label="mmHg"></Descriptions.Item>
              <Descriptions.Item label="Mạch:">
                {physicalExamSelect?.Physical_Details?.[0]?.BLOOD_VESSEL}
              </Descriptions.Item>
              <Descriptions.Item label="Lần/ Phút"></Descriptions.Item>
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
                {
                  physicalExamSelect?.Clinical_Details?.[0]
                    ?.INTERNAL_MEDICINE_RESULT
                }
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Ngoại khoa">
                {physicalExamSelect?.Clinical_Details?.[0]?.SURGERY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Mắt">
                {
                  physicalExamSelect?.Clinical_Details?.[0]
                    ?.OPHTHALMOLOGY_RESULT
                }
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Tai-Mũi-Họng">
                {
                  physicalExamSelect?.Clinical_Details?.[0]
                    ?.OTORHINOLARYNGOLOGY_RESULT
                }
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Răng-Hàm-Mặt">
                {
                  physicalExamSelect?.Clinical_Details?.[0]
                    ?.DENTAL_DEPARTMENT_RESULT
                }
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Da liễu">
                {physicalExamSelect?.Clinical_Details?.[0]?.DERMATOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Sản Phụ khoa">
                {physicalExamSelect?.Clinical_Details?.[0]?.GYNECOLOGY_RESULT}
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Siêu âm bụng tổng quát">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {
                    physicalExamSelect?.Preclinical_Details?.[0]
                      ?.STOMACH_ULTRA_SOUND_DESC
                  }
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  →{" "}
                  {
                    physicalExamSelect?.Preclinical_Details?.[0]
                      ?.STOMACH_ULTRA_SOUND_RESULT
                  }
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Điện tâm đồ">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {physicalExamSelect?.Preclinical_Details?.[0]?.ECG_DESC}
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  → {physicalExamSelect?.Preclinical_Details?.[0]?.ECG_RESULT}
                </Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
              <Descriptions.Item label="Xquang phổi">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  {physicalExamSelect?.Preclinical_Details?.[0]?.XRAY_DESC}
                </Typography.Paragraph>
                <Typography.Text type="secondary" className="m0-p0">
                  → {physicalExamSelect?.Preclinical_Details?.[0]?.XRAY_RESULT}
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
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.WBC_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.WBC_UNIT_DEFAULT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Hồng cầu/RBC:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.RBC_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.RBC_UNIT_DEFAULT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Huyết sắc tố/HGB: </Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.HGB_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.HGB_UNIT_DEFAULT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Dung tích hồng cầu/HCT:{" "}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.HCT_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.HCT_UNIT_DEFAULT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Số lượng huyết sắc tố trung bình/MCH:{" "}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.MCH_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.MCH_UNIT_DEFAULT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>
                        - Thể tích hồng cầu/MCV:{" "}
                      </Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.MCV_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.MCV_UNIT_DEFAULT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>- Tiểu cầu/PLT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.PLT_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.PLT_UNIT_DEFAULT
                      }
                    </Typography.Text>
                  </Col>
                </Row>

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
                <Typography.Text type="secondary" className="m0-p0">
                  → {physicalExamSelect?.Preclinical_Details?.[0]?.BLOOD_RESULT}
                </Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Text>
                  {generalSetting?.WBC_MIN} - {generalSetting?.WBC_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.RBC_MIN} - {generalSetting?.RBC_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.HGB_MIN} - {generalSetting?.HGB_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.HCT_MIN} - {generalSetting?.HCT_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.MCH_MIN} - {generalSetting?.MCH_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.MCV_MIN} - {generalSetting?.MCV_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.PLT_MIN} - {generalSetting?.PLT_MAX}
                </Typography.Text>
              </Descriptions.Item>

              <Descriptions.Item label="Đường huyết đói (Glucose)">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text></Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Glucoses?.[0]?.GLUCOSE_HUNGRY
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Glucoses?.[0]?.DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                {generalSetting?.GLUCOSE_MIN} - {generalSetting?.GLUCOSE_MAX}
              </Descriptions.Item>
              <Descriptions.Item label="Chức năng thận">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Urea:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Ure_Creatines?.[0]?.UREA_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Ure_Creatines?.[0]?.UREA_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Creatine:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Ure_Creatines?.[0]?.CREATINE_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Ure_Creatines?.[0]?.CREATINE_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Text>
                  {generalSetting?.UREA_MIN} - {generalSetting?.UREA_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.CREATINE_MIN} -{" "}
                  {generalSetting?.CREATINE_MAX}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Chức năng gan">
                <Row gutter={[8, 0]}>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGOT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Liver_Enzymes?.[0]?.SGOT_AST_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Liver_Enzymes?.[0]?.SGOT_AST_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>SGPT:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Liver_Enzymes?.[0]?.SGPT_ALT_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Liver_Enzymes?.[0]?.SGPT_ALT_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Paragraph>
                  {generalSetting?.SGOT_AST_MIN} -{" "}
                  {generalSetting?.SGOT_AST_MAX}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  {generalSetting?.SGPT_ALT_MIN} -{" "}
                  {generalSetting?.SGPT_ALT_MAX}
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Lipid máu (Bộ mỡ máu)">
                {/* {blood_lipids.map((item, index) => (
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
                      <Typography.Text>Cholesterol: :</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Blood_Lipids?.[0]?.CHOLESTEROL_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Blood_Lipids?.[0]?.CHOLESTEROL_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>HDL: </Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Blood_Lipids?.[0]?.HDL_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Blood_Lipids?.[0]?.HDL_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>LDL:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Blood_Lipids?.[0]?.LDL_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Blood_Lipids?.[0]?.LDL_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                  <Col span={18}>
                    <div style={useStyles.setSpaceBetween}>
                      <Typography.Text>Triglyceride:</Typography.Text>
                      <Typography.Text type="secondary">
                        {
                          physicalExamSelect?.Preclinical_Details?.[0]
                            ?.Blood_Lipids?.[0]?.TRIGLYCERIDE_RESULT
                        }
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col span={6}>
                    <Typography.Text>
                      {
                        physicalExamSelect?.Preclinical_Details?.[0]
                          ?.Blood_Lipids?.[0]?.TRIGLYCERIDE_DEFAULT_UNIT
                      }
                    </Typography.Text>
                  </Col>
                </Row>
              </Descriptions.Item>
              <Descriptions.Item style={useStyles.normalUnitStyles}>
                <Typography.Text>
                  {generalSetting?.CHOLESTEROL_MIN} -{" "}
                  {generalSetting?.CHOLESTEROL_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.HDL_MIN} - {generalSetting?.HDL_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.LDL_MIN} - {generalSetting?.LDL_MAX}
                </Typography.Text>
                <br />
                <Typography.Text>
                  {generalSetting?.TRIGLYCERIDE_MIN} -{" "}
                  {generalSetting?.TRIGLYCERIDE_MAX}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Tổng phân tích nước tiểu">
                <Typography.Paragraph className="m0-p0" type="secondary">
                  →{" "}
                  {
                    physicalExamSelect?.Preclinical_Details?.[0]
                      ?.URINALYSIS_RESULT
                  }
                </Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item
                style={{ borderRight: "none" }}
              ></Descriptions.Item>
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
                    // color: physicalExamSelect?.HEALTH_CLASSIFY
                    //   ? ""
                    //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }}
                >
                  1. Phân loại sức khỏe:
                </Typography.Title>
                <Space className="m0-p0">
                  <Typography.Title
                    level={5}
                    style={{
                      ...useStyles.textIndent,
                    }}
                    // type="secondary"
                    // strong
                    // className="fz16"
                    // >
                    //   {physicalExamSelect?.HEALTH_CLASSIFY
                    //     ? "Loại " + physicalExamSelect?.HEALTH_CLASSIFY
                    //     : ""}
                  >
                    Loại{" "}
                  </Typography.Title>
                  <Typography.Title level={5} type="secondary">
                    {
                      physicalExamSelect?.Physical_Exam_Results?.[0]
                        ?.Physical_Classification?.DESC
                    }
                  </Typography.Title>
                </Space>
              </Space>
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  // color: physicalExamSelect?.HEALTH_CLASSIFY
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                2. Bệnh lý hiện tại:
              </Typography.Title>
              {disease &&
                disease.map((value) => (
                  <Typography.Title
                    type="secondary"
                    level={5}
                    style={{
                      ...useStyles.textResult,
                    }}
                  >
                    - {value?.DISEASE_NAME}
                  </Typography.Title>
                ))}
              <Space className="m0-p0">
                <Typography.Title
                  level={5}
                  style={{
                    ...useStyles.textIndent,
                    // color: physicalExamSelect?.HEALTH_CLASSIFY
                    //   ? ""
                    //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                  }}
                >
                  3. Kết luận:
                </Typography.Title>
                <Typography.Title
                  type="secondary"
                  level={5}
                  style={{
                    ...useStyles.textIndent,
                  }}
                >
                  {physicalExamSelect?.Physical_Exam_Results?.[0]?.RESULT === 0
                    ? "Đủ sức khỏe làm việc"
                    : physicalExamSelect?.Physical_Exam_Results?.[0]?.RESULT ===
                      1
                    ? "Không đủ sức khỏe làm việc"
                    : ""}
                </Typography.Title>
              </Space>
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  // width: "100%",

                  // color: physicalExamSelect?.HEALTH_CLASSIFY
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                4. Đề nghị:
              </Typography.Title>
              <Typography.Title
                type="secondary"
                level={5}
                style={{
                  ...useStyles.textIndent,
                }}
              >
                {physicalExamSelect?.Physical_Exam_Results?.[0]?.SUGGESTION}
              </Typography.Title>
              {/* </Space> */}
              <Typography.Title level={4}>
                IV. TƯ VẤN CỦA BÁC SĨ CHUYÊN KHOA:
              </Typography.Title>
              {/* <Space className="m0-p0"> */}
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  // color: physicalExamSelect?.HEALTH_CLASSIFY
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
                  ...useStyles.textIndent,
                  // paddingLeft: "40px",
                }}
              >
                {physicalExamSelect?.Physical_Exam_Results?.[0]?.REQUEST}
              </Typography.Title>
              {/* </Space> */}
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  // color: physicalExamSelect?.HEALTH_CLASSIFY
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                2. Các biến chứng của căn bệnh nếu không đi khám kiểm tra và
                điều trị:
              </Typography.Title>
              <Typography.Title
                type="secondary"
                level={5}
                style={{
                  ...useStyles.textIndent,
                }}
              >
                {
                  physicalExamSelect?.Physical_Exam_Results?.[0]
                    ?.WARNING_REQUEST
                }
              </Typography.Title>
              {/* </Space> */}
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  // color: physicalExamSelect?.HEALTH_CLASSIFY
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                3. Nội dung cần khám kiểm tra, điều trị đối với căn bệnh:
              </Typography.Title>
              <Typography.Title
                type="secondary"
                level={5}
                style={{
                  ...useStyles.textIndent,
                }}
              >
                Chưa có
              </Typography.Title>
              {/* </Space> */}
              {/* <Space className="m0-p0"> */}
              <Typography.Title
                level={5}
                style={{
                  ...useStyles.textIndent,
                  // color: physicalExamSelect?.HEALTH_CLASSIFY
                  //   ? ""
                  //   : `#${process.env.REACT_APP_INVALID_FIELD_COLOR}`,
                }}
              >
                4. Chế độ phòng bệnh, phòng biến chứng :
              </Typography.Title>
              <Typography.Title
                type="secondary"
                level={5}
                style={{
                  ...useStyles.textIndent,
                }}
              >
                {physicalExamSelect?.Physical_Exam_Results?.[0]?.PREVENTION}
              </Typography.Title>
              {/* </Space> */}
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
