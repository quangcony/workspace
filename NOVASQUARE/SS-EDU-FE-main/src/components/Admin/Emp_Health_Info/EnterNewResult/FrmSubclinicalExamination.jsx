import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Input, Typography, Space } from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const styleDisplay = {
  marginBottom: {
    marginBottom: 0,
  },
  marginTop: {
    marginTop: 20,
  },
};
/*
  PRECLINICAL_DETAIL_ID
MEDICAL_DISEASE_UNIT_ID
UNIT_MEASURE_VALUE
UNIT_SYMBOL_DEFAULT
*/
const FrmSubclinicalExamination = ({
  onKeyChange,
  setSubClinicalValue,
  SubclinicalExamRef,
  onCreatePreClinicExam,
  preClinicalDefaults,
  physicalExamId,
  userId,
  onCreatePhysicalExamResult,
}) => {
  const [form] = Form.useForm();
  const [listData, setListData] = useState([]);
  useEffect(() => {
    const newPreClinical = [];
    preClinicalDefaults.forEach((item) => {
      newPreClinical.push({
        ...item,
        PHYSICAL_STATUS: "PHYSICAL_STATUS",
      });
    });
    setListData(newPreClinical);
  }, [preClinicalDefaults]);

  const handleOk = () => {
    const newData = { ...form.getFieldsValue() };
    console.log(newData);
    const { UNIT_CHILDREN, HO_SO, ...listNewData } = newData;
    // console.log(listNewData);
    console.log("children: ", UNIT_CHILDREN);
    // const newChildren = UNIT_CHILDREN.shift();
    // console.log(newChildren);
    const newChildLists = [];
    for (const value of UNIT_CHILDREN) {
      if (value === undefined) {
        continue;
      }
      newChildLists.push(value);
    }

    const listUnitChildren = [];
    newChildLists.forEach((item) => {
      console.log(item);
      const newArr1 = Object.keys(item).map((key) => [key, item[key]]);
      console.log("arr1:", newArr1);
      listUnitChildren.push({
        PRECLINICAL_DETAIL_ID: "1",
        MEDICAL_DISEASE_UNIT_ID: newArr1[0][1],
        UNIT_MEASURE_VALUE: newArr1[1][1],
        UNIT_SYMBOL_DEFAULT: "",
      });
    });
    console.log("listUnitChildren", listUnitChildren);

    const result = Object.keys(listNewData).map((key) => [
      key,
      listNewData[key],
    ]);
    const arr = [];
    result.forEach((item) => {
      const newArr1 = Object.keys(item[1]).map((key) => [key, item[1][key]]);
      arr.push({
        MEDICAL_DISEASE_NAME: item[0],
        PHYSICAL_EXAM_ID: physicalExamId?.id,
        MEDICAL_DISEASE_ID: newArr1[0][0],
        MEDICAL_DISEASE_RESULT: newArr1[0][1],
        PHYSICAL_STATUS: newArr1[1][1],
      });
    });
    console.log("arr:", arr);
    // setSubClinicalValue(newData);
    // onKeyChange("6");
    // onCreatePhysicalExamResult("");
    // arr.forEach((item) => {
    //   handleCreatePreClinicDetail(item);
    // });
  };

  const handleCreatePreClinicDetail = async (value) => {
    console.log("preClinicl:", value);
    await onCreatePreClinicExam(value);
  };

  // console.log("listDatas:", listData);
  return (
    <>
      <Row style={styleDisplay.marginTop}>
        <Col span={24}>
          <Form
            name="form_Khamcanlamsan"
            colon={false}
            ref={SubclinicalExamRef}
            form={form}
          >
            {listData &&
              listData.length > 0 &&
              listData.map((item, index) => {
                const medicalUnits =
                  item?.Medical_Disease?.Medical_Disease_Units;
                const modifiedData = medicalUnits?.map((item_1, index) => ({
                  name: item_1.id,
                  key: index + 1,
                  isListField: true,
                  fieldKey: item_1.id,
                  ...item_1,
                }));

                // console.log("modifield:", modifiedData);
                return (
                  <Form.Item>
                    <Input.Group>
                      <Row>
                        <Col span={4} offset={1}>
                          <Title level={5}>
                            {index + 1}. {item.DATA_TYPE}
                          </Title>
                        </Col>
                        <Col span={8} offset={1}>
                          <Form.Item
                            name={[item.DATA_TYPE, item.PHYSICAL_STATUS]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={7} offset={2}>
                          <Form.Item
                            name={[item.DATA_TYPE, item.id]}
                            label="Kết luận"
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Form.List name="UNIT_CHILDREN">
                          {(fields) => {
                            fields = [...modifiedData];
                            return (
                              <>
                                {fields.map(
                                  ({
                                    key,
                                    NAME,
                                    name,
                                    DESC,
                                    id,
                                    ...restField
                                  }) => (
                                    <>
                                      <Row>
                                        <Col span={4} offset={2}>
                                          <Title level={5}>
                                            {key}. {NAME} <br />{" "}
                                            &emsp;&emsp;&nbsp;
                                            {DESC}
                                          </Title>
                                        </Col>
                                        <Col span={8} offset={1}>
                                          <Form.Item
                                            {...restField}
                                            name={[name, NAME]}
                                            noStyle
                                          >
                                            <Input
                                              style={{
                                                width: "60%",
                                              }}
                                            />
                                          </Form.Item>
                                          <Form.Item
                                            {...restField}
                                            name={[name, "ID"]}
                                            noStyle
                                            initialValue={id}
                                          ></Form.Item>
                                          <Input
                                            style={{
                                              width: "40%",
                                            }}
                                            defaultValue="M/ul"
                                          />
                                        </Col>
                                        <Col span={7} offset={2}>
                                          <Form.Item noStyle>
                                            <Input
                                              style={{
                                                width: "30%",
                                              }}
                                            />
                                          </Form.Item>
                                          <Form.Item noStyle>
                                            <Input
                                              style={{
                                                width: "30%",
                                              }}
                                            />
                                          </Form.Item>
                                          <Input
                                            style={{
                                              width: "20%",
                                            }}
                                            defaultValue="K/ul"
                                          />
                                        </Col>
                                      </Row>
                                    </>
                                  )
                                )}
                              </>
                            );
                          }}
                        </Form.List>
                      </Row>
                    </Input.Group>
                  </Form.Item>
                );
              })}
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={7} offset={1}>
                  <Title level={5}>16. Hồ sơ/kết quả khám sức khỏe</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={2}></Col>
                <Col span={5} offset={1}>
                  <Form.Item name="HO_SO">
                    <Input />
                  </Form.Item>
                </Col>
                <Col offset={1}>
                  <DownloadOutlined style={{ fontSize: 30 }} />
                </Col>
              </Row>
            </Form.Item>

            <Row>
              <Col span={2} offset={2}>
                <Button onClick={() => onKeyChange("4")}>Quay lại</Button>
              </Col>
              <Col span={2} push={17}>
                <Button onClick={handleOk}>Tiếp</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default FrmSubclinicalExamination;
