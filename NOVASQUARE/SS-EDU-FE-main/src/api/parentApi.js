import axiosApiInstance from "../utils/axiosClient";

const parentApi = {
    getAllParents: () => {
        const path = `/parent/getAll`;
        return axiosApiInstance.get(path);
    },
    getParent: (id) => {
        const path = `/parent/getParent/${id}`;
        return axiosApiInstance.get(path);
    },
    createParent: (data) => {
        const path = `/parent/createParent`;
        return axiosApiInstance.post(path, data);
    },
    updateParent: (data, id) => {
        const path = `/parent/updateParent/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteParent: (id) => {
        const path = `/parent/deleteParent/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default parentApi;
