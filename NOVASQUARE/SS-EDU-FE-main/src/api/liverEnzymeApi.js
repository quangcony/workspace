import axiosApiInstance from "../utils/axiosClient";

const liverEnzymeApi = {
    getAllLiverEnzymes: () => {
        const path = `/liverEnzyme/getAll`;
        return axiosApiInstance.get(path);
    },
    getLiverEnzymesById: (id) => {
        const path = `/liverEnzyme/getLiverEnzyme/${id}`;
        return axiosApiInstance.get(path);
    },
    createLiverEnzymes: (data) => {
        const path = `/liverEnzyme/createLiverEnzyme`;
        return axiosApiInstance.post(path, data);
    },
    updateLiverEnzymes: (data, id) => {
        const path = `/liverEnzyme/updateLiverEnzyme/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteLiverEnzymes: (id) => {
        const path = `/liverEnzyme/deleteLiverEnzyme/${id}`;
        return axiosApiInstance.delete(path);
    }
};

export default liverEnzymeApi;
