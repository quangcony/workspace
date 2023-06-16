import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Select, DatePicker, Row, Col, TreeSelect } from "antd";
import React from "react";

const styleSetWidth = {
  styleWidth: {
    width: "100%",
  },
  textAlign: {
    textAlign: "center",
    marginBottom: 10,
  },
};

const FrmMedicalHistory = ({
  setMedicalHistory,
  onKeyChange,
  diseaseOption,
  onCreateHealthHis,
  diseaseStatusOption,
  userId,
  FrmHealthHisRef,
}) => {
  const [form] = Form.useForm();

  const handleGetFields = () => {
    const newData = {
      ...form.getFieldsValue(),
    };
    const { DISEASE_ID, DISEASE_STATUS_ID, START_DATE, ...result } = newData;

    if (result.medicalHistory === undefined) {
      const abc = {
        ...result,
        medicalHistory: [],
      };
      abc?.medicalHistory?.push({
        DISEASE_ID: DISEASE_ID,
        DISEASE_STATUS_ID: DISEASE_STATUS_ID,
        START_DATE: START_DATE,
      });
      // return;
    } else {
      result?.medicalHistory?.push({
        DISEASE_ID: DISEASE_ID,
        DISEASE_STATUS_ID: DISEASE_STATUS_ID,
        START_DATE: START_DATE,
      });
    }
    const listHealthHis = [];
    result?.medicalHistory?.forEach((item) => {
      listHealthHis.push({
        ...item,
        USER_ID: userId?.USER_ID,
      });
    });

    setMedicalHistory(newData ? newData : "");
    onKeyChange("3");
    listHealthHis.forEach((item) => {
      handleCreacte(item);
    });
  };
  const handleCreacte = async (value) => {
    console.log("HealthHis:", value);
    await onCreateHealthHis(value);
  };
  return (
    <Form
      name="form_tieu_su_benh"
      autoComplete="off"
      ref={FrmHealthHisRef}
      form={form}
    >
      <Row>
        <Col span={6} offset={4}>
          <h5 style={styleSetWidth.textAlign}>Tên bệnh</h5>
        </Col>
        <Col span={6}>
          <h5 style={styleSetWidth.textAlign}>Thời gian phát hiện</h5>
        </Col>
        <Col span={6}>
          <h5 style={styleSetWidth.textAlign}>Tình trạng hiện tại</h5>
        </Col>
      </Row>
      <Row>
        <Col span={6} offset={2}>
          <Form.Item name="DISEASE_ID">
            <TreeSelect
              style={styleSetWidth.styleWidth}
              treeData={diseaseOption}
              allowDrop={false}
              showSearch
              // onSelect={handleSelect}
              filterTreeNode={(input, item) =>
                (item?.title ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            />
          </Form.Item>
        </Col>
        <Col span={6} offset={1}>
          <Form.Item name="START_DATE">
            <DatePicker
              format={"DD/MM/YYYY"}
              style={styleSetWidth.styleWidth}
            />
          </Form.Item>
        </Col>
        <Col span={6} offset={1}>
          <Form.Item name="DISEASE_STATUS_ID">
            <Select
              allowClear
              options={diseaseStatusOption}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.List name="medicalHistory">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              console.log(fields);
              return (
                <>
                  <Row>
                    <Col span={6} offset={2}>
                      <Form.Item {...restField} name={[name, "DISEASE_ID"]}>
                        <TreeSelect
                          style={styleSetWidth.styleWidth}
                          treeData={diseaseOption}
                          allowDrop={false}
                          showSearch
                          // onSelect={handleSelect}
                          filterTreeNode={(input, item) =>
                            (item?.title ?? "")
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                      <Form.Item {...restField} name={[name, "START_DATE"]}>
                        <DatePicker
                          format={"DD/MM/YYYY"}
                          style={styleSetWidth.styleWidth}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                      <Form.Item
                        {...restField}
                        name={[name, "DISEASE_STATUS_ID"]}
                      >
                        <Select
                          style={styleSetWidth.styleWidth}
                          allowClear
                          options={diseaseStatusOption}
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col span={1} offset={1}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                  </Row>
                </>
              );
            })}
            <Row>
              <Col span={2} offset={12}>
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
              </Col>
            </Row>
          </>
        )}
      </Form.List>
      <Row>
        <Col offset={4}>
          <p>
            <span style={{ color: "red" }}>Lưu ý:</span> Trong trường hợp không
            có "Tiền Sử Bệnh Tật", vui lòng bấm nút [Tiếp] để sang trang tiếp
            theo{" "}
          </p>
        </Col>
      </Row>
      <Form.Item>
        <Row>
          <Col span={2} offset={2}>
            <Button onClick={() => onKeyChange("1")}>Quay lại</Button>
          </Col>
          <Col span={2} push={17}>
            <Button onClick={handleGetFields}>Tiếp</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default FrmMedicalHistory;
