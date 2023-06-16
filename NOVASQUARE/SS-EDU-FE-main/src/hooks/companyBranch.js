import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import companyBranchApi from "../api/companyBranchApi";

export const useCompanyBranch = () => {
  const [companyBranches, setCompanyBranches] = useState([]);
  const [companyBranch, setCompanyBranch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllCompanyBranches();
  }, []);

  const getAllCompanyBranches = async () => {
    setIsLoading(true);
    try {
      let res = await companyBranchApi.getAllCompanyBranches();
      if (res.data) {
        setCompanyBranches(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getCompanyBranchById = async (companyBranchId, callback) => {
    setIsLoading(true);
    try {
      let res = await companyBranchApi.getCompanyBranchById(companyBranchId);
      if (res.data) {
        setCompanyBranch(res.data.elements.companyBranch);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createCompanyBranch = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await companyBranchApi.createCompanyBranch(data);
      if (res.data) {
        getAllCompanyBranches();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setCompanyBranch(undefined);
      }
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateCompanyBranch = async (data, companyBranchId, callback) => {
    setIsLoading(true);
    try {
      let res = await companyBranchApi.updateCompanyBranch(data, companyBranchId);
      if (res.data) {
        getAllCompanyBranches();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setCompanyBranch(undefined);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };

  const deleteCompanyBranch = async (companyBranchId) => {
    setIsLoading(true);
    try {
      let res = await companyBranchApi.deleteCompanyBranch(companyBranchId);
      if (res.data) {
        getAllCompanyBranches();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    companyBranches,
    companyBranch,
    getAllCompanyBranches,
    getCompanyBranchById,
    createCompanyBranch,
    updateCompanyBranch,
    deleteCompanyBranch,
    setCompanyBranch,
    isLoading,
    error,
  };
};
