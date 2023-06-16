import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import bloodPressuresApi from "../api/bloodPressuresApi";

export const useBloodPressures = () => {
  const [bloodPressures, setBloodPressures] = useState([]);
  const [bloodPressure, setBloodPressure] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllBloodPressures();
  }, []);

  const getAllBloodPressures = async () => {
    setIsLoading(true);
    try {
      let res = await bloodPressuresApi.getAllBloodPressures();
      if (res.data) {
        setBloodPressures(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getBloodPressureById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodPressuresApi.getBloodPressureById(id);
      if (res.data) {
        setBloodPressure(res.data.elements.bloodPressure);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createBloodPressure = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodPressuresApi.createBloodPressure(data);
      if (res.data) {
        getAllBloodPressures();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setBloodPressure(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateBloodPressure = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodPressuresApi.updateBloodPressure(data, id);
      if (res.data) {
        getAllBloodPressures();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setBloodPressure(undefined);
      }
    } catch (error) {
      // enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteBloodPressure = async (id) => {
    setIsLoading(true);
    try {
      let res = await bloodPressuresApi.deleteBloodPressure(id);
      if (res.data) {
        getAllBloodPressures();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    bloodPressures,
    bloodPressure,
    getAllBloodPressures,
    getBloodPressureById,
    createBloodPressure,
    updateBloodPressure,
    deleteBloodPressure,
    setBloodPressure,
    isLoading,
    error,
  };
};
