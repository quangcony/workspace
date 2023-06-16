import axiosApiInstance from "../utils/axiosClient";

const employeeStatusApi = {
    getAllEmployeeStatuses: () => {
        const path = `/EmployeeStatus/getAll`;
        return axiosApiInstance.get(path);
    },
    getEmployeeStatus: (id) => {
        const path = `/EmployeeStatus/getEmployeeStatus/${id}`;
        return axiosApiInstance.get(path);
    },
    createEmployeeStatus: (data) => {
        const path = `/EmployeeStatus/createEmployeeStatus`;
        return axiosApiInstance.post(path, data);
    },
    updateEmployeeStatus: (data, id) => {
        const path = `/EmployeeStatus/updateEmployeeStatus/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteEmployeeStatus: (id) => {
        const path = `/EmployeeStatus/deleteEmployeeStatus/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default employeeStatusApi;
