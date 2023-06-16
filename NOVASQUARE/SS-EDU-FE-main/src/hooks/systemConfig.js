import { useEffect, useState } from "react";
import systemConfigApi from "../api/systemConfigApi";
import { useSnackbar } from "notistack";

export const useSystemConfig = () => {
    const [systemConfigs, setSystemConfigs] = useState();
    const [systemConfig, setSystemConfig] = useState();
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
        getAllSystemConfigs();
    }, []);

    const getAllSystemConfigs = async () => {
        setIsLoading(true);
        try {
            let res = await systemConfigApi.getAllSystemConfigs();
            if (res.data) {
                setSystemConfigs(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error?.response?.data.status !== 401) {
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }
        }
    };

    const getSystemConfig = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await systemConfigApi.getSystemConfig(id);
            if (res.data) {
                setSystemConfig(res.data.elements.systemconfig);
                setIsLoading(false);
                callback();
            }
        } catch (error) {
            if (error?.response?.data.status !== 401) {
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }
            setIsLoading(false);
        }
    };
    const createSystemConfig = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await systemConfigApi.createSystemConfig(data);
            if (res.data) {
                getAllSystemConfigs();
                enqueueSnackbar(res.data.message, { variant: "success" });
                setError(undefined);
                setIsLoading(false);
                callback();
                setSystemConfig(undefined);
            }
        } catch (error) {
            setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }
            setIsLoading(false);
        }
    };
    const updateSystemConfig = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await systemConfigApi.updateSystemConfig(data, id);
            if (res.data) {
                getAllSystemConfigs();
                setSuccess(res.data.message);
                setError(undefined);
                setIsLoading(false);
                callback();
                setSystemConfig(undefined);
            }
        } catch (error) {
            setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }
            setIsLoading(false);
            callback();
        }
    };
    const deleteSystemConfig = async (id) => {
        setIsLoading(true);
        try {
            let res = await systemConfigApi.deleteSystemConfig(id);
            if (res.data) {
                getAllSystemConfigs();
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
        // logout,
        // login,
        systemConfigs,
        deleteSystemConfig,
        systemConfig,
        getSystemConfig,
        setSystemConfig,
        updateSystemConfig,
        createSystemConfig,
        getAllSystemConfigs,
        isLoading,
        error,
        success
    };
};
