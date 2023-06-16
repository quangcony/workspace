import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";

import moment from "moment";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { formatDate, removeAccents } from "../../../common";
import { employeeState } from "../../../recoil/atom/employeeState";
import {
  isViewState,
  salaryContractAddSelectstate,
  salaryContractSelectstate,
} from "../../../recoil/atom/salaryContractState";
import { salarySelectstate } from "../../../recoil/atom/salaryState";
import i18n from "../../../lib/Language";
import SalaryContractInfo from "./SalaryContractInfo";
import { useRef } from "react";
import BankInfo from "./BankInfo";
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
const MutationSalaryContractNew = ({
  title = "",
  isOpen,
  onOk,
  onCancel,
  loading,
  salary,
  onUpdate,
  onCreate,
}) => {
  const { employeeBanks } = useEmployeeBank();
  const salaryContractAddSelect = useRecoilValue(salaryContractAddSelectstate);
  const isView = useRecoilValue(isViewState);
  const salaryContractSelect = useRecoilValue(salaryContractSelectstate);
  const employees = useRecoilValue(employeeState);
  const [form] = Form.useForm();
  const [dataBank, setDataBank] = useState();
  const [dataOption, setDataOption] = useState([]);
  const contractFormRef = useRef();
  const [cd, setCD] = useState();
  const [totalTemp, setTotalTemp] = useState(0);

  console.log("cd", cd);
  useEffect(() => {
    if (salaryContractAddSelect) {
      setDataBank(
        employeeBanks.filter(
          (item) => item?.USER_ID === salaryContractAddSelect?.USER_ID
        )
      );
    }
    if (salaryContractSelect) {
      setDataBank(
        employeeBanks.filter(
          (item) => item?.USER_ID === salaryContractSelect?.USER_ID
        )
      );
    }
  }, [salaryContractAddSelect, salaryContractSelect, employeeBanks]);

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
    if (salaryContractSelect) {
      setCD(
        dataOption.filter(
          (item) => item?.value === salaryContractSelect?.USER_ID
        )?.[0]?.label
      );
    }
    if (salaryContractAddSelect) {
      setCD(
        dataOption.filter(
          (item) => item?.value === salaryContractAddSelect?.USER_ID
        )?.[0]?.label
      );
    }
  }, [salaryContractSelect, salaryContractAddSelect]);

  useEffect(() => {
    if (salaryContractAddSelect) {
      contractFormRef.current.setFieldsValue({
        USER_ID: salaryContractAddSelect?.USER_ID,
      });
    }
  }, [salaryContractAddSelect]);

  const onFinish = () => {
    const newData = contractFormRef.current.getFieldsValue();

    if (salaryContractSelect) {
      return handleUpdate(newData, salaryContractSelect?.id);
    } else {
      handleCreate(newData);
    }
  };
  // useEffect(() => {
  //   if (salaryContractSelect) {
  //     contractFormRef.current.setFieldsValue({
  //       ...salaryContractSelect,
  //       CONTRACT_SALARY_DATE: moment(
  //         salaryContractSelect?.CONTRACT_SALARY_DATE
  //       ),
  //     });
  //   } else {
  //     form.resetFields();
  //   }
  // }, [salaryContractSelect]);

  const handleCancel = () => {
    onCancel();
    setTotalTemp(0);
    setDataBank(undefined);
    contractFormRef.resetFields();
  };
  const handleCreate = async (data) => {
    await onCreate(data, () => handleCancel());
  };
  const handleUpdate = async (data, id) => {
    await onUpdate(data, id, () => handleCancel());
  };

  return (
    <>
      <Modal
        width="90%"
        title={title}
        open={isOpen}
        confirmLoading={loading}
        onCancel={handleCancel}
        footer={[
          <Button form="ContractForm" type="second" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            disabled={isView}
            form="ContractForm"
            key="submit"
            htmlType="submit"
            type="primary"
            onClick={onFinish}
          >
            OK
          </Button>,
        ]}
      >
        <Space size={64} style={{ paddingBottom: 16 }}>
          <Typography.Title level={5}>
            <span style={useStyles.titColor}>{i18n.t("hr.id")}: </span>{" "}
            {salaryContractAddSelect
              ? salaryContractAddSelect?.USER_ID
              : salaryContractSelect
              ? salaryContractSelect?.USER_ID
              : ""}
          </Typography.Title>
          <Typography.Title level={5}>
            <span style={useStyles.titColor}>Staff CD: </span> {cd}
          </Typography.Title>
          <Typography.Title level={5}>
            <span style={useStyles.titColor}>{i18n.t("hr.f_name")}: </span>{" "}
            {salaryContractAddSelect
              ? salaryContractAddSelect?.User?.FIRST_NAME
              : salaryContractSelect
              ? salaryContractSelect?.User?.FIRST_NAME
              : ""}
          </Typography.Title>
          <Typography.Title level={5}>
            <span style={useStyles.titColor}>{i18n.t("hr.l_name")}: </span>{" "}
            {salaryContractAddSelect
              ? salaryContractAddSelect?.User?.LAST_NAME
              : salaryContractSelect
              ? salaryContractSelect?.User?.LAST_NAME
              : ""}
          </Typography.Title>
        </Space>
        <SalaryContractInfo
          totalTemp={totalTemp}
          setTotalTemp={setTotalTemp}
          dataOption={dataOption}
          salaryContractAddSelect={salaryContractAddSelect}
          contractFormRef={contractFormRef}
          salaryContractSelect={salaryContractSelect}
        />
        <BankInfo dataBank={dataBank} />
      </Modal>
    </>
  );
};

export default MutationSalaryContractNew;
