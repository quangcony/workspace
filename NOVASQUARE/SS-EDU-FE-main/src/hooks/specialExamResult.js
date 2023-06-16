import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import specialExamResultApi from "../api/specialExamResultApi";
import { specialExamResultState } from "../recoil/atom/specialExamResultState";

export const useSpecialExamResult = () => {
  const [specialExamResults, setSpecialExamResults] = useState([]);
  const [specialExamResult, setSpecialExamResult] = useState();
  const [specialExamResultNew, setSpecialExamResultNew] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setResultList = useSetRecoilState(specialExamResultState)

  useEffect(() => {
    getAllSpecialExamResults();
  }, []);

  const getAllSpecialExamResults = async () => {
    setIsLoading(true);
    try {
      let res = await specialExamResultApi.getAllSpecialExamResult();
      if (res.data) {
        setSpecialExamResults(res.data.elements);
        setResultList(res.data.elements);
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
  const getSpecialExamResult = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await specialExamResultApi.getSpecialExamResult(id);
      if (res.data) {
        setSpecialExamResult(res.data.elements.SpecialExamResult);
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
  const createSpecialExamResult = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await specialExamResultApi.createSpecialExamResult(data);
      if (res.data) {
        getAllSpecialExamResults();
        setSpecialExamResultNew(res.data.elements);
        setSuccess(res.data.message);
        enqueueSnackbar(res.data.message, { variant: "success" });
        setError(undefined);
        setIsLoading(false);
        callback();
        setSpecialExamResult(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateSpecialExamResult = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await specialExamResultApi.updateSpecialExamResult(data, id);
      if (res.data) {
        getAllSpecialExamResults();
        setSuccess(res.data.message);
        enqueueSnackbar(res.data.message, { variant: "success" });
        setError(undefined);
        setIsLoading(false);
        callback();
        setSpecialExamResult(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteSpecialExamResult = async (id) => {
    setIsLoading(true);
    try {
      let res = await specialExamResultApi.deleteSpecialExamResult(id);
      if (res.data) {
        getAllSpecialExamResults();
        setSuccess(res.data.message);
        enqueueSnackbar(res.data.message, { variant: "success" });
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
    specialExamResults,
    specialExamResultNew,
    deleteSpecialExamResult,
    specialExamResult,
    getSpecialExamResult,
    updateSpecialExamResult,
    createSpecialExamResult,
    getAllSpecialExamResults,
    isLoading,
    error,
    success,
    setSpecialExamResult,
    setSpecialExamResults,
  };
};
