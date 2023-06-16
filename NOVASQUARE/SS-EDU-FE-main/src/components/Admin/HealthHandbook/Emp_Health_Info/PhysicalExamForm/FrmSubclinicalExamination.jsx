import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Input, Typography, Select } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import { physicalExamNewState } from "../../../../../recoil/atom/physicalExamNew";
import { UploadOutlined } from "@ant-design/icons";
import { generalSettingState } from "../../../../../recoil/atom/generalSettingState";
import { useGeneralSetting } from "../../../../../hooks/generalSettings";
import { employeeSelectState } from "../../../../../recoil/atom/employeeState";
import NumericInput from "../../../../NumericInput/NumericInput";
import Upload from "antd/lib/upload/Upload";
import Modal from "antd/lib/modal/Modal";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import preclinicalDetailFileApi from "../../../../../api/preclinicalDetailFileApi";
import { useSnackbar } from "notistack";
import { newestPreclinicalDetailState } from "../../../../../recoil/atom/preClinicalDetailState";
import { newestPhysicalExamResultState } from "../../../../../recoil/atom/physicalExamResult";
import glucoseApi from "../../../../../api/glucoseApi";
import liverEnzymeApi from "../../../../../api/liverEnzymeApi";
import ureCreatineApi from "../../../../../api/ureCreatineApi";
import bloodLipidApi from "../../../../../api/bloodLipidApi";
import { Logger } from "logging-library";
import { CustomErrorComponent } from "custom-error";
import FileViewer from "react-file-viewer";
import preclinicalDetailApi from "../../../../../api/preclinicDetailApi";
import { generalSettingData } from "../../../../../common/getAllApi";
import {
  handleBlockEnter,
  validateMessages,
  getBase64,
  CheckError,
  checkMin,
  checkMax,
} from "../../../../../common";

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
  height: {
    height: 70,
  },
};
const styleRequire = {
  width: "10%",
  color: "red",
  fontSize: 12,
  paddingTop: 5,
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

const styleError = {
  position: "absolute",
  color: "#ff4d4f",
  top: 32,
  left: "10%",
};

const storage = process.env.REACT_APP_BASE_URL + "/files";

const FrmSubclinicalExamination = ({
  setIsClinicalExam,
  setIsPreClinicalExam,
  setIsPhysicalExamResult,
  onKeyChange,
  SubclinicalExamRef,
  onCreatePhysicalExamResult,
  onUpdatePreClinicExam,
  fileList,
  setFileList,
}) => {
  useGeneralSetting();
  const [form] = Form.useForm();
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
  const [type, setType] = useState(undefined);

  const [WBC, setWBC] = useState("");
  const [RBC, setRBC] = useState("");
  const [HGB, setHGB] = useState("");
  const [HCT, setHCT] = useState("");
  const [MCV, setMCV] = useState("");
  const [MCH, setMCH] = useState("");
  const [PLT, setPLT] = useState("");
  const [BoneDensity, setBoneDensity] = useState("");
  const [Glucose, setGlucose] = useState("");
  const [Urea, setUrea] = useState("");
  const [Creatine, setCreatine] = useState("");
  const [SGOTAST, setSGOTAST] = useState("");
  const [SGPTALT, setSGPTALT] = useState("");
  const [Cholesterol, setCholesterol] = useState("");
  const [HDL, setHDL] = useState("");
  const [LDL, setLDL] = useState("");
  const [Triglyceride, setTriglyceride] = useState("");
  const [BloodCanxi, setBloodCanxi] = useState("");
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
  const [CanxiMin, setCanxiMin] = useState(null);
  const [CanxiMax, setCanxiMax] = useState(null);
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
  const [errorCanxi, setErrorCanxi] = useState("");

  const [isBoolean, setIsBoolean] = useState(false);
  const [preclinicDetail, setPreclinicDetail] = useState(undefined);
  const { enqueueSnackbar } = useSnackbar();

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      enqueueSnackbar("File tải lên phải nhỏ hơn 5MB!", { variant: "error" });
    }
    return isLt2M;
  };

  useEffect(() => {
    if (employeeSelect) {
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
    if (generalSetting) {
      setGlucoseMin(Number(generalSetting?.GLUCOSE_MIN));
      setGlucoseMax(Number(generalSetting?.GLUCOSE_MAX));
      setUreaMin(Number(generalSetting?.UREA_MIN));
      setUreaMax(Number(generalSetting?.UREA_MAX));
      setCreatininMin(Number(generalSetting?.CREATINE_MIN));
      setCreatininMax(Number(generalSetting?.CREATINE_MAX));
      setCholesterolMin(Number(generalSetting?.CHOLESTEROL_MIN));
      setCholesterolMax(Number(generalSetting?.CHOLESTEROL_MAX));
      setHDLMin(Number(generalSetting?.HDL_MIN));
      setHDLMax(Number(generalSetting?.HDL_MAX));
      setLDLMin(Number(generalSetting?.LDL_MIN));
      setLDLMax(Number(generalSetting?.LDL_MAX));
      setTriglyMin(Number(generalSetting?.TRIGLYCERIDE_MIN));
      setTriglyMax(Number(generalSetting?.TRIGLYCERIDE_MAX));
      setCanxiMin(Number(generalSetting?.BLOOD_CALCIUM_MIN));
      setCanxiMax(Number(generalSetting?.BLOOD_CALCIUM_MAX));
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

  //CHECK GENERAL SETTING LIST
  useEffect(() => {
    if (generalSetting.length === 0) {
      generalSettingData(generalSetting, setGeneralSetting);
    }
  }, [generalSetting]);

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
      setBoneDensity(newData?.BONE_DENSITY_RATING);
      setGlucose(newData?.Glucoses[0]?.GLUCOSE_HUNGRY);
      setUrea(newData?.Ure_Creatines[0]?.UREA_RESULT);
      setCreatine(newData?.Ure_Creatines[0]?.CREATINE_RESULT);
      setSGOTAST(newData?.Liver_Enzymes[0]?.SGOT_AST_RESULT);
      setSGPTALT(newData?.Liver_Enzymes[0]?.SGPT_ALT_RESULT);
      setCholesterol(newData?.Blood_Lipids[0]?.CHOLESTEROL_RESULT);
      setHDL(newData?.Blood_Lipids[0]?.HDL_RESULT);
      setLDL(newData?.Blood_Lipids[0]?.LDL_RESULT);
      setTriglyceride(newData?.Blood_Lipids[0]?.TRIGLYCERIDE_RESULT);
      setBloodCanxi(newData?.BLOOD_CALCIUM_RESULT);
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
        WBC_RESULT: newData?.WBC_RESULT?.toString(),
        WBC_UNIT_DEFAULT: newData
          ? newData?.WBC_UNIT_DEFAULT
          : generalSetting?.WBC_UNIT_DEFAULT,
        WBC_MIN: newData ? newData?.WBC_MIN : generalSetting?.WBC_MIN,
        WBC_MAX: newData ? newData?.WBC_MAX : generalSetting?.WBC_MAX,

        RBC_RESULT: newData?.RBC_RESULT?.toString(),
        RBC_MIN: newData ? newData?.RBC_MIN : generalSetting?.RBC_MIN,
        RBC_MAX: newData ? newData?.RBC_MAX : generalSetting?.RBC_MAX,
        RBC_UNIT_DEFAULT: newData
          ? newData?.RBC_UNIT_DEFAULT
          : generalSetting?.RBC_UNIT_DEFAULT,

        HGB_RESULT: newData?.HGB_RESULT?.toString(),
        HGB_MIN: newData ? newData?.HGB_MIN : generalSetting?.HGB_MIN,
        HGB_MAX: newData ? newData?.HGB_MAX : generalSetting?.HGB_MAX,
        HGB_UNIT_DEFAULT: newData
          ? newData?.HGB_UNIT_DEFAULT
          : generalSetting?.HGB_UNIT_DEFAULT,

        HCT_RESULT: newData?.HCT_RESULT?.toString(),
        HCT_MIN: newData ? newData?.HCT_MIN : generalSetting?.HCT_MIN,
        HCT_MAX: newData ? newData?.HCT_MAX : generalSetting?.HCT_MAX,
        HCT_UNIT_DEFAULT: newData
          ? newData?.HCT_UNIT_DEFAULT
          : generalSetting?.HCT_UNIT_DEFAULT,

        MCV_RESULT: newData?.MCV_RESULT?.toString(),
        MCV_MIN: newData ? newData?.MCV_MIN : generalSetting?.MCV_MIN,
        MCV_MAX: newData ? newData?.MCV_MAX : generalSetting?.MCV_MAX,
        MCV_UNIT_DEFAULT: newData
          ? newData?.MCV_UNIT_DEFAULT
          : generalSetting?.MCV_UNIT_DEFAULT,

        MCH_RESULT: newData?.MCH_RESULT?.toString(),
        MCH_MIN: newData ? newData?.MCH_MIN : generalSetting?.MCH_MIN,
        MCH_MAX: newData ? newData?.MCH_MAX : generalSetting?.MCH_MAX,
        MCH_UNIT_DEFAULT: newData
          ? newData?.MCH_UNIT_DEFAULT
          : generalSetting?.MCH_UNIT_DEFAULT,

        PLT_RESULT: newData?.PLT_RESULT?.toString(),
        PLT_MIN: newData ? newData?.PLT_MIN : generalSetting?.PLT_MIN,
        PLT_MAX: newData ? newData?.PLT_MAX : generalSetting?.PLT_MAX,
        PLT_UNIT_DEFAULT: newData
          ? newData?.PLT_UNIT_DEFAULT
          : generalSetting?.PLT_UNIT_DEFAULT,
        URINALYSIS_RESULT: newData?.URINALYSIS_RESULT,

        BLOOD_CALCIUM_RESULT: newData?.BLOOD_CALCIUM_RESULT,
        BLOOD_CALCIUM_MIN: newData
          ? newData?.BLOOD_CALCIUM_MIN
          : generalSetting?.BLOOD_CALCIUM_MIN,
        BLOOD_CALCIUM_MAX: newData
          ? newData?.BLOOD_CALCIUM_MAX
          : generalSetting?.BLOOD_CALCIUM_MAX,
        BLOOD_CALCIUM_UNIT_DEFAULT: newData
          ? newData?.BLOOD_CALCIUM_UNIT_DEFAULT
          : generalSetting?.BLOOD_CALCIUM_UNIT_DEFAULT,

        GLUCOSE_RESULT: newData?.Glucoses[0]?.GLUCOSE_HUNGRY?.toString(),
        GLUCOSE_HUNGRY_REFERENCE_MIN: newData
          ? newData?.Glucoses[0]?.GLUCOSE_HUNGRY_REFERENCE_MIN
          : generalSetting?.GLUCOSE_MIN,
        GLUCOSE_HUNGRY_REFERENCE_MAX: newData
          ? newData?.Glucoses[0]?.GLUCOSE_HUNGRY_REFERENCE_MAX
          : generalSetting?.GLUCOSE_MAX,
        DEFAULT_UNIT: newData
          ? newData?.Glucoses[0]?.DEFAULT_UNIT
          : generalSetting?.GLUCOSE_UNIT_DEFAULT,

        UREA_RESULT: newData?.Ure_Creatines[0]?.UREA_RESULT?.toString(),
        UREA_REFERENCE_MIN: newData
          ? newData?.Ure_Creatines[0]?.UREA_REFERENCE_MIN
          : generalSetting?.UREA_MIN,
        UREA_REFERENCE_MAX: newData
          ? newData?.Ure_Creatines[0]?.UREA_REFERENCE_MAX
          : generalSetting?.UREA_MAX,
        UREA_DEFAULT_UNIT: newData
          ? newData?.Ure_Creatines[0]?.UREA_DEFAULT_UNIT
          : generalSetting?.UREA_UNIT_DEFAULT,

        CREATINE_RESULT: newData?.Ure_Creatines[0]?.CREATINE_RESULT?.toString(),
        CREATINE_REFERENCE_MIN: newData
          ? newData?.Ure_Creatines[0]?.CREATINE_REFERENCE_MIN
          : generalSetting?.CREATINE_MIN,
        CREATINE_REFERENCE_MAX: newData
          ? newData?.Ure_Creatines[0]?.CREATINE_REFERENCE_MAX
          : generalSetting?.CREATINE_MAX,
        CREATINE_DEFAULT_UNIT: newData
          ? newData?.Ure_Creatines[0]?.CREATINE_DEFAULT_UNIT
          : generalSetting?.CREATINE_UNIT_DEFAULT,

        SGOT_AST_RESULT: newData?.Liver_Enzymes[0]?.SGOT_AST_RESULT?.toString(),
        SGOT_AST_REFERENCE_MIN: newData
          ? newData?.Liver_Enzymes[0]?.SGOT_AST_REFERENCE_MIN
          : generalSetting?.SGOT_AST_MIN,
        SGOT_AST_REFERENCE_MAX: newData
          ? newData?.Liver_Enzymes[0]?.SGOT_AST_REFERENCE_MAX
          : generalSetting?.SGOT_AST_MAX,
        SGOT_AST_DEFAULT_UNIT: newData
          ? newData?.Liver_Enzymes[0]?.SGOT_AST_DEFAULT_UNIT
          : generalSetting?.SGOT_AST_UNIT_DEFAULT,

        SGPT_ALT_RESULT: newData?.Liver_Enzymes[0]?.SGPT_ALT_RESULT?.toString(),
        SGPT_ALT_REFERENCE_MIN: newData
          ? newData?.Liver_Enzymes[0]?.SGPT_ALT_REFERENCE_MIN
          : generalSetting?.SGPT_ALT_MIN,
        SGPT_ALT_REFERENCE_MAX: newData
          ? newData?.Liver_Enzymes[0]?.SGPT_ALT_REFERENCE_MAX
          : generalSetting?.SGPT_ALT_MAX,
        SGPT_ALT_DEFAULT_UNIT: newData
          ? newData?.Liver_Enzymes[0]?.SGPT_ALT_DEFAULT_UNIT
          : generalSetting?.SGPT_ALT_UNIT_DEFAULT,

        CHOLESTEROL_RESULT:
          newData?.Blood_Lipids[0]?.CHOLESTEROL_RESULT?.toString(),
        CHOLESTEROL_REFERENCE_MIN: newData
          ? newData?.Blood_Lipids[0]?.CHOLESTEROL_REFERENCE_MIN
          : generalSetting?.CHOLESTEROL_MIN,
        CHOLESTEROL_REFERENCE_MAX: newData
          ? newData?.Blood_Lipids[0]?.CHOLESTEROL_REFERENCE_MAX
          : generalSetting?.CHOLESTEROL_MAX,
        CHOLESTEROL_DEFAULT_UNIT: newData
          ? newData?.Blood_Lipids[0]?.CHOLESTEROL_DEFAULT_UNIT
          : generalSetting?.CHOLESTEROL_UNIT_DEFAULT,

        HDL_RESULT: newData?.Blood_Lipids[0]?.HDL_RESULT?.toString(),
        HDL_REFERENCE_MIN: newData
          ? newData?.Blood_Lipids[0]?.HDL_REFERENCE_MIN
          : generalSetting?.HDL_MIN,
        HDL_REFERENCE_MAX: newData
          ? newData?.Blood_Lipids[0]?.HDL_REFERENCE_MAX
          : generalSetting?.HDL_MAX,
        HDL_DEFAULT_UNIT: newData
          ? newData?.Blood_Lipids[0]?.HDL_DEFAULT_UNIT
          : generalSetting?.HDL_UNIT_DEFAULT,

        LDL_RESULT: newData?.Blood_Lipids[0]?.LDL_RESULT?.toString(),
        LDL_REFERENCE_MIN: newData
          ? newData?.Blood_Lipids[0]?.LDL_REFERENCE_MIN
          : generalSetting?.LDL_MIN,
        LDL_REFERENCE_MAX: newData
          ? newData?.Blood_Lipids[0]?.LDL_REFERENCE_MAX
          : generalSetting?.LDL_MAX,
        LDL_DEFAULT_UNIT: newData
          ? newData?.Blood_Lipids[0]?.LDL_DEFAULT_UNIT
          : generalSetting?.LDL_UNIT_DEFAULT,

        TRIGLYCERIDE_RESULT:
          newData?.Blood_Lipids[0]?.TRIGLYCERIDE_RESULT?.toString(),
        TRIGLYCERIDE_REFERENCE_MIN: newData
          ? newData?.Blood_Lipids[0]?.TRIGLYCERIDE_REFERENCE_MIN
          : generalSetting?.TRIGLYCERIDE_MIN,
        TRIGLYCERIDE_REFERENCE_MAX: newData
          ? newData?.Blood_Lipids[0]?.TRIGLYCERIDE_REFERENCE_MAX
          : generalSetting?.TRIGLYCERIDE_MAX,
        TRIGLYCERIDE_DEFAULT_UNIT: newData
          ? newData?.Blood_Lipids[0]?.TRIGLYCERIDE_DEFAULT_UNIT
          : generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT,
      });
    } else {
      form.resetFields();
    }
  }, [physicalExamSelect, generalSetting, form]);

  // HANDLE SUBMIT FORM
  const handleOk = () => {
    const datas = {
      ...form.getFieldsValue(),
      WBC_UNIT_DEFAULT: generalSetting?.WBC_UNIT_DEFAULT,
      RBC_UNIT_DEFAULT: generalSetting?.RBC_UNIT_DEFAULT,
      HGB_UNIT_DEFAULT: generalSetting?.HGB_UNIT_DEFAULT,
      HCT_UNIT_DEFAULT: generalSetting?.HCT_UNIT_DEFAULT,
      MCV_UNIT_DEFAULT: generalSetting?.MCV_UNIT_DEFAULT,
      MCH_UNIT_DEFAULT: generalSetting?.MCH_UNIT_DEFAULT,
      PLT_UNIT_DEFAULT: generalSetting?.PLT_UNIT_DEFAULT,
    };

    const newData = {
      ...datas,
      WBC_MAX: datas.WBC_MAX ? datas.WBC_MAX : null,
      WBC_MIN: datas.WBC_MIN ? datas.WBC_MIN : null,
      RBC_MAX: datas.RBC_MAX ? datas.RBC_MAX : null,
      RBC_MIN: datas.RBC_MIN ? datas.RBC_MIN : null,
      HGB_MIN: datas.HGB_MIN ? datas.HGB_MIN : null,
      HGB_MAX: datas.HGB_MAX ? datas.HGB_MAX : null,
      HCT_MAX: datas.HCT_MAX ? datas.HCT_MAX : null,
      HCT_MIN: datas.HCT_MIN ? datas.HCT_MIN : null,
      MCV_MAX: datas.MCV_MAX ? datas.MCV_MAX : null,
      MCV_MIN: datas.MCV_MIN ? datas.MCV_MIN : null,
      MCH_MAX: datas.MCH_MAX ? datas.MCH_MAX : null,
      MCH_MIN: datas.MCH_MIN ? datas.MCH_MIN : null,
      PLT_MAX: datas.PLT_MAX ? datas.PLT_MAX : null,
      PLT_MIN: datas.PLT_MIN ? datas.PLT_MIN : null,
      GLUCOSE_HUNGRY_REFERENCE_MAX: datas.GLUCOSE_HUNGRY_REFERENCE_MAX
        ? datas.GLUCOSE_HUNGRY_REFERENCE_MAX
        : null,
      GLUCOSE_HUNGRY_REFERENCE_MIN: datas.GLUCOSE_HUNGRY_REFERENCE_MIN
        ? datas.GLUCOSE_HUNGRY_REFERENCE_MIN
        : null,
      UREA_REFERENCE_MAX: datas.UREA_REFERENCE_MAX
        ? datas.UREA_REFERENCE_MAX
        : null,
      UREA_REFERENCE_MIN: datas.UREA_REFERENCE_MIN
        ? datas.UREA_REFERENCE_MIN
        : null,
      CREATINE_REFERENCE_MAX: datas.CREATINE_REFERENCE_MAX
        ? datas.CREATINE_REFERENCE_MAX
        : null,
      CREATINE_REFERENCE_MIN: datas.CREATINE_REFERENCE_MIN
        ? datas.CREATINE_REFERENCE_MIN
        : null,
      SGOT_AST_REFERENCE_MAX: datas.SGOT_AST_REFERENCE_MAX
        ? datas.SGOT_AST_REFERENCE_MAX
        : null,
      SGOT_AST_REFERENCE_MIN: datas.SGOT_AST_REFERENCE_MIN
        ? datas.SGOT_AST_REFERENCE_MIN
        : null,
      SGPT_ALT_REFERENCE_MAX: datas.SGPT_ALT_REFERENCE_MAX
        ? datas.SGPT_ALT_REFERENCE_MAX
        : null,
      SGPT_ALT_REFERENCE_MIN: datas.SGPT_ALT_REFERENCE_MIN
        ? datas.SGPT_ALT_REFERENCE_MIN
        : null,
      CHOLESTEROL_REFERENCE_MAX: datas.CHOLESTEROL_REFERENCE_MAX
        ? datas.CHOLESTEROL_REFERENCE_MAX
        : null,
      CHOLESTEROL_REFERENCE_MIN: datas.CHOLESTEROL_REFERENCE_MIN
        ? datas.CHOLESTEROL_REFERENCE_MIN
        : null,
      HDL_REFERENCE_MAX: datas.HDL_REFERENCE_MAX
        ? datas.HDL_REFERENCE_MAX
        : null,
      HDL_REFERENCE_MIN: datas.HDL_REFERENCE_MIN
        ? datas.HDL_REFERENCE_MIN
        : null,
      LDL_REFERENCE_MAX: datas.LDL_REFERENCE_MAX
        ? datas.LDL_REFERENCE_MAX
        : null,
      LDL_REFERENCE_MIN: datas.LDL_REFERENCE_MIN
        ? datas.LDL_REFERENCE_MIN
        : null,
      TRIGLYCERIDE_REFERENCE_MAX: datas.TRIGLYCERIDE_REFERENCE_MAX
        ? datas.TRIGLYCERIDE_REFERENCE_MAX
        : null,
      TRIGLYCERIDE_REFERENCE_MIN: datas.TRIGLYCERIDE_REFERENCE_MIN
        ? datas.TRIGLYCERIDE_REFERENCE_MIN
        : null,
      BLOOD_CALCIUM_MAX: datas.BLOOD_CALCIUM_MAX
        ? datas.BLOOD_CALCIUM_MAX
        : null,
      BLOOD_CALCIUM_MIN: datas.BLOOD_CALCIUM_MIN
        ? datas.BLOOD_CALCIUM_MIN
        : null,
    };

    const {
      GLUCOSE_RESULT,
      UREA_RESULT,
      CREATINE_RESULT,
      SGOT_AST_RESULT,
      SGPT_ALT_RESULT,
      CHOLESTEROL_RESULT,
      HDL_RESULT,
      TRIGLYCERIDE_RESULT,
      LDL_RESULT,
      ...data
    } = newData;

    const result = {
      ...data,
      BLOOD_CALCIUM_RESULT: newData?.BLOOD_CALCIUM_RESULT,
      BLOOD_CALCIUM_MIN: newData?.BLOOD_CALCIUM_MIN,
      BLOOD_CALCIUM_MAX: newData?.BLOOD_CALCIUM_MAX,
    };

    const {
      STOMACH_ULTRA_SOUND_RESULT,
      THYROID_ULTRA_SOUND_RESULT,
      MAMMARY_ULTRA_SOUND_RESULT,
      ECG_RESULT,
      XRAY_RESULT,
      PAP_SMEAR_RESULT,
      BLOOD_RESULT,
      WBC_RESULT,
      RBC_RESULT,
      HGB_RESULT,
      HCT_RESULT,
      MCV_RESULT,
      MCH_RESULT,
      PLT_RESULT,
      URINALYSIS_RESULT,
    } = result;

    if (
      newData?.WBC_MIN === null ||
      newData?.WBC_MIN === undefined ||
      newData?.WBC_MAX === null ||
      newData?.WBC_MAX === undefined ||
      newData?.RBC_MIN === null ||
      newData?.RBC_MIN === undefined ||
      newData?.RBC_MAX === null ||
      newData?.RBC_MAX === undefined ||
      newData?.HGB_MIN === null ||
      newData?.HGB_MIN === undefined ||
      newData?.HGB_MAX === null ||
      newData?.HGB_MAX === undefined ||
      newData?.HCT_MIN === null ||
      newData?.HCT_MIN === undefined ||
      newData?.HCT_MAX === null ||
      newData?.HCT_MAX === undefined ||
      newData?.MCV_MIN === null ||
      newData?.MCV_MIN === undefined ||
      newData?.MCV_MAX === null ||
      newData?.MCV_MAX === undefined ||
      newData?.MCH_MIN === null ||
      newData?.MCH_MIN === undefined ||
      newData?.MCH_MAX === null ||
      newData?.MCH_MAX === undefined ||
      newData?.PLT_MIN === null ||
      newData?.PLT_MIN === undefined ||
      newData?.PLT_MAX === null ||
      newData?.PLT_MAX === undefined ||
      newData?.GLUCOSE_HUNGRY_REFERENCE_MIN === null ||
      newData?.GLUCOSE_HUNGRY_REFERENCE_MIN === undefined ||
      newData?.GLUCOSE_HUNGRY_REFERENCE_MAX === null ||
      newData?.GLUCOSE_HUNGRY_REFERENCE_MAX === undefined ||
      newData?.UREA_REFERENCE_MIN === null ||
      newData?.UREA_REFERENCE_MIN === undefined ||
      newData?.UREA_REFERENCE_MAX === null ||
      newData?.UREA_REFERENCE_MAX === undefined ||
      newData?.CREATINE_REFERENCE_MIN === null ||
      newData?.CREATINE_REFERENCE_MIN === undefined ||
      newData?.CREATINE_REFERENCE_MAX === null ||
      newData?.CREATINE_REFERENCE_MAX === undefined ||
      newData?.SGOT_AST_REFERENCE_MIN === null ||
      newData?.SGOT_AST_REFERENCE_MIN === undefined ||
      newData?.SGOT_AST_REFERENCE_MAX === null ||
      newData?.SGOT_AST_REFERENCE_MAX === undefined ||
      newData?.SGPT_ALT_REFERENCE_MIN === null ||
      newData?.SGPT_ALT_REFERENCE_MIN === undefined ||
      newData?.SGPT_ALT_REFERENCE_MAX === null ||
      newData?.SGPT_ALT_REFERENCE_MAX === undefined ||
      newData?.CHOLESTEROL_REFERENCE_MIN === null ||
      newData?.CHOLESTEROL_REFERENCE_MIN === undefined ||
      newData?.CHOLESTEROL_REFERENCE_MAX === null ||
      newData?.CHOLESTEROL_REFERENCE_MAX === undefined ||
      newData?.HDL_REFERENCE_MIN === null ||
      newData?.HDL_REFERENCE_MIN === undefined ||
      newData?.HDL_REFERENCE_MAX === null ||
      newData?.HDL_REFERENCE_MAX === undefined ||
      newData?.LDL_REFERENCE_MIN === null ||
      newData?.LDL_REFERENCE_MIN === undefined ||
      newData?.LDL_REFERENCE_MAX === null ||
      newData?.LDL_REFERENCE_MAX === undefined ||
      newData?.TRIGLYCERIDE_REFERENCE_MIN === null ||
      newData?.TRIGLYCERIDE_REFERENCE_MIN === undefined ||
      newData?.TRIGLYCERIDE_REFERENCE_MAX === null ||
      newData?.TRIGLYCERIDE_REFERENCE_MAX === undefined ||
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
      CHOLESTEROL_RESULT === null ||
      CHOLESTEROL_RESULT === undefined ||
      HDL_RESULT === null ||
      HDL_RESULT === undefined ||
      TRIGLYCERIDE_RESULT === null ||
      TRIGLYCERIDE_RESULT === undefined ||
      LDL_RESULT === null ||
      LDL_RESULT === undefined ||
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
      THYROID_ULTRA_SOUND_RESULT === null ||
      THYROID_ULTRA_SOUND_RESULT === undefined ||
      MAMMARY_ULTRA_SOUND_RESULT === null ||
      MAMMARY_ULTRA_SOUND_RESULT === undefined ||
      ECG_RESULT === null ||
      ECG_RESULT === undefined ||
      XRAY_RESULT === null ||
      XRAY_RESULT === undefined ||
      (isBoolean === false &&
        (PAP_SMEAR_RESULT === null ||
          PAP_SMEAR_RESULT === undefined ||
          PAP_SMEAR_RESULT.trim() === "")) ||
      STOMACH_ULTRA_SOUND_RESULT.trim() === "" ||
      THYROID_ULTRA_SOUND_RESULT.trim() === "" ||
      MAMMARY_ULTRA_SOUND_RESULT.trim() === "" ||
      ECG_RESULT.trim() === "" ||
      XRAY_RESULT.trim() === "" ||
      BLOOD_RESULT.trim() === "" ||
      URINALYSIS_RESULT.trim() === "" ||
      TRIGLYCERIDE_RESULT.trim() === "" ||
      LDL_RESULT.trim() === "" ||
      HDL_RESULT.trim() === "" ||
      CHOLESTEROL_RESULT.trim() === "" ||
      SGPT_ALT_RESULT.trim() === "" ||
      SGOT_AST_RESULT.trim() === "" ||
      CREATINE_RESULT.trim() === "" ||
      UREA_RESULT.trim() === "" ||
      GLUCOSE_RESULT.trim() === "" ||
      PLT_RESULT.trim() === "" ||
      MCH_RESULT.trim() === "" ||
      MCV_RESULT.trim() === "" ||
      HCT_RESULT.trim() === "" ||
      HGB_RESULT.trim() === "" ||
      RBC_RESULT.trim() === "" ||
      WBC_RESULT.trim() === ""
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
      Number(newData?.GLUCOSE_HUNGRY_REFERENCE_MAX) <
        Number(newData?.GLUCOSE_HUNGRY_REFERENCE_MIN) ||
      Number(newData?.UREA_REFERENCE_MAX) <
        Number(newData?.UREA_REFERENCE_MIN) ||
      Number(newData?.CREATINE_REFERENCE_MAX) <
        Number(newData?.CREATINE_REFERENCE_MIN) ||
      newData?.SGOT_AST_REFERENCE_MAX < newData?.SGOT_AST_REFERENCE_MIN ||
      newData?.SGPT_ALT_REFERENCE_MAX < newData?.SGPT_ALT_REFERENCE_MIN ||
      Number(newData?.CHOLESTEROL_REFERENCE_MAX) <
        Number(newData?.CHOLESTEROL_REFERENCE_MIN) ||
      Number(newData?.HDL_REFERENCE_MAX) < Number(newData?.HDL_REFERENCE_MIN) ||
      Number(newData?.LDL_REFERENCE_MAX) < Number(newData?.LDL_REFERENCE_MIN) ||
      Number(newData?.TRIGLYCERIDE_REFERENCE_MAX) <
        Number(newData?.TRIGLYCERIDE_REFERENCE_MIN) ||
      Number(newData?.BLOOD_CALCIUM_MAX) < Number(newData?.BLOOD_CALCIUM_MIN)
    ) {
      return;
    }

    const glucoseData = {
      DEFAULT_UNIT: newData?.DEFAULT_UNIT,
      GLUCOSE_HUNGRY: GLUCOSE_RESULT,
      GLUCOSE_HUNGRY_REFERENCE_MIN: newData?.GLUCOSE_HUNGRY_REFERENCE_MIN,
      GLUCOSE_HUNGRY_REFERENCE_MAX: newData?.GLUCOSE_HUNGRY_REFERENCE_MAX,
    };

    const liverEnzymesData = {
      SGOT_AST_DEFAULT_UNIT: generalSetting?.SGOT_AST_UNIT_DEFAULT,
      SGPT_ALT_DEFAULT_UNIT: generalSetting?.SGPT_ALT_UNIT_DEFAULT,
      SGOT_AST_RESULT: SGOT_AST_RESULT,
      SGPT_ALT_RESULT: SGPT_ALT_RESULT,
      SGOT_AST_REFERENCE_MAX: newData?.SGOT_AST_REFERENCE_MAX,
      SGOT_AST_REFERENCE_MIN: newData?.SGOT_AST_REFERENCE_MIN,
      SGPT_ALT_REFERENCE_MAX: newData?.SGPT_ALT_REFERENCE_MAX,
      SGPT_ALT_REFERENCE_MIN: newData?.SGPT_ALT_REFERENCE_MIN,
    };

    const ureCreatineData = {
      UREA_DEFAULT_UNIT: newData?.UREA_DEFAULT_UNIT,
      CREATINE_DEFAULT_UNIT: newData?.CREATINE_DEFAULT_UNIT,
      UREA_RESULT: UREA_RESULT,
      UREA_REFERENCE_MAX: newData?.UREA_REFERENCE_MAX,
      UREA_REFERENCE_MIN: newData?.UREA_REFERENCE_MIN,
      CREATINE_RESULT: CREATINE_RESULT,
      CREATINE_REFERENCE_MAX: newData?.CREATINE_REFERENCE_MAX,
      CREATINE_REFERENCE_MIN: newData?.CREATINE_REFERENCE_MIN,
    };

    const bloodLipidData = {
      CHOLESTEROL_DEFAULT_UNIT: newData?.CHOLESTEROL_DEFAULT_UNIT,
      HDL_DEFAULT_UNIT: newData?.HDL_DEFAULT_UNIT,
      LDL_DEFAULT_UNIT: newData?.LDL_DEFAULT_UNIT,
      TRIGLYCERIDE_DEFAULT_UNIT: newData?.TRIGLYCERIDE_DEFAULT_UNIT,

      CHOLESTEROL_RESULT: CHOLESTEROL_RESULT,
      CHOLESTEROL_REFERENCE_MAX: newData?.CHOLESTEROL_REFERENCE_MAX,
      CHOLESTEROL_REFERENCE_MIN: newData?.CHOLESTEROL_REFERENCE_MIN,

      HDL_RESULT: HDL_RESULT,
      HDL_REFERENCE_MAX: newData?.HDL_REFERENCE_MAX,
      HDL_REFERENCE_MIN: newData?.HDL_REFERENCE_MIN,

      LDL_RESULT: LDL_RESULT,
      LDL_REFERENCE_MAX: newData?.LDL_REFERENCE_MAX,
      LDL_REFERENCE_MIN: newData?.LDL_REFERENCE_MIN,

      TRIGLYCERIDE_RESULT: TRIGLYCERIDE_RESULT,
      TRIGLYCERIDE_REFERENCE_MAX: newData?.TRIGLYCERIDE_REFERENCE_MAX,
      TRIGLYCERIDE_REFERENCE_MIN: newData?.TRIGLYCERIDE_REFERENCE_MIN,
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

  // UPDATE PRECLINICAL EXAM
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

  const handleBack = () => {
    onKeyChange("4");
    setIsClinicalExam(false);
    setIsPreClinicalExam(true);
  };

  // Upload file

  const handleGetPhysicalDetail = async (id) => {
    const res = await preclinicalDetailApi.getPreclinicalDetailById(id);
    if (res.data) {
      setPreclinicDetail(res.data.elements.preclinicalDetail);
    }
  };

  useEffect(() => {
    if (physicalExamSelect?.Preclinical_Details[0]?.id) {
      handleGetPhysicalDetail(physicalExamSelect?.Preclinical_Details[0]?.id);
    }
  }, [physicalExamSelect]);

  // /* HANDLE UPLOAD FILES */
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
  }, [preclinicDetail]);

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
        ...newPreclinicalFile?.data?.elements,
        name: newPreclinicalFile?.data?.elements?.NAME,
        status: "done",
        url: storage + "/" + newPreclinicalFile?.data?.elements?.NAME,
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

  const getFileExtension = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
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
            <>
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
                      rules={[{ required: true }]}
                      labelCol={{ span: 4, offset: 4 }}
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
                      <Input allowClear onPressEnter={handleBlockEnter} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="MAMMARY_ULTRA_SOUND_RESULT"
                      label="Kết luận"
                      rules={[{ required: true }]}
                      labelCol={{ span: 4, offset: 4 }}
                    >
                      <Input allowClear onPressEnter={handleBlockEnter} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              {/* 4 */}
              <Form.Item>
                <Row>
                  <Col span={10} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5} style={{ color: "#4B73DE" }}>
                          4. Siêu âm tim
                        </Title>
                      }
                      name="HEART_ULTRA_SOUND_DESC"
                      labelCol={{ span: 12 }}
                    >
                      <Input allowClear onPressEnter={handleBlockEnter} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      name="HEART_ULTRA_SOUND_RESULT"
                      label="Kết luận"
                      labelCol={{ span: 4, offset: 4 }}
                    >
                      <Input allowClear onPressEnter={handleBlockEnter} />
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
                          5. Điện tâm đồ
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
                          6. X-Quang phổi
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
                        7. Pap's mear
                      </Title>
                    </Form.Item>
                  </Col>
                  <Col span={20} offset={2}>
                    <Form.Item
                      name="PAP_SMEAR_RESULT"
                      label="Kết luận"
                      rules={[
                        {
                          required: isBoolean ? false : true,
                        },
                      ]}
                      labelCol={{
                        lg: { span: 2, offset: 4 },
                        // xs: { span: 4, offset: 1 },
                      }}
                    >
                      <Input
                        disabled={isBoolean ? true : false}
                        onPressEnter={handleBlockEnter}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              {/* 8 */}
              <Form.Item style={styleDisplay.marginBottom}>
                <Row>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5} style={{ color: "#4B73DE" }}>
                          8. Đo mật độ xương
                        </Title>
                      }
                      labelCol={{ span: 12 }}
                    >
                      <Input.Group compact>
                        <Form.Item name="BONE_DENSITY_RATING" noStyle>
                          <NumericInput
                            style={{
                              width: "70%",
                              textAlign: "center",
                              color: BoneDensity < -1 ? "red" : "black",
                            }}
                            onChange={(value) => setBoneDensity(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item noStyle>
                          <Input
                            style={{ width: "30%", textAlign: "center" }}
                            value="SD"
                            disabled
                          />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col lg={10} xs={22}>
                    <Form.Item
                      wrapperCol={{ lg: { offset: 8 }, xs: { offset: 0 } }}
                    >
                      <Input.Group compact>
                        <Input
                          style={{ width: "70%", textAlign: "center" }}
                          value=">=-1"
                        />
                        <Input
                          style={{ width: "30%", textAlign: "center" }}
                          value="SD"
                          disabled
                        />
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col span={20} offset={2}>
                    <Form.Item
                      name="BONE_DENSITY_RESULT"
                      label="Kết luận"
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

              {/* 9 */}
              <Form.Item style={styleDisplay.marginBottom}>
                <Row>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item>
                      <Title level={5} type="danger">
                        9. Tổng phân tích tế bào máu
                      </Title>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row style={styleDisplay.height}>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          9.1. WBC <br />
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
                            onChange={(value) => setWBC(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="WBC_UNIT_DEFAULT"
                        >
                          <Input disabled={true} />
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
                          style={styleInput.resultWidth}
                          name="WBC_MIN"
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
                          style={styleInput.resultWidth}
                          name="WBC_MAX"
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
                          <Input disabled={true} />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row style={styleDisplay.height}>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          9.2. RBC <br />
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
                            onChange={(value) => setRBC(Number(value))}
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
                          style={styleInput.resultWidth}
                          name="RBC_MIN"
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
                          style={styleInput.resultWidth}
                          name="RBC_MAX"
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
                          style={styleInput.resultWidth}
                          name="RBC_UNIT_DEFAULT"
                        >
                          <Input disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row style={styleDisplay.height}>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          9.3. HGB <br />
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
                            onChange={(value) => setHGB(Number(value))}
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
                          style={styleInput.resultWidth}
                          name="HGB_MIN"
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
                          style={styleInput.resultWidth}
                          name="HGB_MAX"
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
                          style={styleInput.resultWidth}
                          name="HGB_UNIT_DEFAULT"
                        >
                          <Input disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row style={styleDisplay.height}>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          9.4. HCT <br /> &emsp;&emsp;&nbsp;Dung tích hồng cầu
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
                            onChange={(value) => setHCT(Number(value))}
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
                          style={styleInput.resultWidth}
                          name="HCT_MIN"
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
                          style={styleInput.resultWidth}
                          name="HCT_MAX"
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
                          style={styleInput.resultWidth}
                          name="HCT_UNIT_DEFAULT"
                        >
                          <Input disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row style={styleDisplay.height}>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          9.5. MCV <br />
                          <p style={{ width: 150, marginLeft: 35 }}>
                            Thể tích trung bình một hồng cầu
                          </p>
                        </Title>
                      }
                      labelCol={{ span: 9, offset: 2 }}
                      style={{ width: "100%" }}
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
                            onChange={(value) => setMCV(Number(value))}
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
                          style={styleInput.resultWidth}
                          name="MCV_MIN"
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
                          style={styleInput.resultWidth}
                          name="MCV_MAX"
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
                          style={styleInput.resultWidth}
                          name="MCV_UNIT_DEFAULT"
                        >
                          <Input disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row style={styleDisplay.height}>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          9.6. MCH <br />
                          <p style={{ marginBottom: 0, marginLeft: 35 }}>
                            Số lượng huyết
                          </p>
                          <p
                            style={{
                              width: 300,
                              marginLeft: 35,
                            }}
                          >
                            sắc tố trung bình một hồng cầu
                          </p>
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
                            onChange={(value) => setMCH(Number(value))}
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
                          style={styleInput.resultWidth}
                          name="MCH_MIN"
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
                          style={styleInput.resultWidth}
                          name="MCH_MAX"
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
                          style={styleInput.resultWidth}
                          name="MCH_UNIT_DEFAULT"
                        >
                          <Input disabled />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row style={styleDisplay.height}>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={
                        <Title level={5}>
                          9.7. PLT <br /> &emsp;&emsp;&nbsp;Số lượng tiểu cầu
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
                            onChange={(value) => setPLT(Number(value))}
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
                          style={styleInput.resultWidth}
                          name="PLT_MIN"
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
                          style={styleInput.resultWidth}
                          name="PLT_MAX"
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
                          style={styleInput.resultWidth}
                          name="PLT_UNIT_DEFAULT"
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
                        10. Đường huyết đói
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
                              color: CheckError(
                                Glucose,
                                glucoseMin,
                                glucoseMax
                              ),
                            }}
                            onChange={(value) => setGlucose(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="DEFAULT_UNIT"
                        >
                          <Select>
                            <Option
                              value={generalSetting?.GLUCOSE_UNIT_DEFAULT}
                            >
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
                          style={styleInput.resultWidth}
                          name="GLUCOSE_HUNGRY_REFERENCE_MIN"
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
                          style={styleInput.resultWidth}
                          name="GLUCOSE_HUNGRY_REFERENCE_MAX"
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
                          style={styleInput.resultWidth}
                          name="DEFAULT_UNIT"
                        >
                          <Select value={generalSetting?.GLUCOSE_UNIT_DEFAULT}>
                            <Option
                              value={generalSetting?.GLUCOSE_UNIT_DEFAULT}
                            >
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
                        11. Chức năng thận
                      </Title>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row>
                  <Col lg={10} xs={20} offset={2}>
                    <Form.Item
                      label={<Title level={5}>11.1 Urea</Title>}
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
                            onChange={(value) => setUrea(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="UREA_DEFAULT_UNIT"
                        >
                          <Select>
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
                          style={styleInput.resultWidth}
                          name="UREA_REFERENCE_MIN"
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
                          style={styleInput.resultWidth}
                          name="UREA_REFERENCE_MAX"
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
                          style={styleInput.resultWidth}
                          name="UREA_DEFAULT_UNIT"
                        >
                          <Select>
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
                      label={<Title level={5}>11.2 Creatine</Title>}
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
                            onChange={(value) => setCreatine(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="CREATINE_DEFAULT_UNIT"
                        >
                          <Select>
                            <Option
                              value={generalSetting?.CREATINE_UNIT_DEFAULT}
                            >
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
                          style={styleInput.resultWidth}
                          name="CREATINE_REFERENCE_MIN"
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
                          style={styleInput.resultWidth}
                          name="CREATINE_REFERENCE_MAX"
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
                          style={styleInput.resultWidth}
                          name="CREATINE_DEFAULT_UNIT"
                        >
                          <Select>
                            <Option
                              value={generalSetting?.CREATINE_UNIT_DEFAULT}
                            >
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
                        12. Chức năng gan
                      </Title>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={<Title level={5}>12.1 SGOT/AST</Title>}
                      labelCol={{ span: 9, offset: 2 }}
                    >
                      <Input.Group compact>
                        <span style={styleRequire}>(*)</span>
                        <Form.Item
                          name="SGOT_AST_RESULT"
                          style={styleInput.resultWidth2}
                          rules={[{ required: true }]}
                          className={CheckError(
                            SGOTAST,
                            SGOTMin,
                            SGOTMax,
                            true
                          )}
                        >
                          <NumericInput
                            style={{
                              color: CheckError(SGOTAST, SGOTMin, SGOTMax),
                            }}
                            onChange={(value) => setSGOTAST(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="SGOT_AST_DEFAULT_UNIT"
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
                          style={styleInput.resultWidth}
                          name="SGOT_AST_REFERENCE_MIN"
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
                          style={styleInput.resultWidth}
                          name="SGOT_AST_REFERENCE_MAX"
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
                          style={styleInput.resultWidth}
                          name="SGOT_AST_DEFAULT_UNIT"
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
                      label={<Title level={5}>12.2 SGPT/ALT</Title>}
                      labelCol={{ span: 9, offset: 2 }}
                    >
                      <Input.Group compact>
                        <span style={styleRequire}>(*)</span>
                        <Form.Item
                          name="SGPT_ALT_RESULT"
                          style={styleInput.resultWidth2}
                          rules={[{ required: true }]}
                          className={CheckError(
                            SGPTALT,
                            SGPTMin,
                            SGPTMax,
                            true
                          )}
                        >
                          <NumericInput
                            style={{
                              color: CheckError(SGPTALT, SGPTMin, SGPTMax),
                            }}
                            onChange={(value) => setSGPTALT(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="SGPT_ALT_DEFAULT_UNIT"
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
                          style={styleInput.resultWidth}
                          name="SGPT_ALT_REFERENCE_MIN"
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
                          style={styleInput.resultWidth}
                          name="SGPT_ALT_REFERENCE_MAX"
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
                          style={styleInput.resultWidth}
                          name="SGPT_ALT_DEFAULT_UNIT"
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
                        13. Chỉ số Lipid máu (Bộ mỡ máu)
                      </Title>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={<Title level={5}>13.1 Cholesterol</Title>}
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
                            onChange={(value) => setCholesterol(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="CHOLESTEROL_DEFAULT_UNIT"
                        >
                          <Select>
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
                          style={styleInput.resultWidth}
                          name="CHOLESTEROL_REFERENCE_MIN"
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
                          style={styleInput.resultWidth}
                          name="CHOLESTEROL_REFERENCE_MAX"
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
                          style={styleInput.resultWidth}
                          name="CHOLESTEROL_DEFAULT_UNIT"
                        >
                          <Select>
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
                      label={<Title level={5}>13.2 HDL</Title>}
                      labelCol={{ span: 9, offset: 2 }}
                    >
                      <Input.Group compact>
                        <span style={styleRequire}>(*)</span>
                        <Form.Item
                          name="HDL_RESULT"
                          style={styleInput.resultWidth2}
                          rules={[{ required: true }]}
                          className={CheckError(HDL, HDLMin, HDLMax, true)}
                        >
                          <NumericInput
                            style={{
                              color: CheckError(HDL, HDLMin, HDLMax),
                            }}
                            onChange={(value) => setHDL(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="HDL_DEFAULT_UNIT"
                        >
                          <Select>
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
                          style={styleInput.resultWidth}
                          name="HDL_REFERENCE_MIN"
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
                          style={styleInput.resultWidth}
                          name="HDL_REFERENCE_MAX"
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
                          style={styleInput.resultWidth}
                          name="HDL_DEFAULT_UNIT"
                        >
                          <Select>
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
                      label={<Title level={5}>13.3 LDL</Title>}
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
                            onChange={(value) => setLDL(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="LDL_DEFAULT_UNIT"
                        >
                          <Select>
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
                          style={styleInput.resultWidth}
                          name="LDL_REFERENCE_MIN"
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
                          style={styleInput.resultWidth}
                          name="LDL_REFERENCE_MAX"
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
                          style={styleInput.resultWidth}
                          name="LDL_DEFAULT_UNIT"
                        >
                          <Select>
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
                      label={<Title level={5}>13.4 Triglyceride</Title>}
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
                            onChange={(value) => setTriglyceride(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.unitWidth}
                          name="TRIGLYCERIDE_DEFAULT_UNIT"
                        >
                          <Select>
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
                          style={styleInput.resultWidth}
                          name="TRIGLYCERIDE_REFERENCE_MIN"
                          rules={[{ required: true }]}
                        >
                          <NumericInput
                            onChange={(value) => {
                              checkMin(
                                Number(value),
                                TriglyMax,
                                setErrorTrigly
                              );
                              setTriglyMin(Number(value));
                            }}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <span style={styleError}>{errorTrigly}</span>
                        <Form.Item
                          style={styleInput.resultWidth}
                          name="TRIGLYCERIDE_REFERENCE_MAX"
                          rules={[{ required: true }]}
                        >
                          <NumericInput
                            onChange={(value) => {
                              checkMax(
                                Number(value),
                                TriglyMin,
                                setErrorTrigly
                              );
                              setTriglyMax(Number(value));
                            }}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item
                          style={styleInput.resultWidth}
                          name="TRIGLYCERIDE_DEFAULT_UNIT"
                        >
                          <Select>
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
                        14. Tổng phân tích nước tiểu
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
                      }}
                    >
                      <Input allowClear onPressEnter={handleBlockEnter} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              {/* 15 */}
              <Form.Item style={styleDisplay.marginBottom}>
                <Row>
                  <Col span={22} offset={2}>
                    <Form.Item>
                      <Title level={5} style={{ color: "#4B73DE" }}>
                        15. Canxi máu
                      </Title>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={styleDisplay.marginBottom}>
                <Row>
                  <Col lg={10} xs={22} offset={2}>
                    <Form.Item
                      label={<Title level={5}>Nồng độ canxi máu</Title>}
                      labelCol={{ span: 10, offset: 2 }}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name="BLOOD_CALCIUM_RESULT"
                          noStyle
                          className={CheckError(
                            BloodCanxi,
                            CanxiMin,
                            CanxiMax,
                            true
                          )}
                        >
                          <NumericInput
                            style={{
                              width: "60%",
                              textAlign: "center",
                              color: CheckError(BloodCanxi, CanxiMin, CanxiMax),
                            }}
                            onChange={(value) => setBloodCanxi(Number(value))}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item noStyle name="BLOOD_CALCIUM_UNIT_DEFAULT">
                          <Select style={styleInput.unitWidth}>
                            <Option
                              value={generalSetting?.BLOOD_CALCIUM_UNIT_DEFAULT}
                            >
                              {generalSetting?.BLOOD_CALCIUM_UNIT_DEFAULT}
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
                        <Form.Item noStyle name="BLOOD_CALCIUM_MIN">
                          <NumericInput
                            style={{
                              width: "35%",
                              textAlign: "center",
                            }}
                            onChange={(value) => {
                              checkMin(Number(value), CanxiMax, setErrorCanxi);
                              setCanxiMin(Number(value));
                            }}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <span style={styleError}>{errorCanxi}</span>
                        <Form.Item noStyle name="BLOOD_CALCIUM_MAX">
                          <NumericInput
                            style={{
                              width: "35%",
                              textAlign: "center",
                            }}
                            onChange={(value) => {
                              checkMax(Number(value), CanxiMin, setErrorCanxi);
                              setCanxiMax(Number(value));
                            }}
                            onPressEnter={handleBlockEnter}
                          />
                        </Form.Item>
                        <Form.Item noStyle name="BLOOD_CALCIUM_UNIT_DEFAULT">
                          <Select
                            style={{
                              width: "30%",
                              textAlign: "center",
                            }}
                          >
                            <Option
                              value={generalSetting?.BLOOD_CALCIUM_UNIT_DEFAULT}
                            >
                              {generalSetting?.BLOOD_CALCIUM_UNIT_DEFAULT}
                            </Option>
                            <Option value="mg/dL">mg/dL</Option>
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </>

            {/* 16 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={5} offset={2}>
                  <Form.Item>
                    <Title level={5} style={{ color: "#4B73DE" }}>
                      16. Hồ sơ/kết quả khám sức khỏe
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
                    {type && (type === "xls" || type === "xlsx") ? (
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
                <Button onClick={handleBack} className="btn-submit">
                  Quay lại
                </Button>
              </Col>
              <Col span={2} push={17}>
                <Button
                  onClick={handleOk}
                  htmlType="submit"
                  form="preclinic"
                  key="preclinic"
                  className="btn-submit"
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
