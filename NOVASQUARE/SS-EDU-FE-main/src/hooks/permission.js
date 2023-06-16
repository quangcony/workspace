import { useRecoilValue, useRecoilState } from "recoil";
import { permissionState } from "../recoil/atom/permissionState";
import { useEffect, useState } from "react";
import permissionApi from "../api/permissionApi";
import { useSnackbar } from "notistack";
import moduleApi from "../api/moduleApi";

export const usePermission = () => {
  const [permissions, setPermissions] = useState();
  const [permission, setPermission] = useState();
  const [permissionByModule, setPermissionByModule] = useState([]);
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
    getAllPermissions();
  }, []);

  const getAllPermissions = async () => {
    setIsLoading(true);
    try {
      let res = await permissionApi.getAllPermissions();
      if (res.data) {
        const sortData = res?.data?.elements?.sort((a,b) => a.INDEX - b.INDEX)
        setPermissions(sortData);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };
  const getAllPermisisonsByModuleId = async (id, callback) => {
    setSuccess(undefined);
    setError(undefined);
    setIsLoading(true);
    try {
      let res = await permissionApi.getAllPermisisonsByModuleId( id);
      if (res.data) {
        setPermissionByModule(res.data.elements);
      }
      setIsLoading(false);
      callback();
    } catch (error) {
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
      setPermissionByModule([]);
    }
  };
  const getPermission = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await permissionApi.getPermission( id);
      if (res.data) {
        setPermission(res.data.elements.permission);
        setIsLoading(false);
        callback();
      }
    } catch (error) {
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const createPermission = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await permissionApi.createPermission( data);
      if (res.data) {
        getAllPermissions();
        enqueueSnackbar(res.data.message, { variant: "success" });
        setError(undefined);
        setIsLoading(false);
        callback();
        setPermission(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const updatePermission = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await permissionApi.updatePermission( data, id);
      if (res.data) {
        getAllPermissions();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setPermission(undefined);
      }
    } catch (error) {
      setSuccess(undefined);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
      // callback();
    }
  };
  const deletePermission = async (id) => {
    setIsLoading(true);
    try {
      let res = await permissionApi.deletePermission( id);
      if (res.data) {
        getAllPermissions();
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
  const assignPermissionByModule = async (id, data, callback) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    try {
      let res = await moduleApi.assignPermissionForModule( id, data);
      console.log("res ne ne", res);
      if (res.data && res.data.status === 201) {
        setSuccess(res.data.message);
        setError(undefined);
        getAllPermisisonsByModuleId(id);
      }
      setIsLoading(false);
      callback();
      setPermissionByModule([]);
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
            if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
  };

  const assignPermissionForRole = async ({
    roleId,
    permissionId,
    moduleId,
  }) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    try {
      let res = await permissionApi.assignPermissionForRole( {
        ROLE_ID: roleId,
        PERMISSION_ID: permissionId,
        MODULE_ID: moduleId,
        NOTE: "This is absolutely a note",
      });
      if (res.data && res.data.status === 201) {
        setSuccess("Assign Permission Successful");
        setError(undefined);
      }
      setIsLoading(false);
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
      setError("Assign Permission Fail");
    }
  };

  const unassignPermissionForRole = async ({
    roleId,
    permissionId,
    moduleId,
  }) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    try {
      let res = await permissionApi.unassignPermissionForRole( {
        roleId,
        permissionId,
        moduleId,
      });
      if (res.data && res.data.status === 200) {
        setSuccess("Unassign Permission Successful");
        setError(undefined);
      }
      setIsLoading(false);
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
      setError("Unassign Permission Fail");
    }
  };

  const deletePermissionToModule = async ({ moduleId, permissionId }) => {
    setIsLoading(true);
    setError(undefined);
    setSuccess(undefined);
    try {
      let res = await permissionApi.deletePermissionToModule( {
        permissionId,
        moduleId,
      });
      if (res.data && res.data.status === 200) {
        setError(undefined);
      }
      setIsLoading(false);
    } catch (error) {
      setSuccess(false);
      setIsLoading(false);
      setError("Delete Permission Fail");
    }
  }

  return {
    // logout,
    // login,
    permissions,
    deletePermission,
    permission,
    getPermission,
    setPermission,
    updatePermission,
    createPermission,
    getAllPermissions,
    isLoading,
    error,
    success,
    getAllPermisisonsByModuleId,
    permissionByModule,
    assignPermissionByModule,
    assignPermissionForRole,
    unassignPermissionForRole,
    deletePermissionToModule,
  };
};
