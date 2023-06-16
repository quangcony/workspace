import axiosApiInstance from "../utils/axiosClient";

const preclinicalDetailApi = {
    getAllPreclinicalDetails: () => {
        const path = `/preclinicalDetail/getAll`;
        return axiosApiInstance.get(path);
    },
    getPreclinicalDetailById: (id) => {
        const path = `/preclinicalDetail/getPreclinicalDetail/${id}`;
        return axiosApiInstance.get(path);
    },
    createPreclinicalDetail: (data) => {
        const path = `/preclinicalDetail/createPreclinicalDetail`;
        return axiosApiInstance.post(path, data);
    },
    updatePreclinicalDetail: (data, id) => {
        const path = `/preclinicalDetail/updatePreclinicalDetail/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePreclinicalDetail: (id) => {
        const path = `/preclinicalDetail/deletePreclinicalDetail/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default preclinicalDetailApi;