import React, { useEffect, useRef, useState } from "react";
import { Tabs, Col, Row, Modal } from "antd";
import FrmPersonalInformation from "./EnterNewResult/FrmPersonalInformation";
import ModalEmployeeSearch from "./EnterNewResult/ModalEmployeeSearch";
import FrmMedicalHistory from "./EnterNewResult/FrmMedicalHistory";
import FrmPhysicalExamination from "./EnterNewResult/FrmPhysicalExamination";
import FrmClinicalExamination from "./EnterNewResult/FrmClinicalExamination";
import FrmSubclinicalExamination from "./EnterNewResult/FrmSubclinicalExamination";
import FrmConclusion from "./EnterNewResult/FrmConclusion";
import ImportFileResult from "./ImportFileResult/ImportFileResult";
import FileImportHistory from "./ImportFileResult/FileImportHistory";
import { usePhysicalDetail } from "../../../hooks/physicalDetail";
import { useClinicDetail } from "../../../hooks/clinicDetail";
import { usePreclinicDetail } from "../../../hooks/preclinicDetail";
import { usePhysicalExamResult } from "../../../hooks/physicalExamResult";
import { useRecoilState, useSetRecoilState } from "recoil";
import { countryIdSelectState } from "../../../recoil/atom/countryState";
import { cityIdSelectState } from "../../../recoil/atom/cityState";
import { employeeSelectState } from "../../../recoil/atom/employeeState";
import { physicalExamNewState } from "../../../recoil/atom/physicalExamNew";
import { physicalExamProcessState } from "../../../recoil/atom/physicalExamProcess";
import { healthHistoryStatusState } from "../../../recoil/atom/healthHistotyState";
import {
  newestPhysicalDetailState,
  physicalDetailIdState,
} from "../../../recoil/atom/physicalDetailState";
import physicalDetailApi from "../../../api/physicalDetailApi";
import clinicalDetailApi from "../../../api/clinicDetailApi";
import { newestClinicalDetailState } from "../../../recoil/atom/clinicalDetailState";
import { newestPreclinicalDetailState } from "../../../recoil/atom/preClinicalDetailState";
import preclinicalDetailApi from "../../../api/preclinicDetailApi";
import { newestPhysicalExamResultState } from "../../../recoil/atom/physicalExamResult";
import physicalExamResultApi from "../../../api/physicalExamResultApi";
import {
  isCreateState,
  isDownloadState,
  isUpdateState,
} from "../../../recoil/atom/booleanState";
import { physicalExamSelectState } from "../../../recoil/atom/physicalExamState";

