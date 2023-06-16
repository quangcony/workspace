import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { selectOptions, yearData, formatDate } from "../../../../common";
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

const FrmEmployeeSearch = ({
  departOption,
  positOption,
  genderOption,
  unitOption,
  setFilterEmployee,
  divisionOption,
  searchFormRef,
  initialState,
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
          
        </Col>
        <Col span={8}>
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
          <Form.Item name="DEPT_ID" label="Phòng ban">
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
