import axiosApiInstance from "../utils/axiosClient";

const employeeApi = {
    getAllEmployees: () => {
        const path = `/employee/getAll`;
        return axiosApiInstance.get(path);
    },
    getEmployee: (id) => {
        const path = `/employee/getEmployee/${id}`;
        return axiosApiInstance.get(path);
    },
    createEmployee: (data) => {
        const path = `/employee/createEmployee`;
        return axiosApiInstance.post(path, data);
    },
    updateEmployee: (data, id) => {
        const path = `/employee/updateEmployee/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteEmployee: (id) => {
        const path = `/employee/deleteEmployee/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default employeeApi;
