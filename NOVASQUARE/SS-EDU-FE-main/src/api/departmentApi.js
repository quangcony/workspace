import axiosApiInstance from "../utils/axiosClient";

const departmentApi = {
    getAllDepartment: () => {
        const path = `/department/getAll`;
        return axiosApiInstance.get(path);
    },
    getDepartmentById: (id) => {
        const path = `/department/getDepartment/${id}`;
        return axiosApiInstance.get(path);
    },
    createDepartment: (data) => {
        const path = `/department/createDepartment`;
        return axiosApiInstance.post(path, data);
    },
    updateDepartment: (data, id) => {
        const path = `/department/updateDepartment/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteDepartment: (id) => {
        const path = `/department/deleteDepartment/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default departmentApi;