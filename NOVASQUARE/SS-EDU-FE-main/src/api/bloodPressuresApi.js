import axiosApiInstance from "../utils/axiosClient";

const bloodPressuresApi = {
    getAllBloodPressures: () => {
        const path = `/bloodPressure/getAll`;
        return axiosApiInstance.get(path);
    },
    getBloodPressureById: (id) => {
        const path = `/bloodPressure/getBloodPressure/${id}`;
        return axiosApiInstance.get(path);
    },
    createBloodPressure: (data) => {
        const path = `/bloodPressure/createBloodPressure`;
        return axiosApiInstance.post(path, data);
    },
    updateBloodPressure: (data, id) => {
        const path = `/bloodPressure/updateBloodPressure/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteBloodPressure: (id) => {
        const path = `/bloodPressure/deleteBloodPressure/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default bloodPressuresApi;
