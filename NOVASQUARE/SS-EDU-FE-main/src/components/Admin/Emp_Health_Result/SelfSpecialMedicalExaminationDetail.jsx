import { Button, Col, Descriptions, Row, Space, Typography } from 'antd'
import React, { useRef } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

const SelfSpecialMedicalExaminationDetail = () => {
    const printRef = useRef()
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
            scale: 1.5,
        });
        const data = canvas.toDataURL('image/png')
        const pdf = new jsPDF('portrait', 'px', 'a4');

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = Math.floor((imgProperties.height * pdfWidth) / imgProperties.width);

        pdf.addImage(data, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.setFontSize(8)
        pdf.setTextColor('Gray')
        pdf.text('page_01', 45, pdfHeight + 140, { baseline: 'bottom', align: 'right' })

        pdf.save('kskdv.pdf');
    }

    return (
        <>
            <div ref={printRef}>
                <Row gutter={[10, 32]}>
                    <Col span={22} offset={1}>
                        <Space style={useStyles.setCenter} wrap >
                            <Typography.Title level={3}>KẾT QUẢ KHÁM SỨC KHỎE TỰ KHÁM/ĐẶC BIỆT</Typography.Title>
                        </Space>
                    </Col>
                    <Col span={22} offset={1}>


                        <Descriptions
                            bordered
                            column={1}
                            size='small'
                            labelStyle={{ width: 0 }}
                            contentStyle={{ width: '100%', padding: '5px 2px' }}
                        >
                            <Descriptions.Item>
                                <Row>
                                    <Col span={24}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>LOẠI HÌNH KHÁM:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>TỰ KHÁM</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Row>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>MÃ SỐ NHÂN VIÊN:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>20221024001</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>HỌ VÀ TÊN:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>PHẠM THỊ D</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Row>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>GIỚI TÍNH:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>Nữ</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>NGÀY SINH:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>10/10/1990</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Row>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>BỘ PHẬN:</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>CHI NHÁNH:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>NHÀ MÁY BIÊN HÒA</Typography.Paragraph>
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
                            size='small'
                        >
                            <Descriptions.Item>
                                <Row justify="space-between">
                                    <Col span={7}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 150 }}>Chiều cao:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>1.580</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' strong>m</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={7}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>Cân nặng:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>49</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' strong>kg</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={4}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 50 }}>BMI:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>19.6</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item >
                                <Row justify="space-between">
                                    <Col span={7}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 150 }}>Huyết áp:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>130/70</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' strong>mmHg</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={7}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>Mạch:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>60 - 80</Typography.Paragraph>
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
                            <Typography.Title level={4}>II. TÓM TẮT KẾT QUẢ KHÁM</Typography.Title>
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

                    <Col span={22} offset={1}>
                        <Space>
                            <Typography.Title level={4}>III. KẾT LUẬN CỦA BÁC SĨ CHUYÊN KHOA:</Typography.Title>
                        </Space>
                        <Typography.Title level={5} style={useStyles.textIndent}>
                            1. Bệnh lý hiện tại:
                        </Typography.Title>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Tăng huyết áp đang điều trị
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Nhịp chậm xoang, block nhánh phải không hoàn toàn.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Nhẹ cân, thiếu máu hồng cầu nhỏ nhược sắc.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Gan nhiễm mỡ độ I, tăng men gan.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Vẹo vách ngăn mũi (P), viêm mũi xoang dị ứng.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Tật khúc xạ hai mắt.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Rối loạn chuyển hóa Lipid máu.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Nang tuyến giáp hai bên.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Nhiễm trùng tiểu.
                        </Typography.Paragraph>
                        <Typography.Title level={5} style={useStyles.textIndent}>
                            2. Đề nghị/lời dặn của bác sĩ
                        </Typography.Title>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Khám chuyên khoa: Nội tim mạch, dinh dưỡng, huyết học, tiêu hóa - gan mật, tai mũi họng,
                            mắt, nội tiết, thận - tiết niệu.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Đề nghị làm thêm xét nghiệm kiểm tra hormon tuyến giáp, nội soi mũi họng.
                        </Typography.Paragraph>
                        <Typography.Paragraph className="m0-p0 txt-indent__60" type="secondary" strong>
                            - Ăn nhạt, giảm muối. Hạn chế đồ ăn nhiều dầu mỡ, mỡ động vật, nội tạng, ăn nhiều rau xanh,
                            trái cây. Uống nhiều nước, tránh nhịn tiểu.
                        </Typography.Paragraph>
                    </Col>
                </Row >
            </div>
            <Row style={{ paddingTop: 32 }}>
                <Col span={12} push={3}><Button type='primary'>Quay lại</Button></Col>
                <Col span={12} push={4}><Button type='primary' onClick={handleDownloadPDF}>Tải file PDF</Button></Col>
            </Row>
        </>
    )
}

export default SelfSpecialMedicalExaminationDetail