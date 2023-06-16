import { Modal } from "antd";
import React from "react";
import PeriodicMedicalExaminationExcelImportDetails from "./PeriodicMedicalExaminationExcelImportDetails";

const ModalFilePDFExcelImport = ({ title, isOpen, onCancel, dataViewPDF }) => {
  const handleCancel = () => {
    onCancel();
  };
  return (
    <>
      <Modal
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
          title={title}
          onCancel={handleCancel}
          dataViewPDF={dataViewPDF}
        />
      </Modal>
    </>
  );
};
export default ModalFilePDFExcelImport;
