import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import bloodLipidApi from "../api/bloodLipidApi";

export const useBloodLipid = () => {
  const [bloodLipids, setBloodLipids] = useState([]);
  const [bloodLipid, setBloodLipid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllBloodLipids();
  }, []);

  const getAllBloodLipids = async () => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.getAllBloodLipids();
      if (res.data) {
        setBloodLipids(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getBloodLipidById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.getBloodLipidById(id);
      if (res.data) {
        setBloodLipid(res.data.elements.bloodLipid);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createBloodLipid = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.createBloodLipid(data);
      if (res.data) {
        getAllBloodLipids();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setBloodLipid(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateBloodLipid = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.updateBloodLipid(data, id);
      if (res.data) {
        getAllBloodLipids();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setBloodLipid(undefined);
      }
    } catch (error) {
      // enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteBloodLipid = async (id) => {
    setIsLoading(true);
    try {
      let res = await bloodLipidApi.deleteBloodLipid(id);
      if (res.data) {
        getAllBloodLipids();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    bloodLipids,
    bloodLipid,
    getAllBloodLipids,
    getBloodLipidById,
    createBloodLipid,
    updateBloodLipid,
    deleteBloodLipid,
    setBloodLipid,
    isLoading,
    error,
  };
};
