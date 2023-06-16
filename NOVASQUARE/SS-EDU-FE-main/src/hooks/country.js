import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import countryApi from "../api/countryApi";
import { useSetRecoilState } from "recoil";
import { countryState } from "../recoil/atom/countryState";

export const useCountry = () => {
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setCountryList = useSetRecoilState(countryState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    setIsLoading(true);
    try {
      let res = await countryApi.getAllCountries();
      if (res.data) {
        setCountries(res.data.elements);
        setCountryList(res.data.elements)
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getCountryById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await countryApi.getCountry(id);
      if (res.data) {
        setCountryId(res.data.elements.country);
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

  const createCountry = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await countryApi.createCountry(data);
      if (res.data) {
        getAllCountries();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setCountries(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateCountry = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await countryApi.updateCountry(data, id);
      if (res.data) {
        getAllCountries();
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

  const deleteCountry = async (id) => {
    setIsLoading(true);
    try {
      let res = await countryApi.deleteCountry(id);
      if (res.data) {
        getAllCountries();
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
    countries,
    isLoading,
    error,
    success,
    setCountries,
    createCountry,
    deleteCountry,
    getCountryById,
    countryId,
    updateCountry,
    setCountryId
  };
};
