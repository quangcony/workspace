import axiosApiInstance from "../utils/axiosClient"

const expenseTypeApi = {
  getAllExpenseTypes: () => {
    const path = `/expenseType/getAll`
    return axiosApiInstance.get(path)
  },
  getExpenseTypeById: (id) => {
    const path = `/expenseType/getExpenseType/${id}`
    return axiosApiInstance.get(path)
  },
  createExpenseType: (data) => {
    const path = `/expenseType/createExpenseType`
    return axiosApiInstance.post(path, data)
  },
  updateExpenseType: (data, id) => {
    const path = `/expenseType/updateExpenseType/${id}`
    return axiosApiInstance.patch(path, data)
  },
  deleteExpenseType: (id) => {
    const path = `/expenseType/deleteExpenseType/${id}`
    return axiosApiInstance.delete(path)
  },
}

export default expenseTypeApi
