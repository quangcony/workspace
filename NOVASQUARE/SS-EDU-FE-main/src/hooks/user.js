import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { userListState, userState } from "../recoil/atom/userState";
import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { useSnackbar } from "notistack";
import { authState } from "../recoil/atom/authState";
import { useAuth } from "./auth";

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [newUser, setNewUser] = useState();
  const [usersGenerate, setUsersGenerate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const { getProfile } = useAuth();

  const { profile } = useRecoilValue(authState);
  const userId = profile?.id;

  const setUserLists = useSetRecoilState(userListState);

  useEffect(() => {
    getAllUsers();
    getUsersGenerate();
  }, []);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      let res = await userApi.getAllUsers();
      if (res.data) {
        setUsers(res.data.elements);
        setUserLists(res.data.elements);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };

  const convertPwStringToHashByUserId = async (id) => {
    try {
      let res = await userApi.converPassword(id);
      if (res.data) {
        enqueueSnackbar(res.data.message, { variant: "success" })
      }
    } catch (error) {
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };

  const getUsersGenerate = async () => {
    try {
      let res = await userApi.getUsersGenerate();
      if (res.data) {
        setUsersGenerate(res.data.elements);
      }
    } catch (error) {
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };

  const getUser = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await userApi.getUser(id);
      if (res.data) {
        console.log("response:", res.data);
        setUser(res.data.elements.user);
        callback();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
      // enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const createUser = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await userApi.createUser(data);
      if (res.data) {
        getAllUsers();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setUser(undefined);
      }
      return res
    } catch (error) {
      // enqueueSnackbar("Request failed !", { variant: "error" })
      setIsLoading(false);
      enqueueSnackbar("Request failed !", { variant: "error" })
    }
  };
  const updateUser = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await userApi.updateUser(data, id);
      if (res.data) {
        getAllUsers();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback();
        setUser(undefined);
        if (id == userId) {
          await getProfile(id);
        }
      }
    } catch (error) {

      enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };
  const resetPasswordUser = async (id, data, callback) => {
    setIsLoading(true);
    try {
      let res = await userApi.resetPasswordUser(id, data);
      if (res.data) {
        enqueueSnackbar(res.data.message, { variant: "success" })
        setIsLoading(false);
        callback(res.data.elements.ifUser);
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" })
      setIsLoading(false);
    }
  };
  const deleteUser = async (id) => {
    setIsLoading(true);
    try {
      let res = await userApi.deleteUser(id);
      if (res.data) {
        getAllUsers();
        enqueueSnackbar(res.data.message, { variant: "success" })
        setError(undefined);
        setIsLoading(false);
      }
    } catch (error) {

      // enqueueSnackbar("Request failed !", { variant: "error" })
      setIsLoading(false);
    }
  };

  const assignRoleIdsToUserId = async (userId, roleIds) => {
    setIsLoading(true);

    try {
      let res = await userApi.assignRoleIdsToUserId({
        userId,
        roleIds,
      });
      if (res.data && res.data.status === 201) {
        getAllUsers();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const unassignRoleIdsFromUserId = async (userId, roleIds) => {
    setIsLoading(true);

    try {
      let res = await userApi.unassignRoleIdsFromUserId({
        userId,
        roleIds,
      });
      if (res.data && res.data.status === 201) {
        getAllUsers();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };



  return {
    users,
    newUser,
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
    convertPwStringToHashByUserId,
    usersGenerate,
    assignRoleIdsToUserId,
    unassignRoleIdsFromUserId,
    resetPasswordUser
  };
};
