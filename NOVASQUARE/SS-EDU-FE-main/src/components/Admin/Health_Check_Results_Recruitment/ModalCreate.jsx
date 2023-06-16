import React, { useRef, useState } from "react";
import { Tabs, Col, Row, Modal } from "antd";
import FrmPersonalInformation from "./EnterNewResult/FrmPersonalInformation";
import FrmPhysicalExamination from "./EnterNewResult/FrmPhysicalExamination";
import FrmClinicalExamination from "./EnterNewResult/FrmClinicalExamination";
import FrmSubclinicalExamination from "./EnterNewResult/FrmSubclinicalExamination";
import FrmConclusion from "./EnterNewResult/FrmConclusion";
import ImportFileResult from "./ImportFileResult/ImportFileResult";

import FileImportHistory from "./ImportFileResult/FileImportHistory";
import { useRecoilState, useSetRecoilState } from "recoil";
import { employeeSelectState } from "../../../recoil/atom/employeeState";
import {
  physicalExamRecruitIdState,
  physicalExamSelectState,
} from "../../../recoil/atom/physicalExamState";
import { physicalExamNewRecruitState } from "../../../recoil/atom/physicalExamNew";
import { newestPhysicalDetailRecruitState } from "../../../recoil/atom/physicalDetailState";
import { newestClinicalDetailRecruitState } from "../../../recoil/atom/clinicalDetailState";
import { newestPreClinicalDetailRecruitState } from "../../../recoil/atom/preClinicalDetailState";
import { newestPhysicalExamResultRecruitState } from "../../../recoil/atom/physicalExamResult";
import { isLoadingState, isShowState } from "../../../recoil/atom/booleanState";
import { physicalExamOptionStateRecruit } from "../../../recoil/atom/physicalExamState";
const ModalCreate = ({
  isOpen,
  onCloseModal,
  setIsDisable,
  isDoctor,
  isManager,
}) => {
  const setEmployeeSelet = useSetRecoilState(employeeSelectState);
  const setPhysicalExamSelect = useSetRecoilState(physicalExamSelectState);

  const setPhysicalExamGetNew = useSetRecoilState(physicalExamNewRecruitState);
  const setPhysicalDetailNew = useSetRecoilState(
    newestPhysicalDetailRecruitState
  );
  const setClinicalDetailNew = useSetRecoilState(
    newestClinicalDetailRecruitState
  );
  const setPreClinicalDetailNew = useSetRecoilState(
    newestPreClinicalDetailRecruitState
  );
  const setPhysicalExamResultNew = useSetRecoilState(
    newestPhysicalExamResultRecruitState
  );
  const setPhysicalExamRecruitId = useSetRecoilState(
    physicalExamRecruitIdState
  );
  const setPhysicalExamOption = useSetRecoilState(
    physicalExamOptionStateRecruit
  );
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  const FrmPersionalInfoRef = useRef();
  const FrmPhysicalExamRef = useRef();
  const FrmHealthHisRef = useRef();
  const FrmClinicalExaminationRef = useRef();
  const FrmSubclinicalExamRef = useRef();
  const FrmConclusionRef = useRef();

  const [activeKey, setActiveKey] = useState("1");
  const setIsShow = useSetRecoilState(isShowState);

  const [isPersional, setIsPersional] = useState(false);
  const [isPhysicalDetail, setIsPhysicalDetail] = useState(false);
  const [isClinicalExam, setIsClinicalExam] = useState(false);
  const [isPreClinicalExam, setIsPreClinicalExam] = useState(false);
  const [isPhysicalExamResult, setIsPhysicalExamResult] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onKeyChange = (key) => setActiveKey(key);

  const handleCancel = () => {
    onCloseModal();
    FrmPersionalInfoRef.current?.resetFields();
    FrmPhysicalExamRef.current?.resetFields();
    FrmHealthHisRef.current?.resetFields();
    FrmClinicalExaminationRef.current?.resetFields();
    FrmSubclinicalExamRef.current?.resetFields();
    FrmConclusionRef.current?.resetFields();
    setPhysicalExamGetNew(undefined);
    setPhysicalDetailNew(undefined);
    setClinicalDetailNew(undefined);
    setPreClinicalDetailNew(undefined);
    setPhysicalExamResultNew(undefined);
    setPhysicalExamRecruitId(undefined);
    setActiveKey("1");
    setIsDisable(false);
    setPhysicalExamSelect(undefined);
    setEmployeeSelet(undefined);
    setIsShow(undefined);
    setPhysicalExamOption([]);
    setFileList([]);
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        visible={isOpen}
        title="1.2.1 Nhập thông tin khám sức khỏe tuyển dụng"
        open={isOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={1300}
        style={{
          top: 20,
        }}
        footer={false}
      >
        <Row>
          <Col span={24}>
            <Tabs centered type="card" className="parent-tabs">
              <Tabs.TabPane tab="Nhập kết quả KSK tuyển dụng" key="1">
                <Tabs
                  centered
                  activeKey={activeKey}
                  onChange={onKeyChange}
                  className="tabs_children"
                  disabled={isPersional ? false : true}
                >
                  <Tabs.TabPane
                    tab="Thông tin cá nhân"
                    key="1"
                    disabled={isPhysicalDetail ? false : true}
                  >
                    <FrmPersonalInformation
                      onKeyChange={onKeyChange}
                      FrmPersionalInfoRef={FrmPersionalInfoRef}
                      isDoctor={isDoctor}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám thể lực"
                    key="2"
                    disabled={isPhysicalDetail ? false : true}
                  >
                    <FrmPhysicalExamination
                      onKeyChange={onKeyChange}
                      FrmPhysicalExamRef={FrmPhysicalExamRef}
                      isDoctor={isDoctor}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám lâm sàng"
                    key="3"
                    disabled={isClinicalExam ? false : true}
                  >
                    <FrmClinicalExamination
                      onKeyChange={onKeyChange}
                      FrmClinicalExaminationRef={FrmClinicalExaminationRef}
                      isDoctor={isDoctor}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám cận lâm sàng"
                    key="4"
                    disabled={isPreClinicalExam ? false : true}
                  >
                    <FrmSubclinicalExamination
                      onKeyChange={onKeyChange}
                      SubclinicalExamRef={FrmSubclinicalExamRef}
                      isDoctor={isDoctor}
                      fileList={fileList}
                      setFileList={setFileList}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Kết luận"
                    key="5"
                    disabled={isPhysicalExamResult ? false : true}
                  >
                    <FrmConclusion
                      onKeyChange={onKeyChange}
                      FrmConclusionRef={FrmConclusionRef}
                      onCancel={handleCancel}
                      isDoctor={isDoctor}
                      isManager={isManager}
                    />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Nhập file kết quả KSK tuyển dụng" key="2">
                <Tabs defaultActiveKey="1" centered className=" tabs_children">
                  <Tabs.TabPane tab="Nhập file kết quả KSKtuyển dụng" key="7">
                    <ImportFileResult fileType={3} />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Xem lịch sử nhập file kết quả KSK tuyển dụng"
                    key="6"
                  >
                    <FileImportHistory />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ModalCreate;
