import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import employeeStatusApi from "../api/employeeStatusApi";

export const useEmployeeStatus = () => {
    const [employeeStatuses, setEmployeeStatuses] = useState([]);
    const [employeeStatus, setEmployeeStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllEmployeeStatuses();
    }, []);

    const getAllEmployeeStatuses = async () => {
        setIsLoading(true);
        try {
            let res = await employeeStatusApi.getAllEmployeeStatuses();
            if (res.data) {
                setEmployeeStatuses(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getEmployeeStatus = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeStatusApi.getEmployeeStatus(id);
            if (res.data) {
                console.log("response:", res.data);
                setEmployeeStatus(res.data.elements.employeeStatus);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createEmployeeStatus = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeStatusApi.createEmployeeStatus(data);
            if (res.data) {
                getAllEmployeeStatuses();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setEmployeeStatus(undefined);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateEmployeeStatus = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeStatusApi.updateEmployeeStatus(data, id);
            if (res.data) {
                getAllEmployeeStatuses();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setEmployeeStatus(undefined);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteEmployeeStatus = async (id) => {
        setIsLoading(true);
        try {
            let res = await employeeStatusApi.deleteEmployeeStatus(id);
            if (res.data) {
                getAllEmployeeStatuses();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
        }
    };

    return {
        employeeStatuses,
        employeeStatus,
        getAllEmployeeStatuses,
        getEmployeeStatus,
        createEmployeeStatus,
        updateEmployeeStatus,
        deleteEmployeeStatus,
        setEmployeeStatus,
        isLoading,
        error,
    };
};
