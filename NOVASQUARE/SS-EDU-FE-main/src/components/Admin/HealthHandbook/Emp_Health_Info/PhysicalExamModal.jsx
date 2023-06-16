import React, { useRef, useState } from "react";
import { Tabs, Col, Row, Modal } from "antd";
import FrmPersonalInformation from "./PhysicalExamForm/FrmPersonalInformation";
import FrmMedicalHistory from "./PhysicalExamForm/FrmMedicalHistory";
import FrmPhysicalExamination from "./PhysicalExamForm/FrmPhysicalExamination";
import FrmClinicalExamination from "./PhysicalExamForm/FrmClinicalExamination";
import FrmSubclinicalExamination from "./PhysicalExamForm/FrmSubclinicalExamination";
import FrmConclusion from "./PhysicalExamForm/FrmConclusion";
import ImportFileResult from "./ImportFile/ImportFile";
import FileImportHistory from "./ImportFile/ImportHistory";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { physicalExamNewState } from "../../../../recoil/atom/physicalExamNew";
import { physicalExamProcessState } from "../../../../recoil/atom/physicalExamProcess";
import { healthHistoryStatusState } from "../../../../recoil/atom/healthHistotyState";
import {
  newestPhysicalDetailState,
  physicalDetailIdState,
  valueHeightState,
  valueWeightState,
} from "../../../../recoil/atom/physicalDetailState";
import physicalDetailApi from "../../../../api/physicalDetailApi";
import clinicalDetailApi from "../../../../api/clinicDetailApi";
import { newestClinicalDetailState } from "../../../../recoil/atom/clinicalDetailState";
import { newestPreclinicalDetailState } from "../../../../recoil/atom/preClinicalDetailState";
import preclinicalDetailApi from "../../../../api/preclinicDetailApi";
import { newestPhysicalExamResultState } from "../../../../recoil/atom/physicalExamResult";
import physicalExamResultApi from "../../../../api/physicalExamResultApi";
import {
  isDownloadState,
  isSubmitState,
} from "../../../../recoil/atom/booleanState";
import { physicalExamSelectState } from "../../../../recoil/atom/physicalExamState";
import EmployeeSearchModal from "../EmployeeSearch/EmployeeSearchModal";
import { countryIdSelectState } from "../../../../recoil/atom/countryState";
import {
  cityIdSelectState,
  selectCityState,
} from "../../../../recoil/atom/cityState";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import { selectWorkPlacesState } from "../../../../recoil/atom/workPlaceState";
import { selectDepartmentState } from "../../../../recoil/atom/departmentState";
import { selectDivisionState } from "../../../../recoil/atom/divisionState";
import { selectAreaState } from "../../../../recoil/atom/areaState";
import { selectUnitState } from "../../../../recoil/atom/unitState";
import { selectEmployeeTypeState } from "../../../../recoil/atom/employeeTypeState";
import { selectPositionState } from "../../../../recoil/atom/positionState";
import { generalSettingState } from "../../../../recoil/atom/generalSettingState";
import ImportHistory from "./ImportFile/ImportHistory";

