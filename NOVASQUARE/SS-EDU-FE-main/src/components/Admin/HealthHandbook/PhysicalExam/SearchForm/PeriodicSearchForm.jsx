import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
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
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useSearch } from "react-use-search";
import {
  formatDate,
  removeAccents,
  WorkNumberDay,
  WorkNumberMonth,
  WorkNumberYear,
  yearData,
} from "../../../../../common";
import i18n from "../../../../../lib/Language";
import {
  cityOptionsState,
  cityState,
} from "../../../../../recoil/atom/cityState";

import Modal from "antd/lib/modal/Modal";
import { useHistory } from "react-router-dom";
import moduleApi from "../../../../../api/moduleApi";
import {
  areaData,
  cityData,
  departmentData,
  divisionData,
  employeeContractTypeData,
  genderData,
  maritalStatusData,
  positionData,
  unitData,
  workPlaceData,
} from "../../../../../common/getAllApi";
import Permissions_CD from "../../../../../data_json/Permissions_CD.json";
import {
  areaOptionsState,
  areaState,
} from "../../../../../recoil/atom/areaState";
import {
  departmentOptionsState,
  departmentState,
} from "../../../../../recoil/atom/departmentState";
import {
  divisionOptionsState,
  divisionState,
} from "../../../../../recoil/atom/divisionState";
import {
  employeeState,
  filterEmployeeState,
} from "../../../../../recoil/atom/employeeState";
import {
  employeeTypeOptionsState,
  employeeTypeState,
} from "../../../../../recoil/atom/employeeTypeState";
import {
  genderOptionsState,
  genderState,
} from "../../../../../recoil/atom/genderState";
import { generalState } from "../../../../../recoil/atom/generalState";
import {
  maritalOptionsState,
  maritalState,
} from "../../../../../recoil/atom/maritalState";
import {
  positionOptionsState,
  positionState,
} from "../../../../../recoil/atom/positionState";
import {
  unitOptionsState,
  unitState,
} from "../../../../../recoil/atom/unitState";
import {
  workPlaceOptionsState,
  workPlacesState,
} from "../../../../../recoil/atom/workPlaceState";
import { findExistance } from "../../../../../utils/findExistance";
import PeriodicSearchFormAdvance from "./PeriodicSearchFormAdvance";
import { isSearchState } from "../../../../../recoil/atom/booleanState";
import { physicalExamOptionState } from "../../../../../recoil/atom/physicalExamState";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const predicate = (medicalFacilitys, query) => {
  const newQuery = removeAccents(String(query))?.toLowerCase()?.trim();
  const medicalName = removeAccents(String(medicalFacilitys?.label))
    .toLowerCase()
    .trim();
  return medicalName.includes(newQuery);
};

