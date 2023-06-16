import axiosApiInstance from "../utils/axiosClient";

const roleApi = {
  getAllRoles: () => {
    const path = `/role/getRoles`;
    return axiosApiInstance.get(path);
  },
  getRole: (id) => {
    const path = `/role/getRole/${id}`;
    return axiosApiInstance.get(path);
  },
  createRole: (data) => {
    const path = `/role/createRole`;
    return axiosApiInstance.post(path, data);
  },
  updateRole: (data, id) => {
    const path = `/role/updateRole/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteRole: (id) => {
    const path = `/role/deleteRole/${id}`;
    return axiosApiInstance.delete(path);
  },
  assignUserIdsToRoleId: (roleId, userIds) => {
    const path = `/role/assignUserIdsToRoleId/${roleId}`;
    return axiosApiInstance.post(path, userIds);
  },
  unassignUserIdsFromRoleId: (roleId, userIds) => {
    const path = `/role/unassignUserIdsFromRoleId/${roleId}`;
    return axiosApiInstance.post(path, userIds);
  },
};

export default roleApi;
