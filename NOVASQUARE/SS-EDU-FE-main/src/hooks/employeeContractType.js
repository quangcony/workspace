import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import employeeContractTypeApi from "../api/employeeContractTypeApi";
import { useSetRecoilState } from "recoil";
import { employeeTypeState } from "../recoil/atom/employeeTypeState";

export const useEmployeeContractType = () => {
  const [employeeContractTypes, setEmployeeContractTypes] = useState([]);
  const [employeeContractType, setEmployeeContractType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setEmployeeTypeList = useSetRecoilState(employeeTypeState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllEmployeeContractTypes();
  }, []);

  const getAllEmployeeContractTypes = async () => {
    setIsLoading(true);
    try {
      let res = await employeeContractTypeApi.getAllEmployeeContractTypes();
      if (res.data) {
        setEmployeeContractTypes(res.data.elements);
        setEmployeeTypeList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getEmployeeContractTypeById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await employeeContractTypeApi.getEmployeeContractTypeById(id);
      if (res.data) {
        setEmployeeContractType(res.data.elements.employeeContractType);
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

  const createEmployeeContractType = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await employeeContractTypeApi.createEmployeeContractType(data);
      if (res.data) {
        getAllEmployeeContractTypes();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setEmployeeContractTypes(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateEmployeeContractType = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await employeeContractTypeApi.updateEmployeeContractType(data, id);
      if (res.data) {
        getAllEmployeeContractTypes();
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

  const deleteEmployeeContractType = async (id) => {
    setIsLoading(true);
    try {
      let res = await employeeContractTypeApi.deleteEmployeeContractType(id);
      if (res.data) {
        getAllEmployeeContractTypes();
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
    employeeContractTypes,
    isLoading,
    error,
    success,
    setEmployeeContractTypes,
    createEmployeeContractType,
    deleteEmployeeContractType,
    getEmployeeContractTypeById,
    employeeContractType,
    updateEmployeeContractType,
    setEmployeeContractType
  };
};
