import { Button, Col, Divider, Row, Space, Typography } from "antd";
import Card from "../../../components/global/Card";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";

import { useSearch } from "react-use-search";
import moduleApi from "../../../api/moduleApi";
import {
  ListEmployees,
  ModalEmployee,
} from "../../../components/Admin/Employee";
import { useEmployee } from "../../../hooks/employee";
import { generalState } from "../../../recoil/atom/generalState";
import { findExistance } from "../../../utils/findExistance";
import Permissions_CD from "../../../data_json/Permissions_CD.json";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import EmployeeSearchForm from "../../../components/Admin/Employee/EmployeeSearchForm";
import { removeAccents } from "../../../common";
import { useRef } from "react";
import BreadcrumbProvider from "../../../components/global/Breadcrumb";
import i18n from "../../../lib/Language";
import HeadBar from "../../../components/global/HeadBar";
import { employeeState } from "../../../recoil/atom/employeeState";
import { employeeData } from "../../../common/getAllApi";

// CHECK IF FILTER RESULT LIST != null THEN USE FILTER RESULT LIST, ELSE IF THEN USE DATAS LIST
const checkFilterList = (a, b) => (a ? a : b);

const predicate = (employees, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  console.log(">>> re-render 1");

  const ID = String(employees?.USER_ID).toLowerCase().trim();
  const CD = String(employees?.CD).toLowerCase().trim();
  const F_NAME = removeAccents(String(employees?.User?.FIRST_NAME))
    .toLowerCase()
    .trim();
  const L_NAME = removeAccents(String(employees?.User?.LAST_NAME))
    .toLowerCase()
    .trim();

  return (
    ID.includes(newQuery) ||
    CD.includes(newQuery) ||
    F_NAME.includes(newQuery) ||
    L_NAME.includes(newQuery)
  );
};

