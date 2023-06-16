import { Button, Form, Input, Select, Radio, Row, Col, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  handleBlockEnter,
  removeAccents,
  validateMessages,
} from "../../../../common";
import {
  cityIdSelectState,
  cityOptionsState,
  cityState,
} from "../../../../recoil/atom/cityState";

import { useDistrict } from "../../../../hooks/district";
import { useCity } from "../../../../hooks/city";
import {
  districtOptionsState,
  districtState,
} from "../../../../recoil/atom/districtState";
import {
  levelMedicalData,
  medicalModelData,
  medicalTypeData,
  technicalData,
  treatmentData,
} from "../../../../common/dataJson";
import useConfirmDelete from "../../../../hooks/useConfirmDelete";
import TextArea from "antd/lib/input/TextArea";
import medicalFacilityApi from "../../../../api/medicalFacilityApi";
import { useSnackbar } from "notistack";
import { medicalFacilityState } from "../../../../recoil/atom/medicalFacilityState";
import { cityData, districtData } from "../../../../common/getAllApi";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 19,
  },
};

const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^([0-9]+)*([0-9]+)$/;
    if (reg.test(Number(inputValue))) {
      onChange(inputValue);
    }
  };

  return <Input {...props} onChange={handleChange} />;
};

const regPhone = /^\(?\+?([0-9]{2,4})\)?[-. ]?([0-9]{3,4})[-. ]?([0-9]{3,4})$/;

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
}) => {
  useCity();
  useDistrict();
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const cityOptions = useRecoilValue(cityOptionsState);
  const districtOptions = useRecoilValue(districtOptionsState);
  const setCityList = useSetRecoilState(cityState);
  const setDistrictList = useSetRecoilState(districtState);
  const setCityIdSelect = useSetRecoilState(cityIdSelectState);
  const setMedicalFacilities = useSetRecoilState(medicalFacilityState);
  const [isSubmit, setIsSubmit] = useState(false);

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
    const newData = { ...form.getFieldsValue() };
    const { NAME, CITY_ID, DISTRICT_ID, TECHNICAL_AREA } = newData;

    if (
      CITY_ID === null ||
      CITY_ID === undefined ||
      DISTRICT_ID === null ||
      DISTRICT_ID === undefined ||
      TECHNICAL_AREA === null ||
      TECHNICAL_AREA === undefined ||
      NAME === null ||
      NAME === undefined ||
      NAME.trim() === "" ||
      (newData?.PHONE && !newData?.PHONE?.match(regPhone))
    ) {
      return;
    }
    setIsSubmit(true);
    if (medicalFacility) {
      const result = {
        ...newData,
        SPECIAL_DEP_NAME: null,
      };

      if (medicalModalSelect === 2) {
        handleUpdate(result, medicalFacility?.id);
      } else if (medicalModalSelect === 1) {
        handleUpdate(newData, medicalFacility?.id);
      } else {
        const result = {
          ...newData,
          MEDICAL_MODEL: null,
        };
        handleUpdate(result, medicalFacility?.id);
      }
    } else {
      handeCreate(newData);
    }
  };

  // CREATE MEDICAL FACILITY
  const handeCreate = async (data) => {
    try {
      let res = await medicalFacilityApi.createMedicalFacility(data);
      if (res.data) {
        let listMedical = await medicalFacilityApi.getAllMedicalFacilities();
        if (listMedical.data) {
          setMedicalFacilities(listMedical?.data?.elements);
        }
        await handleCanel();
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
  };

  // UPDATE MEDICAL FACILITY
  const handleUpdate = async (data, id) => {
    try {
      let res = await medicalFacilityApi.updateMedicalFacility(data, id);
      if (res.data) {
        let listMedical = await medicalFacilityApi.getAllMedicalFacilities();
        if (listMedical.data) {
          setMedicalFacilities(listMedical?.data?.elements);
        }
        await handleCanel();
        enqueueSnackbar(res.data.message, {
          variant: "success",
        });
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
  const { confirm } = useConfirmDelete(handleDelete, "Bạn có chắc chắn XÓA?");

  // CANCEL AND CLOSE MODAL
  const handleCanel = async (data) => {
    form.resetFields();
    await oncancel(data);
    setIsSubmit(false);
  };

  return (
    <>
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
              wrapperCol={{ span: 6 }}
            >
              <NumericInput onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item
              label={<>&nbsp;Tên cơ sở khám, chữa bệnh</>}
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
            >
              <Input onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item name="TREATMENT_NAME" label={<>&nbsp;Bệnh điều trị</>}>
              <Input onPressEnter={handleBlockEnter} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <Form.Item
              name="TECHNICAL_AREA"
              label={<>&nbsp;Tuyến kỹ thuật</>}
              wrapperCol={{ span: 6 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                allowClear
                options={technicalData}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.trim().toLowerCase()))
                }
              ></Select>
            </Form.Item>
            <Form.Item
              name="LEVEL"
              label={<>&nbsp;Hạng bệnh viện</>}
              wrapperCol={{ span: 6 }}
            >
              <Select
                allowClear
                options={levelMedicalData}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.trim().toLowerCase()))
                }
              ></Select>
            </Form.Item>
            <Form.Item
              name="MEDICAL_TYPE"
              label={<>&nbsp;Hình thức tổ chức</>}
              wrapperCol={{ span: 6 }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                allowClear
                options={medicalTypeData}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
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
                  labelCol={{ span: 12 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Select
                    allowClear
                    options={medicalModelData}
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
              wrapperCol={{ span: 6 }}
            >
              <Select
                allowClear
                options={treatmentData}
                showSearch
                filterOption={(input, option) =>
                  removeAccents(option?.label ?? "")
                    .toLowerCase()
                    .includes(removeAccents(input.trim().toLowerCase()))
                }
              ></Select>
            </Form.Item>
            <Form.Item
              label={<>&nbsp;Điện thoại</>}
              name="PHONE"
              rules={[
                {
                  pattern: regPhone,
                  message:
                    "Vui lòng nhập đúng định dạng. VD: 222-055-9034 or 321.789.4512 or 123 256 4587 or 0909878787",
                },
              ]}
            >
              <Input onPressEnter={handleBlockEnter} />
            </Form.Item>
            <Form.Item name="WEBSITE" label={<>&nbsp;Website</>}>
              <Input
                onPressEnter={handleBlockEnter}
                placeholder="Vd: https://www.google.com"
              />
            </Form.Item>
            <Form.Item label={<>&nbsp;Địa chỉ</>} labelCol={{ span: 6 }}>
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
              <Form.Item name="ADDRESS">
                <Input onPressEnter={handleBlockEnter} />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label={<>&nbsp;Thời gian làm việc</>}
              name="WORKING_TIME"
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              name="DIRECT_INSURANCE"
              label={<>&nbsp;Thanh toán BHYT</>}
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
            <Form.Item label={<>&nbsp;Bảng giá</>}>
              <Space>
                <Form.Item name="PRICE_DESC">
                  <Input
                    placeholder="Text hiển thị"
                    onPressEnter={handleBlockEnter}
                  />
                </Form.Item>
                <Form.Item name="PRICE_URL">
                  <Input placeholder="URL" onPressEnter={handleBlockEnter} />
                </Form.Item>
              </Space>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={2} offset={2}>
            <Button onClick={() => handleCanel()}>Quay lại</Button>
          </Col>
          <Col span={2} offset={7}>
            <Button
              htmlType="submit"
              onClick={handleOk}
              form="reputable"
              key="reputable"
              type="primary"
              style={{ width: "100%" }}
            >
              Lưu
            </Button>
          </Col>
          {medicalFacility ? (
            <Col span={2} offset={7}>
              <Button
                className="btn-danger"
                type="primary"
                onClick={() => confirm(medicalFacility?.id)}
                style={{ width: "100%" }}
              >
                Xóa
              </Button>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Form>
    </>
  );
};
export default FrmReputableMedical;
