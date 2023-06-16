import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import studentStatusApi from "../api/studentStatusApi";
import { useSnackbar } from "notistack";

export const useStudentStatus = () => {
  const [studentstatuss, setStudentstatuss] = useState([]);
  const [studentstatus, setStudentstatus] = useState();
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
    getAllStudentStatuss();
  }, []);

  const getAllStudentStatuss = async () => {
    setIsLoading(true);
    try {
      let res = await studentStatusApi.getAllStudentStatuss();
        console.log("data :",res.data)
      if (res.data) {
        setStudentstatuss(res.data.elements);
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
  const getStudentStatus = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await studentStatusApi.getStudentStatus( id);
      if (res.data) {
        setStudentstatus(res.data.elements.studentStatus);
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
  const createStudentStatus = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await studentStatusApi.createStudentStatus( data);
      if (res.data) {
        getAllStudentStatuss();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setStudentstatus(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateStudentStatus = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await studentStatusApi.updateStudentStatus( data, id);
      if (res.data) {
        getAllStudentStatuss();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setStudentstatus(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteStudentStatus = async (id) => {
    setIsLoading(true);
    try {
      let res = await studentStatusApi.deleteStudentStatus( id);
      if (res.data) {
        getAllStudentStatuss();
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
    studentstatuss,
    deleteStudentStatus,
    studentstatus,
    getStudentStatus,
    updateStudentStatus,
    createStudentStatus,
    getAllStudentStatuss,
    isLoading,
    error,
    success,
    setStudentstatus
  };
};
