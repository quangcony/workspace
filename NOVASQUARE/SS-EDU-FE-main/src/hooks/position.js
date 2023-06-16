import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import positionApi from "../api/positionApi";
import { useSetRecoilState } from "recoil";
import { positionState } from "../recoil/atom/positionState";

export const usePosition = () => {
  const [positions, setPositions] = useState([]);
  const [positionId, setPositionId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setPositionList = useSetRecoilState(positionState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);

  useEffect(() => {
    getAllPosition();
  }, []);

  const getAllPosition = async () => {
    setIsLoading(true);
    try {
      let res = await positionApi.getAllPosition();
      if (res.data) {
        setPositions(res.data.elements);
        setPositionList(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getPositionById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await positionApi.getPositionById(id);
      if (res.data) {
        setPositionId(res.data.elements.position);
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

  const createPosition = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await positionApi.createPosition(data);
      if (res.data) {
        getAllPosition();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setPositions(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updatePosition = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await positionApi.updatePosition(data, id);
      if (res.data) {
        getAllPosition();
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

  const deletePosition = async (id) => {
    setIsLoading(true);
    try {
      let res = await positionApi.deletePosition(id);
      if (res.data) {
        getAllPosition();
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
    positions,
    isLoading,
    error,
    success,
    setPositions,
    createPosition,
    deletePosition,
    getPositionById,
    positionId,
    setPositionId,
    updatePosition
  };
};
