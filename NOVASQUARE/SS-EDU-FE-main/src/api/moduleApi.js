import axiosApiInstance from "../utils/axiosClient";

const moduleApi = {
  getAllModules: () => {
    const path = `/module/getModules`;
    return axiosApiInstance.get(path);
  },
  getAllModulesByAppId: (id) => {
    const path = `/module/getModules-by-appId/${id}`;
    return axiosApiInstance.get(path);
  },
  getModulesPermissionsByAppId: (appId) => {
    const path = `/module/getModulesPermissionsByAppId/${appId}`;
    return axiosApiInstance.get(path);
  },
  getModule: (id) => {
    const path = `/module/getModule/${id}`;
    return axiosApiInstance.get(path);
  },
  createModule: (data) => {
    const path = `/module/createModule`;
    return axiosApiInstance.post(path, data);
  },
  updateModule: (data, id) => {
    const path = `/module/updateModule/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteModule: (id) => {
    const path = `/module/deleteModule/${id}`;
    return axiosApiInstance.delete(path);
  },
  assignPermissionForModule: (id, data) => {
    const path = `/module/assign-permission-for-module/${id}`;
    return axiosApiInstance.post(path, data);
  },
  getPermissionsByModuleId: (moduleId) => {
    const path = `/module/getPermissionsByModuleId/${moduleId}}`;
    return axiosApiInstance.get(path);
  },
};

export default moduleApi;
