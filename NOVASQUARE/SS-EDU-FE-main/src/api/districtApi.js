import axiosApiInstance from "../utils/axiosClient";

const districtApi = {
  getAllDistricts: () => {
    const path = `/district/getAll`;
    return axiosApiInstance.get(path);
  },
  getDistrict: (id) => {
    const path = `/district/getDistrict/${id}`;
    return axiosApiInstance.get(path);
  },
  createDistrict: (data) => {
    const path = `/district/createDistrict`;
    return axiosApiInstance.post(path, data);
  },
  updateDistrict: (data, id) => {
    const path = `/district/updateDistrict/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteDistrict: (id) => {
    const path = `/district/deleteDistrict/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default districtApi;
