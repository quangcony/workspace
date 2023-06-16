import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import medicalDiseaseApi from "../api/medicalDiseaseApi";
import { useSnackbar } from "notistack";

export const useMedicalDisease = () => {
  const [medicaldiseases, setMedicaldiseases] = useState([]);
  const [medicaldisease, setMedicaldisease] = useState();
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
    getAllMedicalDiseases();
  }, []);

  const getAllMedicalDiseases = async () => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseApi.getAllMedicalDiseases();
        console.log("data :",res.data)
      if (res.data) {
        setMedicaldiseases(res.data.elements);
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
  const getMedicalDisease = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseApi.getMedicalDisease( id);
      if (res.data) {
        setMedicaldisease(res.data.elements.medicalDisease);
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
  const createMedicalDisease = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseApi.createMedicalDisease( data);
      if (res.data) {
        getAllMedicalDiseases();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicaldisease(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateMedicalDisease = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseApi.updateMedicalDisease( data, id);
      if (res.data) {
        getAllMedicalDiseases();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicaldisease(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteMedicalDisease = async (id) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseApi.deleteMedicalDisease( id);
      if (res.data) {
        getAllMedicalDiseases();
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
    medicaldiseases,
    deleteMedicalDisease,
    medicaldisease,
    getMedicalDisease,
    updateMedicalDisease,
    createMedicalDisease,
    getAllMedicalDiseases,
    isLoading,
    error,
    success,
    setMedicaldisease
  };
};
