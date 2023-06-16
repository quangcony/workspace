import axiosApiInstance from "../utils/axiosClient";

const permissionApi = {
    getAllPermissions: () => {
        const path = `/permission/getPermissions`;
        return axiosApiInstance.get(path);
    },
    getPermission: ( id) => {
        const path = `/permission/getPermission/${id}`;
        return axiosApiInstance.get(path);
    },
    createPermission: ( data) => {
        const path = `/permission/createPermission`;
        return axiosApiInstance.post(path, data);
    },
    updatePermission: ( data, id) => {
        const path = `/permission/updatePermission/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePermission: ( id) => {
        const path = `/permission/deletePermission/${id}`;
        return axiosApiInstance.delete(path);
    },
    getAllPermisisonsByModuleId: ( id) => {
        const path = `/permission/getPermissions-by-moduleId/${id}`;
        return axiosApiInstance.get(path);
    },
    assignPermissionForRole: ( data) => {
        const path = `/roleModulePermission/createroleModulePermission`;
        return axiosApiInstance.post(path, data);
    },
    unassignPermissionForRole: ( { roleId, moduleId, permissionId }) => {
        const path = `/roleModulePermission/deleteroleModulePermissionBy3IDs/${roleId}/${moduleId}/${permissionId}`;
        return axiosApiInstance.delete(path);
    },
    deletePermissionToModule: ( { moduleId, permissionId }) => {
        const path = `/roleModulePermission/deleteRoleModulePermissionByModuleIdAndPermissionIds/${moduleId}/${permissionId}`;
        return axiosApiInstance.delete(path);
    },
};

export default permissionApi;