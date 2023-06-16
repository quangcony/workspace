import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import sourceRegistrationApi from "../api/sourceRegistrationApi";
import { useSnackbar } from "notistack";

export const useSourceRegistration = () => {
  const [sourceRegistrations, setSourceRegistrations] = useState([]);
  const [sourceRegistration, setSourceRegistration] = useState();
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
    getAllSourceRegistrations();
  }, []);

  const getAllSourceRegistrations = async () => {
    setIsLoading(true);
    try {
      let res = await sourceRegistrationApi.getAllSourceRegistrations();
        console.log("data :",res.data)
      if (res.data) {
        setSourceRegistrations(res.data.elements);
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
  const getSourceRegistration = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await sourceRegistrationApi.getSourceRegistration( id);
      if (res.data) {
        setSourceRegistration(res.data.elements.sourceRegistration);
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
  const createSourceRegistration = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await sourceRegistrationApi.createSourceRegistration( data);
      if (res.data) {
        getAllSourceRegistrations();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setSourceRegistration(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateSourceRegistration = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await sourceRegistrationApi.updateSourceRegistration( data, id);
      if (res.data) {
        getAllSourceRegistrations();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setSourceRegistration(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteSourceRegistration = async (id) => {
    setIsLoading(true);
    try {
      let res = await sourceRegistrationApi.deleteSourceRegistration( id);
      if (res.data) {
        getAllSourceRegistrations();
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
    sourceRegistrations,
    deleteSourceRegistration,
    sourceRegistration,
    getSourceRegistration,
    updateSourceRegistration,
    createSourceRegistration,
    getAllSourceRegistrations,
    isLoading,
    error,
    success,
    setSourceRegistration
  };
};
