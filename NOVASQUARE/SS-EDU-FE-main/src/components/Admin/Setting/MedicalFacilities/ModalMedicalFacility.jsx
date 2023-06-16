import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import i18n from "../../../../lib/Language";
import { selectOptions } from "../../../../common";
import { useCountry } from "../../../../hooks/country";
import { useCity } from "../../../../hooks/city";

const ModalMedicalFacility = (props) => {
  const {
    title,
    isOpen,
    cities,
    listCountries,
    medicalFacility,
    medicalFacilityId,
    setMedicalFacilityId,
    onUpdate,
    onOk,
    onCancel,
    loading,
  } = props;
  const [form] = Form.useForm();
  const message = i18n.t("setting.messageValidate");

  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [cityIdSelect, setCityIdSelect] = useState();

  const [idSelectCountry, setIdSelectCountry] = useState();

  const handleSelectCountry = (value) => {
    setIdSelectCountry(value);
  };
  const handleSelectCity = (value) => {
    setCityIdSelect(value);
  };
  const handleClearSelectCountry = () => {
    setIdSelectCountry(null);
  };
  const handleClearSelectCity = () => {
    setCityIdSelect(null);
  };
  useEffect(() => {
    if (listCountries && listCountries.length > 0) {
      setCountryOptions(selectOptions(listCountries));
    } else setCountryOptions([]);
    if (idSelectCountry) {
      const cities = listCountries.filter(
        (country) => country.id === idSelectCountry
      )[0].Cities;
      setCityOptions(selectOptions(cities));
    } else setCityOptions([]);
    if (cityIdSelect && cities && cities.length > 0) {
      const districts = cities.filter((city) => city.id === cityIdSelect)[0]
        .Districts;
      setDistrictOptions(selectOptions(districts));
    } else setDistrictOptions([]);
  }, [listCountries, cities, idSelectCountry, cityIdSelect]);

  useEffect(() => {
    setIdSelectCountry(medicalFacility?.COUNTRY_ID);
    setCityIdSelect(medicalFacility?.CITY_ID);
    form.setFieldsValue({
      ...medicalFacility,
      DIRECT_INSURANCE: medicalFacility
        ? medicalFacility.DIRECT_INSURANCE === false
          ? "false"
          : "true"
        : "",
    });
  }, [medicalFacility, form]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setMedicalFacilityId(undefined);
    setIdSelectCountry(null);
    setCityIdSelect(null);
  };

  const handleOk = () => {
    const newData = {
      ...form.getFieldValue(),
    };
    const newResult = {
      ...newData,
      TECHNICAL_AREA: Number(newData?.TECHNICAL_AREA),
      MEDICAL_MODEL: Number(newData?.MEDICAL_MODEL),
      MEDICAL_TYPE: Number(newData?.MEDICAL_TYPE),
      LEVEL: Number(newData?.LEVEL),
      TREATMENT_TYPE: Number(newData?.TREATMENT_TYPE),
    };
    console.log("neData:", newResult);
    const {
      NAME,
      DESC,
      ADDRESS,
      TECHNICAL_AREA,
      LEVEL,
      MEDICAL_MODEL,
      SOCIAL_CD,
      MEDICAL_TYPE,
      WEBSITE,
      TREATMENT_TYPE,
    } = newData;

    if (
      NAME.trim() === "" ||
      ADDRESS.trim() === "" ||
      DESC.trim() === "" ||
      !TECHNICAL_AREA ||
      !LEVEL ||
      !MEDICAL_MODEL ||
      SOCIAL_CD.trim() === "" ||
      !MEDICAL_TYPE ||
      !TREATMENT_TYPE ||
      WEBSITE.trim() === ""
    ) {
      return;
    }

    if (medicalFacility) {
      return handleUpdateApp(newResult);
    }
    handleCreateApp(newResult);
  };

  const handleCreateApp = async (data) => {
    await onOk(data, () => handleCancel());
  };
  const handleUpdateApp = async (data) => {
    await onUpdate(data, medicalFacilityId, () => handleCancel());
  };

  return (
    <Modal
      width={800}
      title={title}
      visible={isOpen}
      onCancel={handleCancel}
      confirmLoading={loading}
      style={{ top: 20 }}
      footer={[
        <Button form="myForm" type="second" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          form="myForm"
          key="submit"
          htmlType="submit"
          type="primary"
          onClick={handleOk}
        >
          OK
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="myForm"
        name="basic"
        autoComplete="off"
        scrollToFirstError
        labelCol={{
          span: 7,
        }}
        wrroleerCol={{
          span: 17,
        }}
        labelAlign="left"
      >
        <Form.Item
          name="COUNTRY_ID"
          label={i18n.t("setting.countries.countryName")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={countryOptions}
            onSelect={handleSelectCountry}
            onClear={handleClearSelectCountry}
          />
        </Form.Item>
        <Form.Item
          name="CITY_ID"
          label={i18n.t("setting.district.city")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
          // initialValue={ward ? ward.District.City.NAME : ''}
        >
          <Select
            placeholder={i18n.t("setting.cityPlacehoder")}
            allowClear
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={cityOptions}
            onSelect={handleSelectCity}
            onClear={handleClearSelectCity}
          />
        </Form.Item>
        <Form.Item
          name="DISTRICT_ID"
          label={i18n.t("setting.ward.district")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select
            placeholder={i18n.t("setting.districtPlacehoder")}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={districtOptions}
          />
        </Form.Item>
        <Form.Item
          name="NAME"
          label={i18n.t("setting.medicalFacilities.mdcFacName")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ADDRESS"
          label={i18n.t("setting.medicalFacilities.mdcFacAddress")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="PHONE"
          label={i18n.t("setting.medicalFacilities.mdcFacPhone")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="WEBSITE"
          label={i18n.t("setting.medicalFacilities.mdcFacWebsite")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="MEDICAL_MODEL"
          label={i18n.t("setting.medicalFacilities.mdcModal_cd")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select>
            <Select.Option value="0">Chuyên khoa</Select.Option>
            <Select.Option value="1">Đa khoa</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="TECHNICAL_AREA"
          label={i18n.t("setting.medicalFacilities.mdcArea_cd")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select>
            <Select.Option value="0">Trung ương</Select.Option>
            <Select.Option value="1">Tỉnh</Select.Option>
            <Select.Option value="2">Quận</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="MEDICAL_TYPE"
          label={i18n.t("setting.medicalFacilities.mdcType_cd")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select>
            <Select.Option value="0">Phòng khám</Select.Option>
            <Select.Option value="1">Bệnh viện</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="LEVEL"
          label={i18n.t("setting.medicalFacilities.mdcLevel_cd")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select>
            <Select.Option value="1">Hạng I</Select.Option>
            <Select.Option value="2">Hạng II</Select.Option>
            <Select.Option value="3">Hạng III</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="TREATMENT_TYPE"
          // label={i18n.t("setting.medicalFacilities.mdcLevel_cd")}
          label="TREATMENT_TYPE"
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select>
            <Select.Option value="0">Nội trú</Select.Option>
            <Select.Option value="1">Ngoại trú</Select.Option>
            <Select.Option value="2">Nội ngoại trú</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="SOCIAL_CD"
          label={i18n.t("setting.medicalFacilities.mdcSocial_cd")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="DIRECT_INSURANCE"
          label={i18n.t("setting.medicalFacilities.mdcInsurance")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select>
            <Select.Option value="true">
              {i18n.t("setting.medicalFacilities.mdcYes")}
            </Select.Option>
            <Select.Option value="false">
              {i18n.t("setting.medicalFacilities.mdcNo")}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="DESC"
          label={i18n.t("setting.desc")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="NOTE" label={i18n.t("setting.note")}>
          <Input.TextArea row={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalMedicalFacility;
