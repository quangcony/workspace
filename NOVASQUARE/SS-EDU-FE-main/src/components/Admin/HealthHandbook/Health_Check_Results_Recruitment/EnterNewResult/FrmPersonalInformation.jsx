import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  AutoComplete,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "react-use-search";
import moment from "moment";
import {
  removeAccents,
  formatDate,
  validateMessages,
  handleBlockEnter,
} from "../../../../../common";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { useSnackbar } from "notistack";
import {
  employeeSelectState,
  employeeState,
  modifyEmployeeState,
} from "../../../../../recoil/atom/employeeState";
import { genderOptionsState } from "../../../../../recoil/atom/genderState";
import {
  departmentOptionsState,
  selectDepartmentRecruitState,
} from "../../../../../recoil/atom/departmentState";
import {
  divisionOptionsState,
  selectDivisionRecruitState,
} from "../../../../../recoil/atom/divisionState";
import {
  positionOptionsState,
  selectPositionRecruitState,
} from "../../../../../recoil/atom/positionState";
import {
  selectUnitRecruitState,
  unitOptionsState,
} from "../../../../../recoil/atom/unitState";
import {
  physicalExamRecruitIdState,
  physicalExamSelectRecruitState,
  physicalExamSelectState,
} from "../../../../../recoil/atom/physicalExamState";
import userApi from "../../../../../api/userApi";
import physicalExamApi from "../../../../../api/physicalExamApi";
import physicalExamResultApi from "../../../../../api/physicalExamResultApi";
import physicalDetailApi from "../../../../../api/physicalDetailApi";
import preclinicalDetailApi from "../../../../../api/preclinicDetailApi";
import clinicalDetailApi from "../../../../../api/clinicDetailApi";
import employeeApi from "../../../../../api/employeeApi";
import { useDivision } from "../../../../../hooks/division";
import { useDepartment } from "../../../../../hooks/department";
import { useUnit } from "../../../../../hooks/unit";
import { usePosition } from "../../../../../hooks/position";
import { useArea } from "../../../../../hooks/area";
import {
  areaOptionsState,
  selectAreaRecruitState,
} from "../../../../../recoil/atom/areaState";
import { useGender } from "../../../../../hooks/gender";
import {
  selectWorkPlacesRecruitState,
  workPlaceOptionsState,
} from "../../../../../recoil/atom/workPlaceState";
import { useWorkPlace } from "../../../../../hooks/workPlace";
import { physicalExamNewRecruitState } from "../../../../../recoil/atom/physicalExamNew";
import { physicalExamByQueryData } from "../../../../../common/getAllApi";
import { physicalExamFirseCreateRecruitState } from "../../../../../recoil/atom/physicalExamProcess";
import { physicalExamOptionStateRecruit } from "../../../../../recoil/atom/physicalExamState";
import { newestPhysicalDetailRecruitState } from "../../../../../recoil/atom/physicalDetailState";
import { newestClinicalDetailRecruitState } from "../../../../../recoil/atom/clinicalDetailState";
import { newestPreClinicalDetailRecruitState } from "../../../../../recoil/atom/preClinicalDetailState";
import { newestPhysicalExamResultRecruitState } from "../../../../../recoil/atom/physicalExamResult";
import {
  isLoadingState,
  isShowState,
} from "../../../../../recoil/atom/booleanState";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 13,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

const predicate = (employees, query) => {
  const newQuery = removeAccents(String(query))?.toLowerCase()?.trim();
  const CD = removeAccents(String(employees?.CD))?.toLowerCase()?.trim();
  return CD?.includes(newQuery);
};

