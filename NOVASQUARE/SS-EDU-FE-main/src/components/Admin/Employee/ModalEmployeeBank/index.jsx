import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import { useEffect } from 'react';
import i18n from '../../../../lib/Language';

const ModalEmployeeBank = ({ title = '', isOpen, onCancel, onUpdate, onOk,
    setEmployeeBankId, employeeBankId, employeeBank, userId, loading }) => {

    const [form] = Form.useForm();
    const message = i18n.t("setting.messageValidate");

    useEffect(() => {
        if (userId) { form.setFieldsValue({ USER_ID: userId }) }
        else form.setFieldsValue({ USER_ID: '' });
    }, [userId, form]);

    useEffect(() => {
        form.setFieldsValue(employeeBank);
    }, [employeeBank, form]);

    const handleCancel = () => {
        onCancel();
        form.resetFields();
        setEmployeeBankId(undefined);
    };
    const handleCreateApp = async (data) => {
        await onOk(data, () => handleCancel());
    };
    const handleUpdateApp = async (data) => {
        await onUpdate(data, employeeBankId, () => handleCancel());
    };
    const handleOk = () => {
        const newData = { ...form.getFieldValue() };

        const { BANK_NUMBER, BANK_CD, BANK_NAME } = newData;
        if (
            BANK_NUMBER?.trim() === "" || BANK_NUMBER === undefined ||
            BANK_CD?.trim() === "" || BANK_CD === undefined ||
            BANK_NAME?.trim() === "" || BANK_NAME === undefined
        ) { return };

        if (employeeBank) {
            return handleUpdateApp(newData);
        }
        handleCreateApp(newData);
    };

    return (
        <Modal
            width={800}
            visible={isOpen}
            title={title}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[
                <Button form="bankForm" type="second" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    form="bankForm"
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
                id="bankForm"
                name="basic"
                autoComplete="off"
                scrollToFirstError
                labelCol={{
                    span: 7,
                }}
                wrroleerCol={{
                    span: 17,
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
                <Form.Item
                    name='BANK_NUMBER'
                    label={i18n.t("hr.bank.bank_num")}
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
                    name='BANK_CD'
                    label={i18n.t("hr.bank.bank_cd")}
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
                    name='BANK_NAME'
                    label={i18n.t("hr.bank.bank_name")}
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
                    name='NOTE'
                    label={i18n.t("hr.note")}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalEmployeeBank