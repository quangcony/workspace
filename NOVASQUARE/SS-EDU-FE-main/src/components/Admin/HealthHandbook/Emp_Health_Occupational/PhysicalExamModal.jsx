import { Col, Modal, Row, Tabs } from "antd";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import { newestPhysicalDetailState } from "../../../../recoil/atom/physicalDetailState";
import { physicalExamIdCreateState } from "../../../../recoil/atom/physicalExamState";
import { tabActiveState } from "../../../../recoil/atom/tabActiveState";
import EmployeeSearchModal from "../EmployeeSearch/EmployeeSearchModal";
import ImportFileResult from "./ImportFile/ImportFile";
import FileImportHistory from "./ImportFile/ImportHistory";
import FrmConclusion from "./PhysicalExamForm/FrmConclusion";
import FrmMedicalHistory from "./PhysicalExamForm/FrmMedicalHistory";
import FrmPersonalInformation from "./PhysicalExamForm/FrmPersonalInformation";
import FrmPhysicalExamination from "./PhysicalExamForm/FrmPhysicalExamination";

const PhysicalExamModal = ({
  isOpen,
  onCancel,
  specialDiseaseType,
  setReload,
}) => {
  const FrmPersonalInfoRef = useRef();
  const FrmPhysicalExamRef = useRef();
  const FrmHealthHisRef = useRef();
  const FrmConclusionRef = useRef();

  const [isOpenModalSearchNV, setIsOpenModalSearchNV] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const setEmployeeSelect = useSetRecoilState(employeeSelectState);
  const setNewestPhysicalDetail = useSetRecoilState(newestPhysicalDetailState);
  const setTabActive = useSetRecoilState(tabActiveState);
  const setPhysicalExamId = useSetRecoilState(physicalExamIdCreateState);
  const [errorMessage, setErrorMessage] = useState("");

  const onKeyChange = (key) => setActiveKey(key);

  const handleOpenSearchNV = () => {
    setIsOpenModalSearchNV(true);
  };

  const handleCancel = () => {
    onCancel();
    FrmPersonalInfoRef.current?.resetFields();
    FrmPhysicalExamRef.current?.resetFields();
    FrmHealthHisRef.current?.resetFields();
    FrmConclusionRef.current?.resetFields();
    setActiveKey("1");
    setErrorMessage("");
    setPhysicalExamId(undefined);
    setNewestPhysicalDetail(undefined);
    setTabActive({
      personalInformation: false,
      medicalHistory: true,
      physicalExam: true,
      conclusions: true,
    });
  };

  const handleCreateAgain = () => {
    FrmPersonalInfoRef.current?.resetFields();
    FrmPhysicalExamRef.current?.resetFields();
    FrmHealthHisRef.current?.resetFields();
    FrmConclusionRef.current?.resetFields();
    setEmployeeSelect(undefined);
    setActiveKey("1");
    setTabActive({
      personalInformation: false,
      medicalHistory: true,
      physicalExam: true,
      conclusions: true,
    });
  };
  const handleCloseModal = () => {
    setIsOpenModalSearchNV(false);
  };

  const handleAddNew = (data) => {
    setEmployeeSelect(data);
    setIsOpenModalSearchNV(false);
  };

  return (
    <>
      <Modal
        title="1.5.1 Nhập thông tin khám sức khỏe bệnh nghề nghiệp"
        open={isOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={1340}
        style={{
          top: 20,
        }}
        footer={false}
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              centered
              type="card"
              className="parent-tabs"
            >
              <Tabs.TabPane
                tab="Nhập kết quả Khám sức khỏe bệnh nghề nghiệp"
                key="1"
              >
                <Tabs
                  defaultActiveKey="1"
                  centered
                  activeKey={activeKey}
                  onChange={onKeyChange}
                  className="tabs_children"
                >
                  <Tabs.TabPane tab="Thông tin cá nhân" key="1" disabled>
                    <FrmPersonalInformation
                      isOpenSearchNV={handleOpenSearchNV}
                      onKeyChange={onKeyChange}
                      setErrorMessage={setErrorMessage}
                      FrmPersonalInfoRef={FrmPersonalInfoRef}
                      specialDiseaseType={specialDiseaseType}
                      errorMessage={errorMessage}

                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Tiền sử bệnh tật" key="2" disabled>
                    <FrmMedicalHistory
                      onKeyChange={onKeyChange}
                      FrmHealthHisRef={FrmHealthHisRef}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Khám thể lực" key="3" disabled>
                    <FrmPhysicalExamination
                      onKeyChange={onKeyChange}
                      FrmPhysicalExamRef={FrmPhysicalExamRef}
                    />
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Khám chuyên khoa" key="4" disabled>
                    <FrmConclusion
                      onKeyChange={onKeyChange}
                      FrmConclusionRef={FrmConclusionRef}
                      onCancel={handleCancel}
                      onCreate={handleCreateAgain}
                      onReload={setReload}
                    />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Nhập file kết quả Khám sức khỏe bệnh nghề nghiệp"
                key="2"
              >
                <Tabs defaultActiveKey="1" centered className=" tabs_children">
                  <Tabs.TabPane
                    tab="Nhập file kết quả Khám sức khỏe bệnh nghề nghiệp"
                    key="7"
                  >
                    <ImportFileResult fileType={5} />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Xem lịch sử nhập file kết quả Khám sức khỏe bệnh nghề nghiệp"
                    key="8"
                  >
                    <FileImportHistory />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        <EmployeeSearchModal
          isOpen={isOpenModalSearchNV}
          onCancel={handleCloseModal}
          onAddNew={handleAddNew}
        />
      </Modal>
    </>
  );
};
export default PhysicalExamModal;
