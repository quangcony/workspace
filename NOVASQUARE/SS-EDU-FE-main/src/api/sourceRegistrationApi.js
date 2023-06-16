import axiosApiInstance from "../utils/axiosClient";

const sourceRegistrationApi = {
    getAllSourceRegistrations: () => {
        const path = `/sourceRegistration/getAll`;
        return axiosApiInstance.get(path);
    },
    getSourceRegistration: ( id) => {
        const path = `/sourceRegistration/getSourceRegistration/${id}`;
        return axiosApiInstance.get(path);
    },
    createSourceRegistration: ( data) => {
        const path = `/sourceRegistration/createSourceRegistration`;
        return axiosApiInstance.post(path, data);
    },
    updateSourceRegistration: ( data, id) => {
        const path = `/sourceRegistration/updateSourceRegistration/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteSourceRegistration: ( id) => {
        const path = `/sourceRegistration/deleteSourceRegistration/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default sourceRegistrationApi;