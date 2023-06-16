import axiosApiInstance from "../utils/axiosClient";

const employeeBankApi = {
    getAllEmployeeBanks: () => {
        const path = `/employeeBank/getAll`;
        return axiosApiInstance.get(path);
    },
    getEmployeeBank: (id) => {
        const path = `/employeeBank/getEmployeeBank/${id}`;
        return axiosApiInstance.get(path);
    },
    createEmployeeBank: (data) => {
        const path = `/employeeBank/createEmployeeBank`;
        return axiosApiInstance.post(path, data);
    },
    updateEmployeeBank: (data, id) => {
        const path = `/employeeBank/updateEmployeeBank/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteEmployeeBank: (id) => {
        const path = `/employeeBank/deleteEmployeeBank/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default employeeBankApi;