const PeriodicSearchForm = ({ onOpenAddNew }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [filterEmployee, setFilterEmployee] =
    useRecoilState(filterEmployeeState);

  const cityOptions = useRecoilValue(cityOptionsState);
  const workPlaceOptions = useRecoilValue(workPlaceOptionsState);
  const unitOptions = useRecoilValue(unitOptionsState);
  const areaOptions = useRecoilValue(areaOptionsState);
  const divisionOptions = useRecoilValue(divisionOptionsState);
  const maritalOptions = useRecoilValue(maritalOptionsState);
  const positOptions = useRecoilValue(positionOptionsState);
  const departOptions = useRecoilValue(departmentOptionsState);
  const genderOptions = useRecoilValue(genderOptionsState);
  const emplyeeTypeOptions = useRecoilValue(employeeTypeOptionsState);
  const employees = useRecoilValue(employeeState);
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
  const { moduleSelected } = useRecoilValue(generalState);
  const isSearch = useRecoilValue(isSearchState);

  const [dataOption, setDataOption] = useState([]);
  const [selectYear, setSelectYear] = useState(undefined);
  const [permissionsCD, setPermissionsCD] = useState();
  const physicalExamOption = useRecoilValue(physicalExamOptionState);
  const [startPhysicalDate, setStartPhysicalDate] = useState(null);
  const [startInputDate, setStartInputDate] = useState(null);
  const [medicalFacilitys, setMedicalFacilitys] = useState([]);

  const handleSearch = () => {
    const data = { ...form.getFieldsValue() };
    setFilterEmployee({ ...filterEmployee, ...data });
  };

  useEffect(() => {
    //get permissions of current user to page
    (async () => {
      const response = await moduleApi.getPermissionsByModuleId(
        moduleSelected?.id
      );
      if (response.status === 200 && response.data.elements.length > 0) {
        const temp = [
          ...response.data.elements.map((item) => item.PERMISSION_CD),
        ];
        setPermissionsCD(temp);
      } else {
        setPermissionsCD([]);
        history.push("/");
      }
    })();
  }, []);

  const [filteredDatas, query, handleChange] = useSearch(
    medicalFacilitys,
    predicate,
    {
      debounce: 200,
    }
  );

  useEffect(() => {
    setDataOption(() =>
      employees.map((item) => ({
        label: item.CD,
        value: item.CD,
        key: item.id,
        ...item,
      }))
    );
  }, [employees]);

  // MODIFILE LIST MEDICAL FACILITI NAME
  useEffect(() => {
    if (physicalExamOption) {
      const listData = physicalExamOption?.filter(
        (item) =>
          item?.MEDICAL_FACILITY_NAME !== null &&
          item?.MEDICAL_FACILITY_NAME?.length !== 0
      );
      // function unique(arr) {
      //   var newArr = [];
      //   var newArr1 = [];
      //   for (var i = 0; i < arr.length; i++) {
      //     if (!newArr.includes(arr[i]?.MEDICAL_FACILITY_NAME)) {
      //       newArr.push(arr[i]?.MEDICAL_FACILITY_NAME);
      //       newArr1.push({ ...arr[i] });
      //     }
      //   }
      //   return newArr1;
      // }
      function unique(arr) {
        var newArr = [];
        for (var i = 0; i < arr?.length; i++) {
          const abc = newArr?.some((item) => {
            const key = removeAccents(item?.MEDICAL_FACILITY_NAME)
              ?.toLowerCase()
              ?.trim();
            const match = removeAccents(arr[i]?.MEDICAL_FACILITY_NAME)
              ?.toLowerCase()
              ?.trim();
            return match?.includes(key);
          });
          if (!abc) {
            newArr.push({ ...arr[i] });
          }
        }
        return newArr;
      }
      setMedicalFacilitys(
        unique(listData).map((item) => ({
          label: item.MEDICAL_FACILITY_NAME,
          value: item.MEDICAL_FACILITY_NAME,
          key: item.id,
        }))
      );
    }
  }, [physicalExamOption]);

  const handleSelectYear = (value) => {
    setSelectYear(value);
  };
  const handleClearSelectYear = () => {
    setSelectYear(undefined);
    form.setFieldsValue({
      WORKYEAR: null,
      WORKMONTH: null,
      WORKDAY: null,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModalSearch = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        style={{ margin: "30px 0px" }}
        labelAlign="left"
      >
        <Row>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item label="Mã số NV" name="CD">
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                options={dataOption}
                placeholder={false}
              />
            </Form.Item>
            <Form.Item label="Họ và tên" name="FULL_NAME">
              <Input allowClear />
            </Form.Item>
            <Form.Item
              name="BOD"
              label="Ngày tháng năm sinh"
              // labelCol={{ span: 8 }}
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
            <Form.Item name="GENDER" label="Giới tính">
              <Select
                allowClear
                options={genderOptions}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.trim().toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onFocus={() => genderData(genderOptions, setGenderList)}
              ></Select>
            </Form.Item>
            <Form.Item name="MARITAL_STATUS_ID" label="TT hôn nhân">
              <Select
                allowClear
                options={maritalOptions}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.trim().toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onFocus={() =>
                  maritalStatusData(maritalOptions, setMaritalList)
                }
              ></Select>
            </Form.Item>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item name="MEDICAL_FACILITY_NAME" label="Cơ sở khám">
              <AutoComplete
                options={filteredDatas}
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                allowClear
                showSearch
              >
                <Input />
              </AutoComplete>
            </Form.Item>
            <Form.Item name="AREA_ID" label="Khối">
              <Select
                allowClear
                options={areaOptions}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "").localeCompare(
                    (optionB?.label ?? "").toLowerCase()
                  )
                }
                onFocus={() => areaData(areaOptions, setAreaList)}
              ></Select>
            </Form.Item>
            <Form.Item name="DEPT_ID" label="Phòng ban">
              <Select
                allowClear
                options={departOptions}
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
                onFocus={() => departmentData(departOptions, setDepartmentList)}
              ></Select>
            </Form.Item>
            <Form.Item name="DIVISION_ID" label="Bộ phận">
              <Select
                allowClear
                options={divisionOptions}
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
                onFocus={() => divisionData(divisionOptions, setDivisionList)}
                loading={divisionOptions ? false : true}
              ></Select>
            </Form.Item>
            <Form.Item name="UNIT_ID" label="Đơn vị">
              <Select
                allowClear
                options={unitOptions}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "").localeCompare(
                    (optionB?.label ?? "").toLowerCase()
                  )
                }
                onFocus={() => unitData(unitOptions, setUnitList)}
              ></Select>
            </Form.Item>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item name="POSITION_ID" label="Cấp bậc">
              <Select
                mode="multiple"
                allowClear
                showSearch
                style={{
                  width: "100%",
                }}
                options={positOptions}
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.trim().toLowerCase()))
                }
                placeholder={false}
                onFocus={() => positionData(positOptions, setPositionList)}
              />
            </Form.Item>
            <Form.Item name="EMP_TYPE_ID" label="Loại nhân viên">
              <Select
                allowClear
                options={emplyeeTypeOptions}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.trim().toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                onFocus={() =>
                  employeeContractTypeData(
                    emplyeeTypeOptions,
                    setEmployeeTypeList
                  )
                }
              ></Select>
            </Form.Item>
            <Form.Item name="BRANCH_ID" label="Nơi làm việc">
              <Select
                allowClear
                options={workPlaceOptions}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.toLowerCase()))
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "").localeCompare(
                    (optionB?.label ?? "").toLowerCase()
                  )
                }
                onFocus={() =>
                  workPlaceData(workPlaceOptions, setWorkPlaceList)
                }
              ></Select>
            </Form.Item>
            <Form.Item name="CITY_ID" label="Tỉnh/Thành làm việc">
              <Select
                allowClear
                options={cityOptions}
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
                onFocus={() => cityData(cityOptions, setCityList)}
              ></Select>
            </Form.Item>
            <Form.Item name="RECORD_CD" label="Số hồ sơ">
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Ngày vào làm"
              style={{
                marginBottom: 0,
                width: "100%",
              }}
            >
              <Form.Item
                name="START_WORKING_DATE"
                style={{
                  display: "inline-block",
                  width: "45%",
                }}
              >
                <DatePicker
                  format={formatDate.Type}
                  placeholder={false}
                  disabledDate={(current) =>
                    current && current.valueOf() > Date.now()
                  }
                  onChange={(value) => setStartInputDate(value)}
                />
              </Form.Item>
              <span
                style={{
                  display: "inline-block",
                  width: "10%",
                  lineHeight: "32px",
                  textAlign: "center",
                }}
              >
                -
              </span>
              <Form.Item
                name="END_DATE"
                style={{
                  display: "inline-block",
                  width: "45%",
                }}
              >
                <DatePicker
                  format={formatDate.Type}
                  placeholder={false}
                  disabledDate={(current) =>
                    current &&
                    current.valueOf() < new Date(startInputDate).getTime()
                  }
                />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Ngày khám"
              style={{
                marginBottom: 0,
              }}
            >
              <Form.Item
                name="PHYSICAL_DATE"
                style={{
                  display: "inline-block",
                  width: "45%",
                }}
              >
                <DatePicker
                  format={formatDate.Type}
                  placeholder={false}
                  disabledDate={(current) =>
                    current && current.valueOf() > Date.now()
                  }
                  onChange={(value) => setStartPhysicalDate(value)}
                />
              </Form.Item>
              <span
                style={{
                  display: "inline-block",
                  width: "10%",
                  lineHeight: "32px",
                  textAlign: "center",
                }}
              >
                -
              </span>
              <Form.Item
                name="PHYSICAL_DATE_END"
                style={{
                  display: "inline-block",
                  width: "45%",
                }}
              >
                <DatePicker
                  format={formatDate.Type}
                  placeholder={false}
                  disabledDate={(current) =>
                    current &&
                    current.valueOf() < new Date(startPhysicalDate).getTime()
                  }
                />
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              name="MEDICAL_EXAM_YEAR"
              label="Năm khám"
              initialValue={new Date().getFullYear()}
            >
              <Select
                style={{ width: "100%" }}
                allowClear
                onSelect={handleSelectYear}
                onClear={handleClearSelectYear}
              >
                {yearData &&
                  yearData.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24}>
            <Form.Item label="Thâm niên" labelCol={{ span: 4 }}>
              <Row gutter={24}>
                <Col md={8} xs={8}>
                  <Row gutter={12}>
                    <Col span={14}>
                      <Form.Item name="WORKYEAR">
                        <Select
                          style={{ width: "100%" }}
                          allowClear
                          options={WorkNumberYear()}
                          showSearch
                          disabled={selectYear ? false : true}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <p style={{ paddingTop: 5 }}>Năm</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={8} xs={8}>
                  <Row gutter={12}>
                    <Col span={14}>
                      <Form.Item name="WORKMONTH">
                        <Select
                          allowClear
                          showSearch
                          options={WorkNumberMonth()}
                          disabled={selectYear ? false : true}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <p style={{ paddingTop: 5 }}>Tháng</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={8} xs={8}>
                  <Row gutter={12}>
                    <Col span={14}>
                      <Form.Item name="WORKDAY">
                        <Select
                          allowClear
                          showSearch
                          options={WorkNumberDay()}
                          disabled={selectYear ? false : true}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <p style={{ paddingTop: 5 }}>Ngày</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span={8}>
            <Button
              type="primary"
              onClick={showModalSearch}
              danger={isSearch ? true : false}
            >
              {isSearch ? "Bạn đang tìm kiếm nâng cao" : "Tìm kiếm nâng cao"}
            </Button>
          </Col>
          <Col span={6} offset={2}>
            <Button
              type="primary"
              onClick={() => handleSearch()}
              style={{ width: 150 }}
            >
              <SearchOutlined style={{ fontSize: 18 }} />
              Tìm kiếm
            </Button>
          </Col>
          <Col span={3} offset={5}>
            <Button
              onClick={() => onOpenAddNew()}
              title={i18n.t("general.button.btnCreate")}
              type="primary"
              style={{
                display: "block",
                width: "100%",
              }}
              icon={<PlusOutlined />}
              disabled={!findExistance(permissionsCD, Permissions_CD.create)}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal
        title="Tìm kiếm nâng cao"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        style={{ top: 20 }}
        footer={false}
      >
        <PeriodicSearchFormAdvance onCancel={handleCancel} />
      </Modal>
    </>
  );
};
export default PeriodicSearchForm;
