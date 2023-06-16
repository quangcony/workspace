import React from "react";
import { Input } from "antd";

const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^\d*(\.\d*)?$/;
    if (reg.test(inputValue)) {
      onChange(inputValue);
    } else {
      onChange("");
    }
  };

  return <Input {...props} onChange={handleChange} />;
};

export default NumericInput;
