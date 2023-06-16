import {
  Button,
  Form,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Space,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getBase64, removeAccents } from "../../../common";
import {
  cityIdSelectState,
  cityOptionsState,
  cityState,
} from "../../../recoil/atom/cityState";

import { useDistrict } from "../../../hooks/district";
import { useCity } from "../../../hooks/city";
import {
  districtOptionsState,
  districtState,
} from "../../../recoil/atom/districtState";
import {
  levelMedicalData,
  medicalModelData,
  medicalTypeData,
  technicalData,
  treatmentData,
} from "../../../common/dataJson";
import useConfirmDelete from "../../../hooks/useConfirmDelete";
import TextArea from "antd/lib/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import NumericInput from "../../NumericInput/NumericInput";
import Modal from "antd/lib/modal/Modal";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import medicalFacilityFileApi from "../../../api/medicalFacilityFileApi";
import { useMedicalFacilityFile } from "../../../hooks/medicalFacilityFile";
import { useMedicalFacility } from "../../../hooks/medicalFacility";
import medicalFacilityApi from "../../../api/medicalFacilityApi";
import { useSnackbar } from "notistack";
import { medicalFacilityNewState } from "../../../recoil/atom/medicalFacilityState";
import { cityData, districtData } from "../../../common/getAllApi";
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const validateMessages = {
  required: "Trường này không được để trống!",
};

