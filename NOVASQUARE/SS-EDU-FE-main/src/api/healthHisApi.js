import axiosApiInstance from "../utils/axiosClient";

const healthHisApi = {
    getAllHealthHiss: () => {
        const path = `/healthHis/getAll`;
        return axiosApiInstance.get(path);
    },
    getHealthHis: (id) => {
        const path = `/healthHis/getHealthHis/${id}`;
        return axiosApiInstance.get(path);
    },
    createHealthHis: (data) => {
        const path = `/healthHis/createHealthHis`;
        return axiosApiInstance.post(path, data);
    },
    updateHealthHis: (data, id) => {
        const path = `/healthHis/updateHealthHis/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteHealthHis: (id) => {
        const path = `/healthHis/deleteHealthHis/${id}`;
        return axiosApiInstance.delete(path);
    },
};
export default healthHisApi;
