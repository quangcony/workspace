import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import healthHisApi from "../api/healthHisApi";
import { healthHistoryState } from "../recoil/atom/healthHistotyState";

export const useHealthHis = () => {
    const [healthHiss, setHealthHiss] = useState([]);
    const [healthHis, setHealthHis] = useState();
    const [healthHisNew, setHealthHisNew] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    const sethealthHistory = useSetRecoilState(healthHistoryState);

    useEffect(() => {
        getAllHealthHiss();
    }, []);
    const getAllHealthHiss = async () => {
        setIsLoading(true);
        try {
            let res = await healthHisApi.getAllHealthHiss();
            if (res.data) {
                setHealthHiss(res.data.elements);
                sethealthHistory(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getHealthHis = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await healthHisApi.getHealthHis(id);
            if (res.data) {
                setHealthHis(res.data.elements.healthHis);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    const createHealthHis = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await healthHisApi.createHealthHis(data);
            if (res.data) {
                getAllHealthHiss();
                setHealthHisNew(res.data.elements)
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setHealthHis(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    const updateHealthHis = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await healthHisApi.updateHealthHis(data, id);
            if (res.data) {
                getAllHealthHiss();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setHealthHis(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const deleteHealthHis = async (id) => {
        setIsLoading(true);
        try {
            let res = await healthHisApi.deleteHealthHis(id);
            if (res.data) {
                getAllHealthHiss();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return {
        healthHiss,
        healthHis,
        healthHisNew,
        getAllHealthHiss,
        getHealthHis,
        createHealthHis,
        updateHealthHis,
        deleteHealthHis,
        setHealthHis,
        isLoading,
        error,
    };
};
