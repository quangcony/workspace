import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import salaryApi from "../api/salaryApi";
import SalaryContractApi from "../api/salaryContractApi";
import { salaryContractSelectstate } from "../recoil/atom/salaryContractState";

export const useSalaryContract = () => {
    const [salaryContracts, setSalaryContracts] = useState([]);
    const [salaryContract, setSalaryContract] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();
    const setSalaryContractSelect =useSetRecoilState(salaryContractSelectstate)
    useEffect(() => {
        getAllSalaryContracts();
    }, []);

    const getAllSalaryContracts = async () => {
        setIsLoading(true);
        try {
            let res = await SalaryContractApi.getAllSalaryContracts();
            if (res.data) {
                setSalaryContracts(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            //   enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getSalaryContract = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await SalaryContractApi.getSalaryContract(id);
            if (res.data) {
                console.log("response:", res.data);
                setSalaryContract(res.data.elements);
                setSalaryContractSelect(res.data.elements)
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createSalaryContract = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await SalaryContractApi.createSalaryContract(data);
            if (res.data) {
                getAllSalaryContracts();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setSalaryContract(undefined);
            }
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateSalaryContract = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await SalaryContractApi.updateSalaryContract(data, id);
            if (res.data) {
                getAllSalaryContracts();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setSalaryContract(undefined);
            }
        } catch (error) {
            // enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteSalaryContract = async (id) => {
        setIsLoading(true);
        try {
            let res = await SalaryContractApi.deleteSalaryContract(id);
            if (res.data) {
                getAllSalaryContracts();
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
        salaryContracts,
        salaryContract,
        getAllSalaryContracts,
        getSalaryContract,
        createSalaryContract,
        updateSalaryContract,
        deleteSalaryContract,
        setSalaryContract,
        isLoading,
        error,
    };
};
