import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { removeAccents, WorkNumberDay, WorkNumberMonth, WorkNumberYear, yearData, formatDate } from '../../../common';
import { areaData, cityData, departmentData, divisionData, employeeContractTypeData, genderData, maritalStatusData, positionData, unitData, workPlaceData } from '../../../common/getAllApi';
import { areaOptionsState, areaState } from '../../../recoil/atom/areaState';
import { cityOptionsState, cityState } from '../../../recoil/atom/cityState';
import { departmentOptionsState, departmentState } from '../../../recoil/atom/departmentState';
import { divisionOptionsState, divisionState } from '../../../recoil/atom/divisionState';
import { employeeTypeOptionsState, employeeTypeState } from '../../../recoil/atom/employeeTypeState';
import { genderOptionsState, genderState } from '../../../recoil/atom/genderState';
import { maritalOptionsState, maritalState } from '../../../recoil/atom/maritalState';
import { positionOptionsState, positionState } from '../../../recoil/atom/positionState';
import { unitOptionsState, unitState } from '../../../recoil/atom/unitState';
import { workPlaceOptionsState, workPlacesState } from '../../../recoil/atom/workPlaceState';

const SelfSpecialMedicalExamination = ({ setFilterEmployee }) => {
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
    const setGenderList = useSetRecoilState(genderState);
    const setMaritalList = useSetRecoilState(maritalState);
    const setAreaList = useSetRecoilState(areaState);
    const setDepartmentList = useSetRecoilState(departmentState);
    const setPositionList = useSetRecoilState(positionState);
    const setUnitList = useSetRecoilState(unitState);
    const setDivisionList = useSetRecoilState(divisionState);
    const setEmployeeTypeList = useSetRecoilState(employeeTypeState);
    const setWorkPlaceList = useSetRecoilState(workPlacesState);
    const setCityList = useSetRecoilState(cityState);

    const NumberDay = WorkNumberDay();
    const NumberMonth = WorkNumberMonth();
    const NumberYear = WorkNumberYear();

    const handleSearch = () => {
        const data = { ...form.getFieldsValue() }
        setFilterEmployee(() => data);
    };

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
                    name="self-exam-search-form"
                    autoComplete="off"
                    scrollToFirstError
                    labelCol={{
                        xs: { span: 8 },
                        lg: { span: 10 }
                    }}
                    labelAlign='left'
                    onFinish={handleSearch}
                    labelWrap
                >
                    <Row gutter={[24, 0]}>
                        <Col xs={24} md={12} xl={6}>
                            <Form.Item
                                name="FIRST_NAME"
                                label="Họ"
                            >
                                <Input allowClear />
                            </Form.Item>
                            <Form.Item
                                name="LAST_NAME"
                                label="Tên"
                            >
                                <Input allowClear />
                            </Form.Item>
                            <Form.Item
                                name="CD"
                                label="Mã số NV"
                            >
                                <Input allowClear />
                            </Form.Item>
                            <Form.Item
                                name="BOD"
                                label="Ngày sinh"
                            >
                                <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
                            </Form.Item>
                            <Form.Item
                                name="START_WORKING_DATE"
                                label="Ngày vào làm"
                            >
                                <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
                            </Form.Item>
                            <Form.Item
                                name="BRANCH_ID"
                                label="Nơi làm việc"
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
                                    onFocus={() => workPlaceData(workPlaceOptions, setWorkPlaceList)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} xl={6}>
                            <Form.Item
                                name="CITY_ID"
                                label="Tỉnh/Thành lv"
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
                                    onFocus={() => cityData(cityOptions, setCityList)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="AREA_ID"
                                label="Khối"
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
                                    onFocus={() => areaData(areaOptions, setAreaList)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="DEPT_ID"
                                label="Phòng ban"
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
                                    onFocus={() => departmentData(departmentOptions, setDepartmentList)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="DIVISION_ID"
                                label="Bộ phận"
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
                                    onFocus={() => divisionData(divisionOptions, setDivisionList)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="UNIT_ID"
                                label="Đơn vị"
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
                                    onFocus={() => unitData(unitOptions, setUnitList)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} xl={12}>
                            <Row gutter={[24, 0]}>
                                <Col xs={24} md={12} xl={12}>
                                    <Form.Item
                                        name="POSITION_ID"
                                        label="Cấp bậc"
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
                                            onFocus={() => positionData(positionOptions, setPositionList)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="EMP_TYPE_ID"
                                        label="Loại NV"
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
                                            onFocus={() => employeeContractTypeData(employeeTypeOptions, setEmployeeTypeList)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="GENDER"
                                        label="Giới tính"
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
                                            onFocus={() => genderData(genderOptions, setGenderList)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="MARITAL_STATUS_ID"
                                        label="TT hôn nhân"
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
                                            onFocus={() => maritalStatusData(maritalOptions, setMaritalList)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12} xl={12}>
                                    <Form.Item
                                        name="MEDICAL_EXAM_YEAR"
                                        label="Năm khám"
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
                                    <Form.Item
                                        name="PHYSICAL_DATE"
                                        label="Ngày khám"
                                    >
                                        <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
                                    </Form.Item>
                                    <Form.Item
                                        name="MEDICAL_FACILITY_NAME"
                                        label="Cơ sở khám"
                                    >
                                        <Input allowClear />
                                    </Form.Item>
                                    <Form.Item
                                        name="EXAMINATION_TYPE"
                                        label="Loại hình khám"
                                    >
                                        <Select
                                            allowClear
                                            options={[
                                                {
                                                    value: 2,
                                                    label: 'Tự khám',
                                                },
                                                {
                                                    value: 7,
                                                    label: 'Đặc biệt',
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={24}>
                                        <Col md={6} xs={24}>
                                            <p>Thâm niên: </p>
                                        </Col>
                                        <Col md={6} xs={8}>
                                            <Row gutter={12}>
                                                <Col span={14}>
                                                    <Form.Item name="WORKYEAR">
                                                        <Select options={NumberYear} showSearch style={{ width: '100%' }} allowClear />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={10}>Năm</Col>
                                            </Row>
                                        </Col>
                                        <Col md={6} xs={8}>
                                            <Row gutter={12}>
                                                <Col span={14}>
                                                    <Form.Item name="WORKMONTH">
                                                        <Select options={NumberMonth} showSearch style={{ width: '100%' }} allowClear />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={10}>Tháng</Col>
                                            </Row>
                                        </Col>
                                        <Col md={6} xs={8}>
                                            <Row gutter={12}>
                                                <Col span={14}>
                                                    <Form.Item name="WORKDAY">
                                                        <Select options={NumberDay} showSearch style={{ width: '100%' }} allowClear />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={10}>Ngày</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
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