import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import areaApi from "../api/areaApi";
import { useSetRecoilState } from "recoil";
import { areaState } from "../recoil/atom/areaState";

export const useArea = () => {
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaId] = useState('');
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

  const setAreaList = useSetRecoilState(areaState);

  useEffect(() => {
    getAllArea();
  }, []);

  const getAllArea = async () => {
    setIsLoading(true);
    try {
      let res = await areaApi.getAllAreas();
      if (res.data) {
        setAreas(res.data.elements);
        setAreaList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getAreaById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await areaApi.getAreaById(id);
      if (res.data) {
        setAreaId(res.data.elements.area);
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

  const createArea = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await areaApi.createArea(data);
      if (res.data) {
        getAllArea();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setAreas(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateArea = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await areaApi.updateArea(data, id);
      if (res.data) {
        getAllArea();
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

  const deleteArea = async (id) => {
    setIsLoading(true);
    try {
      let res = await areaApi.deleteArea(id);
      if (res.data) {
        getAllArea();
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
    areas,
    isLoading,
    error,
    success,
    setAreas,
    createArea,
    deleteArea,
    getAreaById,
    areaId,
    updateArea,
    setAreaId
  };
};
