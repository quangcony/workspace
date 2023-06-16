import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import divisionApi from "../api/divisionApi";
import { useSetRecoilState } from "recoil";
import { divisionState } from "../recoil/atom/divisionState";

export const useDivision = () => {
  const [divisions, setDivisions] = useState([]);
  const [division, setDivision] = useState('');
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

  const setDivisionList = useSetRecoilState(divisionState)

  useEffect(() => {
    getAllDivisions();
  }, []);

  const getAllDivisions = async () => {
    setIsLoading(true);
    try {
      let res = await divisionApi.getAllDivisions();
      if (res.data) {
        setDivisions(res.data.elements);
        setDivisionList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getDivisionById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await divisionApi.getDivisionById(id);
      if (res.data) {
        setDivision(res.data.elements.division);
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

  const createDivision = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await divisionApi.createDivision(data);
      if (res.data) {
        getAllDivisions();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setDivisions(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateDivision = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await divisionApi.updateDivision(data, id);
      if (res.data) {
        getAllDivisions();
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

  const deleteDivision = async (id) => {
    setIsLoading(true);
    try {
      let res = await divisionApi.deleteDivision(id);
      if (res.data) {
        getAllDivisions();
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
    divisions,
    isLoading,
    error,
    success,
    setDivisions,
    createDivision,
    deleteDivision,
    getDivisionById,
    division,
    updateDivision,
    setDivision
  };
};
