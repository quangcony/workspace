import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import cityApi from "../api/cityApi";
import { cityState } from "../recoil/atom/cityState";

export const useCity = () => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setCityList = useSetRecoilState(cityState);

  useEffect(() => {
    getAllCities();
  }, []);

  const getAllCities = async () => {
    setIsLoading(true);
    try {
      let res = await cityApi.getAllCities();
      if (res.data) {
        setCities(res.data.elements);
        setCityList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };

  const getCity = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await cityApi.getCity(id);
      if (res.data) {
        console.log("response:", res.data);
        setCity(res.data.elements.city);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createCity = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await cityApi.createCity(data);
      if (res.data) {
        getAllCities();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setCity(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateCity = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await cityApi.updateCity(data, id);
      if (res.data) {
        getAllCities();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setCity(undefined);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    setIsLoading(true);
    try {
      let res = await cityApi.deleteCity(id);
      if (res.data) {
        getAllCities();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      enqueueSnackbar("Request failed !", { variant: "error" })
      setIsLoading(false);
    }
  };

  return {
    cities,
    city,
    getAllCities,
    getCity,
    createCity,
    updateCity,
    deleteCity,
    setCity,
    isLoading,
    error,
  };
};
