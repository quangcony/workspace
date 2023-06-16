import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import i18n from "../lib/Language";

const useConfirmHealthHis = (onCreate, title) => {
  const { confirm } = Modal;

  const showHealthHisConfirm = (data) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      okText: `${i18n.t("general.button.btnOk")}`,
      okType: "danger",
      cancelText: `${i18n.t("general.button.btnCancel")}`,
      onOk() {
        onCreate(data);
      },
    });
  };
  return {
    confirmCreate: showHealthHisConfirm,
  };
};

export default useConfirmHealthHis;
