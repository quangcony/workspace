import axiosApiInstance from "../utils/axiosClient";

const workPlaceApi = {
    getAllWorkPlaces: () => {
        const path = `/workplace/getAll`;
        return axiosApiInstance.get(path);
    },
    getWorkPlaceById: (id) => {
        const path = `/workplace/getWorkplace/${id}`;
        return axiosApiInstance.get(path);
    },
    createWorkPlace: (data) => {
        const path = `/workplace/createWorkplace`;
        return axiosApiInstance.post(path, data);
    },
    updateWorkPlace: (data, id) => {
        const path = `/workplace/updateWorkplace/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteWorkPlace: (id) => {
        const path = `/workplace/deleteWorkplace/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default workPlaceApi;