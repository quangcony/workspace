import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import diseaseApi from "../api/diseaseApi";
import { useSetRecoilState } from "recoil";
import { diseasesState } from "../recoil/atom/diseaseState";

export const useDisease = () => {
  const [diseases, setDiseases] = useState([]);
  const [diseaseId, setDiseaseId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setDiseasesState = useSetRecoilState(diseasesState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllDisease();
  }, []);

  const getAllDisease = async () => {
    setIsLoading(true);
    try {
      let res = await diseaseApi.getAllDisease();
      if (res.data) {
        setDiseases(res.data.elements);
        setDiseasesState(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getDiseaseById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await diseaseApi.getDiseaseById(id);
      if (res.data) {
        setDiseaseId(res.data.elements.disease);
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

  const createDisease = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await diseaseApi.createDisease(data);
      if (res.data) {
        getAllDisease();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setDiseases(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateDisease = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await diseaseApi.updateDisease(data, id);
      if (res.data) {
        getAllDisease();
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

  const deleteDisease = async (id) => {
    setIsLoading(true);
    try {
      let res = await diseaseApi.deleteDisease(id);
      if (res.data) {
        getAllDisease();
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
    diseases,
    isLoading,
    error,
    success,
    getAllDisease,
    setDiseases,
    createDisease,
    deleteDisease,
    getDiseaseById,
    diseaseId,
    updateDisease,
    setDiseaseId
  };
};
