import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { selectOptions } from '../../../common';
import i18n from "../../../lib/Language";

const ModalWard = (props) => {
    const { title = 'Ward Setting', isOpen, listCities, ward, wardId,
        setWardId, onUpdate, onOk, onCancel, loading } = props;
    const [form] = Form.useForm();
    const message = i18n.t("setting.messageValidate");

    const [idSelect, setIdSelect] = useState()
    const [cityOptions, setCityOptions] = useState([]);
    const [districtOptions, setDistrictOptios] = useState([]);

    const handleSelect = (value) => {
        setIdSelect(value);
    }

    useEffect(() => {
        if (listCities && listCities.length > 0) {
            setCityOptions(selectOptions(listCities))
        } else { setCityOptions([]) };
        if (idSelect) {
            const listDistricts = listCities.filter(item => item.id === idSelect)[0].Districts;
            setDistrictOptios(selectOptions(listDistricts))
        } else { setDistrictOptios([]) };
    }, [listCities, idSelect]);

    useEffect(() => {
        setIdSelect(ward?.District.City.id);
        form.setFieldsValue({ ...ward, CITY_ID: ward?.District?.City?.id });
    }, [ward, form]);

    const handleCancel = () => {
        onCancel();
        form.resetFields();
        setWardId(undefined);
    };

    const handleCreateApp = async (data) => {
        await onOk(data, () => handleCancel());
    };
    const handleUpdateApp = async (data) => {
        await onUpdate(data, wardId, () => handleCancel());
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
        const { CITY_ID, ...result } = newData
        if (ward) {
            return handleUpdateApp(result);
        }
        handleCreateApp(result);
    };

    return (
        <Modal
            width={800}
            title={title}
            visible={isOpen}
            onCancel={handleCancel}
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
                    loading={loading}
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
                labelAlign='left'
            >
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
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={cityOptions}
                        onSelect={handleSelect}
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
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={districtOptions}
                    />
                </Form.Item>
                <Form.Item
                    name="CD"
                    label={i18n.t("setting.ward.code")}
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
                    label={i18n.t("setting.ward.name")}
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
                <Form.Item
                    name="NOTE"
                    label={i18n.t("setting.note")}
                >
                    <Input.TextArea row={3} />
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default ModalWard