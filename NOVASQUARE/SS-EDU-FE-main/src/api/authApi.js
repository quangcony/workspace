import axios from "axios";
import axiosApiInstance from "../utils/axiosClient";
import { serverHost } from "../config/serverHost";
const BACKEND_URL = serverHost.user;
const authApi = {

    updateProfile: (data) => {
        const path = `/auth/update-profile`;
        return axiosApiInstance.patch(path, data);
    },
    login: (data) => {
        const path = `/auth/login`;
        return axiosApiInstance.post(path, {...data}, {
            withCredentials: true,
        });
        // return axiosApiInstance.post(path, {...data, remember:true}, {
        //     withCredentials: true,
        // });
    },
    logout: () => {
        const path = `/auth/logout`;
        return axiosApiInstance.get(path, {
            withCredentials: true,
        });
    },
    refreshToken: () => {
        const path = `/auth/refresh_token`;
        return axiosApiInstance.get(path);
    },
    forgotPassword: (data) => {
        const path = `/auth/forgot-password`;
        return axiosApiInstance.post(path,data);
    },
    resetYourPassword: (data,token) => {
        const path = `/auth/reset-your-password`;
        return axios.post(path,data,{
            headers: {
                'Authorization': token
            },
            baseURL: BACKEND_URL,
        });
    },
    changePassword: (data) => {
        const path = `/auth/change-password`;
        return axiosApiInstance.post(path,data);
    },
};

export default authApi;