import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import i18n from "../lib/Language";

const useConfirm = (onDelete, title, onOpen) => {
  const { confirm } = Modal;

  const showDeleteConfirm = (id, data) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      content: i18n.t("confirmDelete.content"),
      okText: i18n.t("confirmDelete.okText"),
      okType: "danger",
      cancelText:i18n.t("confirmDelete.cancelText"),
      onOk() {
        onDelete(id, data);
      },
      onCancel() {
        onOpen()
      },
      width: 800
    });
  };
  return {
    confirm: showDeleteConfirm,
  };
};

export default useConfirm;
