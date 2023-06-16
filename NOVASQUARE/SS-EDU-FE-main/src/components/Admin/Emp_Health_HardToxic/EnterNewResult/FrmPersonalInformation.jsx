import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSearch } from "react-use-search";
import { useRecoilState, useRecoilValue } from "recoil";
import { removeAccents, yearData, formatDate } from "../../../../common";
import {
  employeeSelectState,
  employeeState,
} from "../../../../recoil/atom/employeeState";
import { physicalExamNewState } from "../../../../recoil/atom/physicalExamNew";
import { physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
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

const predicate = (EmployeeData, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const CD = removeAccents(String(EmployeeData.CD)).toLowerCase().trim();
  return CD.includes(newQuery);
};

const FrmPersonalInformation = ({
  isOpenSearchNV,
  setIsPersional,
  setIsHealthHis,
  onKeyChange,
  onCreatePhysicalExam,
  FrmPersionalInfoRef,
  onUpdatePhysicalExam,
}) => {
  const employees = useRecoilValue(employeeState);
  const [physicalExamSelect, setPhysicalExamSelect] = useRecoilState(
    physicalExamSelectState
  );
  const physicalExamGetNew = useRecoilValue(physicalExamNewState);

  const [employeeSelect, setEmployeeSelet] =
    useRecoilState(employeeSelectState);

  const [form] = Form.useForm();
  const [dataOption, setDataOption] = useState([]);
  useEffect(() => {
    if (physicalExamSelect || physicalExamGetNew?.length > 0) {
      form.setFieldsValue({
        CD: employeeSelect?.CD,
        FIRST_NAME: employeeSelect?.User?.FIRST_NAME,
        LAST_NAME: employeeSelect?.User?.LAST_NAME,
        BOD: moment(new Date(employeeSelect?.User?.BOD)).format(formatDate.Type),
        START_WORKING_DATE: moment(
          new Date(employeeSelect?.START_WORKING_DATE)
        ).format(formatDate.Type),
        GENDER: employeeSelect?.User?.Gender?.NAME,
        MARITAL_STATUS_NAME:
          employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME,
        PHYSICAL_DATE: moment(physicalExamSelect?.PHYSICAL_DATE),
        MEDICAL_EXAM_YEAR: physicalExamSelect?.MEDICAL_EXAM_YEAR,
        COUNTRY_ID: physicalExamSelect?.Medical_Facility?.Country?.id,
        CITY_ID: physicalExamSelect?.Medical_Facility?.City?.id,
        MEDICAL_FACILITY_NAME: physicalExamSelect?.MEDICAL_FACILITY_NAME,
        BRANCH_NAME: employeeSelect?.Workplace?.BRANCH_NAME,
        DEPARTMENT_NAME: employeeSelect?.Department?.DEPARTMENT_NAME,
        DIVISION_NAME: employeeSelect?.Division?.DIVISION_NAME,
        AREA_NAME: employeeSelect?.Area?.AREA_NAME,
        UNIT_NAME: employeeSelect?.Unit?.UNIT_NAME,
        CITY_NAME: employeeSelect?.City?.CITY_NAME,
        POSITION_NAME: employeeSelect?.Position?.POSITION_NAME,
        EMP_TYPE_NAME: employeeSelect?.EMP_TYPE_NAME,
      });
    } else if (!physicalExamSelect || !physicalExamGetNew) {
      form.setFieldsValue({
        CD: employeeSelect?.CD,
        FIRST_NAME: employeeSelect?.User?.FIRST_NAME,
        LAST_NAME: employeeSelect?.User?.LAST_NAME,
        BOD:
          employeeSelect &&
          moment(new Date(employeeSelect?.User?.BOD)).format(formatDate.Type),
        START_WORKING_DATE:
          employeeSelect &&
          moment(new Date(employeeSelect?.START_WORKING_DATE)).format(formatDate.Type),
        PHYSICAL_DATE: "",
        COUNTRY_ID: null,
        CITY_ID: null,
        MEDICAL_FACILITY_NAME: null,
        MEDICAL_EXAM_YEAR: new Date().getFullYear(),
        GENDER: employeeSelect?.User?.Gender?.NAME,
        EMP_TYPE_NAME: employeeSelect?.employeeSelect?.EMPLOYEE_CONTRACT_NAME,
        MARITAL_STATUS_NAME:
          employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME,
        BRANCH_NAME: employeeSelect?.Workplace?.BRANCH_NAME,
        DEPARTMENT_NAME: employeeSelect?.Department?.DEPARTMENT_NAME,
        DIVISION_NAME: employeeSelect?.Division?.DIVISION_NAME,
        AREA_NAME: employeeSelect?.Area?.AREA_NAME,
        UNIT_NAME: employeeSelect?.Unit?.UNIT_NAME,
        CITY_NAME: employeeSelect?.City?.CITY_NAME,
        POSITION_NAME: employeeSelect?.Position?.POSITION_NAME,
      });
    } else if (!employeeSelect) {
      form.resetFields();
    }
  }, [form, physicalExamSelect, employeeSelect]);

  const handleOk = () => {
    const newData = { ...form.getFieldValue() };

    const values = {
      INPUT_DATE: new Date(),
      MEDICAL_EXAM_YEAR: Number(newData.MEDICAL_EXAM_YEAR),
      PHYSICAL_DATE: newData.PHYSICAL_DATE,
      MEDICAL_FACILITY_NAME: newData.MEDICAL_FACILITY_NAME,
      INPUT_STATUS: 0,
      TYPE: 5,
    };

    const { CD, PHYSICAL_DATE, MEDICAL_EXAM_YEAR, MEDICAL_FACILITY_NAME } =
      newData;

    if (
      CD.trim() === "" ||
      !PHYSICAL_DATE ||
      CD === undefined ||
      // PHYSICAL_DATE === undefined ||
      // PHYSICAL_DATE === null ||
      MEDICAL_EXAM_YEAR === undefined ||
      MEDICAL_EXAM_YEAR === null ||
      MEDICAL_FACILITY_NAME === undefined ||
      MEDICAL_FACILITY_NAME === null
    ) {
      return;
    }

    if (physicalExamSelect) {
      const newResult = {
        ...values,
        INPUT_STATUS: physicalExamSelect?.INPUT_STATUS,
        USER_ID: physicalExamSelect?.USER_ID,
      };
      handleUpdatePhysicalExam(newResult, physicalExamSelect?.id);
    } else if (physicalExamGetNew?.length !== 0 && physicalExamGetNew) {
      const newResult = { ...values, USER_ID: employeeSelect?.USER_ID };
      handleUpdatePhysicalExam(newResult, physicalExamGetNew?.id);
    } else {
      const newResult = {
        ...values,
        USER_ID: employeeSelect?.USER_ID,
        INPUT_STATUS: 0,
      };
      handleCreate(newResult);
    }
    setIsPersional(false);
    setIsHealthHis(true);
    onKeyChange("2");
  };

  const handleCreate = async (value) => {
    await onCreatePhysicalExam(value);
  };

  const handleUpdatePhysicalExam = async (data, id) => {
    await onUpdatePhysicalExam(data, id);
  };

  const [filteredDatas, query, handleChange] = useSearch(employees, predicate, {
    debounce: 200,
  });

  useEffect(() => {
    setDataOption(() =>
      filteredDatas.map((item) => ({
        ...item,
        label: item.CD,
        value: item.CD,
      }))
    );
  }, [filteredDatas]);

  const handleSelectCD = (data, option) => {
    setEmployeeSelet(option);
  };

  const handleClear = () => {
    setEmployeeSelet(undefined);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="presional"
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
            rules={[{ required: employeeSelect ? false : true }]}
          >
            <AutoComplete
              options={dataOption}
              onChange={handleChange}
              onSelect={handleSelectCD}
              onClear={handleClear}
              allowClear
              disabled={employeeSelect ? true : false}
            >
              <Input />
            </AutoComplete>
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={10} offset={2}>
          {physicalExamSelect || employeeSelect ? null : (
            <Button type="primary" onClick={isOpenSearchNV}>
              Tìm kiếm NV
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item label={<label>Họ lót</label>} name="FIRST_NAME">
            <Input disabled />
          </Form.Item>
          <Form.Item label={<label>Tên</label>} name="LAST_NAME">
            <Input disabled />
          </Form.Item>
          <Form.Item name="BOD" label={<label>Ngày sinh</label>}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="START_WORKING_DATE"
            label={<label>Ngày vào làm</label>}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item name="GENDER" label={<label>Giới tính</label>}>
            <Input disabled />
          </Form.Item>
          {employeeSelect?.User?.Gender?.id === 2 ? (
            <Form.Item
              name="MARITAL_STATUS_NAME"
              label={<label>Tình trạng hôn nhân</label>}
            >
              <Input disabled />
            </Form.Item>
          ) : (
            ""
          )}

          <Form.Item
            name="PHYSICAL_DATE"
            label="Ngày khám"
            rules={[{ required: true }]}
          >
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              placeholder={false}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
            />
          </Form.Item>
          <Form.Item
            name="MEDICAL_EXAM_YEAR"
            label="Năm khám"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={new Date().getFullYear()}
          >
            <Select style={{ width: "100%" }}>
              {yearData &&
                yearData.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="MEDICAL_FACILITY_NAME"
            label="Cơ sở khám"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={1}>
          <Form.Item name="BRANCH_NAME" label="Nơi làm việc">
            <Input disabled />
          </Form.Item>
          <Form.Item name="CITY_NAME" label={<>Tỉnh/Thành làm việc</>}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="DEPARTMENT_NAME" label="Phòng ban">
            <Input disabled />
          </Form.Item>
          <Form.Item name="DIVISION_NAME" label="Bộ phận">
            <Input disabled />
          </Form.Item>
          <Form.Item name="AREA_NAME" label="Khối">
            <Input disabled />
          </Form.Item>
          <Form.Item name="UNIT_NAME" label="Đơn vị">
            <Input disabled />
          </Form.Item>
          <Form.Item name="POSITION_NAME" label="Cấp bậc">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="EMP_TYPE_NAME"
            label="Loại nhân viên"
            // label={<label>&nbsp;Loại nhân viên</label>}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item {...tailLayout}>
        <Row>
          <Col xl={19} lg={19} md={19} sm={16} xs={10}></Col>
          <Col xl={4} lg={4} md={4} sm={6} xs={6}>
            <Button
              htmlType="submit"
              onClick={handleOk}
              form="presional"
              key="presional"
            >
              Tiếp
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default FrmPersonalInformation;
