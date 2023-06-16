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
import bloodLipidApi from "../../../../api/bloodLipidApi";
import glucoseApi from "../../../../api/glucoseApi";
import liverEnzymeApi from "../../../../api/liverEnzymeApi";
import preclinicalDetailFileApi from "../../../../api/preclinicalDetailFileApi";
import ureCreatineApi from "../../../../api/ureCreatineApi";
import { useGeneralSetting } from "../../../../hooks/generalSettings";
import { isAccessConlusionState } from "../../../../recoil/atom/booleanState";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import { generalSettingState } from "../../../../recoil/atom/generalSettingState";
import { physicalExamNewState } from "../../../../recoil/atom/physicalExamNew";
import { newestPhysicalExamResultState } from "../../../../recoil/atom/physicalExamResult";
import { physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";
import {
  newestPreclinicalDetailState,
  preclinicalDetailState,
} from "../../../../recoil/atom/preClinicalDetailState";
import NumericInput from "../../../NumericInput/NumericInput";
import preclinicDetailApi from "../../../../api/preclinicDetailApi";
const storage =
  process.env.REACT_APP_BASE_URL +
  // "/" +process.env.REACT_APP_UPLOADED_FOLDER +
  "/files";
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
const styleRequire = {
  width: "8%",
  color: "red",
  fontSize: 12,
  paddingTop: 5,
};

const validateMessages = {
  required: "Trường này không được để trống!",
};

const FrmSubclinicalExamination = ({
  setIsClinicalExam,
  setIsPreClinicalExam,
  setIsPhysicalExamResult,
  onKeyChange,
  SubclinicalExamRef,
  onCreatePhysicalExamResult,
  onUpdatePreClinicExam,
  onGetPhysicalExam,
  onGetClinicalDetail,
}) => {
  useGeneralSetting();

  const [form] = Form.useForm();
  const setIsAccessConlusion = useSetRecoilState(isAccessConlusionState);
  const [physicalExamSelect] = useRecoilState(physicalExamSelectState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewState);
  const generalSetting = useRecoilValue(generalSettingState);
  const employeeSelect = useRecoilValue(employeeSelectState);
  const newPreClinicDetail = useRecoilValue(newestPreclinicalDetailState);
  const newPhysicalResult = useRecoilValue(newestPhysicalExamResultState);
  const [preclinicalDetail, setPreclinicalDetail] = useRecoilState(
    preclinicalDetailState
  );
  // upload file
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [isPDF, setIsPDF] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [WBC, setWBC] = useState("");
  const [RBC, setRBC] = useState("");
  const [HGB, setHGB] = useState("");
  const [HCT, setHCT] = useState("");
  const [MCV, setMCV] = useState("");
  const [MCH, setMCH] = useState("");
  const [PLT, setPLT] = useState("");

  const [Glucose, setGlucose] = useState("");
  const [Urea, setUrea] = useState("");
  const [Creatine, setCreatine] = useState("");
  const [SGOTAST, setSGOTAST] = useState("");
  const [SGPTALT, setSGPTALT] = useState("");
  const [Cholesterol, setCholesterol] = useState("");
  const [HDL, setHDL] = useState("");
  const [LDL, setLDL] = useState("");
  const [Triglyceride, setTriglyceride] = useState("");
  const [isBoolean, setIsBoolean] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
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
      if (
        employeeSelect?.User?.Gender?.id === 2 &&
        employeeSelect?.Marital_Status?.id === 2
      ) {
        setIsBoolean(false);
      } else {
        setIsBoolean(true);
      }
    }
  }, [employeeSelect]);

  useEffect(() => {
    if (physicalExamSelect) {
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
        // WBC_UNIT_DEFAULT: newData?.WBC_UNIT_DEFAULT,
        WBC_RESULT: newData?.WBC_RESULT.toString(),
        // RBC_UNIT_DEFAULT: newData?.RBC_UNIT_DEFAULT,
        RBC_RESULT: newData?.RBC_RESULT.toString(),
        // HGB_UNIT_DEFAULT: newData?.HGB_UNIT_DEFAULT,
        HGB_RESULT: newData?.HGB_RESULT.toString(),
        // HCT_UNIT_DEFAULT: newData?.HCT_UNIT_DEFAULT,
        HCT_RESULT: newData?.HCT_RESULT.toString(),
        // MCV_UNIT_DEFAULT: newData?.MCV_UNIT_DEFAULT,
        MCV_RESULT: newData?.MCV_RESULT.toString(),
        // MCH_UNIT_DEFAULT: newData?.MCH_UNIT_DEFAULT,
        MCH_RESULT: newData?.MCH_RESULT.toString(),
        // PLT_UNIT_DEFAULT: newData?.PLT_UNIT_DEFAULT,
        PLT_RESULT: newData?.PLT_RESULT.toString(),
        URINALYSIS_RESULT: newData?.URINALYSIS_RESULT,
        // BLOOD_CALCIUM_UNIT_DEFAULT: newData?.BLOOD_CALCIUM_UNIT_DEFAULT,
        BLOOD_CALCIUM_RESULT: newData?.BLOOD_CALCIUM_RESULT,
        GLUCOSE_RESULT: newData?.Glucoses[0]?.GLUCOSE_HUNGRY.toString(),
        UREA_RESULT: newData?.Ure_Creatines[0]?.UREA_RESULT.toString(),
        CREATINE_RESULT: newData?.Ure_Creatines[0]?.CREATINE_RESULT.toString(),
        SGOT_AST_RESULT: newData?.Liver_Enzymes[0]?.SGOT_AST_RESULT.toString(),
        SGPT_ALT_RESULT: newData?.Liver_Enzymes[0]?.SGPT_ALT_RESULT.toString(),
        HDL_RESULT: newData?.Blood_Lipids[0]?.HDL_RESULT,
        CHOLESTEROL_RESULT: newData?.Blood_Lipids[0]?.CHOLESTEROL_RESULT,
        LDL_RESULT: newData?.Blood_Lipids[0]?.LDL_RESULT,
        TRIGLYCERIDE_RESULT: newData?.Blood_Lipids[0]?.TRIGLYCERIDE_RESULT,
      });
    }
    if (preclinicalDetail) {
      const newData = preclinicalDetail;
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
        // WBC_UNIT_DEFAULT: newData?.WBC_UNIT_DEFAULT,
        WBC_RESULT: newData?.WBC_RESULT.toString(),
        // RBC_UNIT_DEFAULT: newData?.RBC_UNIT_DEFAULT,
        RBC_RESULT: newData?.RBC_RESULT.toString(),
        // HGB_UNIT_DEFAULT: newData?.HGB_UNIT_DEFAULT,
        HGB_RESULT: newData?.HGB_RESULT.toString(),
        // HCT_UNIT_DEFAULT: newData?.HCT_UNIT_DEFAULT,
        HCT_RESULT: newData?.HCT_RESULT.toString(),
        // MCV_UNIT_DEFAULT: newData?.MCV_UNIT_DEFAULT,
        MCV_RESULT: newData?.MCV_RESULT.toString(),
        // MCH_UNIT_DEFAULT: newData?.MCH_UNIT_DEFAULT,
        MCH_RESULT: newData?.MCH_RESULT.toString(),
        // PLT_UNIT_DEFAULT: newData?.PLT_UNIT_DEFAULT,
        PLT_RESULT: newData?.PLT_RESULT.toString(),
        URINALYSIS_RESULT: newData?.URINALYSIS_RESULT,
        // BLOOD_CALCIUM_UNIT_DEFAULT: newData?.BLOOD_CALCIUM_UNIT_DEFAULT,
        BLOOD_CALCIUM_RESULT: newData?.BLOOD_CALCIUM_RESULT,
        GLUCOSE_RESULT: newData?.Glucoses[0]?.GLUCOSE_HUNGRY.toString(),
        UREA_RESULT: newData?.Ure_Creatines[0]?.UREA_RESULT.toString(),
        CREATINE_RESULT: newData?.Ure_Creatines[0]?.CREATINE_RESULT.toString(),
        SGOT_AST_RESULT: newData?.Liver_Enzymes[0]?.SGOT_AST_RESULT.toString(),
        SGPT_ALT_RESULT: newData?.Liver_Enzymes[0]?.SGPT_ALT_RESULT.toString(),
        HDL_RESULT: newData?.Blood_Lipids[0]?.HDL_RESULT,
        CHOLESTEROL_RESULT: newData?.Blood_Lipids[0]?.CHOLESTEROL_RESULT,
        LDL_RESULT: newData?.Blood_Lipids[0]?.LDL_RESULT,
        TRIGLYCERIDE_RESULT: newData?.Blood_Lipids[0]?.TRIGLYCERIDE_RESULT,
      });
    }
  }, [physicalExamSelect, preclinicalDetail, form]);

  const handleOk = () => {
    const newData = {
      ...form.getFieldsValue(),
      WBC_UNIT_DEFAULT: generalSetting?.WBC_UNIT_DEFAULT,
      RBC_UNIT_DEFAULT: generalSetting?.RBC_UNIT_DEFAULT,
      HGB_UNIT_DEFAULT: generalSetting?.HGB_UNIT_DEFAULT,
      HCT_UNIT_DEFAULT: generalSetting?.HCT_UNIT_DEFAULT,
      MCV_UNIT_DEFAULT: generalSetting?.MCV_UNIT_DEFAULT,
      MCH_UNIT_DEFAULT: generalSetting?.MCH_UNIT_DEFAULT,
      PLT_UNIT_DEFAULT: generalSetting?.PLT_UNIT_DEFAULT,
      BLOOD_CALCIUM_UNIT_DEFAULT: generalSetting?.BLOOD_CALCIUM_UNIT_DEFAULT,
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
      ...result
    } = newData;

    const {
      STOMACH_ULTRA_SOUND_RESULT,
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
      STOMACH_ULTRA_SOUND_RESULT.trim() === "" ||
      ECG_RESULT.trim() === "" ||
      XRAY_RESULT.trim() === "" ||
      BLOOD_RESULT.trim() === "" ||
      URINALYSIS_RESULT.trim() === "" ||
      WBC_RESULT.trim() === "" ||
      RBC_RESULT.trim() === "" ||
      HGB_RESULT.trim() === "" ||
      HCT_RESULT.trim() === "" ||
      MCV_RESULT.trim() === "" ||
      MCH_RESULT.trim() === "" ||
      PLT_RESULT.trim() === "" ||
      GLUCOSE_RESULT.trim() === "" ||
      UREA_RESULT.trim() === "" ||
      CREATINE_RESULT.trim() === "" ||
      SGOT_AST_RESULT.trim() === "" ||
      SGPT_ALT_RESULT.trim() === ""
    ) {
      return;
    }

    const glucoseData = {
      GLUCOSE_HUNGRY: GLUCOSE_RESULT,
      DEFAULT_UNIT: generalSetting?.GLUCOSE_UNIT_DEFAULT,
    };

    const liverEnzymesData = {
      SGOT_AST_DEFAULT_UNIT: generalSetting?.SGOT_AST_UNIT_DEFAULT,
      SGPT_ALT_DEFAULT_UNIT: generalSetting?.SGPT_ALT_UNIT_DEFAULT,
      SGOT_AST_RESULT: SGOT_AST_RESULT,
      SGPT_ALT_RESULT: SGPT_ALT_RESULT,
    };

    const ureCreatineData = {
      UREA_DEFAULT_UNIT: generalSetting?.UREA_UNIT_DEFAULT,
      CREATINE_DEFAULT_UNIT: generalSetting?.CREATINE_UNIT_DEFAULT,
      UREA_RESULT: UREA_RESULT,
      CREATINE_RESULT: CREATINE_RESULT,
    };

    const bloodLipidData = {
      CHOLESTEROL_DEFAULT_UNIT: generalSetting?.CHOLESTEROL_UNIT_DEFAULT,
      HDL_DEFAULT_UNIT: generalSetting?.HDL_UNIT_DEFAULT,
      TRIGLYCERIDE_DEFAULT_UNIT: generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT,
      LDL_DEFAULT_UNIT: generalSetting?.LDL_UNIT_DEFAULT,
      CHOLESTEROL_RESULT: CHOLESTEROL_RESULT ? CHOLESTEROL_RESULT : null,
      HDL_RESULT: HDL_RESULT ? HDL_RESULT : null,
      TRIGLYCERIDE_RESULT: TRIGLYCERIDE_RESULT ? TRIGLYCERIDE_RESULT : null,
      LDL_RESULT: LDL_RESULT ? LDL_RESULT : null,
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
    onGetPhysicalExam(physicalExamSelect?.id);
  };

  // cập nhật cận lâm sàn
  const handleUpdatePreClinicalExam = async (data, id) => {
    await onUpdatePreClinicExam(data, id);
  };

  // create kêt luận
  const handleCreatePhysicalResult = async () => {
    await onCreatePhysicalExamResult();
  };

  // create glucose
  const handleCreateGlucose = async (data) => {
    // await createGlucose(data);
    try {
      await glucoseApi.createGlucose(data);
    } catch (error) {
      console.log("error");
    }
  };
  // update glucose
  const handleUpdateGlucose = async (data, id) => {
    // await updateGlucose(data, id);
    try {
      await glucoseApi.updateGlucose(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  // create liver Enzyme
  const handleCreateLiverEnzymes = async (data) => {
    // await createLiverEnzymes(data);
    try {
      await liverEnzymeApi.createLiverEnzymes(data);
    } catch (error) {
      console.log("error");
    }
  };
  // update Liver Enzyme
  const handleUpdateLiverEnzymes = async (data, id) => {
    // await updateLiverEnzymes(data, id);
    try {
      await liverEnzymeApi.updateLiverEnzymes(data, id);
    } catch (error) {
      console.log("error");
    }
  };
  // create ure creatinin
  const handlCreateUreCreatine = async (data) => {
    // await createUreCreatine(data);
    try {
      await ureCreatineApi.createUreCreatine(data);
    } catch (error) {
      console.log("error");
    }
  };

  // update Ure creatine
  const handleUpdateUreCreatine = async (data, id) => {
    // await updateUreCreatine(data, id);
    try {
      await ureCreatineApi.updateUreCreatine(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  // create blood lipid
  const handleCreateBloodLipid = async (data) => {
    // await createBloodLipid(data);
    try {
      await bloodLipidApi.createBloodLipid(data);
    } catch (error) {
      console.log("error");
    }
  };

  // update bloode lipid
  const handleUpdateBloodLipid = async (data, id) => {
    // await updateBloodLipid(data, id);
    try {
      await bloodLipidApi.updateBloodLipid(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  const handleChangeWBC = (value) => {
    setWBC(Number(value));
  };

  const handleChangeRBC = (value) => {
    setRBC(Number(value));
  };
  const handleChangeHGB = (value) => {
    setHGB(Number(value));
  };
  const handleChangeHCT = (value) => {
    setHCT(Number(value));
  };
  const handleChangeMCV = (value) => {
    setMCV(Number(value));
  };
  const handleChangeMCH = (value) => {
    setMCH(Number(value));
  };
  const handleChangePLT = (value) => {
    setPLT(Number(value));
  };
  const handleChangeGlucose = (value) => {
    setGlucose(Number(value));
  };
  const handleChangeUrea = (value) => {
    setUrea(Number(value));
  };
  const handleChangeCreatine = (value) => {
    setCreatine(Number(value));
  };
  const handleChangeSGOTAST = (value) => {
    setSGOTAST(value);
  };
  const handleChangeSGPTALT = (value) => {
    setSGPTALT(Number(value));
  };
  const handleChangeCholesterol = (value) => {
    setCholesterol(Number(value));
  };
  const handleChangeHDL = (value) => {
    setHDL(Number(value));
  };
  const handleChangeLDL = (value) => {
    setLDL(Number(value));
  };
  const handleChangeTriglyceride = (value) => {
    setTriglyceride(Number(value));
  };

  const handleBack = async () => {
    if (physicalExamSelect) {
      await onGetClinicalDetail(physicalExamSelect?.Clinical_Details?.[0]?.id);
    }
    // await onGetPhysicalDetai(newPhysicalDetail?.id);
    onKeyChange("4");
    setIsClinicalExam(false);
    setIsPreClinicalExam(true);
  };

  const handleGetPhysicalDetail = async (id) => {
    const res = await preclinicDetailApi.getPreclinicalDetailById(id);
    // console.log("res: ", res);
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
    } else {
      setFileList([]);
    }
  }, [preclinicDetail, isRefresh]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onChange = async ({ fileList: newFileList, file }) => {
    let newImage = [...newFileList];

    if (file.status !== "removed") {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        return;
      }
    }

    if (file.status === "error") {
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
          // "/" +
          // process.env.REACT_APP_UPLOADED_FOLDER +
          `/files/${newPreclinicalFile.data.elements.NAME}`,
      };
    }
    if (file.status === "removed") {
      // await deletePreclinicalDetailFile(file.id);
      try {
        await preclinicalDetailFileApi.deletePreclinicalDetailFile(file.id);
      } catch (error) {
        console.log("error");
      }
    }
    setFileList(newImage);
  };

  const handlePreview = async (file) => {
    if (file.url.includes(".pdf")) {
      setIsPDF(true);
    } else {
      setIsPDF(false);
    }
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  // end upload file

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
                    <Input allowClear />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="STOMACH_ULTRA_SOUND_RESULT"
                    label="Kết luận"
                    rules={[{ required: true }]}
                    labelCol={{ span: 4, offset: 4 }}
                  >
                    <Input allowClear />
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
                    <Input allowClear />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="THYROID_ULTRA_SOUND_RESULT"
                    label="Kết luận"
                    labelCol={{ span: 4, offset: 4 }}
                  >
                    <Input allowClear />
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
                    <Input allowClear />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="MAMMARY_ULTRA_SOUND_RESULT"
                    label="Kết luận"
                    labelCol={{ span: 4, offset: 4 }}
                  >
                    <Input allowClear />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            {/* 4 */}

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
                    <Input allowClear />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="ECG_RESULT"
                    label="Kết luận"
                    rules={[{ required: true }]}
                    labelCol={{ span: 4, offset: 4 }}
                  >
                    <Input allowClear />
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
                        5. X-Quang ngực
                      </Title>
                    }
                    name="XRAY_DESC"
                    labelCol={{ span: 12 }}
                  >
                    <Input allowClear />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    name="XRAY_RESULT"
                    label="Kết luận"
                    rules={[{ required: true }]}
                    labelCol={{ span: 4, offset: 4 }}
                  >
                    <Input allowClear />
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
                  >
                    <Input disabled={isBoolean ? true : false} />
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
                    <Input allowClear />
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              WBC < generalSetting?.WBC_MIN ||
                              WBC > generalSetting?.WBC_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeWBC}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          style={{ width: "30%", textAlign: "center" }}
                          value={generalSetting?.WBC_UNIT_DEFAULT}
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
                        style={{ width: "35%", textAlign: "center" }}
                        value={generalSetting?.WBC_MIN}
                      />
                      <Input
                        style={{ width: "35%", textAlign: "center" }}
                        value={generalSetting?.WBC_MAX}
                      />
                      <Input
                        style={{ width: "30%", textAlign: "center" }}
                        value={generalSetting?.WBC_UNIT_DEFAULT}
                      />
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              RBC < generalSetting?.RBC_MIN ||
                              RBC > generalSetting?.RBC_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeRBC}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          style={{ width: "30%", textAlign: "center" }}
                          value={generalSetting?.RBC_UNIT_DEFAULT}
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
                        style={{ width: "35%", textAlign: "center" }}
                        value={generalSetting?.RBC_MIN}
                      />
                      <Input
                        style={{ width: "35%", textAlign: "center" }}
                        value={generalSetting?.RBC_MAX}
                      />
                      <Input
                        style={{ width: "30%", textAlign: "center" }}
                        value={generalSetting?.RBC_UNIT_DEFAULT}
                      />
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              HGB < generalSetting?.HGB_MIN ||
                              HGB > generalSetting?.HGB_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeHGB}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          style={{ textAlign: "center", width: "30%" }}
                          value={generalSetting?.HGB_UNIT_DEFAULT}
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
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.HGB_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.HGB_MAX}
                      />
                      <Input
                        style={{ textAlign: "center", width: "30%" }}
                        value={generalSetting?.HGB_UNIT_DEFAULT}
                      />
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              HCT < generalSetting?.HCT_MIN ||
                              HCT > generalSetting?.HCT_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeHCT}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          style={{ textAlign: "center", width: "30%" }}
                          value={generalSetting?.HCT_UNIT_DEFAULT}
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
                        style={{
                          textAlign: "center",
                          width: "35%",
                        }}
                        value={generalSetting?.HCT_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.HCT_MAX}
                      />
                      <Input
                        style={{ textAlign: "center", width: "30%" }}
                        value={generalSetting?.HCT_UNIT_DEFAULT}
                      />
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              MCV < generalSetting?.MCV_MIN ||
                              MCV > generalSetting?.MCV_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeMCV}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          style={{ textAlign: "center", width: "30%" }}
                          value={generalSetting?.MCV_UNIT_DEFAULT}
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
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.MCV_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.MCV_MAX}
                      />
                      <Input
                        style={{ textAlign: "center", width: "30%" }}
                        value={generalSetting?.MCV_UNIT_DEFAULT}
                      />
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              MCH < generalSetting?.MCH_MIN ||
                              MCH > generalSetting?.MCH_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeMCH}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          style={{ textAlign: "center", width: "30%" }}
                          value={generalSetting?.MCH_UNIT_DEFAULT}
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
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.MCH_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.MCH_MAX}
                      />
                      <Input
                        style={{ textAlign: "center", width: "30%" }}
                        value={generalSetting?.MCH_UNIT_DEFAULT}
                      />
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              PLT < generalSetting?.PLT_MIN ||
                              PLT > generalSetting?.PLT_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangePLT}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          style={{ textAlign: "center", width: "30%" }}
                          value={generalSetting?.PLT_UNIT_DEFAULT}
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
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.PLT_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.PLT_MAX}
                      />
                      <Input
                        style={{ textAlign: "center", width: "30%" }}
                        value={generalSetting?.PLT_UNIT_DEFAULT}
                      />
                    </Input.Group>
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              Glucose < generalSetting?.GLUCOSE_MIN ||
                              Glucose > generalSetting?.GLUCOSE_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeGlucose}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
                          value={generalSetting?.GLUCOSE_UNIT_DEFAULT}
                        >
                          <Option value={generalSetting?.GLUCOSE_UNIT_DEFAULT}>
                            {generalSetting?.GLUCOSE_UNIT_DEFAULT}
                          </Option>
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
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.GLUCOSE_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.GLUCOSE_MAX}
                      />
                      <Select
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                        value={generalSetting?.GLUCOSE_UNIT_DEFAULT}
                      >
                        <Option value={generalSetting?.GLUCOSE_UNIT_DEFAULT}>
                          {generalSetting?.GLUCOSE_UNIT_DEFAULT}
                        </Option>
                      </Select>
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              Urea < generalSetting?.UREA_MIN ||
                              Urea > generalSetting?.UREA_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeUrea}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
                          value={generalSetting?.UREA_UNIT_DEFAULT}
                        >
                          <Option value={generalSetting?.UREA_UNIT_DEFAULT}>
                            {generalSetting?.UREA_UNIT_DEFAULT}
                          </Option>
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
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.UREA_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.UREA_MAX}
                      />
                      <Select
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                        value={generalSetting?.UREA_UNIT_DEFAULT}
                      >
                        <Option value={generalSetting?.UREA_UNIT_DEFAULT}>
                          {generalSetting?.UREA_UNIT_DEFAULT}
                        </Option>
                      </Select>
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              Creatine < generalSetting?.CREATINE_MIN ||
                              Creatine > generalSetting?.CREATINE_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeCreatine}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
                          value={generalSetting?.CREATINE_UNIT_DEFAULT}
                        >
                          <Option value={generalSetting?.CREATINE_UNIT_DEFAULT}>
                            {generalSetting?.CREATINE_UNIT_DEFAULT}
                          </Option>
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
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.CREATINE_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.CREATINE_MAX}
                      />
                      <Select
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                        value={generalSetting?.CREATINE_UNIT_DEFAULT}
                      >
                        <Option value={generalSetting?.CREATINE_UNIT_DEFAULT}>
                          {generalSetting?.CREATINE_UNIT_DEFAULT}
                        </Option>
                      </Select>
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              SGOTAST < generalSetting?.SGOT_AST_MIN ||
                              SGOTAST > generalSetting?.SGOT_AST_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeSGOTAST}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          value={generalSetting?.SGOT_AST_UNIT_DEFAULT}
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
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
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.SGOT_AST_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.SGOT_AST_MAX}
                      />
                      <Input
                        value={generalSetting?.SGOT_AST_UNIT_DEFAULT}
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                      />
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
                        noStyle
                        rules={[{ required: true }]}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              SGPTALT < generalSetting?.SGPT_ALT_MIN ||
                              SGPTALT > generalSetting?.SGPT_ALT_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeSGPTALT}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Input
                          value={generalSetting?.SGPT_ALT_UNIT_DEFAULT}
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
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
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.SGPT_ALT_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.SGPT_ALT_MAX}
                      />
                      <Input
                        value={generalSetting?.SGPT_ALT_UNIT_DEFAULT}
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                      />
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
                    <Input.Group compact style={{ marginLeft: "20px" }}>
                      {/* <span style={styleRequire}>&emsp;</span> */}
                      <Form.Item name="CHOLESTEROL_RESULT" noStyle>
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              Cholesterol < generalSetting?.CHOLESTEROL_MIN ||
                              Cholesterol > generalSetting?.CHOLESTEROL_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeCholesterol}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
                          value={generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                        >
                          <Option
                            value={generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                          >
                            {generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                          </Option>
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
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.CHOLESTEROL_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.CHOLESTEROL_MAX}
                      />
                      <Select
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                        value={generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                      >
                        <Option
                          value={generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                        >
                          {generalSetting?.CHOLESTEROL_UNIT_DEFAULT}
                        </Option>
                      </Select>
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
                    <Input.Group compact style={{ marginLeft: "20px" }}>
                      <Form.Item name="HDL_RESULT" noStyle initialValue={null}>
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              HDL < generalSetting?.HDL_MIN ||
                              HDL > generalSetting?.HDL_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeHDL}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
                          value={generalSetting?.HDL_UNIT_DEFAULT}
                        >
                          <Option value={generalSetting?.HDL_UNIT_DEFAULT}>
                            {generalSetting?.HDL_UNIT_DEFAULT}
                          </Option>
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
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.HDL_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.HDL_MAX}
                      />
                      <Select
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                        value={generalSetting?.HDL_UNIT_DEFAULT}
                      >
                        <Option value={generalSetting?.HDL_UNIT_DEFAULT}>
                          {generalSetting?.HDL_UNIT_DEFAULT}
                        </Option>
                      </Select>
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
                    <Input.Group compact style={{ marginLeft: "20px" }}>
                      <Form.Item name="LDL_RESULT" noStyle initialValue={null}>
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              LDL < generalSetting?.LDL_MIN ||
                              LDL > generalSetting?.LDL_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeLDL}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
                          value={generalSetting?.LDL_UNIT_DEFAULT}
                        >
                          <Option value={generalSetting?.LDL_UNIT_DEFAULT}>
                            {generalSetting?.LDL_UNIT_DEFAULT}
                          </Option>
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
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.LDL_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.LDL_MAX}
                      />
                      <Select
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                        value={generalSetting?.LDL_UNIT_DEFAULT}
                      >
                        <Option value={generalSetting?.LDL_UNIT_DEFAULT}>
                          {generalSetting?.LDL_UNIT_DEFAULT}
                        </Option>
                      </Select>
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
                    <Input.Group compact style={{ marginLeft: "20px" }}>
                      <Form.Item
                        name="TRIGLYCERIDE_RESULT"
                        noStyle
                        initialValue={null}
                      >
                        <NumericInput
                          style={{
                            width: "62%",
                            textAlign: "center",
                            color:
                              Triglyceride < generalSetting?.TRIGLYCERIDE_MIN ||
                              Triglyceride > generalSetting?.TRIGLYCERIDE_MAX
                                ? "red"
                                : "black",
                          }}
                          onChange={handleChangeTriglyceride}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          style={{
                            width: "30%",
                            textAlign: "center",
                          }}
                          value={generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                        >
                          <Option
                            value={generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                          >
                            {generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                          </Option>
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
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.TRIGLYCERIDE_MIN}
                      />
                      <Input
                        style={{ textAlign: "center", width: "35%" }}
                        value={generalSetting?.TRIGLYCERIDE_MAX}
                      />
                      <Select
                        style={{
                          width: "30%",
                          textAlign: "center",
                        }}
                        value={generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                      >
                        <Option
                          value={generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                        >
                          {generalSetting?.TRIGLYCERIDE_UNIT_DEFAULT}
                        </Option>
                      </Select>
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
                    <Input />
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
                <Col span={16}>
                  <Form.Item name="files">
                    <Upload
                      beforeUpload={beforeUpload}
                      maxCount={5}
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={handlePreview}
                      listType="picture"
                      accept=".doc, .docx, .png, .jpg, .jpeg, .pdf, .csv, 
                      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                      application/vnd.ms-excel, .heif, .heic"
                    >
                      {fileList?.length < 5 && (
                        <UploadOutlined style={{ fontSize: 30 }} />
                      )}
                    </Upload>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={() => setPreviewOpen(false)}
                      width={800}
                    >
                      {!isPDF && previewImage ? (
                        <img
                          alt="example"
                          style={{
                            width: "100%",
                          }}
                          src={previewImage}
                        />
                      ) : (
                        <>
                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                            <Viewer
                              fileUrl={previewImage}
                              plugins={[defaultLayoutPluginInstance]}
                            />
                          </Worker>
                        </>
                      )}
                    </Modal>
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
