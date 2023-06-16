import { useRecoilState } from "recoil";
import { authState } from "../recoil/atom/authState";
import authApi from "../api/authApi";
import axios from "axios";
import { serverHost } from "../config/serverHost";
import axiosUser from "../utils/axiosUser";
import jwt_decode from "jwt-decode";

const BACKEND_URL = serverHost.user;

let isRefreshing = false;

export const getIsRefreshing = () => isRefreshing;

export const setIsRefreshing = (val) => {
  isRefreshing = val;
};

export const useJwt = () => {

  const [auth,setAuth] = useRecoilState(authState)

  const accessToken =
    localStorage.getItem('accessToken') || '';
  const axiosApiInstance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    credentials: 'include',
    headers: {
      Authorization: `${accessToken}`
    },
    timeout: 60000,
  });

  axiosApiInstance.interceptors.request.use((config) => {
    // Use latest 'accessToken' in auth header when reference is expired
    const latestAccessToken = localStorage.getItem('accessToken');

    // renew accessToken
    if (latestAccessToken !== accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers.Authorization = `${latestAccessToken}`;
    }

    config.withCredentials = true;

    return config;
  });

  


  // Response interceptor for API calls
  axiosApiInstance.interceptors.response.use(
    
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      console.log('errror :',error)
      let status = undefined;
      let message = undefined;
      if (error.response && error.response.data && error.response.data.status ){
        status = error.response.data.status
      }
      if (error.response && error.response.data && error.response.data.message ){
        message = error.response.data.message
      }
      if (error.response && status && status === 401 && originalRequest.url !== '/api/v1/auth/refresh-token'  ) {
        if (message && message === "jwt expired"){
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const {
                data: {
                  elements: { access_token },
                  status
                },
              } = await authApi.refreshToken(axiosUser)
             if(access_token){
              localStorage.setItem('accessToken',access_token)
               originalRequest.headers.Authorization = access_token
               isRefreshing = false
             } else {
               throw new Error(`Refresh failed with status ${status}`);
             }
              isRefreshing = false
              return axiosApiInstance(originalRequest)
            } catch (error) {
              // setAuth({
              //   profile: "",
              //   isLogged: false,
              // });
              // localStorage.removeItem('accessToken')
              // window.location.href = "/auth/login";
              isRefreshing = false
              return axiosApiInstance(originalRequest)
            }
          }
        }
       

      }

      return Promise.reject(error);
    }
  );

  return {
    axiosJWT: axiosApiInstance,
  };
};
