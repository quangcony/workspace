import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { Button, Form, Input, Skeleton, Space, Spin, Alert } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { authState } from '../../recoil/atom/authState';
import { useSnackbar } from 'notistack';
import { useOrg } from '../../hooks/org';
import logo from '../../assets/images/logo.png'
import { Stack } from '@mui/material';



const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, resetYourPassword } = useAuth()
    const { getOrgByDomain, isLoading: loadingLogo } = useOrg()
    const [org, setOrg] = useState()
    const {id:token} = useParams()

    const handleGetOrgByDomain = async () => {
        const domain = window.location.href.slice(0, -1)
        const data = await getOrgByDomain(domain)
        if (data) {

            setOrg(data)
        }
    }

    useEffect(() => {
        handleGetOrgByDomain()
    }, [])


    const onFinish = async (values) => {
        try {
            const { success, message } = await resetYourPassword({ password: values.password },token)
            enqueueSnackbar(message, { variant: success });
        } catch (error) {
            if (error.response.data.status == 401){
                return enqueueSnackbar("Reset password failed.", { variant: "error" });
            }
            enqueueSnackbar(error.response.data.message, { variant: "error" });
        }
    };






    return (
        <>
            <div className="page-wrapper full-page">
                <Spin spinning={loading}>
                    <div className="page-content d-flex justify-content-center">
                        <div className="row w-100 mx-0 auth-page">
                            <div className="col-md-8 col-xl-6 mx-auto">
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-12 ps-md-0">
                                            <div className="auth-form-wrapper px-4 py-5">
                                                <Stack
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Link to="/" className="noble-ui-logo d-block mb-2">{loadingLogo ? <Skeleton.Button shape={'default'} size={70} /> : <img style={{ height: 70, display: 'block', margin: '0 auto' }} src={org && org.LOGO_NAME} />} </Link>
                                                    <h5 className="text-muted text-center fw-normal mb-4">Reset your password</h5>
                                                </Stack>
                                                <Form
                                                    className='login-form'
                                                    name="basic"
                                                    initialValues={{
                                                        remember: true,
                                                    }}
                                                    onFinish={onFinish}
                                                    labelCol={{
                                                        span: 8,
                                                    }}
                                                    wrroleerCol={{
                                                        span: 17,
                                                    }}
                                                    autoComplete="off"
                                                >
                                                    <>
                                                        <Form.Item
                                                            name="password"
                                                            label="Password"
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
                                                            label="Confirm Password"
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
                                                    </>
                                                    <Form.Item
                                                    >
                                                        <Button className='login-form-button' htmlType='submit'
                                                            loading={isLoading} type="primary">
                                                            Reset password
                                                        </Button>
                                                    </Form.Item>
                                                    {/* <Form.Item
                                                    >
                                                        <Link to="/auth/login" >Login</Link>
                                                    </Form.Item> */}

                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        </>
    )
}

export default ForgotPassword

