import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import investigationCaseApi from "../api/investigationCaseApi";
import { useSnackbar } from "notistack";

export const useInvestigationCase = () => {
  const [investigationCases, setInvestigationCases] = useState([]);
  const [demSo, setDemSo] = useState([]);
  const [newCase, setNewCase] = useState([]);
  const [investigationCase, setInvestigationCase] = useState();
  const [investigationCaseHistory, setInvestigationCaseHistory] = useState();
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
    getAllInvestigationCases();
  }, []);

  const getAllInvestigationCases = async () => {
    setIsLoading(true);
    try {
      let res = await investigationCaseApi.getAllInvestigationCases();
        console.log("data :",res.data)
      if (res.data) {
        setInvestigationCases(res.data);
        setDemSo(res.data.invalidCount)
      }
      if (res.data?.valid === false) {
        enqueueSnackbar('Có dữ liệu bị thay đổi', { variant: "error" });
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
  const getInvestigationCase = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await investigationCaseApi.getInvestigationCase( id);
      if (res.data) {
        setInvestigationCase(res.data.elements);
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
  const getInvestigationCaseHistory = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await investigationCaseApi.getInvestigationCaseHistory( id);
      if (res.data) {
        setInvestigationCaseHistory(res.data.elements);
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
  const createInvestigationCase = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await investigationCaseApi.createInvestigationCase( data);
      if (res.data) {
        getAllInvestigationCases();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setInvestigationCase(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateInvestigationCase = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await investigationCaseApi.updateInvestigationCase( data, id);
      if (res.data) {
        getAllInvestigationCases();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setInvestigationCase(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteInvestigationCase = async (id) => {
    setIsLoading(true);
    try {
      let res = await investigationCaseApi.deleteInvestigationCase( id);
      if (res.data) {
        getAllInvestigationCases();
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
    demSo,
    investigationCases,
    deleteInvestigationCase,
    investigationCase,
    investigationCaseHistory,
    getInvestigationCase,
    getInvestigationCaseHistory,
    updateInvestigationCase,
    createInvestigationCase,
    getAllInvestigationCases,
    isLoading,
    error,
    success,
    setInvestigationCase
  };
};
