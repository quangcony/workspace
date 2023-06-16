import axiosApiInstance from "../utils/axiosClient";

const physicalClassificationApi = {

    getAllPhysicalClassification: () => {
        const path = `/physicalClassification/getAll`;
        return axiosApiInstance.get(path);
    },
    getPhysicalClassification: (id) => {
        const path = `/physicalClassification/getPhysicalClassification/${id}`;
        return axiosApiInstance.get(path);
    },
    createPhysicalClassification: (data) => {
        const path = `/physicalClassification/createPhysicalClassification`;
        return axiosApiInstance.post(path, data);
    },
    updatePhysicalClassification: (data, id) => {
        const path = `/physicalClassification/updatePhysicalClassification/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePhysicalClassification: (id) => {
        const path = `/physicalClassification/deletePhysicalClassification/${id}`;
        return axiosApiInstance.delete(path);
    }
};
export default physicalClassificationApi;