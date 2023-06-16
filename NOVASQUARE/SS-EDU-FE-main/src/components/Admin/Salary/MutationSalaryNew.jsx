import {
  Button,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { Form } from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { formatDate, removeAccents } from "../../../common";
import { employeeState } from "../../../recoil/atom/employeeState";
import { useSearch } from "react-use-search";
import { logDOM } from "@testing-library/react";
import {
  salarySelect,
  salarySelectstate,
} from "../../../recoil/atom/salaryState";
import SalaryInfo from "./SalaryInfo";
import { useRef } from "react";
import i18n from "../../../lib/Language";
import BankInfo from "../SalaryContract/BankInfo";
import { useEmployeeBank } from "../../../hooks/employeeBank";
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
const predicate = (EmployeeData, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const CD = removeAccents(String(EmployeeData.CD)).toLowerCase().trim();
  return CD.includes(newQuery);
};
const MutationSalaryNew = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  salary,
  onUpdate,
  user,
  workingStatus,
  expenseTypeOption,
}) => {
  const { employeeBanks } = useEmployeeBank();
  const [totalTemp, setTotalTemp] = useState(0);

  const salaryRef = useRef();
  const [salarySelect, setSalarySelect] = useRecoilState(salarySelectstate);
  const employees = useRecoilValue(employeeState);
  const [form] = Form.useForm();
  const [dataOption, setDataOption] = useState([]);
  const [dataBank, setDataBank] = useState();
  const [cd, setCD] = useState();

  useEffect(() => {
    if (salarySelect) {
      setDataBank(
        employeeBanks.filter((item) => item.USER_ID === salarySelect?.USER_ID)
      );
    }
  }, [salarySelect, employeeBanks]);

  useEffect(() => {
    setDataOption(() =>
      employees.map((item) => ({
        // ...item,
        label: item.CD,
        value: item.USER_ID,
      }))
    );
  }, [employees]);
  useEffect(() => {
    if (salarySelect) {
      setCD(
        dataOption.filter((item) => item?.value === salarySelect?.USER_ID)?.[0]
          ?.label
      );
    }
  }, [salarySelect, salarySelect]);

  const onFinish = () => {
    let newData = [];
    const values = salaryRef.current.getFieldsValue();
    if (values?.WORKING_STATUS_ID === 11) {
      const result = { ...values, PAYMENT_DATE: new Date() };
      newData.push(result);
    } else {
      newData.push(values);
    }
    console.log("newData", newData);
    if (salary) {
      return onUpdate(newData?.[0], salary.id, () => handleCancel());
    } else {
      onOk(newData, () => handleCancel());
    }
  };
  useEffect(() => {
    if (salarySelect) {
      form.setFieldsValue({
        ...salarySelect,
        SALARY_DATE: moment(salarySelect?.SALARY_DATE),
        PAYMENT_DATE: moment(salarySelect?.PAYMENT_DATE),
      });
    } else {
      form.resetFields();
    }
  }, [salarySelect]);

  const handleCancel = () => {
    onCancel();
    setTotalTemp(0);
    setSalarySelect(undefined);
    form.resetFields();
  };

  return (
    <>
      <Modal
        width="90%"
        title={title}
        visible={isOpen}
        // onOk={onFinish}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" type="second" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            onClick={onFinish}
            form="myForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            OK
          </Button>,
        ]}
      >
        <Space size={64} style={{ paddingBottom: 16 }}>
          <Typography.Title level={5}>
            <span style={useStyles.titColor}>{i18n.t("hr.id")}: </span>{" "}
            {salarySelect?.USER_ID}
          </Typography.Title>
          <Typography.Title level={5}>
            <span style={useStyles.titColor}>Staff CD: </span> {cd}
          </Typography.Title>
          <Typography.Title level={5}>
            <span style={useStyles.titColor}>{i18n.t("hr.f_name")}: </span>{" "}
            {salarySelect?.User?.FIRST_NAME}
          </Typography.Title>
          <Typography.Title level={5}>
            <span style={useStyles.titColor}>{i18n.t("hr.l_name")}: </span>{" "}
            {salarySelect?.User?.LAST_NAME}
          </Typography.Title>
        </Space>
        <SalaryInfo
          expenseTypeOption={expenseTypeOption}
          totalTemp={totalTemp}
          setTotalTemp={setTotalTemp}
          salarySelect={salarySelect}
          dataOption={dataOption}
          workingStatus={workingStatus}
          salaryRef={salaryRef}
        />
        <BankInfo dataBank={dataBank} />
      </Modal>
    </>
  );
};

export default MutationSalaryNew;
