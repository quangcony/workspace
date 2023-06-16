import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import unitApi from "../api/unitApi";
import { unitState } from "../recoil/atom/unitState";

export const useUnit = () => {
  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setUnitList = useSetRecoilState(unitState);

  useEffect(() => {
    getAllUnits();
  }, []);

  const getAllUnits = async () => {
    setIsLoading(true);
    try {
      let res = await unitApi.getAllUnits();
      if (res.data) {
        setUnits(res.data.elements);
        setUnitList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getUnitById = async (unitId, callback) => {
    setIsLoading(true);
    try {
      let res = await unitApi.getUnitById(unitId);
      if (res.data) {
        setUnit(res.data.elements.unit);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createUnit = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await unitApi.createUnit(data);
      if (res.data) {
        getAllUnits();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setUnit(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateUnit = async (data, unitId, callback) => {
    setIsLoading(true);
    try {
      let res = await unitApi.updateUnit(data, unitId);
      if (res.data) {
        getAllUnits();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setUnit(undefined);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteUnit = async (unitId) => {
    setIsLoading(true);
    try {
      let res = await unitApi.deleteUnit(unitId);
      if (res.data) {
        getAllUnits();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    units,
    unit,
    getAllUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit,
    setUnit,
    isLoading,
    error,
  };
};
