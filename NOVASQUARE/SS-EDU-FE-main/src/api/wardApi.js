import axiosApiInstance from "../utils/axiosClient";

const wardApi = {
    getAllWards: () => {
        const path = `/ward/getAll`;
        return axiosApiInstance.get(path);
    },
    getWard: (id) => {
        const path = `/ward/getWard/${id}`;
        return axiosApiInstance.get(path);
    },
    createWard: (data) => {
        const path = `/ward/createWard`;
        return axiosApiInstance.post(path, data);
    },
    updateWard: (data, id) => {
        const path = `/ward/updateWard/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteWard: (id) => {
        const path = `/ward/deleteWard/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default wardApi;
