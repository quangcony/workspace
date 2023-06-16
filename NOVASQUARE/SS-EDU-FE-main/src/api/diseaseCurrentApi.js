import axiosApiInstance from "../utils/axiosClient";

const diseaseCurrentApi = {
    getAllDiseaseCurrents: () => {
        const path = `/diseaseCurrent/getAll`;
        return axiosApiInstance.get(path);
    },
    getDiseaseCurrentById: (id) => {
        const path = `/diseaseCurrent/getDiseaseCurrent/${id}`;
        return axiosApiInstance.get(path);
    },
    createDiseaseCurrent: (data) => {
        const path = `/diseaseCurrent/createDiseaseCurrent`;
        return axiosApiInstance.post(path, data);
    },
    updateDiseaseCurrent: (data, id) => {
        const path = `/diseaseCurrent/updateDiseaseCurrent/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteDiseaseCurrent: (id) => {
        const path = `/diseaseCurrent/deleteDiseaseCurrent/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default diseaseCurrentApi;