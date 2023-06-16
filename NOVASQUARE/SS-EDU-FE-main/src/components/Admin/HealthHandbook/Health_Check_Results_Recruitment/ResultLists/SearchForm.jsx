import { Button, Form, Input, Select, DatePicker, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import {
  healthResultRecruitmentData,
  healthStatusRecruitmentData,
} from "../../../../../common/dataJson";
import { formatDate, removeAccents } from "../../../../../common";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  genderOptionsState,
  genderState,
} from "../../../../../recoil/atom/genderState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  classificationData,
  departmentData,
  divisionData,
  genderData,
  positionData,
  unitData,
} from "../../../../../common/getAllApi";
import {
  departmentOptionsState,
  departmentState,
} from "../../../../../recoil/atom/departmentState";
import {
  divisionOptionsState,
  divisionState,
} from "../../../../../recoil/atom/divisionState";
import {
  unitOptionsState,
  unitState,
} from "../../../../../recoil/atom/unitState";
import {
  positionOptionsState,
  positionState,
} from "../../../../../recoil/atom/positionState";
import {
  physicalClassificationOptionsState,
  physicalClassificationState,
} from "../../../../../recoil/atom/physicalClassificationState";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const SearchForm = ({
  onOpenAddNew,
  setFilterEmployee,
  onSelectCountry,
  onClearCountry,
  isDisplayBtn,
  datas,
}) => {
  const genderOptions = useRecoilValue(genderOptionsState);
  const departOptions = useRecoilValue(departmentOptionsState);
  const divisionOptions = useRecoilValue(divisionOptionsState);
  const unitOptions = useRecoilValue(unitOptionsState);
  const positOptions = useRecoilValue(positionOptionsState);
  const classificationOptions = useRecoilValue(
    physicalClassificationOptionsState
  );
  const setClassificationList = useSetRecoilState(physicalClassificationState);
  const setPositionList = useSetRecoilState(positionState);
  const setUnitList = useSetRecoilState(unitState);
  const setDivisionList = useSetRecoilState(divisionState);
  const setDepartmentList = useSetRecoilState(departmentState);
  const setGenderList = useSetRecoilState(genderState);

  const [form] = Form.useForm();

  const handleSearch = () => {
    const data = { ...form.getFieldsValue() };
    setFilterEmployee(data);
  };

  const [startBOD, setStartBOD] = useState(null);
  const [startPhysicalDate, setStartPhysicalDate] = useState(null);
  const [dataOption, setDataOption] = useState([]);
  const [fullName, setFullName] = useState([]);
  useEffect(() => {
    if (datas) {
      const data = datas?.map((item) => ({
        label: item.CD,
        value: item.CD,
        key: item.id,
      }));
      const fullname = datas?.map((item) => ({
        label: item.FULL_NAME,
        value: item.FULL_NAME,
        key: item.id,
      }));

      setDataOption(data?.filter((item) => item?.value?.length > 0));
      setFullName(fullname);
    }
  }, [datas]);

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
    >
      <Row>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item name="STATUS" label="Trạng thái">
            <Select
              allowClear
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
              options={healthStatusRecruitmentData}
              placeholder="Chọn trạng thái"
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item name="RESULT" label="Kết luận">
            <Select
              allowClear
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
              onSelect={onSelectCountry}
              onClear={onClearCountry}
              options={healthResultRecruitmentData}
              placeholder="Chọn kết luận"
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item label="Mã số nhân viên" name="CD">
            {/* <Input style={{ marginRight: 20 }} allowClear /> */}
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
            {/* <Input allowClear /> */}
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              options={fullName}
              placeholder={false}
            />
          </Form.Item>
          <Form.Item name="GENDER_ID" label="Giới tính">
            <Select
              allowClear
              options={genderOptions}
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
              onFocus={() => genderData(genderOptions, setGenderList)}
            ></Select>
          </Form.Item>
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item name="PHYSICAL_CLASSIFY_ID" label="Phân loại">
            <Select
              allowClear
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
              options={classificationOptions}
              onFocus={() =>
                classificationData(classificationOptions, setClassificationList)
              }
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
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
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
          <Form.Item name="POSITION_ID" label="Cấp bậc">
            <Select
              allowClear
              options={positOptions}
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
              onFocus={() => positionData(positOptions, setPositionList)}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item
            label="Ngày tháng năm sinh"
            style={{
              marginBottom: 0,
              width: "100%",
            }}
          >
            <Form.Item
              name="START_BOD"
              style={{
                display: "inline-block",
                width: "45%",
              }}
            >
              <DatePicker
                format={formatDate.Type}
                disabledDate={(current) =>
                  current && current.valueOf() > Date.now()
                }
                placeholder={false}
                onChange={(value) => setStartBOD(value)}
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
              name="END_BOD"
              style={{
                display: "inline-block",
                width: "45%",
              }}
            >
              <DatePicker
                format={formatDate.Type}
                disabledDate={(current) =>
                  current && current.valueOf() < new Date(startBOD).getTime()
                }
                placeholder={false}
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
          <Form.Item
            label="Ngày khám"
            style={{
              marginBottom: 0,
              width: "100%",
            }}
          >
            <Form.Item
              name="START_PHYSICAL_DATE"
              style={{
                display: "inline-block",
                width: "45%",
              }}
            >
              <DatePicker
                format={formatDate.Type}
                disabledDate={(current) =>
                  current && current.valueOf() > Date.now()
                }
                placeholder={false}
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
              name="END_PHYSICAL_DATE"
              style={{
                display: "inline-block",
                width: "45%",
              }}
            >
              <DatePicker
                format={formatDate.Type}
                disabledDate={(current) =>
                  current &&
                  current.valueOf() < new Date(startPhysicalDate).getTime()
                }
                placeholder={false}
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={11} offset={10}>
          <Button
            type="primary"
            onClick={() => handleSearch()}
            style={{ width: 150 }}
          >
            <SearchOutlined style={{ fontSize: 18 }} />
            Tìm kiếm
          </Button>
        </Col>
        {isDisplayBtn && (
          <Col span={3}>
            <Button
              onClick={() => onOpenAddNew()}
              title="Create"
              type="primary"
              style={{
                display: "block",
                width: "100%",
              }}
              icon={<PlusOutlined />}
            >
              Thêm mới{" "}
            </Button>
          </Col>
        )}
      </Row>
    </Form>
  );
};
export default SearchForm;
