import { Button, Form, Select, Checkbox, Row, Col, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { removeAccents, yearData } from "../../../../common";
import {
  PlusOutlined,
  SearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  cityIdSelectState,
  cityOptionsState,
  cityState,
} from "../../../../recoil/atom/cityState";
import {
  districtOptionsState,
  districtState,
} from "../../../../recoil/atom/districtState";
import {
  levelMedicalData,
  medicalModelData,
  medicalTypeData,
  technicalData,
  treatmentData,
} from "../../../../common/dataJson";
import { useMedicalFacility } from "../../../../hooks/medicalFacility";
import { medicalFacilityState } from "../../../../recoil/atom/medicalFacilityState";
import { cityData, districtData } from "../../../../common/getAllApi";
import ToolTip from "../../Tooltip";

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

const MedicalFacility = ({ onOpenAddNew, setFilterEmployee, isCreateBtn }) => {
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
            label="Tên cơ sở khám, chữa bệnh"
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
          <Form.Item
            label={
              <span style={{ display: "flex" }}>
                <span style={{ marginRight: 5 }}>Mã BHYT</span>
                <ToolTip
                  description="Là Mã cơ sở khám chữa bệnh ký hợp đồng khám, chữa bệnh BHYT"
                  icon={<InfoCircleOutlined />}
                />
              </span>
            }
            name="SOCIAL_CD"
          >
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
          <Form.Item
            label={
              <span style={{ display: "flex" }}>
                <span style={{ marginRight: 5 }}>Hình thức tổ chức</span>
                <ToolTip
                  description="Cơ sở Khám chữa bệnh là Bệnh viện/ Trung tâm Y tế/ Phòng khám/ …"
                  icon={<InfoCircleOutlined />}
                />
              </span>
            }
            name="MEDICAL_TYPE"
          >
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
          <Form.Item
            label={
              <span style={{ display: "flex" }}>
                <span style={{ marginRight: 5 }}>Mô hình tổ chức</span>
                <ToolTip
                  description="Chuyên khoa của Cơ sở Khám chữa bệnh (Đa khoa/ Chuyên khoa)"
                  icon={<InfoCircleOutlined />}
                />
              </span>
            }
            name="MEDICAL_MODEL"
          >
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
          <Form.Item
            name="DIRECT_INSURANCE"
            label={
              <span style={{ display: "flex" }}>
                <span style={{ marginRight: 5 }}>Thanh toán BHYT</span>
                <ToolTip
                  description="Cơ sở Khám chữa bệnh có chấp nhận thanh toán BHYT"
                  icon={<InfoCircleOutlined />}
                />
              </span>
            }
          >
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
          <Form.Item
            name="TECHNICAL_AREA"
            label={
              <span style={{ display: "flex" }}>
                <span style={{ marginRight: 5 }}>Tuyến kỹ thuật</span>
                <ToolTip
                  description="Phân tuyến của Cơ sở khám chữa bệnh (Trung ương/ Tỉnh/ Huyện/ Xã)"
                  icon={<InfoCircleOutlined />}
                />
              </span>
            }
          >
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
          <Form.Item
            name="TREATMENT_TYPE"
            label={
              <span style={{ display: "flex" }}>
                <span style={{ marginRight: 5 }}>Hình thức điều trị</span>
                <ToolTip
                  description="Cơ sở Khám chữa bệnh có điều trị Nội trú/ Ngoại trú/ Nội trú và Ngoại trú"
                  icon={<InfoCircleOutlined />}
                />
              </span>
            }
          >
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
          <Form.Item
            name="LEVEL"
            label={
              <span style={{ display: "flex" }}>
                <span style={{ marginRight: 5 }}>Hạng bệnh viện</span>
                <ToolTip
                  description="Là phân loại xếp Hạng của Cơ sở Khám chữa bệnh"
                  icon={<InfoCircleOutlined />}
                />
              </span>
            }
          >
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
            disabled={isCreateBtn}
          >
            Thêm mới{" "}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default MedicalFacility;
