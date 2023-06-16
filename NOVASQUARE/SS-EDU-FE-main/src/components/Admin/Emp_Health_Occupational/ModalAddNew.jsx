import { Col, Modal, Row, Tabs } from "antd";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { employeeSelectState } from "../../../recoil/atom/employeeState";
import { physicalExamIdCreateState } from "../../../recoil/atom/physicalExamState";
import { tabActiveState } from "../../../recoil/atom/tabActiveState";
import ModalSearchNV from "../Emp_Health_Info/EnterNewResult/ModalEmployeeSearch";
import FrmConclusion from "./EnterNewResult/FrmConclusion";
import FrmMedicalHistory from "./EnterNewResult/FrmMedicalHistory";
import FrmPersonalInformation from "./EnterNewResult/FrmPersonalInformation";
import FrmPhysicalExamination from "./EnterNewResult/FrmPhysicalExamination";
import FileImportHistory from "./ImportFileResult/FileImportHistory";
import ImportFileResult from "./ImportFileResult/ImportFileResult";

const ModalAddNew = ({
  isOpen,
  onCancel,
  specialDiseaseType,
  setPhysicalExam,
}) => {

  const FrmPersonalInfoRef = useRef();
  const FrmPhysicalExamRef = useRef();
  const FrmHealthHisRef = useRef();
  const FrmConclusionRef = useRef();

  const [isOpenModalSearchNV, setIsOpenModalSearchNV] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const setEmployeeSelect = useSetRecoilState(employeeSelectState);
  const [tabActive, setTabActive] = useRecoilState(tabActiveState);
  const setPhysicalExamId = useSetRecoilState(physicalExamIdCreateState);

  const onKeyChange = (key) => setActiveKey(key);

  const handleOpenSearchNV = () => {
    setIsOpenModalSearchNV(true);
  };

  const handleCancel = () => {
    onCancel();
    setPhysicalExam(undefined);
    FrmPersonalInfoRef.current?.resetFields();
    FrmPhysicalExamRef.current?.resetFields();
    FrmHealthHisRef.current?.resetFields();
    FrmConclusionRef.current?.resetFields();
    setActiveKey("1");
    setPhysicalExamId(undefined);
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
                  <Tabs.TabPane
                    tab="Thông tin cá nhân"
                    key="1"
                    disabled={tabActive.personalInformation ? true : false}
                  >
                    <FrmPersonalInformation
                      isOpenSearchNV={handleOpenSearchNV}
                      onKeyChange={onKeyChange}
                      FrmPersonalInfoRef={FrmPersonalInfoRef}
                      specialDiseaseType={specialDiseaseType}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Tiền sử bệnh tật"
                    key="2"
                    disabled={tabActive.medicalHistory ? true : false}
                  >
                    <FrmMedicalHistory
                      onKeyChange={onKeyChange}
                      FrmHealthHisRef={FrmHealthHisRef}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám thể lực"
                    key="3"
                    disabled={tabActive.physicalExam ? true : false}
                  >
                    <FrmPhysicalExamination
                      onKeyChange={onKeyChange}
                      FrmPhysicalExamRef={FrmPhysicalExamRef}
                    />
                  </Tabs.TabPane>

                  <Tabs.TabPane
                    tab="Khám chuyên khoa"
                    key="4"
                    disabled={tabActive.conclusions ? true : false}
                  >
                    <FrmConclusion
                      onKeyChange={onKeyChange}
                      FrmConclusionRef={FrmConclusionRef}
                      onCancel={handleCancel}
                      onCreate={handleCreateAgain}
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
                    <ImportFileResult />
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
        <ModalSearchNV
          isOpen={isOpenModalSearchNV}
          onCancel={handleCloseModal}
          onAddNew={handleAddNew}
        />
      </Modal>
    </>
  );
};
export default ModalAddNew;
