import { Button, Col, Form, Input, Row, Select, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import physicalExamApi from "../../../../../api/physicalExamApi";
import specialExamApi from "../../../../../api/specialExamApi";
import specialExamResultApi from "../../../../../api/specialExamResultApi";
import { employeeIdState } from "../../../../../recoil/atom/employeeState";
import { newestPhysicalExamState, physicalExamIdState, physicalExamSelectState } from "../../../../../recoil/atom/physicalExamState";
import { specialExamResultOptionsState } from "../../../../../recoil/atom/specialExamResultState";
import { newestSpecialExamState, specialDiseaseTypeState, specialExamTypeState } from "../../../../../recoil/atom/specialExamState";
import { tabActiveState } from "../../../../../recoil/atom/tabActiveState";
import OccupationalMedicalExamPDF from "../OccupationalMedicalExamPDF";
import preclinicalDetailApi from "../../../../../api/preclinicDetailApi";
import preclinicalDetailFileApi from "../../../../../api/preclinicalDetailFileApi";

const validateMessages = {
  required: "Trường này không được để trống!",
};

const makeYearSelectOptions = (n) => {
  const thisYear = new Date().getFullYear();
  const options = [];
  for (let i = 0; i < n; i++) {
    options.push({
      value: `${thisYear - i}`,
      label: thisYear - i,
    })
  }
  return options;
}
const makeLaborLossRateOptions = (n) => {
  const options = [];
  for (let i = 1; i <= n; i++) {
    options.push({
      value: i,
      label: `${i}`,
    })
  }
  return options;
}

const storage = process.env.REACT_APP_BASE_URL + "/files";

const FrmConclusion = ({ onKeyChange, FrmConclusionRef, onCancel, onCreate, onReload }) => {
  const [form] = Form.useForm();
  const input_1 = Form.useWatch('RESULT_INPUT_NAME', form);
  const input_2 = Form.useWatch('RESULT_INPUT_NAME_2', form);
  const select_1 = Form.useWatch('RESULT_SELECT_ID', form);
  const select_2 = Form.useWatch('RESULT_SELECT_ID_2', form);
  const { enqueueSnackbar } = useSnackbar();

  const [isOpenFilePDF, setIsOpenFilePDF] = useState(false);
  const [downloadPdf, setDownloadPdf] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [preclinicalDetailId, setPreclinicDetailId] = useState();

  const specialExamType = useRecoilValue(specialExamTypeState);
  const specialExamResultOptions = useRecoilValue(specialExamResultOptionsState);
  const specialDiseaseType = useRecoilValue(specialDiseaseTypeState);
  const newSpecialExam = useRecoilValue(newestSpecialExamState);
  const setTabActive = useSetRecoilState(tabActiveState);
  const setEmployeeId = useSetRecoilState(employeeIdState);
  const setPhysicalExamId = useSetRecoilState(physicalExamIdState);
  const [physicalExam, setPhysicalExam] = useRecoilState(physicalExamSelectState);
  const newPhysicalExam = useRecoilValue(newestPhysicalExamState);

  /* GET PHYSICAL EXAMINATION ID FOR PRINT PDF */
  useEffect(() => {
    if (physicalExam || newPhysicalExam) {
      setPhysicalExamId(physicalExam?.id || newPhysicalExam?.id);
    }
  }, [physicalExam, newPhysicalExam, setPhysicalExamId]);

  /* SET FIELDS VALUE */
  useEffect(() => {
    if (physicalExam) {
      (async () => {
        const res = await physicalExamApi.getPhysicalExam(physicalExam.id);
        if (res.data) {
          const specialExams = res.data.elements.physicalExam?.Special_Exams[0];
          const resultInput = specialExams?.Result_Input;
          if (specialExams.RESULT_SELECT_ID || specialExams.RESULT_SELECT_ID_2 || resultInput) {
            form.setFieldsValue({
              RESULT_SELECT_ID: String(specialExams.RESULT_SELECT_ID).concat("*-*", specialExams.RESULT_SELECT_NAME),
              RESULT_SELECT_ID_2: String(specialExams.RESULT_SELECT_ID_2).concat("*-*", specialExams.RESULT_SELECT_NAME_2),
              NOTE: specialExams?.NOTE,
              ...resultInput,
            })
          }
        }
      })()
    }
  }, [physicalExam, form]);

  /* GET PRECLINICAL DETAIL ID */
  useEffect(() => {
    const ID = physicalExam && physicalExam?.Preclinical_Details[0]?.id;
    if (!ID) {
      (async () => {
        const res = await preclinicalDetailApi.createPreclinicalDetail({
          PHYSICAL_EXAM_ID: physicalExam ? physicalExam.id : newPhysicalExam.id
        });
        if (res.data) {
          setPreclinicDetailId(res.data.elements.id);
        }
      })()
    } else setPreclinicDetailId(ID)
  }, [physicalExam, newPhysicalExam]);

  /* SET FILE LIST */
  useEffect(() => {
    if (preclinicalDetailId) {
      (async () => {
        const res = await preclinicalDetailApi.getPreclinicalDetailById(preclinicalDetailId);
        if (res.data) {
          const temporary = res.data.elements.preclinicalDetail?.Preclinical_Detail_Files?.map(
            (element) => ({
              id: element.id,
              name: element.NAME,
              status: "done",
              url: storage + "/" + element.NAME,
            })
          );
          setFileList(temporary);
        }
      })()
    }
  }, [preclinicalDetailId, physicalExam]);

  // Check file's size before upload
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      enqueueSnackbar("File tải lên phải nhỏ hơn 5MB!", { variant: "error" });
    }
    return isLt2M;
  };

  // Handle event on change file (upload and delete)
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
        preclinicalDetailId
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
  // update special examination
  const handleUpdateSpecialExam = async (data) => {
    let id = physicalExam ? physicalExam?.Special_Exams[0]?.id : newSpecialExam?.id;
    try {
      const res = await specialExamApi.updateSpecialExam(data, id);
      if (res.data) {
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  }
  // update physical examination
  const handleUpdatePhysicalExam = async (data) => {
    let id = physicalExam ? physicalExam?.id : newPhysicalExam?.id;
    await physicalExamApi.updatePhysicalExam(data, id);
  }
  // create special examination result
  const handleCreateSpecialExamResult = async (data, specialExam, key) => {
    const res = await specialExamResultApi.createSpecialExamResult(data);

    if (res.data) {
      handleUpdateSpecialExam({
        [`${key}`]: res.data.elements.id,
        ...specialExam
      })
    }
  }
  // update special examination result
  const handleUpdateSpecialExamResult = async (data) => {
    await specialExamResultApi.updateSpecialExamResult(data);
  }
  // submit screening examination result
  const handleSubmitScreeningExamResult = () => {
    const data = { ...form.getFieldsValue() };
    const { RESULT_SELECT_ID, RESULT_INPUT_NAME, RESULT_SELECT_ID_2, RESULT_INPUT_NAME_2, NOTE } = data;

    if (RESULT_INPUT_NAME && RESULT_INPUT_NAME.trim()) {
      const data = {
        NAME: RESULT_INPUT_NAME,
        TYPE: specialDiseaseType,
        NOTE: specialDiseaseType === 3 ? 'Silic_1' : null,
      };
      const specialExam = {
        RESULT_SELECT_NAME: RESULT_INPUT_NAME,
        NOTE: specialDiseaseType !== 3 ? NOTE : null,
      }

      handleCreateSpecialExamResult(data, specialExam, 'RESULT_SELECT_ID');
    } else {
      const resultSelect = RESULT_SELECT_ID?.split("*-*");

      handleUpdateSpecialExam({
        RESULT_SELECT_ID: Number(resultSelect[0]),
        RESULT_SELECT_NAME: resultSelect[1],
        NOTE: specialDiseaseType !== 3 ? NOTE : null,
      })
    };

    if (RESULT_INPUT_NAME_2 && RESULT_INPUT_NAME_2.trim()) {
      const data = {
        NAME: RESULT_INPUT_NAME_2,
        TYPE: specialDiseaseType,
        NOTE: specialDiseaseType === 3 && 'Silic_2',
      };
      const specialExam = {
        RESULT_SELECT_NAME_2: RESULT_INPUT_NAME_2,
        NOTE,
      }

      handleCreateSpecialExamResult(data, specialExam, 'RESULT_SELECT_ID_2');
    } else if (RESULT_SELECT_ID_2) {
      const resultSelect_2 = RESULT_SELECT_ID_2?.split("*-*");

      handleUpdateSpecialExam({
        RESULT_SELECT_ID_2: Number(resultSelect_2[0]),
        RESULT_SELECT_NAME_2: resultSelect_2[1],
        NOTE,
      })
    }

    form.resetFields();
    setTabActive({
      personalInformation: false,
      medicalHistory: true,
      physicalExam: true,
      conclusions: true,
    });
  }
  // submit periodic examination result
  const handleSubmitPeriodicExamResult = (data) => {
    const { files, ...result } = data;

    if (physicalExam && physicalExam?.Special_Exams[0]?.Result_Input?.id) {
      handleUpdateSpecialExamResult(result, physicalExam?.Special_Exams[0]?.Result_Input?.id)
    } else {
      const data = {
        ...result,
        TYPE: specialDiseaseType,
      }

      handleCreateSpecialExamResult(data, {}, 'RESULT_INPUT_ID');
    }
    form.resetFields();
    setTabActive({
      personalInformation: false,
      medicalHistory: true,
      physicalExam: true,
      conclusions: true,
    });
  }
  // check screening examination result
  const isCheckScreeningExamResult = (type) => {
    if ((!input_1 && !select_1) || (type === 3 && !input_2 && !select_2)) {
      form.validateFields();
      return 1;
    }
    if (isExist(input_1?.trim()) || isExist(input_2?.trim())) {
      enqueueSnackbar('Kết luận này đã tồn tại.', { variant: 'warning' });
      return 1;
    }
  }
  // Check periodic examination result
  const isCheckPeriodicExamResult = (data) => {
    const {
      CURRENT_JOB, DIANOSE,
      DISEASE_JOB_NAME, LABOR_LOSS_RATE,
      SOLUTION, SYMPTOMS, YEAR_DETECTED,
    } = data;

    if (
      CURRENT_JOB === undefined || (CURRENT_JOB.trim() === "") ||
      DIANOSE === undefined || (DIANOSE.trim() === "") ||
      DISEASE_JOB_NAME === undefined || (DISEASE_JOB_NAME.trim() === "") ||
      LABOR_LOSS_RATE === undefined ||
      SOLUTION === undefined || (SOLUTION.trim() === "") ||
      SYMPTOMS === undefined || (SYMPTOMS.trim() === "") ||
      YEAR_DETECTED === undefined || YEAR_DETECTED === null
    ) {
      return 1;
    }
  }
  // Check submit data success
  const isSubmitSuccess = () => {
    if (specialExamType === 0) {
      // failed
      if (isCheckScreeningExamResult(specialDiseaseType))
        return 0;

      // successful
      else {
        handleSubmitScreeningExamResult();
        return 1;
      }

    } else {
      const data = { ...form.getFieldsValue() };

      // failed
      if (isCheckPeriodicExamResult(data)) {
        form.validateFields();
        return 0;
      }

      // successful
      else {
        handleSubmitPeriodicExamResult(data);
        return 1;
      }
    }
  }
  // Check special examination result is exist
  const isExist = (input) => {
    return specialExamResultOptions?.some(item => item.label === input);
  }

  const handleSaveThenClose = () => {
    if (!isSubmitSuccess())
      return;

    handleUpdatePhysicalExam({ INPUT_STATUS: 1 });
    handleClose(onCancel);
  }

  const handleSaveThenCreateNew = () => {
    if (!isSubmitSuccess())
      return;

    handleUpdatePhysicalExam({ INPUT_STATUS: 1 });
    handleClose(onCreate);
  }

  const handleSaveThenOpenPDF = () => {
    if (!isSubmitSuccess())
      return;

    handleUpdatePhysicalExam({ INPUT_STATUS: 1 });

    setIsOpenFilePDF(true);
    setDownloadPdf(true);
    setPhysicalExam(undefined);
    onReload(true);
    setFileList([]);
  }

  const handleClose = (callback) => {
    setEmployeeId(undefined);
    setPhysicalExamId(undefined);
    setPhysicalExam(undefined);
    callback();
    onReload(true)
    setFileList([])
  }

  return (
    <>
      <Form
        name="wrap"
        colon={false}
        style={{ marginTop: 20 }}
        ref={FrmConclusionRef}
        form={form}
        labelAlign="left"
        labelCol={{ span: 6 }}
        validateMessages={validateMessages}
      >
        {
          specialExamType === 0 &&
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="RESULT_SELECT_ID"
                label={specialDiseaseType === 3 ? "Kết Quả Chức Năng Hô Hấp" : "Kết luận"}
                rules={[
                  { required: input_1 ? false : true },
                ]}
                labelCol={specialDiseaseType === 3 ? { span: 10 } : { span: 6 }}
                className={input_1 ? 'mess-hidden' : ''}
              >
                <Select
                  placeholder="Chọn kết luận tại đây"
                  allowClear
                  options={
                    specialDiseaseType === 3 ?
                      specialExamResultOptions.filter(item => item.type === 'Silic_1')
                      : specialExamResultOptions
                  }
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={input_1 ? true : false}
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="RESULT_INPUT_NAME"
                wrapperCol={specialDiseaseType === 3 ? { md: { offset: 10 } } : { md: { offset: 6 } }}
              >
                <Input
                  placeholder="Nhập kết luận tại đây"
                  disabled={select_1 ? true : false}
                />
              </Form.Item>
            </Col>
            {
              specialDiseaseType === 3 &&
              <>
                <Col span={20}>
                  <Form.Item
                    name="RESULT_SELECT_ID_2"
                    label="Kết Quả X-Quang Bụi Phổi Sillic Nghề Nghiệp"
                    rules={[
                      { required: input_2 ? false : true },
                    ]}
                    labelCol={{ span: 10 }}
                    className={input_2 ? 'mess-hidden' : ''}
                  >
                    <Select
                      placeholder="Chọn kết luận tại đây"
                      allowClear
                      options={specialExamResultOptions.filter(item => item.type === 'Silic_2')}
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={input_2 ? true : false}
                    />
                  </Form.Item>
                </Col>
                <Col span={20}>
                  <Form.Item
                    name="RESULT_INPUT_NAME_2"
                    wrapperCol={{ md: { offset: 10 } }}
                  >
                    <Input
                      placeholder="Nhập kết luận tại đây"
                      disabled={select_2 ? true : false}
                    />
                  </Form.Item>
                </Col>
              </>
            }
            <Col span={20}>
              <Form.Item
                name="NOTE"
                label="Ghi chú"
              >
                <Input placeholder="Nhập ghi chú tại đây" />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="files"
                label="Hồ sơ khám sức khoẻ"
              >
                <Upload
                  beforeUpload={beforeUpload}
                  maxCount={5}
                  fileList={fileList}
                  onChange={onChange}
                  listType="picture"
                  accept=".png, .jpg, .jpeg, .pdf, .heif, .heic"
                >
                  {fileList?.length < 5 && (
                    <UploadOutlined style={{ fontSize: 20 }} />
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        }
        {
          specialExamType === 1 &&
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="DISEASE_JOB_NAME"
                label="Nghề khi bị bệnh nghề nghiệp"
                rules={[{ required: true, }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="YEAR_DETECTED"
                label="Năm phát hiện bệnh"
                rules={[{ required: true, }]}
              >
                <Select
                  allowClear
                  showSearch
                  options={makeYearSelectOptions(30)}
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="LABOR_LOSS_RATE"
                label="Tỷ lệ mất khả năng lao động"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear
                  showSearch
                  options={makeLaborLossRateOptions(100)}
                  suffixIcon={<strong style={{ color: '#000' }}>%</strong>}
                />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="CURRENT_JOB"
                label="Công việc hiện nay"
                rules={[{ required: true, }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="DIANOSE"
                label="Chẩn đoán"
                rules={[{ required: true, }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="SYMPTOMS"
                label="Biến chứng"
                rules={[{ required: true, }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="SOLUTION"
                label="Hướng giải quyết"
                rules={[{ required: true, }]}
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="NOTE"
                label="Ghi chú"
              >
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                name="files"
                label="Hồ sơ khám sức khoẻ"
              >
                <Upload
                  beforeUpload={beforeUpload}
                  maxCount={5}
                  fileList={fileList}
                  onChange={onChange}
                  listType="picture"
                  accept=".png, .jpg, .jpeg, .pdf, .heif, .heic"
                >
                  {fileList?.length < 5 && (
                    <UploadOutlined style={{ fontSize: 20 }} />
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        }
      </Form>
      <Row justify={{ xs: "center", lg: "center" }} gutter={[48, 24]}>
        <Col>
          <Button
            type="primary"
            onClick={() => handleClose(onCancel)}
            style={{ minWidth: 120 }}
          >
            Đóng
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleSaveThenCreateNew}
            style={{ minWidth: 120 }}
            htmlType="submit"
          >
            Lưu &amp; tạo mới
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleSaveThenClose}
            style={{ minWidth: 120 }}
            htmlType="submit"
          >
            Lưu &amp; đóng
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleSaveThenOpenPDF}
            style={{ minWidth: 120 }}
            htmlType="submit"
          >
            Lưu &amp; xuất PDF
          </Button>
        </Col>
      </Row>
      <div style={{ padding: 12 }}></div>
      <Row>
        <Col offset={1}>
          <Button onClick={() => onKeyChange("3")}>Quay lại</Button>
        </Col>
      </Row>
      <OccupationalMedicalExamPDF
        isOpen={isOpenFilePDF}
        onCancel={() => {
          setIsOpenFilePDF(false);
          onCancel();
        }}
        setDownloadPdf={setDownloadPdf}
        downloadPdf={downloadPdf}
      />
    </>
  );
};

export default FrmConclusion;
