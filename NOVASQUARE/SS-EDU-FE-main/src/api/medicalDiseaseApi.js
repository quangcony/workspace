import axiosApiInstance from "../utils/axiosClient";

const medicalDiseaseApi = {
    getAllMedicalDiseases: () => {
        const path = `/medicalDisease/getAll`;
        return axiosApiInstance.get(path);
    },
    getMedicalDisease: ( id) => {
        const path = `/medicalDisease/getMedicalDisease/${id}`;
        return axiosApiInstance.get(path);
    },
    createMedicalDisease: ( data) => {
        const path = `/medicalDisease/createMedicalDisease`;
        return axiosApiInstance.post(path, data);
    },
    updateMedicalDisease: ( data, id) => {
        const path = `/medicalDisease/updateMedicalDisease/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMedicalDisease: ( id) => {
        const path = `/medicalDisease/deleteMedicalDisease/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default medicalDiseaseApi;