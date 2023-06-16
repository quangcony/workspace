import { Modal, Progress } from "antd";
import React from "react";

const runPercent = ({ title, isOpen, percent }) => {
  return (
    <Modal footer={false} title={title} open={isOpen}>
      <Progress percent={percent} />
    </Modal>
  );
};

export default runPercent;
