import axiosApiInstance from "../utils/axiosClient";

const specialExamResultApi = {
  getAllSpecialExamResult: () => {
    const path = `/specialExamResult/getAll`;
    return axiosApiInstance.get(path);
  },
  getSpecialExamResult: (id) => {
    const path = `/specialExamResult/getSpecialExamResult/${id}`;
    return axiosApiInstance.get(path);
  },
  createSpecialExamResult: (data) => {
    const path = `/specialExamResult/createSpecialExamResult`;
    return axiosApiInstance.post(path, data);
  },
  updateSpecialExamResult: (data, id) => {
    const path = `/specialExamResult/updateSpecialExamResult/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteSpecialExamResult: (id) => {
    const path = `/specialExamResult/deleteSpecialExamResult/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default specialExamResultApi;
