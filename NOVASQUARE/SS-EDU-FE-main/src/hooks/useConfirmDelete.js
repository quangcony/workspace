import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import i18n from "../lib/Language";

const useConfirmDelete = (onDelete, title) => {
  const { confirm } = Modal;

  const showDeleteConfirm = (id) => {
    confirm({
      title: title,
      // icon: <ExclamationCircleOutlined />,
      icon: null,
      content: `${i18n.t("general.cantRestore")}`,
      okText: `${i18n.t("general.button.btnOk")}`,
      okType: "danger",
      cancelText: `${i18n.t("general.button.btnCancel")}`,
      onOk() {
        onDelete(id);
      },
    });
  };
  return {
    confirm: showDeleteConfirm,
  };
};

export default useConfirmDelete;
