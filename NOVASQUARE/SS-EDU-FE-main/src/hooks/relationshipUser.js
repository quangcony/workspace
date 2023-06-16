import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import relationshipUserApi from "../api/relationshipUserApi";

export const useRelationshipUser = () => {
  const [relationships, setRelationshipUsers] = useState([]);
  const [relationshipId, setRelationshipId] = useState('');
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
    getAllRelationshipUsers();
  }, []);

  const getAllRelationshipUsers = async () => {
    setIsLoading(true);
    try {
      let res = await relationshipUserApi.getAllRelationshipUsers();
      if (res.data) {
        setRelationshipUsers(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const getRelationshipUserById = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await relationshipUserApi.getRelationshipUserById(id);
      if (res.data) {
        setRelationshipId(res.data.elements.userRelationship);
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

  const createRelationshipUser = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await relationshipUserApi.createRelationshipUser(data);
      if (res.data) {
        getAllRelationshipUsers();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setRelationshipUsers(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error.response.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateRelationshipUser = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await relationshipUserApi.updateRelationshipUser(data, id);
      if (res.data) {
        getAllRelationshipUsers();
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

  const deleteRelationshipUser = async (id) => {
    setIsLoading(true);
    try {
      let res = await relationshipUserApi.deleteRelationshipUser(id);
      if (res.data) {
        getAllRelationshipUsers();
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
    relationships,
    isLoading,
    error,
    success,
    setRelationshipUsers,
    createRelationshipUser,
    deleteRelationshipUser,
    getRelationshipUserById,
    relationshipId,
    updateRelationshipUser,
    setRelationshipId
  };
};
