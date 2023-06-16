import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import i18n from "../lib/Language";

const useConfirmClose = (onDelete, title) => {
  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: title,
      icon: null,
      okText: `${i18n.t("general.button.btnOk")}`,
      okType: "danger",
      cancelText: `${i18n.t("general.button.btnCancel")}`,
      onOk() {
        onDelete();
      },
    });
  };
  return {
    confirm: showDeleteConfirm,
  };
};

export default useConfirmClose;
