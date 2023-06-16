import axiosApiInstance from "../utils/axiosClient";

const cityApi = {
  getAllCities: () => {
    const path = `/city/getAll`;
    return axiosApiInstance.get(path);
  },
  getCity: (id) => {
    const path = `/city/getCity/${id}`;
    return axiosApiInstance.get(path);
  },
  createCity: (data) => {
    const path = `/city/createCity`;
    return axiosApiInstance.post(path, data);
  },
  updateCity: (data, id) => {
    const path = `/city/updateCity/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteCity: (id) => {
    const path = `/city/deleteCity/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default cityApi;
