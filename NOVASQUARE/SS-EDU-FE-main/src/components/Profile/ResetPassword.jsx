import React, { useEffect, useState } from 'react'
import {
    Button,
    Form,
    Input,
    Modal,
    Row,
    Space,
    Tooltip,
} from "antd";
import { useAuth } from "../../hooks/auth"
import { CheckCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { useUser } from '../../hooks/user';

const ResetPassword = ({ userId }) => {
    
    const [ifUser, setifUser] = useState()
    const [form] = Form.useForm();
    const { resetPasswordUser } = useUser()
    const [password, setPassword] = useState("")
    const handleResetPassword = async () => {
        await resetPasswordUser(userId, { password }, handleFinishResetPassword);
    };

    const handleFinishResetPassword = (user) => {
        setifUser(user)
        showModal(true)
        setPassword("")
    }


    const generatePassword = () => {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const passwordLength = 12;
        let password = "";
        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        setPassword(password)
    }

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };




    return (
        <>
            <Form
                form={form}
                name="basic"
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                scrollToFirstError
                labelCol={{
                    span: 6,
                }}
                wrroleerCol={{
                    span: 18,
                }}
            >
                <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input password!",
                        },
                    ]}
                >
                    <Input.Group compact>
                        <Input.Password onChange={e => setPassword(e.target.value)} value={password} style={{ width: 'calc(100% - 100px)' }} />
                        <Tooltip title="Generate Password">
                            <Button onClick={generatePassword} icon={<RedoOutlined />} />
                        </Tooltip>
                    </Input.Group>
                </Form.Item>

                <Row justify="end">
                    <Space>
                        <Button onClick={handleResetPassword} type="primary">
                            OK
                        </Button>
                    </Space>
                </Row>
            </Form>
            <Modal
                title="Information User"
                visible={visible}
                onCancel={hideModal}
                footer={[
                    <Button form="myForm" type="second" onClick={hideModal}>
                        Cancel
                    </Button>
                ]}
            >
                {
                    ifUser && <><p>Full Name: {ifUser.fullName}</p>
                        <p>Primary Phone: {ifUser.primaryPhone || ''}</p>
                        <p>Second Phone: {ifUser?.SECOND_PHONE || ''}</p>
                        <p>Primary Email: {ifUser?.email || ''}</p>
                        <p>Personal Email: {ifUser?.personalEmail || ''}</p>
                        <p>Password: {ifUser?.password || ''}</p></>
                }
            </Modal>
        </>
    )
}

export default ResetPassword