import axiosApiInstance from "../utils/axiosClient";

const medicalFacilityApi = {
    getAllMedicalFacilities: () => {
        const path = `/medicalFacility/getAll`;
        return axiosApiInstance.get(path);
    },
    getMedicalFacilityById: (id) => {
        const path = `/medicalFacility/getMedicalFacility/${id}`;
        return axiosApiInstance.get(path);
    },
    createMedicalFacility: (data) => {
        const path = `/medicalFacility/createMedicalFacility`;
        return axiosApiInstance.post(path, data);
    },
    updateMedicalFacility: (data, id) => {
        const path = `/medicalFacility/updateMedicalFacility/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMedicalFacility: (id) => {
        const path = `/medicalFacility/deleteMedicalFacility/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default medicalFacilityApi;