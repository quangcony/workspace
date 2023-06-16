import axiosApiInstance from "../utils/axiosClient";

const preclinicalDetailFileApi = {
    getAllPreclinicalDetailFiles: () => {
        const path = `/preclinicalDetailFile/getAll`;
        return axiosApiInstance.get(path);
    },
    getPreclinicalDetailFileById: (id) => {
        const path = `/preclinicalDetailFile/getPreclinicalDetailFile/${id}`;
        return axiosApiInstance.get(path);
    },
    createPreclinicalDetailFile: (data) => {
        const path = `/preclinicalDetailFile/createPreclinicalDetailFile`;
        return axiosApiInstance.post(path, data);
    },
    updatePreclinicalDetailFile: (data, id) => {
        const path = `/preclinicalDetailFile/updatePreclinicalDetailFile/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePreclinicalDetailFile: (id) => {
        const path = `/preclinicalDetailFile/deletePreclinicalDetailFile/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default preclinicalDetailFileApi;