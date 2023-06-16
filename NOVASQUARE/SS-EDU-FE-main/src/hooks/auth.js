import { useRecoilValue, useRecoilState } from "recoil";
import { authState } from "../recoil/atom/authState";
import { generalState } from "../recoil/atom/generalState";
import authApi from "../api/authApi";
import axiosUser from "../utils/axiosUser";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import userApi from "../api/userApi";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [general, setGeneral] = useRecoilState(generalState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const getProfile = async (id) => {
    try {
      let res = await userApi.getUser(id);
      if (res.data) {
        setAuth({ ...auth, profile: res.data.elements.user });
      }
      setGeneral({
        appSelected: {
          id: 1,
          label: "User Management",
          APP_CD: "um",
        },
      });
    } catch (error) {
      setAuth({
        profile: undefined,
      });
    }
  };
  const updateProfile = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await authApi.updateProfile(data);
      if (res.data) {
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setAuth(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const login = async (data) => {
    setIsLoading(true);
    setError(undefined);
    try {
      let res = await authApi.login(data);
      if (res && res?.data) {
        setSuccess(res.data.message);
        setAuth({
          profile: res.data.elements.user,
        });
        // setGeneral({
        //   appSelected: {
        //     id: 204,
        //     label: "Sổ tay sức khỏe",
        //     APP_CD: "health_handbook",
        //   },
        // });
        localStorage.setItem("accessToken", res.data.elements.access_token);
        localStorage.setItem("isLogged", true);
        let userInfo = res.data.elements.user;
        if (
          userInfo?.User_Status &&
          userInfo?.User_Status?.ACTION_LINK?.length > 0
        ) {
          window.location.href = await userInfo?.User_Status?.ACTION_LINK;
          setGeneral({
            appSelected: {
              id: 0,
              APP_CD: userInfo?.User_Status?.NAME,
            },
          });
          console.log("userInfo?.User_Status?.ACTION_LINK")

        } else {
          window.location.href = "/";
        }
        setError(undefined);
      }
    } catch (error) {
      console.log("error login", error);
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const logout = async () => {
    try {
      let res = await authApi.logout(axiosUser);
      if (res.data.status === 200) {
        setAuth({
          profile: "",
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLogged");
        localStorage.removeItem("general");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };
  const refreshToken = async () => {
    try {
      let res = await authApi.refreshToken();
      console.log("refreshToken successfully");
      if (res.data.status === 200) {
        setAuth({
          profile: res.data.elements.user,
          isLogged: true,
        });
        localStorage.setItem("accessToken", res.data.elements.access_token);
        //by pass the login process
        if (localStorage.getItem("isLogged") !== "true") {
          localStorage.setItem("isLogged", true);
          window.location.href = "/";
        }
      } else {
        console.log("refreshToken failed");
        // setAuth({
        //   accessToken: "",
        //   profile: "",
        //   isLogged: false,
        // });
        // localStorage.setItem("isLogged", false);
        // if (window.location.pathname !== "/auth/login") window.location.href = "/auth/login"
      }
    } catch (error) {
      // setError(error.res.data.message);
      console.log("error when refreshing token: ", error);
      // setAuth({
      //   accessToken: "",
      //   profile: "",
      //   isLogged: false,
      // });
      // localStorage.setItem("isLogged", false);
      // if (window.location.pathname !== "/auth/login") window.location.href = "/auth/login"
    }
  };
  const forgotPassword = async (data) => {
    setIsLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        let res = await authApi.forgotPassword(data);
        if (res && res.data && res.data.status && res.data.status === 200) {
          console.log(res.data);
          resolve({
            success: true,
            message: "Re-send the password, please check your email.",
          });
          setIsLoading(false);
        } else {
          resolve({
            success: false,
            message: "This Email is not exist in system.",
          });
          setIsLoading(false);
        }
      } catch (error) {
        reject(error);
        setIsLoading(false);
      }
    });
  };
  const resetYourPassword = async (data, token) => {
    setIsLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        let res = await authApi.resetYourPassword(data, token);
        if (res && res.data && res.data.status && res.data.status === 200) {
          resolve({
            success: "success",
            message: "Reset password successful.",
          });
          setIsLoading(false);
          setTimeout((window.location.href = "/auth/login"), 2000);
        } else {
          resolve({
            success: "error",
            message: "Reset password failed.",
          });
          setIsLoading(false);
        }
      } catch (error) {
        reject(error);
        setIsLoading(false);
      }
    });
  };
  const changePassword = async (data, callBack) => {
    setIsLoading(true);
    try {
      let res = await authApi.changePassword(data);
      if (res && res.data && res.data.status && res.data.status === 200) {
        enqueueSnackbar(res.data.message, { variant: "success" });
        setIsLoading(false);
        callBack();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return {
    getProfile,
    logout,
    login,
    isLoading,
    error,
    success,
    refreshToken,
    updateProfile,
    auth,
    forgotPassword,
    resetYourPassword,
    changePassword,
  };
};
