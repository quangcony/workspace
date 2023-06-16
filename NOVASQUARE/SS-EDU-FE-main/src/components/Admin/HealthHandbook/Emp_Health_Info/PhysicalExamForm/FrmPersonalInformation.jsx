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
import {
  yearData,
  removeAccents,
  formatDate,
  validateMessages,
  handleBlockEnter,
} from "../../../../../common";
import moment from "moment";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  employeeSelectState,
  employeeState,
} from "../../../../../recoil/atom/employeeState";
import { physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import { physicalExamNewState } from "../../../../../recoil/atom/physicalExamNew";
import { healthHistoryState } from "../../../../../recoil/atom/healthHistotyState";
import { healthHissData } from "../../../../../common/getAllApi";

import { useCity } from "../../../../../hooks/city";
import { useWorkPlace } from "../../../../../hooks/workPlace";
import { useDivision } from "../../../../../hooks/division";
import { useDepartment } from "../../../../../hooks/department";
import { useUnit } from "../../../../../hooks/unit";
import { useArea } from "../../../../../hooks/area";
import { usePosition } from "../../../../../hooks/position";
import { useEmployeeContractType } from "../../../../../hooks/employeeContractType";
import {
  cityOptionsState,
  selectCityState,
} from "../../../../../recoil/atom/cityState";
import {
  selectWorkPlacesState,
  workPlaceOptionsState,
} from "../../../../../recoil/atom/workPlaceState";
import {
  selectUnitState,
  unitOptionsState,
} from "../../../../../recoil/atom/unitState";
import {
  areaOptionsState,
  selectAreaState,
} from "../../../../../recoil/atom/areaState";
import {
  divisionOptionsState,
  selectDivisionState,
} from "../../../../../recoil/atom/divisionState";
import {
  positionOptionsState,
  selectPositionState,
} from "../../../../../recoil/atom/positionState";
import {
  departmentOptionsState,
  selectDepartmentState,
} from "../../../../../recoil/atom/departmentState";
import {
  employeeTypeOptionsState,
  selectEmployeeTypeState,
} from "../../../../../recoil/atom/employeeTypeState";
import { isSubmitState } from "../../../../../recoil/atom/booleanState";
import { useHealthHis } from "../../../../../hooks/healthHis";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

const FrmPersonalInformation = ({
  isOpenSearchNV,
  setIsPersional,
  setIsHealthHis,
  onKeyChange,
  onCreatePhysicalExam,
  FrmPersionalInfoRef,
  onUpdatePhysicalExam,
  setError,
  error,
}) => {
  useCity();
  useWorkPlace();
  useDivision();
  useDepartment();
  useUnit();
  useArea();
  usePosition();
  useEmployeeContractType();
  // useHealthHis();
  const typingTimeoutRef = useRef(null);
  const [isSubmit, setIsSubmit] = useRecoilState(isSubmitState);
  const employees = useRecoilValue(employeeState);
  const physicalExamSelect = useRecoilValue(physicalExamSelectState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewState);
  const [healthHisAll, setHealthHisAll] = useRecoilState(healthHistoryState);

  const cityOptions = useRecoilValue(cityOptionsState);
  const workPlaceOptions = useRecoilValue(workPlaceOptionsState);
  const unitOptions = useRecoilValue(unitOptionsState);
  const areaOptions = useRecoilValue(areaOptionsState);
  const divisionOptions = useRecoilValue(divisionOptionsState);
  const positOptions = useRecoilValue(positionOptionsState);
  const departOptions = useRecoilValue(departmentOptionsState);
  const emplyeeTypeOptions = useRecoilValue(employeeTypeOptionsState);

  const [filteredDatas, setFilteredDatas] = useState([]);
  const [isShow, setIsShow] = useState(true);

  const [employeeSelect, setEmployeeSelet] =
    useRecoilState(employeeSelectState);

  const [form] = Form.useForm();
  const [dataOption, setDataOption] = useState([]);

  const [selectBranch, setSelectBranch] = useRecoilState(selectWorkPlacesState);
  const [selectCity, setSelectCity] = useRecoilState(selectCityState);
  const [selectDepartment, setSelectDepartment] = useRecoilState(
    selectDepartmentState
  );
  const [selectDivision, setSelectDivision] =
    useRecoilState(selectDivisionState);
  const [selectArea, setSelectArea] = useRecoilState(selectAreaState);
  const [selectUnit, setSelectUnit] = useRecoilState(selectUnitState);
  const [selectEmployeeType, setSelectEmployeeType] = useRecoilState(
    selectEmployeeTypeState
  );
  const [selectPosision, setSelectPosision] =
    useRecoilState(selectPositionState);
  const [isMatch, setIsMatch] = useState(false);

  // GET ALL HEALTH HISTORY
  useEffect(() => {
    if (healthHisAll.length === 0) {
      healthHissData(healthHisAll, setHealthHisAll);
    }
  }, [healthHisAll]);

  useEffect(() => {
    if (employeeSelect) {
      setSelectBranch({
        value: employeeSelect && employeeSelect?.Workplace?.id,
        label: employeeSelect && employeeSelect?.Workplace?.BRANCH_NAME,
      });
      setSelectCity({
        value: employeeSelect && employeeSelect?.City?.id,
        label: employeeSelect && employeeSelect?.City?.CITY_NAME,
      });
      setSelectDepartment({
        value: employeeSelect && employeeSelect?.Department?.id,
        label: employeeSelect && employeeSelect?.Department?.DEPARTMENT_NAME,
      });
      setSelectDivision({
        value: employeeSelect && employeeSelect?.Division?.id,
        label: employeeSelect && employeeSelect?.Division?.DIVISION_NAME,
      });
      setSelectArea({
        value: employeeSelect && employeeSelect?.Area?.id,
        label: employeeSelect && employeeSelect?.Area?.AREA_NAME,
      });
      setSelectUnit({
        value: employeeSelect && employeeSelect?.Unit?.id,
        label: employeeSelect && employeeSelect?.Unit?.UNIT_NAME,
      });
      setSelectPosision({
        value: employeeSelect && employeeSelect?.Position?.id,
        label: employeeSelect && employeeSelect?.Position?.POSITION_NAME,
      });
    }
  }, [employeeSelect]);

  // SET DATA FORM
  useEffect(() => {
    if (physicalExamSelect || physicalExamGetNew?.length > 0) {
      form.setFieldsValue({
        CD: employeeSelect?.CD?.trim(),
        FIRST_NAME: employeeSelect?.User?.FIRST_NAME,
        LAST_NAME: employeeSelect?.User?.LAST_NAME,
        BOD:
          employeeSelect &&
          moment(new Date(employeeSelect?.User?.BOD)).format(formatDate.Type),
        START_WORKING_DATE:
          employeeSelect &&
          moment(new Date(employeeSelect?.START_WORKING_DATE)).format(
            formatDate.Type
          ),
        GENDER: employeeSelect?.User?.Gender?.NAME,
        MARITAL_STATUS_NAME:
          employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME,
        PHYSICAL_DATE:
          physicalExamSelect && moment(physicalExamSelect?.PHYSICAL_DATE),
        MEDICAL_EXAM_YEAR: physicalExamSelect?.MEDICAL_EXAM_YEAR,
        MEDICAL_FACILITY_NAME: physicalExamSelect?.MEDICAL_FACILITY_NAME,
        BRANCH_ID: physicalExamSelect?.BRANCH_ID,
        DEPT_ID: physicalExamSelect?.DEPT_ID,
        DIVISION_ID: physicalExamSelect?.DIVISION_ID,
        AREA_ID: physicalExamSelect?.AREA_ID,
        UNIT_ID: physicalExamSelect?.UNIT_ID,
        CITY_ID: physicalExamSelect?.CITY_ID,
        POSITION_ID: physicalExamSelect?.POSITION_ID,
        CONTRACT_TYPE_ID: physicalExamSelect?.CONTRACT_TYPE_ID,
        RECORD_CD: physicalExamSelect?.RECORD_CD,
      });
    } else if (!physicalExamSelect || !physicalExamGetNew) {
      form.setFieldsValue({
        CD: employeeSelect && employeeSelect?.CD?.trim(),
        FIRST_NAME: employeeSelect && employeeSelect?.User?.FIRST_NAME,
        LAST_NAME: employeeSelect && employeeSelect?.User?.LAST_NAME,
        BOD:
          employeeSelect &&
          moment(new Date(employeeSelect?.User?.BOD)).format(formatDate.Type),
        START_WORKING_DATE:
          employeeSelect &&
          moment(new Date(employeeSelect?.START_WORKING_DATE)).format(
            formatDate.Type
          ),
        PHYSICAL_DATE: "",
        MEDICAL_FACILITY_NAME: null,
        MEDICAL_EXAM_YEAR: new Date().getFullYear(),
        GENDER: employeeSelect && employeeSelect?.User?.Gender?.NAME,
        EMP_TYPE_NAME:
          employeeSelect &&
          employeeSelect?.employeeSelect?.EMPLOYEE_CONTRACT_NAME,
        MARITAL_STATUS_NAME:
          employeeSelect && employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME,
        BRANCH_ID: employeeSelect && employeeSelect?.BRANCH_ID,
        DEPT_ID: employeeSelect && employeeSelect?.DEPT_ID,
        DIVISION_ID: employeeSelect && employeeSelect?.DIVISION_ID,
        AREA_ID: employeeSelect && employeeSelect?.AREA_ID,
        UNIT_ID: employeeSelect && employeeSelect?.UNIT_ID,
        CITY_ID: employeeSelect && employeeSelect?.CITY_ID,
        POSITION_ID: employeeSelect && employeeSelect?.POSITION_ID,
      });
    } else if (!employeeSelect) {
      form.resetFields();
    }
  }, [form, physicalExamSelect, employeeSelect]);

  // HANDLE SUBMIT FORM
  const handleOk = (e) => {
    const newData = { ...form.getFieldValue() };

    const values = {
      INPUT_DATE: new Date(),
      MEDICAL_EXAM_YEAR: Number(newData.MEDICAL_EXAM_YEAR),
      PHYSICAL_DATE: newData.PHYSICAL_DATE,
      MEDICAL_FACILITY_NAME: newData.MEDICAL_FACILITY_NAME,
      RECORD_CD: newData.RECORD_CD,
      INPUT_STATUS: 0,
      TYPE: 4,
      CITY_NAME: selectCity?.label,
      CITY_ID: selectCity?.value,
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
      POSITION_ID: selectPosision?.value,
      POSITION_NAME: selectPosision?.label,
      CONTRACT_TYPE_ID: selectEmployeeType?.value,
      CONTRACT_TYPE_NAME: selectEmployeeType?.label,
      MARITAL_STATUS_NAME: newData?.MARITAL_STATUS_NAME,
      MARITAL_STATUS_ID: employeeSelect?.Marital_Status?.id,
      CONTENT: "Khám sức khỏe định kỳ",
    };

    const {
      CD,
      PHYSICAL_DATE,
      MEDICAL_EXAM_YEAR,
      MEDICAL_FACILITY_NAME,
      RECORD_CD,
    } = newData;

    const isMatching = employees?.some((item) => {
      const dataOfList = item?.CD?.toLowerCase()?.trim();
      const keyWord = newData?.CD?.toLowerCase()?.trim();
      return dataOfList == keyWord;
    });

    if (
      !isMatching ||
      !PHYSICAL_DATE ||
      CD === undefined ||
      RECORD_CD === null ||
      RECORD_CD === undefined ||
      MEDICAL_EXAM_YEAR === undefined ||
      MEDICAL_EXAM_YEAR === null ||
      MEDICAL_FACILITY_NAME === undefined ||
      MEDICAL_FACILITY_NAME === null ||
      CD.trim() === "" ||
      RECORD_CD.trim() === ""
    ) {
      return;
    }

    setIsSubmit(true);
    if (physicalExamSelect) {
      const newResult = {
        ...values,
        INPUT_STATUS: physicalExamSelect?.INPUT_STATUS,
        USER_ID: physicalExamSelect?.USER_ID,
      };
      handleUpdatePhysicalExam(newResult, physicalExamSelect?.id);
    } else if (physicalExamGetNew.length > 0 || physicalExamGetNew?.id) {
      const newResult = { ...values, USER_ID: employeeSelect?.USER_ID };
      handleUpdatePhysicalExam(newResult, physicalExamGetNew?.id);
    } else {
      const newResult = {
        ...values,
        USER_ID: employeeSelect?.USER_ID,
        INPUT_STATUS: 0,
      };
      handleCreatePhysicalExam(newResult);
    }
    setIsPersional(false);
    setIsHealthHis(true);
    onKeyChange("2");
  };

  // CREATE PHYSICAL EXAM
  const handleCreatePhysicalExam = async (value) => {
    await onCreatePhysicalExam(value);
    setIsSubmit(false);
  };

  //UPDATE PHYSICAL EXAM
  const handleUpdatePhysicalExam = async (data, id) => {
    await onUpdatePhysicalExam(data, id);
    setIsSubmit(false);
  };

  // HANDE SEARCH CD EMPLOYEE
  const handleSearch = (data) => {
    if (data?.length > 0) {
      let tempDatas = [];
      employees.forEach((item, index) => {
        const dataOfList = removeAccents(item?.CD)?.toLowerCase()?.trim();
        const keyWord = removeAccents(data)?.toLowerCase()?.trim();
        const isMatching = dataOfList?.includes(keyWord);
        if (isMatching) {
          tempDatas.push(item);
        }
      });

      if (tempDatas?.length > 0 && tempDatas?.length !== 1) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setFilteredDatas(tempDatas);
          setError("");
          setEmployeeSelet(undefined);
        }, 300);
      } else {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setFilteredDatas([]);
          setError("Mã số nhân viên không tồn tại");
          setEmployeeSelet(undefined);
        }, 300);
      }
      if (tempDatas?.length === 1) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setEmployeeSelet(tempDatas[0]);
        }, 500);
      }
    }
    if (data?.length === 0) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setFilteredDatas([]);
        setEmployeeSelet(undefined);
        setError("");
      }, 200);
    }
  };

  //SET MODIFIE DATA FOR CD
  useEffect(() => {
    setDataOption(() =>
      filteredDatas.map((item) => ({
        ...item,
        label: item.CD,
        value: item.CD,
      }))
    );
  }, [filteredDatas]);

  // CHECK GENDER EMPLOYEE
  useEffect(() => {
    const gender = employeeSelect?.User?.Gender?.NAME;
    if (
      gender === "Nữ" ||
      gender === "nữ" ||
      gender === "NỮ" ||
      gender === "nu" ||
      gender === "Female" ||
      gender === "female"
    ) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [employeeSelect]);

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
        <Col
          xl={10}
          lg={10}
          md={10}
          sm={20}
          xs={20}
          offset={2}
          style={{ position: "relative" }}
        >
          <Form.Item
            label="Mã nhân viên"
            name="CD"
            rules={[{ required: physicalExamSelect ? false : true }]}
          >
            <AutoComplete
              options={dataOption}
              onChange={handleSearch}
              onSelect={(data, option) => {
                setEmployeeSelet(option);
              }}
              disabled={physicalExamSelect ? true : false}
            >
              <Input onPressEnter={handleBlockEnter} />
            </AutoComplete>
          </Form.Item>
          <span
            style={{
              position: "absolute",
              color: "#ff4d4f",
              top: 32,
              left: "33.5%",
            }}
          >
            {error}
          </span>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={10} offset={2}>
          {physicalExamSelect ? null : (
            <Button type="primary" onClick={isOpenSearchNV}>
              Tìm kiếm NV
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item label={<label>Họ lót</label>} name="FIRST_NAME">
            <Input disabled />
          </Form.Item>
          <Form.Item label={<label>Tên</label>} name="LAST_NAME">
            <Input disabled />
          </Form.Item>
          <Form.Item name="BOD" label={<label>Ngày tháng năm sinh</label>}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="START_WORKING_DATE"
            label={<label>Ngày vào làm</label>}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item name="GENDER" label={<label>Giới tính</label>}>
            <Input disabled />
          </Form.Item>
          {/* {isShow ? ( */}
          <Form.Item
            name="MARITAL_STATUS_NAME"
            label={<label>Tình trạng hôn nhân</label>}
          >
            <Input disabled />
          </Form.Item>
          {/* ) : (
            ""
          )} */}

          <Form.Item
            name="PHYSICAL_DATE"
            label="Ngày khám"
            rules={[{ required: true }]}
          >
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              placeholder={false}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
            />
          </Form.Item>
          <Form.Item
            name="MEDICAL_EXAM_YEAR"
            label="Năm khám"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={new Date().getFullYear()}
          >
            <Select style={{ width: "100%" }}>
              {yearData &&
                yearData.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="MEDICAL_FACILITY_NAME"
            label="Cơ sở khám"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input onPressEnter={handleBlockEnter} />
          </Form.Item>
          <Form.Item
            name="RECORD_CD"
            label="Số hồ sơ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input onPressEnter={handleBlockEnter} />
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={1}>
          <Form.Item name="BRANCH_ID" label="Nơi làm việc">
            <Select
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
              onSelect={(value, data) => {
                setSelectBranch(data);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="CITY_ID" label={<>Tỉnh/Thành làm việc</>}>
            <Select
              allowClear
              options={cityOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onSelect={(value, data) => {
                setSelectCity(data);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="DEPT_ID" label="Phòng ban">
            <Select
              allowClear
              options={departOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onSelect={(value, data) => {
                setSelectDepartment(data);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="DIVISION_ID" label="Bộ phận">
            <Select
              allowClear
              options={divisionOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onSelect={(value, data) => {
                setSelectDivision(data);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="AREA_ID" label="Khối">
            <Select
              allowClear
              options={areaOptions}
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
              onSelect={(value, data) => {
                setSelectArea(data);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="UNIT_ID" label="Đơn vị">
            <Select
              allowClear
              options={unitOptions}
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
              onSelect={(value, data) => {
                setSelectUnit(data);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="POSITION_ID" label="Cấp bậc">
            <Select
              allowClear
              showSearch
              style={{
                width: "100%",
              }}
              options={positOptions}
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.trim().toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              placeholder={false}
              onSelect={(value, data) => {
                setSelectPosision(data);
              }}
            />
          </Form.Item>
          <Form.Item name="CONTRACT_TYPE_ID" label="Loại nhân viên">
            <Select
              allowClear
              options={emplyeeTypeOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.trim().toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onSelect={(value, data) => {
                setSelectEmployeeType(data);
              }}
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
              {isSubmit ? <LoadingOutlined /> : "Tiếp"}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default FrmPersonalInformation;
