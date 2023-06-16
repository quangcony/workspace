import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Button, Card, Space, Typography } from "antd";
import React from "react";
import { useState } from "react";
import i18n from "../../../lib/Language";
import ListBank from "./ListBank";
const useStyles = {
  headStyles: {
    backgroundColor: `#${process.env.REACT_APP_CARD_HEADER_COLOR}`,
    borderTop: "5px solid #051a5a",
    height: "48px",
  },
  titleStyles: {
    color: "white",
    fontSize: 16,
    fontWeight: 600,
  },
  iconStyles: {
    fontSize: 16,
    color: "white",
    paddingBottom: 10,
  },
  workPlace: {
    color: "rgba(0, 0, 0, 0.7)",
    fontSize: 12,
  },
  titColor: {
    color: "rgba(0, 0, 0, 0.45)",
    paddingRight: 16,
  },
};
const BankInfo = ({ dataBank }) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <>
      <Card
        title={
          <Space>
            {isShow ? (
              <CaretUpOutlined
                onClick={() => setIsShow(false)}
                style={useStyles.iconStyles}
              />
            ) : (
              <CaretDownOutlined
                onClick={() => setIsShow(true)}
                style={useStyles.iconStyles}
              />
            )}
            <Typography.Title style={useStyles.titleStyles}>
              {i18n.t("hr.bank.bank_info")}
            </Typography.Title>
          </Space>
        }
        headStyle={useStyles.headStyles}
        bodyStyle={{
          opacity: isShow ? 1 : 0,
          visibility: isShow ? "visible" : "hidden",
          height: isShow ? "" : 0,
          transition: "0.3s",
          padding: isShow ? "24px 24px 0" : 0,
        }}
        className="card-header"
      >
        <div style={{ padding: 8 }}></div>
        <ListBank dataBank={dataBank} />
      </Card>
    </>
  );
};

export default BankInfo;
