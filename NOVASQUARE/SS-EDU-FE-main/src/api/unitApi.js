import axiosApiInstance from "../utils/axiosClient";

const unitApi = {
    getAllUnits: () => {
        const path = `/unit/getAll`;
        return axiosApiInstance.get(path);
    },
    getUnitById: (unitId) => {
        const path = `/unit/getUnit/${unitId}`;
        return axiosApiInstance.get(path);
    },
    createUnit: (data) => {
        const path = `/unit/createUnit`;
        return axiosApiInstance.post(path, data);
    },
    updateUnit: (data, unitId) => {
        const path = `/unit/updateUnit/${unitId}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteUnit: (unitId) => {
        const path = `/unit/deleteUnit/${unitId}`;
        return axiosApiInstance.delete(path);
    }
};

export default unitApi;