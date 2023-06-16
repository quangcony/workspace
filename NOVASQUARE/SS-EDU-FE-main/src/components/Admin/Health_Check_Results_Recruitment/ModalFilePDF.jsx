import { Modal } from "antd"
import React, { useState } from "react"
import PeriodicMedicalExaminationDetails from "./PeriodicMedicalExaminationDetails"

const ModalFilePDF = ({ isOpen, onCancel, dataViewPDF }) => {
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
        <PeriodicMedicalExaminationDetails
          onCancel={handleCancel}
          dataViewPDF={dataViewPDF}
        />
      </Modal>
    </>
  )
}
export default ModalFilePDF
