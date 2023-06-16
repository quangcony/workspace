import axiosApiInstance from "../utils/axiosClient";

const zoneApi = {
    getAllZones: () => {
        const path = `/zone/getAll`;
        return axiosApiInstance.get(path);
    },
    getZone: (id) => {
        const path = `/zone/getZone/${id}`;
        return axiosApiInstance.get(path);
    },
    createZone: (data) => {
        const path = `/zone/createZone`;
        return axiosApiInstance.post(path, data);
    },
    updateZone: (data, id) => {
        const path = `/zone/updateZone/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteZone: (id) => {
        const path = `/zone/deleteZone/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default zoneApi;