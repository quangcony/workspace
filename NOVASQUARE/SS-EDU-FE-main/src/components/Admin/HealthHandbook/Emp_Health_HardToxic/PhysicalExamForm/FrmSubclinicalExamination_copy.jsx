import { UploadOutlined } from "@ant-design/icons";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import Upload from "antd/lib/upload/Upload";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import bloodLipidApi from "../../../../../api/bloodLipidApi";
import glucoseApi from "../../../../../api/glucoseApi";
import liverEnzymeApi from "../../../../../api/liverEnzymeApi";
import preclinicalDetailFileApi from "../../../../../api/preclinicalDetailFileApi";
import ureCreatineApi from "../../../../../api/ureCreatineApi";
import {
  isAccessConlusionState,
  isShowState,
} from "../../../../../recoil/atom/booleanState";
import { employeeSelectState } from "../../../../../recoil/atom/employeeState";
import { generalSettingState } from "../../../../../recoil/atom/generalSettingState";
import { physicalExamNewState } from "../../../../../recoil/atom/physicalExamNew";
import { newestPhysicalExamResultState } from "../../../../../recoil/atom/physicalExamResult";
import { physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import { newestPreclinicalDetailState } from "../../../../../recoil/atom/preClinicalDetailState";
import NumericInput from "../../../../NumericInput/NumericInput";
import preclinicDetailApi from "../../../../../api/preclinicDetailApi";
import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";
import {
  handleBlockEnter,
  validateMessages,
  CheckError,
  checkMin,
  checkMax,
} from "../../../../../common";
import { generalSettingData } from "../../../../../common/getAllApi";

const storage = process.env.REACT_APP_BASE_URL + "/files";
const { Title } = Typography;
const { Option } = Select;
const styleDisplay = {
  marginBottom: {
    marginBottom: 0,
  },
  marginTop: {
    marginTop: 20,
  },
  textAlign: {
    textAlign: "center",
  },
};
const styleInput = {
  unitWidth: {
    width: "40%",
    textAlign: "center",
  },
  resultWidth: {
    textAlign: "center",
    width: "30%",
  },
  resultWidth2: {
    width: "50%",
    textAlign: "center",
  },
};
const styleRequire = {
  width: "10%",
  color: "red",
  fontSize: 12,
  paddingTop: 5,
};

const styleError = {
  position: "absolute",
  color: "#ff4d4f",
  top: 32,
  left: "10%",
};

const FrmSubclinicalExamination = ({
  setIsClinicalExam,
  setIsPreClinicalExam,
  setIsPhysicalExamResult,
  onKeyChange,
  SubclinicalExamRef,
  onCreatePhysicalExamResult,
  onUpdatePreClinicExam,
  onGetClinicalDetail,
  setFileList,
  fileList,
}) => {
  const [form] = Form.useForm();
  const setIsAccessConlusion = useSetRecoilState(isAccessConlusionState);
  const [physicalExamSelect] = useRecoilState(physicalExamSelectState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewState);
  const [generalSetting, setGeneralSetting] =
    useRecoilState(generalSettingState);
  const employeeSelect = useRecoilValue(employeeSelectState);
  const newPreClinicDetail = useRecoilValue(newestPreclinicalDetailState);
  const newPhysicalResult = useRecoilValue(newestPhysicalExamResultState);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [WBC, setWBC] = useState("");
  const [RBC, setRBC] = useState("");
  const [HGB, setHGB] = useState("");
  const [HCT, setHCT] = useState("");
  const [MCV, setMCV] = useState("");
  const [MCH, setMCH] = useState("");
  const [PLT, setPLT] = useState("");
  const [type, setType] = useState(undefined);

  const [Glucose, setGlucose] = useState("");
  const [Urea, setUrea] = useState("");
  const [Creatine, setCreatine] = useState("");
  const [SGOTAST, setSGOTAST] = useState("");
  const [SGPTALT, setSGPTALT] = useState("");
  const [Cholesterol, setCholesterol] = useState("");
  const [HDL, setHDL] = useState("");
  const [LDL, setLDL] = useState("");
  const [Triglyceride, setTriglyceride] = useState("");

  const [glucoseMin, setGlucoseMin] = useState(null);
  const [glucoseMax, setGlucoseMax] = useState(null);
  const [UreaMin, setUreaMin] = useState(null);
  const [UreaMax, setUreaMax] = useState(null);
  const [CreatininMin, setCreatininMin] = useState(null);
  const [CreatininMax, setCreatininMax] = useState(null);
  const [CholesterolMin, setCholesterolMin] = useState(null);
  const [CholesterolMax, setCholesterolMax] = useState(null);
  const [HDLMin, setHDLMin] = useState(null);
  const [HDLMax, setHDLMax] = useState(null);
  const [LDLMin, setLDLMin] = useState(null);
  const [LDLMax, setLDLMax] = useState(null);
  const [TriglyMin, setTriglyMin] = useState(null);
  const [TriglyMax, setTriglyMax] = useState(null);
  const [SGOTMin, setSGOTMin] = useState(null);
  const [SGOTMax, setSGOTMax] = useState(null);
  const [SGPTMin, setSGPTMin] = useState(null);
  const [SGPTMax, setSGPTMax] = useState(null);
  const [WBCMin, setWBCMin] = useState(null);
  const [WBCMax, setWBCMax] = useState(null);
  const [RBCMin, setRBCMin] = useState(null);
  const [RBCMax, setRBCMax] = useState(null);
  const [HGBMin, setHGBMin] = useState(null);
  const [HGBMax, setHGBMax] = useState(null);
  const [HCTMin, setHCTMin] = useState(null);
  const [HCTMax, setHCTMax] = useState(null);
  const [MCVMin, setMCVMin] = useState(null);
  const [MCVMax, setMCVMax] = useState(null);
  const [MCHMin, setMCHMin] = useState(null);
  const [MCHMax, setMCHMax] = useState(null);
  const [PLTMin, setPLTMin] = useState(null);
  const [PLTMax, setPLTMax] = useState(null);

  const [errorWBC, setErrorWBC] = useState("");
  const [errorRBC, setErrorRBC] = useState("");
  const [errorHGB, setErrorHGB] = useState("");
  const [errorHCT, setErrorHCT] = useState("");
  const [errorMCV, setErrorMCV] = useState("");
  const [errorMCH, setErrorMCH] = useState("");
  const [errorPLT, setErrorPLT] = useState("");
  const [errorGlucose, setErrorGlucose] = useState("");
  const [errorUrea, setErrorUrea] = useState("");
  const [errorCreatinin, setErrorCreatinin] = useState("");
  const [errorSGOT, setErrorSGOT] = useState("");
  const [errorSGPT, setErrorSGPT] = useState("");
  const [errorCholes, setErrorCholes] = useState("");
  const [errorHDL, setErrorHDL] = useState("");
  const [errorLDL, setErrorLDL] = useState("");
  const [errorTrigly, setErrorTrigly] = useState("");

  const [unitGlucose, setUnitGlucose] = useState(null);
  const [unitUrea, setUnitUrea] = useState(null);
  const [unitCreatinin, setUnitCreatinin] = useState(null);
  const [unitCholesterol, setUnitCholesterol] = useState(null);
  const [unitHDL, setUnitHDL] = useState(null);
  const [unitLDL, setUnitLDL] = useState(null);
  const [unitTrigly, setUnitTrigly] = useState(null);
  const [unitCanxi, setUnitCanxi] = useState(null);

  const [isBoolean, setIsBoolean] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [preclinicDetail, setPreclinicDetail] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();
  const [isShow, setIsShow] = useRecoilState(isShowState);

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      enqueueSnackbar("File tải lên phải nhỏ hơn 5MB!", { variant: "error" });
    }

    return isLt2M;
  };

  //CHECK GENERAL SETTING LIST
  useEffect(() => {
    if (generalSetting.length === 0) {
      generalSettingData(generalSetting, setGeneralSetting);
    }
  }, [generalSetting]);

  useEffect(() => {
    if (employeeSelect) {
      console.log("employeeSelect", employeeSelect);
      const gender = employeeSelect?.User?.Gender?.NAME;
      const marital = employeeSelect?.Marital_Status?.MARITAL_STATUS_NAME;
      if (
        (gender === "Nữ" && marital === "Đã kết hôn") ||
        (gender === "nữ" && marital === "Đã kết hôn") ||
        (gender === "Female" && marital === "Đã kết hôn") ||
        (gender === "female" && marital === "Đã kết hôn")
      ) {
        setIsBoolean(false);
      } else {
        setIsBoolean(true);
      }
    }
  }, [employeeSelect]);

  useEffect(() => {
    if (physicalExamSelect || generalSetting) {
      const newData = physicalExamSelect?.Preclinical_Details[0];
      setWBC(newData?.WBC_RESULT);
      setRBC(newData?.RBC_RESULT);
      setHGB(newData?.HGB_RESULT);
      setHCT(newData?.HCT_RESULT);
      setMCV(newData?.MCV_RESULT);
      setMCH(newData?.MCH_RESULT);
      setPLT(newData?.PLT_RESULT);
      setGlucose(newData?.Glucoses[0]?.GLUCOSE_HUNGRY);
      setUrea(newData?.Ure_Creatines[0]?.UREA_RESULT);
      setCreatine(newData?.Ure_Creatines[0]?.CREATINE_RESULT);
      setSGOTAST(newData?.Liver_Enzymes[0]?.SGOT_AST_RESULT);
      setSGPTALT(newData?.Liver_Enzymes[0]?.SGPT_ALT_RESULT);
      setCholesterol(newData?.Blood_Lipids[0]?.CHOLESTEROL_RESULT);
      setHDL(newData?.Blood_Lipids[0]?.HDL_RESULT);
      setLDL(newData?.Blood_Lipids[0]?.LDL_RESULT);
      setTriglyceride(newData?.Blood_Lipids[0]?.TRIGLYCERIDE_RESULT);
      form.setFieldsValue({
        STOMACH_ULTRA_SOUND_DESC: newData?.STOMACH_ULTRA_SOUND_DESC,
        STOMACH_ULTRA_SOUND_RESULT: newData?.STOMACH_ULTRA_SOUND_RESULT,
        THYROID_ULTRA_SOUND_DESC: newData?.THYROID_ULTRA_SOUND_DESC,
        THYROID_ULTRA_SOUND_RESULT: newData?.THYROID_ULTRA_SOUND_RESULT,
        MAMMARY_ULTRA_SOUND_DESC: newData?.MAMMARY_ULTRA_SOUND_DESC,
        MAMMARY_ULTRA_SOUND_RESULT: newData?.MAMMARY_ULTRA_SOUND_RESULT,
        HEART_ULTRA_SOUND_DESC: newData?.HEART_ULTRA_SOUND_DESC,
        HEART_ULTRA_SOUND_RESULT: newData?.HEART_ULTRA_SOUND_RESULT,
        ECG_DESC: newData?.ECG_DESC,
        ECG_RESULT: newData?.ECG_RESULT,
        XRAY_DESC: newData?.XRAY_DESC,
        XRAY_RESULT: newData?.XRAY_RESULT,
        PAP_SMEAR_RESULT: newData?.PAP_SMEAR_RESULT,
        BONE_DENSITY_RATING: newData?.BONE_DENSITY_RATING,
        BONE_DENSITY_RESULT: newData?.BONE_DENSITY_RESULT,
        BLOOD_RESULT: newData?.BLOOD_RESULT,

        WBC_RESULT: newData?.WBC_RESULT.toString(),
        WBC_UNIT_DEFAULT: newData
          ? newData?.WBC_UNIT_DEFAULT
          : generalSetting?.WBC_UNIT_DEFAULT,
        WBC_MIN: newData ? newData?.WBC_MIN : generalSetting?.WBC_MIN,
        WBC_MAX: newData ? newData?.WBC_MAX : generalSetting?.WBC_MAX,

        RBC_RESULT: newData?.RBC_RESULT.toString(),
        RBC_MIN: newData ? newData?.RBC_MIN : generalSetting?.RBC_MIN,
        RBC_MAX: newData ? newData?.RBC_MAX : generalSetting?.RBC_MAX,
        RBC_UNIT_DEFAULT: newData
          ? newData?.RBC_UNIT_DEFAULT
          : generalSetting?.RBC_UNIT_DEFAULT,

        HGB_RESULT: newData?.HGB_RESULT.toString(),
        HGB_MIN: newData ? newData?.HGB_MIN : generalSetting?.HGB_MIN,
        HGB_MAX: newData ? newData?.HGB_MAX : generalSetting?.HGB_MAX,
        HGB_UNIT_DEFAULT: newData
          ? newData?.HGB_UNIT_DEFAULT
          : generalSetting?.HGB_UNIT_DEFAULT,

        HCT_RESULT: newData?.HCT_RESULT.toString(),
        HCT_MIN: newData ? newData?.HCT_MIN : generalSetting?.HCT_MIN,
        HCT_MAX: newData ? newData?.HCT_MAX : generalSetting?.HCT_MAX,
        HCT_UNIT_DEFAULT: newData
          ? newData?.HCT_UNIT_DEFAULT
          : generalSetting?.HCT_UNIT_DEFAULT,

        MCV_RESULT: newData?.MCV_RESULT.toString(),
        MCV_MIN: newData ? newData?.MCV_MIN : generalSetting?.MCV_MIN,
        MCV_MAX: newData ? newData?.MCV_MAX : generalSetting?.MCV_MAX,
        MCV_UNIT_DEFAULT: newData
          ? newData?.MCV_UNIT_DEFAULT
          : generalSetting?.MCV_UNIT_DEFAULT,

        MCH_RESULT: newData?.MCH_RESULT.toString(),
        MCH_MIN: newData ? newData?.MCH_MIN : generalSetting?.MCH_MIN,
        MCH_MAX: newData ? newData?.MCH_MAX : generalSetting?.MCH_MAX,
        MCH_UNIT_DEFAULT: newData
          ? newData?.MCH_UNIT_DEFAULT
          : generalSetting?.MCH_UNIT_DEFAULT,

        PLT_RESULT: newData?.PLT_RESULT.toString(),
        PLT_MIN: newData ? newData?.PLT_MIN : generalSetting?.PLT_MIN,
        PLT_MAX: newData ? newData?.PLT_MAX : generalSetting?.PLT_MAX,
        PLT_UNIT_DEFAULT: newData
          ? newData?.PLT_UNIT_DEFAULT
          : generalSetting?.PLT_UNIT_DEFAULT,
        URINALYSIS_RESULT: newData?.URINALYSIS_RESULT,

        URINALYSIS_RESULT: newData?.URINALYSIS_RESULT,

        GLUCOSE_RESULT: newData?.Glucoses[0]?.GLUCOSE_HUNGRY.toString(),
        GLUCOSE_MIN: newData
          ? newData?.Glucoses[0]?.GLUCOSE_HUNGRY_REFERENCE_MIN
          : generalSetting?.GLUCOSE_MIN,
        GLUCOSE_MAX: newData
          ? newData?.Glucoses[0]?.GLUCOSE_HUNGRY_REFERENCE_MAX
          : generalSetting?.GLUCOSE_MAX,
        DEFAULT_UNIT: generalSetting?.GLUCOSE_UNIT_DEFAULT,

        UREA_RESULT: newData?.Ure_Creatines[0]?.UREA_RESULT.toString(),
        UREA_MIN: newData
          ? newData?.Ure_Creatines[0]?.UREA_REFERENCE_MIN
          : generalSetting?.UREA_MIN,
        UREA_MAX: newData
          ? newData?.Ure_Creatines[0]?.UREA_REFERENCE_MAX
          : generalSetting?.UREA_MAX,
        UREA_UNIT_DEFAULT: newData
          ? newData?.Ure_Creatines[0]?.UREA_DEFAULT_UNIT
          : generalSetting?.UREA_UNIT_DEFAULT,

        CREATINE_RESULT: newData?.Ure_Creatines[0]?.CREATINE_RESULT.toString(),
        CREATINE_MIN: newData
          ? newData?.Ure_Creatines[0]?.CREATINE_REFERENCE_MIN
          : generalSetting?.CREATINE_MIN,
        CREATINE_MAX: newData
          ? newData?.Ure_Creatines[0]?.CREATINE_REFERENCE_MAX
          : generalSetting?.CREATINE_MAX,
        CREATINE_UNIT_DEFAULT: newData
          ? newData?.Ure_Creatines[0]?.CREATINE_DEFAULT_UNIT
          : generalSetting?.CREATINE_UNIT_DEFAULT,

        SGOT_AST_RESULT: newData?.Liver_Enzymes[0]?.SGOT_AST_RESULT.toString(),
        SGOT_AST_MIN: newData
          ? newData?.Liver_Enzymes[0]?.SGOT_AST_REFERENCE_MIN
          : generalSetting?.SGOT_AST_MIN,
        SGOT_AST_MAX: newData
          ? newData?.Liver_Enzymes[0]?.SGOT_AST_REFERENCE_MAX
          : generalSetting?.SGOT_AST_MAX,
        SGOT_AST_UNIT_DEFAULT: newData
          ? newData?.Liver_Enzymes[0]?.SGOT_AST_DEFAULT_UNIT
          : generalSetting?.SGOT_AST_UNIT_DEFAULT,

        SGPT_ALT_RESULT: newData?.Liver_Enzymes[0]?.SGPT_ALT_RESULT.toString(),
        SGPT_ALT_MIN: newData
          ? newData?.Liver_Enzymes[0]?.SGPT_ALT_REFERENCE_MIN
          : generalSetting?.SGPT_ALT_MIN,
        SGPT_ALT_MAX: newData
          ? newData?.Liver_Enzymes[0]?.SGPT_ALT_REFERENCE_MAX
          : generalSetting?.SGPT_ALT_MAX,
        SGPT_ALT_UNIT_DEFAULT: newData
          ? newData?.Liver_Enzymes[0]?.SGPT_ALT_DEFAULT_UNIT
          : generalSetting?.SGPT_ALT_UNIT_DEFAULT,

        CHOLESTEROL_RESULT:
          newData?.Blood_Lipids[0]?.CHOLESTEROL_RESULT?.toString(),
        CHOLESTEROL_MIN: newData
          ? newData?.Blood_Lipids[0]?.CHOLESTEROL_REFERENCE_MIN
          : generalSetting?.CHOLESTEROL_MIN,
        CHOLESTEROL_MAX: newData
          ? newData?.Blood_Lipids[0]?.CHOLESTEROL_REFERENCE_MAX
          : generalSetting?.CHOLESTEROL_MAX,
        CHOLESTEROL_UNIT_DEFAULT: newData
          ? newData?.Blood_Lipids[0]?.CHOLESTEROL_DEFAULT_UNIT
          : generalSetting?.CHOLESTEROL_UNIT_DEFAULT,

        HDL_RESULT: newData?.Blood_Lipids[0]?.HDL_RESULT?.toString(),
        HDL_MIN: newData
          ? newData?.Blood_Lipids[0]?.HDL_REFERENCE_MIN
          : generalSetting?.HDL_MIN,
        HDL_MAX: newData
          ? newData?.Blood_Lipids[0]?.HDL_REFERENCE_MAX
          : generalSetting?.HDL_MAX,
        HDL_UNIT_DEFAULT: newData
          ? newData?.Blood_Lipids[0]?.HDL_DEFAULT_UNIT
          : generalSetting?.HDL_UNIT_DEFAULT,

        LDL_RESULT: newData?.Blood_Lipids[0]?.LDL_RESULT?.toString(),
        LDL_MIN: newData
          ? newData?.Blood_Lipids[0]?.LDL_REFERENCE_MIN
          : generalSetting?.LDL_MIN,
        LDL_MAX: newData
          ? newData?.Blood_Lipids[0]?.LDL_REFERENCE_MAX
          : generalSetting?.LDL_MAX,
        LDL_UNIT_DEFAULT: newData
          ? newData?.Blood_Lipids[0]?.LDL_DEFAULT_UNIT
          : generalSetting?.LDL_UNIT_DEFAULT,

        TRIGLYCERIDE_RESULT:
          newData?.Blood_Lipids[0]?.TRIGLYCERIDE_RESULT?.toString(),
        TRIGLYCERIDE_RESULT:
          newData?.Blood_Lipids[0]?.TRIGLYCERIDE_RESULT?.toString(),
        TRIGLYCERIDE_MIN: newData
          ? newData?.Blood_Lipids[0]?.TRIGLYCERIDE_REFERENCE_MIN
          : generalSetting?.TRIGLYCERIDE_MIN,
        TRIGLYCERIDE_MAX: newData
          ? newData?.Blood_Lipids[0]?.TRIGLYCERIDE_REFERENCE_MAX
          : generalSetting?.TRIGLYCERIDE_MAX,
        TRIGLYCERIDE_UNIT_DEFAULT: newData
          ? newData?.Blood_Lipids[0]?.TRIGLYCERIDE_DEFAULT_UNIT
          : generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT,
      });
    } else {
      form.resetFields();
    }
  }, [physicalExamSelect, generalSetting, form]);

  const handleOk = () => {
    const newData = {
      ...form.getFieldsValue(),
    };

    const {
      TRIGLYCERIDE_MIN,
      TRIGLYCERIDE_MAX,
      HDL_MAX,
      HDL_MIN,
      LDL_MIN,
      LDL_MAX,
      GLUCOSE_MIN,
      GLUCOSE_MAX,
      GLUCOSE_RESULT,
      UREA_RESULT,
      UREA_MIN,
      UREA_MAX,
      CREATINE_MIN,
      CREATINE_MAX,
      CREATINE_RESULT,
      SGOT_AST_RESULT,
      SGOT_AST_MIN,
      SGOT_AST_MAX,
      SGPT_ALT_RESULT,
      SGPT_ALT_MIN,
      SGPT_ALT_MAX,
      CHOLESTEROL_MIN,
      CHOLESTEROL_MAX,
      CHOLESTEROL_RESULT,
      HDL_RESULT,
      TRIGLYCERIDE_RESULT,
      LDL_RESULT,
      GLUCOSE_UNIT_DEFAULT,
      UREA_UNIT_DEFAULT,
      CREATINE_UNIT_DEFAULT,
      SGOT_AST_UNIT_DEFAULT,
      SGPT_ALT_UNIT_DEFAULT,
      CHOLESTEROL_UNIT_DEFAULT,
      HDL_UNIT_DEFAULT,
      LDL_UNIT_DEFAULT,
      TRIGLYCERIDE_UNIT_DEFAULT,
      ...result
    } = newData;

    const {
      STOMACH_ULTRA_SOUND_RESULT,
      ECG_RESULT,
      XRAY_RESULT,
      BLOOD_RESULT,
      WBC_RESULT,
      RBC_RESULT,
      HGB_RESULT,
      HCT_RESULT,
      MCV_RESULT,
      MCH_RESULT,
      PLT_RESULT,
      URINALYSIS_RESULT,
      WBC_MIN,
      WBC_MAX,
      RBC_MIN,
      RBC_MAX,
      HGB_MIN,
      HGB_MAX,
      HCT_MIN,
      HCT_MAX,
      MCV_MIN,
      MCV_MAX,
      MCH_MIN,
      MCH_MAX,
      PLT_MIN,
      PLT_MAX,
    } = result;

    if (
      GLUCOSE_RESULT === null ||
      GLUCOSE_RESULT === undefined ||
      SGOT_AST_RESULT === null ||
      SGOT_AST_RESULT === undefined ||
      SGPT_ALT_RESULT === null ||
      SGPT_ALT_RESULT === undefined ||
      UREA_RESULT === null ||
      UREA_RESULT === undefined ||
      CREATINE_RESULT === null ||
      CREATINE_RESULT === undefined ||
      BLOOD_RESULT === null ||
      BLOOD_RESULT === undefined ||
      WBC_RESULT === null ||
      WBC_RESULT === undefined ||
      RBC_RESULT === null ||
      RBC_RESULT === undefined ||
      HGB_RESULT === null ||
      HGB_RESULT === undefined ||
      HCT_RESULT === null ||
      HCT_RESULT === undefined ||
      MCV_RESULT === null ||
      MCV_RESULT === undefined ||
      MCH_RESULT === null ||
      MCH_RESULT === undefined ||
      PLT_RESULT === null ||
      PLT_RESULT === undefined ||
      URINALYSIS_RESULT === null ||
      URINALYSIS_RESULT === undefined ||
      STOMACH_ULTRA_SOUND_RESULT === null ||
      STOMACH_ULTRA_SOUND_RESULT === undefined ||
      ECG_RESULT === null ||
      ECG_RESULT === undefined ||
      XRAY_RESULT === null ||
      XRAY_RESULT === undefined ||
      GLUCOSE_MIN === null ||
      GLUCOSE_MAX === null ||
      UREA_MIN === null ||
      UREA_MAX === null ||
      CREATINE_MIN === null ||
      CREATINE_MAX === null ||
      SGOT_AST_MIN === null ||
      SGOT_AST_MAX === null ||
      SGPT_ALT_MIN === null ||
      SGPT_ALT_MAX === null ||
      CHOLESTEROL_MIN === null ||
      CHOLESTEROL_MAX === null ||
      WBC_MIN === null ||
      WBC_MAX === null ||
      RBC_MIN === null ||
      RBC_MAX === null ||
      HGB_MIN === null ||
      HGB_MAX === null ||
      HCT_MIN === null ||
      HCT_MAX === null ||
      MCV_MIN === null ||
      MCV_MAX === null ||
      MCH_MIN === null ||
      MCH_MAX === null ||
      PLT_MIN === null ||
      PLT_MAX === null ||
      TRIGLYCERIDE_MIN === null ||
      TRIGLYCERIDE_MAX === null ||
      HDL_MAX === null ||
      HDL_MIN === null ||
      LDL_MIN === null ||
      LDL_MAX === null ||
      GLUCOSE_MIN === undefined ||
      GLUCOSE_MAX === undefined ||
      UREA_MIN === undefined ||
      UREA_MAX === undefined ||
      CREATINE_MIN === undefined ||
      CREATINE_MAX === undefined ||
      SGOT_AST_MIN === undefined ||
      SGOT_AST_MAX === undefined ||
      SGPT_ALT_MIN === undefined ||
      SGPT_ALT_MAX === undefined ||
      CHOLESTEROL_MIN === undefined ||
      CHOLESTEROL_MAX === undefined ||
      WBC_MIN === undefined ||
      WBC_MAX === undefined ||
      RBC_MIN === undefined ||
      RBC_MAX === undefined ||
      HGB_MIN === undefined ||
      HGB_MAX === undefined ||
      HCT_MIN === undefined ||
      HCT_MAX === undefined ||
      MCV_MIN === undefined ||
      MCV_MAX === undefined ||
      MCH_MIN === undefined ||
      MCH_MAX === undefined ||
      PLT_MIN === undefined ||
      PLT_MAX === undefined ||
      TRIGLYCERIDE_MIN === undefined ||
      TRIGLYCERIDE_MAX === undefined ||
      HDL_MAX === undefined ||
      HDL_MIN === undefined ||
      LDL_MIN === undefined ||
      LDL_MAX === undefined ||
      CHOLESTEROL_MIN.toString().trim() === "" ||
      CHOLESTEROL_MAX.toString().trim() === "" ||
      WBC_MIN.toString().trim() === "" ||
      WBC_MAX.toString().trim() === "" ||
      RBC_MIN.toString().trim() === "" ||
      RBC_MAX.toString().trim() === "" ||
      HGB_MIN.toString().trim() === "" ||
      HGB_MAX.toString().trim() === "" ||
      HCT_MIN.toString().trim() === "" ||
      HCT_MAX.toString().trim() === "" ||
      MCV_MIN.toString().trim() === "" ||
      MCV_MAX.toString().trim() === "" ||
      MCH_MIN.toString().trim() === "" ||
      MCH_MAX.toString().trim() === "" ||
      PLT_MIN.toString().trim() === "" ||
      PLT_MAX.toString().trim() === "" ||
      TRIGLYCERIDE_MIN.toString().trim() === "" ||
      TRIGLYCERIDE_MAX.toString().trim() === "" ||
      HDL_MAX.toString().trim() === "" ||
      HDL_MIN.toString().trim() === "" ||
      LDL_MIN.toString().trim() === "" ||
      LDL_MAX.toString().trim() === "" ||
      STOMACH_ULTRA_SOUND_RESULT.toString().trim() === "" ||
      ECG_RESULT.toString().trim() === "" ||
      XRAY_RESULT.toString().trim() === "" ||
      BLOOD_RESULT.toString().trim() === "" ||
      URINALYSIS_RESULT.toString().trim() === "" ||
      WBC_RESULT.toString().trim() === "" ||
      RBC_RESULT.toString().trim() === "" ||
      HGB_RESULT.toString().trim() === "" ||
      HCT_RESULT.toString().trim() === "" ||
      MCV_RESULT.toString().trim() === "" ||
      MCH_RESULT.toString().trim() === "" ||
      PLT_RESULT.toString().trim() === "" ||
      GLUCOSE_RESULT.toString().trim() === "" ||
      UREA_RESULT.toString().trim() === "" ||
      CREATINE_RESULT.toString().trim() === "" ||
      SGOT_AST_RESULT.toString().trim() === "" ||
      SGPT_ALT_RESULT.toString().trim() === ""
    ) {
      return;
    }
    if (
      newData?.WBC_MAX < newData?.WBC_MIN ||
      newData?.RBC_MAX < newData?.RBC_MIN ||
      newData?.HGB_MAX < newData?.HGB_MIN ||
      newData?.HCT_MAX < newData?.HCT_MIN ||
      newData?.MCV_MAX < newData?.MCV_MIN ||
      newData?.MCH_MAX < newData?.MCH_MIN ||
      newData?.PLT_MAX < newData?.PLT_MIN ||
      Number(newData?.GLUCOSE_MAX) < Number(newData?.GLUCOSE_MIN) ||
      Number(newData?.UREA_MAX) < Number(newData?.UREA_MIN) ||
      Number(newData?.CREATINE_MAX) < Number(newData?.CREATINE_MIN) ||
      newData?.SGOT_AST_MAX < newData?.SGOT_AST_MIN ||
      newData?.SGPT_ALT_MAX < newData?.SGPT_ALT_MIN ||
      Number(newData?.CHOLESTEROL_MAX) < Number(newData?.CHOLESTEROL_MIN) ||
      Number(newData?.HDL_MAX) < Number(newData?.HDL_MIN) ||
      Number(newData?.LDL_MAX) < Number(newData?.LDL_MIN) ||
      Number(newData?.TRIGLYCERIDE_MAX) < Number(newData?.TRIGLYCERIDE_MIN)
    ) {
      return;
    }

    const glucoseData = {
      DEFAULT_UNIT: generalSetting?.GLUCOSE_UNIT_DEFAULT,
      GLUCOSE_HUNGRY:
        unitGlucose === "mg/dL" || unitGlucose === "mg/dl"
          ? (Number(GLUCOSE_RESULT) * 0.055).toFixed(1)
          : Number(GLUCOSE_RESULT),
      GLUCOSE_HUNGRY_REFERENCE_MIN:
        unitGlucose === "mg/dL" || unitGlucose === "mg/dl"
          ? (Number(newData?.GLUCOSE_MIN) * 0.055).toFixed(1)
          : Number(newData?.GLUCOSE_MIN),
      GLUCOSE_HUNGRY_REFERENCE_MAX:
        unitGlucose === "mg/dL" || unitGlucose === "mg/dl"
          ? (Number(newData?.GLUCOSE_MAX) * 0.055).toFixed(1)
          : Number(newData?.GLUCOSE_MAX),
    };

    const liverEnzymesData = {
      SGOT_AST_REFERENCE_MIN: SGOT_AST_MIN,
      SGOT_AST_REFERENCE_MAX: SGOT_AST_MAX,
      SGPT_ALT_REFERENCE_MIN: SGPT_ALT_MIN,
      SGPT_ALT_REFERENCE_MAX: SGPT_ALT_MAX,
      SGOT_AST_DEFAULT_UNIT: SGOT_AST_UNIT_DEFAULT,
      SGPT_ALT_DEFAULT_UNIT: SGPT_ALT_UNIT_DEFAULT,
      SGOT_AST_RESULT: SGOT_AST_RESULT,
      SGPT_ALT_RESULT: SGPT_ALT_RESULT,
    };

    const ureCreatineData = {
      UREA_DEFAULT_UNIT: generalSetting?.UREA_UNIT_DEFAULT,
      CREATINE_DEFAULT_UNIT: generalSetting?.CREATINE_UNIT_DEFAULT,

      UREA_RESULT:
        unitUrea === "mg/dL" || unitUrea === "mg/dl"
          ? (Number(UREA_RESULT) * 0.166).toFixed(1)
          : Number(UREA_RESULT),
      UREA_REFERENCE_MIN:
        unitUrea === "mg/dL" || unitUrea === "mg/dl"
          ? (Number(newData?.UREA_MIN) * 0.166).toFixed(1)
          : Number(newData?.UREA_MIN),
      UREA_REFERENCE_MAX:
        unitUrea === "mg/dL" || unitUrea === "mg/dl"
          ? (Number(newData?.UREA_MAX) * 0.166).toFixed(1)
          : Number(newData?.UREA_MAX),

      CREATINE_RESULT:
        unitCreatinin === "mg/dL" || unitCreatinin === "mg/dl"
          ? (Number(CREATINE_RESULT) * 88.4).toFixed()
          : Number(CREATINE_RESULT),
      CREATINE_REFERENCE_MIN:
        unitCreatinin === "mg/dL" || unitCreatinin === "mg/dl"
          ? (Number(newData?.CREATINE_MIN) * 88.4).toFixed()
          : Number(newData?.CREATINE_MIN),
      CREATINE_REFERENCE_MAX:
        unitCreatinin === "mg/dL" || unitCreatinin === "mg/dl"
          ? (Number(newData?.CREATINE_MAX) * 88.4).toFixed()
          : Number(newData?.CREATINE_MAX),
    };

    const bloodLipidData = {
      CHOLESTEROL_DEFAULT_UNIT: generalSetting?.CHOLESTEROL_UNIT_DEFAULT,
      HDL_DEFAULT_UNIT: generalSetting?.HDL_UNIT_DEFAULT,
      LDL_DEFAULT_UNIT: generalSetting?.LDL_UNIT_DEFAULT,
      TRIGLYCERIDE_DEFAULT_UNIT: generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT,

      CHOLESTEROL_RESULT:
        unitCholesterol === "mg/dL" || unitCholesterol === "mg/dl"
          ? (Number(CHOLESTEROL_RESULT) * 0.02586).toFixed(1)
          : Number(CHOLESTEROL_RESULT),
      CHOLESTEROL_REFERENCE_MIN:
        unitCholesterol === "mg/dL" || unitCholesterol === "mg/dl"
          ? (Number(newData?.CHOLESTEROL_MIN) ** 0.02586).toFixed(1)
          : Number(newData?.CHOLESTEROL_MIN),
      CHOLESTEROL_REFERENCE_MAX:
        unitCholesterol === "mg/dL" || unitCholesterol === "mg/dl"
          ? (Number(newData?.CHOLESTEROL_MAX) * 0.02586).toFixed(1)
          : Number(newData?.CHOLESTEROL_MAX),

      HDL_RESULT:
        unitHDL === "mg/dL" || unitHDL === "mg/dl"
          ? (Number(HDL_RESULT) * 0.0259).toFixed(1)
          : Number(HDL_RESULT),
      HDL_REFERENCE_MIN:
        unitHDL === "mg/dL" || unitHDL === "mg/dl"
          ? (Number(newData?.HDL_MIN) * 0.0259).toFixed(1)
          : Number(newData?.HDL_MIN),
      HDL_REFERENCE_MAX:
        unitHDL === "mg/dL" || unitHDL === "mg/dl"
          ? (Number(newData?.HDL_MAX) * 0.0259).toFixed(1)
          : Number(newData?.HDL_MAX),

      LDL_RESULT:
        unitLDL === "mg/dL" || unitLDL === "mg/dl"
          ? (Number(LDL_RESULT) * 0.0259).toFixed(1)
          : Number(LDL_RESULT),
      LDL_REFERENCE_MAX:
        unitLDL === "mg/dL" || unitLDL === "mg/dl"
          ? (Number(newData?.LDL_MAX) * 0.0259).toFixed(1)
          : Number(newData?.LDL_MAX),
      LDL_REFERENCE_MIN:
        unitLDL === "mg/dL" || unitLDL === "mg/dl"
          ? (Number(newData?.LDL_MIN) * 0.0259).toFixed(1)
          : Number(newData?.LDL_MIN),

      TRIGLYCERIDE_RESULT:
        unitTrigly === "mg/dL" || unitTrigly === "mg/dl"
          ? (Number(TRIGLYCERIDE_RESULT) * 0.01126).toFixed(1)
          : Number(TRIGLYCERIDE_RESULT),
      TRIGLYCERIDE_REFERENCE_MAX:
        unitTrigly === "mg/dL" || unitTrigly === "mg/dl"
          ? (Number(newData?.TRIGLYCERIDE_MAX) * 0.01126).toFixed(1)
          : Number(newData?.TRIGLYCERIDE_MAX),
      TRIGLYCERIDE_REFERENCE_MIN:
        unitTrigly === "mg/dL" || unitTrigly === "mg/dl"
          ? (Number(newData?.TRIGLYCERIDE_MIN) * 0.01126).toFixed(1)
          : Number(newData?.TRIGLYCERIDE_MIN),
    };

    if (physicalExamSelect) {
      if (physicalExamSelect?.Preclinical_Details[0]?.id) {
        handleUpdatePreClinicalExam(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          physicalExamSelect?.Preclinical_Details[0]?.id
        );
        // glucoses
        if (physicalExamSelect?.Preclinical_Details[0]?.Glucoses[0]?.id) {
          handleUpdateGlucose(
            {
              ...glucoseData,
              PRECLINICAL_DETAIL_ID:
                physicalExamSelect?.Preclinical_Details[0]?.id,
              EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
            },
            physicalExamSelect?.Preclinical_Details[0]?.Glucoses[0]?.id
          );
        } else {
          handleCreateGlucose({
            ...glucoseData,
            PRECLINICAL_DETAIL_ID:
              physicalExamSelect?.Preclinical_Details[0]?.id,
            EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
          });
        }
        // liverEnzyme
        if (physicalExamSelect?.Preclinical_Details[0]?.Liver_Enzymes[0]?.id) {
          handleUpdateLiverEnzymes(
            {
              ...liverEnzymesData,
              PRECLINICAL_DETAIL_ID:
                physicalExamSelect?.Preclinical_Details[0]?.id,
              EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
            },
            physicalExamSelect?.Preclinical_Details[0]?.Liver_Enzymes[0].id
          );
        } else {
          handleCreateLiverEnzymes({
            ...liverEnzymesData,
            PRECLINICAL_DETAIL_ID:
              physicalExamSelect?.Preclinical_Details[0]?.id,
            EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
          });
        }
        // Ure creatine
        if (physicalExamSelect?.Preclinical_Details[0]?.Ure_Creatines[0]?.id) {
          handleUpdateUreCreatine(
            {
              ...ureCreatineData,
              PRECLINICAL_DETAIL_ID:
                physicalExamSelect?.Preclinical_Details[0]?.id,
              EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
            },
            physicalExamSelect?.Preclinical_Details[0]?.Ure_Creatines[0]?.id
          );
        } else {
          handlCreateUreCreatine({
            ...ureCreatineData,
            PRECLINICAL_DETAIL_ID:
              physicalExamSelect?.Preclinical_Details[0]?.id,
            EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
          });
        }
        //  blood lipid
        if (physicalExamSelect?.Preclinical_Details[0]?.Blood_Lipids[0]?.id) {
          handleUpdateBloodLipid(
            {
              ...bloodLipidData,
              PRECLINICAL_DETAIL_ID:
                physicalExamSelect?.Preclinical_Details[0]?.id,
              EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
            },
            physicalExamSelect?.Preclinical_Details[0]?.Blood_Lipids[0]?.id
          );
        } else {
          handleCreateBloodLipid({
            ...bloodLipidData,
            PRECLINICAL_DETAIL_ID:
              physicalExamSelect?.Preclinical_Details[0]?.id,
            EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
          });
        }
      } else if (newPreClinicDetail) {
        handleUpdatePreClinicalExam(
          {
            ...result,
            PHYSICAL_EXAM_ID: physicalExamSelect?.id,
          },
          newPreClinicDetail?.id
        );
        handleCreateGlucose({
          ...glucoseData,
          PRECLINICAL_DETAIL_ID: newPreClinicDetail?.id,
          EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
        });
        handleCreateLiverEnzymes({
          ...liverEnzymesData,
          PRECLINICAL_DETAIL_ID: newPreClinicDetail?.id,
          EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
        });
        handleCreateBloodLipid({
          ...bloodLipidData,
          PRECLINICAL_DETAIL_ID: newPreClinicDetail?.id,
          EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
        });
        handlCreateUreCreatine({
          ...ureCreatineData,
          PRECLINICAL_DETAIL_ID: newPreClinicDetail?.id,
          EXAM_DATE: physicalExamSelect?.PHYSICAL_DATE,
        });
      }
      if (!physicalExamSelect?.Physical_Exam_Results[0]?.id) {
        handleCreatePhysicalResult();
      }
      setIsPreClinicalExam(true);
      setIsPhysicalExamResult(false);
      setIsAccessConlusion(true);
      onKeyChange("6");
    }
    // go back
    else if (newPhysicalResult) {
      const newResult = { ...result, PHYSICAL_EXAM_ID: physicalExamGetNew?.id };
      handleUpdatePreClinicalExam(newResult, newPreClinicDetail?.id);
      setIsPreClinicalExam(true);
      setIsPhysicalExamResult(false);
      onKeyChange("6");
    }
    // create new
    else {
      const newResult = { ...result, PHYSICAL_EXAM_ID: physicalExamGetNew?.id };
      handleUpdatePreClinicalExam(newResult, newPreClinicDetail?.id);
      handleCreatePhysicalResult();
      handleCreateGlucose({
        ...glucoseData,
        PRECLINICAL_DETAIL_ID: newPreClinicDetail?.id,
        EXAM_DATE: physicalExamGetNew?.PHYSICAL_DATE,
      });
      handleCreateLiverEnzymes({
        ...liverEnzymesData,
        PRECLINICAL_DETAIL_ID: newPreClinicDetail?.id,
        EXAM_DATE: physicalExamGetNew?.PHYSICAL_DATE,
      });
      handlCreateUreCreatine({
        ...ureCreatineData,
        PRECLINICAL_DETAIL_ID: newPreClinicDetail?.id,
        EXAM_DATE: physicalExamGetNew?.PHYSICAL_DATE,
      });
      handleCreateBloodLipid({
        ...bloodLipidData,
        PRECLINICAL_DETAIL_ID: newPreClinicDetail?.id,
        EXAM_DATE: physicalExamGetNew?.PHYSICAL_DATE,
      });
      setIsPreClinicalExam(true);
      setIsPhysicalExamResult(false);
      onKeyChange("6");
    }
  };

  // UPDATE PRECLINICAL DETAIL
  const handleUpdatePreClinicalExam = async (data, id) => {
    await onUpdatePreClinicExam(data, id);
  };

  // CREATE PHYSICAL EXAM RESULT
  const handleCreatePhysicalResult = async () => {
    await onCreatePhysicalExamResult();
  };

  // create glucose
  const handleCreateGlucose = async (data) => {
    try {
      await glucoseApi.createGlucose(data);
    } catch (error) {
      console.log("error");
    }
  };
  // update glucose
  const handleUpdateGlucose = async (data, id) => {
    try {
      await glucoseApi.updateGlucose(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  // create liver Enzyme
  const handleCreateLiverEnzymes = async (data) => {
    try {
      await liverEnzymeApi.createLiverEnzymes(data);
    } catch (error) {
      console.log("error");
    }
  };
  // update Liver Enzyme
  const handleUpdateLiverEnzymes = async (data, id) => {
    try {
      await liverEnzymeApi.updateLiverEnzymes(data, id);
    } catch (error) {
      console.log("error");
    }
  };
  // create ure creatinin
  const handlCreateUreCreatine = async (data) => {
    try {
      await ureCreatineApi.createUreCreatine(data);
    } catch (error) {
      console.log("error");
    }
  };

  // update Ure creatine
  const handleUpdateUreCreatine = async (data, id) => {
    try {
      await ureCreatineApi.updateUreCreatine(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  // create blood lipid
  const handleCreateBloodLipid = async (data) => {
    try {
      await bloodLipidApi.createBloodLipid(data);
    } catch (error) {
      console.log("error");
    }
  };

  // update bloode lipid
  const handleUpdateBloodLipid = async (data, id) => {
    try {
      await bloodLipidApi.updateBloodLipid(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  const handleBack = async () => {
    if (physicalExamSelect) {
      await onGetClinicalDetail(physicalExamSelect?.Clinical_Details?.[0]?.id);
    }
    onKeyChange("4");
    setIsClinicalExam(false);
    setIsPreClinicalExam(true);
  };

  const handleGetPhysicalDetail = async (id) => {
    const res = await preclinicDetailApi.getPreclinicalDetailById(id);
    setPreclinicDetail(res.data.elements.preclinicalDetail);
  };

  useEffect(() => {
    if (physicalExamSelect) {
      handleGetPhysicalDetail(physicalExamSelect?.Preclinical_Details[0]?.id);
    }
  }, [physicalExamSelect]);

  // Upload file
  useEffect(() => {
    if (preclinicDetail?.Preclinical_Detail_Files?.length > 0) {
      let temporary = preclinicDetail?.Preclinical_Detail_Files?.map(
        (element) => ({
          id: element.id,
          name: element.NAME,
          status: "done",
          url: storage + "/" + element.NAME,
        })
      );
      setFileList(temporary);
    }
    // else {
    //   setFileList([]);
    // }
  }, [preclinicDetail, isRefresh]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const getFileExtension = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
  };
  const onChange = async ({ fileList: newFileList, file }) => {
    let newImage = [...newFileList];

    if (file.status !== "removed") {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        return;
      }
    }
    if (file.status === "uploading") {
      if (newImage && newImage.length > 0) {
        newImage[newFileList.length - 1].status = "success";
      }
      let formData = new FormData();
      if (file && file.originFileObj) {
        formData.append("file", file?.originFileObj);
      }

      formData.append(
        "PRECLINICAL_DETAIL_ID",
        physicalExamSelect
          ? physicalExamSelect?.Preclinical_Details[0]?.id
          : newPreClinicDetail?.id
      );
      const newPreclinicalFile =
        await preclinicalDetailFileApi.createPreclinicalDetailFile(formData);
      newImage[newFileList.length - 1] = {
        ...newPreclinicalFile.data.elements,
        name: newPreclinicalFile.data.elements.NAME,
        status: "done",
        url:
          process.env.REACT_APP_BASE_URL +
          `/files/${newPreclinicalFile.data.elements.NAME}`,
      };
    }
    if (file.status === "removed") {
      try {
        await preclinicalDetailFileApi.deletePreclinicalDetailFile(file.id);
      } catch (error) {
        console.log("error");
      }
    }
    setFileList(newImage);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    const getFileType = getFileExtension(file.url || file.preview);
    if (getFileType) {
      setType(getFileType?.[0]);
    }

    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    setPreviewOpen(true);
  };
  // end upload file
  const handleCancel = () => {
    setPreviewOpen(false);
    setPreviewImage(undefined);
    setType(undefined);
    setPreviewTitle(undefined);
  };

  useEffect(() => {
    if (generalSetting) {
      setGlucoseMin(Number(generalSetting?.GLUCOSE_MIN));
      setGlucoseMax(Number(generalSetting?.GLUCOSE_MAX));
      setUnitGlucose(generalSetting?.GLUCOSE_UNIT_DEFAULT);
      setUreaMin(Number(generalSetting?.UREA_MIN));
      setUreaMax(Number(generalSetting?.UREA_MAX));
      setUnitUrea(generalSetting?.UREA_UNIT_DEFAULT);
      setCreatininMin(Number(generalSetting?.CREATINE_MIN));
      setCreatininMax(Number(generalSetting?.CREATINE_MAX));
      setUnitCreatinin(generalSetting?.CREATINE_UNIT_DEFAULT);
      setCholesterolMin(Number(generalSetting?.CHOLESTEROL_MIN));
      setCholesterolMax(Number(generalSetting?.CHOLESTEROL_MAX));
      setUnitCholesterol(generalSetting?.CHOLESTEROL_UNIT_DEFAULT);
      setHDLMin(Number(generalSetting?.HDL_MIN));
      setHDLMax(Number(generalSetting?.HDL_MAX));
      setUnitHDL(generalSetting?.HDL_UNIT_DEFAULT);
      setLDLMin(Number(generalSetting?.LDL_MIN));
      setLDLMax(Number(generalSetting?.LDL_MAX));
      setUnitLDL(generalSetting?.LDL_UNIT_DEFAULT);
      setTriglyMin(Number(generalSetting?.TRIGLYCERIDE_MIN));
      setTriglyMax(Number(generalSetting?.TRIGLYCERIDE_MAX));
      setUnitTrigly(generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT);
      setSGOTMin(Number(generalSetting?.SGOT_AST_MIN));
      setSGOTMax(Number(generalSetting?.SGOT_AST_MAX));
      setSGPTMin(Number(generalSetting?.SGPT_ALT_MIN));
      setSGPTMax(Number(generalSetting?.SGPT_ALT_MAX));
      setWBCMin(Number(generalSetting?.WBC_MIN));
      setWBCMax(Number(generalSetting?.WBC_MAX));
      setRBCMin(Number(generalSetting?.RBC_MIN));
      setRBCMax(Number(generalSetting?.RBC_MAX));
      setHGBMin(Number(generalSetting?.HGB_MIN));
      setHGBMax(Number(generalSetting?.HGB_MAX));
      setHCTMin(Number(generalSetting?.HCT_MIN));
      setHCTMax(Number(generalSetting?.HCT_MAX));
      setMCVMin(Number(generalSetting?.MCV_MIN));
      setMCVMax(Number(generalSetting?.MCV_MAX));
      setMCHMin(Number(generalSetting?.MCH_MIN));
      setMCHMax(Number(generalSetting?.MCH_MAX));
      setPLTMin(Number(generalSetting?.PLT_MIN));
      setPLTMax(Number(generalSetting?.PLT_MAX));
    }
  }, [generalSetting]);

  // HANDLE CHANGE UNIT GLUCOSE
  const handleUnitGlucose = (value) => {
    setUnitGlucose(value);
    if (value === "mg/dL" || value === "mg/dl") {
      const unit1 = Glucose ? (Glucose / 0.055).toFixed(1) : null;
      const unit2 = glucoseMin ? (glucoseMin / 0.055).toFixed(1) : null;
      const unit3 = glucoseMax ? (glucoseMax / 0.055).toFixed(1) : null;
      setGlucose(Number(unit1));
      setGlucoseMin(Number(unit2));
      setGlucoseMax(Number(unit3));
      form.setFieldsValue({
        GLUCOSE_RESULT: unit1 ? unit1 : null,
        GLUCOSE_MIN: unit2,
        GLUCOSE_MAX: unit3,
      });
    }
    if (value === "mmol/L" || value === "mmol/l") {
      const unit4 = Glucose ? (Glucose * 0.055).toFixed(1) : null;
      const unit5 = glucoseMin ? (glucoseMin * 0.055).toFixed(1) : null;
      const unit6 = glucoseMax ? (glucoseMax * 0.055).toFixed(1) : null;
      setGlucose(Number(unit4));
      setGlucoseMin(Number(unit5));
      setGlucoseMax(Number(unit6));
      form.setFieldsValue({
        GLUCOSE_RESULT: unit4,
        GLUCOSE_MIN: unit5,
        GLUCOSE_MAX: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT URE
  const handleUnitUre = (value) => {
    setUnitUrea(value);
    if (value === "mg/dL" || value === "mg/dl") {
      const unit1 = Urea ? (Urea / 0.166).toFixed(1) : null;
      const unit2 = UreaMin ? (UreaMin / 0.166).toFixed(1) : null;
      const unit3 = UreaMax ? (UreaMax / 0.166).toFixed(1) : null;
      setUrea(Number(unit1));
      setUreaMin(Number(unit2));
      setUreaMax(Number(unit3));
      form.setFieldsValue({
        UREA_RESULT: unit1,
        UREA_MIN: unit2,
        UREA_MAX: unit3,
      });
    }
    if (value === "mmol/L" || value === "mmol/l") {
      const unit4 = Urea ? (Urea * 0.166).toFixed(1) : null;
      const unit5 = UreaMin ? (UreaMin * 0.166).toFixed(1) : null;
      const unit6 = UreaMax ? (UreaMax * 0.166).toFixed(1) : null;
      setUrea(Number(unit4));
      setUreaMin(Number(unit5));
      setUreaMax(Number(unit6));
      form.setFieldsValue({
        UREA_RESULT: unit4,
        UREA_MIN: unit5,
        UREA_MAX: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT CREATININ
  const handleUnitCreatinin = (value) => {
    setUnitCreatinin(value);
    if (value === "mg/dL" || value === "mg/dl") {
      const unit1 = Creatine ? (Creatine / 88.4).toFixed(2) : null;
      const unit2 = CreatininMin ? (CreatininMin / 88.4).toFixed(2) : null;
      const unit3 = CreatininMax ? (CreatininMax / 88.4).toFixed(2) : null;
      setCreatine(Number(unit1));
      setCreatininMin(Number(unit2));
      setCreatininMax(Number(unit3));
      form.setFieldsValue({
        CREATINE_RESULT: unit1,
        CREATINE_MIN: unit2,
        CREATINE_MAX: unit3,
      });
    }
    if (value === "µmol/L" || value === "µmol/l") {
      const unit4 = Creatine ? (Creatine * 88.4).toFixed() : null;
      const unit5 = CreatininMin ? (CreatininMin * 88.4).toFixed() : null;
      const unit6 = CreatininMax ? (CreatininMax * 88.4).toFixed() : null;
      setCreatine(Number(unit4));
      setCreatininMin(Number(unit5));
      setCreatininMax(Number(unit6));
      form.setFieldsValue({
        CREATINE_RESULT: unit4,
        CREATINE_MIN: unit5,
        CREATINE_MAX: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT CHOLESTEROL
  const handleUnitCholesterol = (value) => {
    setUnitCholesterol(value);
    if (value === "mg/dL" || value === "mg/dl") {
      const unit1 = Cholesterol ? (Cholesterol / 0.02586).toFixed(1) : null;
      const unit2 = CholesterolMin
        ? (CholesterolMin / 0.02586).toFixed(1)
        : null;
      const unit3 = CholesterolMax
        ? (CholesterolMax / 0.02586).toFixed(1)
        : null;
      setCholesterol(Number(unit1));
      setCholesterolMin(Number(unit2));
      setCholesterolMax(Number(unit3));
      form.setFieldsValue({
        CHOLESTEROL_RESULT: unit1,
        CHOLESTEROL_MIN: unit2,
        CHOLESTEROL_MAX: unit3,
      });
    }
    if (value === "mmol/L" || value === "mmol/l") {
      const unit4 = Cholesterol ? (Cholesterol * 0.02586).toFixed(1) : null;
      const unit5 = CholesterolMin
        ? (CholesterolMin * 0.02586).toFixed(1)
        : null;
      const unit6 = CholesterolMax
        ? (CholesterolMax * 0.02586).toFixed(1)
        : null;
      setCholesterol(Number(unit4));
      setCholesterolMin(Number(unit5));
      setCholesterolMax(Number(unit6));
      form.setFieldsValue({
        CHOLESTEROL_RESULT: unit4,
        CHOLESTEROL_MIN: unit5,
        CHOLESTEROL_MAX: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT HDL
  const handleUnitHDL = (value) => {
    setUnitHDL(value);
    if (value === "mg/dL" || value === "mg/dl") {
      const unit1 = HDL ? (HDL / 0.0259).toFixed(1) : null;
      const unit2 = HDLMin ? (HDLMin / 0.0259).toFixed(1) : null;
      const unit3 = HDLMax ? (HDLMax / 0.0259).toFixed(1) : null;
      setHDL(Number(unit1));
      setHDLMin(Number(unit2));
      setHDLMax(Number(unit3));
      form.setFieldsValue({
        HDL_RESULT: unit1,
        HDL_MIN: unit2,
        HDL_MAX: unit3,
      });
    }
    if (value === "mmol/L" || value === "mmol/l") {
      const unit4 = HDL ? (HDL * 0.0259).toFixed(1) : null;
      const unit5 = HDLMin ? (HDLMin * 0.0259).toFixed(1) : null;
      const unit6 = HDLMax ? (HDLMax * 0.0259).toFixed(1) : null;
      setHDL(Number(unit4));
      setHDLMin(Number(unit5));
      setHDLMax(Number(unit6));
      form.setFieldsValue({
        HDL_RESULT: unit4,
        HDL_MIN: unit5,
        HDL_MAX: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT LDL
  const handleUnitLDL = (value) => {
    setUnitLDL(value);
    if (value === "mg/dL" || value === "mg/dl") {
      const unit1 = LDL ? (LDL / 0.0259).toFixed(1) : null;
      const unit2 = LDLMin ? (LDLMin / 0.0259).toFixed(1) : null;
      const unit3 = LDLMax ? (LDLMax / 0.0259).toFixed(1) : null;
      setLDL(Number(unit1));
      setLDLMin(Number(unit2));
      setLDLMax(Number(unit3));
      form.setFieldsValue({
        LDL_RESULT: unit1,
        LDL_MIN: unit2,
        LDL_MAX: unit3,
      });
    }
    if (value === "mmol/L" || value === "mmol/l") {
      const unit4 = LDL ? (LDL * 0.0259).toFixed(1) : null;
      const unit5 = LDLMin ? (LDLMin * 0.0259).toFixed(1) : null;
      const unit6 = LDLMax ? (LDLMax * 0.0259).toFixed(1) : null;
      setLDL(Number(unit4));
      setLDLMin(Number(unit5));
      setLDLMax(Number(unit6));
      form.setFieldsValue({
        LDL_RESULT: unit4,
        LDL_MIN: unit5,
        LDL_MAX: unit6,
      });
    }
  };

  // HANDLE CHANGE UNIT TRIGLY
  const handleUnitTrigly = (value) => {
    setUnitTrigly(value);
    if (value === "mg/dL" || value === "mg/dl") {
      const unit1 = Triglyceride ? (Triglyceride / 0.01126).toFixed(1) : null;
      const unit2 = TriglyMin ? (TriglyMin / 0.01126).toFixed(1) : null;
      const unit3 = TriglyMax ? (TriglyMax / 0.01126).toFixed(1) : null;
      setTriglyceride(Number(unit1));
      setTriglyMin(Number(unit2));
      setTriglyMax(Number(unit3));
      form.setFieldsValue({
        TRIGLYCERIDE_RESULT: unit1,
        TRIGLYCERIDE_MIN: unit2,
        TRIGLYCERIDE_MAX: unit3,
      });
    }
    if (value === "mmol/L" || value === "mmol/l") {
      const unit4 = Triglyceride ? (Triglyceride * 0.01126).toFixed(1) : null;
      const unit5 = TriglyMin ? (TriglyMin * 0.01126).toFixed(1) : null;
      const unit6 = TriglyMax ? (TriglyMax * 0.01126).toFixed(1) : null;
      setTriglyceride(Number(unit4));
      setTriglyMin(Number(unit5));
      setTriglyMax(Number(unit6));
      form.setFieldsValue({
        TRIGLYCERIDE_RESULT: unit4,
        TRIGLYCERIDE_MIN: unit5,
        TRIGLYCERIDE_MAX: unit6,
      });
    }
  };

  return (
    <>
      <Row style={styleDisplay.marginTop}>
        <Col span={24}>
          <Form
            name="preclinic"
            colon={false}
            ref={SubclinicalExamRef}
            form={form}
            validateMessages={validateMessages}
            labelAlign="left"
            labelWrap
          >
            {/* 1 */}
            <Form.Item>
              <Row>
                <Col span={10} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5} style={{ color: "red" }}>
                        1. Siêu âm bụng tổng quát
                      </Title>
                    }
                    name="STOMACH_ULTRA_SOUND_DESC"
                    labelCol={{ span: 12 }}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="STOMACH_ULTRA_SOUND_RESULT"
                    label="Kết luận"
                    rules={[{ required: true }]}
                    labelCol={{ span: 4, offset: 4 }}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            {/* 2 */}
            <Form.Item>
              <Row>
                <Col span={10} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5} style={{ color: "#4B73DE" }}>
                        2. Siêu âm tuyến giáp
                      </Title>
                    }
                    name="THYROID_ULTRA_SOUND_DESC"
                    labelCol={{ span: 12 }}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="THYROID_ULTRA_SOUND_RESULT"
                    label="Kết luận"
                    labelCol={{ span: 4, offset: 4 }}
                    rules={[{ required: true }]}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            {/* 3 */}
            <Form.Item>
              <Row>
                <Col span={10} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5} style={{ color: "#4B73DE" }}>
                        3. Siêu âm tuyến vú
                      </Title>
                    }
                    name="MAMMARY_ULTRA_SOUND_DESC"
                    labelCol={{ span: 12 }}
                  >
                    <Input
                      allowClear
                      disabled={isShow ? false : true}
                      onPressEnter={handleBlockEnter}
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="MAMMARY_ULTRA_SOUND_RESULT"
                    label="Kết luận"
                    labelCol={{ span: 4, offset: 4 }}
                    rules={[
                      {
                        required: isShow ? true : false,
                      },
                    ]}
                  >
                    <Input
                      allowClear
                      disabled={isShow ? false : true}
                      onPressEnter={handleBlockEnter}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            {/* 5 */}
            <Form.Item>
              <Row>
                <Col span={10} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5} style={{ color: "red" }}>
                        4. Điện tâm đồ
                      </Title>
                    }
                    name="ECG_DESC"
                    labelCol={{ span: 12 }}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="ECG_RESULT"
                    label="Kết luận"
                    rules={[{ required: true }]}
                    labelCol={{ span: 4, offset: 4 }}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            {/* 6 */}
            <Form.Item>
              <Row>
                <Col span={10} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5} style={{ color: "red" }}>
                        5. X-Quang phổi
                      </Title>
                    }
                    name="XRAY_DESC"
                    labelCol={{ span: 12 }}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="XRAY_RESULT"
                    label="Kết luận"
                    rules={[{ required: true }]}
                    labelCol={{ span: 4, offset: 4 }}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            {/* 7 */}
            <Form.Item>
              <Row>
                <Col span={22} offset={2}>
                  <Form.Item>
                    <Title level={5} style={{ color: "#4B73DE" }}>
                      6. Pap's mear
                    </Title>
                  </Form.Item>
                </Col>
                <Col span={20} offset={2}>
                  <Form.Item
                    name="PAP_SMEAR_RESULT"
                    label="Kết luận"
                    labelCol={{
                      lg: { span: 2, offset: 4 },
                      // xs: { span: 4, offset: 1 },
                    }}
                    rules={[
                      {
                        required: isBoolean ? false : true,
                      },
                    ]}
                  >
                    <Input
                      disabled={isBoolean ? true : false}
                      onPressEnter={handleBlockEnter}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            {/* 9 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item>
                    <Title level={5} type="danger">
                      7. Tổng phân tích tế bào máu
                    </Title>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row style={{ height: "70px" }}>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        7.1. WBC <br />
                        &emsp;&emsp;&nbsp;Số lượng bạch cầu
                      </Title>
                    }
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="WBC_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(WBC, WBCMin, WBCMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(WBC, WBCMin, WBCMax),
                          }}
                          onChange={(value) => {
                            setWBC(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="WBC_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="WBC_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), WBCMax, setErrorWBC);
                            setWBCMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorWBC}</span>
                      <Form.Item
                        name="WBC_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), WBCMin, setErrorWBC);
                            setWBCMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        name="WBC_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row style={{ height: "70px" }}>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        7.2. RBC <br />
                        &emsp;&emsp;&nbsp;Số lượng hồng cầu
                      </Title>
                    }
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="RBC_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(RBC, RBCMin, RBCMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(RBC, RBCMin, RBCMax),
                          }}
                          onChange={(value) => {
                            setRBC(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="RBC_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="RBC_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), RBCMax, setErrorRBC);
                            setRBCMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorRBC}</span>
                      <Form.Item
                        name="RBC_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), RBCMin, setErrorRBC);
                            setRBCMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="RBC_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row style={{ height: "70px" }}>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        7.3. HGB <br />
                        &emsp;&emsp;&nbsp;Huyết sắc tố
                      </Title>
                    }
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="HGB_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(HGB, HGBMin, HGBMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(HGB, HGBMin, HGBMax),
                          }}
                          onChange={(value) => {
                            setHGB(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="HGB_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="HGB_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), HGBMax, setErrorHGB);
                            setHGBMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorHGB}</span>
                      <Form.Item
                        name="HGB_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), HGBMin, setErrorHGB);
                            setHGBMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="HGB_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row style={{ height: "70px" }}>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        7.4. HCT <br /> &emsp;&emsp;&nbsp;Dung tích hồng cầu
                      </Title>
                    }
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="HCT_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(HCT, HCTMin, HCTMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(HCT, HCTMin, HCTMax),
                          }}
                          onChange={(value) => {
                            setHCT(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="HCT_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="HCT_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), HCTMax, setErrorHCT);
                            setHCTMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorHCT}</span>
                      <Form.Item
                        name="HCT_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), HCTMin, setErrorHCT);
                            setHCTMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="HCT_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row style={{ height: "70px" }}>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        7.5. MCV <br /> &emsp;&emsp;&nbsp;Thể tích trung bình
                        một hồng cầu
                      </Title>
                    }
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="MCV_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(MCV, MCVMin, MCVMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(MCV, MCVMin, MCVMax),
                          }}
                          onChange={(value) => {
                            setMCV(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="MCV_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="MCV_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), MCVMax, setErrorMCV);
                            setMCVMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorMCV}</span>
                      <Form.Item
                        name="MCV_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), MCVMin, setErrorMCV);
                            setMCVMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="MCV_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row style={{ height: "70px" }}>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        7.6. MCH <br /> &emsp;&emsp;&nbsp;Số lượng huyết sắc tố
                        trung bình một hồng cầu
                      </Title>
                    }
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="MCH_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(MCH, MCHMin, MCHMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(MCH, MCHMin, MCHMax),
                          }}
                          onChange={(value) => {
                            setMCH(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="MCH_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="MCH_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), MCHMax, setErrorMCH);
                            setMCHMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorMCH}</span>
                      <Form.Item
                        name="MCH_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), MCHMin, setErrorMCH);
                            setMCHMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="MCH_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row style={{ height: "70px" }}>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={
                      <Title level={5}>
                        7.7. PLT <br /> &emsp;&emsp;&nbsp;Số lượng tiểu cầu
                      </Title>
                    }
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="PLT_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(PLT, PLTMin, PLTMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(PLT, PLTMin, PLTMax),
                          }}
                          onChange={(value) => {
                            setPLT(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="PLT_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="PLT_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), PLTMax, setErrorPLT);
                            setPLTMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorPLT}</span>
                      <Form.Item
                        name="PLT_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), PLTMin, setErrorPLT);
                            setPLTMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="PLT_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={20} offset={2}>
                  <Form.Item
                    name="BLOOD_RESULT"
                    label="Kết luận"
                    rules={[{ required: true }]}
                    labelCol={{
                      lg: { span: 2, offset: 4 },
                      xs: { span: 2, offset: 4 },
                    }}
                  >
                    <Input allowClear onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            {/* 10 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item>
                    <Title level={5} type="danger">
                      8. Đường huyết đói
                    </Title>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={<Title level={5}>Glucose</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="GLUCOSE_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(
                          Glucose,
                          glucoseMin,
                          glucoseMax,
                          true
                        )}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(Glucose, glucoseMin, glucoseMax),
                          }}
                          onChange={(value) => {
                            setGlucose(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="DEFAULT_UNIT"
                      >
                        <Select onChange={handleUnitGlucose}>
                          <Option value={generalSetting?.GLUCOSE_UNIT_DEFAULT}>
                            {generalSetting?.GLUCOSE_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="GLUCOSE_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(
                              Number(value),
                              glucoseMax,
                              setErrorGlucose
                            );
                            setGlucoseMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorGlucose}</span>
                      <Form.Item
                        name="GLUCOSE_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(
                              Number(value),
                              glucoseMin,
                              setErrorGlucose
                            );
                            setGlucoseMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="DEFAULT_UNIT"
                        style={styleInput.resultWidth}
                      >
                        <Select onChange={handleUnitGlucose}>
                          <Option value={generalSetting?.GLUCOSE_UNIT_DEFAULT}>
                            {generalSetting?.GLUCOSE_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            {/* 11 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item>
                    <Title level={5} type="danger">
                      9. Chức năng thận
                    </Title>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={20} offset={2}>
                  <Form.Item
                    label={<Title level={5}>9.1 Urea</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="UREA_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(Urea, UreaMin, UreaMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(Urea, UreaMin, UreaMax),
                          }}
                          onChange={(value) => {
                            setUrea(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="UREA_UNIT_DEFAULT"
                      >
                        <Select onChange={handleUnitUre}>
                          <Option value={generalSetting?.UREA_UNIT_DEFAULT}>
                            {generalSetting?.UREA_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="UREA_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), UreaMax, setErrorUrea);
                            setUreaMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorUrea}</span>
                      <Form.Item
                        name="UREA_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), UreaMin, setErrorUrea);
                            setUreaMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="UREA_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Select onChange={handleUnitUre}>
                          <Option value={generalSetting?.UREA_UNIT_DEFAULT}>
                            {generalSetting?.UREA_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={<Title level={5}>9.2 Creatine</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="CREATINE_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(
                          Creatine,
                          CreatininMin,
                          CreatininMax,
                          true
                        )}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(
                              Creatine,
                              CreatininMin,
                              CreatininMax
                            ),
                          }}
                          onChange={(value) => {
                            setCreatine(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="CREATINE_UNIT_DEFAULT"
                      >
                        <Select onChange={handleUnitCreatinin}>
                          <Option value={generalSetting?.CREATINE_UNIT_DEFAULT}>
                            {generalSetting?.CREATINE_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="CREATINE_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(
                              Number(value),
                              CreatininMax,
                              setErrorCreatinin
                            );
                            setCreatininMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorCreatinin}</span>
                      <Form.Item
                        name="CREATINE_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(
                              Number(value),
                              CreatininMin,
                              setErrorCreatinin
                            );
                            setCreatininMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="CREATINE_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Select onChange={handleUnitCreatinin}>
                          <Option value={generalSetting?.CREATINE_UNIT_DEFAULT}>
                            {generalSetting?.CREATINE_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            {/* 12 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xl={22} offset={2}>
                  <Form.Item>
                    <Title level={5} type="danger">
                      10. Chức năng gan
                    </Title>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={<Title level={5}>10.1 SGOT/AST</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="SGOT_AST_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(SGOTAST, SGOTMin, SGOTMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(SGOTAST, SGOTMin, SGOTMax),
                          }}
                          onChange={(value) => {
                            setSGOTAST(value);
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="SGOT_AST_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="SGOT_AST_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), SGOTMax, setErrorSGOT);
                            setSGOTMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorSGOT}</span>
                      <Form.Item
                        name="SGOT_AST_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), SGOTMin, setErrorSGOT);
                            setSGOTMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="SGOT_AST_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                        disabled
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={<Title level={5}>10.2 SGPT/ALT</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="SGPT_ALT_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(SGPTALT, SGPTMin, SGPTMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(SGPTALT, SGPTMin, SGPTMax),
                          }}
                          onChange={(value) => {
                            setSGPTALT(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="SGPT_ALT_UNIT_DEFAULT"
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="SGPT_ALT_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), SGPTMax, setErrorSGPT);
                            setSGPTMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorSGPT}</span>
                      <Form.Item
                        name="SGPT_ALT_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), SGPTMin, setErrorSGPT);
                            setSGPTMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="SGPT_ALT_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Input disabled />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            {/* 13 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xl={22} offset={2}>
                  <Form.Item>
                    <Title level={5} style={{ color: "#4B73DE" }}>
                      11. Chỉ số Lipid máu (Bộ mỡ máu)
                    </Title>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={<Title level={5}>11.1 Cholesterol</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="CHOLESTEROL_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(
                          Cholesterol,
                          CholesterolMin,
                          CholesterolMax,
                          true
                        )}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(
                              Cholesterol,
                              CholesterolMin,
                              CholesterolMax
                            ),
                          }}
                          onChange={(value) => {
                            setCholesterol(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="CHOLESTEROL_UNIT_DEFAULT"
                      >
                        <Select onChange={handleUnitCholesterol}>
                          <Option
                            value={generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                          >
                            {generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="CHOLESTEROL_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(
                              Number(value),
                              CholesterolMax,
                              setErrorCholes
                            );
                            setCholesterolMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorCholes}</span>
                      <Form.Item
                        name="CHOLESTEROL_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(
                              Number(value),
                              CholesterolMin,
                              setErrorCholes
                            );
                            setCholesterolMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="CHOLESTEROL_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Select onChange={handleUnitCholesterol}>
                          <Option
                            value={generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                          >
                            {generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={<Title level={5}>11.2 HDL</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="HDL_RESULT"
                        style={styleInput.resultWidth2}
                        initialValue={null}
                        rules={[{ required: true }]}
                        className={CheckError(HDL, HDLMin, HDLMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(HDL, HDLMin, HDLMax),
                          }}
                          onChange={(value) => {
                            setHDL(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="HDL_UNIT_DEFAULT"
                      >
                        <Select onChange={handleUnitHDL}>
                          <Option value={generalSetting?.HDL_UNIT_DEFAULT}>
                            {generalSetting?.HDL_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="HDL_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), HDLMax, setErrorHDL);
                            setHDLMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorHDL}</span>
                      <Form.Item
                        name="HDL_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), HDLMin, setErrorHDL);
                            setHDLMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="HDL_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Select onChange={handleUnitHDL}>
                          <Option value={generalSetting?.HDL_UNIT_DEFAULT}>
                            {generalSetting?.HDL_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={<Title level={5}>11.3 LDL</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="LDL_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(LDL, LDLMin, LDLMax, true)}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(LDL, LDLMin, LDLMax),
                          }}
                          onChange={(value) => {
                            setLDL(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="LDL_UNIT_DEFAULT"
                      >
                        <Select onChange={handleUnitLDL}>
                          <Option value={generalSetting?.LDL_UNIT_DEFAULT}>
                            {generalSetting?.LDL_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="LDL_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), LDLMax, setErrorLDL);
                            setLDLMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorLDL}</span>
                      <Form.Item
                        name="LDL_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), LDLMin, setErrorLDL);
                            setLDLMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="LDL_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Select onChange={handleUnitLDL}>
                          <Option value={generalSetting?.LDL_UNIT_DEFAULT}>
                            {generalSetting?.LDL_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col lg={10} xs={22} offset={2}>
                  <Form.Item
                    label={<Title level={5}>11.4 Triglyceride</Title>}
                    labelCol={{ span: 9, offset: 2 }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="TRIGLYCERIDE_RESULT"
                        style={styleInput.resultWidth2}
                        rules={[{ required: true }]}
                        className={CheckError(
                          Triglyceride,
                          TriglyMin,
                          TriglyMax,
                          true
                        )}
                      >
                        <NumericInput
                          style={{
                            color: CheckError(
                              Triglyceride,
                              TriglyMin,
                              TriglyMax
                            ),
                          }}
                          onChange={(value) => {
                            setTriglyceride(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <Form.Item
                        style={styleInput.unitWidth}
                        name="TRIGLYCERIDE_UNIT_DEFAULT"
                      >
                        <Select onChange={handleUnitTrigly}>
                          <Option
                            value={generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                          >
                            {generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col lg={10} xs={22}>
                  <Form.Item
                    wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                  >
                    <Input.Group compact>
                      <span style={styleRequire}>(*)</span>
                      <Form.Item
                        name="TRIGLYCERIDE_MIN"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMin(Number(value), TriglyMax, setErrorTrigly);
                            setTriglyMin(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>
                      <span style={styleError}>{errorTrigly}</span>
                      <Form.Item
                        name="TRIGLYCERIDE_MAX"
                        style={styleInput.resultWidth}
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          onChange={(value) => {
                            checkMax(Number(value), TriglyMin, setErrorTrigly);
                            setTriglyMax(Number(value));
                          }}
                          onPressEnter={handleBlockEnter}
                        />
                      </Form.Item>

                      <Form.Item
                        name="TRIGLYCERIDE_UNIT_DEFAULT"
                        style={styleInput.resultWidth}
                      >
                        <Select onChange={handleUnitTrigly}>
                          <Option
                            value={generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                          >
                            {generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                          </Option>
                          <Option value="mg/dL">mg/dL</Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            {/* 14 */}
            <Form.Item>
              <Row>
                <Col span={22} offset={2}>
                  <Form.Item>
                    <Title level={5} style={{ color: "red" }}>
                      12. Tổng phân tích nước tiểu
                    </Title>
                  </Form.Item>
                </Col>
                <Col span={20} offset={2}>
                  <Form.Item
                    name="URINALYSIS_RESULT"
                    label="Kết luận"
                    rules={[{ required: true }]}
                    labelCol={{
                      lg: { span: 2, offset: 4 },
                      // xs: { span: 4, offset: 1 },
                    }}
                  >
                    <Input onPressEnter={handleBlockEnter} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            {/* 16 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={5} offset={2}>
                  <Form.Item>
                    <Title level={5} style={{ color: "#4B73DE" }}>
                      13. Hồ sơ/kết quả khám sức khỏe
                    </Title>
                  </Form.Item>
                </Col>
                <Col span={15}>
                  <Form.Item name="files">
                    <Upload
                      beforeUpload={beforeUpload}
                      maxCount={5}
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={handlePreview}
                      listType="picture"
                      accept=".png, .jpg, .jpeg, .pdf, .csv, 
                      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                      application/vnd.ms-excel, .heif, .heic"
                    >
                      {fileList?.length < 5 && (
                        <UploadOutlined style={{ fontSize: 30 }} />
                      )}
                    </Upload>
                    {(type && type === "xls") || type === "xlsx" ? (
                      ""
                    ) : (
                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                        width={1200}
                        style={{ top: 20 }}
                        key={type}
                      >
                        {type && type === "pdf" ? (
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                            <Viewer
                              fileUrl={previewImage}
                              plugins={[defaultLayoutPluginInstance]}
                            />
                          </Worker>
                        ) : (
                          <FileViewer
                            fileType={type}
                            filePath={previewImage}
                            errorComponent={CustomErrorComponent}
                            onError={onError}
                          />
                        )}
                      </Modal>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Row style={{ marginTop: 20 }}>
              <Col span={2} offset={2}>
                <Button onClick={handleBack}>Quay lại</Button>
              </Col>
              <Col span={2} push={17}>
                <Button
                  onClick={handleOk}
                  htmlType="submit"
                  form="preclinic"
                  key="preclinic"
                >
                  Tiếp
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FrmSubclinicalExamination;
