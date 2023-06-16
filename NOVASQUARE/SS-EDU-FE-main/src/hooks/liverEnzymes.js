import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import liverEnzymeApi from "../api/liverEnzymeApi";

export const useLiverEnzymes = () => {
  const [liverEnzymes, LiverEnzymes] = useState([]);
  const [liverEnzyme, setLiverEnzyme] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllLiverEnzymes();
  }, []);

  const getAllLiverEnzymes = async () => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.getAllLiverEnzymes();
      if (res.data) {
        LiverEnzymes(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getLiverEnzymesById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.getLiverEnzymesById(id);
      if (res.data) {
        setLiverEnzyme(res.data.elements.liverEnzyme);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createLiverEnzymes = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.createLiverEnzymes(data);
      if (res.data) {
        getAllLiverEnzymes();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setLiverEnzyme(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateLiverEnzymes = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.updateLiverEnzymes(data, id);
      if (res.data) {
        getAllLiverEnzymes();
        // enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setLiverEnzyme(undefined);
      }
    } catch (error) {
      // enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteLiverEnzymes = async (id) => {
    setIsLoading(true);
    try {
      let res = await liverEnzymeApi.deleteLiverEnzymes(id);
      if (res.data) {
        getAllLiverEnzymes();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    liverEnzymes,
    liverEnzyme,
    getAllLiverEnzymes,
    getLiverEnzymesById,
    createLiverEnzymes,
    updateLiverEnzymes,
    deleteLiverEnzymes,
    setLiverEnzyme,
    isLoading,
    error,
  };
};
