import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import salaryApi from "../api/salaryApi";
import { salarySelect, salarySelectstate } from "../recoil/atom/salaryState";

export const useSalary = () => {
    const [salarys, setSalarys] = useState([]);
    const [salary, setSalary] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();
    const setSalarySelect = useSetRecoilState(salarySelectstate)
    useEffect(() => {
        getAllSalarys();
    }, []);

    const getAllSalarys = async () => {
        setIsLoading(true);
        try {
            let res = await salaryApi.getAllSalarys();
            if (res.data) {
                setSalarys(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            //   enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getSalary = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await salaryApi.getSalary(id);
            if (res.data) {
                console.log("response:", res.data);
                setSalary(res.data.elements);
                setSalarySelect(res.data.elements)
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createSalary = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await salaryApi.createSalary(data);
            if (res.data) {
                getAllSalarys();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setSalary(undefined);
            }
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateSalary = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await salaryApi.updateSalary(data, id);
            if (res.data) {
                getAllSalarys();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setSalary(undefined);
            }
        } catch (error) {
            // enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteSalary = async (id) => {
        setIsLoading(true);
        try {
            let res = await salaryApi.deleteSalary(id);
            if (res.data) {
                getAllSalarys();
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
        salarys,
        salary,
        getAllSalarys,
        getSalary,
        createSalary,
        updateSalary,
        deleteSalary,
        setSalary,
        isLoading,
        error,
    };
};
