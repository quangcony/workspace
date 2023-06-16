import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import departmentApi from "../api/departmentApi";
import { useSetRecoilState } from "recoil";
import { departmentState } from "../recoil/atom/departmentState";

export const useDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
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

  const setDepartmentList = useSetRecoilState(departmentState)

  useEffect(() => {
    getAllDepartment();
  }, []);

  const getAllDepartment = async () => {
    setIsLoading(true);
    try {
      let res = await departmentApi.getAllDepartment();
      if (res.data) {
        setDepartments(res.data.elements);
        setDepartmentList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getDepartmentById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await departmentApi.getDepartmentById(id);
      if (res.data) {
        setDepartmentId(res.data.elements.department);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const createDepartment = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await departmentApi.createDepartment(data);
      if (res.data) {
        getAllDepartment();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setDepartments(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateDepartment = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await departmentApi.updateDepartment(data, id);
      if (res.data) {
        getAllDepartment();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const deleteDepartment = async (id) => {
    setIsLoading(true);
    try {
      let res = await departmentApi.deleteDepartment(id);
      if (res.data) {
        getAllDepartment();
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
    departments,
    isLoading,
    error,
    success,
    setDepartments,
    createDepartment,
    deleteDepartment,
    getDepartmentById,
    departmentId,
    updateDepartment,
    setDepartmentId
  };
};
