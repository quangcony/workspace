import { Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";
import FrmEmployeeSearch from "./FrmEmployeeSearch";
import TblEmployeeSearch from "./EmployeeList";
import moment from "moment";
import { employeeGetPhysicalExamState } from "../../../../recoil/atom/employeeState";
import { useRecoilState } from "recoil";
import { removeAccents, formatDate, checkFilterList } from "../../../../common";

const EmployeeSearchModal = ({ isOpen, onCancel, onAddNew }) => {
  const searchFormRef = useRef();
  const [filterEmployee, setFilterEmployee] = useState(undefined);
  const [filterResultList, setFilterResultList] = useState(undefined);

  const [employeeList] = useRecoilState(employeeGetPhysicalExamState);
  const [datas, setDatas] = useRecoilState(employeeGetPhysicalExamState);

  /* HANDLE SEARCH */
  useEffect(() => {
    if (
      filterEmployee?.FULL_NAME ||
      filterEmployee?.CD ||
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

      // FILTER BY FULL_NAME
      if (filterEmployee?.FULL_NAME?.length > 0) {
        let tempDatas = [];
        checkFilterList(newDatas, datas).forEach((item, index) => {
          const dataOfList = removeAccents(item?.FULL_NAME)
            ?.toLowerCase()
            .trim();
          const keyWord = removeAccents(filterEmployee?.FULL_NAME)
            ?.toLowerCase()
            .trim();
          const isMatching = dataOfList?.includes(keyWord);
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }
      // FILTER BY CD
      if (filterEmployee?.CD) {
        const newQuery = removeAccents(String(filterEmployee.CD))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newDatas, employeeList).filter(
          (item) =>
            removeAccents(String(item?.CD))
              .toLowerCase()
              .trim()
              .includes(newQuery)
        );
        newDatas = [...tempData];
      }
      // FILTER BY Birth Of Date
      if (filterEmployee?.BOD) {
        let tempDatas = [];
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
          const dataOfList = moment(new Date(item.User?.BOD)).format(
            formatDate.Type
          );
          const keyWord = moment(filterEmployee.BOD).format(formatDate.Type);
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
          const dataOfList = moment(new Date(item.START_WORKING_DATE)).format(
            formatDate.Type
          );
          const keyWord = moment(filterEmployee.START_WORKING_DATE).format(
            formatDate.Type
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
          const dataOfList = item.User?.GENDER_ID;
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
          const dataOfList = item.MARITAL_STATUS_ID;
          const keyWord = filterEmployee.MARITAL_STATUS_ID;
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
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
          const dataOfList = moment(new Date(item.PHYSICAL_DATE)).format(
            formatDate.Type
          );
          const keyWord = moment(filterEmployee.PHYSICAL_DATE).format(
            formatDate.Type
          );
          const isMatching = dataOfList === keyWord;
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }

      // // FILTER BY MEDICAL EXAM YEAR
      if (filterEmployee?.MEDICAL_EXAM_YEAR) {
        let tempDatas = [];
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
          const isMatching = item?.Physical_Exams.some((physicalExam) => {
            const dataOfList = physicalExam.MEDICAL_EXAM_YEAR;
            const keyWord = filterEmployee.MEDICAL_EXAM_YEAR;
            return dataOfList === keyWord;
          });
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }

      // FILTER BY PHYSICAL DATE - END DATE
      if (filterEmployee?.PHYSICAL_DATE) {
        let tempDatas = [];
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
          const isMatching = item?.Physical_Exams.some((physicalExam) => {
            if (filterEmployee?.PHYSICAL_DATE) {
              return (
                new Date(physicalExam.PHYSICAL_DATE) ===
                new Date(filterEmployee.PHYSICAL_DATE.format(formatDate.Type))
              );
            }
          });
          if (isMatching) {
            tempDatas.push(item);
          }
        });
        newDatas = tempDatas;
      }

      // FILTER BY MEDICAL FACILITY
      if (filterEmployee?.MEDICAL_FACILITY_NAME) {
        let tempDatas = [];
        checkFilterList(newDatas, employeeList).forEach((item, index) => {
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
        title="Tìm kiếm nhân viên"
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
          setFilterEmployee={setFilterEmployee}
          searchFormRef={searchFormRef}
        />
        <TblEmployeeSearch
          datas={filterResultList ? filterResultList : employeeList}
          onAddNew={onAddNew}
        />
      </Modal>
    </>
  );
};
export default EmployeeSearchModal;
