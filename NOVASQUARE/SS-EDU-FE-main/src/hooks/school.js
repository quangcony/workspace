import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import schoolApi from "../api/schoolApi";
import { useSnackbar } from "notistack";

export const useSchool = () => {
  const [schools, setSchools] = useState([]);
  const [school, setSchool] = useState();
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

  useEffect(() => {
    getAllSchools();
  }, []);

  const getAllSchools = async () => {
    setIsLoading(true);
    try {
      let res = await schoolApi.getAllSchools();
        console.log("data :",res.data)
      if (res.data) {
        setSchools(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error:", error);
      setIsLoading(false);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const getSchool = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await schoolApi.getSchool( id);
      if (res.data) {
        setSchool(res.data.elements.school);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const createSchool = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await schoolApi.createSchool( data);
      if (res.data) {
        getAllSchools();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setSchool(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateSchool = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await schoolApi.updateSchool( data, id);
      if (res.data) {
        getAllSchools();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setSchool(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteSchool = async (id) => {
    setIsLoading(true);
    try {
      let res = await schoolApi.deleteSchool( id);
      if (res.data) {
        getAllSchools();
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
    schools,
    deleteSchool,
    school,
    getSchool,
    updateSchool,
    createSchool,
    getAllSchools,
    isLoading,
    error,
    success,
    setSchool
  };
};
