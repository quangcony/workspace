import { Button, Col, Descriptions, Row, Space, Typography } from 'antd'
import React, { useRef } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InputMedicalExaminationDetails = () => {
    const printRef = useRef()
    const useStyle = {
        setCenter: {
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
        },
        setSpaceBetween: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItem: 'center',
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
                <Row>
                    <Col span={22} offset={1}>

                        <Space style={useStyle.setCenter} wrap className='title'>
                            <Typography.Title level={3}>KẾT QUẢ KHÁM SỨC KHỎE ĐẦU VÀO</Typography.Title>
                        </Space>

                        <Descriptions
                            bordered
                            column={1}
                            size='small'
                            labelStyle={{ width: 0 }}
                            contentStyle={{ width: '100%', padding: '5px 2px' }}
                        >
                            <Descriptions.Item>
                                <Row>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>HỌ VÀ TÊN:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>LÊ VĂN A</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>PHÒNG BAN:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>GA</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Row>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>NGÀY SINH:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>12/02/1999</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>BỘ PHẬN:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>GA</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Row>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>GIỚI TÍNH:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>LÊ VĂN A</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>ĐƠN VỊ:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>GA</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Row>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>PHÂN LOẠI SỨC KHỎE:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>LÊ VĂN A</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                    <Col span={12}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>CẤP BẬC:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>GA</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item>
                                <Row>
                                    <Col span={24}>
                                        <Space style={{ padding: 0 }}>
                                            <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>NGÀY KHÁM:</Typography.Paragraph>
                                            <Typography.Paragraph className='fz16' type='secondary' strong>LÊ VĂN A</Typography.Paragraph>
                                        </Space>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                        </Descriptions>

                        <Space className='title'>
                            <Typography.Title level={4}>I. KHÁM THỂ LỰC</Typography.Title>
                        </Space>

                        <Descriptions
                            bordered
                            labelStyle={{
                                background: 'none',
                                borderRight: 'none',
                                fontWeight: 600,
                                fontSize: '16px',
                                padding: '2px 4px',
                            }}
                            contentStyle={{
                                fontWeight: 600,
                                fontSize: '16px',
                                color: 'rgba(0, 0, 0, 0.45)',
                                borderRight: 'none',
                                width: 80,
                                padding: 4,
                            }}
                            column={4}
                            size='small'
                        >
                            <Descriptions.Item label='Chiều cao:'>1.657</Descriptions.Item>
                            <Descriptions.Item label='m'></Descriptions.Item>
                            <Descriptions.Item label='Cân nặng:'>45.7</Descriptions.Item>
                            <Descriptions.Item label='kg'></Descriptions.Item>
                            <Descriptions.Item label='Huyết áp:'>130/70</Descriptions.Item>
                            <Descriptions.Item label='mmHg'></Descriptions.Item>
                            <Descriptions.Item label='Mạch:'>89</Descriptions.Item>
                            <Descriptions.Item label='lần/phút'></Descriptions.Item>
                        </Descriptions>

                        <Space className='title'>
                            <Typography.Title level={4}>II. TÓM TẮT KẾT QUẢ KHÁM</Typography.Title>
                        </Space>

                        <Descriptions
                            bordered
                            column={1}
                            size='small'
                            labelStyle={{
                                background: 'none',
                                fontWeight: 600,
                                fontSize: '16px',

                                verticalAlign: 'top',
                                borderRight: '1px solid black',
                                padding: 4,
                            }}
                            contentStyle={{
                                fontWeight: 600,
                                fontSize: '16px',
                                borderRight: 'none',

                                width: '70%',
                                color: 'rgba(0, 0, 0, 0.45)',
                                padding: 4,
                            }}
                        >
                            <Descriptions.Item
                                label='NỘI DUNG KHÁM'
                                labelStyle={{
                                    fontWeight: 900,
                                    textAlign: 'center',
                                    padding: '16px 0'
                                }}
                                contentStyle={{
                                    fontWeight: 900,
                                    textAlign: 'center',
                                    padding: '16px 0',
                                    color: 'black'
                                }}
                            >
                                KẾT QUẢ KHÁM VÀ KẾT LUẬN
                            </Descriptions.Item>
                            <Descriptions.Item label='Nội khoa'>Bình thường</Descriptions.Item>
                            <Descriptions.Item label='Ngoại khoa'>Tiền căn mổ ruột thừa năm 2016</Descriptions.Item>
                            <Descriptions.Item label='Mắt'>Hai mắt tật khúc xạ</Descriptions.Item>
                            <Descriptions.Item label='Tai-Mũi-Họng'>Vẹo vách ngăn mũi P, viêm mũi xoang dị ứng</Descriptions.Item>
                            <Descriptions.Item label='Răng-Hàm-Mặt'>Mất răng 46, sức nhai 97%</Descriptions.Item>
                            <Descriptions.Item label='Da liễu'>Bình thường</Descriptions.Item>
                            <Descriptions.Item label='Sản Phụ khoa'>Bình thường</Descriptions.Item>
                            <Descriptions.Item label='Siêu âm '>
                                <Typography.Paragraph className='m0-p0' type='secondary'>
                                    Chủ mô echo dày, giảm âm vùng sâu, đường mật không dãn
                                </Typography.Paragraph>
                                <Typography.Paragraph className='m0-p0' type='secondary'>
                                    → {'Gan nhiễm mỡ cấp độ 1'}
                                </Typography.Paragraph>
                            </Descriptions.Item>
                            <Descriptions.Item label='Xquang'>Bình thường</Descriptions.Item>
                            <Descriptions.Item label='Công thức máu'>
                                <Row gutter={[8, 0]}>
                                    <Col span={12}>
                                        <div style={useStyle.setSpaceBetween}>
                                            <Typography.Text>- Hồng cầu/RBC:</Typography.Text>
                                            <Typography.Text type='secondary'>4</Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text>M/µL</Typography.Text>
                                    </Col>
                                    <Col span={12}>
                                        <div style={useStyle.setSpaceBetween}>
                                            <Typography.Text>- Bạch cầu/WBC:</Typography.Text>
                                            <Typography.Text type='secondary'>#</Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text>K/µL</Typography.Text>
                                    </Col>
                                    <Col span={12}>
                                        <div style={useStyle.setSpaceBetween}>
                                            <Typography.Text>- Tiểu cầu/PLT:</Typography.Text>
                                            <Typography.Text type='secondary'>231</Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text>k/uL</Typography.Text>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item label='Đường huyết'>
                                <Row gutter={[8, 0]}>
                                    <Col span={12}>
                                        <div style={useStyle.setSpaceBetween}>
                                            <Typography.Text>Glucose</Typography.Text>
                                            <Typography.Text type='secondary'>7.0</Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text>mmol/l</Typography.Text>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item label='Chức năng thận'>
                                <Row gutter={[8, 0]}>
                                    <Col span={12}>
                                        <div style={useStyle.setSpaceBetween}>
                                            <Typography.Text>Urea:</Typography.Text>
                                            <Typography.Text type='secondary'>5.0</Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text>mmol/l</Typography.Text>
                                    </Col>
                                    <Col span={12}>
                                        <div style={useStyle.setSpaceBetween}>
                                            <Typography.Text>Creatine:</Typography.Text>
                                            <Typography.Text type='secondary'>#</Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text>µmol/l</Typography.Text>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item label='Men gan'>
                                <Row gutter={[8, 0]}>
                                    <Col span={12}>
                                        <div style={useStyle.setSpaceBetween}>
                                            <Typography.Text>SGOT:</Typography.Text>
                                            <Typography.Text type='secondary'>#</Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text>UI/L</Typography.Text>
                                    </Col>
                                    <Col span={12}>
                                        <div style={useStyle.setSpaceBetween}>
                                            <Typography.Text>SGPT:</Typography.Text>
                                            <Typography.Text type='secondary'>#</Typography.Text>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Typography.Text>UI/L</Typography.Text>
                                    </Col>
                                </Row>
                            </Descriptions.Item>
                            <Descriptions.Item label='Tổng phân tích nước tiểu'>Âm tính</Descriptions.Item>
                        </Descriptions>

                        <Space className='title'>
                            <Typography.Title level={4}>III. KẾT LUẬN CỦA BÁC SĨ CHUYÊN KHOA:</Typography.Title>
                        </Space>

                        <Typography.Paragraph strong style={{ fontSize: 16, padding: '0 0 24px 30px' }}>Sức khỏe bình thường.</Typography.Paragraph>

                    </Col>
                </Row >
            </div>
            <Row>
                <Col span={12} push={3}><Button type='primary'>Quay lại</Button></Col>
                <Col span={12} push={4}><Button type='primary' onClick={handleDownloadPDF}>Tải file PDF</Button></Col>
            </Row>
        </>
    )
}

export default InputMedicalExaminationDetails