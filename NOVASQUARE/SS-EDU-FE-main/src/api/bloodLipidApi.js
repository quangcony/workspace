import axiosApiInstance from "../utils/axiosClient";

const bloodLipidApi = {
    getAllBloodLipids: () => {
        const path = `/bloodLipid/getAll`;
        return axiosApiInstance.get(path);
    },
    getBloodLipidById: (id) => {
        const path = `/bloodLipid/getBloodLipid/${id}`;
        return axiosApiInstance.get(path);
    },
    createBloodLipid: (data) => {
        const path = `/bloodLipid/createBloodLipid`;
        return axiosApiInstance.post(path, data);
    },
    updateBloodLipid: (data, id) => {
        const path = `/bloodLipid/updateBloodLipid/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteBloodLipid: (id) => {
        const path = `/bloodLipid/deleteBloodLipid/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default bloodLipidApi;
