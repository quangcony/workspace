import axiosApiInstance from "../utils/axiosClient";

const medicalDiseaseUnitApi = {
    getAllMedicalDiseaseUnits: () => {
        const path = `/medicalDiseaseUnit/getAll`;
        return axiosApiInstance.get(path);
    },
    getMedicalDiseaseUnit: ( id) => {
        const path = `/medicalDiseaseUnit/getMedicalDiseaseUnit/${id}`;
        return axiosApiInstance.get(path);
    },
    createMedicalDiseaseUnit: ( data) => {
        const path = `/medicalDiseaseUnit/createMedicalDiseaseUnit`;
        return axiosApiInstance.post(path, data);
    },
    updateMedicalDiseaseUnit: ( data, id) => {
        const path = `/medicalDiseaseUnit/updateMedicalDiseaseUnit/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMedicalDiseaseUnit: ( id) => {
        const path = `/medicalDiseaseUnit/deleteMedicalDiseaseUnit/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default medicalDiseaseUnitApi;