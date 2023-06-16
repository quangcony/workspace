import axiosApiInstance from "../utils/axiosClient";

const ureCreatineApi = {
    getAllureCreatines: () => {
        const path = `/ureCreatine/getAll`;
        return axiosApiInstance.get(path);
    },
    getUreCreatineById: (id) => {
        const path = `/ureCreatine/getUreCreatine/${id}`;
        return axiosApiInstance.get(path);
    },
    createUreCreatine: (data) => {
        const path = `/ureCreatine/createUreCreatine`;
        return axiosApiInstance.post(path, data);
    },
    updateUreCreatine: (data, id) => {
        const path = `/ureCreatine/updateUreCreatine/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteUreCreatine: (id) => {
        const path = `/ureCreatine/deleteUreCreatine/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default ureCreatineApi;
