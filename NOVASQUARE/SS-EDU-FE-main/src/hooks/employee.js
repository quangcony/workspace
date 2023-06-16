import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import employeeApi from "../api/employeeApi";
import { employeeState } from "../recoil/atom/employeeState";

export const useEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    const setEmployeeList = useSetRecoilState(employeeState)

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = async () => {
        setIsLoading(true);
        try {
            let res = await employeeApi.getAllEmployees();
            if (res.data) {
                setEmployees(res.data.elements);
                setEmployeeList(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            //   enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getEmployee = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeApi.getEmployee(id);
            if (res.data) {
                setEmployee(res.data.elements.employee);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" });
        }
    };
    const createEmployee = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeApi.createEmployee(data);
            if (res.data) {
                getAllEmployees();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setEmployee(undefined);
            }
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateEmployee = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await employeeApi.updateEmployee(data, id);
            if (res.data) {
                getAllEmployees();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setEmployee(undefined);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteEmployee = async (id) => {
        setIsLoading(true);
        try {
            let res = await employeeApi.deleteEmployee(id);
            if (res.data) {
                getAllEmployees();
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
        employees,
        employee,
        getAllEmployees,
        getEmployee,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        setEmployee,
        isLoading,
        error,
    };
};
