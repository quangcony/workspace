import { Modal } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { isDownloadState } from "../../../recoil/atom/booleanState";
import PeriodicMedicalExaminationDetails from "./PeriodicMedicalExaminationDetails";

const ModalFilePDF = ({ isOpen, onCancel, dataViewPDF, onGetPhysicalExam }) => {
  const [isDownload, setIsDownload] = useRecoilState(isDownloadState);

  const handleCancel = () => {
    onCancel();
    setIsDownload(false);
  };
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
          onGetPhysicalExam={onGetPhysicalExam}
        />
      </Modal>
    </>
  );
};
export default ModalFilePDF;
