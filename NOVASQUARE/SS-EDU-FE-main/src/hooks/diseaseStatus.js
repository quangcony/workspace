import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import diseaseStatusApi from "../api/diseaseStatusApi";
import { diseasesStatusState } from "../recoil/atom/diseaseStatusState";

export const useDiseaseStatus = () => {
  const [diseasesStatus, setDiseasesStatus] = useState([]);
  const [diseaseStatusNew, setDiseaseStatusNew] = useState([]);
  // const [userstatus, setUserStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const setDiseaseStatus = useSetRecoilState(diseasesStatusState);

  useEffect(() => {
    getAllDiseaseStatus();
  }, []);

  const getAllDiseaseStatus = async () => {
    setIsLoading(true);
    try {
      let res = await diseaseStatusApi.getAllDiseaseStatus();
      if (res.data) {
        setDiseasesStatus(res.data.elements);
        setDiseaseStatus(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const createDiseaseStatus = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await diseaseStatusApi.createDiseaseStatus(data);
      if (res.data) {
        getAllDiseaseStatus();
        setSuccess(res.data.message);
        setDiseaseStatusNew(res.data.elements);
        setError(undefined);
        setIsLoading(false);
        callback();
      }
    } catch (error) {
      setSuccess(undefined);
      setIsLoading(false);
    }
  };
  // const getUserStatus = async (id, callback) => {
  //   setIsLoading(true);
  //   try {
  //     let res = await userStatusApi.getUserStatus( id);
  //     if (res.data) {
  //       setUserStatus(res.data.elements.userstatus);
  //       callback();
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //           if (error?.response?.data.status !== 401) {
  //       enqueueSnackbar(error.response.data.message, { variant: "error" });
  //     }
  //   }
  // };




  return {
    diseasesStatus,
    isLoading,
    error,
    success,
    setDiseasesStatus,
    createDiseaseStatus,
    diseaseStatusNew,
    getAllDiseaseStatus
  };
};
