import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import orgApi from "../api/orgApi";
import { useSnackbar } from "notistack";

export const useOrg = () => {
  const [org, setOrg] = useState();
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

  const getAllOrgs = async () => {
    setIsLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        let res = await orgApi.getAllOrgs();
        if (res.data) {
          setIsLoading(false);
          resolve(res.data.elements);
        } else {
          resolve([]);
        }
      } catch (error) {
        setIsLoading(false);
        reject(error);
      }
    });
  };
  const getOrg = async (id, callback) => {
    setIsLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        let res = await orgApi.getOrg(id);
        if (res.data) {
          setIsLoading(false);
          setOrg(res.data.elements.org);
          resolve(res.data.elements.org);
          callback();
        }
      } catch (error) {
        setIsLoading(false);
        // if (error?.response?.data.status !== 401) {
        //   enqueueSnackbar(error.response.data.message, { variant: "error" });
        // }
        reject(error);
      }
    });
  };
  const getOrgByDomain = async (domain) => {
    setIsLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        let res = await orgApi.getOrgByDomain(domain);
        if (res.data) {
          setIsLoading(false);
          resolve(res.data.elements.org);
        } else {
          setIsLoading(false);
          resolve(undefined);
        }
      } catch (error) {
        setIsLoading(false);
        reject(error);
      }
    });
  };
  const getOrgByDefault = async () => {
    setIsLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        let res = await orgApi.getOrgDefault();
        if (res.data) {
          setIsLoading(false);
          resolve(res.data.elements.org);
        } else {
          setIsLoading(false);
          resolve(undefined);
        }
      } catch (error) {
        setIsLoading(false);
        reject(error);
      }
    });
  };
  const createOrg = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await orgApi.createOrg(data);
      if (res.data) {
        getAllOrgs();
        enqueueSnackbar(res.data.message, { variant: "success" });
        setError(undefined);
        setIsLoading(false);
        callback();
        setOrg(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const updateOrg = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await orgApi.updateOrg(data, id);
      if (res.data) {
        enqueueSnackbar(res.data.message, { variant: "success" });
        getAllOrgs();

        setError(undefined);
        setIsLoading(false);
        callback();
        setOrg(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteOrg = async (id) => {
    setIsLoading(true);
    try {
      let res = await orgApi.deleteOrg(id);
      if (res.data) {
        getAllOrgs();
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
    getAllOrgs,
    deleteOrg,
    org,
    getOrg,
    updateOrg,
    createOrg,
    isLoading,
    error,
    success,
    setOrg,
    getOrgByDomain,
    getOrgByDefault,
    getAllOrgs,
  };
};
