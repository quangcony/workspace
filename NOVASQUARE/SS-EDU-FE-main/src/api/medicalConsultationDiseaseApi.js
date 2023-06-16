import axiosApiInstance from "../utils/axiosClient";

const medicalConsultationDiseaseApi = {
    getAllMedicalConsultationDisease: () => {
        const path = `/medicalConsultationDisease/getAll`;
        return axiosApiInstance.get(path);
    },
    getMedicalConsultationDisease: (id) => {
        const path = `/medicalConsultationDisease/getMedicalConsultationDisease/${id}`;
        return axiosApiInstance.get(path);
    },
    createMedicalConsultationDisease: (data) => {
        const path = `/medicalConsultationDisease/createMedicalConsultationDisease`;
        return axiosApiInstance.post(path, data);
    },
    updateMedicalConsultationDisease: (data, id) => {
        const path = `/medicalConsultationDisease/updateMedicalConsultationDisease/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMedicalConsultationDisease: (id) => {
        const path = `/medicalConsultationDisease/deleteMedicalConsultationDisease/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default medicalConsultationDiseaseApi;
