import { useEffect, useState } from "react";
import appApi from "../api/appApis";
import { useSnackbar } from "notistack";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { appState } from "../recoil/atom/appState";
import { useModule } from "./module";
import { generalState } from "../recoil/atom/generalState";

export const useApp = () => {
  const setAppsGeneral = useSetRecoilState(appState);
  const [general, setGeneral] = useRecoilState(generalState);
  const { appSelected, menuModules } = general;
  // const { getAllModulesByApp, modulesByApp } = useModule();
  // const handleGetModules = async () => {
  //   await getAllModulesByApp(appSelected.id);
  // };
  // useEffect(() => {
  //   if (appSelected.id > -1) {
  //     handleGetModules();
  //   }
  // }, [appSelected]);
  // useEffect(() => {
  //   setGeneral({
  //     ...general,
  //     menuModules: modulesByApp,
  //   });
  // }, [modulesByApp]);

  const [apps, setApps] = useState([]);
  const [app, setApp] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const setAppData = useSetRecoilState(appState);

  useEffect(() => {
    getAllApps();
  }, []);

  const getAllApps = async () => {
    setIsLoading(true);
    try {
      let res = await appApi.getAllApps();
      if (res.data && res.data.elements && res.data.elements.length > 0) {
        setApps(res.data.elements);
        setAppData(res.data.elements);
        setAppsGeneral(res.data.elements);
      } else {
        setGeneral({
          ...general,
          appSelected: {
            id: undefined,
            label: undefined,
            slug: undefined,
          },
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setApps([]);
      setAppData([]);
      setAppsGeneral([]);
    }
  };
  const getApp = async (id, callback) => {
    setIsLoading(true);
    try {
      let res = await appApi.getApp(id);
      if (res.data) {
        setApp(res.data.elements.app);
        setIsLoading(false);
        callback();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const createApp = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await appApi.createApp(data);
      if (res.data) {
        setIsLoading(false);
        callback();
      }
      getAllApps();
      enqueueSnackbar(res.data.message, { variant: "success" });
      setApp(undefined);
    } catch (error) {
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const updateApp = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await appApi.updateApp(data, id);
      if (res.data) {
        getAllApps();
        enqueueSnackbar(res.data.message, { variant: "success" });
        setIsLoading(false);
        callback();
        setApp(undefined);
      }
    } catch (error) {
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const deleteApp = async (id) => {
    setIsLoading(true);
    try {
      let res = await appApi.deleteApp(id);
      if (res.data) {
        getAllApps();
        enqueueSnackbar(res.data.message, { variant: "success" });
        setIsLoading(false);
      }
    } catch (error) {
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };

  const assignRoleIdsToAppId = async (appId, roleIds) => {
    setIsLoading(true);

    try {
      let res = await appApi.assignRoleIdsToAppId({
        appId,
        roleIds,
      });
      if (res.data && res.data.status === 201) {
        getAllApps();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const unassignRolesFromApp = async (appId, roleIds) => {
    setIsLoading(true);

    try {
      let res = await appApi.unassignRolesFromApp({
        appId,
        roleIds,
      });
      if (res.data && res.data.status === 201) {
        getAllApps();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getAppsByUserId = async () => {
    setIsLoading(true);
    try {
      let res = await appApi.getAppsByUserId();
      if (res.data && res.data.status === 201) {
        setIsLoading(false);
        return res;
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    // logout,
    // login,
    deleteApp,
    setApp,
    app,
    getApp,
    updateApp,
    createApp,
    getAllApps,
    isLoading,
    error,
    success,
    apps,
    assignRoleIdsToAppId,
    unassignRolesFromApp,
    getAppsByUserId,
  };
};