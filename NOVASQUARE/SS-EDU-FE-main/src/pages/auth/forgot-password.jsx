import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
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
    const { isLoading, forgotPassword } = useAuth()
    const { getOrgByDomain, isLoading: loadingLogo } = useOrg()
    const [org, setOrg] = useState()
    const [notice, setNotice] = useState()

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
           const {success,message} = await forgotPassword(values)
           setNotice({
            success,
            message
           })
       } catch (error) {
           setNotice({
               success: false,
               message: error.response.data.message
           })
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
                                                    <h5 className="text-muted text-center fw-normal mb-4">Forgot your password ?</h5>
                                                </Stack>
                                                <Form
                                                    className='login-form'
                                                    name="basic"
                                                    initialValues={{
                                                        remember: true,
                                                    }}
                                                    onFinish={onFinish}

                                                    autoComplete="off"
                                                >
                                                    <Form.Item
                                                    >
                                                        {
                                                            notice && <Alert message={notice?.message} type={notice?.success ? "success" : "error"} showIcon />
                                                        }
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="email"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your email!',
                                                                type: 'email'
                                                            },
                                                        ]}
                                                    >
                                                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" autoFocus={true} />
                                                    </Form.Item>
                                                    <Form.Item
                                                    >
                                                        <Button className='login-form-button' htmlType='submit'
                                                            loading={isLoading} type="primary">
                                                            Send Email
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

