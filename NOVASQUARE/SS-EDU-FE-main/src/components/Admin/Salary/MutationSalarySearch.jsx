import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SelectMonth, yearData } from "../../../common";
import {
  areaData,
  departmentData,
  divisionData,
  positionData,
} from "../../../common/getAllApi";
import i18n from "../../../lib/Language";
import { areaOptionsState, areaState } from "../../../recoil/atom/areaState";
import {
  departmentOptionsState,
  departmentState,
} from "../../../recoil/atom/departmentState";
import {
  divisionOptionsState,
  divisionState,
} from "../../../recoil/atom/divisionState";
import { employeeState } from "../../../recoil/atom/employeeState";
import {
  positionOptionsState,
  positionState,
} from "../../../recoil/atom/positionState";

const MutationSalarySearch = ({
  formRef,
  onChange,
  workingStatus,
  setSearchValue,
  setSelectedRowKeys,
  setSalarySelect,
}) => {
  const NumberMonth = SelectMonth();
  const employees = useRecoilValue(employeeState);

  const [form] = Form.useForm();
  const areaOptions = useRecoilValue(areaOptionsState);
  const departOptions = useRecoilValue(departmentOptionsState);
  const divisionOptions = useRecoilValue(divisionOptionsState);
  const positOptions = useRecoilValue(positionOptionsState);
  const [dataOption, setDataOption] = useState([]);
  const setDepartmentList = useSetRecoilState(departmentState);
  const setDivisionList = useSetRecoilState(divisionState);
  const setAreaList = useSetRecoilState(areaState);
  const setPositionList = useSetRecoilState(positionState);
  const handleSearch = () => {
    const newData = { ...form.getFieldValue() };

    setSearchValue(newData);
    setSelectedRowKeys([]);
    setSalarySelect([]);
  };
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
  return (
    <Row>
      <Col
        xs={{
          span: 24,
        }}
        lg={{
          span: 20,
          offset: 2,
        }}
      >
        <Form
          ref={formRef}
          form={form}
          name="basic"
          autoComplete="off"
          scrollToFirstError
          labelCol={{
            span: 4,
          }}
          labelAlign="left"
        >
          <Row>
            <Col span={8}>
              <Form.Item
                name="SALARY_MONTH"
                label="Tháng"
                labelCol={{
                  xs: { span: 4 },
                  lg: { span: 9 },
                }}
              >
                <Select
                  style={{ width: "100%" }}
                  allowClear
                  options={NumberMonth}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ marginLeft: "20px" }}
                name="SALARY_YEAR"
                label="Năm"
                labelCol={{
                  xs: { span: 4 },
                  lg: { span: 8 },
                }}
              >
                <Select showSearch allowClear style={{ width: "50%" }}>
                  {yearData &&
                    yearData.map((item, index) => (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                labelCol={{
                  xs: { span: 4 },
                  lg: { span: 6 },
                }}
                label="Trạng thái"
                name="STATUS"
                style={{ marginLeft: "20px" }}
              >
                <Select allowClear showSearch options={workingStatus} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="USER_ID"
                label="Mã nhân viên"
                labelCol={{
                  xs: { span: 4 },
                  lg: { span: 9 },
                }}
              >
                <Select
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  options={dataOption}
                  placeholder={false}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="AREAS"
                label="Khối"
                labelCol={{
                  xs: { span: 4 },
                  lg: { span: 9 },
                }}
              >
                <Select
                  allowClear
                  options={areaOptions}
                  showSearch
                  onFocus={() => areaData(areaOptions, setAreaList)}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ marginLeft: "20px" }}
                name="DEPARTMENTS"
                label="Phòng ban"
                labelCol={{
                  xs: { span: 4 },
                  lg: { span: 8 },
                }}
              >
                <Select
                  allowClear
                  options={departOptions}
                  showSearch
                  onFocus={() =>
                    departmentData(departOptions, setDepartmentList)
                  }
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="DIVISIONS"
                label="Bộ phận"
                labelCol={{
                  xs: { span: 4 },
                  lg: { span: 9 },
                }}
              >
                <Select
                  allowClear
                  options={divisionOptions}
                  showSearch
                  onFocus={() => divisionData(divisionOptions, setDivisionList)}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ marginLeft: "20px" }}
                name="POSITIONS"
                label="Cấp bậc"
                labelCol={{
                  xs: { span: 4 },
                  lg: { span: 8 },
                }}
              >
                <Select
                  allowClear
                  options={positOptions}
                  showSearch
                  onFocus={() => positionData(positOptions, setPositionList)}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={13} offset={10}>
              <Button
                type="primary"
                style={{ width: 150 }}
                onClick={() => handleSearch()}
              >
                <SearchOutlined style={{ fontSize: 18 }} />
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default MutationSalarySearch;
