import { Modal } from "antd"
import React, { useState } from "react"
import PeriodicMedicalExaminationExcelImportDetails from "./PeriodicMedicalExaminationExcelImportDetails"

const ModalFilePDFExcelImport = ({ isOpen, onCancel, dataViewPDF }) => {
  const handleCancel = () => {
    onCancel()
  }
  return (
    <>
      <Modal
        visible={isOpen}
        open={isOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={1250}
        style={{
          top: 20,
        }}
        footer={false}
      >
        <PeriodicMedicalExaminationExcelImportDetails
          onCancel={handleCancel}
          dataViewPDF={dataViewPDF}
        />
      </Modal>
    </>
  )
}
export default ModalFilePDFExcelImport
