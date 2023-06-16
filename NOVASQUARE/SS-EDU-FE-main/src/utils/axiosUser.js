
import axios from "axios";
import { serverHost } from "../config/serverHost";

const BACKEND_URL = serverHost.user;
const axiosUser = axios.create({
    baseURL: BACKEND_URL,
});
const auth = JSON.parse(localStorage.getItem('auth'))
let access_token = undefined;

if(auth){
    access_token = auth.auth.accessToken
}

axiosUser.interceptors.request.use(async(config) => {
    if (access_token) {
        config.headers.common.Authorization = access_token;
}
    return config;
});


export default axiosUser;