const FrmReputableMedical = ({
  FrmReputableRef,
  oncancel,
  medicalFacility,
  onDelete,
  citySelect,
  setCitySelect,
  setCountrySelect,
  medicalModalSelect,
  setMedicalModalSelect,
  oldFileImg,
  setOldFileImg,
  setListImgChange,
}) => {
  useCity();
  useDistrict();
  const [form] = Form.useForm();
  const { deleteMedicalFacilityFile } = useMedicalFacilityFile();
  const { enqueueSnackbar } = useSnackbar();
  const { getAllMedicalFacilities } = useMedicalFacility();
  const cityOptions = useRecoilValue(cityOptionsState);
  const districtOptions = useRecoilValue(districtOptionsState);
  const setCityList = useSetRecoilState(cityState);
  const setDistrictList = useSetRecoilState(districtState);
  const setCityIdSelect = useSetRecoilState(cityIdSelectState);
  const medicalFacilityNew = useRecoilValue(medicalFacilityNewState);

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [isPDF, setIsPDF] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      enqueueSnackbar("File tải lên phải nhỏ hơn 5MB!", { variant: "error" });
    }

    return isLt2M;
  };

  //HANDLE SELECT CITY
  const handleSelectCity = (value) => {
    setCityIdSelect(value);
    setCitySelect(value);
    form.setFieldsValue({ DISTRICT_ID: null });
  };

  //HANDLE CLEAR CITY
  const handleClearSelectCity = () => {
    setCityIdSelect(undefined);
    form.setFieldsValue({ DISTRICT_ID: null });
    setCitySelect(undefined);
  };

  //HANDLE SELECT MEDICAL MODAL
  const handleSelectMedicalModal = (value) => {
    setMedicalModalSelect(value);
  };
  //HANDLE CLEAR SELECT MEDICAL MODAL
  const handleClearSelectMedicalModal = () => {
    setMedicalModalSelect(undefined);
    form.setFieldsValue({ SPECIAL_DEP_NAME: null });
  };

  // SET DATA FOR FORM
  useEffect(() => {
    if (medicalFacility) {
      setCountrySelect(medicalFacility?.COUNTRY_ID);
      setCityIdSelect(medicalFacility?.CITY_ID);
      setCitySelect(medicalFacility?.CITY_ID);
      setMedicalModalSelect(medicalFacility?.MEDICAL_MODEL);
      form.setFieldsValue(medicalFacility);
    } else {
      form.resetFields();
    }
  }, [medicalFacility, form]);

  // HANDLE SUBMIT FORM
  const handleOk = () => {
    const dataGetField = { ...form.getFieldsValue() };
    const { files, ...newData } = dataGetField;
    const {
      NAME,
      CITY_ID,
      DISTRICT_ID,
      ADDRESS,
      PHONE,
      TECHNICAL_AREA,
      TREATMENT_TYPE,
      DIRECT_INSURANCE,
      WORKING_TIME,
      SPECIAL_DEP_NAME,
    } = newData;
    if (
      NAME.trim() === "" ||
      ADDRESS.trim() === "" ||
      PHONE.trim() === "" ||
      WORKING_TIME.trim() === "" ||
      CITY_ID === null ||
      CITY_ID === undefined ||
      DISTRICT_ID === null ||
      DISTRICT_ID === undefined ||
      TECHNICAL_AREA === null ||
      TECHNICAL_AREA === undefined ||
      TREATMENT_TYPE === null ||
      TREATMENT_TYPE === undefined ||
      DIRECT_INSURANCE === null ||
      DIRECT_INSURANCE === undefined ||
      // (medicalModalSelect === 1 && SPECIAL_DEP_NAME === null) ||
      (medicalModalSelect === 1 && !SPECIAL_DEP_NAME)
    ) {
      return;
    }
    if (medicalFacility) {
      const result = {
        ...newData,
        SPECIAL_DEP_NAME: null,
      };

      if (medicalModalSelect === 2) {
        handleUpdate(result, medicalFacility?.id, true);
      } else if (medicalModalSelect === 1) {
        handleUpdate(newData, medicalFacility?.id, true);
      } else {
        const result = {
          ...newData,
          MEDICAL_MODEL: null,
        };
        handleUpdate(result, medicalFacility?.id, true);
      }
    } else if (medicalFacilityNew) {
      handleUpdate(newData, medicalFacilityNew?.id, true);
    } else {
      handeCreate(newData);
    }
  };

  // CREATE MEDICAL FACILITY
  const handeCreate = async (data) => {
    try {
      let res = await medicalFacilityApi.createMedicalFacility(data);
      if (res.data) {
        await handleCanel();
        setMedicalModalSelect(undefined);
        enqueueSnackbar(res.data.message, { variant: "success" });
      }
    } catch (error) {
      if (
        error?.response?.data?.message ===
        "Medical facility social CD already exists"
      ) {
        enqueueSnackbar("Mã bảo hiểm y tế đã tồn tại. Vui lòng kiểm tra lại", {
          variant: "error",
        });
      }
    }
    getAllMedicalFacilities();
  };

  // UPDATE MEDICAL FACILITY
  const handleUpdate = async (data, id, isCreate) => {
    try {
      let res = await medicalFacilityApi.updateMedicalFacility(data, id);
      if (res.data) {
        await handleCanel(data, isCreate);
        if (medicalFacilityNew) {
          enqueueSnackbar("Medical facility created successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar(res.data.message, {
            variant: "success",
          });
        }
        getAllMedicalFacilities();
      }
    } catch (error) {
      if (
        error?.response?.data?.message ===
        "Medical facility social CD already exists"
      ) {
        enqueueSnackbar("Mã bảo hiểm y tế đã tồn tại. Vui lòng kiểm tra lại", {
          variant: "error",
        });
      }
    }
  };

  // DELETE MEDICAL FACILITY
  const handleDelete = async (id) => {
    await onDelete(id);
    await handleCanel();
  };

  // CORNFIRM DELETE
  const { confirm } = useConfirmDelete(
    handleDelete,
    "Bạn có chắc muốn xóa mục này?"
  );

  // CANCEL AND CLOSE MODAL
  const handleCanel = async (data, isCreate) => {
    form.resetFields();
    await oncancel(data, isCreate);
    setFileList(undefined);
  };

  // FILTER IMG NEW CREATE
  useEffect(() => {
    if (fileList) {
      const r = fileList.filter(
        (elem) => !oldFileImg.find((item) => elem?.id === item?.id)
      );
      setListImgChange(r);
    }
  }, [fileList]);

  /* HANDLE UPLOAD FILES */
  useEffect(() => {
    if (medicalFacility?.Medical_Facility_Files?.length > 0) {
      let temporary = medicalFacility?.Medical_Facility_Files?.map(
        (element) => ({
          id: element.id,
          name: element.NAME,
          status: "done",
          url: process.env.REACT_APP_BASE_URL + `/files/${element.NAME}`,
        })
      );
      setFileList(temporary);
      setOldFileImg(temporary);
    } else {
      setFileList([]);
    }
  }, [medicalFacility]);

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
        "MEDICAL_FACILITY_ID",
        medicalFacility
          ? Number(medicalFacility?.id)
          : Number(medicalFacilityNew?.id)
      );
      const newMedicalFacilityFile =
        await medicalFacilityFileApi.createMedicalFacilityFile(formData);
      if (newMedicalFacilityFile.data) {
        newImage[newFileList.length - 1] = {
          ...newMedicalFacilityFile?.data?.elements,
          name: newMedicalFacilityFile?.data?.elements?.NAME,
          status: "done",
          url:
            process.env.REACT_APP_BASE_URL +
            `/files/${newMedicalFacilityFile?.data?.elements?.NAME}`,
        };
      }
    }
    if (file.status === "removed") {
      if (file?.id) {
        await deleteMedicalFacilityFile(file?.id);
      }
    }
    setFileList(newImage);
  };

  // HANDLE SET IMG PREVIEW
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  // END

  return (
    <Form
      {...layout}
      form={form}
      name="reputable"
      style={{ margin: "30px 0px" }}
      labelAlign="left"
      validateMessages={validateMessages}
      ref={FrmReputableRef}
    >
      <Row>
        <Col span={20} offset={2}>
          <Form.Item
            label={<>&nbsp;Mã BHYT</>}
            name="SOCIAL_CD"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 6 }}
          >
            <NumericInput />
          </Form.Item>
          <Form.Item
            label={<>&nbsp;Tên bệnh/ chuyên khoa/ cơ sở khám, chữa bệnh</>}
            name="NAME"
            rules={[
              {
                required: true,
              },
              {
                whitespace: true,
                message: "Vui lòng không nhập ký tự trắng.",
              },
            ]}
            labelCol={{ span: 9 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<>&nbsp;Điện thoại</>}
            name="PHONE"
            rules={[
              {
                required: true,
              },
            ]}
            labelCol={{ span: 9 }}
          >
            <NumericInput />
          </Form.Item>
          <Form.Item
            name="WEBSITE"
            label={<>&nbsp;Website</>}
            labelCol={{ span: 9 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
          <Form.Item label={<>&nbsp;Địa chỉ</>} labelCol={{ span: 5 }}>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="CITY_ID"
                  label="Tỉnh/Thành"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  labelCol={{ span: 10 }}
                >
                  <Select
                    allowClear
                    options={cityOptions}
                    showSearch
                    filterOption={(input, option) =>
                      removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.trim().toLowerCase()))
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "").localeCompare(
                        (optionB?.label ?? "").toLowerCase()
                      )
                    }
                    onSelect={handleSelectCity}
                    onClear={handleClearSelectCity}
                    onFocus={() => cityData(cityOptions, setCityList)}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={11} offset={1}>
                <Form.Item
                  name="DISTRICT_ID"
                  label="Quận/Huyện"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  labelCol={{
                    span: 9,
                  }}
                >
                  <Select
                    allowClear
                    options={districtOptions}
                    showSearch
                    filterOption={(input, option) =>
                      removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.trim().toLowerCase()))
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "").localeCompare(
                        (optionB?.label ?? "").toLowerCase()
                      )
                    }
                    disabled={citySelect ? false : true}
                    onFocus={() =>
                      districtData(districtOptions, setDistrictList)
                    }
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="ADDRESS"
              label="Chi tiết"
              rules={[
                {
                  required: true,
                },
                {
                  whitespace: true,
                  message: "Vui lòng không nhập ký tự trắng.",
                },
              ]}
              labelCol={{ span: 5 }}
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={<>&nbsp;Thời gian làm việc</>}
            name="WORKING_TIME"
            rules={[
              {
                required: true,
              },
              {
                whitespace: true,
                message: "Vui lòng không nhập ký tự trắng.",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="TECHNICAL_AREA"
            label={<>&nbsp;Tuyến kỹ thuật</>}
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={2}
          >
            <Select
              allowClear
              options={technicalData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.trim().toLowerCase()))
              }
            ></Select>
          </Form.Item>
          <Form.Item
            name="LEVEL"
            label={<>&nbsp;Hạng bệnh viện</>}
            initialValue={1}
          >
            <Select
              allowClear
              options={levelMedicalData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.trim().toLowerCase()))
              }
            ></Select>
          </Form.Item>
          <Form.Item
            name="MEDICAL_TYPE"
            label={<>&nbsp;Hình thức tổ chức</>}
            initialValue={2}
          >
            <Select
              allowClear
              options={medicalTypeData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.trim().toLowerCase()))
              }
            ></Select>
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                name="MEDICAL_MODEL"
                label={<>&nbsp;Mô hình tổ chức</>}
                labelCol={{ span: 10 }}
                initialValue={2}
              >
                <Select
                  allowClear
                  options={medicalModelData}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(removeAccents(input.trim().toLowerCase()))
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").localeCompare(
                      (optionB?.label ?? "").toLowerCase()
                    )
                  }
                  onSelect={handleSelectMedicalModal}
                  onClear={handleClearSelectMedicalModal}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={10} offset={2}>
              {medicalModalSelect === 1 && (
                <Form.Item
                  name="SPECIAL_DEP_NAME"
                  label="Tên chuyên khoa"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  labelCol={{ span: 10 }}
                >
                  <Input />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Form.Item
            name="TREATMENT_TYPE"
            label={<>&nbsp;Hình thức điều trị</>}
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={2}
          >
            <Select
              allowClear
              options={treatmentData}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(removeAccents(input.trim().toLowerCase()))
              }
            ></Select>
          </Form.Item>
          <Form.Item
            name="DIRECT_INSURANCE"
            label={<>&nbsp;Thanh toán BHYT</>}
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={true}
          >
            <Radio.Group>
              <Radio value={true} style={{ marginRight: 40 }}>
                {" "}
                Có{" "}
              </Radio>
              <Radio value={false}> Không </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="NOTE" label={<>&nbsp;Ghi chú</>}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Hình ảnh" name="files">
            <Upload
              beforeUpload={beforeUpload}
              maxCount={5}
              fileList={fileList}
              onChange={onChange}
              onPreview={handlePreview}
              listType="picture-card"
              multiple={true}
              accept=".png, .jpg, .jpeg, .heif, .heic"
            >
              <UploadOutlined
                style={{
                  fontSize: 30,
                }}
              />
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

          <Form.Item label={<>&nbsp;Bảng giá</>}>
            <Space>
              <Form.Item name="PRICE_DESC">
                <Input placeholder="Bảng giá" />
              </Form.Item>
              <Form.Item name="PRICE_URL">
                <Input placeholder="URL" />
              </Form.Item>
            </Space>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={2}>
          <Button onClick={() => handleCanel()}>Quay lại</Button>
        </Col>
        <Col span={9} offset={4}>
          <Button
            htmlType="submit"
            onClick={handleOk}
            form="reputable"
            key="reputable"
            type="primary"
          >
            Lưu
          </Button>
        </Col>
        {medicalFacility ? (
          <Col>
            <Button
              className="btn-danger"
              type="primary"
              onClick={() => confirm(medicalFacility?.id)}
            >
              Xóa
            </Button>
          </Col>
        ) : (
          ""
        )}
      </Row>
    </Form>
  );
};
export default FrmReputableMedical;
