import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { useState } from 'react';
import i18n from '../../../../lib/Language';
import MutationUser from '../../Users/MutationUser';

const UserSearchForm = ({ formRef, onChange, createUser, isLoading, onSearch, onReset }) => {
    const [form] = Form.useForm();

    const [createUserModal, setCreateUserModal] = useState(false);

    const handleCreateUser = async (user, appId, callback) => {
        await createUser(user, appId, callback);
        setCreateUserModal(false);
    };

    return (
        <>
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
                        <Row>
                            <Col md={{ span: 24 }} lg={{ span: 8 }}>
                                <Form.Item
                                    name="id"
                                    label={i18n.t("hr.id")}
                                    labelCol={{
                                        xs: { span: 4 },
                                        lg: { span: 6 }
                                    }}
                                >
                                    <Input
                                        autoFocus={true}
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={{ span: 24 }} lg={{ span: 7, offset: 1 }}>
                                <Form.Item
                                    name="EMAIL"
                                    label={i18n.t("hr.email")}
                                    labelCol={{
                                        xs: { span: 4 },
                                        lg: { span: 6 }
                                    }}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col md={{ span: 24 }} lg={{ span: 7, offset: 1 }}>
                                <Form.Item
                                    name="PRIMARY_PHONE"
                                    label={i18n.t("hr.p_phone")}
                                    labelCol={{
                                        xs: { span: 4 },
                                        lg: { span: 8 }
                                    }}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 24 }} lg={{ span: 8 }}>
                                <Form.Item
                                    name="FIRST_NAME"
                                    label={i18n.t("hr.f_name")}
                                    labelCol={{
                                        xs: { span: 4 },
                                        lg: { span: 6 }
                                    }}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col md={{ span: 24 }} lg={{ span: 7, offset: 1 }}>
                                <Form.Item
                                    name="LAST_NAME"
                                    label={i18n.t("hr.l_name")}
                                    labelCol={{
                                        xs: { span: 4 },
                                        lg: { span: 6 }
                                    }}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={8} offset={2}>
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
                                onClick={onReset}
                                icon={<ReloadOutlined />}
                            />
                            <Button type="text" onClick={onReset} style={{ fontSize: 16, fontWeight: 600 }}>{i18n.t("hr.reset")}</Button>
                        </Space>
                    </Space>
                </Col>
            </Row>
            <Space style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 16 }}>
                <Button
                    title="Create"
                    type="primary"
                    style={{
                        display: "block",
                    }}
                    icon={<PlusOutlined />}
                    onClick={() => setCreateUserModal(true)}
                />
            </Space>
            <MutationUser
                title='Create User'
                isOpen={createUserModal}
                onOk={handleCreateUser}
                onCancel={() => { setCreateUserModal(false) }}
                loading={isLoading}
                width={800}
            />
        </>
    )
}

export default UserSearchForm