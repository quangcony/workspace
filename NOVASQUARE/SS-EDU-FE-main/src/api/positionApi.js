import axiosApiInstance from "../utils/axiosClient";

const positionApi = {
    getAllPosition: () => {
        const path = `/position/getAll`;
        return axiosApiInstance.get(path);
    },
    getPositionById: (id) => {
        const path = `/position/getPosition/${id}`;
        return axiosApiInstance.get(path);
    },
    createPosition: (data) => {
        const path = `/position/createPosition`;
        return axiosApiInstance.post(path, data);
    },
    updatePosition: (data, id) => {
        const path = `/position/updatePosition/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deletePosition: (id) => {
        const path = `/position/deletePosition/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default positionApi;