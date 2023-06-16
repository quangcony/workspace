import { useEffect, useState } from "react";
import roleApi from "../api/roleApi";
import { useSnackbar } from "notistack";

export const useRole = () => {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState();
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
    getAllRoles();
  }, []);

    const getAllRoles = async () => {
        setIsLoading(true)
        try {
            let res = await roleApi.getAllRoles()
            if (res.data) {
                setRoles(res.data.elements)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
             if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
        }
    }
    const getRole = async (id,callback) => {
        setIsLoading(true)
        try {
            let res = await roleApi.getRole(id)
            if (res.data) {
                setRole(res.data.elements.role)
                setIsLoading(false)
                callback()
            }
        } catch (error) {
             if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
            setIsLoading(false)
        }
    }
    const createRole = async (data,callback) => {
        setIsLoading(true)
        try {
            let res = await roleApi.createRole(data)
            if (res.data) {
                getAllRoles()
                enqueueSnackbar(res.data.message, { variant: "success" })
                setError(undefined)
                setIsLoading(false)
                callback()
            }
        } catch (error) {
            setSuccess(undefined)
             if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
            setIsLoading(false)
        }
    }
    const updateRole = async (data, id,callback) => {
        setIsLoading(true)
        try {
            let res = await roleApi.updateRole(data, id)
            if (res.data) {
                getAllRoles()
                setSuccess(res.data.message)
                setError(undefined)
                setIsLoading(false)
                callback()
                setRole(undefined)
            }
        } catch (error) {
            setSuccess(undefined)
             if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
            setIsLoading(false)
        }
    }
    const deleteRole = async (id) => {
        setIsLoading(true)
        try {
            let res = await roleApi.deleteRole(id)
            if (res.data) {
                getAllRoles()
                setSuccess(res.data.message)
                setError(undefined)
                setIsLoading(false)
            }
        } catch (error) {
            setSuccess(undefined)
             if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
            setIsLoading(false)
        }
    }
  

  const assignUserIdsToRoleId = async (roleId, userIds) => {
    setIsLoading(true);

    try {
      let res = await roleApi.assignUserIdsToRoleId(roleId, userIds);
      if (res.data && res.data.status === 201) {
        getAllRoles();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const unassignUserIdsFromRoleId = async (roleId, userIds) => {
    setIsLoading(true);

    try {
      let res = await roleApi.unassignUserIdsFromRoleId(roleId, userIds);
      if (res.data && res.data.status === 201) {
        getAllRoles();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    roles,
    deleteRole,
    role,
    getRole,
    updateRole,
    createRole,
    getAllRoles,
    isLoading,
    error,
    success,
    setRole,
    assignUserIdsToRoleId,
    unassignUserIdsFromRoleId,
  };
};
