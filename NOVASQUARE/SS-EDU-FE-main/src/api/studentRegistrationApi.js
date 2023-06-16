import axiosApiInstance from "../utils/axiosClient";

const studentRegistrationApi = {
    getAllStudentRegistrations: () => {
        const path = `/studentRegistration/getAll`;
        return axiosApiInstance.get(path);
    },
    getStudentRegistration: ( id) => {
        const path = `/studentRegistration/getStudentRegistration/${id}`;
        return axiosApiInstance.get(path);
    },
    createStudentRegistration: ( data) => {
        const path = `/studentRegistration/createStudentRegistration`;
        return axiosApiInstance.post(path, data);
    },
    updateStudentRegistration: ( data, id) => {
        const path = `/studentRegistration/updateStudentRegistration/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteStudentRegistration: ( id) => {
        const path = `/studentRegistration/deleteStudentRegistration/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default studentRegistrationApi;