const PhysicalExamModal = ({
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
  const setNewPhysicalDetail = useSetRecoilState(newestPhysicalDetailState);
  const setPhysicalDetail = useSetRecoilState(physicalDetailIdState);
  const setNewClinicDetail = useSetRecoilState(newestClinicalDetailState);
  const setNewPreClinicDetail = useSetRecoilState(newestPreclinicalDetailState);
  const setNewPhysicalResult = useSetRecoilState(newestPhysicalExamResultState);

  const setCountryIdSelect = useSetRecoilState(countryIdSelectState);
  const setCityIdSelect = useSetRecoilState(cityIdSelectState);
  const setPhysicalExamGetNew = useSetRecoilState(physicalExamNewState);
  const setHealthHistoryStatus = useSetRecoilState(healthHistoryStatusState);
  const setValueHeight = useSetRecoilState(valueHeightState);
  const setValueWeight = useSetRecoilState(valueWeightState);
  const setEmployeeSelet = useSetRecoilState(employeeSelectState);
  const setphysicalExamProcess = useSetRecoilState(physicalExamProcessState);
  const setGeneralSetting = useSetRecoilState(generalSettingState);
  const setIsSubmit = useSetRecoilState(isSubmitState);

  const isDownload = useRecoilValue(isDownloadState);
  const physicalExamSelect = useRecoilValue(physicalExamSelectState);

  const FrmPersionalInfoRef = useRef();
  const FrmPhysicalExamRef = useRef();
  const FrmHealthHisRef = useRef();
  const FrmClinicalExaminationRef = useRef();
  const FrmSubclinicalExamRef = useRef();
  const FrmConclusionRef = useRef();
  const [isOpenModalSearchNV, setIsOpenModalSearchNV] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [parentKey, setParentKey] = useState("1");

  const [isPersional, setIsPersional] = useState(true);
  const [isHealthHis, setIsHealthHis] = useState(true);
  const [isPhysicalDetail, setIsPhysicalDetail] = useState(true);
  const [isClinicalExam, setIsClinicalExam] = useState(true);
  const [isPreClinicalExam, setIsPreClinicalExam] = useState(true);
  const [isPhysicalExamResult, setIsPhysicalExamResult] = useState(true);
  const [fileList, setFileList] = useState([]);
  const setSelectBranch = useSetRecoilState(selectWorkPlacesState);
  const setSelectCity = useSetRecoilState(selectCityState);
  const setSelectDepartment = useSetRecoilState(selectDepartmentState);
  const setSelectDivision = useSetRecoilState(selectDivisionState);
  const setSelectArea = useSetRecoilState(selectAreaState);
  const setSelectUnit = useSetRecoilState(selectUnitState);
  const setSelectEmployeeType = useSetRecoilState(selectEmployeeTypeState);
  const setSelectPosision = useSetRecoilState(selectPositionState);
  const onKeyChange = (key) => setActiveKey(key);
  const onKeyChangeParent = (key) => setParentKey(key);
  const [healthHis, setHealthHis] = useState(undefined);

  const [listHealthHisOld, setListHealthHisOld] = useState([]);
  const [error, setError] = useState("");

  const handleOpenSearchNV = () => {
    setIsOpenModalSearchNV(true);
  };

  // CREATE, UPDATE, GET BY ID PHYSICAL DETAIL
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

  // CREATE, UPDATE CLINICAL EXAM
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
  // CREATE, UPDATE PRECLINICAL EXAM
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

  // CREATE, UPDATE PHYSICAL EXAM RESULT
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

  //HANDLE CANCEL/CLOSE MODEL CREATE PHYSICAL EXAM
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
    setParentKey("1");
    setIsGetById(!isGetById);
    setPhysicalExamSelect(isDownload === false && undefined);
    setNewPhysicalDetail(undefined);
    setNewClinicDetail(undefined);
    setNewPreClinicDetail(undefined);
    setNewPhysicalResult(undefined);
    setPhysicalExamGetNew([]);
    setphysicalExamProcess(undefined);
    setHealthHistoryStatus([]);
    setValueHeight(undefined);
    setValueWeight(undefined);
    setFileList([]);
    setEmployeeSelet(undefined);
    setSelectBranch(undefined);
    setSelectCity(undefined);
    setSelectDepartment(undefined);
    setSelectDivision(undefined);
    setSelectArea(undefined);
    setSelectUnit(undefined);
    setSelectEmployeeType(undefined);
    setSelectPosision(undefined);
    setGeneralSetting([]);
    setListHealthHisOld([]);
    setIsSubmit(false);
    setError("");
    setHealthHis(undefined);
  };

  // HANDLE CREATE PHYSICAL AGAIN
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
    setValueHeight(undefined);
    setValueWeight(undefined);
    setEmployeeSelet(undefined);
    setFileList([]);
    setSelectBranch(undefined);
    setSelectCity(undefined);
    setSelectDepartment(undefined);
    setSelectDivision(undefined);
    setSelectArea(undefined);
    setSelectUnit(undefined);
    setSelectEmployeeType(undefined);
    setSelectPosision(undefined);
    setGeneralSetting([]);
    setListHealthHisOld([]);
    setIsSubmit(false);
    setError("");
  };

  // HANDLE CLOSE MODEL SEARCH EMPLOYEE
  const handleCloseModal = () => {
    setIsOpenModalSearchNV(false);
    // setEmployeeSelet(undefined);
  };

  // HANDLE GET DATA EMPLOYEE FOR CREATE PHYSICAL EXAM
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
              activeKey={parentKey}
              onChange={onKeyChangeParent}
              centered
              type="card"
              className="parent-tabs"
            >
              <Tabs.TabPane tab="Nhập kết quả KSK DK" key="1">
                <Tabs
                  defaultActiveKey={activeKey}
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
                      setError={setError}
                      error={error}
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
                      listHealthHisOld={listHealthHisOld}
                      setListHealthHisOld={setListHealthHisOld}
                      healthHis={healthHis}
                      setHealthHis={setHealthHis}
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
                      fileList={fileList}
                      setFileList={setFileList}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Kết luận"
                    key="6"
                    disabled={isPhysicalExamResult ? true : false}
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
                      onCancel={handleCancel}
                      onCreateAgain={handleCreateAgain}
                    />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Nhập file kết quả KSK DK" key="2">
                <Tabs defaultActiveKey="1" centered className=" tabs_children">
                  <Tabs.TabPane tab="Nhập file kết quả KSKDK" key="7">
                    {/* <ImportFileResult fileType={4} text={"test"} /> */}
                    <ImportFileResult
                      examType={4}
                      onCancel={handleCancel}
                      isOpen={isOpen}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Xem lịch sử nhập file kết quả KSKDK"
                    key="8"
                  >
                    <ImportHistory onCancel={handleCancel} isOpen={isOpen} />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
        <EmployeeSearchModal
          onAddNew={handleAddNew}
          onCancel={handleCloseModal}
          isOpen={isOpenModalSearchNV}
        />
      </Modal>
    </>
  );
};
export default PhysicalExamModal;
