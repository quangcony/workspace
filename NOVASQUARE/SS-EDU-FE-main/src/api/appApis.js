import axiosApiInstance from "../utils/axiosClient";

const appApi = {
  getAllApps: () => {
    const path = `/app/getApps`;
    return axiosApiInstance.get(path);
  },
  getApp: (id) => {
    const path = `/app/getApp/${id}`;
    return axiosApiInstance.get(path);
  },
  getAppsByUserId: () => {
    const path = `/user/getAppsByUserId`;
    return axiosApiInstance.get(path);
  },
  createApp: (data) => {
    const path = `/app/createApp`;
    return axiosApiInstance.post(path, data);
  },
  updateApp: (data, id) => {
    const path = `/app/updateApp/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteApp: (id) => {
    const path = `/app/deleteApp/${id}`;
    return axiosApiInstance.delete(path);
  },
  assignRoleIdsToAppId: (data) => {
    const path = `/app/assignRoleIdsToAppId`;
    return axiosApiInstance.post(path, data);
  },
  unassignRolesFromApp: (data) => {
    const path = `/app/unassignRolesFromApp`;
    return axiosApiInstance.post(path, data);
  },
  setDefaultModuleIdToAppId: (data) => {
    const path = `/app/setDefaultModuleIdToAppId`;
    return axiosApiInstance.post(path, data);
  },
};

export default appApi;
