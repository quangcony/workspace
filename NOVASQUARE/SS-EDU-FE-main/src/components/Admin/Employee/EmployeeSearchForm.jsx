import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import React from 'react';
import i18n from "../../../lib/Language";

const EmployeeSearchForm = ({ formRef, onChange, onResetFrom, onSearch }) => {
    const [form] = Form.useForm();

    return (
        <Row>
            <Col span={24}>
                <Form
                    ref={formRef}
                    form={form}
                    name="basic"
                    autoComplete="off"
                    scrollToFirstError
                    labelCol={{
                        span: 4,
                    }}
                    labelAlign='left'
                    onValuesChange={onChange}
                >
                    <Row gutter={16}>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="USER_ID"
                                label={i18n.t("hr.id")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear autoFocus />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="CD"
                                label={i18n.t("hr.cd")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="EMAIL"
                                label={i18n.t("hr.email")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="PHONE"
                                label={i18n.t("hr.p_phone")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="FIRST_NAME"
                                label={i18n.t("hr.f_name")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="LAST_NAME"
                                label={i18n.t("hr.l_name")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="GENDER"
                                label={i18n.t("hr.gender")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="MARITAL"
                                label={i18n.t("hr.marital")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="CITY_NAME"
                                label={i18n.t("hr.city")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="BRANCH_NAME"
                                label={i18n.t("hr.branch")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="AREA_NAME"
                                label={i18n.t("hr.area")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="DEPARTMENT_NAME"
                                label={i18n.t("hr.dept")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="DIVISION_NAME"
                                label={i18n.t("hr.division")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                name="UNIT_NAME"
                                label={i18n.t("hr.unit")}
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={6}>
                            <Form.Item
                                wrapperCol={{
                                    xs: { offset: 8 },
                                    lg: { offset: 10 }
                                }}
                            >
                                <Space size={24}>
                                    <Space size={0}>
                                        <Button
                                            type='primary'
                                            onClick={onSearch}
                                            icon={<SearchOutlined />}
                                        />
                                        <Button type="text" onClick={onSearch} style={{ fontSize: 16, fontWeight: 600 }}>{i18n.t("hr.search")}</Button>
                                    </Space>
                                    <Space size={0}>
                                        <Button
                                            type='primary'
                                            onClick={onResetFrom}
                                            icon={<ReloadOutlined />}
                                        />
                                        <Button type="text" onClick={onResetFrom} style={{ fontSize: 16, fontWeight: 600 }}>{i18n.t("hr.reset")}</Button>
                                    </Space>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
            {/* <Col span={24} offset={3}>
                <Space size={24}>
                    <Space size={0}>
                        <Button
                            type='primary'
                            onClick={onSearch}
                            icon={<SearchOutlined />}
                        />
                        <Button type="text" onClick={onSearch} style={{ fontSize: 16, fontWeight: 600 }}>{i18n.t("hr.search")}</Button>
                    </Space>
                    <Space size={0}>
                        <Button
                            type='primary'
                            onClick={onResetFrom}
                            icon={<ReloadOutlined />}
                        />
                        <Button type="text" onClick={onResetFrom} style={{ fontSize: 16, fontWeight: 600 }}>{i18n.t("hr.reset")}</Button>
                    </Space>
                </Space>
            </Col> */}
        </Row>
    )
}

export default EmployeeSearchForm