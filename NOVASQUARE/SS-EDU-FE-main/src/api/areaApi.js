import axiosApiInstance from "../utils/axiosClient";

const areaApi = {
    getAllAreas: () => {
        const path = `/area/getAll`;
        return axiosApiInstance.get(path);
    },
    getAreaById: (id) => {
        const path = `/area/getArea/${id}`;
        return axiosApiInstance.get(path);
    },
    createArea: (data) => {
        const path = `/area/createArea`;
        return axiosApiInstance.post(path, data);
    },
    updateArea: (data, id) => {
        const path = `/area/updateArea/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteArea: (id) => {
        const path = `/area/deleteArea/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default areaApi;