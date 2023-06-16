import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { removeAccents, yearData, formatDate } from '../../../common';
import { areaOptionsState } from '../../../recoil/atom/areaState';
import { cityOptionsState } from '../../../recoil/atom/cityState';
import { departmentOptionsState } from '../../../recoil/atom/departmentState';
import { divisionOptionsState } from '../../../recoil/atom/divisionState';
import { employeeTypeOptionsState } from '../../../recoil/atom/employeeTypeState';
import { genderOptionsState } from '../../../recoil/atom/genderState';
import { maritalOptionsState } from '../../../recoil/atom/maritalState';
import { medicalFacilityOptionsState } from '../../../recoil/atom/medicalFacilityState';
import { positionOptionsState } from '../../../recoil/atom/positionState';
import { unitOptionsState } from '../../../recoil/atom/unitState';
import { workPlaceOptionsState } from '../../../recoil/atom/workPlaceState';

const SelfSpecialMedicalExamination = () => {
    const [form] = Form.useForm();

    const workPlaceOptions = useRecoilValue(workPlaceOptionsState);
    const cityOptions = useRecoilValue(cityOptionsState);
    const areaOptions = useRecoilValue(areaOptionsState);
    const departmentOptions = useRecoilValue(departmentOptionsState);
    const divisionOptions = useRecoilValue(divisionOptionsState);
    const unitOptions = useRecoilValue(unitOptionsState);
    const positionOptions = useRecoilValue(positionOptionsState);
    const employeeTypeOptions = useRecoilValue(employeeTypeOptionsState);
    const genderOptions = useRecoilValue(genderOptionsState);
    const maritalOptions = useRecoilValue(maritalOptionsState);
    const medicalFacilityOptions = useRecoilValue(medicalFacilityOptionsState);

    return (
        <Row justify="center" gutter={[32, 32]}>
            <Col span={24}>
                <Typography.Title level={3}>
                    Kết quả KSK Tự khám/ Đặc biệt
                </Typography.Title>
            </Col>
            <Col span={24}>
                <Form
                    form={form}
                    name="basic"
                    autoComplete="off"
                    scrollToFirstError
                    labelCol={{
                        span: 4,
                    }}
                    labelAlign='left'
                >
                    <Row gutter={[24, 0]}>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="FULL_NAME"
                                label="Họ và tên"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="CITY"
                                label="Tỉnh/Thành lv"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={cityOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="LEVER"
                                label="Cấp bậc"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={positionOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="YEAR"
                                label="Năm khám"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select allowClear>
                                    {yearData &&
                                        yearData.map((item, index) => (
                                            <Select.Option key={index} value={item}>
                                                {item}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="CD"
                                label="Mã số NV"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Input allowClear />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="AREA"
                                label="Khối"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={areaOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="EMP_TYPE"
                                label="Loại NV"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={employeeTypeOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="EXAMINATION_DATE"
                                label="Ngày khám"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="BOD"
                                label="Ngày sinh"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="DEPARTMENT"
                                label="Phòng ban"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={departmentOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="GENDER"
                                label="Giới tính"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={genderOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="MEDICAL_FACILITY"
                                label="Cơ sở khám"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={medicalFacilityOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="START_DATE"
                                label="Ngày vào làm"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="DIVISION"
                                label="Bộ phận"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={divisionOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="MARITAL"
                                label="TT hôn nhân"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={maritalOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="EXAMINATION_TYPE"
                                label="Loại hình khám"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={[
                                        {
                                            value: 'Tự khám',
                                            label: 'Tự khám',
                                        },
                                        {
                                            value: 'Đặc biệt',
                                            label: 'Đặc biệt',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="BRANCH"
                                label="Nơi làm việc"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={workPlaceOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="UNIT"
                                label="Đơn vị"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <Select
                                    allowClear
                                    options={unitOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        removeAccents((option?.label ?? "").toLowerCase())
                                            .includes(removeAccents(input.toLowerCase()))
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? "")
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? "").toLowerCase())
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={6}>
                            <Form.Item
                                name="SENIORITY"
                                label="Thâm niên"
                                labelCol={{
                                    xs: { span: 8 },
                                    lg: { span: 10 }
                                }}
                            >
                                <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}

export default SelfSpecialMedicalExamination