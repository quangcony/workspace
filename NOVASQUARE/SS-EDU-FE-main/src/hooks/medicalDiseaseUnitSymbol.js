import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import medicalDiseaseUnitSymbolApi from "../api/medicalDiseaseUnitSymbolApi";
import { useSnackbar } from "notistack";

export const useMedicalDiseaseUnitSymbol = () => {
  const [medicalDiseaseUnitSymbols, setMedicaldiseaseUnitSymbols] = useState([]);
  const [medicalDiseaseUnitSymbol, setMedicaldiseaseUnitSymbol] = useState();
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
    getAllMedicalDiseaseUnitSymbols();
  }, []);

  const getAllMedicalDiseaseUnitSymbols = async () => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitSymbolApi.getAllMedicalDiseaseUnitSymbols();
        console.log("data :",res.data)
      if (res.data) {
        setMedicaldiseaseUnitSymbols(res.data.elements);
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
  const getMedicalDiseaseUnitSymbol = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitSymbolApi.getMedicalDiseaseUnitSymbol( id);
      if (res.data) {
        setMedicaldiseaseUnitSymbol(res.data.elements.medicalDiseaseUnitSymbol);
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
  const createMedicalDiseaseUnitSymbol = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitSymbolApi.createMedicalDiseaseUnitSymbol( data);
      if (res.data) {
        getAllMedicalDiseaseUnitSymbols();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicaldiseaseUnitSymbol(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateMedicalDiseaseUnitSymbol = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitSymbolApi.updateMedicalDiseaseUnitSymbol( data, id);
      if (res.data) {
        getAllMedicalDiseaseUnitSymbols();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setMedicaldiseaseUnitSymbol(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteMedicalDiseaseUnitSymbol = async (id) => {
    setIsLoading(true);
    try {
      let res = await medicalDiseaseUnitSymbolApi.deleteMedicalDiseaseUnitSymbol( id);
      if (res.data) {
        getAllMedicalDiseaseUnitSymbols();
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
    medicalDiseaseUnitSymbols,
    deleteMedicalDiseaseUnitSymbol,
    medicalDiseaseUnitSymbol,
    getMedicalDiseaseUnitSymbol,
    updateMedicalDiseaseUnitSymbol,
    createMedicalDiseaseUnitSymbol,
    getAllMedicalDiseaseUnitSymbols,
    isLoading,
    error,
    success,
    setMedicaldiseaseUnitSymbol
  };
};
