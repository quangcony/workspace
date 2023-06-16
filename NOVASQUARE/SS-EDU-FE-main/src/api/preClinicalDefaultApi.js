import axiosApiInstance from "../utils/axiosClient";

const preClinicalDefaultApi = {
    getAllPreClinicalDefaults: () => {
        const path = `/preclinicalDefaultSetting/getAll`;
        return axiosApiInstance.get(path);
    },
    getPreClinicalDefault: ( id) => {
        const path = `/preclinicalDefaultSetting/getPreclinicalDefaultSetting/${id}`;
        return axiosApiInstance.get(path);
    },
    createPreClinicalDefault: ( data) => {
        const path = `/preclinicalDefaultSetting/createPreclinicalDefaultSetting`;
        return axiosApiInstance.post(path, data);
    },
    updatePreClinicalDefault: ( data, id) => {
        const path = `/preclinicalDefaultSetting/updatePreclinicalDefaultSetting/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePreClinicalDefault: ( id) => {
        const path = `/preclinicalDefaultSetting/deletePreclinicalDefaultSetting/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default preClinicalDefaultApi;