import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import preClinicalDefaultApi from "../api/preClinicalDefaultApi";
import { useSnackbar } from "notistack";

export const usePreClinicalDefault = () => {
  const [preClinicalDefaults, setPreClinicalDefaults] = useState([]);
  const [preClinicalDefault, setPreClinicalDefault] = useState();
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
    getAllPreClinicalDefaults();
  }, []);

  const getAllPreClinicalDefaults = async () => {
    setIsLoading(true);
    try {
      let res = await preClinicalDefaultApi.getAllPreClinicalDefaults();
        console.log("data :",res.data)
      if (res.data) {
        setPreClinicalDefaults(res.data.elements);
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
  const getPreClinicalDefault = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await preClinicalDefaultApi.getPreClinicalDefault( id);
      if (res.data) {
        setPreClinicalDefault(res.data.elements.preclinicalDefaultSetting);
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
  const createPreClinicalDefault = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await preClinicalDefaultApi.createPreClinicalDefault( data);
      if (res.data) {
        getAllPreClinicalDefaults();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setPreClinicalDefault(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updatePreClinicalDefault = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await preClinicalDefaultApi.updatePreClinicalDefault( data, id);
      if (res.data) {
        getAllPreClinicalDefaults();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setPreClinicalDefault(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deletePreClinicalDefault = async (id) => {
    setIsLoading(true);
    try {
      let res = await preClinicalDefaultApi.deletePreClinicalDefault( id);
      if (res.data) {
        getAllPreClinicalDefaults();
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
    preClinicalDefaults,
    deletePreClinicalDefault,
    preClinicalDefault,
    getPreClinicalDefault,
    updatePreClinicalDefault,
    createPreClinicalDefault,
    getAllPreClinicalDefaults,
    isLoading,
    error,
    success,
    setPreClinicalDefault
  };
};
