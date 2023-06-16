import {
  AutoComplete, Button, Col, DatePicker, Form,
  Input, Radio, Row, Select
} from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import physicalExamApi from "../../../../../api/physicalExamApi";
import specialExamApi from "../../../../../api/specialExamApi";
import { formatDate, removeAccents, yearData, YearOfWork } from "../../../../../common";
import { useArea } from "../../../../../hooks/area";
import { useCity } from "../../../../../hooks/city";
import { useDepartment } from "../../../../../hooks/department";
import { useDivision } from "../../../../../hooks/division";
import { useEmployeeContractType } from "../../../../../hooks/employeeContractType";
import { usePosition } from "../../../../../hooks/position";
import { useUnit } from "../../../../../hooks/unit";
import { useWorkPlace } from "../../../../../hooks/workPlace";
import { areaOptionsState, selectAreaState } from "../../../../../recoil/atom/areaState";
import { cityOptionsState, selectCityState } from "../../../../../recoil/atom/cityState";
import { departmentOptionsState, selectDepartmentState } from "../../../../../recoil/atom/departmentState";
import { divisionOptionsState, selectDivisionState } from "../../../../../recoil/atom/divisionState";
import { employeeIdState, employeeSelectState, employeeState } from "../../../../../recoil/atom/employeeState";
import { employeeTypeOptionsState, selectEmployeeTypeState } from "../../../../../recoil/atom/employeeTypeState";
import { newestPhysicalExamState, physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import { positionOptionsState, selectPositionState } from "../../../../../recoil/atom/positionState";
import { newestSpecialExamState, specialDiseaseTypeState, specialExamTypeState } from "../../../../../recoil/atom/specialExamState";
import { tabActiveState } from "../../../../../recoil/atom/tabActiveState";
import { selectUnitState, unitOptionsState } from "../../../../../recoil/atom/unitState";
import { selectWorkPlacesState, workPlaceOptionsState } from "../../../../../recoil/atom/workPlaceState";
const { Option } = Select;

const validateMessages = {
  required: "Trường này không được để trống!",
};

const occupationalList = [
  "Bệnh Điếc nghề nghiệp do tiếng ồn",
  "Bệnh Viêm phế quản mãn tính nghề nghiệp",
  "Bệnh Hen phế quản nghề nghiệp",
  "Bệnh Bụi phổi silic nghề nghiệp",
  "Bệnh nghề nghiệp khác 1",
  "Bệnh nghề nghiệp khác 2"
]

const FrmPersonalInformation = ({ isOpenSearchNV, onKeyChange, FrmPersonalInfoRef, specialDiseaseType, errorMessage, setErrorMessage }) => {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  useCity();
  useWorkPlace();
  useDivision();
  useDepartment();
  useUnit();
  useArea();
  usePosition();
  useEmployeeContractType();

  const typingTimeoutRef = useRef();

  const YearWork = YearOfWork();
  const [dataOption, setDataOption] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);

  const [newPhysicalExam, setNewPhysicalExamState] = useRecoilState(newestPhysicalExamState);
  const [newSpecialExam, setNewSpecialExam] = useRecoilState(newestSpecialExamState);
  const physicalExam = useRecoilValue(physicalExamSelectState);
  const employees = useRecoilValue(employeeState);
  const setSpecialExamType = useSetRecoilState(specialExamTypeState);
  const setEmployeeId = useSetRecoilState(employeeIdState);
  const setSpecialDiseaseType = useSetRecoilState(specialDiseaseTypeState);
  const [tabActive, setTabActive] = useRecoilState(tabActiveState);
  const [employeeSelect, setEmployeeSelet] = useRecoilState(employeeSelectState);

  const cityOptions = useRecoilValue(cityOptionsState);
  const workPlaceOptions = useRecoilValue(workPlaceOptionsState);
  const unitOptions = useRecoilValue(unitOptionsState);
  const areaOptions = useRecoilValue(areaOptionsState);
  const divisionOptions = useRecoilValue(divisionOptionsState);
  const positOptions = useRecoilValue(positionOptionsState);
  const departOptions = useRecoilValue(departmentOptionsState);
  const emplyeeTypeOptions = useRecoilValue(employeeTypeOptionsState);

  const [selectBranch, setSelectBranch] = useRecoilState(selectWorkPlacesState);
  const [selectCity, setSelectCity] = useRecoilState(selectCityState);
  const [selectDepartment, setSelectDepartment] = useRecoilState(selectDepartmentState);
  const [selectDivision, setSelectDivision] = useRecoilState(selectDivisionState);
  const [selectArea, setSelectArea] = useRecoilState(selectAreaState);
  const [selectUnit, setSelectUnit] = useRecoilState(selectUnitState);
  const [selectEmployeeType, setSelectEmployeeType] = useRecoilState(selectEmployeeTypeState);
  const [selectPosision, setSelectPosision] = useRecoilState(selectPositionState);

  useEffect(() => {
    setDataOption(() =>
      filteredDatas.map((item) => ({
        ...item,
        label: item.CD,
        value: item.CD,
      }))
    );
  }, [filteredDatas]);

  const onSelect = (data, option) => {
    setEmployeeSelet(option);
  };

  useEffect(() => {
    if (physicalExam) {
      setSelectBranch({
        value: physicalExam?.BRANCH_ID,
        label: physicalExam?.BRANCH_NAME,
      });
      setSelectCity({
        value: physicalExam?.CITY_ID,
        label: physicalExam?.CITY_NAME,
      });
      setSelectDepartment({
        value: physicalExam?.DEPT_ID,
        label: physicalExam?.DEPT_NAME,
      });
      setSelectDivision({
        value: physicalExam?.DIVISION_ID,
        label: physicalExam?.DIVISION_NAME,
      });
      setSelectArea({
        value: physicalExam?.AREA_ID,
        label: physicalExam?.AREA_NAME,
      });
      setSelectUnit({
        value: physicalExam?.UNIT_ID,
        label: physicalExam?.UNIT_NAME,
      });
      setSelectPosision({
        value: physicalExam?.POSITION_ID,
        label: physicalExam?.POSITION_NAME,
      });
    }
    else if (employeeSelect) {
      setEmployeeId(employeeSelect.id);
      setSelectBranch({
        value: employeeSelect?.Workplace?.id,
        label: employeeSelect?.Workplace?.BRANCH_NAME,
      });
      setSelectCity({
        value: employeeSelect?.City?.id,
        label: employeeSelect?.City?.CITY_NAME,
      });
      setSelectDepartment({
        value: employeeSelect?.Department?.id,
        label: employeeSelect?.Department?.DEPARTMENT_NAME,
      });
      setSelectDivision({
        value: employeeSelect?.Division?.id,
        label: employeeSelect?.Division?.DIVISION_NAME,
      });
      setSelectArea({
        value: employeeSelect?.Area?.id,
        label: employeeSelect?.Area?.AREA_NAME,
      });
      setSelectUnit({
        value: employeeSelect?.Unit?.id,
        label: employeeSelect?.Unit?.UNIT_NAME,
      });
      setSelectPosision({
        value: employeeSelect?.Position?.id,
        label: employeeSelect?.Position?.POSITION_NAME,
      });
    }
  }, [employeeSelect, physicalExam]);

  useEffect(() => {
    if (!physicalExam && employeeSelect) {
      form.setFieldsValue({
        CD: employeeSelect?.CD,
        FIRST_NAME: employeeSelect?.User?.FIRST_NAME,
        LAST_NAME: employeeSelect?.User?.LAST_NAME,
        BOD: moment(employeeSelect?.User?.BOD),
        START_WORKING_DATE: moment(employeeSelect?.START_WORKING_DATE),
        GENDER: employeeSelect?.User?.Gender?.NAME,
        MARITAL_STATUS_NAME: employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME,
        BRANCH_ID: employeeSelect?.BRANCH_ID,
        DEPT_ID: employeeSelect?.DEPT_ID,
        DIVISION_ID: employeeSelect?.DIVISION_ID,
        AREA_ID: employeeSelect?.AREA_ID,
        UNIT_ID: employeeSelect?.UNIT_ID,
        CITY_ID: employeeSelect?.CITY_ID,
        POSITION_ID: employeeSelect?.POSITION_ID,
        CONTRACT_TYPE_ID: employeeSelect?.CONTRACT_TYPE_ID,
      })
    }
    if (physicalExam && employeeSelect) {
      setSpecialExamType(physicalExam?.Special_Exams[0]?.TYPE);
      setSpecialDiseaseType(physicalExam?.Special_Exams[0]?.SPECIAL_DISEASE_TYPE);
      form.setFieldsValue({
        TYPE: physicalExam?.Special_Exams[0].TYPE,
        SPECIAL_DISEASE_TYPE: (physicalExam?.Special_Exams[0].SPECIAL_DISEASE_TYPE)?.toString(),
        DEPARTMENT_WORKED_YEAR: physicalExam?.Special_Exams[0]?.DEPARTMENT_WORKED_YEAR,
        PHYSICAL_DATE: moment(physicalExam?.PHYSICAL_DATE),
        CD: employeeSelect?.CD,
        FIRST_NAME: employeeSelect?.User?.FIRST_NAME,
        LAST_NAME: employeeSelect?.User?.LAST_NAME,
        BOD: moment(employeeSelect?.User?.BOD),
        START_WORKING_DATE: moment(employeeSelect?.START_WORKING_DATE),
        GENDER: employeeSelect?.User?.Gender?.NAME,
        MARITAL_STATUS_NAME: employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME,
        MEDICAL_EXAM_YEAR: physicalExam?.MEDICAL_EXAM_YEAR,
        MEDICAL_FACILITY_NAME: physicalExam?.MEDICAL_FACILITY_NAME,
        BRANCH_ID: physicalExam?.BRANCH_ID,
        DEPT_ID: physicalExam?.DEPT_ID,
        DIVISION_ID: physicalExam?.DIVISION_ID,
        AREA_ID: physicalExam?.AREA_ID,
        UNIT_ID: physicalExam?.UNIT_ID,
        CITY_ID: physicalExam?.CITY_ID,
        POSITION_ID: physicalExam?.POSITION_ID,
        CONTRACT_TYPE_ID: physicalExam?.CONTRACT_TYPE_ID,
      });
    }
  }, [physicalExam, form, employeeSelect]);

  const handleUpdatePhysicalExam = async (data) => {
    let id = physicalExam ? physicalExam?.id : newPhysicalExam?.id;
    try {
      const res = await physicalExamApi.updatePhysicalExam(data, id);
      if (res?.data) {
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleCreateSpecialExam = async (data) => {
    let res = await specialExamApi.createSpecialExam(data);
    if (res.data) {
      setNewSpecialExam(res?.data?.elements);
    }
  };
  const handleUpdateSpecialExam = async (data) => {
    let id = physicalExam ? physicalExam?.Special_Exams[0].id : newSpecialExam.id;
    await specialExamApi.updateSpecialExam(data, id);
  };

  const handleSearch = (data) => {
    if (data && data.length) {
      const query = data.toLowerCase().trim();
      const tempDatas = employees.filter(item =>
        String(item?.CD?.toLowerCase()).includes(query)
      );

      if (tempDatas?.length > 1) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setFilteredDatas(tempDatas);
          setErrorMessage("");
        }, 300);
      } else {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setFilteredDatas([]);
          setErrorMessage("Mã số nhân viên không tồn tại");
        }, 300);
      }
      if (tempDatas?.length === 1) {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
          setEmployeeSelet(tempDatas[0]);
        }, 300);
      }
    }
    if (data?.length === 0) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setFilteredDatas([]);
        setEmployeeSelet(undefined);
        setErrorMessage("");
      }, 200);
    }
  };

  const handleOk = async () => {
    const newData = {
      ...form.getFieldsValue(),
    };

    const {
      TYPE,
      SPECIAL_DISEASE_TYPE,
      CD,
      PHYSICAL_DATE,
      MEDICAL_EXAM_YEAR,
      MEDICAL_FACILITY_NAME,
      DEPARTMENT_WORKED_YEAR,
    } = newData;

    if (
      TYPE === undefined || SPECIAL_DISEASE_TYPE === undefined ||
      CD === undefined || CD.trim() === "" ||
      PHYSICAL_DATE === undefined || PHYSICAL_DATE === null ||
      MEDICAL_EXAM_YEAR === undefined ||
      MEDICAL_FACILITY_NAME === undefined || MEDICAL_FACILITY_NAME.trim() === "" ||
      DEPARTMENT_WORKED_YEAR === undefined || DEPARTMENT_WORKED_YEAR === null
    ) {
      return;
    }

    setSpecialExamType(TYPE);
    setSpecialDiseaseType(Number(SPECIAL_DISEASE_TYPE));

    const physicalExamData = {
      USER_ID: employeeSelect?.USER_ID,
      INPUT_DATE: new Date(),
      INPUT_STATUS: physicalExam ? physicalExam.INPUT_STATUS : 0,
      TYPE: 6,
      MEDICAL_EXAM_YEAR,
      PHYSICAL_DATE,
      MEDICAL_FACILITY_NAME,
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
    };

    if (physicalExam || !tabActive.medicalHistory) {
      handleUpdatePhysicalExam(physicalExamData);
      const specialExamData = {
        TYPE,
        SPECIAL_DISEASE_TYPE: Number(SPECIAL_DISEASE_TYPE),
        DEPARTMENT_WORKED_YEAR,
        SPECIAL_DISEASE_NAME: occupationalList[Number(SPECIAL_DISEASE_TYPE)],
      }
      handleUpdateSpecialExam(specialExamData);
      onKeyChange("2");
      return;
    }
    try {
      const res = await physicalExamApi.createPhysicalExam(physicalExamData);
      if (res.data) {
        setNewPhysicalExamState(() => res.data.elements);
        const specialExamData = {
          PHYSICAL_EXAM_ID: res.data.elements.id,
          TYPE,
          SPECIAL_DISEASE_TYPE: Number(SPECIAL_DISEASE_TYPE),
          DEPARTMENT_WORKED_YEAR,
          SPECIAL_DISEASE_NAME: occupationalList[Number(SPECIAL_DISEASE_TYPE)],
        };
        handleCreateSpecialExam(specialExamData);
        enqueueSnackbar(res?.data?.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
    setTabActive({ ...tabActive, medicalHistory: false });
    onKeyChange("2");
  };

  return (
    <Form
      form={form}
      name="personal_informartion"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
      labelCol={{ span: 8 }}
      labelWrap
      validateMessages={validateMessages}
      ref={FrmPersonalInfoRef}
    >
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item
            name="TYPE"
            rules={[{ required: true }]}
            label="Hình thức khám"
          >
            <Radio.Group disabled={physicalExam ? true : false}>
              <Radio value={0}> Tầm soát </Radio>
              <Radio value={1}> Định kỳ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="SPECIAL_DISEASE_TYPE"
            label="Bệnh nghề nghiệp"
            rules={[{ required: true }]}
          >
            <Select
              allowClear
              options={specialDiseaseType}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              disabled={physicalExam ? true : false}
            />
          </Form.Item>

        </Col>
        <Col span={24}>
          <Row>
            <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
              <Form.Item
                label="Mã nhân viên"
                name="CD"
                rules={[{ required: true }]}
              >
                <AutoComplete
                  options={dataOption}
                  onChange={handleSearch}
                  onSelect={onSelect}
                  onClear={() => setEmployeeSelet(undefined)}
                  allowClear
                  disabled={physicalExam ? true : false}
                >
                  <Input />
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
                {errorMessage}
              </span>
            </Col>
            <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
              {physicalExam ? null : (
                <Button type="primary" onClick={isOpenSearchNV}>
                  Tìm kiếm NV
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item label="Họ lót" name="FIRST_NAME">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Tên" name="LAST_NAME">
            <Input disabled />
          </Form.Item>
          <Form.Item name="BOD" label="Ngày tháng năm sinh">
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              disabled
              placeholder={null}
            />
          </Form.Item>
          <Form.Item name="START_WORKING_DATE" label="Ngày vào làm">
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              disabled
              placeholder={null}
            />
          </Form.Item>
          <Form.Item name="GENDER" label="Giới tính">
            <Input disabled />
          </Form.Item>
          <Form.Item name="MARITAL_STATUS_NAME" label="Tình trạng hôn nhân">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="PHYSICAL_DATE"
            label="Ngày khám"
            rules={[{ required: true }]}
          >
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              disabledDate={(current) => current && current > new Date()}
            />
          </Form.Item>
          <Form.Item
            name="MEDICAL_EXAM_YEAR"
            label="Năm khám"
            initialValue={new Date().getFullYear()}
            rules={[{ required: true, }]}
          >
            <Select
              style={{ width: "100%" }}
            >
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
            rules={[{ required: true }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="DEPARTMENT_WORKED_YEAR"
            label="Số năm làm việc"
            rules={[{ required: true }]}
          >
            <Select
              style={{ width: "100%" }}
              options={YearWork}
              allowClear
              showSearch
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
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
      <Row justify="end">
        <Col pull={1}>
          <Form.Item>
            <Button
              htmlType="submit"
              onClick={handleOk}
            >
              Tiếp
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default FrmPersonalInformation;
