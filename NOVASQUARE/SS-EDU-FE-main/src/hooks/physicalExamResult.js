import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import physicalExamResultApi from "../api/physicalExamResultApi";

export const usePhysicalExamResult = () => {
  const [physicalExamResults, setPhysicalExamResults] = useState([]);
  const [physicalExamResult, setPhysicalExamResult] = useState('');
  const [physicalExamResultNew, setPhysicalExamResultNew] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllPhysicalExamResults();
  }, []);

  const getAllPhysicalExamResults = async () => {
    setIsLoading(true);
    try {
      let res = await physicalExamResultApi.getAllPhysicalExamResults();
      if (res.data) {
        setPhysicalExamResults(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getphyPicalExamResultById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalExamResultApi.getphyPicalExamResultById(id);
      if (res.data) {
        setPhysicalExamResult(res.data.elements.physicalExamResult);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const createPhysicalExamResult = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalExamResultApi.createPhysicalExamResult(data);
      if (res.data) {
        getAllPhysicalExamResults();
        setPhysicalExamResultNew(res.data.elements)
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
        callback();
        setPhysicalExamResults(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      setIsLoading(false);
    }
  };

  const updatePhysicalExamResult = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalExamResultApi.updatePhysicalExamResult(data, id);
      if (res.data) {
        getAllPhysicalExamResults();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
        callback();
      }
    } catch (error) {
      setSuccess(undefined);
      setIsLoading(false);
    }
  };

  const deletePhysicalExamResult = async (id) => {
    setIsLoading(true);
    try {
      let res = await physicalExamResultApi.deletePhysicalExamResult(id);
      if (res.data) {
        getAllPhysicalExamResults();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(undefined);
      setIsLoading(false);
    }
  };



  return {
    physicalExamResults,
    physicalExamResultNew,
    isLoading,
    error,
    success,
    setPhysicalExamResults,
    createPhysicalExamResult,
    deletePhysicalExamResult,
    getphyPicalExamResultById,
    physicalExamResult,
    updatePhysicalExamResult,
    setPhysicalExamResult
  };
};
