import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import districtApi from "../api/districtApi";
import { useSetRecoilState } from "recoil";
import { districtState } from "../recoil/atom/districtState";

export const useDistrict = () => {
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setDistrictList = useSetRecoilState(districtState);

  useEffect(() => {
    getAllDistricts();
  }, []);

  const getAllDistricts = async () => {
    setIsLoading(true);
    try {
      let res = await districtApi.getAllDistricts();
      if (res.data) {
        setDistricts(res.data.elements);
        setDistrictList(res.data.elements)
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };

  const getDistrict = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await districtApi.getDistrict(id);
      if (res.data) {
        console.log("response:", res.data);
        setDistrict(res.data.elements.district);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createDistrict = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await districtApi.createDistrict(data);
      if (res.data) {
        getAllDistricts();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setDistrict(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateDistrict = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await districtApi.updateDistrict(data, id);
      if (res.data) {
        getAllDistricts();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setDistrict(undefined);
      }
    } catch (error) {

      enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteDistrict = async (id) => {
    setIsLoading(true);
    try {
      let res = await districtApi.deleteDistrict(id);
      if (res.data) {
        getAllDistricts();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      // enqueueSnackbar("Request failed !", { variant: "error" })
      setIsLoading(false);
    }
  };



  return {
    districts,
    district,
    getAllDistricts,
    getDistrict,
    createDistrict,
    updateDistrict,
    deleteDistrict,
    setDistrict,
    isLoading,
    error,
  };
};
