import { Button, Col, DatePicker, Form, Modal, Radio, Row, Space } from 'antd';
import React, { useState } from 'react';

const SeniorityModal = ({ title, isOpen }) => {
    const [form] = Form.useForm();
    const [isShow, setIsShow] = useState(false);

    const handleChangeValue = ({ target: { value } }) => {
        if (value === "Đặc biệt") {
            setIsShow(true);
        } else setIsShow(false);
    }
    return (
        <Modal
            className='seniority-modal'
            title={title}
            open={isOpen}
            maskClosable={false}
            closable={false}
            footer={false}
            centered
            width={800}
        >
            <Form
                form={form}
                autoComplete="off"
                scrollToFirstError
                labelCol={{
                    span: 6,
                }}
                labelAlign='left'
            >
                <Row justify="center" gutter={[0, 24]}>
                    <Col span={22}>
                        <Form.Item
                            name="PACKAGES"
                            label="Gói khám"
                        >
                            <Radio.Group defaultValue="Tự khám" onChange={handleChangeValue}>
                                <Radio value="Tự khám"> Tự khám </Radio>
                                <Radio value="Đặc biệt"> Đặc biệt </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col span={22}>
                        <Row gutter={[24, 0]}>
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <Form.Item
                                    name="SENIORITY"
                                    label="Năm tài chính"
                                    labelCol={{
                                        xs: { span: 6 },
                                        lg: { span: 12 }
                                    }}
                                >
                                    <DatePicker picker='year' disabled={isShow ? false : true} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                                <Space size={12} wrap>
                                    <p>Thâm niên:</p>
                                    <Space wrap>
                                        <Space>
                                            <p>{2}</p>
                                            <p>Năm</p>
                                        </Space>
                                        <Space>
                                            <p>{4}</p>
                                            <p>Tháng</p>
                                        </Space>
                                        <Space>
                                            <p>{11}</p>
                                            <p>Ngày</p>
                                        </Space>
                                    </Space>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={20}>
                        <Row justify="center">
                            <Col>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Thêm mới
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default SeniorityModal