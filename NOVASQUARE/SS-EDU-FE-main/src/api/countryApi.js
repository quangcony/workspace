import axiosApiInstance from "../utils/axiosClient";

const countryApi = {
    getAllCountries: () => {
        const path = `/country/getAll`;
        return axiosApiInstance.get(path);
    },
    getCountry: (id) => {
        const path = `/country/getCountry/${id}`;
        return axiosApiInstance.get(path);
    },
    createCountry: (data) => {
        const path = `/country/createCountry`;
        return axiosApiInstance.post(path, data);
    },
    updateCountry: (data, id) => {
        const path = `/country/updateCountry/${id}`;
        return axiosApiInstance.patch(path, data);
    },
    deleteCountry: (id) => {
        const path = `/country/deleteCountry/${id}`;
        return axiosApiInstance.delete(path);
    },
};

export default countryApi;
