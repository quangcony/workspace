import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import React from "react";
import { useFormik } from "formik";
import {healthResultRecruitmentData,
  healthStatusRecruitmentData } from "../../../../common/dataJson";
import { formatDate } from "../../../../common";
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
  RESULT: undefined,
  STATUS: "",
  CD: "",
  BOD: undefined,
  DEPT_ID: undefined,
  DIVISION_ID: undefined, // dont exist key DIVISION_ID in employee api, need edit employees table
  UNIT_ID: undefined,
  POSITION_ID: undefined,
  GENDER_ID: undefined,
  PHYSICAL_CLASSIFY_ID: undefined,
  PHYSICAL_DATE: undefined,
  isRefresh: false,
};

const FrmSearchResult = ({
  onOpenAddNew,
  positOption,
  departOption,
  genderOption,
  unitOption,
  setFilterEmployee,
  divisionOption,
  classificationOption,
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
    console.log("formik.values: ", formik.values);
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
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item name="STATUS" label="Trạng thái">
            <Select
              allowClear
              // autoClearSearchValue
              // showSearch
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
                formik.setFieldValue("STATUS", String(value));
                if (value === undefined) {
                  formik.setFieldValue("STATUS", "");
                }
                if (value === 0) {
                  formik.setFieldValue("STATUS", "0");
                }
              }}
              options={healthStatusRecruitmentData}
            >
            </Select>
          </Form.Item>
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item name="RESULT" label="Kết luận">
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
                formik.setFieldValue("RESULT", value);
              }}
              options={healthResultRecruitmentData}
            >
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item label="Họ" name="FIRST_NAME">
            <Input
              onChange={formik.handleChange}
              name="FIRST_NAME"
              value={formik.values.FIRST_NAME}
              allowClear
            />
          </Form.Item>
          <Form.Item label="Tên" name="LAST_NAME">
            <Input
              onChange={formik.handleChange}
              name="LAST_NAME"
              value={formik.values.LAST_NAME}
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
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item name="GENDER_ID" label="Giới tính">
            <Select
              allowClear
              options={genderOption}
              onClear={() => formik.setFieldValue("GENDER_ID", "")}
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
                // let convertGender;
                // if (value === 1) convertGender = "male";
                // else if (value === 2) convertGender = "female";
                // else if (value === 3) convertGender = "undefined";
                // else if (value === 5) convertGender = "other";
                // else return "";
                formik.setFieldValue("GENDER_ID", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="PHYSICAL_CLASSIFY_ID" label="Phân loại">
            <Select
              allowClear
              showSearch
              // filterOption={(input, option) =>
              //   (option?.label ?? "")
              //     .toLowerCase()
              //     .includes(input.toLowerCase())
              // }
              // filterSort={(optionA, optionB) =>
              //   (optionA?.label ?? "")
              //     .toLowerCase()
              //     .localeCompare((optionB?.label ?? "").toLowerCase())
              // }
              // onSelect={onSelectCountry}
              // onClear={onClearCountry}
              onChange={(value) => {
                formik.setFieldValue("PHYSICAL_CLASSIFY_ID", value);
              }}
              options={classificationOption}
            >
            </Select>
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
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
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
