import axiosApiInstance from "../utils/axiosClient";

const userApi = {
  getAllUsers: () => {
    const path = `/user/getUsers`;
    return axiosApiInstance.get(path);
  },
  getUser: (id) => {
    const path = `/user/get-user/${id}`;
    return axiosApiInstance.get(path);
  },
  createUser: (data) => {
    const path = `/user/create-user`;
    return axiosApiInstance.post(path, data);
  },
  updateUser: (data, id) => {
    const path = `/user/update-user/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteUser: (id) => {
    const path = `/user/delete-user/${id}`;
    return axiosApiInstance.delete(path);
  },
  converPassword: ( id) => {
    const path = `/user/convertPwStringToHashByUserId/${id}`;
    return axiosApiInstance.post(path);
  },
  getUsersGenerate: (axiosJWT) => {
    const path = `/user/getOldPwUsers`;
    return axiosApiInstance.get(path);
  },

  assignRoleIdsToUserId: ( data) => {
    const path = `/user/assignRoleIdsToUserId`;
    return axiosApiInstance.post(path, data);
  },
  unassignRoleIdsFromUserId: ( data) => {
    const path = `/user/unassignRoleIdsFromUserId`;

    return axiosApiInstance.post(path, data);
  },
  resetPasswordUser: (id, data) => {
    const path = `/user/reset-password-user/${id}`;
    return axiosApiInstance.patch(path, data);
  },
};

export default userApi;
