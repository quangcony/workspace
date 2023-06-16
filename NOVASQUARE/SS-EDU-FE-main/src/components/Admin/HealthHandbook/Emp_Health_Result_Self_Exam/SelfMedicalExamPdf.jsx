import { Button, Col, Descriptions, Modal, Row, Space, Typography } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { formatDate } from '../../../../common';

const SelfMedicalExamPdf = ({ onCancel, isOpen, employee, physicalExam }) => {
    const printRef = useRef();
    const [clinicalDetail, setClinicalDetail] = useState();
    const [preclinicalDetail, setPreclinicalDetail] = useState();

    useEffect(() => {
        if (physicalExam) {
            setClinicalDetail(physicalExam?.Clinical_Details[0]);
            setPreclinicalDetail(physicalExam?.Preclinical_Details[0]);
        }
    }, [physicalExam])

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
        const element = printRef.current;
        const canvas = await html2canvas(element, {
            scale: 2,
        });
        const data = canvas.toDataURL('image/png')
        const pdf = new jsPDF('portrait', 'px', 'a4');

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = Math.floor((imgProperties.height * pdfWidth) / imgProperties.width);

        pdf.addImage(data, 'PNG', 0, 10, pdfWidth, pdfHeight);

        const nameFilePDF = employee?.CD
            ? employee?.CD.trim() +
            "_" +
            employee?.User?.FIRST_NAME +
            " " +
            employee?.User?.LAST_NAME +
            "_" +
            employee?.Department?.DEPARTMENT_NAME +
            "_" +
            `${physicalExam.TYPE === 2 ? 'KSKTK' : 'KSKDB'}`
            : employee?.User?.FIRST_NAME +
            " " +
            employee?.User?.LAST_NAME +
            "_" +
            employee?.Department?.DEPARTMENT_NAME +
            "_" +
            `${physicalExam.TYPE === 2 ? 'KSKTK' : 'KSKDB'}`;

        pdf.save(`${nameFilePDF}.pdf`);
        onCancel();
    }

    const handleCancel = () => {
        onCancel();
    }

    return (
        <>
            <Modal
                open={isOpen}
                onCancel={handleCancel}
                width={1250}
                centered
                footer={false}
                style={{ overflowX: "hidden", top: 20 }}
            >
                <div ref={printRef}>
                    <Row gutter={[10, 32]}>
                        <Col span={22} offset={1}>
                            <Space style={useStyles.setCenter} wrap >
                                <Typography.Title level={3}>{physicalExam?.CONTENT.toUpperCase()}</Typography.Title>
                            </Space>
                        </Col>
                        <Col span={22} offset={1}>
                            <Descriptions
                                bordered
                                column={1}
                                size='middle'
                                labelStyle={{ width: 0 }}
                                contentStyle={{ width: '100%', padding: '5px 2px' }}
                            >
                                <Descriptions.Item>
                                    <Row>
                                        <Col span={12}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>
                                                    HÌNH THỨC KHÁM:
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' strong>
                                                    {physicalExam?.TYPE === 7 ? "ĐẶC BIỆT" : "TỰ KHÁM"}
                                                </Typography.Paragraph>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Row>
                                        <Col span={12}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>
                                                    MÃ SỐ NHÂN VIÊN:
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {employee?.CD}
                                                </Typography.Paragraph>
                                            </Space>
                                        </Col>
                                        <Col span={12}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>
                                                    HỌ VÀ TÊN:
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {employee?.User?.FIRST_NAME + " " + employee?.User?.LAST_NAME}
                                                </Typography.Paragraph>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Row>
                                        <Col span={12}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>
                                                    GIỚI TÍNH:
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {employee?.User?.Gender?.NAME}
                                                </Typography.Paragraph>
                                            </Space>
                                        </Col>
                                        <Col span={12}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>
                                                    NGÀY SINH:
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {moment(new Date(employee?.User?.BOD)).format(formatDate.Type)}
                                                </Typography.Paragraph>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                                <Descriptions.Item>
                                    <Row>
                                        <Col span={12}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>
                                                    BỘ PHẬN:
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {employee?.Division?.DIVISION_NAME}
                                                </Typography.Paragraph>
                                            </Space>
                                        </Col>
                                        <Col span={12}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>
                                                    CHI NHÁNH:
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {employee?.Workplace?.BRANCH_NAME}
                                                </Typography.Paragraph>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={22} offset={1}>
                            <Space>
                                <Typography.Title level={4}>I. KHÁM THỂ LỰC</Typography.Title>
                            </Space>
                        </Col>
                        <Col span={22} offset={1}>
                            <Descriptions
                                bordered
                                labelStyle={{ width: 0 }}
                                contentStyle={{ width: '100%', padding: '5px 2px' }}
                                column={1}
                                size='middle'
                            >
                                <Descriptions.Item>
                                    <Row justify="space-between">
                                        <Col span={7}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 150 }}>Chiều cao:</Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {physicalExam?.Physical_Details[0]?.PERSONAL_HEIGH}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' strong>m</Typography.Paragraph>
                                            </Space>
                                        </Col>
                                        <Col span={7}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>Cân nặng:</Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {physicalExam?.Physical_Details[0]?.PERSONAL_WEIGHT}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' strong>kg</Typography.Paragraph>
                                            </Space>
                                        </Col>
                                        <Col span={4}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 50 }}>BMI:</Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {physicalExam?.Physical_Details[0]?.BMI_INDEX}
                                                </Typography.Paragraph>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                                <Descriptions.Item >
                                    <Row justify="space-between">
                                        <Col span={7}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 150 }}>Huyết áp:</Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {physicalExam?.Physical_Details[0]?.Blood_Pressures[0]?.VALUE}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' strong>mmHg</Typography.Paragraph>
                                            </Space>
                                        </Col>
                                        <Col span={7}>
                                            <Space style={{ padding: 0 }}>
                                                <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>Mạch:</Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' type='secondary' strong>
                                                    {physicalExam?.Physical_Details[0]?.BLOOD_VESSEL}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className='fz16' strong>lần/phút</Typography.Paragraph>
                                            </Space>
                                        </Col>
                                        <Col span={4}>
                                        </Col>
                                    </Row>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={22} offset={1}>
                            <Space>
                                <Typography.Title level={4}>II. KHÁM CHUYÊN KHOA</Typography.Title>
                            </Space>
                        </Col>
                        <Col span={22} offset={1}>
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
                                {
                                    clinicalDetail?.Clinical_Detail_User_Addeds?.map(item => (
                                        <>
                                            <Descriptions.Item label={item.NAME} key={item.id}>
                                                {item.RESULT}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                style={{ borderRight: "none" }}
                                            ></Descriptions.Item>
                                        </>
                                    ))
                                }
                                {
                                    !preclinicalDetail?.STOMACH_ULTRA_SOUND_DESC ? '' :
                                        <>
                                            <Descriptions.Item label="Siêu âm bụng tổng quát">
                                                <Typography.Paragraph className="m0-p0" type="secondary">
                                                    {preclinicalDetail?.STOMACH_ULTRA_SOUND_DESC}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className="m0-p0" type="secondary">
                                                    → {preclinicalDetail?.STOMACH_ULTRA_SOUND_RESULT}
                                                </Typography.Paragraph>
                                            </Descriptions.Item>
                                            <Descriptions.Item style={{ borderRight: "none" }}></Descriptions.Item>
                                        </>
                                }
                                {
                                    !preclinicalDetail?.ECG_DESC ? '' :
                                        <>
                                            <Descriptions.Item label="Điện tâm đồ">
                                                {preclinicalDetail?.ECG_DESC}, {preclinicalDetail?.ECG_RESULT}
                                            </Descriptions.Item>
                                            <Descriptions.Item style={{ borderRight: "none" }}></Descriptions.Item>
                                        </>
                                }
                                {
                                    !preclinicalDetail?.XRAY_DESC ? '' :
                                        <>
                                            <Descriptions.Item label="Xquang phổi">
                                                {preclinicalDetail?.XRAY_DESC}, {preclinicalDetail?.XRAY_RESULT}
                                            </Descriptions.Item>
                                            <Descriptions.Item style={{ borderRight: "none" }}></Descriptions.Item>
                                        </>
                                }
                                {
                                    (!preclinicalDetail?.WBC_RESULT || !preclinicalDetail?.RBC_RESULT ||
                                        !preclinicalDetail?.HGB_RESULT || !preclinicalDetail?.HCT_RESULT ||
                                        !preclinicalDetail?.MCH_RESULT || !preclinicalDetail?.MCV_RESULT ||
                                        !preclinicalDetail?.PLT_RESULT) ? '' :
                                        <>
                                            <Descriptions.Item label="Tổng phân tích tế bào máu">
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>- Bạch cầu/WBC: </Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.WBC_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>{preclinicalDetail?.WBC_UNIT_DEFAULT}</Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>- Hồng cầu/RBC: </Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.RBC_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>{preclinicalDetail?.RBC_UNIT_DEFAULT}</Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>- Huyết sắc tố/HGB: </Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.HGB_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>{preclinicalDetail?.HGB_UNIT_DEFAULT}</Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>- Dung tích hồng cầu/HCT: </Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.HCT_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>{preclinicalDetail?.HCT_UNIT_DEFAULT}</Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>- Số lượng huyết sắc tố trung bình/MCH: </Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.MCH_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>{preclinicalDetail?.MCH_UNIT_DEFAULT}</Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>- Thể tích hồng cầu/MCV: </Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.MCV_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>{preclinicalDetail?.MCV_UNIT_DEFAULT}</Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>- Tiểu cầu/PLT:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.PLT_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>{preclinicalDetail?.PLT_UNIT_DEFAULT}</Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Typography.Text type="secondary" className="m0-p0">
                                                    → {preclinicalDetail?.BLOOD_RESULT}
                                                </Typography.Text>
                                            </Descriptions.Item>
                                            <Descriptions.Item style={useStyles.normalUnitStyles}>
                                                <Typography.Paragraph >
                                                    {preclinicalDetail?.WBC_MIN} - {preclinicalDetail?.WBC_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph >
                                                    {preclinicalDetail?.RBC_MIN} - {preclinicalDetail?.RBC_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph >
                                                    {preclinicalDetail?.HGB_MIN} - {preclinicalDetail?.HGB_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph >
                                                    {preclinicalDetail?.HCT_MIN} - {preclinicalDetail?.HCT_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph >
                                                    {preclinicalDetail?.MCH_MIN} - {preclinicalDetail?.MCH_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph >
                                                    {preclinicalDetail?.MCV_MIN} - {preclinicalDetail?.MCV_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph >
                                                    {preclinicalDetail?.PLT_MIN} - {preclinicalDetail?.PLT_MAX}
                                                </Typography.Paragraph>
                                            </Descriptions.Item>
                                        </>
                                }
                                {
                                    !preclinicalDetail?.Glucoses.length ? '' :
                                        <>
                                            <Descriptions.Item label="Đường huyết đói (Glucose)">
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text></Typography.Text>
                                                            <Typography.Text type="secondary">{preclinicalDetail?.Glucoses[0]?.GLUCOSE_HUNGRY}</Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>{preclinicalDetail?.Glucoses[0]?.DEFAULT_UNIT}</Typography.Text>
                                                    </Col>
                                                </Row>
                                            </Descriptions.Item>
                                            <Descriptions.Item style={useStyles.normalUnitStyles}>
                                                <Typography.Paragraph >
                                                    {preclinicalDetail?.Glucoses[0]?.GLUCOSE_HUNGRY_REFERENCE_MIN} - {preclinicalDetail?.Glucoses[0]?.GLUCOSE_HUNGRY_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                            </Descriptions.Item>
                                        </>
                                }
                                {
                                    !preclinicalDetail?.Ure_Creatines.length ? '' :
                                        <>
                                            <Descriptions.Item label="Chức năng thận">
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>Urea:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.Ure_Creatines[0]?.UREA_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>
                                                            {preclinicalDetail?.Ure_Creatines[0]?.UREA_DEFAULT_UNIT}
                                                        </Typography.Text>
                                                    </Col>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>Creatine:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.Ure_Creatines[0]?.CREATINE_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>
                                                            {preclinicalDetail?.Ure_Creatines[0]?.CREATINE_DEFAULT_UNIT}
                                                        </Typography.Text>
                                                    </Col>
                                                </Row>
                                            </Descriptions.Item>
                                            <Descriptions.Item style={useStyles.normalUnitStyles}>
                                                <Typography.Paragraph>
                                                    {preclinicalDetail?.Ure_Creatines[0]?.UREA_REFERENCE_MIN} - {preclinicalDetail?.Ure_Creatines[0]?.UREA_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    {preclinicalDetail?.Ure_Creatines[0]?.CREATINE_REFERENCE_MIN} - {preclinicalDetail?.Ure_Creatines[0]?.CREATINE_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                            </Descriptions.Item>
                                        </>
                                }
                                {
                                    !preclinicalDetail?.Liver_Enzymes.length ? '' :
                                        <>
                                            <Descriptions.Item label="Chức năng gan">
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>SGOT:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.Liver_Enzymes[0].SGOT_AST_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>
                                                            {preclinicalDetail?.Liver_Enzymes[0].SGOT_AST_DEFAULT_UNIT}
                                                        </Typography.Text>
                                                    </Col>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>SGPT:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.Liver_Enzymes[0].SGPT_ALT_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>
                                                            {preclinicalDetail?.Liver_Enzymes[0].SGPT_ALT_DEFAULT_UNIT}
                                                        </Typography.Text>
                                                    </Col>
                                                </Row>
                                            </Descriptions.Item>
                                            <Descriptions.Item style={useStyles.normalUnitStyles}>
                                                <Typography.Paragraph>
                                                    {preclinicalDetail?.Liver_Enzymes[0]?.SGOT_AST_REFERENCE_MIN} - {preclinicalDetail?.Liver_Enzymes[0]?.SGOT_AST_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    {preclinicalDetail?.Liver_Enzymes[0]?.SGPT_ALT_REFERENCE_MIN} - {preclinicalDetail?.Liver_Enzymes[0]?.SGPT_ALT_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                            </Descriptions.Item>
                                        </>
                                }
                                {
                                    !preclinicalDetail?.Blood_Lipids.length ? '' :
                                        <>
                                            <Descriptions.Item label="Lipid máu (Bộ mỡ máu)">
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>Cholesterol:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.Blood_Lipids[0]?.CHOLESTEROL_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>
                                                            {preclinicalDetail?.Blood_Lipids[0]?.CHOLESTEROL_DEFAULT_UNIT}
                                                        </Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>HDL:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.Blood_Lipids[0]?.HDL_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>
                                                            {preclinicalDetail?.Blood_Lipids[0]?.HDL_DEFAULT_UNIT}
                                                        </Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>LDL:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.Blood_Lipids[0]?.LDL_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>
                                                            {preclinicalDetail?.Blood_Lipids[0]?.LDL_DEFAULT_UNIT}
                                                        </Typography.Text>
                                                    </Col>
                                                </Row>
                                                <Row gutter={[8, 0]}>
                                                    <Col span={18}>
                                                        <div style={useStyles.setSpaceBetween}>
                                                            <Typography.Text>Triglyceride:</Typography.Text>
                                                            <Typography.Text type="secondary">
                                                                {preclinicalDetail?.Blood_Lipids[0]?.TRIGLYCERIDE_RESULT}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6}>
                                                        <Typography.Text>
                                                            {preclinicalDetail?.Blood_Lipids[0]?.TRIGLYCERIDE_DEFAULT_UNIT}
                                                        </Typography.Text>
                                                    </Col>
                                                </Row>
                                            </Descriptions.Item>
                                            <Descriptions.Item style={useStyles.normalUnitStyles}>
                                                <Typography.Paragraph>
                                                    {preclinicalDetail?.Blood_Lipids[0]?.CHOLESTEROL_REFERENCE_MIN} - {preclinicalDetail?.Blood_Lipids[0]?.CHOLESTEROL_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    {preclinicalDetail?.Blood_Lipids[0]?.HDL_REFERENCE_MIN} - {preclinicalDetail?.Blood_Lipids[0]?.HDL_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    {preclinicalDetail?.Blood_Lipids[0]?.LDL_REFERENCE_MIN} - {preclinicalDetail?.Blood_Lipids[0]?.LDL_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                                <Typography.Paragraph>
                                                    {preclinicalDetail?.Blood_Lipids[0]?.TRIGLYCERIDE_REFERENCE_MIN} - {preclinicalDetail?.Blood_Lipids[0]?.TRIGLYCERIDE_REFERENCE_MAX}
                                                </Typography.Paragraph>
                                            </Descriptions.Item>
                                        </>
                                }
                                {
                                    !preclinicalDetail?.URINALYSIS_RESULT ? '' :
                                        <>
                                            <Descriptions.Item label="Tổng phân tích nước tiểu">
                                                <Typography.Paragraph className="m0-p0" type="secondary">
                                                    → {preclinicalDetail?.URINALYSIS_RESULT}
                                                </Typography.Paragraph>
                                            </Descriptions.Item>
                                            <Descriptions.Item style={{ borderRight: "none" }}></Descriptions.Item>
                                        </>
                                }
                            </Descriptions>
                        </Col>
                        <Col span={22} offset={1}>
                            <Space direction='vertical'>
                                <Typography.Title level={4}>III. KẾT LUẬN CỦA BÁC SĨ CHUYÊN KHOA</Typography.Title>
                                <Typography.Title level={5} style={{ paddingLeft: 20 }}>1. Bệnh lý hiện tại:</Typography.Title>
                                {
                                    physicalExam?.Health_His?.map(item => (
                                        <Typography.Paragraph
                                            key={item.id}
                                            style={{ paddingLeft: 30 }}
                                            className='fz16'
                                            strong
                                            type='secondary'
                                        >
                                            {item.DISEASE_NAME}
                                        </Typography.Paragraph>
                                    ))
                                }
                                <Typography.Title level={5} style={{ paddingLeft: 20 }}>
                                    2. Đề nghị/lời dặn của bác sĩ:
                                </Typography.Title>
                                <Typography.Paragraph
                                    style={{ paddingLeft: 30 }}
                                    className='fz16'
                                    strong
                                    type='secondary'
                                >
                                    {physicalExam?.Physical_Exam_Results[0]?.SUGGESTION}
                                </Typography.Paragraph>
                            </Space>
                        </Col>
                    </Row >
                </div>
                <Row style={{ paddingTop: 24 }}>
                    <Col span={12} push={3}>
                        <Button type="primary" onClick={handleCancel}>
                            Quay lại
                        </Button>
                    </Col>
                    <Col span={12} push={7}>
                        <Button type="primary" onClick={handleDownloadPDF}>
                            Tải file PDF
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default SelfMedicalExamPdf