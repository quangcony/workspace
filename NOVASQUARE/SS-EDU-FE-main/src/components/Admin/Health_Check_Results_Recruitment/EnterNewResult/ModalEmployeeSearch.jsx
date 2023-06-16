import { Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";
import FrmEmployeeSearch from "./FrmEmployeeSearch";
import TblEmployeeSearch from "./TblEmployeeSearch";
import moment from "moment";
import { formatDate } from "../../../../common";

const initialState = {
  FIRST_NAME: "",
  LAST_NAME: "",
  CD: "",
  BOD: undefined,
  START_WORKING_DATE: "",
  COUNTRY_ID: undefined, // dont exist key COUNTRY_ID in table employee or user
  CITY_ID: undefined,
  BRANCH_ID: undefined, // dont exist key BRANCH_ID in employee api, need edit employees table
  AREA_ID: undefined,
  DEPT_ID: undefined,
  DIVISION_ID: undefined, // dont exist key DIVISION_ID in employee api, need edit employees table
  UNIT_ID: undefined,
  POSITION_ID: undefined,
  EMP_TYPE_ID: undefined,
  GENDER: "",
  MARITAL_STATUS_ID: undefined,
  MEDICAL_EXAM_YEAR: undefined,
  PHYSICAL_DATE: undefined,
  MEDICAL_FACILITY: undefined,
  isRefresh: false,
};

const ModalSearchNV = ({
  isOpen,
  onCancel,
  workPlaceOption,
  divisionOption,
  departOption,
  positOption,
  // areaOption,
  genderOption,
  unitOption,
  // maritalOption,
  // medicalFacilityOption,
  emplyeeTypeOption,
  datas,
  onAddNew,
}) => {
  const searchFormRef = useRef();

  const [filterEmployee, setFilterEmployee] = useState(undefined);
  const [filterResultList, setFilterResultList] = useState(undefined);
  // CHECK IF FILTER RESULT LIST != null THEN USE FILTER RESULT LIST, ELSE IF THEN USE DATAS LIST
  const checkFilterList = (a, b) => {
    return a ? a : b;
  };
  // console.log("filterEmployee: ", filterEmployee)
  // console.log("datas: ", datas)
  /* HANDLE SEARCH */

  useEffect(() => {
    if (
      filterEmployee?.FIRST_NAME.length > 0 ||
      filterEmployee?.LAST_NAME.length > 0 ||
      filterEmployee?.CD.length > 0 ||
      filterEmployee?.BOD ||
      filterEmployee?.START_WORKING_DATE ||
      filterEmployee?.COUNTRY_ID ||
      filterEmployee?.CITY_ID ||
      filterEmployee?.BRANCH_ID ||
      filterEmployee?.AREA_ID ||
      filterEmployee?.DEPT_ID ||
      filterEmployee?.DIVISION_ID ||
      filterEmployee?.UNIT_ID ||
      filterEmployee?.POSITION_ID ||
      filterEmployee?.EMP_TYPE_ID ||
      filterEmployee?.GENDER_ID ||
      filterEmployee?.MARITAL_STATUS_ID ||
      filterEmployee?.MEDICAL_EXAM_YEAR ||
      filterEmployee?.PHYSICAL_DATE ||
      filterEmployee?.MEDICAL_FACILITY_ID
    ) {
      let newDatas = undefined;
      // FILTER BY FIRST_NAME
      if (filterEmployee?.FIRST_NAME?.length > 0) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.FIRST_NAME?.toLowerCase().trim();
          const keyWord = filterEmployee.FIRST_NAME?.toLowerCase().trim();
          const isMatching = dataOfList.includes(keyWord);
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY LAST_NAME
      if (filterEmployee?.LAST_NAME?.length > 0) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.LAST_NAME?.toLowerCase().trim();
          const keyWord = filterEmployee?.LAST_NAME?.toLowerCase().trim();
          const isMatching = dataOfList?.includes(keyWord);
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY CD
      if (filterEmployee?.CD?.length > 0) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.CD?.toLowerCase().trim();
          const keyWord = filterEmployee.CD?.toLowerCase().trim();
          const isMatching = dataOfList?.includes(keyWord);
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY Birth Of Date
      if (filterEmployee?.BOD) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = moment(new Date(item.BOD)).format(formatDate.Type);
          const keyWord = moment(filterEmployee.BOD).format(formatDate.Type);
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY DEPT
      if (filterEmployee?.DEPT_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.DEPT_ID;
          const keyWord = filterEmployee.DEPT_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY BRANCH
      if (filterEmployee?.BRANCH_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.BRANCH_ID;
          const keyWord = filterEmployee.BRANCH_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY DIVISION
      if (filterEmployee?.DIVISION_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.DIVISION_ID;
          const keyWord = filterEmployee.DIVISION_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY UNIT
      if (filterEmployee?.UNIT_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.UNIT_ID;
          const keyWord = filterEmployee.UNIT_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY POSITION
      if (filterEmployee?.POSITION_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.POSITION_ID;
          const keyWord = filterEmployee.POSITION_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY GENDER
      if (filterEmployee?.GENDER_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.GENDER_ID;
          const keyWord = filterEmployee.GENDER_ID;
          let isMatching = dataOfList === keyWord;
          if (dataOfList === null && keyWord === "undefined") {
            isMatching = true;
          }
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY PHYSICAL DATE
      if (filterEmployee?.PHYSICAL_DATE) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const keyWord = moment(filterEmployee.PHYSICAL_DATE).format(formatDate.Type);
          // const isMatching = dataOfList === keyWord;
          const isMatching = item?.PhysicalExams?.some((exam) => {
            const dataOfList = moment(new Date(exam?.PHYSICAL_DATE)).format(formatDate.Type);
            return keyWord === dataOfList;
          });
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      setFilterResultList(newDatas);
    } else {
      setFilterResultList(undefined);
    }
  }, [filterEmployee]);

  const handleCancel = () => {
    onCancel();
    setFilterEmployee(initialState);
    searchFormRef.current.resetFields();
  };
  return (
    <>
      <Modal
        visible={isOpen}
        title="Tìm kiếm"
        open={isOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={1500}
        style={{
          top: 20,
        }}
        footer={false}
      >
        <FrmEmployeeSearch
          divisionOption={divisionOption}
          departOption={departOption}
          positOption={positOption}
          genderOption={genderOption}
          unitOption={unitOption}
          workPlaceOption={workPlaceOption}
          emplyeeTypeOption={emplyeeTypeOption}
          setFilterEmployee={setFilterEmployee}
          searchFormRef={searchFormRef}
          initialState={initialState}
        />
        <TblEmployeeSearch
          datas={filterResultList ? filterResultList : datas}
          onAddNew={onAddNew}
        />
      </Modal>
    </>
  );
};
export default ModalSearchNV;
