import React, { useEffect, useState, useLayoutEffect } from "react";

import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Stack, TextField } from "@mui/material";
// import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Form, Input, Skeleton, Space, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { GoogleLogin } from "react-google-login";
import { useJwt } from "../../hooks/jwt";
import { useSetRecoilState } from "recoil";
import { authState } from "../../recoil/atom/authState";
import axiosUser from "../../utils/axiosUser";
import FacebookLogin from "react-facebook-login";
import { useSnackbar } from "notistack";
import axiosApiInstance from "../../utils/axiosClient";
import { useOrg } from "../../hooks/org";
import logo from "../../assets/images/logo.png";

const initialState = {
  USER_NAME: "",
  USER_PW: "",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const { enqueueSnackbar } = useSnackbar();
  const { login, isLoading, error } = useAuth();
  const { getOrgByDomain, isLoading: loadingLogo } = useOrg();
  const [org, setOrg] = useState();

  // change favicon according to org
  const changeFavicon = (url) => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = url;
  };

  const handleGetOrgByDomain = async () => {
    const domain = window.location.href.slice(0, -1);
    console.log("domain: ", domain);
    const data = await getOrgByDomain(domain);
    changeFavicon(data.LOGO_NAME);
    document.title = data.NAME
    console.log("data: ", data);
    if (data) {
      setOrg(data);
    }
  };

  useLayoutEffect(() => {
    handleGetOrgByDomain();
  }, []);

  const onFinish = async (values) => {
    await login(values);
  };

  const responseGoogle = async (response) => {
    setLoading(true);
    try {
      const res = await axiosApiInstance.post("/auth/google-login", {
        tokenId: response.tokenId,
      });
      setAuth({
        profile: res.data.elements.user,
      });
      localStorage.setItem("accessToken", res.data.elements.access_token);
      localStorage.setItem("isLogged", true);
      window.location.href = "/";
      setLoading(false);
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      setLoading(false);
    }
  };
  const responseFacebook = async (response) => {
    setLoading(true);
    const { accessToken, userID } = response;
    try {
      const res = await axiosApiInstance.post("/auth/facebook-login", {
        accessToken,
        userID,
      });
      setAuth({
        profile: res.data.elements.user,
      });
      localStorage.setItem("accessToken", res.data.elements.access_token);
      localStorage.setItem("isLogged", true);
      window.location.href = "/";
      setLoading(false);
    } catch (err) {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
      setLoading(false);
    }
  };

  // console.log("org: ", org);

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
                          <Link to="/" className="noble-ui-logo d-block mb-2">
                            {loadingLogo ? (
                              <Skeleton.Button shape={"default"} size={70} />
                            ) : (
                              <img
                                alt="logo"
                                style={{
                                  height: 70,
                                  display: "block",
                                  margin: "0 auto",
                                }}
                                src={org && org?.LOGO_NAME}
                              />
                            )}{" "}
                          </Link>
                          <h5 className="text-muted text-center fw-normal mb-4">
                            Welcome back! Log in to your account.
                          </h5>
                        </Stack>
                        <Form
                          className="login-form"
                          name="basic"
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={onFinish}
                          autoComplete="off"
                        >
                          <Form.Item
                            name="USER_NAME"
                            rules={[
                              {
                                required: true,
                                message: "Please input your username!",
                              },
                            ]}
                          >
                            <Input
                              prefix={
                                <UserOutlined className="site-form-item-icon" />
                              }
                              placeholder="Username"
                              autoFocus={true}
                            />
                          </Form.Item>

                          <Form.Item
                            name={"USER_PW"}
                            rules={[
                              {
                                required: true,
                                message: "Please input your password!",
                              },
                            ]}
                          >
                            <Input.Password
                              prefix={
                                <LockOutlined className="site-form-item-icon" />
                              }
                              type="password"
                              placeholder="Password"
                            />
                          </Form.Item>

                          <Form.Item>
                            <Button
                              className="login-form-button"
                              htmlType="submit"
                              loading={isLoading}
                              type="primary"
                            >
                              Login
                            </Button>
                          </Form.Item>
                          {/* <Form.Item>
                            <Link to="/auth/forgot-password">
                              Forgotten password?
                            </Link>
                          </Form.Item> */}
                          {/* <Form.Item>
                            <GoogleLogin
                              clientId="856481487114-a5l7ot4ooenqavjt40mtk8enfafs6bmi.apps.googleusercontent.com"
                              buttonText="Login with Google"
                              onSuccess={responseGoogle}
                              // onFailure={responseGoogle}
                              cookiePolicy={"single_host_origin"}
                              className={"button_gg"}
                            />
                          </Form.Item>
                          <Form.Item>
                            <FacebookLogin
                              appId="910390727019920"
                              autoLoad={false}
                              fields="name,email,picture"
                              callback={responseFacebook}
                            />
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
  );
};

export default Login;
