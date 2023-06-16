import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Input, Row, Select, Form } from "antd";
import { useFormik } from "formik";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { formatDate, removeAccents } from "../../../common";
import {
  areaData,
  cityData,
  departmentData,
  divisionData,
  employeeContractTypeData,
  genderData,
  maritalStatusData,
  positionData,
  unitData,
  workPlaceData,
} from "../../../common/getAllApi";
import { areaOptionsState, areaState } from "../../../recoil/atom/areaState";
import { cityOptionsState, cityState } from "../../../recoil/atom/cityState";
import {
  departmentOptionsState,
  departmentState,
} from "../../../recoil/atom/departmentState";
import {
  divisionOptionsState,
  divisionState,
} from "../../../recoil/atom/divisionState";
import { employeeState } from "../../../recoil/atom/employeeState";
import {
  employeeTypeOptionsState,
  employeeTypeState,
} from "../../../recoil/atom/employeeTypeState";
import {
  genderOptionsState,
  genderState,
} from "../../../recoil/atom/genderState";
import {
  maritalOptionsState,
  maritalState,
} from "../../../recoil/atom/maritalState";
import {
  positionOptionsState,
  positionState,
} from "../../../recoil/atom/positionState";
import { unitOptionsState, unitState } from "../../../recoil/atom/unitState";
import {
  workPlaceOptionsState,
  workPlacesState,
} from "../../../recoil/atom/workPlaceState";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 12,
  },
};

//
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
  WORKYEAR: undefined,
  WORKMOTH: undefined,
  WORKDAY: undefined,
  isRefresh: false,
};

