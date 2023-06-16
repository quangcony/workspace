import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import employeeBankApi from "../api/employeeBankApi";

export const useEmployeeBank = () => {
    const [employeeBanks, setEmployeeBanks] = useState([]);
    const [employeeBank, setEmployeeBank] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllEmployeeBanks();
    }, []);

    const getAllEmployeeBanks = async () => {
        setIsLoading(true);
        try {
            let res = await employeeBankApi.getAllEmployeeBanks();
            if (res.data) {
                setEmployeeBanks(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getEmployeeBank = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeBankApi.getEmployeeBank(id);
            if (res.data) {
                console.log("response:", res.data);
                setEmployeeBank(res.data.elements.employeeBank);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createEmployeeBank = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeBankApi.createEmployeeBank(data);
            if (res.data) {
                getAllEmployeeBanks();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setEmployeeBank(undefined);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateEmployeeBank = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeBankApi.updateEmployeeBank(data, id);
            if (res.data) {
                getAllEmployeeBanks();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setEmployeeBank(undefined);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteEmployeeBank = async (id) => {
        setIsLoading(true);
        try {
            let res = await employeeBankApi.deleteEmployeeBank(id);
            if (res.data) {
                getAllEmployeeBanks();
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
        employeeBanks,
        employeeBank,
        getAllEmployeeBanks,
        getEmployeeBank,
        createEmployeeBank,
        updateEmployeeBank,
        deleteEmployeeBank,
        setEmployeeBank,
        isLoading,
        error,
    };
};
