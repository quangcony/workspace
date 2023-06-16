import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { selectOptions, yearData } from "../../../../common";
import { useFormik } from "formik";
import { useCountry } from "../../../../hooks/country";
import { useCity } from "../../../../hooks/city";

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
  isRefresh: false,
};

const FrmEmployeeSearch = ({
  departOption,
  positOption,
  areaOption,
  genderOption,
  unitOption,
  maritalOption,
  emplyeeTypeOption,
  setFilterEmployee,
  divisionOption,
  searchFormRef,
  workPlaceOption,
  // medicalFacilityOption,
}) => {
  const [form] = Form.useForm();
  const { countries } = useCountry();
  const { cities } = useCity();
  const [countryOption, setCountryOption] = useState([]);
  const [cityOption, setCityOption] = useState([]);
  const [countryIdSelect, setCountryIdSelect] = useState();

  const formik = useFormik({
    initialValues: initialState,
  });
  const handleSearch = () => {
    if (formik.values.isRefresh) {
      formik.setFieldValue("isRefresh", false);
    } else {
      formik.setFieldValue("isRefresh", true);
    }
    setFilterEmployee(formik.values);
  };

  useEffect(() => {
    if (countries && countries.length > 0) {
      setCountryOption(selectOptions(countries));
    } else {
      setCountryOption([]);
    }

    if (countryIdSelect && cities && cities.length > 0) {
      const newData = cities.filter(
        (city) => city.COUNTRY_ID === countryIdSelect
      );
      setCityOption(selectOptions(newData));
    } else {
      setCityOption([]);
    }
  }, [countryIdSelect, countries, cities]);

  const handleSelectCountry = (value) => {
    setCountryIdSelect(value);
  };
  const handleClearSelectCountry = () => {
    setCountryIdSelect(null);
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
            <Input
              allowClear
              onChange={formik.handleChange}
              name="FIRST_NAME"
              value={formik.values.FIRST_NAME}
            />
          </Form.Item>
          <Form.Item label="Tên" name="LAST_NAME">
            <Input
              allowClear
              onChange={formik.handleChange}
              name="LAST_NAME"
              value={formik.values.LAST_NAME}
            />
          </Form.Item>
          <Form.Item label="Mã số NV" name="CD">
            <Input
              allowClear
              onChange={formik.handleChange}
              name="CD"
              value={formik.values.CD}
            />
          </Form.Item>
          <Form.Item name="GENDER_ID" label="Giới tính">
            <Select
              allowClear
              options={genderOption}
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
                formik.setFieldValue("GENDER_ID", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="BOD" label="Ngày sinh">
            <DatePicker
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                formik.setFieldValue("BOD", date?._d);
              }}
            />
          </Form.Item>
          <Form.Item name="MARITAL_STATUS_ID" label="Tình trạng hôn nhân">
            <Select
              allowClear
              options={maritalOption}
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
                formik.setFieldValue("MARITAL_STATUS_ID", value);
              }}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="COUNTRY_ID" label="Quốc gia">
            <Select
              allowClear
              showSearch
              options={countryOption}
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
                formik.setFieldValue("COUNTRY_ID", value);
              }}
              onSelect={handleSelectCountry}
              onClear={handleClearSelectCountry}
            ></Select>
          </Form.Item>
          <Form.Item name="CITY_ID" label="Tỉnh/Thành làm việc">
            <Select
              allowClear
              options={cityOption}
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
                formik.setFieldValue("CITY_ID", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="BRANCH_ID" label="Nơi làm việc">
            <Select
              allowClear
              options={workPlaceOption}
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
            ></Select>
          </Form.Item>
          <Form.Item name="AREA_ID" label="Khối">
            <Select
              allowClear
              options={areaOption}
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
            ></Select>
          </Form.Item>
          <Form.Item name="DEPT_ID" label="Phong ban">
            <Select
              allowClear
              options={departOption}
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
                formik.setFieldValue("DEPT_ID", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="DIVISION_ID" label="Bộ phận">
            <Select
              allowClear
              options={divisionOption}
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
                formik.setFieldValue("DIVISION_ID", value);
              }}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="UNIT_ID" label="Đơn vị">
            <Select
              allowClear
              options={unitOption}
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
            ></Select>
          </Form.Item>
          <Form.Item name="POSITION_ID" label="Cấp bậc">
            <Select
              allowClear
              options={positOption}
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
                formik.setFieldValue("POSITION_ID", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="EMP_TYPE_ID" label="Loại nhân viên">
            <Select
              allowClear
              options={emplyeeTypeOption}
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
                formik.setFieldValue("EMP_TYPE_ID", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="START_WORKING_DATE-work" label="Ngày vào làm">
            <DatePicker
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                formik.setFieldValue("START_WORKING_DATE", date?._d);
              }}
            />
          </Form.Item>
          <Form.Item name="MEDICAL_EXAM_YEAR" label="Năm khám">
            <Select
              allowClear
              onChange={(value) => {
                formik.setFieldValue("MEDICAL_EXAM_YEAR", Number(value));
              }}
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
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              onChange={(value) => {
                formik.setFieldValue("PHYSICAL_DATE", value);
              }}
            />
          </Form.Item>
          {/* <Form.Item name="MEDICAL_FACILITY_ID" label="Cơ sở khám">
            <Select
              allowClear
              options={medicalFacilityOption}
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
                formik.setFieldValue("MEDICAL_FACILITY_ID", value);
              }}
            ></Select>
          </Form.Item> */}
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
