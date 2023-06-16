import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Typography,
  Select,
  Upload,
  Modal,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSnackbar } from "notistack";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { generalSettingState } from "../../../../recoil/atom/generalSettingState";
import { usePreclinicalDetailFile } from "../../../../hooks/preclinicalDetailFile";
import { getBase64 } from "../../../../common";
import preclinicDetailApi from "../../../../api/preclinicDetailApi";
import preclinicalDetailFileApi from "../../../../api/preclinicalDetailFileApi";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import NumericInput from "../../../NumericInput/NumericInput";
import { Logger } from "logging-library";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";
import {
  physicalClassificationOptionsState,
  physicalClassificationState,
} from "../../../../recoil/atom/physicalClassificationState";
import {
  classificationData,
  generalSettingData,
} from "../../../../common/getAllApi";
import { newestPreClinicalDetailRecruitState } from "../../../../recoil/atom/preClinicalDetailState";
import glucoseApi from "../../../../api/glucoseApi";
import liverEnzymeApi from "../../../../api/liverEnzymeApi";
import ureCreatineApi from "../../../../api/ureCreatineApi";
import { physicalExamNewRecruitState } from "../../../../recoil/atom/physicalExamNew";
import { physicalExamRecruitIdState } from "../../../../recoil/atom/physicalExamState";
import { newestPhysicalExamResultRecruitState } from "../../../../recoil/atom/physicalExamResult";
import physicalExamResultApi from "../../../../api/physicalExamResultApi";
import { usePhysicalClassification } from "../../../../hooks/physicalClassification";
const { Title } = Typography;
const { Option } = Select;
const storage = process.env.REACT_APP_BASE_URL + "/files";
const styleDisplay = {
  marginBottom: {
    marginBottom: 0,
  },
  marginTop: {
    marginTop: 20,
  },
};

const validateMessages = {
  required: "Trường này không được để trống!",
};

