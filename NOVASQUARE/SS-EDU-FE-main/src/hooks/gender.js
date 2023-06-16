import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import genderApi from "../api/genderApi";
import { useSetRecoilState } from "recoil";
import { genderState } from "../recoil/atom/genderState";

export const useGender = () => {
  const [genders, setGenders] = useState([]);
  const [genderId, setGenderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setGenderList = useSetRecoilState(genderState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllGender();
  }, []);

  const getAllGender = async () => {
    setIsLoading(true);
    try {
      let res = await genderApi.getAllGenders();
      if (res.data) {
        setGenders(res.data.elements);
        setGenderList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getGenderById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await genderApi.getGenderById(id);
      if (res.data) {
        setGenderId(res.data.elements.gender);
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

  const createGender = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await genderApi.createGender(data);
      if (res.data) {
        getAllGender();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setGenders(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateGender = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await genderApi.updateGender(data, id);
      if (res.data) {
        getAllGender();
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

  const deleteGender = async (id) => {
    setIsLoading(true);
    try {
      let res = await genderApi.deleteGender(id);
      if (res.data) {
        getAllGender();
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
    genders,
    isLoading,
    error,
    success,
    setGenders,
    createGender,
    deleteGender,
    getGenderById,
    genderId,
    updateGender,
    setGenderId
  };
};
