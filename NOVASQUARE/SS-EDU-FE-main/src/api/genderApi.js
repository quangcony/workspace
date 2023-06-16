import axiosApiInstance from "../utils/axiosClient"

const genderApi = {
  getAllGenders: () => {
    const path = `/gender/getAll`
    return axiosApiInstance.get(path)
  },
  getGenderById: (id) => {
    const path = `/gender/getGender/${id}`
    return axiosApiInstance.get(path)
  },
  createGender: (data) => {
    const path = `/gender/createGender`
    return axiosApiInstance.post(path, data)
  },
  updateGender: (data, id) => {
    const path = `/gender/updateGender/${id}`
    return axiosApiInstance.patch(path, data)
  },
  deleteGender: (id) => {
    const path = `/gender/deleteGender/${id}`
    return axiosApiInstance.delete(path)
  },
}

export default genderApi
