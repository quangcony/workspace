import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import studentRegistrationApi from "../api/studentRegistrationApi";
import { useSnackbar } from "notistack";

export const useStudentRegistration = () => {
  const [studentRegistrations, setStudentRegistrations] = useState([]);
  const [studentRegistration, setStudentRegistration] = useState();
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
    getAllStudentRegistrations();
  }, []);

  const getAllStudentRegistrations = async () => {
    setIsLoading(true);
    try {
      let res = await studentRegistrationApi.getAllStudentRegistrations();
        console.log("data :",res.data)
      if (res.data) {
        setStudentRegistrations(res.data.elements);
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
  const getStudentRegistration = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await studentRegistrationApi.getStudentRegistration( id);
      if (res.data) {
        setStudentRegistration(res.data.elements.studentRegistration);
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
  const createStudentRegistration = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await studentRegistrationApi.createStudentRegistration( data);
      if (res.data) {
        getAllStudentRegistrations();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setStudentRegistration(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateStudentRegistration = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await studentRegistrationApi.updateStudentRegistration( data, id);
      if (res.data) {
        getAllStudentRegistrations();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setStudentRegistration(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteStudentRegistration = async (id) => {
    setIsLoading(true);
    try {
      let res = await studentRegistrationApi.deleteStudentRegistration( id);
      if (res.data) {
        getAllStudentRegistrations();
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
    studentRegistrations,
    deleteStudentRegistration,
    studentRegistration,
    getStudentRegistration,
    updateStudentRegistration,
    createStudentRegistration,
    getAllStudentRegistrations,
    isLoading,
    error,
    success,
    setStudentRegistration
  };
};
