import axiosApiInstance from "../utils/axiosClient";

const clinicalDetailApi = {
    getAllClinicalDetails: () => {
        const path = `/clinicalDetail/getAll`;
        return axiosApiInstance.get(path);
    },
    getClinicalDetailById: (id) => {
        const path = `/clinicalDetail/getClinicalDetail/${id}`;
        return axiosApiInstance.get(path);
    },
    createClinicalDetail: (data) => {
        const path = `/clinicalDetail/createClinicalDetail`;
        return axiosApiInstance.post(path, data);
    },
    updateClinicalDetail: (data, id) => {
        const path = `/clinicalDetail/updateClinicalDetail/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteClinicalDetail: (id) => {
        const path = `/clinicalDetail/deleteClinicalDetail/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default clinicalDetailApi;