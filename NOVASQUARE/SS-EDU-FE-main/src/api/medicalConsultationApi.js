import axiosApiInstance from "../utils/axiosClient";

const medicalConsultationApi = {
    getAllMedicalConsultation: () => {
        const path = `/medicalConsultation/getAll`;
        return axiosApiInstance.get(path);
    },
    getMedicalConsultation: (id) => {
        const path = `/medicalConsultation/getMedicalConsultation/${id}`;
        return axiosApiInstance.get(path);
    },
    createMedicalConsultation: (data) => {
        const path = `/medicalConsultation/createMedicalConsultation`;
        return axiosApiInstance.post(path, data);
    },
    updateMedicalConsultation: (data, id) => {
        const path = `/medicalConsultation/updateMedicalConsultation/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMedicalConsultation: (id) => {
        const path = `/medicalConsultation/deleteMedicalConsultation/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default medicalConsultationApi;
