import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import physicalClassificationApi from "../api/physicalClassificationApi";
import { useSetRecoilState } from "recoil";
import { useSnackbar } from "notistack";
import { physicalClassificationState } from "../recoil/atom/physicalClassificationState";

export const usePhysicalClassification = () => {
  const [physicalclassifications, setPhysicalclassifications] = useState([]);
  const [physicalclassification, setPhysicalclassification] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const setphysicalClassificationList = useSetRecoilState(physicalClassificationState)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllPhysicalClassifications();
  }, []);

  const getAllPhysicalClassifications = async () => {
    setIsLoading(true);
    try {
      let res = await physicalClassificationApi.getAllPhysicalClassification();
      if (res.data) {
        setPhysicalclassifications(res.data.elements);
        setphysicalClassificationList(res.data.elements);
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

  const getPhysicalClassification = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalClassificationApi.getPhysicalClassification(id);
      if (res.data) {
        setPhysicalclassification(res.data.elements.physicalClassification);
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
  const createPhysicalClassification = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalClassificationApi.createPhysicalClassification(data);
      if (res.data) {
        getAllPhysicalClassifications();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setPhysicalclassification(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updatePhysicalClassification = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await physicalClassificationApi.updatePhysicalClassification(data, id);
      if (res.data) {
        getAllPhysicalClassifications();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setPhysicalclassification(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deletePhysicalClassification = async (id) => {
    setIsLoading(true);
    try {
      let res = await physicalClassificationApi.deletePhysicalClassification(id);
      if (res.data) {
        getAllPhysicalClassifications();
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
    physicalclassifications,
    deletePhysicalClassification,
    physicalclassification,
    getPhysicalClassification,
    updatePhysicalClassification,
    createPhysicalClassification,
    getAllPhysicalClassifications,
    isLoading,
    error,
    success,
    setPhysicalclassification
  };
};
