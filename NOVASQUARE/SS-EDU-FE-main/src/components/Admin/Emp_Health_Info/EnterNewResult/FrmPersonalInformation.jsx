import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  AutoComplete,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSearch } from "react-use-search";
import { yearData, removeAccents, selectOptions } from "../../../../common";
import moment from "moment";
import { useRecoilValue } from "recoil";
import { authState } from "../../../../recoil/atom/authState";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
};

const validateMessages = {
  required: "Trường này không được để trống!",
};

const predicate = (datas, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const CD = removeAccents(String(datas.CD)).toLowerCase().trim();
  return CD.includes(newQuery);
};

const FrmPersonalInformation = ({
  isOpenSearchNV,
  getNewData,
  onKeyChange,
  setAddNewId,
  addNewId,
  // medicalFacilityOption,
  datas,
  onCreatePhysicalExam,
  userId,
  setUserId,
  FrmPersionalInfoRef,
  countries,
  cities,
  medicalFacilities,
  onUpdatePhysicalExam,
  processing,
}) => {
  const [form] = Form.useForm();
  const { profile } = useRecoilValue(authState);
  const [dataOption, setDataOption] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [medicalFacilityOption, setMedicalFacilityOption] = useState([]);
  const [countryIdSelect, setCountryIdSelect] = useState();
  const [cityIdSelect, setCityIdSelect] = useState();

  //get country and city
  useEffect(() => {
    if (countries && countries.length > 0) {
      setCountryOptions(selectOptions(countries));
    } else setCountryOptions([]);
    if (countryIdSelect) {
      const cities = countries.filter(
        (country) => country.id === countryIdSelect
      )[0].Cities;
      setCityOptions(selectOptions(cities));
    } else setCityOptions([]);
  }, [countries, cities, countryIdSelect, cityIdSelect]);

  //get medicalFacility by country and city
  useEffect(() => {
    if (medicalFacilities && medicalFacilities.length > 0) {
      if (countryIdSelect) {
        const list = medicalFacilities.filter(
          (item) => item?.COUNTRY_ID === countryIdSelect
        );
        if (cityIdSelect) {
          const newData = list.filter((item) => item?.CITY_ID === cityIdSelect);
          setMedicalFacilityOption(selectOptions(newData));
        } else setMedicalFacilityOption(selectOptions([]));
      } else setMedicalFacilityOption([]);
    } else setMedicalFacilityOption([]);
  }, [medicalFacilities, countryIdSelect, cityIdSelect]);

  const handleSelectCountry = (value) => {
    setCountryIdSelect(value);
  };
  const handleClearSelectCountry = () => {
    setCountryIdSelect(null);
    form.setFieldsValue({ CITY_ID: null });
    form.setFieldsValue({ MEDICAL_FACILITY_ID: null });
  };
  const handleSelectCity = (value) => {
    setCityIdSelect(value);
  };
  const handleClearSelectCity = () => {
    setCityIdSelect(null);
    form.setFieldsValue({ MEDICAL_FACILITY_ID: null });
  };

  const onFinish = (fieldsValue) => {
    const values = {
      USER_ID: userId?.USER_ID,
      INPUT_DATE: new Date(),
      MEDICAL_VISIT_NUMBER: 1,
      MEDICAL_EXAM_YEAR: Number(fieldsValue.MEDICAL_EXAM_YEAR),
      PHYSICAL_DATE: fieldsValue.PHYSICAL_DATE,
      MEDICAL_FACILITY_ID: fieldsValue.MEDICAL_FACILITY_ID,
      USER_ID_INPUT: profile?.id,
      WORKING_STATUS_ID: processing[0].id,
    };
    getNewData(fieldsValue);
    onKeyChange("2");
    handleCreate(values);
  };
  const handleCreate = async (value) => {
    console.log("physicalExam:", value);
    await onCreatePhysicalExam(value);
  };
  const [filteredDatas, query, handleChange, setQuery] = useSearch(
    datas,
    predicate,
    { debounce: 200 }
  );

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
    setUserId(option);
  };

  useEffect(() => {
    if (userId) {
      form.setFieldsValue({
        ...userId,
        BOD: moment(userId?.BOD),
        START_WORKING_DATE: moment(userId?.START_WORKING_DATE),
        PHYSICAL_DATE: "",
        COUNTRY_ID: null,
        CITY_ID: null,
        MEDICAL_EXAM_YEAR: new Date().getFullYear(),
        GENDER: userId?.Gender?.NAME,
        EMP_TYPE_NAME: userId?.Employee_Contract_Type?.EMPLOYEE_CONTRACT_NAME,
      });
    } else {
      form.resetFields();
    }
  }, [userId]);
  useEffect(() => {
    if (addNewId) {
      form.setFieldsValue({
        ...addNewId,
        BOD: moment(addNewId?.BOD),
        START_WORKING_DATE: moment(addNewId?.START_WORKING_DATE),
        PHYSICAL_DATE: "",
        COUNTRY_ID: null,
        CITY_ID: null,
        MEDICAL_EXAM_YEAR: new Date().getFullYear(),
        GENDER: addNewId.Gender?.NAME,
        EMP_TYPE_NAME: addNewId?.Employee_Contract_Type.EMPLOYEE_CONTRACT_NAME,
        MEDICAL_FACILITY_ID: "",
      });
    } else {
      form.resetFields();
    }
  }, [addNewId]);

  const handleClear = () => {
    setUserId("");
    setAddNewId("");
  };
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ margin: "30px 0px" }}
      labelAlign="left"
      validateMessages={validateMessages}
      ref={FrmPersionalInfoRef}
    >
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item
            label="Mã nhân viên"
            name="CD"
            rules={[{ required: true }]}
          >
            <AutoComplete
              options={dataOption}
              onChange={handleChange}
              onSelect={onSelect}
              onClear={handleClear}
              allowClear
            >
              <Input />
            </AutoComplete>
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={10} offset={2}>
          {!addNewId ? (
            <Button type="primary" onClick={isOpenSearchNV}>
              Tìm kiếm NV
            </Button>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item
            label="Họ lót"
            name="FIRST_NAME"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="Tên" name="LAST_NAME" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="BOD" label="Ngày sinh" rules={[{ required: true }]}>
            <DatePicker
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              disabled
              placeholder={false}
            />
          </Form.Item>
          <Form.Item
            name="START_WORKING_DATE"
            label="Ngày làm việc"
            rules={[{ required: true }]}
          >
            <DatePicker
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
              disabled
              placeholder={false}
            />
          </Form.Item>
          <Form.Item
            name="GENDER"
            label="Giới tính"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="MARITAL_STATUS_NAME"
            label="Tình trạng hôn nhân"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="PHYSICAL_DATE"
            label="Ngày khám"
            rules={[{ required: true }]}
          >
            <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="MEDICAL_EXAM_YEAR"
            label="Năm khám"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue={new Date().getFullYear()}
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
            name="COUNTRY_ID"
            label="Quốc gia"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              allowClear
              options={countryOptions}
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
              onSelect={handleSelectCountry}
              onClear={handleClearSelectCountry}
            ></Select>
          </Form.Item>
          <Form.Item
            name="CITY_ID"
            label="Thành phố"
            rules={[
              {
                required: true,
              },
            ]}
          >
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
              onSelect={handleSelectCity}
              onClear={handleClearSelectCity}
            ></Select>
          </Form.Item>
          <Form.Item
            name="MEDICAL_FACILITY_ID"
            label="Cơ sở khám"
            rules={[
              {
                required: true,
              },
            ]}
          >
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
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item
            name="BRANCH_NAME"
            label="Nơi làm việc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="CITY_NAME"
            label="Tỉnh/Thành làm việc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="DEPARTMENT_NAME"
            label="Phòng ban"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="DIVISION_NAME"
            label="Bộ phận"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="AREA_NAME"
            label="Khối"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="UNIT_NAME"
            label="Đơn vị"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="POSITION_NAME"
            label={<label>&nbsp;&ensp;Cấp bậc</label>}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="EMP_TYPE_NAME"
            label={<label>&nbsp;&ensp;Loại nhân viên</label>}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...tailLayout}>
        <Row>
          <Col xl={20} lg={20} md={20} sm={18} xs={10}></Col>
          <Col xl={4} lg={4} md={4} sm={6} xs={6}>
            <Button htmlType="submit">Tiếp</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default FrmPersonalInformation;
