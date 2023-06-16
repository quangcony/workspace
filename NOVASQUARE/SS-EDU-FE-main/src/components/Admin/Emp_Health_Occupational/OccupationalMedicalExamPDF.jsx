import { Button, Col, Descriptions, Modal, Row, Space, Spin, Table, Typography } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import employeeApi from '../../../api/employeeApi';
import physicalExamApi from '../../../api/physicalExamApi';
import { formatDate } from '../../../common';
import { employeeIdState } from '../../../recoil/atom/employeeState';
import { physicalExamIdState } from '../../../recoil/atom/physicalExamState';

const OccupationalMedicalExamPDF = ({ onCancel, isOpen, reload, setReload }) => {
  const [employeeId, setEmployeeId] = useRecoilState(employeeIdState);
  const [physicalExamId, setPhysicalExamId] = useRecoilState(physicalExamIdState);

  const [employee, setEmployee] = useState();
  const [physicalExam, setPhysicalExam] = useState();
  const [specialExam, setSpecialExam] = useState(undefined);
  const [physicalDetail, setPhysicalDetail] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const printRef = useRef();

  console.log(employeeId, physicalExamId);
  console.log(physicalExam);

  useEffect(() => {
    if (employeeId && physicalExamId) {
      (async () => {
        setLoading(true);
        try {
          const emp_res = await employeeApi.getEmployee(employeeId);
          if (emp_res.data) {
            setEmployee(emp_res.data.elements.employee);
          }
          const exam_res = await physicalExamApi.getPhysicalExam(physicalExamId);
          if (exam_res.data) {
            setPhysicalExam(exam_res.data.elements.physicalExam);
          }
          setLoading(false);
          setReload(false);
        } catch {
          setLoading(false);
          setReload(false);
        }
      })()
    }
  }, [employeeId, physicalExamId, reload])

  useEffect(() => {
    if (physicalExam) {
      console.log(physicalExam)
      setSpecialExam(physicalExam?.Special_Exams);
      setPhysicalDetail(physicalExam?.Physical_Details[0]);
    }
  }, [physicalExam]);

  const screeningColumns = [
    {
      title: 'BỆNH NGHỀ NGHIỆP',
      width: "35%",
      render: (_, record) =>
        <Typography.Paragraph className='fz16' strong >
          {record?.SPECIAL_DISEASE_NAME}
        </Typography.Paragraph>
    },
    {
      title: 'KẾT LUẬN',
      width: "35%",
      render: (_, record) =>
        <>
          {record?.RESULT_INPUT_NAME &&
            <Typography.Paragraph className='fz16' strong type='secondary'>
              - {record?.RESULT_INPUT_NAME}
            </Typography.Paragraph>
          }
          {record?.RESULT_SELECT_NAME &&
            <Typography.Paragraph className='fz16' strong type='secondary'>
              - {record?.RESULT_SELECT_NAME}
            </Typography.Paragraph>
          }
          {record?.RESULT_INPUT_NAME_2 &&
            <Typography.Paragraph className='fz16' strong type='secondary'>
              - {record?.RESULT_INPUT_NAME_2}
            </Typography.Paragraph>
          }
          {record?.RESULT_SELECT_NAME_2 &&
            <Typography.Paragraph className='fz16' strong type='secondary'>
              - {record?.RESULT_SELECT_NAME_2}
            </Typography.Paragraph>
          }
        </>
    },
    {
      title: 'GHI CHÚ',
      width: "30%",
      render: (_, record) =>
        <Typography.Paragraph className='fz16' strong >
          {record?.NOTE}
        </Typography.Paragraph>
    },
  ]

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
      "KSKBNN"
      : employee?.User?.FIRST_NAME +
      " " +
      employee?.User?.LAST_NAME +
      "_" +
      employee?.Department?.DEPARTMENT_NAME +
      "_" +
      "KSKBNN";

    pdf.save(`${nameFilePDF}.pdf`);
  }

  const handleCancel = () => {
    onCancel();
    setEmployeeId(undefined);
    setPhysicalExamId(undefined);
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
        <Spin spinning={loading} tip="...Loading">
          <div ref={printRef}>
            <Row gutter={[10, 32]}>
              <Col span={22} offset={1}>
                <Space style={useStyles.setCenter} wrap >
                  <Typography.Title level={3}>KẾT QUẢ KHÁM SỨC KHỎE BỆNH NGHỀ NGHIỆP</Typography.Title>
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
                          <Typography.Paragraph className='fz16' type='danger' strong>
                            {specialExam && specialExam[0]?.TYPE ? "ĐỊNH KỲ" : "TẦM SOÁT"}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
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
                    </Row>
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Row>
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
                            PHÒNG BAN:
                          </Typography.Paragraph>
                          <Typography.Paragraph className='fz16' type='secondary' strong>
                            {employee?.Department?.DEPARTMENT_NAME}
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
                            SỐ NĂM LÀM VIỆC:
                          </Typography.Paragraph>
                          <Typography.Paragraph className='fz16' type='secondary' strong>
                            {specialExam && specialExam[0]?.DEPARTMENT_WORKED_YEAR}
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
                            NGÀY KHÁM:
                          </Typography.Paragraph>
                          <Typography.Paragraph className='fz16' type='secondary' strong>
                            {moment(new Date(physicalExam?.PHYSICAL_DATE)).format(formatDate.Type)}
                          </Typography.Paragraph>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space style={{ padding: 0 }}>
                          <Typography.Paragraph className='fz16' strong style={{ width: 200 }}>
                            CƠ SỞ KHÁM:
                          </Typography.Paragraph>
                          <Typography.Paragraph className='fz16' type='secondary' strong>
                            {physicalExam?.MEDICAL_FACILITY_NAME}
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
                            {physicalDetail?.PERSONAL_HEIGH}
                          </Typography.Paragraph>
                          <Typography.Paragraph className='fz16' strong>m</Typography.Paragraph>
                        </Space>
                      </Col>
                      <Col span={7}>
                        <Space style={{ padding: 0 }}>
                          <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>Cân nặng:</Typography.Paragraph>
                          <Typography.Paragraph className='fz16' type='secondary' strong>
                            {physicalDetail?.PERSONAL_WEIGHT}
                          </Typography.Paragraph>
                          <Typography.Paragraph className='fz16' strong>kg</Typography.Paragraph>
                        </Space>
                      </Col>
                      <Col span={4}>
                        <Space style={{ padding: 0 }}>
                          <Typography.Paragraph className='fz16' strong style={{ width: 50 }}>BMI:</Typography.Paragraph>
                          <Typography.Paragraph className='fz16' type='secondary' strong>
                            {physicalDetail?.BMI_INDEX}
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
                            {physicalDetail?.Blood_Pressures[0]?.VALUE}
                          </Typography.Paragraph>
                          <Typography.Paragraph className='fz16' strong>mmHg</Typography.Paragraph>
                        </Space>
                      </Col>
                      <Col span={7}>
                        <Space style={{ padding: 0 }}>
                          <Typography.Paragraph className='fz16' strong style={{ width: 100 }}>Mạch:</Typography.Paragraph>
                          <Typography.Paragraph className='fz16' type='secondary' strong>
                            {physicalDetail?.BLOOD_VESSEL}
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

              {specialExam && specialExam[0]?.TYPE === 1
                ? <Col span={22} offset={1}>
                  {specialExam.length &&
                    <Descriptions
                      bordered
                      column={1}
                      size='middle'
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

                        width: '50%',
                        color: 'rgba(0, 0, 0, 0.45)',
                        padding: 4,
                      }}
                    >
                      <Descriptions.Item label="Nghề khi bị bệnh nghề nghiệp">
                        {specialExam[0]?.Result_Input?.DISEASE_JOB_NAME}
                      </Descriptions.Item>
                      <Descriptions.Item label="Năm phát hiện bệnh">
                        {specialExam[0]?.Result_Input?.YEAR_DETECTED}
                      </Descriptions.Item>
                      <Descriptions.Item label="Tên bệnh nghề nghiệp">
                        {specialExam[0]?.SPECIAL_DISEASE_NAME}
                      </Descriptions.Item>
                      <Descriptions.Item label="Tỷ lệ mất khả năng lao động">
                        {specialExam[0]?.Result_Input?.LABOR_LOSS_RATE} %
                      </Descriptions.Item>
                      <Descriptions.Item label="Công việc hiện nay">
                        {specialExam[0]?.Result_Input?.CURRENT_JOB}
                      </Descriptions.Item>
                      <Descriptions.Item label="Chuẩn đoán">
                        {specialExam[0]?.Result_Input?.DIANOSE}
                      </Descriptions.Item>
                      <Descriptions.Item label="Biến chứng">
                        {specialExam[0]?.Result_Input?.SYMPTOMS}
                      </Descriptions.Item>
                      <Descriptions.Item label="Hướng giải quyết">
                        {specialExam[0]?.Result_Input?.SOLUTION}
                      </Descriptions.Item>
                      <Descriptions.Item label="Ghi chú">
                        {specialExam[0]?.Result_Input?.NOTE}
                      </Descriptions.Item>
                    </Descriptions>
                  }
                </Col>
                : <Col span={22} offset={1}>
                  <Table
                    className="occupational-pdf-tbl"
                    columns={screeningColumns}
                    bordered
                    dataSource={specialExam}
                    pagination={false}
                  // size="small"
                  />
                </Col>
              }
            </Row >
          </div>
          <Row style={{ paddingTop: 32 }}>
            <Col span={12} push={3}><Button type='primary' onClick={handleCancel}>Quay lại</Button></Col>
            <Col span={12} push={4}>
              <Button
                type='primary'
                onClick={() => {
                  handleDownloadPDF();
                  handleCancel();
                }}
              >
                Tải file PDF
              </Button>
            </Col>
          </Row>
        </Spin>
      </Modal>
    </>
  )
}

export default OccupationalMedicalExamPDF