const SalaryCalculationSearch = ({
  onOpenAddNew,
  setFilterEmployee,
  setSelectedRowKeys,
  setEmployeeSelect,
}) => {
  const [form] = Form.useForm();

  const cityOptions = useRecoilValue(cityOptionsState);
  const workPlaceOptions = useRecoilValue(workPlaceOptionsState);
  const unitOptions = useRecoilValue(unitOptionsState);
  const areaOptions = useRecoilValue(areaOptionsState);
  const divisionOptions = useRecoilValue(divisionOptionsState);
  const maritalOptions = useRecoilValue(maritalOptionsState);
  const positOptions = useRecoilValue(positionOptionsState);
  const departOptions = useRecoilValue(departmentOptionsState);
  const genderOptions = useRecoilValue(genderOptionsState);
  const emplyeeTypeOptions = useRecoilValue(employeeTypeOptionsState);
  const employees = useRecoilValue(employeeState);
  const setGenderList = useSetRecoilState(genderState);
  const setMaritalList = useSetRecoilState(maritalState);
  const setAreaList = useSetRecoilState(areaState);
  const setDepartmentList = useSetRecoilState(departmentState);
  const setPositionList = useSetRecoilState(positionState);
  const setUnitList = useSetRecoilState(unitState);
  const setDivisionList = useSetRecoilState(divisionState);
  const setEmployeeTypeList = useSetRecoilState(employeeTypeState);
  const setWorkPlaceList = useSetRecoilState(workPlacesState);
  const setCityList = useSetRecoilState(cityState);
  const formik = useFormik({
    initialValues: initialState,
  });
  const handleSearch = () => {
    if (formik.values.isRefresh) {
      formik.setFieldValue("isRefresh", false);
    } else {
      formik.setFieldValue("isRefresh", true);
    }
    setSelectedRowKeys([]);
    setEmployeeSelect([]);
    setFilterEmployee(formik.values);
  };
  return (
    <Form
      // {...layout}
      labelCol={{ span: 10 }}
      form={form}
      name="control-hooks"
      labelAlign="left"
    >
      <Row gutter={24}>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <Form.Item label="Họ" name="FIRST_NAME">
            <Input
              onChange={formik.handleChange}
              name="FIRST_NAME"
              value={formik.values.FIRST_NAME}
            />
          </Form.Item>
          <Form.Item label="Tên" name="LAST_NAME">
            <Input
              onChange={formik.handleChange}
              name="LAST_NAME"
              value={formik.values.LAST_NAME}
            />
          </Form.Item>
          <Form.Item label="Mã số NV" name="CD">
            <Input
              style={{ marginRight: 20 }}
              onChange={formik.handleChange}
              name="CD"
              value={formik.values.CD}
            />
          </Form.Item>
          <Form.Item name="BOD" label="Ngày sinh">
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                formik.setFieldValue("BOD", date?._d);
              }}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
            />
          </Form.Item>
          <Form.Item name="START_WORKING_DATE" label="Ngày vào làm">
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                formik.setFieldValue("START_WORKING_DATE", date?._d);
              }}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <Form.Item name="CITY_ID" label="Tỉnh/Thành làm việc">
            <Select
              allowClear
              options={cityOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("CITY_ID", value);
              }}
              onFocus={() => cityData(cityOptions, setCityList)}
            ></Select>
          </Form.Item>
          <Form.Item name="BRANCH_ID" label="Nơi làm việc">
            <Select
              allowClear
              options={workPlaceOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onChange={(value) => {
                formik.setFieldValue("BRANCH_ID", value);
              }}
              onFocus={() => workPlaceData(workPlaceOptions, setWorkPlaceList)}
            ></Select>
          </Form.Item>
          <Form.Item name="AREA_ID" label="Khối">
            <Select
              allowClear
              options={areaOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onChange={(value) => {
                formik.setFieldValue("AREA_ID", value);
              }}
              onFocus={() => areaData(areaOptions, setAreaList)}
            ></Select>
          </Form.Item>
          <Form.Item name="DEPT_ID" label="Phòng ban">
            <Select
              allowClear
              options={departOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("DEPT_ID", value);
              }}
              onFocus={() => departmentData(departOptions, setDepartmentList)}
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <Form.Item name="DIVISION_ID" label="Bộ phận">
            <Select
              allowClear
              options={divisionOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("DIVISION_ID", value);
              }}
              onFocus={() => divisionData(divisionOptions, setDivisionList)}
            ></Select>
          </Form.Item>
          <Form.Item name="UNIT_ID" label="Đơn vị">
            <Select
              allowClear
              options={unitOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onChange={(value) => {
                formik.setFieldValue("UNIT_ID", value);
              }}
              onFocus={() => unitData(unitOptions, setUnitList)}
            ></Select>
          </Form.Item>
          <Form.Item name="POSITION_ID" label="Cấp bậc">
            <Select
              allowClear
              options={positOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("POSITION_ID", value);
              }}
              onFocus={() => positionData(positOptions, setPositionList)}
            ></Select>
          </Form.Item>
          <Form.Item name="EMP_TYPE_ID" label="Loại nhân viên">
            <Select
              allowClear
              options={emplyeeTypeOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.trim().toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("EMP_TYPE_ID", value);
              }}
              onFocus={() =>
                employeeContractTypeData(
                  emplyeeTypeOptions,
                  setEmployeeTypeList
                )
              }
            ></Select>
          </Form.Item>
          <Form.Item name="GENDER" label="Giới tính">
            <Select
              allowClear
              options={genderOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.trim().toLowerCase()))
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onFocus={() => genderData(genderOptions, setGenderList)}
              onChange={(value) => {
                formik.setFieldValue("GENDER", Number(value));
              }}
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <Form.Item name="MARITAL_STATUS_ID" label="TT hôn nhân">
            <Select
              allowClear
              options={maritalOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("MARITAL_STATUS_ID", value);
              }}
              onFocus={() => maritalStatusData(maritalOptions, setMaritalList)}
            ></Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={13} offset={10}>
          <Button
            type="primary"
            onClick={() => handleSearch()}
            style={{ width: 150 }}
          >
            <SearchOutlined style={{ fontSize: 18 }} />
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default SalaryCalculationSearch;
