import {
  AutoComplete, Button, Col, DatePicker, Form,
  Input, Radio, Row, Select
} from "antd";
import moment from "moment";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useSearch } from "react-use-search";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import physicalExamApi from "../../../../api/physicalExamApi";
import { removeAccents, yearData, YearOfWork, formatDate } from "../../../../common";
import { useSpecialExam } from "../../../../hooks/specialExam";
import specialExamApi from "../../../../api/specialExamApi";
import {
  employeeSelectState,
  modifyEmployeeState
} from "../../../../recoil/atom/employeeState";
import { newestPhysicalExamState, physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";
import { newestSpecialExamState, specialDiseaseTypeState, specialExamTypeState } from "../../../../recoil/atom/specialExamState";
import { tabActiveState } from "../../../../recoil/atom/tabActiveState";
const { Option } = Select;

const validateMessages = {
  required: "Trường này không được để trống!",
};

const predicate = (EmployeeData, query) => {
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const CD = removeAccents(String(EmployeeData.CD)).toLowerCase().trim();
  return CD.includes(newQuery);
};

const occupationalList = [
  "Bệnh Điếc nghề nghiệp do tiếng ồn",
  "Bệnh Viêm phế quản mãn tính nghề nghiệp",
  "Bệnh Hen phế quản nghề nghiệp",
  "Bệnh Bụi phổi silic nghề nghiệp",
  "Bệnh nghề nghiệp khác 1",
  "Bệnh nghề nghiệp khác 2"
]

const FrmPersonalInformation = ({ isOpenSearchNV, onKeyChange, FrmPersonalInfoRef, specialDiseaseType }) => {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();

  const YearWork = YearOfWork();
  const [dataOption, setDataOption] = useState([]);
  const [loading, setLoading] = useState(false)

  const [newPhysicalExam, setNewPhysicalExamState] = useRecoilState(newestPhysicalExamState);
  const physicalExam = useRecoilValue(physicalExamSelectState);
  const EmployeeData = useRecoilValue(modifyEmployeeState);
  const newSpecialExam = useRecoilValue(newestSpecialExamState);
  const setSpecialExamType = useSetRecoilState(specialExamTypeState);
  const setSpecialDiseaseType = useSetRecoilState(specialDiseaseTypeState);
  const [tabActive, setTabActive] = useRecoilState(tabActiveState);
  const [employeeSelect, setEmployeeSelet] = useRecoilState(employeeSelectState);

  const [filteredDatas, query, handleChange] = useSearch(
    EmployeeData,
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
    setEmployeeSelet(option);
  };

  useEffect(() => {
    if (!physicalExam && employeeSelect) {
      form.setFieldsValue({
        CD: employeeSelect?.CD,
        FIRST_NAME: employeeSelect?.User?.FIRST_NAME,
        LAST_NAME: employeeSelect?.User?.LAST_NAME,
        BOD: moment(employeeSelect?.User?.BOD),
        START_WORKING_DATE: moment(employeeSelect?.START_WORKING_DATE),
        GENDER: employeeSelect?.User?.Gender?.NAME,
        MARITAL_STATUS_NAME: employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME,
        BRANCH_NAME: employeeSelect?.Workplace?.BRANCH_NAME,
        DEPARTMENT_NAME: employeeSelect?.Department?.DEPARTMENT_NAME,
        DIVISION_NAME: employeeSelect?.Division?.DIVISION_NAME,
        AREA_NAME: employeeSelect?.Area?.AREA_NAME,
        UNIT_NAME: employeeSelect?.Unit?.UNIT_NAME,
        CITY_NAME: employeeSelect?.City?.CITY_NAME,
        POSITION_NAME: employeeSelect?.Position?.POSITION_NAME,
        EMP_TYPE_NAME: employeeSelect?.EMP_TYPE_NAME,
      })
    }
    if (physicalExam) {
      // setTabActive({
      //   personalInformation: false,
      //   medicalHistory: false,
      //   physicalExam: false,
      //   conclusions: false,
      // });
      setSpecialExamType(physicalExam?.Special_Exams[0]?.TYPE);
      setSpecialDiseaseType(physicalExam?.Special_Exams[0]?.SPECIAL_DISEASE_TYPE);
      form.setFieldsValue({
        TYPE: physicalExam?.Special_Exams[0].TYPE,
        SPECIAL_DISEASE_TYPE: (physicalExam?.Special_Exams[0].SPECIAL_DISEASE_TYPE)?.toString(),
        DEPARTMENT_WORKED_YEAR: physicalExam?.Special_Exams[0]?.DEPARTMENT_WORKED_YEAR,
        PHYSICAL_DATE: moment(physicalExam?.PHYSICAL_DATE),
        MEDICAL_EXAM_YEAR: physicalExam?.MEDICAL_EXAM_YEAR,
        MEDICAL_FACILITY_NAME: physicalExam?.MEDICAL_FACILITY_NAME,
        CD: employeeSelect?.CD,
        FIRST_NAME: employeeSelect?.User?.FIRST_NAME,
        LAST_NAME: employeeSelect?.User?.LAST_NAME,
        BOD: moment(employeeSelect?.User?.BOD),
        START_WORKING_DATE: moment(employeeSelect?.START_WORKING_DATE),
        GENDER: employeeSelect?.User?.Gender?.NAME,
        MARITAL_STATUS_NAME: employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME,
        BRANCH_NAME: employeeSelect?.Workplace?.BRANCH_NAME,
        DEPARTMENT_NAME: employeeSelect?.Department?.DEPARTMENT_NAME,
        DIVISION_NAME: employeeSelect?.Division?.DIVISION_NAME,
        AREA_NAME: employeeSelect?.Area?.AREA_NAME,
        UNIT_NAME: employeeSelect?.Unit?.UNIT_NAME,
        CITY_NAME: employeeSelect?.City?.CITY_NAME,
        POSITION_NAME: employeeSelect?.Position?.POSITION_NAME,
        EMP_TYPE_NAME: employeeSelect?.EMP_TYPE_NAME,
      });
    }
  }, [physicalExam, form, employeeSelect]);

  const handleUpdatePhysicalExam = async (data) => {
    let id;
    if (physicalExam) {
      id = physicalExam?.id
    } else if (newPhysicalExam.id) {
      id = newPhysicalExam.id
    }
    setLoading(true);
    try {
      const res = await physicalExamApi.updatePhysicalExam(data, id);
      if (res?.data) {
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        setLoading(false);
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleCreateSpecialExam = async (data) => {
    await specialExamApi.createSpecialExam(data);
  };
  const handleUpdateSpecialExam = async (data) => {
    let id;
    if (physicalExam) {
      id = physicalExam?.Special_Exams?.id
    } else if (newSpecialExam) {
      id = newSpecialExam.id
    }
    await specialExamApi.updateSpecialExam(data, id);
  };

  const handleOk = async () => {
    const newData = {
      ...form.getFieldsValue(),
    };

    const {
      TYPE,
      SPECIAL_DISEASE_TYPE,
      CD,
      PHYSICAL_DATE,
      MEDICAL_EXAM_YEAR,
      MEDICAL_FACILITY_NAME,
      DEPARTMENT_WORKED_YEAR,
    } = newData;

    if (
      TYPE === undefined || SPECIAL_DISEASE_TYPE === undefined ||
      CD === undefined || CD.trim() === "" ||
      PHYSICAL_DATE === undefined || PHYSICAL_DATE === null ||
      MEDICAL_EXAM_YEAR === undefined ||
      MEDICAL_FACILITY_NAME === undefined || MEDICAL_FACILITY_NAME.trim() === ""
    ) {
      return;
    }

    setSpecialExamType(TYPE);
    setSpecialDiseaseType(Number(SPECIAL_DISEASE_TYPE));

    const physicalExamData = {
      USER_ID: employeeSelect?.USER_ID,
      INPUT_DATE: new Date(),
      MEDICAL_EXAM_YEAR,
      PHYSICAL_DATE,
      MEDICAL_FACILITY_NAME,
      INPUT_STATUS: physicalExam ? 1 : 0,
      TYPE: 6,
    };
    if (physicalExam || !tabActive.medicalHistory) {
      handleUpdatePhysicalExam(physicalExamData);
      const specialExamData = {
        TYPE,
        SPECIAL_DISEASE_TYPE: Number(SPECIAL_DISEASE_TYPE),
        DEPARTMENT_WORKED_YEAR,
        SPECIAL_DISEASE_NAME: occupationalList[Number(SPECIAL_DISEASE_TYPE)],
      }
      handleUpdateSpecialExam(specialExamData);
      onKeyChange("2");
      return;
    }
    setLoading(true);
    try {
      const res = await physicalExamApi.createPhysicalExam(physicalExamData);
      if (res.data) {
        setNewPhysicalExamState(() => res.data.elements);
        const specialExamData = {
          PHYSICAL_EXAM_ID: res.data.elements.id,
          TYPE,
          SPECIAL_DISEASE_TYPE: Number(SPECIAL_DISEASE_TYPE),
          DEPARTMENT_WORKED_YEAR,
          SPECIAL_DISEASE_NAME: occupationalList[Number(SPECIAL_DISEASE_TYPE)],
        };
        handleCreateSpecialExam(specialExamData);
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
    setTabActive({ ...tabActive, medicalHistory: false });
    onKeyChange("2");
  };

  const handleClear = () => {
    setEmployeeSelet(undefined);
  };

  return (
    <Form
      form={form}
      name="personal_informartion"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
      labelCol={{ span: 8 }}
      validateMessages={validateMessages}
      ref={FrmPersonalInfoRef}
    >
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item
            name="TYPE"
            rules={[{ required: true }]}
            label="Hình thức khám"
          >
            <Radio.Group disabled={physicalExam ? true : false}>
              <Radio value={0}> Tầm soát </Radio>
              <Radio value={1}> Định kỳ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="SPECIAL_DISEASE_TYPE"
            label="Bệnh nghề nghiệp"
            rules={[{ required: true }]}
          >
            <Select
              allowClear
              options={specialDiseaseType}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              disabled={physicalExam ? true : false}
            />
          </Form.Item>

        </Col>
        <Col span={24}>
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
                  disabled={physicalExam ? true : false}
                >
                  <Input />
                </AutoComplete>
              </Form.Item>
            </Col>
            <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
              {physicalExam ? null : (
                <Button type="primary" onClick={isOpenSearchNV}>
                  Tìm kiếm NV
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item label="Họ lót" name="FIRST_NAME">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Tên" name="LAST_NAME">
            <Input disabled />
          </Form.Item>
          <Form.Item name="BOD" label="Ngày sinh">
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              disabled
              placeholder={false}
            />
          </Form.Item>
          <Form.Item name="START_WORKING_DATE" label="Ngày làm việc">
            <DatePicker
              format={formatDate.Type}
              style={{ width: "100%" }}
              disabled
              placeholder={false}
            />
          </Form.Item>
          <Form.Item name="GENDER" label="Giới tính">
            <Input disabled />
          </Form.Item>
          <Form.Item name="MARITAL_STATUS_NAME" label="Tình trạng hôn nhân">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="PHYSICAL_DATE"
            label="Ngày khám"
            rules={[{ required: true }]}
          >
            <DatePicker format={formatDate.Type} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="MEDICAL_EXAM_YEAR"
            label="Năm khám"
            initialValue={new Date().getFullYear()}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
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
          {/* <Form.Item
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
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input).toLowerCase())
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
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input).toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              onSelect={handleSelectCity}
              onClear={handleClearSelectCity}
              disabled={countryIdSelect ? false : true}
            ></Select>
          </Form.Item> */}
          {/* <Form.Item
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
              options={medicalFacilityOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input).toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "").localeCompare(
                  (optionB?.label ?? "").toLowerCase()
                )
              }
              disabled={cityIdSelect ? false : true}
            ></Select>
          </Form.Item> */}
          <Form.Item
            name="MEDICAL_FACILITY_NAME"
            label="Cơ sở khám"
            rules={[{ required: true }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item name="DEPARTMENT_WORKED_YEAR" label="Số năm làm việc">
            <Select
              style={{ width: "100%" }}
              options={YearWork}
              allowClear
              showSearch
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={20} xs={20} offset={2}>
          <Form.Item name="BRANCH_NAME" label="Nơi làm việc">
            <Input disabled />
          </Form.Item>
          <Form.Item name="CITY_NAME" label="Tỉnh/Thành làm việc">
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
          <Form.Item name="EMP_TYPE_NAME" label="Loại nhân viên">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Col pull={1}>
          <Form.Item>
            <Button
              htmlType="submit"
              onClick={handleOk}
              loading={loading}
            >
              Tiếp
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default FrmPersonalInformation;
