import { Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";
import FrmEmployeeSearch from "./FrmEmployeeSearch";
import TblEmployeeSearch from "./TblEmployeeSearch";
import moment from "moment";

const ModalSearchNV = ({
  isOpen,
  onCancel,
  workPlaceOption,
  divisionOption,
  departOption,
  positOption,
  areaOption,
  genderOption,
  unitOption,
  maritalOption,
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
          const dataOfList = item.FIRST_NAME.toLowerCase().trim();
          const keyWord = filterEmployee.FIRST_NAME.toLowerCase().trim();
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
          const dataOfList = item.LAST_NAME.toLowerCase().trim();
          const keyWord = filterEmployee.LAST_NAME.toLowerCase().trim();
          const isMatching = dataOfList.includes(keyWord);
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
          const dataOfList = item.CD.toLowerCase().trim();
          const keyWord = filterEmployee.CD.toLowerCase().trim();
          const isMatching = dataOfList.includes(keyWord);
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
          const dataOfList = moment(new Date(item.BOD)).format("YYYY-MM-DD");
          const keyWord = moment(filterEmployee.BOD).format("YYYY-MM-DD");
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY START_WORKING_DATE
      if (filterEmployee?.START_WORKING_DATE) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = moment(new Date(item.START_WORKING_DATE)).format(
            "YYYY-MM-DD"
          );
          const keyWord = moment(filterEmployee.START_WORKING_DATE).format(
            "YYYY-MM-DD"
          );
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY COUNTRY
      if (filterEmployee?.COUNTRY_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.COUNTRY_ID;
          const keyWord = filterEmployee.COUNTRY_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY CITY
      if (filterEmployee?.CITY_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.CITY_ID;
          const keyWord = filterEmployee.CITY_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY AREA
      if (filterEmployee?.AREA_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.AREA_ID;
          const keyWord = filterEmployee.AREA_ID;
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
          console.log(dataOfList, keyWord);
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
      // FILTER BY EMP_TYPE
      if (filterEmployee?.EMP_TYPE_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.EMP_TYPE_ID;
          const keyWord = filterEmployee.EMP_TYPE_ID;
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
      // FILTER BY MARITAL STATUS
      if (filterEmployee?.MARITAL_STATUS_ID) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.MARITAL_STATUS_ID;
          const keyWord = filterEmployee.MARITAL_STATUS_ID;
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY MEDICAL EXAM YEAR
      if (filterEmployee?.MEDICAL_EXAM_YEAR) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.MEDICAL_EXAM_YEAR;
          const keyWord = filterEmployee.MEDICAL_EXAM_YEAR;
          const isMatching = dataOfList === keyWord;
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
          const dataOfList = moment(new Date(item.PHYSICAL_DATE)).format(
            "YYYY-MM-DD"
          );
          const keyWord = moment(filterEmployee.PHYSICAL_DATE).format(
            "YYYY-MM-DD"
          );
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY MEDICAL FACILITY
      if (filterEmployee?.MEDICAL_FACILITY_NAME) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = item.MEDICAL_FACILITY_NAME;
          const keyWord = filterEmployee.MEDICAL_FACILITY_NAME;
          const isMatching = dataOfList === keyWord;
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
    searchFormRef.current.resetFields();
  };
  return (
    <>
      <Modal
        visible={isOpen}
        title="Tìm kiếm nhân viên"
        open={isOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={1200}
        style={{
          top: 20,
        }}
        footer={false}
      >
        <FrmEmployeeSearch
          divisionOption={divisionOption}
          // medicalFacilityOption={medicalFacilityOption}
          departOption={departOption}
          positOption={positOption}
          areaOption={areaOption}
          genderOption={genderOption}
          unitOption={unitOption}
          maritalOption={maritalOption}
          workPlaceOption={workPlaceOption}
          emplyeeTypeOption={emplyeeTypeOption}
          setFilterEmployee={setFilterEmployee}
          searchFormRef={searchFormRef}
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
