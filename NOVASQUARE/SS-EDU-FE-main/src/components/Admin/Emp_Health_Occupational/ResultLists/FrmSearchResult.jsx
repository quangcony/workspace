import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import React from "react";
import {
  yearData, WorkNumberDay, WorkNumberMonth,
  WorkNumberYear, YearOfWork, removeAccents, formatDate,
} from "../../../../common";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cityOptionsState, cityState } from "../../../../recoil/atom/cityState";
import { positionOptionsState, positionState } from "../../../../recoil/atom/positionState";
import { genderOptionsState, genderState } from "../../../../recoil/atom/genderState";
import { departmentOptionsState, departmentState } from "../../../../recoil/atom/departmentState";
import { areaOptionsState, areaState } from "../../../../recoil/atom/areaState";
import { unitOptionsState, unitState } from "../../../../recoil/atom/unitState";
import { maritalOptionsState, maritalState } from "../../../../recoil/atom/maritalState";
import { employeeTypeOptionsState, employeeTypeState } from "../../../../recoil/atom/employeeTypeState";
import { divisionOptionsState, divisionState } from "../../../../recoil/atom/divisionState";
import { workPlaceOptionsState, workPlacesState } from "../../../../recoil/atom/workPlaceState";
import {
  areaData, cityData, departmentData, divisionData,
  employeeContractTypeData, genderData, maritalStatusData,
  positionData, unitData, workPlaceData
} from "../../../../common/getAllApi";

const { Option } = Select;

const FrmSearchResult = ({
  onOpenAddNew,
  setFilterEmployee,
  specialDiseaseType,
}) => {
  const cityOptions = useRecoilValue(cityOptionsState);
  const positionOptions = useRecoilValue(positionOptionsState);
  const departOptions = useRecoilValue(departmentOptionsState);
  const genderOptions = useRecoilValue(genderOptionsState);
  const areaOptions = useRecoilValue(areaOptionsState);
  const unitOptions = useRecoilValue(unitOptionsState);
  const maritalOptions = useRecoilValue(maritalOptionsState);
  const employeeTypeOptions = useRecoilValue(employeeTypeOptionsState);
  const divisionOptions = useRecoilValue(divisionOptionsState);
  const workPlaceOptions = useRecoilValue(workPlaceOptionsState);
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

  const [form] = Form.useForm();
  const NumberDay = WorkNumberDay();
  const NumberMonth = WorkNumberMonth();
  const NumberYear = WorkNumberYear();
  const YearWork = YearOfWork();

  const handleSearch = () => {
    const data = { ...form.getFieldsValue() }
    console.log(data);
    setFilterEmployee(() => data);
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
      labelCol={{
        xs: { span: 8 },
        lg: { span: 10 }
      }}
      labelWrap
    >
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12} xl={6}>
          <Form.Item label="Họ" name="FIRST_NAME">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="Tên" name="LAST_NAME">
            <Input allowClear />
          </Form.Item>
          <Form.Item label="Mã số NV" name="CD">
            <Input allowClear />
          </Form.Item>
          <Form.Item name="BOD" label="Ngày sinh">
            <DatePicker allowClear format={formatDate.Type} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="START_WORKING_DATE" label="Ngày vào làm">
            <DatePicker allowClear format={formatDate.Type} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="BRANCH_ID" label="Nơi làm việc">
            <Select
              allowClear
              options={workPlaceOptions}
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
              onFocus={() => workPlaceData(workPlaceOptions, setWorkPlaceList)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} xl={6}>
          <Form.Item name="CITY_ID" label="Tỉnh/Thành LV">
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
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onFocus={() => cityData(cityOptions, setCityList)}
            />
          </Form.Item>
          <Form.Item name="AREA_ID" label="Khối">
            <Select
              allowClear
              options={areaOptions}
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
              onFocus={() => areaData(areaOptions, setAreaList)}
            />
          </Form.Item>
          <Form.Item name="DEPT_ID" label="Phòng ban">
            <Select
              allowClear
              options={departOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input).toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onFocus={() => departmentData(departOptions, setDepartmentList)}
            />
          </Form.Item>
          <Form.Item name="DIVISION_ID" label="Bộ phận">
            <Select
              allowClear
              options={divisionOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input).toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onFocus={() => divisionData(divisionOptions, setDivisionList)}
            />
          </Form.Item>
          <Form.Item name="UNIT_ID" label="Đơn vị">
            <Select
              allowClear
              options={unitOptions}
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
              onFocus={() => unitData(unitOptions, setUnitList)}
            />
          </Form.Item>
          <Form.Item name="POSITION_ID" label="Cấp bậc">
            <Select
              allowClear
              options={positionOptions}
              showSearch
              filterOption={(input, option) =>
                removeAccents(option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input).toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              onFocus={() => positionData(positionOptions, setPositionList)}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} xl={12}>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} xl={12}>
              <Form.Item name="EMP_TYPE_ID" label="Loại nhân viên">
                <Select
                  allowClear
                  options={employeeTypeOptions}
                  showSearch
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onFocus={() => employeeContractTypeData(employeeTypeOptions, setEmployeeTypeList)}
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
                      .includes(removeAccents(input).toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onFocus={() => genderData(genderOptions, setGenderList)}
                />
              </Form.Item>
              <Form.Item name="MARITAL_STATUS_ID" label="TT hôn nhân">
                <Select
                  allowClear
                  options={maritalOptions}
                  showSearch
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  onFocus={() => maritalStatusData(maritalOptions, setMaritalList)}
                />
              </Form.Item>
              <Form.Item name="MEDICAL_EXAM_YEAR" label="Năm khám">
                <Select
                  style={{ width: "100%" }}
                  allowClear
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
            <Col xs={24} md={12} xl={12}>
              <Form.Item name="PHYSICAL_DATE" label="Ngày khám">
                <DatePicker
                  format={formatDate.Type}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item name="MEDICAL_FACILITY_NAME" label="Cơ sở khám">
                <Input allowClear />
              </Form.Item>
              <Form.Item name="YEAR_WORK" label="Số năm làm việc">
                <Select style={{ width: "100%" }} options={YearWork} allowClear />
              </Form.Item>
              <Form.Item name="SPECIAL_DISEASE_TYPE" label="Bệnh nghề nghiệp">
                <Select
                  allowClear
                  showSearch
                  options={specialDiseaseType}
                  filterOption={(input, option) =>
                    removeAccents(option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input).toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row gutter={24}>
                <Col md={6} xs={24}>
                  <p>Số năm làm việc thực tế: </p>
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
      <Row>
        <Col span={13} offset={10}>
          <Button
            type="primary"
            onClick={() => handleSearch()}
            style={{ width: 150 }}
          >
            <SearchOutlined style={{ fontSize: 18 }} />
            Tìm kiếm
          </Button>
        </Col>
        <Col span={1}>
          <Button
            onClick={() => onOpenAddNew()}
            title="Create"
            type="primary"
            style={{
              display: "block",
            }}
            icon={<PlusOutlined />}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default FrmSearchResult;
