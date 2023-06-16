import axiosApiInstance from "../utils/axiosClient";

const medicalFacilityFileApi = {
    getAllMedicalFacilityFiles: () => {
        const path = `/medicalFacilityFile/getAll`;
        return axiosApiInstance.get(path);
    },
    getMedicalFacilityFileById: (id) => {
        const path = `/medicalFacilityFile/getMedicalFacilityFile/${id}`;
        return axiosApiInstance.get(path);
    },
    createMedicalFacilityFile: (data) => {
        const path = `/medicalFacilityFile/createMedicalFacilityFile`;
        return axiosApiInstance.post(path, data);
    },
    updateMedicalFacilityFile: (data, id) => {
        const path = `/medicalFacilityFile/updateMedicalFacilityFile/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMedicalFacilityFile: (id) => {
        const path = `/medicalFacilityFile/deleteMedicalFacilityFile/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default medicalFacilityFileApi;