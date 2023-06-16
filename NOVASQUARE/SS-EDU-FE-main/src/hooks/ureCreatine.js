import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ureCreatineApi from "../api/ureCreatineApi";

export const useUreCreatine = () => {
  const [ureCreatines, setUreCreatines] = useState([]);
  const [ureCreatine, setUreCreatine] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllureCreatines();
  }, []);

  const getAllureCreatines = async () => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.getAllureCreatines();
      if (res.data) {
        setUreCreatines(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getUreCreatineById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.getUreCreatineById(id);
      if (res.data) {
        setUreCreatine(res.data.elements.ureCreatine);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createUreCreatine = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.createUreCreatine(data);
      if (res.data) {
        getAllureCreatines();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setUreCreatine(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateUreCreatine = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.updateUreCreatine(data, id);
      if (res.data) {
        getAllureCreatines();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setUreCreatine(undefined);
      }
    } catch (error) {
      // enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteUreCreatine = async (id) => {
    setIsLoading(true);
    try {
      let res = await ureCreatineApi.deleteUreCreatine(id);
      if (res.data) {
        getAllureCreatines();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    ureCreatines,
    ureCreatine,
    getAllureCreatines,
    getUreCreatineById,
    createUreCreatine,
    updateUreCreatine,
    deleteUreCreatine,
    setUreCreatine,
    isLoading,
    error,
  };
};
