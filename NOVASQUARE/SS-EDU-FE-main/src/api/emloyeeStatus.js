import axiosApiInstance from "../utils/axiosClient";

const employeeStatusApi = {
    getAllEmployeeStatuss: () => {
        const path = `/employeeStatus/getAll`;
        return axiosApiInstance.get(path);
    },
    getEmployeeStatus: ( id) => {
        const path = `/employeeStatus/getEmployeeStatus/${id}`;
        return axiosApiInstance.get(path);
    },
    createEmployeeStatus: ( data) => {
        const path = `/employeeStatus/createEmployeeStatus`;
        return axiosApiInstance.post(path, data);
    },
    updateEmployeeStatus: ( data, id) => {
        const path = `/employeeStatus/updateEmployeeStatus/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteEmployeeStatus: ( id) => {
        const path = `/employeeStatus/deleteEmployeeStatus/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default employeeStatusApi;