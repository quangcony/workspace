import React from "react";

const listItem = () => {
  return (
    <div>
      {/*               
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>8. Đo mật độ xương</Title>
                </Col>
                <Col span={5} offset={1}>
                  <Form.Item>
                    <Input.Group compact>
                      <Form.Item name={["MAT_DO_XUONG", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="SD"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["MAT_DO_XUONG", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["MAT_DO_XUONG", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="SD"
                    />
                  </Input.Group>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={2}></Col>
                <Col span={15}>
                  <Form.Item name="MDX_KET_LUAN" label="Kết luận">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>9. Tổng phân tích tế bào máu</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={2}></Col>
                <Col span={15}>
                  <Form.Item name="PTTB_KET_LUAN" label="Kết luận">
                    <Input placeholder="Tình trạng bệnh" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    9.1. WBC <br /> &emsp;&emsp;&nbsp;Số lượng bạch cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="WBC_BACH_CAU">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="M/ul"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="K/ul"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    9.2. RBC <br /> &emsp;&emsp;&nbsp;Số lượng hồng cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="RBC_BACH_CAU">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="M/ul"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="M/ul"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    9.3. HGB <br /> &emsp;&emsp;&nbsp;Huyết sắc tố
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="HGB_HUYET_SAC_TO">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="g/dL"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="g/dL"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    9.4. HCT <br /> &emsp;&emsp;&nbsp;Dung tích hồng cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="HCT_DUNG_TICH_HONG_CAU">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>

                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="%"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="%"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    9.5. MCV <br /> &emsp;&emsp;&nbsp;Thể tích trung bình một
                    hồng cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="MCV_TTTB1HC">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="fL"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="fL"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    9.6. MCH <br /> &emsp;&emsp;&nbsp;Số lượng huyết sắc tố
                    trung bình một hồng cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="MCH_HUYE_SAC_TO">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="Pg"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="Pg"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>
                    9.7. PLT <br /> &emsp;&emsp;&nbsp;Số lượng tiểu cầu
                  </Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="PLT_TIEU_CAU">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="K/ul"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="K/ul"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>
                    10. Đường huyết đói <br /> Glucose
                  </Title>
                </Col>
                <Col span={5} offset={1}>
                  <Form.Item name="GLUCOSE">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="mmol/l"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="mmol/l"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>11. Chức năng thận</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>11.1 Urea</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="UREA">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="mmol/dl"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="mmol/dl"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>11.2 Creatine</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="CREATINE">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="umol/dl"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="umol/dl"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>12. Chức năng gan</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>12.1 SGOT/AST</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="SGOT/AST">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="UI/L"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="UI/L/dl"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>12.2 SGPT/ALT</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="SGPT/ALT">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="UI/L"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="UI/L"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={5} offset={2}>
                  <Title level={5}>13. Chỉ số Lipid máu (Độ mỡ máu)</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>13.1 Cholesterol</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="CHOLESTEROL">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="mmol/l"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="mmol/l"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>13.2 HDL</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="DHL">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="mmol/l"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="mmol/l"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>13.3 LDL</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="LDL">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="mmol/l"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="mmol/l"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>13.4 Triglyceride</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="TRIGLYCERIDE">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="mmol/l"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="mmol/l"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>14. Tổng phân tích nước tiểu</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={2}></Col>
                <Col span={15}>
                  <Form.Item name="TONG_PT_NUOC_TIEU" label="Kết luận">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={4} offset={2}>
                  <Title level={5}>15. Canxi máu</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={3}>
                  <Title level={5}>Nồng độ canxi máu</Title>
                </Col>
                <Col span={5}>
                  <Form.Item name="NONG_DO_CANXI_MAU">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input
                          style={{
                            width: "60%",
                          }}
                        />
                      </Form.Item>
                      <Input
                        style={{
                          width: "40%",
                        }}
                        defaultValue="mmol/l"
                      />
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col span={9} offset={2}>
                  <Input.Group compact>
                    <Form.Item name={["address", "3"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item name={["address", "4"]} noStyle>
                      <Input
                        style={{
                          width: "30%",
                        }}
                        placeholder="Input street"
                      />
                    </Form.Item>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      defaultValue="mmol/l"
                    />
                  </Input.Group>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item style={styleDisplay.marginBottom}>
              <Row>
                <Col span={5} offset={2}>
                  <Title level={5}>16. Hồ sơ/kết quả khám sức khỏe</Title>
                </Col>
              </Row>
              <Row>
                <Col span={4} offset={2}></Col>
                <Col span={5} offset={1}>
                  <Form.Item name="HO_SO_KET_QUA">
                    <Input.Group compact>
                      <Form.Item name={["address", "1"]} noStyle>
                        <Input />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col offset={1}>
                  <DownloadOutlined style={{ fontSize: 30 }} />
                </Col>
              </Row>
            </Form.Item> */}
    </div>
  );
};

export default listItem;
