import { Table } from "antd";
import React from "react";
import i18n from "../../../lib/Language";

const ListBank = ({ dataBank }) => {
  const columns = [
    {
      title: `${i18n.t("hr.bank.no")}`,
      width: 100,
      render: (_, record, index) => index + 1,
      sorter: (a, b) => a - b,
    },
    {
      title: `${i18n.t("hr.bank.bank_num")}`,
      dataIndex: "BANK_NUMBER",
      sorter: (a, b) => a.BANK_NUMBER - b.BANK_NUMBER,
    },
    {
      title: `${i18n.t("hr.bank.bank_cd")}`,
      dataIndex: "BANK_CD",
      sorter: (a, b) => ("" + a.BANK_CD).localeCompare(b.BANK_CD),
    },
    {
      title: `${i18n.t("hr.bank.bank_name")}`,
      dataIndex: "BANK_NAME",
      sorter: (a, b) => ("" + a.BANK_NAME).localeCompare(b.BANK_NAME),
    },
    {
      title: `${i18n.t("hr.note")}`,
      dataIndex: "NOTE",
    },
  ];
  return (
    <Table
      dataSource={dataBank}
      columns={columns}
      rowClassName="editable-row"
      className={"table-response antd-tbl"}
    />
  );
};

export default ListBank;
