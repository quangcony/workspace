import { Modal } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { isDownloadState } from "../../../../recoil/atom/booleanState";
import HardToxicMedicalExaminationDetails from "./HardToxicMedicalExaminationDetails";

const ModalFilePDF = ({ isOpen, onCancel, dataViewPDF, onGetPhysicalExam }) => {
  const [isDownload, setIsDownload] = useRecoilState(isDownloadState);

  const handleCancel = () => {
    onCancel();
    setIsDownload(false);
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
        <HardToxicMedicalExaminationDetails
          onCancel={handleCancel}
          dataViewPDF={dataViewPDF}
          onGetPhysicalExam={onGetPhysicalExam}
        />
      </Modal>
    </>
  );
};
export default ModalFilePDF;
