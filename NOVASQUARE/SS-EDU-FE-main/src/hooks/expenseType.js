import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import employeeStatusApi from "../api/employeeStatusApi";
import expenseTypeApi from "../api/expenseTypeApi";

export const useExpenseType = () => {
    const [expenseTypes, setExpenseTypes] = useState([]);
    const [expenseType, setExpenseType] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllExpenseTypes();
    }, []);

    const getAllExpenseTypes = async () => {
        setIsLoading(true);
        try {
            let res = await expenseTypeApi.getAllExpenseTypes();
            if (res.data) {
                setExpenseTypes(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getExpenseType = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await expenseTypeApi.getExpenseTypeById(id);
            if (res.data) {
                console.log("response:", res.data);
                setExpenseType(res.data.elements.expenseType);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createExpenseType = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await expenseTypeApi.createExpenseType(data);
            if (res.data) {
                getAllExpenseTypes();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setExpenseType(undefined);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateExpenseType = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await expenseTypeApi.updateExpenseType(data, id);
            if (res.data) {
                getAllExpenseTypes();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setExpenseType(undefined);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteExpenseType = async (id) => {
        setIsLoading(true);
        try {
            let res = await expenseTypeApi.deleteExpenseType(id);
            if (res.data) {
                getAllExpenseTypes();
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
        expenseTypes,
        expenseType,
        getAllExpenseTypes,
        getExpenseType,
        createExpenseType,
        updateExpenseType,
        deleteExpenseType,
        setExpenseType,
        isLoading,
        error,
    };
};
