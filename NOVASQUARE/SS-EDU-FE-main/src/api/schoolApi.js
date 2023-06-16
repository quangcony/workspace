import axiosApiInstance from "../utils/axiosClient";

const schoolApi = {
    getAllSchools: () => {
        const path = `/school/getAll`;
        return axiosApiInstance.get(path);
    },
    getSchool: ( id) => {
        const path = `/school/getSchool/${id}`;
        return axiosApiInstance.get(path);
    },
    createSchool: ( data) => {
        const path = `/school/createSchool`;
        return axiosApiInstance.post(path, data);
    },
    updateSchool: ( data, id) => {
        const path = `/school/updateSchool/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteSchool: ( id) => {
        const path = `/school/deleteSchool/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default schoolApi;