import axiosApiInstance from "../utils/axiosClient";

const clinicalDefaultApi = {
    getAllClinicalDefaults: () => {
        const path = `/clinicalDefaultSetting/getAll`;
        return axiosApiInstance.get(path);
    },
    getClinicalDefault: ( id) => {
        const path = `/clinicalDefaultSetting/getClinicalDefaultSetting/${id}`;
        return axiosApiInstance.get(path);
    },
    createClinicalDefault: ( data) => {
        const path = `/clinicalDefaultSetting/createClinicalDefaultSetting`;
        return axiosApiInstance.post(path, data);
    },
    updateClinicalDefault: ( data, id) => {
        const path = `/clinicalDefaultSetting/updateClinicalDefaultSetting/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteClinicalDefault: ( id) => {
        const path = `/clinicalDefaultSetting/deleteClinicalDefaultSetting/${id}`;
        return axiosApiInstance.delete(path);
    }
};
export default clinicalDefaultApi;