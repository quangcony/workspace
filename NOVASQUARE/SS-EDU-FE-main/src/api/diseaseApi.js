import axiosApiInstance from "../utils/axiosClient";

const diseaseApi = {
    getAllDisease: () => {
        const path = `/disease/getAll`;
        return axiosApiInstance.get(path);
    },
    getDiseaseById: (id) => {
        const path = `/disease/getDisease/${id}`;
        return axiosApiInstance.get(path);
    },
    createDisease: (data) => {
        const path = `/disease/createDisease`;
        return axiosApiInstance.post(path, data);
    },
    updateDisease: (data, id) => {
        const path = `/disease/updateDisease/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteDisease: (id) => {
        const path = `/disease/deleteDisease/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default diseaseApi;