import axiosApiInstance from "../utils/axiosClient";

const companyBranchApi = {
    getAllCompanyBranches: () => {
        const path = `/companyBranch/getAll`;
        return axiosApiInstance.get(path);
    },
    getCompanyBranchById: (companyBranchId) => {
        const path = `/companyBranch/getCompanyBranch/${companyBranchId}`;
        return axiosApiInstance.get(path);
    },
    createCompanyBranch: (data) => {
        const path = `/companyBranch/createCompanyBranch`;
        return axiosApiInstance.post(path, data);
    },
    updateCompanyBranch: (data, companyBranchId) => {
        const path = `/companyBranch/updateCompanyBranch/${companyBranchId}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteCompanyBranch: (companyBranchId) => {
        const path = `/companyBranch/deleteCompanyBranch/${companyBranchId}`;
        return axiosApiInstance.delete(path);
    }
};

export default companyBranchApi;