import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Select,
  Radio,
  Typography,
  TreeSelect,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { usePhysicalClassification } from "../../../../hooks/physicalClassification";
import { selectOptions } from "../../../../common";
import { useWorkingStatus } from "../../../../hooks/workingStatus";
import { CleaningServicesTwoTone } from "@mui/icons-material";
const { Option } = Select;
const { Title } = Typography;

const styleDisplay = {
  marginBottom: {
    marginBottom: 0,
  },
  marginTop: {
    marginTop: 20,
  },
};

const FrmConclusion = ({
  setConclusion,
  onKeyChange,
  FrmConclusionRef,
  physicalExamId,
  onUpdatePhysicalExamResult,
  openFilePDF,
  onUpdatePhysicalExam,
  onCancel,
  onCreateAgain,
  diseaseOption,
  processing,
  done,
  onCreateDiseaseCurrent,
  physicalExamResultNew,
}) => {
  const [form] = Form.useForm();
  const { physicalclassifications } = usePhysicalClassification();
  const [physicalClassOption, setPhysicalClassOption] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  console.log(done);
  useEffect(() => {
    if (physicalclassifications && physicalclassifications.length > 0) {
      setPhysicalClassOption(selectOptions(physicalclassifications));
    } else {
      setPhysicalClassOption([]);
    }
  }, [physicalclassifications]);
  console.log("test 1:", physicalExamResultNew);
  //close
  const handleClose = () => {
    const newData = {
      ...form.getFieldsValue(),
      PHYSICAL_EXAM_ID: physicalExamId?.id,
    };

    const { DISEASE_ID, ...result } = newData;
    if (result.ListDiseaseCurrent === undefined) {
      const abc = {
        ...result,
        ListDiseaseCurrent: [],
      };
      abc?.ListDiseaseCurrent?.push({
        DISEASE_ID: DISEASE_ID,
      });
      // return;
    } else {
      result?.ListDiseaseCurrent?.push({
        DISEASE_ID: DISEASE_ID,
      });
    }

    const newListCurrent = [];
    result?.ListDiseaseCurrent?.forEach((item) => {
      newListCurrent.push({
        ...item,
        PHYSICAL_EXAM_RESULT_ID: physicalExamResultNew?.id,
      });
    });
    const { ListDiseaseCurrent, ...newResult } = result;

    handleUpdateProcess(newResult);

    newListCurrent.forEach((item) => {
      handleCreacteDiseaseCurrent(item);
    });
  };
  const handleUpdateProcess = async (value) => {
    const dataUpdate = {
      ...physicalExamId,
      WORKING_STATUS_ID: processing[0]?.id,
    };
    await onUpdatePhysicalExamResult(value, physicalExamResultNew?.id);
    await onUpdatePhysicalExam(dataUpdate, physicalExamId?.id);
    await onCancel();
  };

  const handleCreacteDiseaseCurrent = async (value) => {
    await onCreateDiseaseCurrent(value);
  };

  //save and create new
  const handleSaveAndCreate = () => {
    const newData = {
      ...form.getFieldsValue(),
      PHYSICAL_EXAM_ID: physicalExamId.id,
    };
    handleCreateAndSave(newData);
  };

  const handleCreateAndSave = (value) => {
    // onCreatePhysicalExamResult(dataProcess)
    console.log(value);
    const dataUpdate = {
      ...physicalExamId,
      WORKING_STATUS_ID: done[0]?.id,
    };
    onUpdatePhysicalExam(dataUpdate, physicalExamId?.id);
    onCreateAgain();
  };

  //save and close
  const handleSaveAndClose = () => {
    const newData = {
      ...form.getFieldsValue(),
      PHYSICAL_EXAM_ID: physicalExamId?.id,
    };

    const { DISEASE_ID, ...result } = newData;
    if (result.ListDiseaseCurrent === undefined) {
      const abc = {
        ...result,
        ListDiseaseCurrent: [],
      };
      abc?.ListDiseaseCurrent?.push({
        DISEASE_ID: DISEASE_ID,
      });
      // return;
    } else {
      result?.ListDiseaseCurrent?.push({
        DISEASE_ID: DISEASE_ID,
      });
    }

    const newListCurrent = [];
    result?.ListDiseaseCurrent?.forEach((item) => {
      newListCurrent.push({
        ...item,
        PHYSICAL_EXAM_RESULT_ID: physicalExamResultNew?.id,
      });
    });
    const { ListDiseaseCurrent, ...newResult } = result;

    handleUpdateProcess(newResult);

    newListCurrent.forEach((item) => {
      handleCreacteDiseaseCurrent(item);
    });

    handleCreateAndClose(newData, physicalExamResultNew?.id);
  };
  const handleCreateAndClose = async (value) => {
    console.log(value);
    const dataUpdate = {
      ...physicalExamId,
      WORKING_STATUS_ID: done[0]?.id,
    };
    await onUpdatePhysicalExamResult(value, physicalExamResultNew?.id);
    await onUpdatePhysicalExam(dataUpdate, physicalExamId?.id);
    await onCancel();
  };

  //save and PDF
  const handleSaveAndPDF = () => {
    const newData = {
      ...form.getFieldsValue(),
      PHYSICAL_EXAM_ID: physicalExamId.id,
    };
    handleCreateAndPDF(newData);
  };
  const handleCreateAndPDF = (value) => {
    // onCreatePhysicalExamResult(value)
    onCancel();
    openFilePDF(physicalExamId);
    const dataUpdate = {
      ...physicalExamId,
      WORKING_STATUS_ID: done[0]?.id,
    };
    onUpdatePhysicalExam(dataUpdate, physicalExamId?.id);
  };

  const handleSelect = (value, option) => {
    setSelectOption(option);
    console.log(option);
  };

  return (
    <>
      <Form
        name="wrap"
        colon={false}
        style={styleDisplay.marginTop}
        ref={FrmConclusionRef}
        form={form}
      >
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>1. Phân loại sức khỏe</Title>
            </Col>
            <Col span={10}>
              <Form.Item
                name="PHYSICAL_CLASSIFY_ID"
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                ]}
              >
                <Select
                  allowClear
                  options={physicalClassOption}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").localeCompare(
                      (optionB?.label ?? "").toLowerCase()
                    )
                  }
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={4}>
              <p style={{ textAlign: "center" }}>Kết luận</p>
            </Col>
            <Col span={10}>
              <Form.Item name="RESULT">
                <Radio.Group>
                  <Radio value="GOOD"> Đủ sức khỏe để làm việc </Radio>
                  <Radio value="BAD"> Không đủ sức khỏe để làm việc </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} offset={4}>
              <p style={{ marginLeft: 20 }}>Lý do</p>
            </Col>
            <Col span={10}>
              <Form.Item name="REASON">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>2. Bệnh lý hiện tại</Title>
            </Col>
            <Col span={10}>
              <Form.Item
                name="DISEASE_ID"
                rules={[
                  { required: true, message: "Trường này không được để trống" },
                ]}
              >
                <TreeSelect
                  treeData={diseaseOption}
                  allowDrop={false}
                  showSearch
                  onSelect={handleSelect}
                  filterTreeNode={(input, item) =>
                    (item?.title ?? "")
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                />
              </Form.Item>
              <Form.List name="ListDiseaseCurrent">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "DISEASE_ID"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing first name",
                            },
                          ]}
                        >
                          <TreeSelect
                            treeData={diseaseOption}
                            allowDrop={false}
                            showSearch
                            onSelect={handleSelect}
                            filterTreeNode={(input, item) =>
                              (item?.title ?? "")
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            allowClear
                            style={{ width: 300 }}
                          />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>3. Đề nghị của bác sĩ</Title>
            </Col>
            <Col span={10}>
              <Form.Item name="SUGGESTION">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>
                4. Căn cứ vào kết quả khám sức khỏe. Anh/Chị cần đi khám kiểm
                tra
              </Title>
            </Col>
            <Col span={10}>
              <Form.Item name="REQUEST">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>
                5. Các biến chứng của căn bệnh nếu không đi khám và điều trị
              </Title>
            </Col>
            <Col span={10}>
              <Form.Item name="WARNING_REQUEST">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item style={styleDisplay.marginBottom}>
          <Row>
            <Col span={6} offset={4}>
              <Title level={5}>6. Chế độ phòng bệnh, phòng biến chứng</Title>
            </Col>
            <Col span={10}>
              <Form.Item name="PREVENTION">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={4} offset={5}>
              <Button type="primary" onClick={handleClose}>
                Đóng
              </Button>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={handleSaveAndCreate}>
                Lưu &amp; tạo mới
              </Button>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={handleSaveAndClose}>
                Lưu &amp; đóng
              </Button>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={handleSaveAndPDF}>
                Lưu &amp; xuất PDF
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={2} offset={2}>
              <Button onClick={() => onKeyChange("5")}>Quay lại</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default FrmConclusion;
