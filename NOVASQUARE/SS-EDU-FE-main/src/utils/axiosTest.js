import axios from 'axios';
import { serverHost } from "../config/serverHost";
import authApi from "../api/authApi";

const BACKEND_URL = serverHost.user;

let isRefreshing = false;
let subscribers = [];

const accessToken =
    localStorage.getItem('accessToken') || '';

function onRefreshed({ authorisationToken }) {
    subscribers.map(cb => cb(authorisationToken));
}

function subscribeTokenRefresh(cb) {
    subscribers.push(cb);
}

const aixosTest = () => {
    const request = axios.create({
        baseURL: BACKEND_URL,
        withCredentials: true,
        credentials: 'include',
        headers: {
            Authorization: `${accessToken}`
        },
    });

    request.interceptors.response.use(null, err => {
        const {
            config,
            response: { status }
        } = err;
        const originalRequest = config;

        if (status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                authApi.refreshToken().then(({ data: {
                    elements: { access_token },
                    status
                } }) => {
                    isRefreshing = false;
                    onRefreshed(access_token);
                    subscribers = [];
                });
            }
            return new Promise(resolve => {
                subscribeTokenRefresh(token => {
                    originalRequest.headers.Authorization = `${token}`;
                    resolve(axios(originalRequest));
                });
            });
        }

        return Promise.reject(err);
    });

    return request;
};

export default aixosTest;