import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import medicalDiseaseUnitApi from "../api/medicalDiseaseUnitApi";
import { useSnackbar } from "notistack";

export const useMedicalDiseaseUnit = () => {
  const [medicalDiseaseUnits, setMedicaldiseaseUnits] = useState([]);
  const [medicalDiseaseUnit, setMedicaldiseaseUnit] = useState();
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
    getAllMedicalDiseaseUnits();
  }, []);

  const getAllMedicalDiseaseUnits = async () => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitApi.getAllMedicalDiseaseUnits();
        console.log("data :",res.data)
      if (res.data) {
        setMedicaldiseaseUnits(res.data.elements);
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
  const getMedicalDiseaseUnit = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitApi.getMedicalDiseaseUnit( id);
      if (res.data) {
        setMedicaldiseaseUnit(res.data.elements.medicalDiseaseUnit);
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
  const createMedicalDiseaseUnit = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitApi.createMedicalDiseaseUnit( data);
      if (res.data) {
        getAllMedicalDiseaseUnits();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicaldiseaseUnit(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateMedicalDiseaseUnit = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitApi.updateMedicalDiseaseUnit( data, id);
      if (res.data) {
        getAllMedicalDiseaseUnits();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicaldiseaseUnit(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteMedicalDiseaseUnit = async (id) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitApi.deleteMedicalDiseaseUnit( id);
      if (res.data) {
        getAllMedicalDiseaseUnits();
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
    medicalDiseaseUnits,
    deleteMedicalDiseaseUnit,
    medicalDiseaseUnit,
    getMedicalDiseaseUnit,
    updateMedicalDiseaseUnit,
    createMedicalDiseaseUnit,
    getAllMedicalDiseaseUnits,
    isLoading,
    error,
    success,
    setMedicaldiseaseUnit
  };
};
