import { CaretDownOutlined, CaretUpOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import i18n from '../../../lib/Language'
import ModalUser from './ModalUser'
import { useStyles } from './style'
import { useUser } from '../../../hooks/user';
import { formatDate } from '../../../common'
import moment from 'moment'

const PersonalInfo = ({ personalRef, employee, setUserId, user, setUser, personalFormCheck, setPersonalFormCheck, isOpen }) => {
    const { users, isLoading, createUser } = useUser();

    const [isShow, setIsShow] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const formRef = useRef();

    const [form] = Form.useForm();
    const message = i18n.t("setting.messageValidate");

    useEffect(() => {
        if (employee) {
            form.setFieldsValue({
                ...employee?.User,
                BOD: moment(new Date(employee?.User?.BOD)).format(formatDate.Type),
                CD: employee?.CD,
                GENDER: employee?.User?.Gender?.NAME,
            });
            setUserId(employee?.USER_ID);
        }
    }, [employee, form, setUserId]);
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                ...user,
                GENDER: user?.Gender?.NAME,
            });
            setUserId(user.id);
        }
        else form.resetFields();
    }, [user, form, setUserId]);
    useEffect(() => {
        if (personalFormCheck || isOpen) {
            setIsShow(true);
        }
    }, [personalFormCheck, isOpen])

    // Reset form in component UserSearchForm when close modal
    const handleCancel = () => {
        setShowModal(false)
        formRef.current.resetFields();
    };

    const handleHideElement = () => {
        setPersonalFormCheck(false);
        setIsShow(false);
    }

    return (
        <>
            <Card
                title={
                    <Space>
                        {isShow
                            ? <CaretUpOutlined onClick={handleHideElement} style={useStyles.iconStyles} />
                            : <CaretDownOutlined onClick={() => setIsShow(true)} style={useStyles.iconStyles} />}
                        <Typography.Title style={useStyles.titleStyles}>{i18n.t("hr.personal_info")}</Typography.Title>
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
                            span: 18,
                            offset: 3,
                        }}
                    >
                        <Form
                            form={form}
                            ref={personalRef}
                            id='personalForm'
                            name="basic"
                            autoComplete="off"
                            scrollToFirstError
                            labelCol={{
                                span: 4,
                            }}
                            labelAlign='left'
                        >
                            {/* <Form.Item
                                name="CD"
                                label={i18n.t("hr.cd")}
                                rules={[{
                                    required: true,
                                    message,
                                }]}
                            >
                                <Input />
                            </Form.Item> */}
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        name="id"
                                        label={i18n.t("hr.id")}
                                        labelCol={{ span: 8 }}
                                        rules={[{
                                            required: true,
                                            message,
                                        }]}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={11} offset={1}>
                                    <Space>
                                        <Button
                                            type='primary'
                                            onClick={() => setShowModal(true)}
                                            disabled={employee ? true : false}
                                            icon={<SearchOutlined />}
                                        />
                                    </Space>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        name="FIRST_NAME"
                                        label={i18n.t("hr.f_name")}
                                        labelCol={{ span: 8 }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={11} offset={1}>
                                    <Form.Item
                                        name="LAST_NAME"
                                        label={i18n.t("hr.l_name")}
                                        labelCol={{ span: 8 }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name="GENDER"
                                label={i18n.t("hr.gender")}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="BOD"
                                label={i18n.t("hr.birth")}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="PLACE_OF_BIRTH"
                                label={i18n.t("hr.place_of_birth")}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="DOMICILE"
                                label={i18n.t("hr.domicile")}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                name="RESIDENT"
                                label={i18n.t("hr.resident")}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Row>
                                <Col span={8}>
                                    <Form.Item
                                        name="INDENTITY_CARD_NO"
                                        label={i18n.t("hr.indentity_card_no")}
                                        labelCol={{ span: 12 }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={7} offset={1}>
                                    <Form.Item
                                        name="ISSUE_DATE"
                                        label={i18n.t("hr.issue_date")}
                                        labelCol={{ span: 8 }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={7} offset={1}>
                                    <Form.Item
                                        name="NATIVE_PLACE"
                                        label={i18n.t("hr.issued_by")}
                                        labelCol={{ span: 7 }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                name="EMAIL"
                                label={i18n.t("hr.email")}
                            >
                                <Input disabled />
                            </Form.Item>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        name="PRIMARY_PHONE"
                                        label={i18n.t("hr.p_phone")}
                                        labelCol={{ span: 8 }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={11} offset={1}>
                                    <Form.Item
                                        name="SECOND_PHONE"
                                        label={i18n.t("hr.s_phone")}
                                        labelCol={{ span: 8 }}
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Card>
            <ModalUser
                isOpen={showModal}
                onCancel={handleCancel}
                setUser={setUser}
                formRef={formRef}
                users={users}
                isLoading={isLoading}
                createUser={createUser}
            />
        </>
    )
}

export default PersonalInfo