const FrmSubclinicalExamination = ({
  onKeyChange,
  SubclinicalExamRef,
  isDoctor,
  fileList,
  setFileList,
}) => {
  usePhysicalClassification();
  const { deletePreclinicalDetailFile } = usePreclinicalDetailFile();
  const preClinicalDetailNew = useRecoilValue(
    newestPreClinicalDetailRecruitState
  );
  const [generalSettings, setGeneralSettings] =
    useRecoilState(generalSettingState);
  const physicalExamGetNew = useRecoilValue(physicalExamNewRecruitState);

  const [WBC, setWBC] = useState("");
  const [RBC, setRBC] = useState("");
  const [PLT, setPLT] = useState("");
  const [Glucose, setGlucose] = useState("");
  const [Urea, setUrea] = useState("");
  const [Creatine, setCreatine] = useState("");
  const [SGOTAST, setSGOTAST] = useState("");
  const [SGPTALT, setSGPTALT] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [previewTitle, setPreviewTitle] = useState(undefined);
  const [preclinicDetail, setPreclinicDetail] = useState(undefined);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { enqueueSnackbar } = useSnackbar();
  const classificationOptions = useRecoilValue(
    physicalClassificationOptionsState
  );
  const setClassificationList = useSetRecoilState(physicalClassificationState);

  const physicalExamRecruitId = useRecoilValue(physicalExamRecruitIdState);

  const [physicalExamResultNew, setPhysicalExamResultNew] = useRecoilState(
    newestPhysicalExamResultRecruitState
  );

  //CHECK GENERAL SETTING LIST
  useEffect(() => {
    generalSettingData(generalSettings, setGeneralSettings);
  }, []);

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      enqueueSnackbar("File tải lên phải nhỏ hơn 5MB!", { variant: "error" });
    }
    return isLt2M;
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (physicalExamRecruitId) {
      const newData = physicalExamRecruitId?.Preclinical_Details[0];
      setWBC(newData?.WBC_RESULT);
      setRBC(newData?.RBC_RESULT);
      setPLT(newData?.PLT_RESULT);
      setGlucose(newData?.Glucoses[0]?.GLUCOSE_HUNGRY);
      setUrea(newData?.Ure_Creatines[0]?.UREA_RESULT);
      setCreatine(newData?.Ure_Creatines[0]?.CREATINE_RESULT);
      setSGOTAST(newData?.Liver_Enzymes[0]?.SGOT_AST_RESULT);
      setSGPTALT(newData?.Liver_Enzymes[0]?.SGPT_ALT_RESULT);
      form.setFieldsValue({
        OVERAL_ULTRA_SOUND_RESULT: newData?.OVERAL_ULTRA_SOUND_RESULT,
        XRAY_RESULT: newData?.XRAY_RESULT,
        WBC_RESULT: newData?.WBC_RESULT,
        RBC_RESULT: newData?.RBC_RESULT,
        PLT_RESULT: newData?.PLT_RESULT,
        URINALYSIS_RESULT: newData?.URINALYSIS_RESULT,
        GLUCOSE_RESULT: newData?.Glucoses[0]?.GLUCOSE_HUNGRY,
        UREA_RESULT: newData?.Ure_Creatines[0]?.UREA_RESULT,
        CREATINE_RESULT: newData?.Ure_Creatines[0]?.CREATINE_RESULT,
        SGOT_AST_RESULT: newData?.Liver_Enzymes[0]?.SGOT_AST_RESULT,
        SGPT_ALT_RESULT: newData?.Liver_Enzymes[0]?.SGPT_ALT_RESULT,
        GENERAL_RESULT:
          physicalExamRecruitId?.Physical_Exam_Results[0]?.GENERAL_RESULT,
        PHYSICAL_CLASSIFY_ID:
          physicalExamRecruitId?.Physical_Exam_Results[0]?.PHYSICAL_CLASSIFY_ID,
      });
    }
  }, [physicalExamRecruitId, form]);

  //GET DATA FORM
  const handleOk = () => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const {
      GLUCOSE_RESULT,
      UREA_RESULT,
      CREATINE_RESULT,
      SGOT_AST_RESULT,
      SGPT_ALT_RESULT,
      PHYSICAL_CLASSIFY_ID,
      GENERAL_RESULT,
      ...result
    } = newData;

    const glucoseData = {
      PRECLINICAL_DETAIL_ID: physicalExamRecruitId
        ? physicalExamRecruitId?.Preclinical_Details[0]?.id
        : preClinicalDetailNew?.id,
      EXAM_DATE: physicalExamRecruitId
        ? physicalExamRecruitId?.PHYSICAL_DATE
        : physicalExamGetNew?.PHYSICAL_DATE,
      GLUCOSE_HUNGRY: GLUCOSE_RESULT,
      DEFAULT_UNIT: generalSettings?.GLUCOSE_UNIT_DEFAULT,
    };

    const liverEnzymesData = {
      PRECLINICAL_DETAIL_ID: physicalExamRecruitId
        ? physicalExamRecruitId?.Preclinical_Details[0]?.id
        : preClinicalDetailNew?.id,
      EXAM_DATE: physicalExamRecruitId
        ? physicalExamRecruitId?.PHYSICAL_DATE
        : physicalExamGetNew?.PHYSICAL_DATE,
      SGOT_AST_DEFAULT_UNIT: generalSettings?.SGOT_AST_UNIT_DEFAULT,
      SGPT_ALT_DEFAULT_UNIT: generalSettings?.SGPT_ALT_UNIT_DEFAULT,
      SGOT_AST_RESULT: SGOT_AST_RESULT,
      SGPT_ALT_RESULT: SGPT_ALT_RESULT,
    };

    const ureCreatineData = {
      PRECLINICAL_DETAIL_ID: physicalExamRecruitId
        ? physicalExamRecruitId?.Preclinical_Details[0]?.id
        : preClinicalDetailNew?.id,
      EXAM_DATE: physicalExamRecruitId
        ? physicalExamRecruitId?.PHYSICAL_DATE
        : physicalExamGetNew?.PHYSICAL_DATE,
      UREA_DEFAULT_UNIT: generalSettings?.UREA_UNIT_DEFAULT,
      CREATINE_DEFAULT_UNIT: generalSettings?.CREATINE_UNIT_DEFAULT,
      UREA_RESULT: UREA_RESULT,
      CREATINE_RESULT: CREATINE_RESULT,
    };

    const physicalResult = {
      PHYSICAL_CLASSIFY_ID: PHYSICAL_CLASSIFY_ID,
      GENERAL_RESULT: GENERAL_RESULT,
    };
    if (physicalExamRecruitId) {
      // CHECK PRECLINICAL DETAIL
      if (physicalExamRecruitId?.Preclinical_Details[0]?.id) {
        handleUpdatePreClinicalExam(
          result,
          physicalExamRecruitId?.Preclinical_Details[0]?.id
        );

        // CHECK GLUCOSE
        if (physicalExamRecruitId?.Preclinical_Details[0]?.Glucoses[0]?.id) {
          handleUpdateGlucose(
            glucoseData,
            physicalExamRecruitId?.Preclinical_Details[0]?.Glucoses[0]?.id
          );
        } else {
          handleCreateGlucose(glucoseData);
        }

        // CHECK URE & CREATININ
        if (
          physicalExamRecruitId?.Preclinical_Details[0]?.Ure_Creatines[0]?.id
        ) {
          handleUpdateUreCreatine(
            ureCreatineData,
            physicalExamRecruitId?.Preclinical_Details[0]?.Ure_Creatines[0]?.id
          );
        } else {
          handleCreateUreCreatine(ureCreatineData);
        }

        //CHECK LIVER ENZYME
        if (
          physicalExamRecruitId?.Preclinical_Details[0]?.Liver_Enzymes[0]?.id
        ) {
          handleUpdateLiverEnzymes(
            liverEnzymesData,
            physicalExamRecruitId?.Preclinical_Details[0]?.Liver_Enzymes[0]?.id
          );
        } else {
          handleCreateLiverEnzymes(liverEnzymesData);
        }
      }

      // CHECK PHYSICAL EXAM RESULT
      if (physicalExamRecruitId?.Physical_Exam_Results[0]?.id) {
        handleUpdatePhysicalResult(
          physicalResult,
          physicalExamRecruitId?.Physical_Exam_Results[0]?.id
        );
      }
    }
    // CHECK PRECLINICAL DETAIL NEW
    if (preClinicalDetailNew) {
      handleUpdatePreClinicalExam(result, preClinicalDetailNew?.id);
      handleCreateGlucose(glucoseData);
      handleCreateLiverEnzymes(liverEnzymesData);
      handleCreateUreCreatine(ureCreatineData);
      handleUpdatePhysicalResult(
        physicalResult,
        physicalExamRecruitId
          ? physicalExamRecruitId?.Physical_Exam_Results[0]?.id
          : physicalExamResultNew?.id
      );
    }
    onKeyChange("5");
  };

  // cập nhật cận lâm sàng
  const handleUpdatePreClinicalExam = async (data, id) => {
    try {
      let res = await preclinicDetailApi.updatePreclinicalDetail(data, id);
    } catch (error) {
      console.log("Update preclinical detail fail!!");
    }
  };

  const handleUpdatePhysicalResult = async (data, id) => {
    try {
      if (physicalExamResultNew) {
        let res = await physicalExamResultApi.updatePhysicalExamResult(
          data,
          id
        );
        if (res.data) {
          let physicalResult =
            await physicalExamResultApi.getphyPicalExamResultById(id);
          if (physicalResult.data) {
            setPhysicalExamResultNew(
              physicalResult.data.elements.physicalExamResult
            );
          }
        }
      }
      if (physicalExamRecruitId) {
        await physicalExamResultApi.updatePhysicalExamResult(data, id);
      }
    } catch (error) {
      console.log("update physical exam result fail!!!");
    }
  };

  // create glucose
  const handleCreateGlucose = async (data) => {
    try {
      await glucoseApi.createGlucose(data);
    } catch (error) {
      console.log("Create glucose fail!!");
    }
  };
  // update glucose
  const handleUpdateGlucose = async (data, id) => {
    try {
      await glucoseApi.updateGlucose(data, id);
    } catch (error) {
      console.log("Update glucose fail!!!");
    }
  };

  // create liver Enzyme
  const handleCreateLiverEnzymes = async (data) => {
    try {
      await liverEnzymeApi.createLiverEnzymes(data);
    } catch (error) {
      console.log("Create liver enzyme fail!!");
    }
  };
  // update Liver Enzyme
  const handleUpdateLiverEnzymes = async (data, id) => {
    try {
      await liverEnzymeApi.updateLiverEnzymes(data, id);
    } catch (error) {
      console.log("Update liver enzyme fail!!");
    }
  };
  // create ure creatinin
  const handleCreateUreCreatine = async (data) => {
    try {
      await ureCreatineApi.createUreCreatine(data);
    } catch (error) {
      console.log("Create Ure & Creatinin fail!!");
    }
  };

  // update Ure creatine
  const handleUpdateUreCreatine = async (data, id) => {
    try {
      await ureCreatineApi.updateUreCreatine(data, id);
    } catch (error) {
      console.log("Update Ure & Creatinin fail!!");
    }
  };

  const handleChangeWBC = (value) => {
    setWBC(Number(value));
  };

  const handleChangeRBC = (value) => {
    setRBC(Number(value));
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

  const checkSafeThreshold = (state, key) => {
    const min = key + "_MIN";
    const max = key + "_MAX";
    return state < generalSettings?.[min] || state > generalSettings?.[max]
      ? "red"
      : "black";
  };

  const handleGetPreclinicalDetail = async (id) => {
    if (id) {
      const res = await preclinicDetailApi.getPreclinicalDetailById(id);
      setPreclinicDetail(res.data.elements.preclinicalDetail);
    }
  };

  useEffect(() => {
    handleGetPreclinicalDetail(
      physicalExamRecruitId?.Preclinical_Details[0].id
    );
  }, [physicalExamRecruitId]);

  /* HANDLE UPLOAD FILES */
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
  }, [preclinicDetail]);

  // UPLOAD IMAGE
  const handleChangeFile = async ({ fileList: newFileList, file }) => {
    let newImage = [...newFileList];
    // validate file size <5mb
    if (file.status !== "removed") {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        return;
      }
    }
    if (file.status !== "uploading" && file.status !== "removed") {
      if (newImage && newImage.length > 0) {
        newImage[newFileList.length - 1].status = "success";
      }
      let formData = new FormData();
      if (file && file.originFileObj) {
        formData.append("file", file?.originFileObj);
      }
      formData.append(
        "PRECLINICAL_DETAIL_ID",
        physicalExamRecruitId
          ? physicalExamRecruitId?.Preclinical_Details[0]?.id
          : preClinicalDetailNew?.id
      );
      const newPreclinicalFile =
        await preclinicalDetailFileApi.createPreclinicalDetailFile(formData);
      newImage[newFileList.length - 1] = {
        ...newPreclinicalFile.data.elements,
        name: newPreclinicalFile.data.elements.NAME,
        status: "done",
        url: storage + "/" + newPreclinicalFile.data.elements.NAME,
      };
    }
    if (file.status === "removed") {
      await deletePreclinicalDetailFile(file.id);
    }
    setFileList(newImage);
  };

  const handleCancel = () => {
    setPreviewOpen(false);
    setPreviewImage(undefined);
    setType(undefined);
    setPreviewTitle(undefined);
  };

  const getFileExtension = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
  };

  // PREVIEW IMAGE
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

  console.log("previewImage", previewImage);

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
          >
            {/* 1 */}
            <Form.Item>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>1. Siêu âm</Title>
                </Col>
                <Col span={9}>
                  <Form.Item name="OVERAL_ULTRA_SOUND_RESULT" label="Kết luận">
                    <Input disabled={isDoctor} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            {/* 2 */}
            <Form.Item>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>2. X-Quang phổi</Title>
                </Col>
                <Col span={9}>
                  <Form.Item name="XRAY_RESULT" label="Kết luận">
                    <Input disabled={isDoctor} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            {/* 3 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={9} offset={2}>
                  <Title level={5}>3. Công thức máu</Title>
                </Col>
                <Col span={4} offset={3}>
                  <h5>Trị số bình thường</h5>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    3.1. RBC <br /> &emsp;&emsp;&nbsp;Số lượng hồng cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name="RBC_RESULT" noStyle>
                        <NumericInput
                          disabled={isDoctor}
                          style={{
                            width: "60%",
                            // color: checkSafeThreshold(RBC, "RBC"),
                          }}
                          onChange={handleChangeRBC}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          disabled={isDoctor}
                          style={{
                            width: "40%",
                          }}
                          value={generalSettings?.RBC_UNIT_DEFAULT}
                        >
                          <Option value={generalSettings?.RBC_UNIT_DEFAULT}>
                            {generalSettings?.RBC_UNIT_DEFAULT}
                          </Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        {generalSettings?.RBC_MIN} - {generalSettings?.RBC_MAX}{" "}
                        {generalSettings?.RBC_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    3.2. WBC <br /> &emsp;&emsp;&nbsp;Số lượng bạch cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name="WBC_RESULT" noStyle>
                        <NumericInput
                          disabled={isDoctor}
                          style={{
                            width: "60%",
                            // color: checkSafeThreshold(WBC, "WBC"),
                          }}
                          onChange={handleChangeWBC}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          disabled={isDoctor}
                          style={{
                            width: "40%",
                          }}
                          value={generalSettings?.WBC_UNIT_DEFAULT}
                        >
                          <Option value={generalSettings?.WBC_UNIT_DEFAULT}>
                            {generalSettings?.WBC_UNIT_DEFAULT}
                          </Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        {generalSettings?.WBC_MIN} - {generalSettings?.WBC_MAX}{" "}
                        {generalSettings?.WBC_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    3.3. PLT <br /> &emsp;&emsp;&nbsp;Số lượng tiểu cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name="PLT_RESULT" noStyle>
                        <NumericInput
                          disabled={isDoctor}
                          style={{
                            width: "60%",
                            // color: checkSafeThreshold(PLT, "PLT"),
                          }}
                          onChange={handleChangePLT}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          disabled={isDoctor}
                          style={{
                            width: "40%",
                          }}
                          value={generalSettings?.PLT_UNIT_DEFAULT}
                        >
                          <Option value={generalSettings?.PLT_UNIT_DEFAULT}>
                            {generalSettings?.PLT_UNIT_DEFAULT}
                          </Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        {generalSettings?.PLT_MIN} - {generalSettings?.PLT_MAX}{" "}
                        {generalSettings?.PLT_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            {/* 4 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>
                    4. Đường huyết đói <br /> Glucose
                  </Title>
                </Col>
                <Col span={5} offset={1}>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name="GLUCOSE_RESULT" noStyle>
                        <NumericInput
                          disabled={isDoctor}
                          style={{
                            width: "60%",
                            // color: checkSafeThreshold(Glucose, "GLUCOSE"),
                          }}
                          onChange={handleChangeGlucose}
                        />
                      </Form.Item>
                      <Form.Item noStyle>
                        <Select
                          disabled={isDoctor}
                          style={{
                            width: "40%",
                          }}
                          value={generalSettings?.GLUCOSE_UNIT_DEFAULT}
                        >
                          <Option value={generalSettings?.GLUCOSE_UNIT_DEFAULT}>
                            {generalSettings?.GLUCOSE_UNIT_DEFAULT}
                          </Option>
                        </Select>
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        {generalSettings?.GLUCOSE_MIN} -{" "}
                        {generalSettings?.GLUCOSE_MAX}{" "}
                        {generalSettings?.GLUCOSE_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            {/* 5 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>5. Chức năng thận</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>5.1 Urea</Title>
                </Col>
                <Col span={5}>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name="UREA_RESULT" noStyle>
                        <NumericInput
                          disabled={isDoctor}
                          style={{
                            width: "60%",
                            // color: checkSafeThreshold(Urea, "UREA"),
                          }}
                          onChange={handleChangeUrea}
                        />
                      </Form.Item>
                      <Select
                        disabled={isDoctor}
                        style={{
                          width: "40%",
                        }}
                        value={generalSettings?.UREA_UNIT_DEFAULT}
                      >
                        <Option value={generalSettings?.UREA_UNIT_DEFAULT}>
                          {generalSettings?.UREA_UNIT_DEFAULT}
                        </Option>
                      </Select>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        {generalSettings?.UREA_MIN} -{" "}
                        {generalSettings?.UREA_MAX}{" "}
                        {generalSettings?.UREA_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>5.2 Creatine</Title>
                </Col>
                <Col span={5}>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name="CREATINE_RESULT" noStyle>
                        <NumericInput
                          disabled={isDoctor}
                          style={{
                            width: "60%",
                            // color: checkSafeThreshold(Creatine, "CREATINE"),
                          }}
                          onChange={handleChangeCreatine}
                        />
                      </Form.Item>
                      <Select
                        disabled={isDoctor}
                        style={{
                          width: "40%",
                        }}
                        value={generalSettings?.CREATINE_UNIT_DEFAULT}
                      >
                        <Option value={generalSettings?.CREATINE_UNIT_DEFAULT}>
                          {generalSettings?.CREATINE_UNIT_DEFAULT}
                        </Option>
                      </Select>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        Nam {generalSettings?.CREATINE_MIN_MALE} -{" "}
                        {generalSettings?.CREATINE_MAX_MALE}{" "}
                        {generalSettings?.CREATINE_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        Nữ {generalSettings?.CREATINE_MIN_FEMALE} -{" "}
                        {generalSettings?.CREATINE_MIN_FEMALE}{" "}
                        {generalSettings?.CREATINE_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            {/* 6 */}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>6. Chức năng gan</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>6.1 SGOT/AST</Title>
                  <Title level={5}>6.2 SGPT/ALT</Title>
                </Col>
                <Col span={5}>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name="SGOT_AST_RESULT" noStyle>
                        <NumericInput
                          disabled={isDoctor}
                          style={{
                            width: "60%",
                            // color: checkSafeThreshold(SGOTAST, "SGOT_AST"),
                          }}
                          onChange={handleChangeSGOTAST}
                        />
                      </Form.Item>
                      <Select
                        disabled={isDoctor}
                        style={{
                          width: "40%",
                        }}
                        value={generalSettings?.SGOT_AST_UNIT_DEFAULT}
                      >
                        <Option value={generalSettings?.SGOT_AST_UNIT_DEFAULT}>
                          {generalSettings?.SGOT_AST_UNIT_DEFAULT}
                        </Option>
                      </Select>
                    </Input.Group>
                  </Form.Item>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name="SGPT_ALT_RESULT" noStyle>
                        <NumericInput
                          disabled={isDoctor}
                          style={{
                            width: "60%",
                            // color: checkSafeThreshold(SGPTALT, "SGPT_ALT"),
                          }}
                          onChange={handleChangeSGPTALT}
                        />
                      </Form.Item>
                      <Select
                        disabled={isDoctor}
                        style={{
                          width: "40%",
                        }}
                        value={generalSettings?.SGPT_ALT_UNIT_DEFAULT}
                      >
                        <Option value={generalSettings?.SGPT_ALT_UNIT_DEFAULT}>
                          {generalSettings?.SGPT_ALT_UNIT_DEFAULT}
                        </Option>
                      </Select>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2} style={{ marginTop: "25px" }}>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        {"Nam < "}
                        {generalSettings?.SGOT_AST_MAX_MALE}{" "}
                        {generalSettings?.SGOT_AST_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                  <Input.Group compact>
                    <Form.Item noStyle>
                      <i>
                        {"Nữ < "}
                        {generalSettings?.SGOT_AST_MAX_FEMALE}{" "}
                        {generalSettings?.SGOT_AST_UNIT_DEFAULT}
                      </i>
                    </Form.Item>
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>7. Tổng phân tích nước tiểu</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={2}></Col>
                <Col span={9}>
                  <Form.Item name="URINALYSIS_RESULT" label="Kết luận">
                    <Input disabled={isDoctor} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>8. Phân loại sức khỏe</Title>
                </Col>
                <Col span={9} offset={1}>
                  <Form.Item name="PHYSICAL_CLASSIFY_ID">
                    <Select
                      disabled={isDoctor}
                      allowClear
                      options={classificationOptions}
                      onFocus={() =>
                        classificationData(
                          classificationOptions,
                          setClassificationList
                        )
                      }
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>9. Kết luận</Title>
                </Col>
                <Col span={9} offset={1}>
                  <Form.Item name="GENERAL_RESULT">
                    <Input disabled={isDoctor} />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>10. Hồ sơ/kết quả khám sức khỏe </Title>
                </Col>
                <Col span={9} offset={1}>
                  <Form.Item name="files">
                    <Upload
                      beforeUpload={beforeUpload}
                      maxCount={5}
                      fileList={fileList}
                      onChange={handleChangeFile}
                      onPreview={handlePreview}
                      listType="picture"
                      disabled={isDoctor}
                      accept=".doc, .docx, .png, .jpg, .jpeg, .pdf, .csv, 
                      application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, 
                      application/vnd.ms-excel, .heif, .heic"
                    >
                      <Button disabled={isDoctor}>Tải file</Button>
                    </Upload>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                      width={1300}
                      style={{
                        top: 20,
                      }}
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
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Row>
              <Col span={2} offset={2}>
                <Button onClick={() => onKeyChange("3")} className="btn-submit">
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
