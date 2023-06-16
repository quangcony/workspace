import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { selectOptions, yearData, formatDate } from "../../../../common";
import { useCity } from "../../../../hooks/city";
import { useCountry } from "../../../../hooks/country";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cityOptionsState, cityState } from "../../../../recoil/atom/cityState";

import {
  workPlaceOptionsState,
  workPlacesState,
} from "../../../../recoil/atom/workPlaceState";
import { unitOptionsState, unitState } from "../../../../recoil/atom/unitState";
import { areaOptionsState, areaState } from "../../../../recoil/atom/areaState";
import {
  divisionOptionsState,
  divisionState,
} from "../../../../recoil/atom/divisionState";
import {
  maritalOptionsState,
  maritalState,
} from "../../../../recoil/atom/maritalState";
import {
  positionOptionsState,
  positionState,
} from "../../../../recoil/atom/positionState";
import {
  departmentOptionsState,
  departmentState,
} from "../../../../recoil/atom/departmentState";
import {
  genderOptionsState,
  genderState,
} from "../../../../recoil/atom/genderState";
import {
  employeeTypeOptionsState,
  employeeTypeState,
} from "../../../../recoil/atom/employeeTypeState";
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
} from "../../../../common/getAllApi";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 11,
    span: 16,
  },
};

const FrmEmployeeSearch = ({ setFilterEmployee, searchFormRef }) => {
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

  const handleSearch = () => {
    const data = { ...form.getFieldsValue() };
    setFilterEmployee(data);
  };

  return (
    <Form
      {...layout}
      form={form}
      ref={searchFormRef}
      name="search-employee"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
    >
      <Row>
        <Col span={8}>
          <Form.Item label="Họ lót" name="FIRST_NAME">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="Tên" name="LAST_NAME">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="Mã số NV" name="CD">
            <Input allowClear />
          </Form.Item>
          <Form.Item name="GENDER_ID" label="Giới tính">
            <Select
              allowClear
              options={genderOptions}
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
              onFocus={() => genderData(genderOptions, setGenderList)}
            ></Select>
          </Form.Item>
          <Form.Item name="BOD" label="Ngày sinh">
            <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="MARITAL_STATUS_ID" label="Tình trạng hôn nhân">
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
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onFocus={() => maritalStatusData(maritalOptions, setMaritalList)}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8}>
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
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
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
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
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
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onFocus={() => divisionData(divisionOptions, setDivisionList)}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8}>
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
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
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
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onFocus={() =>
                employeeContractTypeData(
                  emplyeeTypeOptions,
                  setEmployeeTypeList
                )
              }
            ></Select>
          </Form.Item>
          <Form.Item name="START_WORKING_DATE" label="Ngày vào làm">
            <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="MEDICAL_EXAM_YEAR" label="Năm khám">
            <Select allowClear>
              {yearData &&
                yearData.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="PHYSICAL_DATE" label="Ngày khám">
            <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={handleSearch}>
          <SearchOutlined style={{ fontSize: 18 }} />
          Tìm kiếm
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FrmEmployeeSearch;
