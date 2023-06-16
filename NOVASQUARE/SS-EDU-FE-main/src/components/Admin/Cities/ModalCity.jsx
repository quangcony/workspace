import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { selectOptions } from "../../../common";
import i18n from "../../../lib/Language";

const ModalCity = (props) => {
  const {
    countries,
    title = "",
    isOpen,
    onCancel,
    city,
    onOk,
    onUpdate,
    setCityId,
    cityId,
    loading,
  } = props;

  const [form] = Form.useForm();
  const message = i18n.t("setting.messageValidate");

  const [countryOptions, setCountryOptions] = useState();

  useEffect(() => {
    if (countries && countries.length > 0) {
      setCountryOptions(selectOptions(countries));
    } else {
      setCountryOptions([]);
    }
  }, [countries]);
  // ---------------------------------------
  useEffect(() => {
    form.setFieldsValue(city);
  }, [city, form]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setCityId(undefined);
  };
  const handleCreateApp = async (data) => {
    await onOk(data, () => handleCancel());
  };
  const handleUpdateApp = async (data) => {
    await onUpdate(data, cityId, () => handleCancel());
  };
  const handleOk = () => {
    const newData = { ...form.getFieldValue() };

    const { NAME, CD, DESC } = newData;

        if (
            NAME?.trim() === "" || NAME === undefined ||
            CD?.trim() === "" || CD === undefined ||
            DESC?.trim() === "" || DESC === undefined
        ) {
            // enqueueSnackbar("Please fill input!", { variant: "error" })
            return;
        }
        if (city) {
            return handleUpdateApp(newData);
        }
        handleCreateApp(newData);
    };

  return (
    <Modal
      width={800}
      title={title}
      visible={isOpen}
      onCancel={handleCancel}
      confirmLoading={loading}
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
          label={i18n.t("setting.city.country")}
          rules={[
            {
              required: true,
              message,
            },
          ]}
        >
          <Select
            placeholder={i18n.t("setting.nationalPlacehoder")}
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
          />
        </Form.Item>
        <Form.Item
          name="CD"
          label={i18n.t("setting.city.code")}
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
          name="NAME"
          label={i18n.t("setting.city.name")}
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

export default ModalCity;
