import { Modal } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import { isDownloadState } from "../../../../recoil/atom/booleanState";
import ShowDetailsPDF from "../../../ShowDetailsPDF/ShowDetailsPDF";

const ModalFilePDF = ({ isOpen, onCancel }) => {
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
        <ShowDetailsPDF onCancel={handleCancel} title="ĐỊNH KỲ" />
      </Modal>
    </>
  );
};
export default ModalFilePDF;
