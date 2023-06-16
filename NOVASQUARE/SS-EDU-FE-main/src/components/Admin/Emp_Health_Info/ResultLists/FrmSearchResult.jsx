import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import React from "react";
import { useFormik } from "formik";
import { yearData } from "../../../../common";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

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
  isRefresh: false,
};

const FrmSearchResult = ({
  onOpenAddNew,
  countryOption,
  cityOption,
  positOption,
  departOption,
  genderOption,
  areaOption,
  unitOption,
  maritalOption,
  emplyeeTypeOption,
  setFilterEmployee,
  divisionOption,
  workPlaceOption,
  medicalFacilityOption,
  onSelectCountry,
  onClearCountry,
}) => {
  const [form] = Form.useForm();

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

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
    >
      <Row>
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
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                formik.setFieldValue("BOD", date?._d);
              }}
            />
          </Form.Item>
          <Form.Item name="START_WORKING_DATE" label="Ngày vào làm">
            <DatePicker
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              onChange={(date, dateString) => {
                formik.setFieldValue("START_WORKING_DATE", date?._d);
              }}
            />
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <Form.Item name="COUNTRY_ID" label="Quốc gia">
            <Select
              allowClear
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
              onSelect={onSelectCountry}
              onClear={onClearCountry}
              onChange={(value) => {
                formik.setFieldValue("COUNTRY_ID", value);
              }}
            >
              {countryOption &&
                countryOption.map((item) => (
                  <Select.Option value={item.value} style={{ width: "200%" }}>
                    {item.label}
                  </Select.Option>
                ))}
            </Select>
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
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
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
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("DEPT_ID", value);
              }}
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
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
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("DIVISION_ID", value);
              }}
            ></Select>
          </Form.Item>
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
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
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
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("EMP_TYPE_ID", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="GENDER" label="Giới tính">
            <Select
              allowClear
              options={genderOption}
              onClear={() => formik.setFieldValue("GENDER", "")}
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
                let convertGender;
                if (value === 1) convertGender = "male";
                else if (value === 2) convertGender = "female";
                else if (value === 3) convertGender = "undefined";
                else if (value === 5) convertGender = "other";
                else return "";
                formik.setFieldValue("GENDER", convertGender);
              }}
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <Form.Item name="MARITAL_STATUS_ID" label="TT hôn nhân">
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
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("MARITAL_STATUS_ID", value);
              }}
            ></Select>
          </Form.Item>
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
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              onChange={(value) => {
                formik.setFieldValue("PHYSICAL_DATE", value);
              }}
            />
          </Form.Item>
          <Form.Item name="MEDICAL_FACILITY_ID" label="Cơ sở khám">
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
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("MEDICAL_FACILITY_ID", value);
              }}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      {/* <Row>
        <Col span={12}>
          <Form.Item name="THAM_NIEN" label="Thâm niên" labelCol={{ span: 5 }}>
            <Space>
              <Select
                allowClear
                onChange={(value) => {
                  formik.setFieldValue("THAM_NIEN", value);
                }}
              >
                <Option value="2022">2022</Option>
                <Option value="2021">2021</Option>
                <Option value="2020">2020</Option>
              </Select>
              năm
            </Space>
          </Form.Item>
        </Col>
      </Row> */}
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
        <Col span={1}>
          {/* <Button type="primary" onClick={() => onOpenAddNew()}>
                  Thêm mới
                </Button> */}
          <Button
            onClick={() => onOpenAddNew()}
            title="Create"
            type="primary"
            style={{
              display: "block",
            }}
            icon={<PlusOutlined />}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default FrmSearchResult;