const EducationList = () => {
  const { createEmployee, updateEmployee, deleteEmployee, isLoading } =
    useEmployee();
  const [employees, setEmployees] = useRecoilState(employeeState);
  useEffect(() => {
    if (employees.length === 0) {
      employeeData(employees, setEmployees);
    }
  }, [employees]);
  const [showModal, setShowModal] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [employee, setEmployee] = useState(undefined);
  const [permissionsCD, setPermissionsCD] = useState();
  const [dataSource, setDataSource] = useState(undefined);
  const [searchValue, setSearchValue] = useState({
    USER_ID: "",
    CD: "",
    FIRST_NAME: "",
    LAST_NAME: "",
    CITY_NAME: "",
    AREA_NAME: "",
    DEPARTMENT_NAME: "",
    DIVISION_NAME: "",
    UNIT_NAME: "",
    BRANCH_NAME: "",
    EMAIL: "",
    PHONE: "",
    GENDER: "",
    MARITAL: "",
  });
  const formRef = useRef();
  const typingTimeoutRef = useRef(null);

  const history = useHistory();
  const { moduleSelected } = useRecoilValue(generalState);

  const useStyles = {
    textStyles: {
      fontSize: 16,
      fontWeight: 600,
    },
    iconStyles: {
      fontSize: 16,
      paddingBottom: 5,
      color: "#1890FF",
    },
    dividerStyles: {
      background: "black",
    },
    spaceStyles: {
      display: "flex",
      justifyContent: "flex-end",
      paddingBottom: 16,
    },
  };

  useEffect(() => {
    //get permissions of current user to page
    (async () => {
      const response = await moduleApi.getPermissionsByModuleID(
        moduleSelected?.id
      );
      if (response.status === 200 && response.data.elements.length > 0) {
        const temp = [
          ...response.data.elements.map((item) => item.PERMISSION_CD),
        ];
        setPermissionsCD(temp);
      } else {
        setPermissionsCD([]);
        history.push("/");
      }
    })();
  }, [history, moduleSelected]);

  // useEffect(() => {
  //     if (
  //         searchValue?.USER_ID.length > 0 ||
  //         searchValue?.CD.length > 0 ||
  //         searchValue?.FIRST_NAME.length > 0 ||
  //         searchValue?.LAST_NAME.length > 0 ||
  //         searchValue?.CITY_NAME.length > 0 ||
  //         searchValue?.AREA_NAME.length > 0 ||
  //         searchValue?.DEPARTMENT_NAME.length > 0 ||
  //         searchValue?.DIVISION_NAME.length > 0 ||
  //         searchValue?.UNIT_NAME.length > 0 ||
  //         searchValue?.BRANCH_NAME.length > 0
  //     ) {
  //         let newData = undefined;
  //         if (searchValue.USER_ID) {
  //             const newQuery = (String(searchValue.USER_ID)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => (String(emp?.USER_ID)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.CD) {
  //             const newQuery = removeAccents(String(searchValue.CD)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.CD)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.FIRST_NAME) {
  //             const newQuery = removeAccents(String(searchValue.FIRST_NAME)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.User?.FIRST_NAME)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.LAST_NAME) {
  //             const newQuery = removeAccents(String(searchValue.LAST_NAME)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.User?.LAST_NAME)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.CITY_NAME) {
  //             const newQuery = removeAccents(String(searchValue.CITY_NAME)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.City?.CITY_NAME)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.AREA_NAME) {
  //             const newQuery = removeAccents(String(searchValue.AREA_NAME)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.Area?.AREA_NAME)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.DEPARTMENT_NAME) {
  //             const newQuery = removeAccents(String(searchValue.DEPARTMENT_NAME)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.Department?.DEPARTMENT_NAME)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.DIVISION_NAME) {
  //             const newQuery = removeAccents(String(searchValue.DIVISION_NAME)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.Division?.DIVISION_NAME)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.UNIT_NAME) {
  //             const newQuery = removeAccents(String(searchValue.UNIT_NAME)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.Unit?.UNIT_NAME)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         if (searchValue.BRANCH_NAME) {
  //             const newQuery = removeAccents(String(searchValue.BRANCH_NAME)).toLowerCase().trim();
  //             const tempData = checkFilterList(newData, employees)
  //                 .filter(emp => removeAccents(String(emp?.Workplace?.BRANCH_NAME)).toLowerCase().trim().includes(newQuery));
  //             newData = [...tempData];
  //         }
  //         setDataSource(newData);
  //     } else setDataSource(employees);
  // }, [employees, searchValue]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCreateEmployee = async (employee, appId, callback) => {
    await createEmployee(employee, appId, callback);
    setShowModal(false);
  };
  const handleUpdateEmployee = async (employee, id, callback) => {
    await updateEmployee(employee, id, callback);
  };
  const handleOpenUpdate = (data) => {
    setEmployee(data);
    setShowModal(true);
  };
  const handleDelete = async (id) => {
    await deleteEmployee(id);
  };
  const handleFormChange = (values) => {
    // Set DEBOUNCE 300ms
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        ...searchValue,
        ...values,
      };
      setSearchValue({ ...formValues });
    }, 300);
  };
  const handleResetForm = () => {
    formRef.current.resetFields();
    setDataSource(employees);
    setSearchValue({
      USER_ID: "",
      CD: "",
      FIRST_NAME: "",
      LAST_NAME: "",
      CITY_NAME: "",
      AREA_NAME: "",
      DEPARTMENT_NAME: "",
      DIVISION_NAME: "",
      UNIT_NAME: "",
      BRANCH_NAME: "",
      EMAIL: "",
      PHONE: "",
      GENDER: "",
      MARITAL: "",
    });
  };
  const handleSearch = () => {
    if (
      searchValue?.USER_ID.length > 0 ||
      searchValue?.CD.length > 0 ||
      searchValue?.FIRST_NAME.length > 0 ||
      searchValue?.LAST_NAME.length > 0 ||
      searchValue?.CITY_NAME.length > 0 ||
      searchValue?.AREA_NAME.length > 0 ||
      searchValue?.DEPARTMENT_NAME.length > 0 ||
      searchValue?.DIVISION_NAME.length > 0 ||
      searchValue?.UNIT_NAME.length > 0 ||
      searchValue?.BRANCH_NAME.length > 0 ||
      searchValue?.EMAIL.length > 0 ||
      searchValue?.PHONE.length > 0 ||
      searchValue?.GENDER.length > 0 ||
      searchValue?.MARITAL.length > 0
    ) {
      let newData = undefined;
      if (searchValue.USER_ID) {
        const newQuery = String(searchValue.USER_ID).toLowerCase().trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          String(emp?.USER_ID).toLowerCase().trim().includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.CD) {
        const newQuery = removeAccents(String(searchValue.CD))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.CD)).toLowerCase().trim().includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.FIRST_NAME) {
        const newQuery = removeAccents(String(searchValue.FIRST_NAME))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.User?.FIRST_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.EMAIL) {
        const newQuery = removeAccents(String(searchValue.EMAIL))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.User?.EMAIL))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.PHONE) {
        const newQuery = removeAccents(String(searchValue.PHONE))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.User?.PHONE))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.GENDER) {
        const newQuery = removeAccents(String(searchValue.GENDER))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.User?.Gender?.NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.MARITAL) {
        const newQuery = removeAccents(String(searchValue.MARITAL))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.Marital_Status?.MARITAL_STATUS_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.LAST_NAME) {
        const newQuery = removeAccents(String(searchValue.LAST_NAME))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.User?.LAST_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.CITY_NAME) {
        const newQuery = removeAccents(String(searchValue.CITY_NAME))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.City?.CITY_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.AREA_NAME) {
        const newQuery = removeAccents(String(searchValue.AREA_NAME))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.Area?.AREA_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.DEPARTMENT_NAME) {
        const newQuery = removeAccents(String(searchValue.DEPARTMENT_NAME))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.Department?.DEPARTMENT_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.DIVISION_NAME) {
        const newQuery = removeAccents(String(searchValue.DIVISION_NAME))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.Division?.DIVISION_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.UNIT_NAME) {
        const newQuery = removeAccents(String(searchValue.UNIT_NAME))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.Unit?.UNIT_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      if (searchValue.BRANCH_NAME) {
        const newQuery = removeAccents(String(searchValue.BRANCH_NAME))
          .toLowerCase()
          .trim();
        const tempData = checkFilterList(newData, employees).filter((emp) =>
          removeAccents(String(emp?.Workplace?.BRANCH_NAME))
            .toLowerCase()
            .trim()
            .includes(newQuery)
        );
        newData = [...tempData];
      }
      setDataSource(newData);
    } else setDataSource(employees);
  };
  const [filteredEmployees, query, handleChange] = useSearch(
    employees,
    predicate,
    { debounce: 500 }
  );

  return (
    <div className="page-content" style={{ overflowX: "hidden" }}>
      <BreadcrumbProvider adrress={i18n.t("edu.title")} />
      <Row>
        <Col span={24}>
          <Card
            title={
              <Space size={16} wrap>
                <Typography.Text style={useStyles.textStyles}>
                  {i18n.t("edu.title")}
                </Typography.Text>
                <Divider type="vertical" style={useStyles.dividerStyles} />
                {isShow ? (
                  <CaretUpOutlined
                    style={useStyles.iconStyles}
                    onClick={() => setIsShow(false)}
                  />
                ) : (
                  <CaretDownOutlined
                    style={useStyles.iconStyles}
                    onClick={() => setIsShow(true)}
                  />
                )}
                <Typography.Text style={useStyles.textStyles}>
                  {i18n.t("edu.option")}
                </Typography.Text>
              </Space>
            }
          >
            <div className={isShow ? "show__elm" : "hide__elm"}>
              <EmployeeSearchForm
                onChange={handleFormChange}
                onResetFrom={handleResetForm}
                formRef={formRef}
                onSearch={handleSearch}
              />
            </div>
            {isShow && (
              <Space style={useStyles.spaceStyles}>
                <Button
                  title="Create"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleShowModal}
                />
              </Space>
            )}
            {!isShow && (
              <HeadBar
                openAdd={handleShowModal}
                query={query}
                onSearch={handleChange}
                // isDisplayBtn={findExistance(permissionsCD, Permissions_CD.create)}
              />
            )}
            <ListEmployees
              isLoading={isLoading}
              onDelete={handleDelete}
              openEdit={handleOpenUpdate}
              employees={
                isShow
                  ? dataSource || employees
                  : filteredEmployees && filteredEmployees.length > 0
                  ? filteredEmployees
                  : employees
              }
              isDisplayEditBtn={findExistance(
                permissionsCD,
                Permissions_CD.update
              )}
              isDisplayDeleteBtn={findExistance(
                permissionsCD,
                Permissions_CD.delete
              )}
            />
          </Card>
        </Col>
      </Row>
      <ModalEmployee
        title={employee ? i18n.t("edu.mdlTitleUp") : i18n.t("edu.mdlTitleCre")}
        loading={isLoading}
        isOpen={showModal}
        employee={employee}
        employees={employees}
        onUpdate={handleUpdateEmployee}
        onOk={handleCreateEmployee}
        onCancel={() => {
          setShowModal(false);
          setEmployee(undefined);
        }}
      />
    </div>
  );
};

export default EducationList;
