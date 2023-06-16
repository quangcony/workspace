import axiosApiInstance from "../utils/axiosClient";

const workingStatusApi = {
    getAllWorkingStatuss: () => {
        const path = `/workingStatus/getAll`;
        return axiosApiInstance.get(path);
    },
    getWorkingStatus: ( id) => {
        const path = `/workingStatus/getWorkingStatus/${id}`;
        return axiosApiInstance.get(path);
    },
    createWorkingStatus: ( data) => {
        const path = `/workingStatus/createWorkingStatus`;
        return axiosApiInstance.post(path, data);
    },
    updateWorkingStatus: ( data, id) => {
        const path = `/workingStatus/updateWorkingStatus/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteWorkingStatus: ( id) => {
        const path = `/workingStatus/deleteWorkingStatus/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default workingStatusApi;