import React from "react";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./style.css";

const ToolTip = ({
  icon,
  indexConten,
  description,
  description1,
  description2,
}) => {
  return (
    <div>
      <Tooltip
        title={
          <div className="tooltip-container">
            <h5>{indexConten}</h5>
            <p>{description}</p>
            {description1 && <p>{description1}</p>}
            {description2 && <p>{description2}</p>}
          </div>
        }
        placement="rightTop"
        color="white"
      >
        {icon ? icon : <QuestionCircleOutlined />}
      </Tooltip>
    </div>
  );
};

export default ToolTip;
