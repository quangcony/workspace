import { Button, Form, Input, Select, Row, Col, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import {
  handleBlockEnter,
  removeAccents,
  selectOptions,
} from "../../../../../common";
import {
  CaretRightOutlined,
  CloseOutlined,
  SearchOutlined,
  Loading3QuartersOutlined,
  LoadingOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import i18n from "../../../../../lib/Language";
import { useDiseaseStatus } from "../../../../../hooks/diseaseStatus";
import NumericInput from "../../../../NumericInput/NumericInput";
import { useRecoilState, useRecoilValue } from "recoil";
import { isSearchState } from "../../../../../recoil/atom/booleanState";
import { filterEmployeeState } from "../../../../../recoil/atom/employeeState";
import {
  diseaseOptionsState,
  diseasesState,
} from "../../../../../recoil/atom/diseaseState";
import { useDisease } from "../../../../../hooks/disease";
import { diseasesData } from "../../../../../common/getAllApi";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
    offset: 1,
  },
  wrapperCol: {
    span: 16,
  },
};

const styleSetWidth = {
  widthItem: {
    marginBottom: 0,
    width: "100%",
  },
  widthInput: {
    display: "inline-block",
    width: "20%",
    textAlign: "center",
  },
  widthSpan: {
    display: "inline-block",
    width: "10%",
    lineHeight: "32px",
    textAlign: "center",
  },
  widthUnit: {
    display: "inline-block",
    width: "15%",
    marginLeft: "5%",
  },
  color: {
    color: "#0288d1",
  },
  styleClick: {
    cursor: "pointer",
    textDecoration: "underline",
  },
};

