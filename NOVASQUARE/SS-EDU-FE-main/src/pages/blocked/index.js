import { Grid } from "@mui/material";
import React from "react";
import { useRecoilValue } from "recoil";
import { logoState } from "../../recoil/atom/logoState";
import { authState } from "../../recoil/atom/authState";
import { Stack } from "@mui/material";
import { Spin, Button, Form } from "antd";
import {useAuth} from "../../hooks/auth"
const Home = () => {
  const logo = useRecoilValue(logoState);
  const { profile } = useRecoilValue(authState);
  const { logout } = useAuth()
  return (
    <>
      <div className="page-wrapper full-page">
        <Spin spinning={false}>
          <div className="page-content d-flex justify-content-center">
            <div className="row w-100 mx-0 auth-page" style={{marginTop: "30vh"}}>
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
                          <h4 className="text-muted text-center fw-normal mb-4">{profile?.User_Status?.DESC}</h4>
                        </Stack>
                        
                        <Form
                          className="login-form"
                          name="basic"
                          initialValues={{
                            remember: true,
                          }}
                          //   onFinish={onFinish}
                          autoComplete="off"
                        >
                          <Form.Item style={{ display: "flex",
                              justifyContent: "center"}}>
                            <Button
                            //   className="login-form-button"
                              type="primary"
                              onClick={logout}
                              style={{width: "100px"}}
                            >
                              Exist
                            </Button>
                          </Form.Item>
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

export default Home;
