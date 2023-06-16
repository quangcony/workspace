import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import glucoseApi from "../api/glucoseApi";

export const useGlucose = () => {
  const [glucoses, setGlucoses] = useState([]);
  const [glucose, setGlucose] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllGlucoses();
  }, []);

  const getAllGlucoses = async () => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.getAllGlucoses();
      if (res.data) {
        setGlucoses(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getGlucoseById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.getGlucoseById(id);
      if (res.data) {
        setGlucose(res.data.elements.glucose);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createGlucose = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.createGlucose(data);
      if (res.data) {
        getAllGlucoses();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setGlucose(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateGlucose = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.updateGlucose(data, id);
      if (res.data) {
        getAllGlucoses();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setGlucose(undefined);
      }
    } catch (error) {
      // enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteGlucose = async (id) => {
    setIsLoading(true);
    try {
      let res = await glucoseApi.deleteGlucose(id);
      if (res.data) {
        getAllGlucoses();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    glucoses,
    glucose,
    getAllGlucoses,
    getGlucoseById,
    createGlucose,
    updateGlucose,
    deleteGlucose,
    setGlucose,
    isLoading,
    error,
  };
};
