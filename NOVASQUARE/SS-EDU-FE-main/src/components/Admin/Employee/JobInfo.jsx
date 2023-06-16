import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState, useEffect } from "react";
import { useStyles } from "./style";
import i18n from "../../../lib/Language";
import { useArea } from "../../../hooks/area";
import { useDepartment } from "../../../hooks/department";
import { useDivision } from "../../../hooks/division";
import { useUnit } from "../../../hooks/unit";
import { useWorkPlace } from "../../../hooks/workPlace";
import { usePosition } from "../../../hooks/position";
import { useEmployeeContractType } from "../../../hooks/employeeContractType";
import { useMaritalStatus } from "../../../hooks/maritalStatus";
import { useCountry } from "../../../hooks/country";
import { selectOptions, formatDate } from "../../../common";
import { useEmployeeStatus } from "../../../hooks/employeeStatus";
import moment from "moment";
import { useCity } from "../../../hooks/city";

const JobInfo = ({
  jobRef,
  employee,
  countryId,
  setCountryId,
  jobFormCheck,
  setJobFormCheck,
  isOpen,
}) => {
  const [form] = Form.useForm();
  const message = i18n.t("setting.messageValidate");
  const { areas } = useArea();
  const { departments } = useDepartment();
  const { divisions } = useDivision();
  const { units } = useUnit();
  const { workPlaces } = useWorkPlace();
  const { positions } = usePosition();
  const { employeeContractTypes } = useEmployeeContractType();
  const { maritalStatuses } = useMaritalStatus();
  const { countries } = useCountry();
  const { cities } = useCity();
  const { employeeStatuses } = useEmployeeStatus();

  const [areaOptions, setAreaOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [workPlaceOptions, setWorkPlaceOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [employeeTypeOptions, setEmployeeTypeOptions] = useState([]);
  const [maritalStatusOptions, setMaritalStatusOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [employeeStatusOptions, setEmployeeStatusOptions] = useState([]);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (employee) {
      setCountryId(employee?.COUNTRY_ID);
      if (isOpen) {
        setIsShow(false);
      }
      if (jobFormCheck) {
        setIsShow(true);
      }
    }
  }, [employee, setCountryId, jobFormCheck, isOpen]);

  useEffect(() => {
    if (countries && countries.length > 0) {
      setCountryOptions(selectOptions(countries));
    } else setCountryOptions([]);
    if (countryId) {
      const newList = cities.filter((city) => city.COUNTRY_ID === countryId);
      setCityOptions(selectOptions(newList));
    } else setCityOptions([]);
    if (areas && areas.length > 0) {
      setAreaOptions(selectOptions(areas));
    } else setAreaOptions([]);
    if (departments && departments.length > 0) {
      setDepartmentOptions(selectOptions(departments));
    } else {
      setDepartmentOptions([]);
    }
    if (divisions && divisions.length > 0) {
      setDivisionOptions(selectOptions(divisions));
    } else {
      setDivisionOptions([]);
    }
    if (units && units.length > 0) {
      setUnitOptions(selectOptions(units));
    } else {
      setUnitOptions([]);
    }
    if (workPlaces && workPlaces.length > 0) {
      setWorkPlaceOptions(selectOptions(workPlaces));
    } else {
      setWorkPlaceOptions([]);
    }
    if (positions && positions.length > 0) {
      setPositionOptions(selectOptions(positions));
    } else {
      setPositionOptions([]);
    }
    if (employeeContractTypes && employeeContractTypes.length > 0) {
      setEmployeeTypeOptions(selectOptions(employeeContractTypes));
    } else {
      setEmployeeTypeOptions([]);
    }
    if (maritalStatuses && maritalStatuses.length > 0) {
      setMaritalStatusOptions(selectOptions(maritalStatuses));
    } else {
      setMaritalStatusOptions([]);
    }
    if (employeeStatuses && employeeStatuses.length > 0) {
      setEmployeeStatusOptions(selectOptions(employeeStatuses));
    } else {
      setEmployeeStatusOptions([]);
    }
  }, [
    areas,
    departments,
    divisions,
    units,
    workPlaces,
    positions,
    employeeContractTypes,
    maritalStatuses,
    countries,
    countryId,
    setCountryId,
    employeeStatuses,
    cities,
  ]);

  useEffect(() => {
    form.setFieldsValue({
      ...employee,
      START_WORKING_DATE: employee?.START_WORKING_DATE
        ? moment(employee?.START_WORKING_DATE)
        : null,
      STOP_WORKING_DATE: employee?.STOP_WORKING_DATE
        ? moment(employee?.STOP_WORKING_DATE)
        : null,
    });
  }, [employee, form]);

  const handleSelectCountryId = (value) => {
    setCountryId(value);
  };
  const handleClearCountryId = () => {
    setCountryId(undefined);
  };
  const handleHideElement = () => {
    setJobFormCheck(false);
    setIsShow(false);
  };

  return (
    <Card
      title={
        <Space>
          {isShow ? (
            <CaretUpOutlined
              onClick={handleHideElement}
              style={useStyles.iconStyles}
            />
          ) : (
            <CaretDownOutlined
              onClick={() => setIsShow(true)}
              style={useStyles.iconStyles}
            />
          )}
          <Typography.Title style={useStyles.titleStyles}>
            {i18n.t("hr.job_info")}
          </Typography.Title>
        </Space>
      }
      headStyle={useStyles.headStyles}
      bodyStyle={{
        opacity: isShow ? 1 : 0,
        visibility: isShow ? "visible" : "hidden",
        height: isShow ? "" : 0,
        transition: "0.3s",
        padding: isShow ? "24px 24px 0" : 0,
      }}
      className="card-header"
    >
      <Row>
        <Col
          xs={{
            span: 24,
          }}
          lg={{
            span: 18,
            offset: 3,
          }}
        >
          <Form
            form={form}
            ref={jobRef}
            id="jobForm"
            name="basic"
            autoComplete="off"
            scrollToFirstError
            labelCol={{
              span: 4,
            }}
            labelAlign="left"
            initialValues={{ JOB_LEVEL_ID: 1 }}
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  name="COUNTRY_ID"
                  label={i18n.t("hr.country")}
                  labelCol={{ span: 8 }}
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
                    placeholder={i18n.t("hr.job_placehoder.country")}
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
                    options={countryOptions}
                    onSelect={handleSelectCountryId}
                    onClear={handleClearCountryId}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="CITY_ID"
                  label={i18n.t("hr.city")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.city")}
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
                    options={cityOptions}
                    disabled={!countryId ? true : false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="AREA_ID"
                  label={i18n.t("hr.area")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.area")}
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
                    options={areaOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="DEPT_ID"
                  label={i18n.t("hr.dept")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.dept")}
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
                    options={departmentOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="DIVISION_ID"
                  label={i18n.t("hr.division")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.division")}
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
                    options={divisionOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="UNIT_ID"
                  label={i18n.t("hr.unit")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.unit")}
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
                    options={unitOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="BRANCH_ID"
                  label={i18n.t("hr.branch")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.branch")}
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
                    options={workPlaceOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="POSITION_ID"
                  label={i18n.t("hr.position")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.position")}
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
                    options={positionOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="JOB_LEVEL_ID"
                  label={i18n.t("hr.job_lv")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.job_lv")}
                    allowClear
                    showSearch
                    options={[
                      {
                        label: 1,
                        value: 1,
                      },
                      {
                        label: 2,
                        value: 2,
                      },
                      {
                        label: 3,
                        value: 3,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="CONTRACT_TYPE_ID"
                  label={i18n.t("hr.emp_type")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.emp_type")}
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
                    options={employeeTypeOptions}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="MARITAL_STATUS_ID"
                  label={i18n.t("hr.marital")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <Select
                    placeholder={i18n.t("hr.job_placehoder.marital")}
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
                    options={maritalStatusOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}></Col>
            </Row>
            <Form.Item name="SOCIAL_CD" label={i18n.t("hr.social")}>
              <Input />
            </Form.Item>
            <Form.Item name="JOB_NOTE" label={i18n.t("hr.job_desc")}>
              <Input.TextArea row={3} />
            </Form.Item>
            <Form.Item name="JOB_SHORT_DESC" label={i18n.t("hr.short_desc")}>
              <Input.TextArea row={3} />
            </Form.Item>
            <Form.Item
              name="JOB_FULL_DESC"
              label={i18n.t("hr.working_process")}
            >
              <Input.TextArea row={3} />
            </Form.Item>
            <Form.Item name="FACEBOOK_LINK" label={i18n.t("hr.fb")}>
              <Input />
            </Form.Item>
            <Form.Item name="ZALO_LINK" label={i18n.t("hr.zalo")}>
              <Input />
            </Form.Item>
            <Form.Item name="SHOW_WEB" label={i18n.t("hr.show")}>
              <Select
                placeholder={i18n.t("hr.job_placehoder.show")}
                allowClear
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item name="NOTE" label={i18n.t("hr.note")}>
              <Input.TextArea row={3} />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="START_WORKING_DATE"
                  label={i18n.t("hr.start_date")}
                  labelCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message,
                    },
                  ]}
                >
                  <DatePicker format={formatDate.Type} placeholder={false} />
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="STOP_WORKING_DATE"
                  label={i18n.t("hr.stop_date")}
                  labelCol={{ span: 8 }}
                >
                  <DatePicker format={formatDate.Type} placeholder={false} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="EMP_STATUS_ID"
              label={i18n.t("hr.emp_status")}
              rules={[
                {
                  required: true,
                  message,
                },
              ]}
            >
              <Select
                placeholder={i18n.t("hr.job_placehoder.emp_status")}
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
                options={employeeStatusOptions}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default JobInfo;
