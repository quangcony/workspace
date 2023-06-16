import axiosApiInstance from "../utils/axiosClient";

const employeeContractTypeApi = {
    getAllEmployeeContractTypes: () => {
        const path = `/employeeContractType/getAll`;
        return axiosApiInstance.get(path);
    },
    getEmployeeContractTypeById: (id) => {
        const path = `/employeeContractType/getEmployeeContractType/${id}`;
        return axiosApiInstance.get(path);
    },
    createEmployeeContractType: (data) => {
        const path = `/employeeContractType/createEmployeeContractType`;
        return axiosApiInstance.post(path, data);
    },
    updateEmployeeContractType: (data, id) => {
        const path = `/employeeContractType/updateEmployeeContractType/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteEmployeeContractType: (id) => {
        const path = `/employeeContractType/deleteEmployeeContractType/${id}`;
        return axiosApiInstance.delete(path);
    }
};


export default employeeContractTypeApi;