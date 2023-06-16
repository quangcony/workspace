import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import i18n from "../lib/Language";

const salaryConfirm = (onApprove, title) => {
  const { confirm } = Modal;

  const salaryConfirm = () => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      okText:"Có",
      okType: "danger",
      cancelText:"Không",
      onOk() {
        onApprove();
      },
      onCancel() {
      },
      width: 500
    });
  };
  return {
    confirm: salaryConfirm,
  };
};

export default salaryConfirm;
