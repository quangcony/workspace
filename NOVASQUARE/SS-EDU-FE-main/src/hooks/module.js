import { useEffect, useState } from "react";
import moduleApi from "../api/moduleApi";
import { useSnackbar } from "notistack";
import { useRecoilState, useSetRecoilState } from "recoil";
import { generalState } from "../recoil/atom/generalState";
import { moduleMenuState } from "../recoil/atom/moduleMenuState";

export const useModule = () => {
  const [module, setModule] = useState();
  const [modules, setModules] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const setMenuModule = useSetRecoilState(moduleMenuState);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" });
    }
  }, [error, success]);


  const [general, setGeneral] = useRecoilState(generalState);
  const { appSelected } = general;

  const getAllModules = async () => {
    setIsLoading(true);
    return new Promise(async(resolve,reject)=>{
      try {
        let res = await moduleApi.getAllModules();
        if (res.data && res.data.elements) {
          // setModules(res.data.elements)
          const newData = [...res.data.elements];

          newData.forEach((element) => {
            element.APP_NAME = element.App?.NAME;
          });
          setModules(newData)
          setIsLoading(false);
          return resolve(newData)
        }
        setIsLoading(false);
        resolve([])

        
      } catch (error) {
        reject(error)
        setIsLoading(false);
      }
    })
  };

  const getAllModulesByApp = async (app) => {
    // let setApp
    // // if (!appSelected.id) return;
    // if (app){
    //   setApp = app
    // }else{
    //   setApp = appSelected
    // }
    setIsLoading(true);
    return new Promise(async(resolve,reject)=>{
      try {
        // console.log("appSelected: " ,app)
        let res = await moduleApi.getAllModulesByAppId(app?.id);
        // console.log("res.data.elements: ", res.data.elements)
        if (res.data) {
          let newData = [];
          // console.log("res.data.elements: ", res.data.elements)
          if (res.data && res.data.elements && res.data.elements.length > 0) {
            res.data.elements.forEach((el) => {
              const url = `/${app.APP_CD}/${el.MODULE_CD}`;
              newData.push({ ...el, url });
            });
          }
          const sortData = newData.sort((a,b) => a.INDEX -b.INDEX);
          // console.log("sortData: ", sortData);
          setIsLoading(false);
          setMenuModule(sortData)
          resolve(sortData);
        }else{
          setIsLoading(false);
          setMenuModule([])
          resolve([])
        }
       
      } catch (error) {
        setIsLoading(false);
        reject(error)
        
      }
    })
  };

  const getAllModulesByAppId = async (appId) => {
    if (!appId) return;
    setIsLoading(true);
    return new Promise(async(resolve,reject)=>{
      try {
        let res = await moduleApi.getModulesPermissionsByAppId(appId);
        if (res.data) {
          setIsLoading(false);
          resolve(res.data.elements);
        } else {
          setIsLoading(false);
          resolve([]);
        }
        
      } catch (error) {
        setIsLoading(false);
        reject(error)
      }
    })
  };

  const getModule = async (id, callback) => {
    setSuccess(undefined);
    setError(undefined);
    setIsLoading(true);
    try {
      let res = await moduleApi.getModule(id);
      if (res.data) {
        setModule(res.data.elements);
        callback();
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
  const createModule = async (data, callback) => {
    setIsLoading(true);
    try {
      let res = await moduleApi.createModule(data);
      if (res.data) {
        getAllModules();
        enqueueSnackbar(res.data.message, { variant: "success" });
        setError(undefined);
        setIsLoading(false);
        callback();
        setModule(undefined);
        getAllModulesByApp();
      }
    } catch (error) {
      setSuccess(undefined);
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setIsLoading(false);
    }
  };
  const updateModule = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await moduleApi.updateModule(data, id);
      if (res.data) {
        getAllModules();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
        setModule(undefined);
        getAllModulesByApp();
      }
    } catch (error) {
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setSuccess(undefined);
      setIsLoading(false);
      // callback();
    }
  };
  const deleteModule = async (id) => {
    setIsLoading(true);
    try {
      let res = await moduleApi.deleteModule(id);
      if (res.data) {
        getAllModules();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        getAllModulesByApp();
      }
    } catch (error) {
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
      setSuccess(undefined);

      setIsLoading(false);
    }
  };

  return {
    // logout,
    // login,
    deleteModule,
    module,
    modules,
    setModule,
    getModule,
    updateModule,
    createModule,
    getAllModules,
    isLoading,
    error,
    success,
    getAllModulesByApp,
    getAllModulesByAppId,
  };
};
