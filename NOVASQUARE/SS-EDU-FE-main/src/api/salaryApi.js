import axiosApiInstance from "../utils/axiosClient";

const SalaryApi = {
    getAllSalarys: () => {
        const path = `/salary/getAll`;
        return axiosApiInstance.get(path);
    },
    getSalary: ( id) => {
        const path = `/salary/getSalary/${id}`;
        return axiosApiInstance.get(path);
    },
    createSalary: ( data) => {
        const path = `/salary/createSalary`;
        return axiosApiInstance.post(path, data);
    },
    updateSalary: ( data, id) => {
        const path = `/salary/updateSalary/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteSalary: ( id) => {
        const path = `/salary/deleteSalary/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default SalaryApi;