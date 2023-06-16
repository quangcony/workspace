import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import studentApi from "../api/studentApi";
import { useSnackbar } from "notistack";

export const useStudent = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();
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
    getAllStudents();
  }, []);

  const getAllStudents = async () => {
    setIsLoading(true);
    try {
      let res = await studentApi.getAllStudents();
        console.log("data :",res.data)
      if (res.data) {
        setStudents(res.data.elements);
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
  const getStudent = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await studentApi.getStudent( id);
      if (res.data) {
        setStudent(res.data.elements.student);
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
  const createStudent = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await studentApi.createStudent( data);
      if (res.data) {
        getAllStudents();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setStudent(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateStudent = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await studentApi.updateStudent( data, id);
      if (res.data) {
        getAllStudents();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setStudent(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteStudent = async (id) => {
    setIsLoading(true);
    try {
      let res = await studentApi.deleteStudent( id);
      if (res.data) {
        getAllStudents();
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
    students,
    deleteStudent,
    student,
    getStudent,
    updateStudent,
    createStudent,
    getAllStudents,
    isLoading,
    error,
    success,
    setStudent
  };
};
