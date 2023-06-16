import axiosApiInstance from "../utils/axiosClient";

const investigationCaseApi = {
    getAllInvestigationCases: () => {
        const path = `/investigationCase/getAll`;
        return axiosApiInstance.get(path);
    },
    getInvestigationCase: (id) => {
        const path = `/investigationCase/getInvestigationCase/${id}`;
        return axiosApiInstance.get(path);
    },
    getInvestigationCaseHistory: (id) => {
        const path = `/investigationCase/getInvestigationCaseHistory/${id}`;
        return axiosApiInstance.get(path);
    },
    createInvestigationCase: (data) => {
        const path = `/investigationCase/createInvestigationCase`;
        return axiosApiInstance.post(path, data);
    },
    updateInvestigationCase: (data, id) => {
        const path = `/investigationCase/updateInvestigationCase/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteInvestigationCase: (id) => {
        const path = `/investigationCase/deleteInvestigationCase/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default investigationCaseApi;