import axiosApiInstance from "../utils/axiosClient";

const userStatusApi = {
    getAllUserStatuss: () => {
        const path = `/userstatus/getAll`;
        return axiosApiInstance.get(path);
    },
    getUserStatus: ( id) => {
        const path = `/userstatus/getUserstatus/${id}`;
        return axiosApiInstance.get(path);
    },
    createUserStatus: ( data) => {
        const path = `/userstatus/createUserstatus`;
        return axiosApiInstance.post(path, data);
    },
    updateUserStatus: ( data, id) => {
        const path = `/userstatus/updateUserstatus/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteUserStatus: ( id) => {
        const path = `/userstatus/deleteUserstatus/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default userStatusApi;