const PeriodicSearchFormAdvance = ({ onCancel }) => {
  useDisease();
  const [form] = Form.useForm();
  const { diseasesStatus } = useDiseaseStatus();
  const [diseaseStatusOption, setDiseaseStatusOption] = useState([]);
  const [isSearch, setIsSearch] = useRecoilState(isSearchState);
  const [filterEmployee, setFilterEmployee] =
    useRecoilState(filterEmployeeState);

  const [heightMin, setHeightMin] = useState(null);
  const [heightMax, setHeightMax] = useState(null);
  const [unitHeight, setUnitHeight] = useState("cm");
  const [glucoseMin, setGlucoseMin] = useState(null);
  const [glucoseMax, setGlucoseMax] = useState(null);
  const [unitGlucose, setUnitGlucose] = useState("mmol/L");
  const [UreaMin, setUreaMin] = useState(null);
  const [UreaMax, setUreaMax] = useState(null);
  const [unitUrea, setUnitUrea] = useState(null);
  const [CreatininMin, setCreatininMin] = useState(null);
  const [CreatininMax, setCreatininMax] = useState(null);
  const [unitCreatinin, setUnitCreatinin] = useState(null);
  const [CholesterolMin, setCholesterolMin] = useState(null);
  const [CholesterolMax, setCholesterolMax] = useState(null);
  const [unitCholesterol, setUnitCholesterol] = useState(null);
  const [HDLMin, setHDLMin] = useState(null);
  const [HDLMax, setHDLMax] = useState(null);
  const [unitHDL, setUnitHDL] = useState(null);
  const [LDLMin, setLDLMin] = useState(null);
  const [LDLMax, setLDLMax] = useState(null);
  const [unitLDL, setUnitLDL] = useState(null);
  const [TriglyMin, setTriglyMin] = useState(null);
  const [TriglyMax, setTriglyMax] = useState(null);
  const [CanxiMin, setCanxiMin] = useState(null);
  const [CanxiMax, setCanxiMax] = useState(null);
  const [unitTrigly, setUnitTrigly] = useState(null);
  const [unitCanxi, setUnitCanxi] = useState(null);
  const diseaseOptions = useRecoilValue(diseaseOptionsState);

  const [isReset, setIsReset] = useState(false);
  const [isBloodPressure, setIsBloodPressure] = useState(false);
  const [isBloodAnalysis, setIsBloodAnalysis] = useState(false);
  const [isRenal, setIsRenal] = useState(false);
  const [isLiverEnzyme, setIsLiverEnzyme] = useState(false);
  const [isBloodLipid, setIsBloodLipid] = useState(false);
  const [statusInput, setStatusInput] = useState("");

  useEffect(() => {
    if (diseasesStatus && diseasesStatus.length > 0) {
      function unique(arr) {
        var newArr = [];
        for (var i = 0; i < arr?.length; i++) {
          const abc = newArr?.some((item) => {
            const key = removeAccents(item?.NAME)?.toLowerCase()?.trim();
            const match = removeAccents(arr[i]?.NAME)?.toLowerCase()?.trim();
            return match?.includes(key);
          });
          if (!abc) {
            newArr.push({ ...arr[i] });
          }
        }
        return newArr;
      }
      setDiseaseStatusOption(selectOptions(unique(diseasesStatus)));
    } else {
      setDiseaseStatusOption([]);
    }
  }, [diseasesStatus]);

  const handleSearch = () => {
    const data = { ...form.getFieldsValue() };
    const {
      END_HEIGHT,
      START_HEIGHT,
      END_GLUCOSE,
      START_GLUCOSE,
      END_CREATININ,
      END_UREA,
      START_CREATININ,
      START_UREA,
      END_BLOOD_CALCIUM_RESULT,
      END_CHOLESTEROL,
      END_HDL,
      END_LDL,
      END_TRIGLYCERIDE,
      START_BLOOD_CALCIUM_RESULT,
      START_CHOLESTEROL,
      START_HDL,
      START_LDL,
      START_TRIGLYCERIDE,
      DISEASE_STATUS_NAME,
      ...newData
    } = data;

    const result = {
      ...newData,
      DISEASE_STATUS_NAME: [...statusInput],
      END_HEIGHT:
        unitHeight === "cm"
          ? Number(END_HEIGHT) > 0
            ? (Number(END_HEIGHT) / 100).toFixed(2)
            : undefined
          : Number(END_HEIGHT) > 0
          ? END_HEIGHT
          : undefined,

      START_HEIGHT:
        unitHeight === "cm"
          ? Number(START_HEIGHT) > 0
            ? (Number(START_HEIGHT) / 100).toFixed(2)
            : undefined
          : Number(START_HEIGHT) > 0
          ? START_HEIGHT
          : undefined,

      START_GLUCOSE:
        unitGlucose === "mg/dL"
          ? Number(START_GLUCOSE) > 0
            ? (Number(START_GLUCOSE) * 0.055).toFixed(1)
            : undefined
          : Number(START_GLUCOSE) > 0
          ? START_GLUCOSE
          : undefined,
      END_GLUCOSE:
        unitGlucose === "mg/dL"
          ? Number(END_GLUCOSE) > 0
            ? (Number(END_GLUCOSE) * 0.055).toFixed(1)
            : undefined
          : Number(END_GLUCOSE) > 0
          ? END_GLUCOSE
          : undefined,

      START_UREA:
        unitGlucose === "mg/dL"
          ? Number(START_UREA) > 0
            ? (Number(START_UREA) * 0.166).toFixed(1)
            : undefined
          : Number(START_UREA) > 0
          ? START_UREA
          : undefined,
      END_UREA:
        unitGlucose === "mg/dL"
          ? Number(END_UREA) > 0
            ? (Number(END_UREA) * 0.166).toFixed(1)
            : undefined
          : Number(END_UREA) > 0
          ? END_UREA
          : undefined,

      START_CREATININ:
        unitGlucose === "mg/dL"
          ? Number(START_CREATININ) > 0
            ? (Number(START_CREATININ) * 88.4).toFixed(1)
            : undefined
          : Number(START_CREATININ) > 0
          ? START_CREATININ
          : undefined,
      END_CREATININ:
        unitGlucose === "mg/dL"
          ? Number(END_CREATININ) > 0
            ? (Number(END_CREATININ) * 88.4).toFixed(1)
            : undefined
          : Number(END_CREATININ) > 0
          ? END_CREATININ
          : undefined,

      START_CHOLESTEROL:
        unitGlucose === "mg/dL"
          ? Number(START_CHOLESTEROL) > 0
            ? (Number(START_CHOLESTEROL) * 0.02586).toFixed(1)
            : undefined
          : Number(START_CHOLESTEROL) > 0
          ? START_CHOLESTEROL
          : undefined,
      END_CHOLESTEROL:
        unitGlucose === "mg/dL"
          ? Number(END_CHOLESTEROL) > 0
            ? (Number(END_CHOLESTEROL) * 0.02586).toFixed(1)
            : undefined
          : Number(END_CHOLESTEROL) > 0
          ? END_CHOLESTEROL
          : undefined,

      START_HDL:
        unitGlucose === "mg/dL"
          ? Number(START_HDL) > 0
            ? (Number(START_HDL) * 0.0259).toFixed(1)
            : undefined
          : Number(START_HDL) > 0
          ? START_HDL
          : undefined,
      END_HDL:
        unitGlucose === "mg/dL"
          ? Number(END_HDL) > 0
            ? (Number(END_HDL) * 0.0259).toFixed(1)
            : undefined
          : Number(END_HDL) > 0
          ? END_HDL
          : undefined,

      START_LDL:
        unitGlucose === "mg/dL"
          ? Number(START_LDL) > 0
            ? (Number(START_LDL) * 0.0259).toFixed(1)
            : undefined
          : Number(START_LDL) > 0
          ? START_LDL
          : undefined,
      END_LDL:
        unitGlucose === "mg/dL"
          ? Number(END_LDL) > 0
            ? (Number(END_LDL) * 0.0259).toFixed(1)
            : undefined
          : Number(END_LDL) > 0
          ? END_LDL
          : undefined,

      START_TRIGLYCERIDE:
        unitGlucose === "mg/dL"
          ? Number(START_TRIGLYCERIDE) > 0
            ? (Number(START_TRIGLYCERIDE) * 0.01126).toFixed(1)
            : undefined
          : Number(START_TRIGLYCERIDE) > 0
          ? START_TRIGLYCERIDE
          : undefined,
      END_TRIGLYCERIDE:
        unitGlucose === "mg/dL"
          ? Number(END_TRIGLYCERIDE) > 0
            ? (Number(END_TRIGLYCERIDE) * 0.01126).toFixed(1)
            : undefined
          : Number(END_TRIGLYCERIDE) > 0
          ? END_TRIGLYCERIDE
          : undefined,

      START_BLOOD_CALCIUM_RESULT:
        unitGlucose === "mg/dL"
          ? Number(START_BLOOD_CALCIUM_RESULT) > 0
            ? (Number(START_BLOOD_CALCIUM_RESULT) / 18).toFixed(1)
            : undefined
          : Number(START_BLOOD_CALCIUM_RESULT) > 0
          ? START_BLOOD_CALCIUM_RESULT
          : undefined,
      END_BLOOD_CALCIUM_RESULT:
        unitGlucose === "mg/dL"
          ? Number(END_BLOOD_CALCIUM_RESULT) > 0
            ? (Number(END_BLOOD_CALCIUM_RESULT) / 18).toFixed(1)
            : undefined
          : Number(END_BLOOD_CALCIUM_RESULT) > 0
          ? END_BLOOD_CALCIUM_RESULT
          : undefined,
    };

    setFilterEmployee({ ...filterEmployee, ...result });
    setIsSearch(true);
    onCancel();
  };

  // SELECT UNIT HEIGHT
  const handleSelect = (value) => {};

  const handleReset = () => {
    setIsReset(true);
    setTimeout(() => {
      form.resetFields();
      setFilterEmployee(undefined);
      setIsSearch(false);
      setIsReset(false);
    }, 100);
  };

  // HANDLE CHANGE UNIT GLUCOSE
  const handleUnitHeight = (value) => {
    setUnitHeight(value);
    if (value === "m") {
      const unit2 = heightMin ? (heightMin / 100).toFixed(2) : null;
      const unit3 = heightMax ? (heightMax / 100).toFixed(2) : null;
      setHeightMin(Number(unit2));
      setHeightMax(Number(unit3));
      form.setFieldsValue({
        START_HEIGHT: unit2,
        END_HEIGHT: unit3,
      });
    }
    if (value === "cm") {
      const unit5 = heightMin ? (heightMin * 100).toFixed() : null;
      const unit6 = heightMax ? (heightMax * 100).toFixed() : null;
      setHeightMin(Number(unit5));
      setHeightMax(Number(unit6));
      form.setFieldsValue({
        START_HEIGHT: unit5,
        END_HEIGHT: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT GLUCOSE
  const handleUnitGlucose = (value) => {
    setUnitGlucose(value);
    if (value === "mg/dL") {
      const unit2 = glucoseMin ? (glucoseMin / 0.055).toFixed(1) : null;
      const unit3 = glucoseMax ? (glucoseMax / 0.055).toFixed(1) : null;
      setGlucoseMin(Number(unit2));
      setGlucoseMax(Number(unit3));
      form.setFieldsValue({
        START_GLUCOSE: unit2,
        END_GLUCOSE: unit3,
      });
    }
    if (value === "mmol/L") {
      const unit5 = glucoseMin ? (glucoseMin * 0.055).toFixed(1) : null;
      const unit6 = glucoseMax ? (glucoseMax * 0.055).toFixed(1) : null;
      setGlucoseMin(Number(unit5));
      setGlucoseMax(Number(unit6));
      form.setFieldsValue({
        START_GLUCOSE: unit5,
        END_GLUCOSE: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT URE
  const handleUnitUre = (value) => {
    setUnitUrea(value);
    if (value === "mg/dL") {
      const unit2 = UreaMin ? (UreaMin / 0.166).toFixed(1) : null;
      const unit3 = UreaMax ? (UreaMax / 0.166).toFixed(1) : null;
      setUreaMin(Number(unit2));
      setUreaMax(Number(unit3));
      form.setFieldsValue({
        START_UREA: unit2,
        END_UREA: unit3,
      });
    }
    if (value === "mmol/L") {
      const unit5 = UreaMin ? (UreaMin * 0.166).toFixed(1) : null;
      const unit6 = UreaMax ? (UreaMax * 0.166).toFixed(1) : null;
      setUreaMin(Number(unit5));
      setUreaMax(Number(unit6));
      form.setFieldsValue({
        START_UREA: unit5,
        END_UREA: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT CREATININ
  const handleUnitCreatinin = (value) => {
    setUnitCreatinin(value);
    if (value === "mg/dL") {
      const unit2 = CreatininMin ? (CreatininMin / 88.4).toFixed(2) : null;
      const unit3 = CreatininMax ? (CreatininMax / 88.4).toFixed(2) : null;
      setCreatininMin(Number(unit2));
      setCreatininMax(Number(unit3));
      form.setFieldsValue({
        START_CREATININ: unit2,
        END_CREATININ: unit3,
      });
    }
    if (value === "µmol/L") {
      const unit5 = CreatininMin ? (CreatininMin * 88.4).toFixed() : null;
      const unit6 = CreatininMax ? (CreatininMax * 88.4).toFixed() : null;
      setCreatininMin(Number(unit5));
      setCreatininMax(Number(unit6));
      form.setFieldsValue({
        START_CREATININ: unit5,
        END_CREATININ: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT CHOLESTEROL
  const handleUnitCholesterol = (value) => {
    setUnitCholesterol(value);
    if (value === "mg/dL") {
      const unit2 = CholesterolMin
        ? (CholesterolMin / 0.02586).toFixed(1)
        : null;
      const unit3 = CholesterolMax
        ? (CholesterolMax / 0.02586).toFixed(1)
        : null;
      setCholesterolMin(Number(unit2));
      setCholesterolMax(Number(unit3));
      form.setFieldsValue({
        START_CHOLESTEROL: unit2,
        END_CHOLESTEROL: unit3,
      });
    }
    if (value === "mmol/L") {
      const unit5 = CholesterolMin
        ? (CholesterolMin * 0.02586).toFixed(1)
        : null;
      const unit6 = CholesterolMax
        ? (CholesterolMax * 0.02586).toFixed(1)
        : null;
      setCholesterolMin(Number(unit5));
      setCholesterolMax(Number(unit6));
      form.setFieldsValue({
        START_CHOLESTEROL: unit5,
        END_CHOLESTEROL: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT HDL
  const handleUnitHDL = (value) => {
    setUnitHDL(value);
    if (value === "mg/dL") {
      const unit2 = HDLMin ? (HDLMin / 0.0259).toFixed(1) : null;
      const unit3 = HDLMax ? (HDLMax / 0.0259).toFixed(1) : null;
      setHDLMin(Number(unit2));
      setHDLMax(Number(unit3));
      form.setFieldsValue({
        START_HDL: unit2,
        END_HDL: unit3,
      });
    }
    if (value === "mmol/L") {
      const unit5 = HDLMin ? (HDLMin * 0.0259).toFixed(1) : null;
      const unit6 = HDLMax ? (HDLMax * 0.0259).toFixed(1) : null;
      setHDLMin(Number(unit5));
      setHDLMax(Number(unit6));
      form.setFieldsValue({
        START_HDL: unit5,
        END_HDL: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT LDL
  const handleUnitLDL = (value) => {
    setUnitLDL(value);
    if (value === "mg/dL") {
      const unit2 = LDLMin ? (LDLMin / 0.0259).toFixed(1) : null;
      const unit3 = LDLMax ? (LDLMax / 0.0259).toFixed(1) : null;
      setLDLMin(Number(unit2));
      setLDLMax(Number(unit3));
      form.setFieldsValue({
        START_LDL: unit2,
        END_LDL: unit3,
      });
    }
    if (value === "mmol/L") {
      const unit5 = LDLMin ? (LDLMin * 0.0259).toFixed(1) : null;
      const unit6 = LDLMax ? (LDLMax * 0.0259).toFixed(1) : null;
      setLDLMin(Number(unit5));
      setLDLMax(Number(unit6));
      form.setFieldsValue({
        START_LDL: unit5,
        END_LDL: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT TRIGLY
  const handleUnitTrigly = (value) => {
    setUnitTrigly(value);
    if (value === "mg/dL") {
      const unit2 = TriglyMin ? (TriglyMin / 0.01126).toFixed(1) : null;
      const unit3 = TriglyMax ? (TriglyMax / 0.01126).toFixed(1) : null;
      setTriglyMin(Number(unit2));
      setTriglyMax(Number(unit3));
      form.setFieldsValue({
        START_TRIGLYCERIDE: unit2,
        END_TRIGLYCERIDE: unit3,
      });
    }
    if (value === "mmol/L") {
      const unit5 = TriglyMin ? (TriglyMin * 0.01126).toFixed(1) : null;
      const unit6 = TriglyMax ? (TriglyMax * 0.01126).toFixed(1) : null;
      setTriglyMin(Number(unit5));
      setTriglyMax(Number(unit6));
      form.setFieldsValue({
        START_TRIGLYCERIDE: unit5,
        END_TRIGLYCERIDE: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT BLOOD CANXI
  const handleUnitCanxi = (value) => {
    setUnitCanxi(value);
    if (value === "mg/dL") {
      const unit2 = CanxiMin ? (CanxiMin * 18).toFixed(1) : null;
      const unit3 = CanxiMax ? (CanxiMax * 18).toFixed(1) : null;
      setCanxiMin(Number(unit2));
      setCanxiMax(Number(unit3));
      form.setFieldsValue({
        START_BLOOD_CALCIUM_RESULT: unit2,
        END_BLOOD_CALCIUM_RESULT: unit3,
      });
    }
    if (value === "mmol/L") {
      const unit5 = CanxiMin ? (CanxiMin / 18).toFixed(1) : null;
      const unit6 = CanxiMax ? (CanxiMax / 18).toFixed(1) : null;
      setCanxiMin(Number(unit5));
      setCanxiMax(Number(unit6));
      form.setFieldsValue({
        START_BLOOD_CALCIUM_RESULT: unit5,
        END_BLOOD_CALCIUM_RESULT: unit6,
      });
    }
  };

  const [diseases, setDiseases] = useRecoilState(diseasesState);
  useEffect(() => {
    diseasesData(diseases, setDiseases);
  }, []);

  const handleChangeSelect = (value, option) => {
    setStatusInput(option);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="search-form-advance"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
    >
      <Row>
        <Col xl={11} lg={11} md={11} sm={24} xs={24} offset={1}>
          <Form.Item
            label="Bệnh lý"
            name="DISEASE_ID"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
          >
            <TreeSelect
              style={{
                width: "100%",
              }}
              // dropdownStyle={{
              //   maxHeight: 1000,
              //   overflow: "auto",
              // }}
              multiple={true}
              // listHeight={550}
              treeData={diseaseOptions}
              allowDrop={false}
              showSearch
              filterTreeNode={(input, item) =>
                (item?.title ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xl={10} lg={10} md={10} sm={24} xs={24}>
          <Form.Item
            // name="DISEASE_STATUS_ID"
            name="DISEASE_STATUS_NAME"
            label="Tình trạng bệnh lý hiện tại"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
          >
            <Select
              allowClear
              options={diseaseStatusOption}
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
              onPressEnter={handleBlockEnter}
              // onSelect={handleSelectStatus}
              onChange={handleChangeSelect}
              mode="multiple"
            ></Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Chiều cao" style={styleSetWidth.widthItem}>
        <Form.Item name="START_HEIGHT" style={styleSetWidth.widthInput}>
          <NumericInput
            onPressEnter={handleBlockEnter}
            onChange={(value) => setHeightMin(Number(value))}
          />
        </Form.Item>
        <span style={styleSetWidth.widthSpan}>~</span>
        <Form.Item name="END_HEIGHT" style={styleSetWidth.widthInput}>
          <NumericInput
            onPressEnter={handleBlockEnter}
            onChange={(value) => setHeightMax(Number(value))}
          />
        </Form.Item>
        <Form.Item style={styleSetWidth.widthUnit}>
          <Select
            defaultValue="cm"
            onSelect={handleSelect}
            onChange={handleUnitHeight}
          >
            <Option value="m">m</Option>
            <Option value="cm">cm</Option>
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item label="Cân nặng" style={styleSetWidth.widthItem}>
        <Form.Item name="START_WEIGHT" style={styleSetWidth.widthInput}>
          <NumericInput onPressEnter={handleBlockEnter} />
        </Form.Item>
        <span style={styleSetWidth.widthSpan}>~</span>
        <Form.Item name="END_WEIGHT" style={styleSetWidth.widthInput}>
          <NumericInput onPressEnter={handleBlockEnter} />
        </Form.Item>
        <Form.Item style={styleSetWidth.widthUnit}>
          <Input value="kg" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Chỉ số BMI" style={styleSetWidth.widthItem}>
        <Form.Item name="START_BMI" style={styleSetWidth.widthInput}>
          <NumericInput onPressEnter={handleBlockEnter} />
        </Form.Item>
        <span style={styleSetWidth.widthSpan}>~</span>
        <Form.Item name="END_BMI" style={styleSetWidth.widthInput}>
          <NumericInput onPressEnter={handleBlockEnter} />
        </Form.Item>
        <Form.Item style={styleSetWidth.widthUnit}>
          <Input value="kg/m²" />
        </Form.Item>
      </Form.Item>
      {/* blood pressure */}
      <Row>
        <Col
          style={styleSetWidth.color}
          onClick={() => setIsBloodPressure(!isBloodPressure)}
          offset={1}
        >
          <span style={styleSetWidth.styleClick}>
            {" "}
            Huyết áp{" "}
            {isBloodPressure ? <CaretDownOutlined /> : <CaretRightOutlined />}
          </span>
        </Col>
      </Row>
      {isBloodPressure && (
        <>
          <Form.Item
            label="Tâm thu"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_SYSTOLIC" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_SYSTOLIC" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="mmHg" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Tâm trương"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_DIASTOLE" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_DIASTOLE" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="mmHg" />
            </Form.Item>
          </Form.Item>
        </>
      )}
      {/* blood vessel */}
      <Form.Item label="Mạch" style={styleSetWidth.widthItem}>
        <Form.Item name="START_BLOOD_VESSEL" style={styleSetWidth.widthInput}>
          <NumericInput onPressEnter={handleBlockEnter} />
        </Form.Item>
        <span style={styleSetWidth.widthSpan}>~</span>
        <Form.Item name="END_BLOOD_VESSEL" style={styleSetWidth.widthInput}>
          <NumericInput onPressEnter={handleBlockEnter} />
        </Form.Item>
        <Form.Item style={styleSetWidth.widthUnit}>
          <Input value="lần/phút" />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Đo mật độ xương" style={styleSetWidth.widthItem}>
        <Form.Item
          name="START_BONE_DENSITY_RATING"
          style={styleSetWidth.widthInput}
        >
          <NumericInput onPressEnter={handleBlockEnter} />
        </Form.Item>
        <span style={styleSetWidth.widthSpan}>~</span>
        <Form.Item
          name="END_BONE_DENSITY_RATINGT"
          style={styleSetWidth.widthInput}
        >
          <NumericInput onPressEnter={handleBlockEnter} />
        </Form.Item>
        <Form.Item style={styleSetWidth.widthUnit}>
          <Input value="CD" />
        </Form.Item>
      </Form.Item>
      {/* Total blood cell analysis */}
      <Row>
        <Col
          style={styleSetWidth.color}
          onClick={() => setIsBloodAnalysis(!isBloodAnalysis)}
          offset={1}
        >
          <span style={styleSetWidth.styleClick}>
            Tổng phân tích tề bào máu{" "}
            {isBloodAnalysis ? <CaretDownOutlined /> : <CaretRightOutlined />}
          </span>
        </Col>
      </Row>
      {isBloodAnalysis && (
        <>
          <Form.Item
            label={
              <>
                WBC <br />
                &emsp;Số lượng bạch cầu
              </>
            }
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_WBC" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_WBC" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="K/µL" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={
              <>
                RBC <br />
                &emsp;Số lượng hồng cầu
              </>
            }
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_RBC" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_RBC" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="M/µL" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={
              <>
                HGB <br />
                &emsp;Huyết sắc tố
              </>
            }
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_HGB" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_HGB" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="g/dL" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={
              <>
                HCT <br />
                &emsp;Dung tích hồng cầu
              </>
            }
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_HCT" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_HCT" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="%" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={
              <>
                MCV <br />
                &emsp;Thể tích trung bình một hồng cầu
              </>
            }
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_MCV" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_MCV" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="fL" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={
              <>
                MCH <br />
                &emsp;Số lượng huyết sắc tố trung bình một hồng cầu
              </>
            }
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_MCH" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_MCH" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="Pg" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={
              <>
                PLT <br />
                &emsp;Số lượng tiểu cầu
              </>
            }
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_PLT" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_PLT" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="k/uL" />
            </Form.Item>
          </Form.Item>
        </>
      )}
      <Row>
        <Col span={24}>
          <Form.Item
            label="Đường huyết đói Glucose"
            style={styleSetWidth.widthItem}
          >
            <Form.Item name="START_GLUCOSE" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setGlucoseMin(Number(value))}
              />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_GLUCOSE" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setGlucoseMax(Number(value))}
              />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Select
                defaultValue="mmol/L"
                onSelect={handleSelect}
                onChange={handleUnitGlucose}
              >
                <Option value="mmol/L">mmol/L</Option>
                <Option value="mg/dL">mg/dL</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col
          style={styleSetWidth.color}
          onClick={() => setIsRenal(!isRenal)}
          offset={1}
        >
          <span style={styleSetWidth.styleClick}>
            Chức năng thận{" "}
            {isRenal ? <CaretDownOutlined /> : <CaretRightOutlined />}
          </span>
        </Col>
      </Row>
      {isRenal && (
        <>
          <Form.Item
            label="Urea"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_UREA" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setUreaMin(Number(value))}
              />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_UREA" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setUreaMax(Number(value))}
              />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Select
                defaultValue="mmol/L"
                onSelect={handleSelect}
                onChange={handleUnitUre}
              >
                <Option value="mmol/L">mmol/L</Option>
                <Option value="mg/dL">mg/dL</Option>
              </Select>
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Creatinin"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_CREATININ" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setCreatininMin(Number(value))}
              />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_CREATININ" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setCreatininMax(Number(value))}
              />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Select
                defaultValue="µmol/L"
                onSelect={handleSelect}
                onChange={handleUnitCreatinin}
              >
                <Option value="µmol/L">µmol/L</Option>
                <Option value="mg/dL">mg/dL</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </>
      )}
      <Row>
        <Col
          offset={1}
          style={styleSetWidth.color}
          onClick={() => setIsLiverEnzyme(!isLiverEnzyme)}
        >
          <span style={styleSetWidth.styleClick}>
            Chức năng gan{" "}
            {isLiverEnzyme ? <CaretDownOutlined /> : <CaretRightOutlined />}
          </span>
        </Col>
      </Row>
      {isLiverEnzyme && (
        <>
          <Form.Item
            label="SGOT/AST"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_SGOTAST" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_SGOTAST" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="UI/L" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="SGPT/ALT"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_SGPTALT" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_SGPTALT" style={styleSetWidth.widthInput}>
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Input value="UI/L" />
            </Form.Item>
          </Form.Item>
        </>
      )}
      <Row>
        <Col
          style={styleSetWidth.color}
          onClick={() => setIsBloodLipid(!isBloodLipid)}
          offset={1}
        >
          <span style={styleSetWidth.styleClick}>
            Chỉ số Lipid máu (Bộ mỡ máu){" "}
            {isBloodLipid ? <CaretDownOutlined /> : <CaretRightOutlined />}
          </span>
        </Col>
      </Row>
      {isBloodLipid && (
        <>
          <Form.Item
            label="Cholesterol"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item
              name="START_CHOLESTEROL"
              style={styleSetWidth.widthInput}
            >
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setCholesterolMin(Number(value))}
              />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_CHOLESTEROL" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setCholesterolMax(Number(value))}
              />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Select
                defaultValue="mmol/L"
                onSelect={handleSelect}
                onChange={handleUnitCholesterol}
              >
                <Option value="mmol/L">mmol/L</Option>
                <Option value="mg/dL">mg/dL</Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="HDL"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_HDL" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setHDLMin(Number(value))}
              />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_HDL" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setHDLMax(Number(value))}
              />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Select
                defaultValue="mmol/L"
                onSelect={handleSelect}
                onChange={handleUnitHDL}
              >
                <Option value="mmol/L">mmol/L</Option>
                <Option value="mg/dL">mg/dL</Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="LDL"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item name="START_LDL" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setLDLMin(Number(value))}
              />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_LDL" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setLDLMax(Number(value))}
              />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Select
                defaultValue="mmol/L"
                onSelect={handleSelect}
                onChange={handleUnitLDL}
              >
                <Option value="mmol/L">mmol/L</Option>
                <Option value="mg/dL">mg/dL</Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Triglyceride"
            style={styleSetWidth.widthItem}
            labelCol={{ span: 7, offset: 2 }}
          >
            <Form.Item
              name="START_TRIGLYCERIDE"
              style={styleSetWidth.widthInput}
            >
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setTriglyMin(Number(value))}
              />
            </Form.Item>
            <span style={styleSetWidth.widthSpan}>~</span>
            <Form.Item name="END_TRIGLYCERIDE" style={styleSetWidth.widthInput}>
              <NumericInput
                onPressEnter={handleBlockEnter}
                onChange={(value) => setTriglyMax(Number(value))}
              />
            </Form.Item>
            <Form.Item style={styleSetWidth.widthUnit}>
              <Select
                defaultValue="mmol/L"
                onSelect={handleSelect}
                onChange={handleUnitTrigly}
              >
                <Option value="mmol/L">mmol/L</Option>
                <Option value="mg/dL">mg/dL</Option>
              </Select>
            </Form.Item>
          </Form.Item>
        </>
      )}

      <Form.Item label="Nồng độ canxi máu" style={styleSetWidth.widthItem}>
        <Form.Item
          name="START_BLOOD_CALCIUM_RESULT"
          style={styleSetWidth.widthInput}
        >
          <NumericInput
            onPressEnter={handleBlockEnter}
            onChange={(value) => setCanxiMin(Number(value))}
          />
        </Form.Item>
        <span style={styleSetWidth.widthSpan}>~</span>
        <Form.Item
          name="END_BLOOD_CALCIUM_RESULT"
          style={styleSetWidth.widthInput}
        >
          <NumericInput
            onPressEnter={handleBlockEnter}
            onChange={(value) => setCanxiMax(Number(value))}
          />
        </Form.Item>
        <Form.Item style={styleSetWidth.widthUnit}>
          <Select
            defaultValue="mmol/L"
            onSelect={handleSelect}
            onChange={handleUnitCanxi}
          >
            <Option value="mmol/L">mmol/L</Option>
            <Option value="mg/dL">mg/dL</Option>
          </Select>
        </Form.Item>
      </Form.Item>

      <Row style={{ marginTop: 30 }}>
        <Col span={4} offset={7}>
          <Button
            onClick={onCancel}
            type="primary"
            style={{
              display: "block",
              width: 130,
            }}
            icon={<CloseOutlined />}
          >
            Đóng
          </Button>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => handleSearch()}
            style={{ width: 130 }}
          >
            <SearchOutlined style={{ fontSize: 18 }} />
            Tìm kiếm
          </Button>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            onClick={() => handleReset()}
            style={{ width: 130 }}
          >
            {isReset ? (
              <LoadingOutlined />
            ) : (
              <>
                <Loading3QuartersOutlined
                  style={{ fontSize: 14, marginRight: 5 }}
                />
                Làm mới
              </>
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default PeriodicSearchFormAdvance;
