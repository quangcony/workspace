import axiosApiInstance from "../utils/axiosClient";

const SalaryContractApi = {
    getAllSalaryContracts: () => {
        const path = `/salaryContract/getAll`;
        return axiosApiInstance.get(path);
    },
    getSalaryContract: ( id) => {
        const path = `/salaryContract/getSalaryContract/${id}`;
        return axiosApiInstance.get(path);
    },
    createSalaryContract: ( data) => {
        const path = `/salaryContract/createSalaryContract`;
        return axiosApiInstance.post(path, data);
    },
    updateSalaryContract: ( data, id) => {
        const path = `/salaryContract/updateSalaryContract/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteSalaryContract: ( id) => {
        const path = `/salaryContract/deleteSalaryContract/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default SalaryContractApi;