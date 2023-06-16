import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { useSnackbar } from "notistack";

export const useProfile = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [success, setSuccess] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        }
        if (success) {
            enqueueSnackbar(success, { variant: "success" });
        }
    }, [error, success]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        setIsLoading(true);
        try {
            let res = await userApi.getAllUsers();
            if (res.data) {
                setUsers(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
                  if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
        }
    };
    const getUser = async (id) => {
        setIsLoading(true);
       return new Promise(async(resolve,reject)=>{
           try {
               let res = await userApi.getUser( id);
               setIsLoading(false);
               if (res.data && res.data.elements && res.data.elements.user) {
                   resolve({
                       profile: res.data.elements.user
                   })
               }else{
                resolve({
                    profile: undefined
                })
               }
           } catch (error) {
               setIsLoading(false);
               reject(error)
           }
       })
    };
    const createUser = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await userApi.createUser( data);
            if (res.data) {
                getAllUsers();
                setSuccess(res.data.message);
                setError(undefined);
                setIsLoading(false);
                callback();
                setUser(undefined);
            }
        } catch (error) {
            setSuccess(undefined);
                  if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
            setIsLoading(false);
        }
    };
    const updateUser = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await userApi.updateUser( data, id);
            if (res.data) {
                getAllUsers();
                setSuccess(res.data.message);
                setError(undefined);
                setIsLoading(false);
                callback();
                setUser(undefined);
            }
        } catch (error) {
            setSuccess(undefined);
                  if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
            setIsLoading(false);
        }
    };
    const deleteUser = async (id) => {
        setIsLoading(true);
        try {
            let res = await userApi.deleteUser( id);
            if (res.data) {
                getAllUsers();
                setSuccess(res.data.message);
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            setSuccess(undefined);
                  if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
            setIsLoading(false);
        }
    };

    return {
        users,
        deleteUser,
        user,
        setUser,
        getUser,
        updateUser,
        createUser,
        getAllUsers,
        isLoading,
        error,
        success,
    };
};
