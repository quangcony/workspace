import axiosApiInstance from "../utils/axiosClient";

const medicalDiseaseUnitSymbolApi = {
    getAllMedicalDiseaseUnitSymbols: () => {
        const path = `/medicalDiseaseUnitSymbol/getAll`;
        return axiosApiInstance.get(path);
    },
    getMedicalDiseaseUnitSymbol: ( id) => {
        const path = `/medicalDiseaseUnitSymbol/getMedicalDiseaseUnitSymbol/${id}`;
        return axiosApiInstance.get(path);
    },
    createMedicalDiseaseUnitSymbol: ( data) => {
        const path = `/medicalDiseaseUnitSymbol/createMedicalDiseaseUnitSymbol`;
        return axiosApiInstance.post(path, data);
    },
    updateMedicalDiseaseUnitSymbol: ( data, id) => {
        const path = `/medicalDiseaseUnitSymbol/updateMedicalDiseaseUnitSymbol/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteMedicalDiseaseUnitSymbol: ( id) => {
        const path = `/medicalDiseaseUnitSymbol/deleteMedicalDiseaseUnitSymbol/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default medicalDiseaseUnitSymbolApi;