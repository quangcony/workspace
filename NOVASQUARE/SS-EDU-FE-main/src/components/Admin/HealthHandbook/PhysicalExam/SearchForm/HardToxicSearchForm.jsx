import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  areaOptionsState,
  areaState,
} from "../../../../../recoil/atom/areaState";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import moduleApi from "../../../../../api/moduleApi";
import {
  formatDate,
  removeAccents,
  WorkNumberDay,
  WorkNumberMonth,
  WorkNumberYear,
  yearData,
} from "../../../../../common";
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
} from "../../../../../common/getAllApi";
import Permissions_CD from "../../../../../data_json/Permissions_CD.json";
import {
  cityOptionsState,
  cityState,
} from "../../../../../recoil/atom/cityState";
import {
  departmentOptionsState,
  departmentState,
} from "../../../../../recoil/atom/departmentState";
import {
  divisionOptionsState,
  divisionState,
} from "../../../../../recoil/atom/divisionState";
import {
  employeeTypeOptionsState,
  employeeTypeState,
} from "../../../../../recoil/atom/employeeTypeState";
import {
  genderOptionsState,
  genderState,
} from "../../../../../recoil/atom/genderState";
import { generalState } from "../../../../../recoil/atom/generalState";
import {
  maritalOptionsState,
  maritalState,
} from "../../../../../recoil/atom/maritalState";
import {
  positionOptionsState,
  positionState,
} from "../../../../../recoil/atom/positionState";
import {
  unitOptionsState,
  unitState,
} from "../../../../../recoil/atom/unitState";
import {
  workPlaceOptionsState,
  workPlacesState,
} from "../../../../../recoil/atom/workPlaceState";
import { findExistance } from "../../../../../utils/findExistance";

const { Option } = Select;

//
const initialState = {
  FULL_NAME: "",
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

const HardToxicSearchForm = ({ onOpenAddNew, setFilterEmployee }) => {
  const [form] = Form.useForm();
  const history = useHistory();

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
  const { moduleSelected } = useRecoilValue(generalState);

  const NumberYear = WorkNumberYear();
  const NumberMonth = WorkNumberMonth();
  const NumberDay = WorkNumberDay();
  const formik = useFormik({
    initialValues: initialState,
  });

  const [permissionsCD, setPermissionsCD] = useState();

  const handleSearch = () => {
    if (formik.values.isRefresh) {
      formik.setFieldValue("isRefresh", false);
    } else {
      formik.setFieldValue("isRefresh", true);
    }
    setFilterEmployee(formik.values);
  };

  useEffect(() => {
    //get permissions of current user to page
    (async () => {
      const response = await moduleApi.getPermissionsByModuleId(
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
  }, []);

  return (
    <Form
      // {...layout}
      labelCol={{ span: 10 }}
      form={form}
      name="control-hooks"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
    >
      <Row gutter={24}>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <Form.Item label="Họ và tên" name="FULL_NAME">
            <Input
              onChange={formik.handleChange}
              name="FULL_NAME"
              value={formik.values.FULL_NAME}
              allowClear
            />
          </Form.Item>

          <Form.Item label="Mã số NV" name="CD">
            <Input
              style={{ marginRight: 20 }}
              onChange={formik.handleChange}
              name="CD"
              value={formik.values.CD}
              allowClear
            />
          </Form.Item>
          <Form.Item name="BOD" label={<>Ngày tháng năm sinh</>}>
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
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
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
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <Form.Item name="MEDICAL_EXAM_YEAR" label="Năm khám">
            <Select
              style={{ width: "100%" }}
              onChange={(value) => {
                formik.setFieldValue("MEDICAL_EXAM_YEAR", Number(value));
              }}
              allowClear
            >
              {yearData &&
                yearData.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="PHYSICAL_DATE" label="Ngày khám">
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              onChange={(value) => {
                formik.setFieldValue("PHYSICAL_DATE", value);
              }}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
            />
          </Form.Item>
          <Form.Item name="MEDICAL_FACILITY_ID" label="Cơ sở khám">
            {/* <Select
              allowClear
              options={medicalFacilityOption}
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
                formik.setFieldValue("MEDICAL_FACILITY_ID", value);
              }}
            ></Select> */}
            <Input
              onChange={formik.handleChange}
              name="MEDICAL_FACILITY_NAME"
              value={formik.values.MEDICAL_FACILITY_NAME}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
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
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
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
        </Col>
        <Col xl={12} lg={12} md={24} sm={24} xs={24}>
          <Row gutter={24}>
            <Col md={5} xs={24}>
              <span>Số năm làm việc thực tế: </span>
            </Col>
            <Col md={6} xs={8} style={{ marginLeft: -10 }}>
              <Row gutter={12}>
                <Col span={14}>
                  <Form.Item name="WORKYEAR">
                    <Select
                      style={{ width: "100%" }}
                      allowClear
                      options={NumberYear}
                      showSearch
                      onChange={(value) => {
                        formik.setFieldValue("WORKYEAR", value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <p style={{ paddingTop: 5 }}>Năm</p>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={8}>
              <Row gutter={12}>
                <Col span={14}>
                  <Form.Item name="WORKMONTH">
                    <Select
                      allowClear
                      options={NumberMonth}
                      showSearch
                      onChange={(value) => {
                        formik.setFieldValue("WORKMONTH", value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <p style={{ paddingTop: 5 }}>Tháng</p>
                </Col>
              </Row>
            </Col>
            <Col md={6} xs={8}>
              <Row gutter={12}>
                <Col span={14}>
                  <Form.Item name="WORKDAY">
                    <Select
                      allowClear
                      options={NumberDay}
                      showSearch
                      onChange={(value) => {
                        formik.setFieldValue("WORKDAY", value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <p style={{ paddingTop: 5 }}>Ngày</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={11} offset={10}>
          <Button
            type="primary"
            onClick={() => handleSearch()}
            style={{ width: 150 }}
          >
            <SearchOutlined style={{ fontSize: 18 }} />
            Tìm kiếm
          </Button>
        </Col>
        <Col span={3}>
          <Button
            onClick={() => onOpenAddNew()}
            title="Create"
            type="primary"
            style={{
              display: "block",
              width: "100%",
            }}
            icon={<PlusOutlined />}
            disabled={!findExistance(permissionsCD, Permissions_CD.create)}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default HardToxicSearchForm;
