import React from "react";
import { Tabs, Col, Row } from "antd";
import FrmPersonalInformation from "./EnterNewResult/FrmPersonalInformation";
import ModalEmployeeSearch from "./EnterNewResult/ModalEmployeeSearch";
import { useState } from "react";
import FrmMedicalHistory from "./EnterNewResult/FrmMedicalHistory";
import FrmPhysicalExamination from "./EnterNewResult/FrmPhysicalExamination";
import FrmClinicalExamination from "./EnterNewResult/FrmClinicalExamination";
import FrmSubclinicalExamination from "./EnterNewResult/FrmSubclinicalExamination";
import FrmConclusion from "./EnterNewResult/FrmConclusion";
import ImportFileResult from "./ImportFileResult/ImportFileResult";
import FileImportHistory from "./ImportFileResult/FileImportHistory";

const FrmEnterInformation = () => {
  const [isOpenModalSearchNV, setIsOpenModalSearchNV] = useState(false);
  const [persionalInfo, setPertionalInfo] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [clinicalValue, setClinicalValue] = useState(null);
  const [subClinicalValue, setSubClinicalValue] = useState(null);
  const [conclusion, setConclusion] = useState(null);
  // const [keyTabs, setKeyTabs] = useState(1);
  const [activeKey, setActiveKey] = useState("1");
  const onKeyChange = (key) => setActiveKey(key);

  const handleOpenSearchNV = () => {
    setIsOpenModalSearchNV(true);
  };

  // const handleChangeKey = (key) => {
  //   setKeyTabs(key);
  // };

  return (
    <>
      <div className="page-content">
        <div className="row">
          <div className="col-md-12 grid-margin stretch-card">
            <div className="card-body">
              <Row>
                <Col span={24}>
                  <Tabs defaultActiveKey="1" centered>
                    <Tabs.TabPane tab="Nhập kết quả KSK DK" key="1">
                      <Tabs
                        defaultActiveKey="1"
                        centered
                        activeKey={activeKey}
                        onChange={onKeyChange}
                      >
                        <Tabs.TabPane tab="Thông tin cá nhân" key="1">
                          <FrmPersonalInformation
                            isOpenSearchNV={handleOpenSearchNV}
                            getNewData={setPertionalInfo}
                            onKeyChange={onKeyChange}
                          />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                          tab="Tiền sử bệnh tật"
                          key="2"
                        // disabled={persionalInfo ? false : true}
                        >
                          <FrmMedicalHistory
                            setMedicalHistory={setMedicalHistory}
                            onKeyChange={onKeyChange}
                          />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                          tab="Khám thể lực"
                          key="3"
                        // disabled={medicalHistory ? false : true}
                        >
                          <FrmPhysicalExamination onKeyChange={onKeyChange} />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                          tab="Khám lâm sàn"
                          key="4"
                        // disabled={clinicalValue ? false : true}
                        >
                          <FrmClinicalExamination
                            setClinicalValue={setClinicalValue}
                            onKeyChange={onKeyChange}
                          />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                          tab="Khám cận lâm sàn"
                          key="5"
                        // disabled={subClinicalValue ? false : true}
                        >
                          <FrmSubclinicalExamination
                            setSubClinicalValue={setSubClinicalValue}
                            onKeyChange={onKeyChange}
                          />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                          tab="Kết luận"
                          key="6"
                        // disabled={conclusion ? false : true}
                        >
                          <FrmConclusion
                            setConclusion={setConclusion}
                            onKeyChange={onKeyChange}
                          />
                        </Tabs.TabPane>
                      </Tabs>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Nhập file kết quả KSK DK" key="2">
                      <Tabs defaultActiveKey="1" centered>
                        <Tabs.TabPane tab="Nhập file kết quả KSKDK" key="7">
                          <ImportFileResult />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                          tab="Xem lịch sử nhập file kết quả KSKDK"
                          key="8"
                        >
                          <FileImportHistory />
                        </Tabs.TabPane>
                      </Tabs>
                    </Tabs.TabPane>
                  </Tabs>
                </Col>
              </Row>
              <ModalEmployeeSearch
                isOpen={isOpenModalSearchNV}
                onCancel={() => setIsOpenModalSearchNV(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrmEnterInformation;
