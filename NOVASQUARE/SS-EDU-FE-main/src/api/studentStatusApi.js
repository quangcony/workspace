import axiosApiInstance from "../utils/axiosClient";

const studentStatusApi = {
    getAllStudentStatuss: () => {
        const path = `/studentStatus/getAll`;
        return axiosApiInstance.get(path);
    },
    getStudentStatus: ( id) => {
        const path = `/studentStatus/getStudentStatus/${id}`;
        return axiosApiInstance.get(path);
    },
    createStudentStatus: ( data) => {
        const path = `/studentStatus/createStudentStatus`;
        return axiosApiInstance.post(path, data);
    },
    updateStudentStatus: ( data, id) => {
        const path = `/studentStatus/updateStudentStatus/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteStudentStatus: ( id) => {
        const path = `/studentStatus/deleteStudentStatus/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default studentStatusApi;