const ModalPhysicalExam = ({
  isOpen,
  onCloseModal,
  onCreatePhysicalExam,
  openFilePDF,
  onUpdatePhysicalExam,
  setPhysicalExamSelect,
  onGetPhysicalExam,
  setIsGetById,
  isGetById,
}) => {
  const [newPhysicalDetail, setNewPhysicalDetail] = useRecoilState(
    newestPhysicalDetailState
  );
  const [physicalDetail, setPhysicalDetail] = useRecoilState(
    physicalDetailIdState
  );
  const [newClinicDetail, setNewClinicDetail] = useRecoilState(
    newestClinicalDetailState
  );
  const [newPreClinicDetail, setNewPreClinicDetail] = useRecoilState(
    newestPreclinicalDetailState
  );
  const [newPhysicalResult, setNewPhysicalResult] = useRecoilState(
    newestPhysicalExamResultState
  );

  const [physicalExamSelect] = useRecoilState(physicalExamSelectState);

  const setCountryIdSelect = useSetRecoilState(countryIdSelectState);
  const setCityIdSelect = useSetRecoilState(cityIdSelectState);
  const setPhysicalExamGetNew = useSetRecoilState(physicalExamNewState);
  const setHealthHistoryStatus = useSetRecoilState(healthHistoryStatusState);

  const FrmPersionalInfoRef = useRef();
  const FrmPhysicalExamRef = useRef();
  const FrmHealthHisRef = useRef();
  const FrmClinicalExaminationRef = useRef();
  const FrmSubclinicalExamRef = useRef();
  const FrmConclusionRef = useRef();

  const [isOpenModalSearchNV, setIsOpenModalSearchNV] = useState(false);
  const [activeKey, setActiveKey] = useState("1");

  const [employeeSelect, setEmployeeSelet] =
    useRecoilState(employeeSelectState);

  const setphysicalExamProcess = useSetRecoilState(physicalExamProcessState);
  const [isPersional, setIsPersional] = useState(true);
  const [isHealthHis, setIsHealthHis] = useState(true);
  const [isPhysicalDetail, setIsPhysicalDetail] = useState(true);
  const [isClinicalExam, setIsClinicalExam] = useState(true);
  const [isPreClinicalExam, setIsPreClinicalExam] = useState(true);
  const [isPhysicalExamResult, setIsPhysicalExamResult] = useState(true);
  const [isCreate, setIsCreate] = useRecoilState(isCreateState);
  const [isUpdate, setIsUpdate] = useRecoilState(isUpdateState);
  const [isDownload, setIsDownload] = useRecoilState(isDownloadState);

  const onKeyChange = (key) => setActiveKey(key);

  const handleOpenSearchNV = () => {
    setIsOpenModalSearchNV(true);
  };

  // kham the luc
  const handleCreatePhysicalDetail = async (data, callback) => {
    try {
      let res = await physicalDetailApi.createPhysicalDetail(data);
      if (res.data) {
        setNewPhysicalDetail(res.data.elements);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleUpdatePhysicalDetail = async (data, id, callback) => {
    try {
      await physicalDetailApi.updatePhysicalDetail(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  const handleGetPhysicalDetai = async (id) => {
    try {
      let res = await physicalDetailApi.getPhysicalDetail(id);
      if (res.data) {
        setPhysicalDetail(res.data.elements.physicalDetail);
      }
    } catch (error) {}
  };

  // lam san
  const handleCreateClinicalExam = async (data, callback) => {
    try {
      let res = await clinicalDetailApi.createClinicalDetail(data);
      if (res.data) {
        await clinicalDetailApi.getAllClinicalDetails();
        setNewClinicDetail(res.data.elements);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleUpdateClinicalExam = async (data, id, callback) => {
    try {
      let res = await clinicalDetailApi.updateClinicalDetail(data, id);
      if (res.data) {
        await clinicalDetailApi.getAllClinicalDetails();
      }
    } catch (error) {
      console.log("error");
    }
  };
  // can lam san
  const handleCreatePreclinicalExam = async (data, callback) => {
    try {
      let res = await preclinicalDetailApi.createPreclinicalDetail(data);
      if (res.data) {
        setNewPreClinicDetail(res.data.elements);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleUpdatePreclinicalExam = async (data, id, callback) => {
    try {
      await preclinicalDetailApi.updatePreclinicalDetail(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  // ket luan
  const handleCreatePhysicalExamResult = async (data, callback) => {
    try {
      let res = await physicalExamResultApi.createPhysicalExamResult(data);
      if (res.data) {
        setNewPhysicalResult(res.data.elements);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleUpdatePhysicalExamResult = async (data, id, callback) => {
    try {
      await physicalExamResultApi.updatePhysicalExamResult(data, id);
    } catch (error) {
      console.log("error");
    }
  };

  console.log(physicalExamSelect);

  const handleCancel = () => {
    if (physicalExamSelect?.id) {
      onUpdatePhysicalExam({}, physicalExamSelect?.id);
    }
    onCloseModal();
    setCountryIdSelect(undefined);
    setCityIdSelect(undefined);
    setIsPersional(true);
    setIsHealthHis(true);
    setIsPhysicalDetail(true);
    setIsClinicalExam(true);
    setIsPreClinicalExam(true);
    setIsPhysicalExamResult(true);
    FrmPersionalInfoRef.current?.resetFields();
    FrmPhysicalExamRef.current?.resetFields();
    FrmHealthHisRef.current?.resetFields();
    FrmClinicalExaminationRef.current?.resetFields();
    FrmSubclinicalExamRef.current?.resetFields();
    FrmConclusionRef.current?.resetFields();
    setActiveKey("1");
    setIsGetById(!isGetById);
    setPhysicalExamSelect(isDownload === false && undefined);
    setNewPhysicalDetail(undefined);
    setNewClinicDetail(undefined);
    setNewPreClinicDetail(undefined);
    setNewPhysicalResult(undefined);
    setPhysicalExamGetNew([]);
    setphysicalExamProcess(undefined);
    setHealthHistoryStatus([]);
  };

  const handleCreateAgain = () => {
    FrmPersionalInfoRef.current?.resetFields();
    FrmPhysicalExamRef.current?.resetFields();
    FrmHealthHisRef.current?.resetFields();
    FrmClinicalExaminationRef.current?.resetFields();
    FrmSubclinicalExamRef.current?.resetFields();
    FrmConclusionRef.current?.resetFields();
    setPhysicalExamSelect(undefined);
    setActiveKey("1");
    setPhysicalExamSelect(undefined);
    setCountryIdSelect(undefined);
    setCityIdSelect(undefined);
    setNewPhysicalDetail(undefined);
    setNewClinicDetail(undefined);
    setNewPreClinicDetail(undefined);
    setNewPhysicalResult(undefined);
    setPhysicalExamGetNew([]);
    setphysicalExamProcess(undefined);
    setHealthHistoryStatus([]);
    setIsCreate(false);
    setIsUpdate(false);
  };

  const handleCloseModal = () => {
    setIsOpenModalSearchNV(false);
    setEmployeeSelet(undefined);
  };

  const handleAddNew = (data) => {
    setEmployeeSelet(data);
    setIsOpenModalSearchNV(false);
  };

  return (
    <>
      <Modal
        visible={isOpen}
        title="1.3.1 Nhập thông tin khám sức khỏe định kỳ"
        open={isOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width="90%"
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
              <Tabs.TabPane tab="Nhập kết quả KSK DK" key="1">
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
                    disabled={isPersional ? false : true}
                  >
                    <FrmPersonalInformation
                      setIsPersional={setIsPersional}
                      setIsHealthHis={setIsHealthHis}
                      isOpenSearchNV={handleOpenSearchNV}
                      onKeyChange={onKeyChange}
                      onCreatePhysicalExam={onCreatePhysicalExam}
                      FrmPersionalInfoRef={FrmPersionalInfoRef}
                      onUpdatePhysicalExam={onUpdatePhysicalExam}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Tiền sử bệnh tật"
                    key="2"
                    disabled={isHealthHis ? true : false}
                  >
                    <FrmMedicalHistory
                      setIsPersional={setIsPersional}
                      setIsHealthHis={setIsHealthHis}
                      setIsPhysicalDetail={setIsPhysicalDetail}
                      onKeyChange={onKeyChange}
                      FrmHealthHisRef={FrmHealthHisRef}
                      onCreatePhysicalDetail={handleCreatePhysicalDetail}
                      onGetPhysicalExam={onGetPhysicalExam}
                      setIsGetById={setIsGetById}
                      isGetById={isGetById}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám thể lực"
                    key="3"
                    disabled={isPhysicalDetail ? true : false}
                  >
                    <FrmPhysicalExamination
                      setIsHealthHis={setIsHealthHis}
                      setIsPhysicalDetail={setIsPhysicalDetail}
                      setIsClinicalExam={setIsClinicalExam}
                      onKeyChange={onKeyChange}
                      onUpdatePhysicalDetail={handleUpdatePhysicalDetail}
                      onCreateClinicalExam={handleCreateClinicalExam}
                      FrmPhysicalExamRef={FrmPhysicalExamRef}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám lâm sàng"
                    key="4"
                    disabled={isClinicalExam ? true : false}
                  >
                    <FrmClinicalExamination
                      setIsPhysicalDetail={setIsPhysicalDetail}
                      setIsClinicalExam={setIsClinicalExam}
                      setIsPreClinicalExam={setIsPreClinicalExam}
                      onKeyChange={onKeyChange}
                      onUpdateClinicalExam={handleUpdateClinicalExam}
                      onCreatePreClinicExam={handleCreatePreclinicalExam}
                      FrmClinicalExaminationRef={FrmClinicalExaminationRef}
                      onGetPhysicalDetai={handleGetPhysicalDetai}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám cận lâm sàng"
                    key="5"
                    disabled={isPreClinicalExam ? true : false}
                  >
                    <FrmSubclinicalExamination
                      setIsClinicalExam={setIsClinicalExam}
                      setIsPreClinicalExam={setIsPreClinicalExam}
                      setIsPhysicalExamResult={setIsPhysicalExamResult}
                      onKeyChange={onKeyChange}
                      SubclinicalExamRef={FrmSubclinicalExamRef}
                      onUpdatePreClinicExam={handleUpdatePreclinicalExam}
                      onCreatePhysicalExamResult={
                        handleCreatePhysicalExamResult
                      }
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Kết luận"
                    key="6"
                    // disabled={isPhysicalExamResult ? true : false}
                  >
                    <FrmConclusion
                      setIsPreClinicalExam={setIsPreClinicalExam}
                      setIsPhysicalExamResult={setIsPhysicalExamResult}
                      onKeyChange={onKeyChange}
                      FrmConclusionRef={FrmConclusionRef}
                      onUpdatePhysicalExamResult={
                        handleUpdatePhysicalExamResult
                      }
                      openFilePDF={openFilePDF}
                      onUpdatePhysicalExam={onUpdatePhysicalExam}
                      onCancel={handleCancel}
                      onCreateAgain={handleCreateAgain}
                    />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Nhập file kết quả KSK DK" key="2">
                <Tabs defaultActiveKey="1" centered className=" tabs_children">
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
          onAddNew={handleAddNew}
          onCancel={handleCloseModal}
          isOpen={isOpenModalSearchNV}
        />
      </Modal>
    </>
  );
};
export default ModalPhysicalExam;
