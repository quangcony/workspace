import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import { useStyles } from './style'
import i18n from "../../../lib/Language"

const StudyInfo = ({ studyRef, employee, studyFormCheck, setStudyFormCheck, isOpen }) => {
    const [isShow, setIsShow] = useState(false)

    const [form] = Form.useForm();
    const message = i18n.t("setting.messageValidate");

    useEffect(() => {
        form.setFieldsValue(employee);
    }, [employee, form])
    useEffect(() => {
        if (isOpen) { setIsShow(false) }
        if (studyFormCheck) {
            setIsShow(true);
        }
    }, [studyFormCheck, isOpen]);

    const handleHideElement = () => {
        setStudyFormCheck(false);
        setIsShow(false);
    }

    return (
        <Card
            title={
                <Space>
                    {isShow
                        ? <CaretUpOutlined onClick={handleHideElement} style={useStyles.iconStyles} />
                        : <CaretDownOutlined onClick={() => setIsShow(true)} style={useStyles.iconStyles} />}
                    <Typography.Title style={useStyles.titleStyles}>{i18n.t("hr.study_info")}</Typography.Title>
                </Space>
            }
            headStyle={useStyles.headStyles}
            bodyStyle={{
                opacity: isShow ? 1 : 0,
                visibility: isShow ? 'visible' : 'hidden',
                height: isShow ? '' : 0,
                transition: '0.3s',
                padding: isShow ? '24px 24px 0' : 0,
            }}
            className='card-header'
        >
            <Row>
                <Col
                    xs={{
                        span: 24,
                    }}
                    lg={{
                        span: 16,
                        offset: 4,
                    }}
                >
                    <Form
                        ref={studyRef}
                        form={form}
                        id="studyForm"
                        name="basic"
                        autoComplete="off"
                        scrollToFirstError
                        labelCol={{
                            span: 8,
                        }}
                        labelAlign='left'
                    >
                        <Form.Item
                            name='GRADUATE_SCHOOL'
                            label={i18n.t("hr.graduate")}
                            rules={[
                                {
                                    required: true,
                                    message,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='ACADEMIC_LEVEL'
                            label={i18n.t("hr.academic_lv")}
                            rules={[
                                {
                                    required: true,
                                    message,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='SPECIALIZED'
                            label={i18n.t("hr.specialized")}
                            rules={[
                                {
                                    required: true,
                                    message,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='FOREIGN_LANGUAGE'
                            label={i18n.t("hr.f_lang")}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name='FOREIGN_LEVEL'
                            label={i18n.t("hr.f_lv")}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default StudyInfo