import axiosApiInstance from "../utils/axiosClient";

const studentApi = {
    getAllStudents: () => {
        const path = `/student/getAll`;
        return axiosApiInstance.get(path);
    },
    getStudent: ( id) => {
        const path = `/student/getStudent/${id}`;
        return axiosApiInstance.get(path);
    },
    createStudent: ( data) => {
        const path = `/student/createStudent`;
        return axiosApiInstance.post(path, data);
    },
    updateStudent: ( data, id) => {
        const path = `/student/updateStudent/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteStudent: ( id) => {
        const path = `/student/deleteStudent/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default studentApi;