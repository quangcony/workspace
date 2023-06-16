import axiosApiInstance from "../utils/axiosClient";

const maritalStatusApi = {
    getAllMaritalStatuses: () => {
        const path = `/maritalStatus/getAll`;
        return axiosApiInstance.get(path);
    },
    getMaritalStatusById: (id) => {
        const path = `/maritalStatus/getMaritalStatus/${id}`;
        return axiosApiInstance.get(path);
    },
    createMaritalStatus: (data) => {
        const path = `/maritalStatus/createMaritalStatus`;
        return axiosApiInstance.post(path, data);
    },
    updateMaritalStatus: (data, id) => {
        const path = `/maritalStatus/updateMaritalStatus/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMaritalStatus: (id) => {
        const path = `/maritalStatus/deleteMaritalStatus/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default maritalStatusApi;