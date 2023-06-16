import axiosApiInstance from "../utils/axiosClient";

const systemconfigApi = {
    getAllSystemConfigs: () => {
        const path = `/systemconfig/getSystemConfigs`;
        return axiosApiInstance.get(path);
    },
    getSystemConfig: (id) => {
        const path = `/systemconfig/getSystemConfig/${id}`;
        return axiosApiInstance.get(path);
    },
    createSystemConfig: (data) => {
        const path = `/systemconfig/createSystemConfig`;
        return axiosApiInstance.post(path, data);
    },
    updateSystemConfig: (data, id) => {
        const path = `/systemconfig/updateSystemConfig/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteSystemConfig: (id) => {
        const path = `/systemconfig/deleteSystemConfig/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default systemconfigApi;