const FrmPersonalInformation = ({
  onKeyChange,
  FrmPersionalInfoRef,
  isDoctor,
}) => {
  useDivision();
  useDepartment();
  useUnit();
  usePosition();
  useArea();
  useGender();
  useWorkPlace();
  const typingTimeoutRef = useRef(null);
  const physicalExamSelect = useRecoilValue(physicalExamSelectRecruitState);
  const EmployeeData = useRecoilValue(modifyEmployeeState);
  const genderOption = useRecoilValue(genderOptionsState);
  const departmentOption = useRecoilValue(departmentOptionsState);
  const divisionOption = useRecoilValue(divisionOptionsState);
  const positionOption = useRecoilValue(positionOptionsState);
  const unitOption = useRecoilValue(unitOptionsState);
  const areaOption = useRecoilValue(areaOptionsState);
  const workPlaceOptions = useRecoilValue(workPlaceOptionsState);
  const setIsShow = useSetRecoilState(isShowState);

  const setPhysicalExamGetNew = useSetRecoilState(physicalExamNewRecruitState);
  const setPhysicalDetailNew = useSetRecoilState(
    newestPhysicalDetailRecruitState
  );
  const setClinicalDetailNew = useSetRecoilState(
    newestClinicalDetailRecruitState
  );
  const setPreClinicalDetailNew = useSetRecoilState(
    newestPreClinicalDetailRecruitState
  );
  const setPhysicalExamResultNew = useSetRecoilState(
    newestPhysicalExamResultRecruitState
  );
  const setPhysicalExamRecruitId = useSetRecoilState(
    physicalExamRecruitIdState
  );
  const [physicalExamFirstCreate, setPhysicalExamFirstCreate] = useRecoilState(
    physicalExamFirseCreateRecruitState
  );
  const [employees, setEmployees] = useRecoilState(employeeState);

  const [form] = Form.useForm();
  const [dataOption, setDataOption] = useState([]);
  const [selectArea, setSelectArea] = useRecoilState(selectAreaRecruitState);
  const [selectDepartment, setSelectDepartment] = useRecoilState(
    selectDepartmentRecruitState
  );
  const [selectDivision, setSelectDivision] = useRecoilState(
    selectDivisionRecruitState
  );
  const [selectUnit, setSelectUnit] = useRecoilState(selectUnitRecruitState);
  const [selectPosision, setSelectPosision] = useRecoilState(
    selectPositionRecruitState
  );
  const [selectBranch, setSelectBranch] = useRecoilState(
    selectWorkPlacesRecruitState
  );
  const [physicalExamOption, setPhysicalExamOption] = useRecoilState(
    physicalExamOptionStateRecruit
  );
  const [employeeSelect, setEmployeeSelet] =
    useRecoilState(employeeSelectState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  useEffect(() => {
    if (physicalExamSelect) {
      setSelectBranch({
        value: physicalExamSelect && physicalExamSelect?.Workplace?.id,
        label: physicalExamSelect && physicalExamSelect?.Workplace?.BRANCH_NAME,
      });
      setSelectDepartment({
        value: physicalExamSelect && physicalExamSelect?.Department?.id,
        label:
          physicalExamSelect && physicalExamSelect?.Department?.DEPARTMENT_NAME,
      });
      setSelectDivision({
        value: physicalExamSelect && physicalExamSelect?.Division?.id,
        label:
          physicalExamSelect && physicalExamSelect?.Division?.DIVISION_NAME,
      });
      setSelectArea({
        value: physicalExamSelect && physicalExamSelect?.Area?.id,
        label: physicalExamSelect && physicalExamSelect?.Area?.AREA_NAME,
      });
      setSelectUnit({
        value: physicalExamSelect && physicalExamSelect?.Unit?.id,
        label: physicalExamSelect && physicalExamSelect?.Unit?.UNIT_NAME,
      });
      setSelectPosision({
        value: physicalExamSelect && physicalExamSelect?.Position?.id,
        label:
          physicalExamSelect && physicalExamSelect?.Position?.POSITION_NAME,
      });
    }
  }, [physicalExamSelect]);

  useEffect(() => {
    if (physicalExamSelect || employeeSelect) {
      const genderName = employeeSelect
        ? employeeSelect?.User?.Gender?.NAME
        : physicalExamSelect?.Gender?.NAME;
      setIsShow(
        genderName === "Nữ" ||
          genderName === "nữ" ||
          genderName === "Female" ||
          genderName === "female" ||
          genderName === "NỮ" ||
          genderName === "nu"
          ? true
          : false
      );
      form.setFieldsValue({
        CD: employeeSelect
          ? employeeSelect?.CD?.trim()
          : physicalExamSelect?.CD,
        FIRST_NAME: employeeSelect
          ? employeeSelect?.User?.FIRST_NAME
          : physicalExamSelect?.FIRST_NAME,
        LAST_NAME: employeeSelect
          ? employeeSelect?.User?.LAST_NAME
          : physicalExamSelect?.LAST_NAME,
        BOD: employeeSelect
          ? moment(employeeSelect?.User?.BOD)
          : moment(physicalExamSelect?.BOD),
        GENDER: employeeSelect
          ? employeeSelect?.User?.GENDER_ID
          : physicalExamSelect?.GENDER_ID,
        PHYSICAL_DATE:
          physicalExamSelect && moment(physicalExamSelect?.PHYSICAL_DATE),
        DEPT_ID: employeeSelect
          ? employeeSelect?.DEPT_ID
          : physicalExamSelect?.DEPT_ID,
        DIVISION_ID: employeeSelect
          ? employeeSelect?.DIVISION_ID
          : physicalExamSelect?.DIVISION_ID,
        UNIT_ID: employeeSelect
          ? employeeSelect?.UNIT_ID
          : physicalExamSelect?.UNIT_ID,
        POSITION_ID: employeeSelect
          ? employeeSelect?.POSITION_ID
          : physicalExamSelect?.POSITION_ID,
        AREA_ID: employeeSelect
          ? employeeSelect?.AREA_ID
          : physicalExamSelect?.AREA_ID,
        BRANCH_ID: employeeSelect
          ? employeeSelect?.BRANCH_ID
          : physicalExamSelect?.BRANCH_ID,
        MEDICAL_FACILITY_NAME: physicalExamSelect?.MEDICAL_FACILITY_NAME,
      });
    } else {
      form.resetFields();
    }
  }, [form, physicalExamSelect, employeeSelect]);

  const handleOk = async () => {
    const newData = { ...form.getFieldValue() };
    const isCheck = employees.some((item, index) => {
      const dataOfList = removeAccents(item?.CD)?.toLowerCase()?.trim();
      const keyWord = removeAccents(newData?.CD)?.toLowerCase()?.trim();
      return dataOfList == keyWord;
    });

    if (
      (newData?.CD && !isCheck) ||
      ((!isDoctor || !physicalExamSelect) &&
        newData?.FIRST_NAME?.length === 0) ||
      ((!isDoctor || !physicalExamSelect) &&
        newData?.LAST_NAME?.length === 0) ||
      ((!isDoctor || !physicalExamSelect) && !newData.FIRST_NAME) ||
      ((!isDoctor || !physicalExamSelect) && !newData.LAST_NAME) ||
      ((!isDoctor || !physicalExamSelect) && !newData.BOD) ||
      ((!isDoctor || !physicalExamSelect) && !newData.GENDER) ||
      ((!isDoctor || !physicalExamSelect) && !newData.PHYSICAL_DATE) ||
      ((!isDoctor || !physicalExamSelect) && !newData.DEPT_ID) ||
      ((!isDoctor || !physicalExamSelect) && !newData.AREA_ID) ||
      ((!isDoctor || !physicalExamSelect) && !newData.DIVISION_ID) ||
      ((!isDoctor || !physicalExamSelect) && !newData.POSITION_ID) ||
      newData.MEDICAL_FACILITY_NAME === null ||
      newData.MEDICAL_FACILITY_NAME === undefined ||
      newData.MEDICAL_FACILITY_NAME.trim() === ""
    ) {
      return;
    }
    setIsLoading(true);
    const d = new Date();
    const USER_NAME = newData.LAST_NAME + d.getTime();

    const userValue = {
      FIRST_NAME: newData.FIRST_NAME,
      LAST_NAME: newData.LAST_NAME,
      BOD: newData?.BOD,
      GENDER_ID: newData.GENDER,
      USER_NAME: USER_NAME,
      USER_PW: USER_NAME,
    };

    const physicalExamValue = {
      TYPE: 3,
      CONTENT: "Khám sức khỏe định kỳ",
      MEDICAL_FACILITY_NAME: newData.MEDICAL_FACILITY_NAME,
      AREA_NAME: selectArea?.label,
      AREA_ID: selectArea?.value,
      DEPT_NAME: selectDepartment?.label,
      DEPT_ID: selectDepartment?.value,
      DIVISION_NAME: selectDivision?.label,
      DIVISION_ID: selectDivision?.value,
      UNIT_NAME: selectUnit?.label,
      UNIT_ID: selectUnit?.value,
      BRANCH_NAME: selectBranch?.label,
      BRANCH_ID: selectBranch?.value,
      POSITION_NAME: selectPosision?.label,
      POSITION_ID: selectPosision?.value,
      INPUT_DATE: new Date(),
      PHYSICAL_DATE: newData.PHYSICAL_DATE,
      USER_ID: employeeSelect?.USER_ID,
    };

    const employeeValue = {
      AREA_ID: selectArea?.value,
      DEPT_ID: selectDepartment?.value,
      DIVISION_ID: selectDivision?.value,
      UNIT_ID: selectUnit?.value,
      BRANCH_ID: selectBranch?.value,
      POSITION_ID: selectPosision?.value,
      CD: newData?.CD,
    };

    if (physicalExamSelect) {
      handleUpdatePhysicalExam(physicalExamValue, userValue, employeeValue);
    } else {
      handleCreatePhycicalExam(physicalExamValue, userValue, employeeValue);
    }
  };

  // HANDLE CREATE PHYSICAL EXAM, USER, EMPLOYEE
  const handleCreatePhycicalExam = async (
    physicalExamValue,
    userValue,
    employeeValue
  ) => {
    // CHECK IF INPUT CD
    if (employeeValue?.CD) {
      const isMatching = employees.some((item) => {
        const dataOfList = removeAccents(item?.CD)?.toLowerCase().trim();
        const keyWord = removeAccents(employeeValue?.CD)?.toLowerCase().trim();

        return dataOfList?.includes(keyWord);
      });
      //CHECK IF CD EXIST
      if (isMatching) {
        try {
          let resPhysical = await physicalExamApi.createPhysicalExam({
            ...physicalExamValue,
            USER_ID: employeeSelect?.USER_ID,
            INPUT_STATUS: 0,
          });
          if (resPhysical.data) {
            const physicalExamData = resPhysical?.data?.elements;
            setPhysicalExamGetNew(physicalExamData);
            physicalExamByQueryData(
              physicalExamFirstCreate,
              setPhysicalExamFirstCreate,
              {
                INPUT_STATUS: 0,
                TYPE: 3,
              }
            );
            // CREATE PHYSICAL DETAIL
            let physicalDetail = await physicalDetailApi.createPhysicalDetail({
              PHYSICAL_EXAM_ID: physicalExamData?.id,
            });
            if (physicalDetail.data) {
              setPhysicalDetailNew(physicalDetail.data.elements);
            }
            // CREATE CLINICAL DETAIL
            let clinicalData = await clinicalDetailApi.createClinicalDetail({
              PHYSICAL_EXAM_ID: physicalExamData?.id,
            });
            if (clinicalData.data) {
              setClinicalDetailNew(clinicalData.data.elements);
            }
            //CREATE PRECLINICAL DETAIL
            let preclinicalData =
              await preclinicalDetailApi.createPreclinicalDetail({
                PHYSICAL_EXAM_ID: physicalExamData?.id,
              });
            if (preclinicalData.data) {
              setPreClinicalDetailNew(preclinicalData.data.elements);
            }
            //CREATE PHYSICAL EXAM RESULT
            let physicalResult =
              await physicalExamResultApi.createPhysicalExamResult({
                PHYSICAL_EXAM_ID: physicalExamData?.id,
              });
            if (physicalResult.data) {
              setPhysicalExamResultNew(physicalResult.data.elements);
            }
            onKeyChange("2");
            setIsLoading(false);
          }
        } catch (error) {
          console.log("physical exam create error!!!");
          setIsLoading(false);
        }
      }
      // CHECK IF CD NOT EXIST
      else {
        try {
          let resUser = await userApi.createUser(userValue);
          if (resUser.data) {
            let employee = await employeeApi.createEmployee({
              ...employeeValue,
              USER_ID: resUser?.data?.elements?.id,
            });
            if (employee.data) {
              let listEmploye = await employeeApi.getAllEmployees();
              if (listEmploye.data) {
                setEmployees(listEmploye.data.elements);
              }
            }
            try {
              let resPhysical = await physicalExamApi.createPhysicalExam({
                ...physicalExamValue,
                USER_ID: resUser?.data?.elements?.id,
                INPUT_STATUS: 0,
              });
              if (resPhysical.data) {
                const physicalExamData = resPhysical?.data?.elements;
                setPhysicalExamGetNew(physicalExamData);
                physicalExamByQueryData(
                  physicalExamFirstCreate,
                  setPhysicalExamFirstCreate,
                  {
                    INPUT_STATUS: 0,
                    TYPE: 3,
                  }
                );
                // CREATE PHYSICAL DETAIL
                let physicalDetail =
                  await physicalDetailApi.createPhysicalDetail({
                    PHYSICAL_EXAM_ID: physicalExamData?.id,
                  });
                if (physicalDetail.data) {
                  setPhysicalDetailNew(physicalDetail.data.elements);
                }
                // CREATE CLINICAL DETAIL
                let clinicalData = await clinicalDetailApi.createClinicalDetail(
                  {
                    PHYSICAL_EXAM_ID: physicalExamData?.id,
                  }
                );
                if (clinicalData.data) {
                  setClinicalDetailNew(clinicalData.data.elements);
                }
                //CREATE PRECLINICAL DETAIL
                let preclinicalData =
                  await preclinicalDetailApi.createPreclinicalDetail({
                    PHYSICAL_EXAM_ID: physicalExamData?.id,
                  });
                if (preclinicalData.data) {
                  setPreClinicalDetailNew(preclinicalData.data.elements);
                }
                //CREATE PHYSICAL EXAM RESULT
                let physicalResult =
                  await physicalExamResultApi.createPhysicalExamResult({
                    PHYSICAL_EXAM_ID: physicalExamData?.id,
                  });
                if (physicalResult.data) {
                  setPhysicalExamResultNew(physicalResult.data.elements);
                }
                setIsLoading(false);
                onKeyChange("2");
              }
            } catch (error) {
              console.log("physical exam create error!!!");
            }
          }
        } catch (error) {
          console.log("user create error!!!");
        }
      }
    }

    //CHECK IF CD UNDEFINED
    else {
      try {
        let resUser = await userApi.createUser(userValue);
        if (resUser.data) {
          let employee = await employeeApi.createEmployee({
            ...employeeValue,
            USER_ID: resUser?.data?.elements?.id,
          });
          if (employee.data) {
            let listEmploye = await employeeApi.getAllEmployees();
            if (listEmploye.data) {
              setEmployees(listEmploye.data.elements);
            }
          }
          try {
            let resPhysical = await physicalExamApi.createPhysicalExam({
              ...physicalExamValue,
              USER_ID: resUser?.data?.elements?.id,
              INPUT_STATUS: 0,
            });
            if (resPhysical.data) {
              const physicalExamData = resPhysical?.data?.elements;
              setPhysicalExamGetNew(physicalExamData);
              physicalExamByQueryData(
                physicalExamFirstCreate,
                setPhysicalExamFirstCreate,
                {
                  INPUT_STATUS: 0,
                  TYPE: 3,
                }
              );
              // CREATE PHYSICAL DETAIL
              let physicalDetail = await physicalDetailApi.createPhysicalDetail(
                {
                  PHYSICAL_EXAM_ID: physicalExamData?.id,
                }
              );
              if (physicalDetail.data) {
                setPhysicalDetailNew(physicalDetail.data.elements);
              }
              // CREATE CLINICAL DETAIL
              let clinicalData = await clinicalDetailApi.createClinicalDetail({
                PHYSICAL_EXAM_ID: physicalExamData?.id,
              });
              if (clinicalData.data) {
                setClinicalDetailNew(clinicalData.data.elements);
              }
              //CREATE PRECLINICAL DETAIL
              let preclinicalData =
                await preclinicalDetailApi.createPreclinicalDetail({
                  PHYSICAL_EXAM_ID: physicalExamData?.id,
                });
              if (preclinicalData.data) {
                setPreClinicalDetailNew(preclinicalData.data.elements);
              }
              //CREATE PHYSICAL EXAM RESULT
              let physicalResult =
                await physicalExamResultApi.createPhysicalExamResult({
                  PHYSICAL_EXAM_ID: physicalExamData?.id,
                });
              if (physicalResult.data) {
                setPhysicalExamResultNew(physicalResult.data.elements);
              }
              setIsLoading(false);
              onKeyChange("2");
            }
          } catch (error) {
            console.log("physical exam create error!!!");
          }
        }
      } catch (error) {
        console.log("user create error!!!");
      }
    }

    // onKeyChange("2");
  };

  // HANDLE UPDATE PHYSICAL EXAM
  const handleUpdatePhysicalExam = async (
    physicalExamValue,
    userValue,
    employeeValue
  ) => {
    if (employeeValue?.CD) {
      const isMatching = employees.some((item) => {
        const dataOfList = removeAccents(item?.CD)?.toLowerCase().trim();
        const keyWord = removeAccents(employeeValue?.CD)?.toLowerCase().trim();

        return dataOfList?.includes(keyWord);
      });
      // CHECK IF EXITS CD IN EMPLOYEES
      if (isMatching) {
        try {
          const { USER_NAME, USER_PW, ...dataUser } = userValue;
          const { INPUT_DATE, ...physicalExamUpdate } = physicalExamValue;

          // await userApi.updateUser(dataUser, physicalExamSelect?.USER_ID);
          // await employeeApi.updateEmployee(
          //   {
          //     ...employeeValue,
          //     USER_NAME: physicalExamSelect?.User?.UNIT_NAME,
          //     USER_PW: physicalExamSelect?.User?.UNIT_PW,
          //     USER_ID: physicalExamSelect?.USER_ID,
          //   },
          //   physicalExamSelect?.Employees[0]?.id
          // );
          try {
            let res = await physicalExamApi.updatePhysicalExam(
              physicalExamUpdate,
              physicalExamSelect?.PHYSICAL_EXAM_ID
            );
            if (res.data) {
              let physicalExam = await physicalExamApi.getPhysicalExam(
                physicalExamSelect?.PHYSICAL_EXAM_ID
              );
              if (physicalExam.data) {
                setPhysicalExamRecruitId(
                  physicalExam.data.elements.physicalExam
                );
              }
              physicalExamByQueryData(
                physicalExamOption,
                setPhysicalExamOption,
                {
                  INPUT_STATUS: 1,
                  TYPE: 3,
                }
              );
            }
          } catch (error) {}
          onKeyChange("2");
          setIsLoading(false);
        } catch (error) {
          console.log("error");
          setIsLoading(false);
        }
      }
      //CHECK IF CD NOT EXIST IN EMPLOYEES
      else {
        const newEmployeValue = {
          ...employeeValue,
          USER_NAME: physicalExamSelect?.User
            ? physicalExamSelect?.User?.USER_NAME
            : physicalExamSelect?.USER_NAME,
          USER_ID: physicalExamSelect?.User
            ? physicalExamSelect?.User?.id
            : physicalExamSelect?.USER_ID,
        };
        const { INPUT_DATE, ...physicalExamUpdate } = physicalExamValue;
        try {
          let employes = await employeeApi.updateEmployee(
            newEmployeValue,
            physicalExamSelect?.Employees[0]?.id
          );
          if (employes.data) {
            let listEmploye = await employeeApi.getAllEmployees();
            if (listEmploye.data) {
              setEmployees(listEmploye.data.elements);
            }
          }

          let res = await physicalExamApi.updatePhysicalExam(
            physicalExamUpdate,
            physicalExamSelect?.PHYSICAL_EXAM_ID
          );
          if (res.data) {
            physicalExamByQueryData(physicalExamOption, setPhysicalExamOption, {
              INPUT_STATUS: 1,
              TYPE: 3,
            });
            let physicalExam = await physicalExamApi.getPhysicalExam(
              physicalExamSelect?.PHYSICAL_EXAM_ID
            );
            if (physicalExam.data) {
              setPhysicalExamRecruitId(physicalExam.data.elements.physicalExam);
            }
          }
          onKeyChange("2");
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log("Update physical exam fail!!");
        }
      }
    }
    // CHECK IF CD UNDEFFINED
    else {
      const newEmployeValue = {
        ...employeeValue,
        USER_NAME: physicalExamSelect?.User
          ? physicalExamSelect?.User?.USER_NAME
          : physicalExamSelect?.USER_NAME,
        USER_ID: physicalExamSelect?.User
          ? physicalExamSelect?.User?.id
          : physicalExamSelect?.USER_ID,
      };
      const { INPUT_DATE, ...physicalExamUpdate } = physicalExamValue;
      try {
        let employes = await employeeApi.updateEmployee(
          newEmployeValue,
          physicalExamSelect?.Employees[0]?.id
        );
        if (employes.data) {
          let listEmploye = await employeeApi.getAllEmployees();
          if (listEmploye.data) {
            setEmployees(listEmploye.data.elements);
          }
        }

        let res = await physicalExamApi.updatePhysicalExam(
          physicalExamUpdate,
          physicalExamSelect?.PHYSICAL_EXAM_ID
        );
        if (res.data) {
          physicalExamByQueryData(physicalExamOption, setPhysicalExamOption, {
            INPUT_STATUS: 1,
            TYPE: 3,
          });
          let physicalExam = await physicalExamApi.getPhysicalExam(
            physicalExamSelect?.PHYSICAL_EXAM_ID
          );
          if (physicalExam.data) {
            setPhysicalExamRecruitId(physicalExam.data.elements.physicalExam);
          }
        }
        onKeyChange("2");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Update physical exam fail!!");
      }
    }
  };

  // const [filteredDatas, query, handleChange] = useSearch(employees, predicate, {
  //   debounce: 200,
  // });

  const [filteredDatas, setFilteredDatas] = useState([]);

  useEffect(() => {
    setDataOption(() =>
      filteredDatas.map((item) => ({
        ...item,
        label: item.CD,
        value: item.CD,
      }))
    );
  }, [filteredDatas]);

  const handleSelectArea = (value, data) => {
    setSelectArea(data);
  };
  const handleSelectBranch = (value, data) => {
    setSelectBranch(data);
  };
  const handleSelectDivision = (value, data) => {
    setSelectDivision(data);
  };
  const handleSelectPosision = (value, data) => {
    setSelectPosision(data);
  };
  const handleSelectDepart = (value, data) => {
    setSelectDepartment(data);
  };
  const handleSelectUnit = (value, data) => {
    setSelectUnit(data);
  };

  const handleSelectGender = (value, data) => {
    if (
      data?.label === "Nữ" ||
      data?.label === "nữ" ||
      data?.label === "female" ||
      data?.label === "Female" ||
      data?.label === "NỮ" ||
      data?.label === "Nu" ||
      data?.label === "nu"
    ) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };
  const handleSelectCD = (data, option) => {
    setEmployeeSelet(option);
  };

  // HANDE SEARCH CD EMPLOYEE
  const handleSearch = (data) => {
    if (data?.length > 0) {
      let tempDatas = [];
      employees.forEach((item, index) => {
        const dataOfList = removeAccents(item?.CD)?.toLowerCase()?.trim();
        const keyWord = removeAccents(data)?.toLowerCase()?.trim();
        const isMatching = dataOfList == keyWord;
        if (isMatching) {
          tempDatas.push(item);
        }
      });
      setFilteredDatas(tempDatas);

      if (tempDatas?.length === 1) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setEmployeeSelet(tempDatas[0]);
        }, 800);
      }
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      name="presional"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
      validateMessages={validateMessages}
      ref={FrmPersionalInfoRef}
    >
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item label="Mã nhân viên" name="CD">
            <AutoComplete
              options={dataOption}
              // onChange={handleChange}
              onChange={handleSearch}
              onSelect={handleSelectCD}
              allowClear
              // disabled={isDoctor ? true : false}
              disabled={isDoctor || !physicalExamSelect ? true : false}
            >
              <Input onPressEnter={handleBlockEnter} />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="Họ lót"
            name="FIRST_NAME"
            rules={[
              { required: isDoctor || physicalExamSelect ? false : true },
            ]}
          >
            <Input
              disabled={isDoctor || physicalExamSelect ? true : false}
              onPressEnter={handleBlockEnter}
            />
          </Form.Item>
          <Form.Item
            label="Tên"
            name="LAST_NAME"
            rules={[
              { required: isDoctor || physicalExamSelect ? false : true },
            ]}
          >
            <Input
              disabled={isDoctor || physicalExamSelect ? true : false}
              onPressEnter={handleBlockEnter}
            />
          </Form.Item>
          <Form.Item
            name="BOD"
            label="Ngày tháng năm sinh"
            rules={[
              { required: isDoctor || physicalExamSelect ? false : true },
            ]}
          >
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              placeholder={false}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
              disabled={isDoctor || physicalExamSelect ? true : false}
            />
          </Form.Item>
          <Form.Item
            name="GENDER"
            label="Giới tính"
            rules={[
              { required: isDoctor || physicalExamSelect ? false : true },
            ]}
          >
            <Select
              options={genderOption}
              disabled={isDoctor || physicalExamSelect ? true : false}
              allowClear
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              onSelect={handleSelectGender}
            />
          </Form.Item>
          <Form.Item
            name="PHYSICAL_DATE"
            label="Ngày khám"
            rules={[{ required: true }]}
          >
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
              disabled={isDoctor}
            />
          </Form.Item>
          <Form.Item
            label="Cơ cở khám"
            name="MEDICAL_FACILITY_NAME"
            rules={[{ required: true }]}
          >
            <Input disabled={isDoctor} onPressEnter={handleBlockEnter} />
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item
            name="AREA_ID"
            label="Khối"
            rules={[
              { required: isDoctor || physicalExamSelect ? false : true },
            ]}
          >
            <Select
              options={areaOption}
              disabled={isDoctor || physicalExamSelect ? true : false}
              allowClear
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onSelect={handleSelectArea}
            />
          </Form.Item>
          <Form.Item
            name="DEPT_ID"
            label="Phòng ban"
            rules={[
              { required: isDoctor || physicalExamSelect ? false : true },
            ]}
          >
            <Select
              options={departmentOption}
              disabled={isDoctor || physicalExamSelect ? true : false}
              allowClear
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onSelect={handleSelectDepart}
            />
          </Form.Item>
          <Form.Item
            name="DIVISION_ID"
            label="Bộ phận"
            rules={[
              { required: isDoctor || physicalExamSelect ? false : true },
            ]}
          >
            <Select
              options={divisionOption}
              disabled={isDoctor || physicalExamSelect ? true : false}
              allowClear
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onSelect={handleSelectDivision}
            />
          </Form.Item>
          <Form.Item name="UNIT_ID" label="Đơn vị">
            <Select
              options={unitOption}
              disabled={isDoctor || physicalExamSelect ? true : false}
              allowClear
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onSelect={handleSelectUnit}
            />
          </Form.Item>
          <Form.Item
            name="POSITION_ID"
            label={<label>Cấp bậc</label>}
            rules={[
              { required: isDoctor || physicalExamSelect ? false : true },
            ]}
          >
            <Select
              options={positionOption}
              disabled={isDoctor || physicalExamSelect ? true : false}
              allowClear
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onSelect={handleSelectPosision}
            />
          </Form.Item>
          <Form.Item label="Nơi làm việc" name="BRANCH_ID">
            <Select
              disabled={isDoctor || physicalExamSelect ? true : false}
              allowClear
              options={workPlaceOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onSelect={handleSelectBranch}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...tailLayout}>
        <Row>
          <Col xl={19} lg={19} md={19} sm={16} xs={10}></Col>
          <Col xl={4} lg={4} md={4} sm={6} xs={6}>
            <Button
              htmlType="submit"
              onClick={handleOk}
              form="presional"
              key="presional"
              className="btn-submit"
            >
              {isLoading ? <LoadingOutlined /> : "Tiếp"}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default FrmPersonalInformation;
