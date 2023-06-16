import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import generalSettingsApi from "../api/generalSettingsApi";
import { useSetRecoilState } from "recoil";
import { generalSettingState } from "../recoil/atom/generalSettingState";

export const useGeneralSetting = () => {
  const [generalSettings, setGeneralSettings] = useState([]);
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

  const setGeneralSettingList = useSetRecoilState(generalSettingState);

  useEffect(() => {
    getAllGeneralSettings();
  }, []);

  const getAllGeneralSettings = async () => {
    setIsLoading(true);
    try {
      let res = await generalSettingsApi.getAllGeneralSettings();
      if (res.data) {
        setGeneralSettings(res.data.elements);
        setGeneralSettingList(res.data.elements.generalSetting);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };


  const updateAllGeneralSetting = async (data, id, callback) => {
    setIsLoading(true);
    try {
      let res = await generalSettingsApi.updateAllGeneralSetting(data, id);
      if (res.data) {
        getAllGeneralSettings();
        setSuccess(res.data.message);
        setError(undefined);
        setIsLoading(false);
        callback();
      }
    } catch (error) {
      setSuccess(undefined);
      setIsLoading(false);
    }
  };



  return {
    generalSettings,
    isLoading,
    error,
    success,
    getAllGeneralSettings,
    setGeneralSettings,
    updateAllGeneralSetting,
  };
};
