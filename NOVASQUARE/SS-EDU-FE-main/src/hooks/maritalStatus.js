import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import maritalStatusApi from "../api/maritalStatusApi";
import { useSetRecoilState } from "recoil";
import { maritalState } from "../recoil/atom/maritalState";

export const useMaritalStatus = () => {
  const [maritalStatuses, setMaritalStatuses] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setMaritalList = useSetRecoilState(maritalState)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllMaritalStatuses();
  }, []);

  const getAllMaritalStatuses = async () => {
    setIsLoading(true);
    try {
      let res = await maritalStatusApi.getAllMaritalStatuses();
      if (res.data) {
        setMaritalStatuses(res.data.elements);
        setMaritalList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getMaritalStatusById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await maritalStatusApi.getMaritalStatusById(id);
      if (res.data) {
        setMaritalStatus(res.data.elements.maritalStatus);
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

  const createMaritalStatus = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await maritalStatusApi.createMaritalStatus(data);
      if (res.data) {
        getAllMaritalStatuses();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMaritalStatuses(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateMaritalStatus = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await maritalStatusApi.updateMaritalStatus(data, id);
      if (res.data) {
        getAllMaritalStatuses();
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

  const deleteMaritalStatus = async (id) => {
    setIsLoading(true);
    try {
      let res = await maritalStatusApi.deleteMaritalStatus(id);
      if (res.data) {
        getAllMaritalStatuses();
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
    maritalStatuses,
    isLoading,
    error,
    success,
    setMaritalStatuses,
    createMaritalStatus,
    deleteMaritalStatus,
    getMaritalStatusById,
    maritalStatus,
    updateMaritalStatus,
    setMaritalStatus
  };
};
