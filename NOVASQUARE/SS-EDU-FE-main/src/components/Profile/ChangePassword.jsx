import React, { useEffect } from 'react'
import {
    Button,
    Form,
    Input,
    Modal,
    Row,
    Space,
} from "antd";
import {useAuth} from "../../hooks/auth"
import { CheckCircleOutlined } from '@ant-design/icons';

const ChangePassword = () => {
    const [form] = Form.useForm();
    const {changePassword,logout} = useAuth()
    const handleChangePassword = async () => {
        const { oldPassword } = form.getFieldValue()
        if(!oldPassword || oldPassword == "") return
        await changePassword(form.getFieldValue(), ()=>{
            form.resetFields()
            showDeleteConfirm()
        });
    };
    const handleLogout = async()=>{
        await logout()
    }


    const { confirm } = Modal;

    const showDeleteConfirm = () => {
        confirm({
            title: 'Password has changed successful',
            icon: <CheckCircleOutlined />,
            content: "Do you want to logout account!",
            okText: "Ok",
            okType: "success",
            cancelText: "Continue",
            onOk() {
                handleLogout()
            },
        });
    };


    return (
        <Form
            form={form}
            name="basic"
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
                name="oldPassword"
                label="Old Password"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Please input old password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
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
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm New Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Please confirm password!",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(
                                new Error(
                                    "The two passwords that you entered do not match!"
                                )
                            );
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Row justify="end">
                <Space>
                    <Button onClick={handleChangePassword} type="primary">
                        OK
                    </Button>
                </Space>
            </Row>
        </Form>
    )
}

export default ChangePassword