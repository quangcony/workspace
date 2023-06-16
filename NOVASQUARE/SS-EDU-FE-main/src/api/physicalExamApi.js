import axiosApiInstance from "../utils/axiosClient";

const physicalExamApi = {
    getAllPhysicalExams: () => {
        const path = `/physicalExam/getAll`;
        return axiosApiInstance.get(path);
    },
    getAllByQuery: (data) => {
        const path = `/physicalExam/getAllByQuery`;
        return axiosApiInstance.post(path,data);
    },
    getPhysicalExam: (id) => {
        const path = `/physicalExam/getPhysicalExam/${id}`;
        return axiosApiInstance.get(path);
    },
    createPhysicalExam: (data) => {
        const path = `/physicalExam/createPhysicalExam`;
        return axiosApiInstance.post(path, data);
    },
    updatePhysicalExam: (data, id) => {
        const path = `/physicalExam/updatePhysicalExam/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePhysicalExam: (id) => {
        const path = `/physicalExam/deletePhysicalExam/${id}`;
        return axiosApiInstance.delete(path);
    },
    getAllPhysicalExamByQuery: (object) => {
        const path = `/physicalExam/getAllByQuery/${object}`;
        return axiosApiInstance.post(path);
    },
};


export default physicalExamApi;
