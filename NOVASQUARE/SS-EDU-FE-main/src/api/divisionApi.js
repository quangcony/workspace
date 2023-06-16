import axiosApiInstance from "../utils/axiosClient";

const divisionApi = {
    getAllDivisions: () => {
        const path = `/division/getAll`;
        return axiosApiInstance.get(path);
    },
    getDivisionById: (id) => {
        const path = `/division/getDivision/${id}`;
        return axiosApiInstance.get(path);
    },
    createDivision: (data) => {
        const path = `/division/createDivision`;
        return axiosApiInstance.post(path, data);
    },
    updateDivision: (data, id) => {
        const path = `/division/updateDivision/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteDivision: (id) => {
        const path = `/division/deleteDivision/${id}`;
        return axiosApiInstance.delete(path);
    }
};


export default divisionApi;