import axiosApiInstance from "../utils/axiosClient";

const physicalDetailApi = {
    getAllPhysicalDetails: () => {
        const path = `/physicalDetail/getAll`;
        return axiosApiInstance.get(path);
    },
    getPhysicalDetail: (id) => {
        const path = `/physicalDetail/getPhysicalDetail/${id}`;
        return axiosApiInstance.get(path);
    },
    createPhysicalDetail: (data) => {
        const path = `/physicalDetail/createPhysicalDetail`;
        return axiosApiInstance.post(path, data);
    },
    updatePhysicalDetail: (data, id) => {
        const path = `/physicalDetail/updatePhysicalDetail/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePhysicalDetail: (id) => {
        const path = `/physicalDetail/deletePhysicalDetail/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default physicalDetailApi;
