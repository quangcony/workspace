import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import i18n from '../../../lib/Language'
import { useStyles } from './style'

const AccountInfo = ({ accountRef, employee, user, isOpen }) => {
    const [form] = Form.useForm();

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                ...user,
                NAME: user?.FIRST_NAME + ' ' + user?.LAST_NAME,
            })
        }
        if (isOpen) { setIsShow(false) }
    }, [user, form, isOpen])
    useEffect(() => {
        if (employee) {
            form.setFieldsValue({
                ...employee?.User,
                EMP_STATUS_ID: employee?.EMP_STATUS_ID,
                NAME: employee?.User?.FIRST_NAME + ' ' + employee?.User?.LAST_NAME,
                CD: employee?.CD
            })
        }
    }, [employee, form]);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <Card
            title={
                <Space>
                    {isShow
                        ? <CaretUpOutlined onClick={() => setIsShow(false)} style={useStyles.iconStyles} />
                        : <CaretDownOutlined onClick={() => setIsShow(true)} style={useStyles.iconStyles} />}
                    <Typography.Title style={useStyles.titleStyles}>{i18n.t("hr.account.acc_info")}</Typography.Title>
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
                        ref={accountRef}
                        form={form}
                        id="accountForm"
                        name="basic"
                        autoComplete="off"
                        scrollToFirstError
                        labelCol={{
                            span: 8,
                        }}
                        labelAlign='left'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name='NAME'
                            label={i18n.t("hr.account.fullname")}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name='id'
                            label={i18n.t("hr.id")}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name='CD'
                            label={i18n.t("hr.cd")}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name='EMAIL'
                            label={i18n.t("hr.email")}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name='PRIMARY_PHONE'
                            label={i18n.t("hr.p_phone")}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 16, offset: 8 }}
                        >
                            <Button type='primary' htmlType="submit">{i18n.t("hr.account.send_email")}</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    )
}

export default AccountInfo