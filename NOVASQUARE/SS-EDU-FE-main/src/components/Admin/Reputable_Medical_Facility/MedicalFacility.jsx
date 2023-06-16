import { Button, Form, Select, Checkbox, Row, Col, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { removeAccents, yearData } from "../../../common";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  cityIdSelectState,
  cityOptionsState,
  cityState,
} from "../../../recoil/atom/cityState";
import {
  districtOptionsState,
  districtState,
} from "../../../recoil/atom/districtState";
import {
  levelMedicalData,
  medicalModelData,
  medicalTypeData,
  technicalData,
  treatmentData,
} from "../../../common/dataJson";
import { useMedicalFacility } from "../../../hooks/medicalFacility";
import { medicalFacilityState } from "../../../recoil/atom/medicalFacilityState";
import { cityData, districtData } from "../../../common/getAllApi";

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
  NAME: "",
  SOCIAL_CD: undefined,
  CITY_ID: undefined,
  DISTRICT_ID: undefined,
  MEDICAL_TYPE: undefined,
  TECHNICAL_AREA: undefined,
  LEVEL: undefined,
  MEDICAL_MODEL: undefined,
  TREATMENT_TYPE: undefined,
  DIRECT_INSURANCE: "",
  isRefresh: false,
};

const selectOptions = (array) => {
  const list = [];
  for (let item of array) {
    list.push({
      value: Number(item.SOCIAL_CD),
      label: item.SOCIAL_CD,
      key: item.id,
    });
  }
  return list;
};

const plainOptions = ["Có", "Không"];
const CheckboxGroup = Checkbox.Group;

const MedicalFacility = ({ onOpenAddNew, setFilterEmployee }) => {
  const [form] = Form.useForm();
  useMedicalFacility();
  const cityOptions = useRecoilValue(cityOptionsState);
  const districtOptions = useRecoilValue(districtOptionsState);
  const setCityList = useSetRecoilState(cityState);
  const setDistrictList = useSetRecoilState(districtState);

  const [cityIdSelect, setCityIdSelect] = useRecoilState(cityIdSelectState);
  const medicalFacilities = useRecoilValue(medicalFacilityState);

  const formik = useFormik({
    initialValues: initialState,
  });

  const [dataOption, setDataOption] = useState([]);

  useEffect(() => {
    if (medicalFacilities && medicalFacilities.length > 0) {
      const dataList = selectOptions(medicalFacilities);
      setDataOption(dataList.filter((item) => item?.value > 0));
    } else {
      setDataOption([]);
    }
  }, [medicalFacilities]);

  const handleSearch = () => {
    if (formik.values.isRefresh) {
      formik.setFieldValue("isRefresh", false);
    } else {
      formik.setFieldValue("isRefresh", true);
    }
    setFilterEmployee(formik.values);
  };

  const handleSelectCity = (value) => {
    setCityIdSelect(value);
  };
  const handleClearSelectCity = () => {
    setCityIdSelect(undefined);
    form.setFieldsValue({ DISTRICT_ID: undefined });
    formik.setFieldValue("DISTRICT_ID", undefined);
  };

  const [checkedList, setCheckedList] = useState("");
  const handleChange = (list) => {
    console.log(list);
    setCheckedList(list);
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
        <Col span={14}>
          <Form.Item
            label="Tên bệnh viện/ chuyên khoa/ cơ sở khám, chữa bệnh"
            name="NAME"
            labelCol={{ span: 12 }}
          >
            <Input
              allowClear
              name="NAME"
              onChange={formik.handleChange}
              value={formik.values.NAME}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item label="Mã BHYT" name="SOCIAL_CD">
            <Select
              allowClear
              options={dataOption}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) => optionA?.value - optionB?.value}
              onChange={(value) => {
                formik.setFieldValue("SOCIAL_CD", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item label="Hình thức tổ chức" name="MEDICAL_TYPE">
            <Select
              allowClear
              options={medicalTypeData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("MEDICAL_TYPE", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item label="Mô hình tổ chức" name="MEDICAL_MODEL">
            <Select
              allowClear
              options={medicalModelData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("MEDICAL_MODEL", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="DIRECT_INSURANCE" label="Thanh toán BHYT">
            <CheckboxGroup
              options={plainOptions}
              name="DIRECT_INSURANCE"
              onChange={(value) => {
                let convert;
                if (value[0] === "Có" && value[1] === "Không") {
                  convert = "";
                } else if (value[0] === "Có") {
                  convert = "true";
                } else if (value[0] === "Không") {
                  convert = "false";
                } else {
                  convert = "";
                }
                formik.setFieldValue("DIRECT_INSURANCE", convert);
              }}
            />
          </Form.Item>
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item name="CITY_ID" label="Tỉnh/Thành phố">
            <Select
              allowClear
              options={cityOptions}
              showSearch
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
              onChange={(value) => {
                formik.setFieldValue("CITY_ID", value);
              }}
              onSelect={handleSelectCity}
              onClear={handleClearSelectCity}
              onFocus={() => cityData(cityOptions, setCityList)}
            ></Select>
          </Form.Item>
          <Form.Item name="TECHNICAL_AREA" label="Tuyến kỹ thuật">
            <Select
              allowClear
              options={technicalData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("TECHNICAL_AREA", value);
              }}
            ></Select>
          </Form.Item>
          <Form.Item name="TREATMENT_TYPE" label="Hình thức điều trị">
            <Select
              allowClear
              options={treatmentData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("TREATMENT_TYPE", value);
              }}
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item name="DISTRICT_ID" label="Quận/Huyện">
            <Select
              allowClear
              options={districtOptions}
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
              onChange={(value) => {
                formik.setFieldValue("DISTRICT_ID", value);
              }}
              disabled={cityIdSelect ? false : true}
              onFocus={() => districtData(districtOptions, setDistrictList)}
            ></Select>
          </Form.Item>
          <Form.Item name="LEVEL" label="Hạng bệnh viện">
            <Select
              allowClear
              options={levelMedicalData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={(value) => {
                formik.setFieldValue("LEVEL", value);
              }}
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
export default MedicalFacility;
