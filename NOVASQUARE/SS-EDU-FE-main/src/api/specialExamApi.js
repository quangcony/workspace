import axiosApiInstance from "../utils/axiosClient";

const specialExamApi = {
  getAllSpecialExam: () => {
    const path = `/specialExam/getAll`;
    return axiosApiInstance.get(path);
  },
  getSpecialExam: (id) => {
    const path = `/specialExam/getSpecialExam/${id}`;
    return axiosApiInstance.get(path);
  },
  createSpecialExam: (data) => {
    const path = `/specialExam/createSpecialExam`;
    return axiosApiInstance.post(path, data);
  },
  updateSpecialExam: (data, id) => {
    const path = `/specialExam/updateSpecialExam/${id}`;
    return axiosApiInstance.patch(path, data);
  },
  deleteSpecialExam: (id) => {
    const path = `/specialExam/deleteSpecialExam/${id}`;
    return axiosApiInstance.delete(path);
  },
};

export default specialExamApi;
