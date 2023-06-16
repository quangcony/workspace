import axiosApiInstance from "../utils/axiosClient";

const orgApi = {
    getAllOrgs: () => {
        const path = `/org/getOrgs`;
        return axiosApiInstance.get(path);
    },
    getOrg: ( id) => {
        const path = `/org/getOrg/${id}`;
        return axiosApiInstance.get(path);
    },
    getOrgDefault: () => {
        const path = `/org/getOrg-default`;
        return axiosApiInstance.get(path);
    },
    getOrgByDomain: ( data) => {
        const path = `/org/getOrg-by-domain`;
        return axiosApiInstance.post(path,{
            domain: data
        });
    },
    createOrg: ( data) => {
        const path = `/org/createOrg`;
        return axiosApiInstance.post(path, data);
    },
    updateOrg: ( data, id) => {
        const path = `/org/update-org/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteOrg: ( id) => {
        const path = `/org/deleteOrg/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default orgApi;