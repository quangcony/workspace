import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import specialExamApi from "../api/specialExamApi";
import { newestSpecialExamState } from "../recoil/atom/specialExamState";

export const useSpecialExam = () => {
  const [specialExams, setSpecialExams] = useState([]);
  const [specialExam, setSpecialExam] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setNewSpecialExam = useSetRecoilState(newestSpecialExamState);

  useEffect(() => {
    getAllSpecialExams();
  }, []);

  const getAllSpecialExams = async () => {
    setIsLoading(true);
    try {
      let res = await specialExamApi.getAllSpecialExam();
      if (res.data) {
        setSpecialExams(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const getSpecialExam = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await specialExamApi.getSpecialExam(id);
      if (res.data) {
        setSpecialExam(res.data.elements.SpecialExam);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createSpecialExam = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await specialExamApi.createSpecialExam(data);
      if (res.data) {
        getAllSpecialExams();
        setNewSpecialExam(res.data.elements);
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setSpecialExam(undefined);
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setSuccess(undefined);
      // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const updateSpecialExam = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await specialExamApi.updateSpecialExam(data, id);
      if (res.data) {
        getAllSpecialExams();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setSpecialExam(undefined);
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      setSuccess(undefined);
      // enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };
  const deleteSpecialExam = async (id) => {
    setIsLoading(true);
    try {
      let res = await specialExamApi.deleteSpecialExam(id);
      if (res.data) {
        getAllSpecialExams();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(undefined);
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return {
    specialExams,
    deleteSpecialExam,
    specialExam,
    getSpecialExam,
    updateSpecialExam,
    createSpecialExam,
    getAllSpecialExams,
    isLoading,
    error,
    success,
    setSpecialExam,
  };
};
