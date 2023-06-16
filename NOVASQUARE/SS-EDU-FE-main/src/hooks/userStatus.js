import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import userStatusApi from "../api/userStatusApi";
import { useSnackbar } from "notistack";

export const useUserStatus = () => {
  const [userStatuses, setUserStatuses] = useState([]);
  const [userstatus, setUserStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllUserStatuses();
  }, []);

  const getAllUserStatuses = async () => {
    setIsLoading(true);
    try {
      let res = await userStatusApi.getAllUserStatuss();
      // console.log("data :", res.data);
      if (res.data) {
        setUserStatuses(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      // console.log("error:", error);
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const getUserStatus = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await userStatusApi.getUserStatus(id);
      if (res.data) {
        setUserStatus(res.data.elements.userstatus);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const createUserStatus = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await userStatusApi.createUserStatus(data);
      if (res.data) {
        getAllUserStatuses();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setUserStatus(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data?.status !== 401) {
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateUserStatus = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await userStatusApi.updateUserStatus(data, id);
      if (res.data) {
        getAllUserStatuses();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setUserStatus(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteUserStatus = async (id) => {
    setIsLoading(true);
    try {
      let res = await userStatusApi.deleteUserStatus(id);
      if (res.data) {
        getAllUserStatuses();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  return {
    userStatuses,
    deleteUserStatus,
    userstatus,
    getUserStatus,
    updateUserStatus,
    createUserStatus,
    getAllUserStatuses,
    isLoading,
    error,
    success,
    setUserStatus,
  };
};
