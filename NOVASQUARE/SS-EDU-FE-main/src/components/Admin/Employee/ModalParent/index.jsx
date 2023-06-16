import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { selectOptions } from '../../../../common';
import i18n from '../../../../lib/Language';
import ModalUser from '../ModalUser';

const ModalParent = ({ isOpen, onCancel, onOk, onUpdate, setParentId, createUser, userToUpdateId, parents,
    parent, title = "", userId, users, relationships, parentId, loading, onUpdateUser, userToUpdate }) => {

    const [form] = Form.useForm();
    const message = i18n.t("setting.messageValidate");

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [relationshipOptions, setRelationshipOptions] = useState([]);
    const [user, setUser] = useState();
    const [isCheck, setIsCheck] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        if (userId) {
            form.setFieldsValue({ USER_ID: userId });
            setRelationshipOptions(selectOptions(relationships));
        }
        else {
            form.setFieldsValue({ USER_ID: '' });
            setRelationshipOptions([]);
        }
    }, [userId, form, relationships]);
    useEffect(() => {
        if (parent) {
            form.setFieldsValue({
                ...parent,
                FIRST_NAME: parent?.Parent_Id?.FIRST_NAME,
                LAST_NAME: parent?.Parent_Id?.LAST_NAME
            });
        }
    }, [parent, form]);
    useEffect(() => {
        // Kiem tra Parent co trung User hay k
        if (user && user?.id !== userId) {
            // Get family list of user
            const listFamily = parents.filter(item => item?.USER_ID === userId);
            // Kiem tra User da duoc tao parent
            const isExist = Boolean(listFamily.length);
            // Neu User da duoc tao parent -> Khong cho phep parent lap lai
            if (isExist) {
                // Kiem tra parent co lap lai k
                const isCheck = Boolean(listFamily.filter(item => item?.PARENT_ID === user?.id).length);
                // Bao loi neu da ton tai
                if (isCheck) {
                    alert('Người này đã tồn tại!!');
                    form.resetFields();
                    setUser(undefined);
                }
                // Cho phep tao neu chua co
                else {
                    form.setFieldsValue({
                        PARENT_ID: user?.id,
                        FIRST_NAME: user?.FIRST_NAME,
                        LAST_NAME: user?.LAST_NAME,
                    });
                }
            }
            // Neu User chua duoc tao parent -> tao parent moi
            else {
                form.setFieldsValue({
                    PARENT_ID: user?.id,
                    FIRST_NAME: user?.FIRST_NAME,
                    LAST_NAME: user?.LAST_NAME,
                });
            }
            // Bao loi neu parent trung user
        } else if (user && user?.id === userId) {
            alert('Không được chọn trùng User Id!!');
            form.resetFields();
            setUser(undefined);
        };
    }, [user, form, userId, parents]);

    const handleCancel = () => {
        onCancel();
        form.resetFields();
        setParentId(undefined);
        setUser(undefined);
    };
    const handleCreateApp = async (data) => {
        await onOk(data, () => handleCancel());
    };
    const handleUpdateApp = async (data) => {
        await onUpdate(data, parentId, () => handleCancel());
    };
    const handleUpdateUser = async (data) => {
        await onUpdateUser(data, userToUpdateId, () => console.log('Update User Success!!'));
    };

    const handleOk = () => {
        const newData = { ...form.getFieldValue() };
        const newUser = {
            ...userToUpdate,
            FIRST_NAME: newData?.FIRST_NAME,
            LAST_NAME: newData?.LAST_NAME,
        }
        const { FIRST_NAME, LAST_NAME, ...result } = newData;
        const { USER_RELATIONSHIP_ID, PARENT_ID } = result;

        if (USER_RELATIONSHIP_ID === undefined || PARENT_ID === undefined)
            return;

        if (parent) {
            handleUpdateApp(result);
            if (newData?.FIRST_NAME !== userToUpdate?.FIRST_NAME ||
                newData?.LAST_NAME !== userToUpdate?.LAST_NAME) {
                handleUpdateUser(newUser);
            }
            return;
        }
        handleCreateApp(result);
    };

    return (
        <>
            <Modal
                width={800}
                visible={isOpen}
                title={title}
                onCancel={handleCancel}
                maskClosable={false}
                footer={[
                    <Button form="familyForm" type="second" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        form="familyForm"
                        key="submit"
                        htmlType="submit"
                        type="primary"
                        onClick={handleOk}
                        loading={loading}
                    >
                        OK
                    </Button>,
                ]}
                style={{ top: 10 }}
            >
                <Form
                    form={form}
                    id="familyForm"
                    name="basic"
                    autoComplete="off"
                    scrollToFirstError
                    labelCol={{
                        span: 6,
                    }}
                    labelAlign='left'
                >
                    <Form.Item
                        name="USER_ID"
                        label={i18n.t("hr.id")}
                        initialValue={userId ? userId : ''}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Row>
                        <Col span={18}>
                            <Form.Item
                                name="PARENT_ID"
                                label={i18n.t("hr.family.relatives_id")}
                                labelCol={{ span: 8 }}
                                rules={[{
                                    required: true,
                                    message,
                                }]}
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={5} offset={1}>
                            {!parent && < Button
                                type='primary'
                                icon={<SearchOutlined />}
                                onClick={() => setIsOpenModal(true)}
                            />}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                name='FIRST_NAME'
                                label={i18n.t("hr.l_name")}
                                labelCol={{ span: 12 }}
                            >
                                <Input disabled={parent ? false : true} />
                            </Form.Item>
                        </Col>
                        <Col span={11} offset={1}>
                            <Form.Item
                                name='LAST_NAME'
                                label={i18n.t("hr.l_name")}
                            >
                                <Input disabled={parent ? false : true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="USER_RELATIONSHIP_ID"
                        label={i18n.t("hr.family.relationship")}
                        rules={[{
                            required: true,
                            message: message,
                        }]}
                    >
                        <Select
                            placeholder={i18n.t("hr.family.placehoder")}
                            allowClear
                            showSearch
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={relationshipOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        name="JOB"
                        label={i18n.t("hr.family.job")}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="POSITION"
                        label={i18n.t("hr.position")}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="COMPANY_NAME"
                        label={i18n.t("hr.family.company")}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="NOTE"
                        label={i18n.t("hr.note")}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
            <ModalUser
                isOpen={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false);
                    formRef.current.resetFields();
                }}
                users={users}
                formRef={formRef}
                createUser={createUser}
                setUser={setUser}
            />
        </>
    )
}

export default ModalParent