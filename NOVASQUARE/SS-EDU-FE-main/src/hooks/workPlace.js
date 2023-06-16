import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import workPlaceApi from "../api/workPlaceApi";
import { useSetRecoilState } from "recoil";
import { workPlacesState } from "../recoil/atom/workPlaceState";

export const useWorkPlace = () => {
  const [workPlaces, setWorkPlaces] = useState([]);
  const [workPlace, setWorkPlace] = useState('');
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

  const setWorkPlaceList = useSetRecoilState(workPlacesState)

  useEffect(() => {
    getAllWorkPlaces();
  }, []);

  const getAllWorkPlaces = async () => {
    setIsLoading(true);
    try {
      let res = await workPlaceApi.getAllWorkPlaces();
      if (res.data) {
        setWorkPlaces(res.data.elements);
        setWorkPlaceList(res.data.elements)
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getWorkPlaceById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await workPlaceApi.getWorkPlaceById(id);
      if (res.data) {
        setWorkPlace(res.data.elements.workplace);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const createWorkPlace = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await workPlaceApi.createWorkPlace(data);
      if (res.data) {
        getAllWorkPlaces();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setWorkPlaces(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateWorkPlace = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await workPlaceApi.updateWorkPlace(data, id);
      if (res.data) {
        getAllWorkPlaces();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const deleteWorkPlace = async (id) => {
    setIsLoading(true);
    try {
      let res = await workPlaceApi.deleteWorkPlace(id);
      if (res.data) {
        getAllWorkPlaces();
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
    workPlaces,
    isLoading,
    error,
    success,
    setWorkPlaces,
    createWorkPlace,
    deleteWorkPlace,
    getWorkPlaceById,
    workPlace,
    updateWorkPlace,
    setWorkPlace
  };
};
