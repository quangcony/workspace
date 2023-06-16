import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Typography } from "antd";
import React, { useRef, useState } from "react";
import { AccountInfo, Bank, Family, Job, Personal, Study } from ".";
import i18n from "../../../lib/Language";
import { useStyles } from "./style";

// Generate Random Strings for Employee CD
function generateEmployeeCD(length, records) {
  let result = "";
  const totalRecord = String(records.length);
  for (let i = 0; i < length - totalRecord.length; i++) {
    result += 0;
  }

  return (result + totalRecord);
}

const ModalEmployee = (props) => {
  const {
    title = "",
    employee,
    isOpen,
    onCancel,
    onOk,
    onUpdate,
    loading,
    employees,
  } = props;

  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const [personalFormCheck, setPersonalFormCheck] = useState(false);
  const [jobFormCheck, setJobFormCheck] = useState(false);
  const [studyFormCheck, setStudyFormCheck] = useState(false);

  const personalRef = useRef();
  const studyRef = useRef();
  const jobRef = useRef();
  const accountRef = useRef();
  const [countryId, setCountryId] = useState();

  const handleCancel = () => {
    onCancel();
    // Reset form of components when open or close modal
    personalRef.current.resetFields();
    studyRef.current.resetFields();
    jobRef.current.resetFields();
    accountRef.current.resetFields();

    setUserId(undefined);
    setUser(undefined);
    setCountryId(undefined);
    setPersonalFormCheck(false);
    setStudyFormCheck(false);
    setJobFormCheck(false);
  };
  const handleCreateApp = async (data) => {
    await onOk(data, () => handleCancel());
  };
  const handleUpdateApp = async (data, id) => {
    await onUpdate(data, id, () => handleCancel());
  };

  const handleOk = () => {
    personalRef.current
      .validateFields()
      .then(() => {
        setPersonalFormCheck(false);
      })
      .catch(() => {
        setPersonalFormCheck(true);
      });
    studyRef.current
      .validateFields()
      .then(() => {
        setStudyFormCheck(false);
      })
      .catch(() => {
        setStudyFormCheck(true);
      });
    jobRef.current
      .validateFields()
      .then(() => {
        setJobFormCheck(false);
      })
      .catch(() => {
        setJobFormCheck(true);
      });

    const newData = {
      USER_ID: personalRef.current.getFieldValue("id"),
      CD: employee ? employee.CD : generateEmployeeCD(7, employees),
      ...studyRef.current.getFieldsValue(),
      ...jobRef.current.getFieldsValue(),
    };

    const {
      USER_ID,
      CD,
      GRADUATE_SCHOOL,
      ACADEMIC_LEVEL,
      SPECIALIZED,
      CITY_ID,
      MARITAL_STATUS_ID,
      AREA_ID,
      DEPT_ID,
      DIVISION_ID,
      UNIT_ID,
      BRANCH_ID,
      POSITION_ID,
      JOB_LEVEL_ID,
      START_WORKING_DATE,
      EMP_STATUS_ID,
    } = newData;

    if (
      SPECIALIZED?.trim() === "" ||
      SPECIALIZED === undefined ||
      CD?.trim() === "" ||
      CD === undefined ||
      GRADUATE_SCHOOL?.trim() === "" ||
      GRADUATE_SCHOOL === undefined ||
      ACADEMIC_LEVEL?.trim() === "" ||
      ACADEMIC_LEVEL === undefined ||
      USER_ID === undefined ||
      CITY_ID === undefined ||
      MARITAL_STATUS_ID === undefined ||
      AREA_ID === undefined ||
      DEPT_ID === undefined ||
      DIVISION_ID === undefined ||
      UNIT_ID === undefined ||
      BRANCH_ID === undefined ||
      POSITION_ID === undefined ||
      JOB_LEVEL_ID === undefined ||
      START_WORKING_DATE === null ||
      START_WORKING_DATE === undefined ||
      EMP_STATUS_ID === undefined
    ) {
      return;
    }
    if (employee) {
      return handleUpdateApp(newData, employee.id);
    }
    handleCreateApp(newData);
  };

  const showConfirm = () => {
    Modal.confirm({
      title: `${i18n.t("hr.cancel_confirm")}`,
      icon: <QuestionCircleOutlined />,
      onOk() {
        handleCancel();
      },
    });
  };

  return (
    <Modal
      title={title}
      width="90%"
      open={isOpen}
      onCancel={handleCancel}
      maskClosable={false}
      destroyOnClose={true}
      footer={[
        <Button type="second" onClick={showConfirm}>
          Cancel
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          onClick={handleOk}
          loading={loading}
        >
          OK
        </Button>,
      ]}
      style={{ top: 20, overflow: "hidden" }}
      forceRender
    >
      <Space size={64} style={{ paddingBottom: 16 }}>
        <Typography.Title level={5}>
          <span style={useStyles.titColor}>{i18n.t("hr.id")}: </span>{" "}
          {employee && employee?.USER_ID}
        </Typography.Title>
        <Typography.Title level={5}>
          <span style={useStyles.titColor}>{i18n.t("hr.cd")}: </span>{" "}
          {employee && employee?.CD}
        </Typography.Title>
        <Typography.Title level={5}>
          <span style={useStyles.titColor}>{i18n.t("hr.f_name")}: </span>{" "}
          {employee && employee?.User?.FIRST_NAME}
        </Typography.Title>
        <Typography.Title level={5}>
          <span style={useStyles.titColor}>{i18n.t("hr.l_name")}: </span>{" "}
          {employee && employee?.User?.LAST_NAME}
        </Typography.Title>
      </Space>
      <Space direction="vertical" size={24} style={{ display: "flex" }}>
        <Personal
          personalRef={personalRef}
          employee={employee}
          user={user}
          setUserId={setUserId}
          setUser={setUser}
          personalFormCheck={personalFormCheck}
          setPersonalFormCheck={setPersonalFormCheck}
          isOpen={isOpen}
        />
        <Study
          studyRef={studyRef}
          employee={employee}
          studyFormCheck={studyFormCheck}
          setStudyFormCheck={setStudyFormCheck}
          isOpen={isOpen}
        />
        <Family userId={userId} isOpen={isOpen} />
        <Job
          jobRef={jobRef}
          employee={employee}
          countryId={countryId}
          setCountryId={setCountryId}
          jobFormCheck={jobFormCheck}
          setJobFormCheck={setJobFormCheck}
          isOpen={isOpen}
        />
        <Bank userId={userId} isOpen={isOpen} />
        <AccountInfo
          accountRef={accountRef}
          employee={employee}
          user={user}
          isOpen={isOpen}
        />
      </Space>
    </Modal>
  );
};

export default ModalEmployee;
