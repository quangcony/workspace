import axiosApiInstance from "../utils/axiosClient"
import fileDownload from "js-file-download";
const formDataConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
export const importApis = {
  verifyExamResultFile: async ({ file }) => {
    const path = `/upload/verifyExamResultFile`
    return axiosApiInstance.post(path, file)
  },
  verifyMedicalFacilityFile: async ({ file }) => {
    const path = `/upload/verifyMedicalFacilityFile`
    return axiosApiInstance.post(path, file)
  },
  verifyRecruitExamResultFile: async ({ file }) => {
    const path = `/upload/verifyRecruitExamResultFile`
    return axiosApiInstance.post(path, file)
  },
  verifyOccupationExamResultFile: async (data) => {
    const path = `/upload/verifyOccupationExamResultFile`
    return axiosApiInstance.post(path, data, formDataConfig)
  },
  importExamResultFromExcelFile: async (data) => {//data includes file and json data
    const path = `/upload/importExamResultFromExcelFile`
    return axiosApiInstance.post(path, data, formDataConfig)
  },
  importMedicalFacilityFromExcelFile: async (data) => {//data includes file and json data
    const path = `/upload/importMedicalFacilityFromExcelFile`
    return axiosApiInstance.post(path, data, formDataConfig)
  },
  importRecruitExamResultFromExcelFile: async (data) => {//data includes file and medical type
    const path = `/upload/importRecruitExamResultFromExcelFile`
    return axiosApiInstance.post(path, data, formDataConfig)
  },
  importOccupationExamResultFromExcelFile: async (data) => {//data includes file and medical type
    const path = `/upload/importOccupationExamResultFromExcelFile`
    return axiosApiInstance.post(path, data, formDataConfig)
  },
  getImportHistoriesByType: async (examType) => {
    const path = `/importHistory/getImportHistoriesByType/${examType}`
    return axiosApiInstance.get(path)
  }
  ,
  downloadExcelFile: async fileName => {
    const path = `/upload/downloadExcelFile/${fileName}`
    // return axiosApiInstance.get(path)
    const result = await axiosApiInstance.get(path, { responseType: 'blob' })
    fileDownload(result.data, fileName.substr(
      fileName.indexOf("_") + 1
    ));
    return
  },
  exportPhysicalExamsToExcel: async (physicalExams, examType) => {
    const path = `/upload/exportPhysicalExamsToExcelFile`
    const result = await axiosApiInstance.post(path, physicalExams, { responseType: 'blob' })
    switch (examType) {
      case 4:
        fileDownload(result.data, `KetQuaKhamSucKhoeDinhKy.xlsx`);
        break;
      case 5:
        fileDownload(result.data, `KetQuaKhamSucKhoeNangNhocDocHai.xlsx`);
        break;
      default:
        break;
    }
    // fileDownload(result.data, `${new Date().valueOf()
    //   }_KetQuaKhamSucKhoeDinhKy.xlsx`);
    return
  },
  exportOccupationPhysicalExamsToExcelFile: async (physicalExams) => {
    const path = `/upload/exportOccupationPhysicalExamsToExcelFile`
    const result = await axiosApiInstance.post(path, physicalExams, { responseType: 'blob' })
    fileDownload(result.data, `KetQuaKhamSucKhoeBenhNgheNghiep.xlsx`);
    // fileDownload(result.data, `${new Date().valueOf()
    //   }_KetQuaKhamSucKhoeDinhKy.xlsx`);
    return
  },
  exportRecruitPhysicalExamsToExcel: async (physicalExams) => {
    const path = `/upload/exportRecruitPhysicalExamsToExcelFile`
    const result = await axiosApiInstance.post(path, physicalExams, { responseType: 'blob' })
    fileDownload(result.data, `KetQuaKhamSucKhoeTuyenDung.xlsx`);
    // fileDownload(result.data, `${new Date().valueOf()
    //   }_KetQuaKhamSucKhoeDinhKy.xlsx`);
    return
  },
  exportMedicalFacilityToExcel: async (data) => {
    const path = `/upload/exportMedicalFacilityToExcel`
    const result = await axiosApiInstance.post(path, data, { responseType: 'blob' })
    fileDownload(result.data, `DanhSachCoSoKhamChuaBenh.xlsx`);
    // fileDownload(result.data, `${new Date().valueOf()
    //   }_KetQuaKhamSucKhoeDinhKy.xlsx`);
    return
  },
}

// export default importApis