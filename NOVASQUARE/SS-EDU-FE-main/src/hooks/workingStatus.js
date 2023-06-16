import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import workingStatusApi from "../api/workingStatusApi";
import { useSnackbar } from "notistack";

export const useWorkingStatus = () => {
  const [workingstatuss, setworkingstatuss] = useState([]);
  const [workingstatus, setWorkingStatus] = useState();
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
    getAllWorkingStatuss();
  }, []);

  const getAllWorkingStatuss = async () => {
    setIsLoading(true);
    try {
      let res = await workingStatusApi.getAllWorkingStatuss();
        console.log("data :",res.data)
      if (res.data) {
        setworkingstatuss(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
      setIsLoading(false);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const getWorkingStatus = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await workingStatusApi.getWorkingStatus( id);
      if (res.data) {
        setWorkingStatus(res.data.elements.workingStatus);
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
  const createWorkingStatus = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await workingStatusApi.createWorkingStatus( data);
      if (res.data) {
        getAllWorkingStatuss();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setWorkingStatus(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateWorkingStatus = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await workingStatusApi.updateWorkingStatus( data, id);
      if (res.data) {
        getAllWorkingStatuss();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setWorkingStatus(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteWorkingStatus = async (id) => {
    setIsLoading(true);
    try {
      let res = await workingStatusApi.deleteWorkingStatus( id);
      if (res.data) {
        getAllWorkingStatuss();
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
    workingstatuss,
    deleteWorkingStatus,
    workingstatus,
    getWorkingStatus,
    updateWorkingStatus,
    createWorkingStatus,
    getAllWorkingStatuss,
    isLoading,
    error,
    success,
    setWorkingStatus
  };
};
