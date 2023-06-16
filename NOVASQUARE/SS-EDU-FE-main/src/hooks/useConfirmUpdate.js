import { QuestionCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

const useConfirmUpdate = (onUpdate,title) => {
  const { confirm } = Modal;

  const showUpdateConfirm = (values, id) => {
    confirm({
      title: title,
      icon: <QuestionCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onUpdate(values, id);
      },
    });
  };
  return {
    confirm: showUpdateConfirm,
  };
};

export default useConfirmUpdate;
