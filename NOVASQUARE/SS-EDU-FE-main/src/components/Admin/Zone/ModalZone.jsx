import React, { useEffect } from 'react'
import { Button, Form, Input, Modal } from 'antd'

const ModalWard = (props) => {
    const { title = 'Zone Setting', isOpen, zone, zondId,
        setZoneId, onUpdate, onOk, onCancel, loading } = props;
    const [form] = Form.useForm();
    const message = "Vui lòng nhập dữ liệu!";

    useEffect(() => {
        form.setFieldsValue(zone);
    }, [zone, form]);

    const handleCancel = () => {
        onCancel();
        form.resetFields();
        setZoneId(undefined);
    };

    const handleCreateApp = async (data) => {
        await onOk(data, () => handleCancel());
    };
    const handleUpdateApp = async (data) => {
        await onUpdate(data, zondId, () => handleCancel());
    };
    const handleOk = () => {
        const newData = { ...form.getFieldValue() };
        const { NAME, CD, DESC } = newData;

        if (
            NAME?.trim() === "" || NAME === undefined ||
            CD?.trim() === "" || CD === undefined ||
            DESC?.trim() === "" || DESC === undefined
        ) {
            // enqueueSnackbar("Please fill input!", { variant: "error" })
            return;
        }
        if (zone) {
            return handleUpdateApp(newData);
        }
        handleCreateApp(newData);
    };

    return (
        <Modal
            width={800}
            title={title}
            visible={isOpen}
            onCancel={handleCancel}
            footer={[
                <Button form="myForm" type="second" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button
                    form="myForm"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                    onClick={handleOk}
                    loading={loading}
                >
                    OK
                </Button>,
            ]}
        >
            <Form
                form={form}
                id="myForm"
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
                    name="CD"
                    label="Mã vùng"
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
                    name="NAME"
                    label="Tên vùng"
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
                    name="DESC"
                    label="Mô tả"
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
                    name="NOTE"
                    label="Ghi chú"
                >
                    <Input.TextArea row={3} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalWard