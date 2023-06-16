import axiosApiInstance from "../utils/axiosClient";

const generalSettingsApi = {
    getAllGeneralSettings: () => {
        const path = `/generalSetting/getGeneralSetting`;
        return axiosApiInstance.get(path);
    },
    updateAllGeneralSetting: (data) => {
        const path = `/generalSetting/updateGeneralSetting`;
        return axiosApiInstance.patch(path, data);
    },
};

export default generalSettingsApi;