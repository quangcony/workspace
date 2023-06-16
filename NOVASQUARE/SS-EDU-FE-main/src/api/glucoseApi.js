import axiosApiInstance from "../utils/axiosClient";

const glucoseApi = {
    getAllGlucoses: () => {
        const path = `/glucose/getAll`;
        return axiosApiInstance.get(path);
    },
    getGlucoseById: (id) => {
        const path = `/glucose/getGlucose/${id}`;
        return axiosApiInstance.get(path);
    },
    createGlucose: (data) => {
        const path = `/glucose/createGlucose`;
        return axiosApiInstance.post(path, data);
    },
    updateGlucose: (data, id) => {
        const path = `/glucose/updateGlucose/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteGlucose: (id) => {
        const path = `/glucose/deleteGlucose/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default glucoseApi;

