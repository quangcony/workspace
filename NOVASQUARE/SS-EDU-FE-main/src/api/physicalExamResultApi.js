import axiosApiInstance from "../utils/axiosClient";

const physicalExamResultApi = {
    getAllPhysicalExamResults: () => {
        const path = `/physicalExamResult/getAll`;
        return axiosApiInstance.get(path);
    },
    getphyPicalExamResultById: (id) => {
        const path = `/physicalExamResult/getPhysicalExamResult/${id}`;
        return axiosApiInstance.get(path);
    },
    createPhysicalExamResult: (data) => {
        const path = `/physicalExamResult/createPhysicalExamResult`;
        return axiosApiInstance.post(path, data);
    },
    updatePhysicalExamResult: (data, id) => {
        const path = `/physicalExamResult/updatePhysicalExamResult/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePhysicalExamResult: (id) => {
        const path = `/physicalExamResult/deletePhysicalExamResult/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default physicalExamResultApi;