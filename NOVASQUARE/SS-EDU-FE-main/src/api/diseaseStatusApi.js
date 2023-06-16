import axiosApiInstance from "../utils/axiosClient";

const diseaseStatusApi = {
    getAllDiseaseStatus: () => {
        const path = `/diseaseStatus/getAll`;
        return axiosApiInstance.get(path);
    },
    createDiseaseStatus: (data) => {
        const path = `/diseaseStatus/createDiseaseStatus`;
        return axiosApiInstance.post(path, data);
    },
};


export default diseaseStatusApi;