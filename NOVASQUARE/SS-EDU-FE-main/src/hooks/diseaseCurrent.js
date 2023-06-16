import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import diseaseCurrentApi from "../api/diseaseCurrentApi";

export const useDiseaseCurrent = () => {
  const [diseaseCurrents, setDiseaseCurrents] = useState([]);
  const [diseaseCurrent, setDiseaseCurrent] = useState('');
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
    getAllDiseaseCurrents();
  }, []);

  const getAllDiseaseCurrents = async () => {
    setIsLoading(true);
    try {
      let res = await diseaseCurrentApi.getAllDiseaseCurrents();
      if (res.data) {
        setDiseaseCurrents(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getDiseaseCurrentById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await diseaseCurrentApi.getDiseaseCurrentById(id);
      if (res.data) {
        setDiseaseCurrent(res.data.elements.diseaseCurrent);
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

  const createDiseaseCurrent = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await diseaseCurrentApi.createDiseaseCurrent(data);
      if (res.data) {
        getAllDiseaseCurrents();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setDiseaseCurrents(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      // if (error.response.data.status !== 401) {
      //   enqueueSnackbar(error.response.data.message, { variant: "error" });
      // }
      setIsLoading(false);
    }
  };

  const updateDiseaseCurrent = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await diseaseCurrentApi.updateDiseaseCurrent(data, id);
      if (res.data) {
        getAllDiseaseCurrents();
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

  const deleteDiseaseCurrent = async (id) => {
    setIsLoading(true);
    try {
      let res = await diseaseCurrentApi.deleteDiseaseCurrent(id);
      if (res.data) {
        getAllDiseaseCurrents();
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
    diseaseCurrents,
    diseaseCurrent,
    isLoading,
    error,
    success,
    setDiseaseCurrents,
    createDiseaseCurrent,
    deleteDiseaseCurrent,
    getDiseaseCurrentById,
    updateDiseaseCurrent,
    setDiseaseCurrent
  };
};
