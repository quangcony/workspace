import { Col, Modal, Row, Tabs } from "antd";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import clinicalDetailApi from "../../../../api/clinicDetailApi";
import physicalDetailApi from "../../../../api/physicalDetailApi";
import physicalExamResultApi from "../../../../api/physicalExamResultApi";
import preclinicalDetailApi from "../../../../api/preclinicDetailApi";
import { physicalExamByQueryData } from "../../../../common/getAllApi";
import { isShowState } from "../../../../recoil/atom/booleanState";
import { cityIdSelectState } from "../../../../recoil/atom/cityState";
import {
  clinicalDetailState,
  newestClinicalDetailState,
} from "../../../../recoil/atom/clinicalDetailState";
import { countryIdSelectState } from "../../../../recoil/atom/countryState";
import { employeeSelectState } from "../../../../recoil/atom/employeeState";
import { healthHistoryStatusState } from "../../../../recoil/atom/healthHistotyState";
import {
  newestPhysicalDetailState,
  physicalDetailIdState,
} from "../../../../recoil/atom/physicalDetailState";
import { physicalExamNewState } from "../../../../recoil/atom/physicalExamNew";
import {
  physicalExamProcessState,
  reLoadPhysicalExam,
} from "../../../../recoil/atom/physicalExamProcess";
import { newestPhysicalExamResultState } from "../../../../recoil/atom/physicalExamResult";
import {
  newestPreclinicalDetailState,
  preclinicalDetailState,
} from "../../../../recoil/atom/preClinicalDetailState";
import EmployeeSearchModal from "../EmployeeSearch/EmployeeSearchModal";
import ImportFile from "../Emp_Health_Info/ImportFile/ImportFile";
import ImportHistory from "../Emp_Health_Info/ImportFile/ImportHistory";
import FrmClinicalExamination from "./PhysicalExamForm/FrmClinicalExamination";
import FrmConclusion from "./PhysicalExamForm/FrmConclusion";
import FrmMedicalHistory from "./PhysicalExamForm/FrmMedicalHistory";
import FrmPersonalInformation from "./PhysicalExamForm/FrmPersonalInformation";
import FrmPhysicalExamination from "./PhysicalExamForm/FrmPhysicalExamination";
import FrmSubclinicalExamination from "./PhysicalExamForm/FrmSubclinicalExamination";
import { physicalExamOptionStateHardToxic } from "../../../../recoil/atom/physicalExamState";
import { generalSettingState } from "../../../../recoil/atom/generalSettingState";

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
  isDelete,
}) => {
  const [physicalExamOption, setPhysicalExamOption] = useRecoilState(
    physicalExamOptionStateHardToxic
  );
  const setNewPhysicalDetail = useSetRecoilState(newestPhysicalDetailState);
  const setPhysicalDetail = useSetRecoilState(physicalDetailIdState);
  const setPreclinicalDetail = useSetRecoilState(preclinicalDetailState);
  const setNewClinicDetail = useSetRecoilState(newestClinicalDetailState);
  const setClinicalDetail = useSetRecoilState(clinicalDetailState);
  const setNewPreClinicDetail = useSetRecoilState(newestPreclinicalDetailState);
  const setNewPhysicalResult = useSetRecoilState(newestPhysicalExamResultState);
  const [reloadPhysical, setReloadPhysical] =
    useRecoilState(reLoadPhysicalExam);
  const setGeneralSetting = useSetRecoilState(generalSettingState);

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
  const [parentKey, setParentKey] = useState("1");

  const setEmployeeSelet = useSetRecoilState(employeeSelectState);

  const setphysicalExamProcess = useSetRecoilState(physicalExamProcessState);
  const [isPersional, setIsPersional] = useState(true);
  const [isHealthHis, setIsHealthHis] = useState(true);
  const [isPhysicalDetail, setIsPhysicalDetail] = useState(true);
  const [isClinicalExam, setIsClinicalExam] = useState(true);
  const [isPreClinicalExam, setIsPreClinicalExam] = useState(true);
  const [isPhysicalExamResult, setIsPhysicalExamResult] = useState(true);
  const [fileList, setFileList] = useState([]);
  const setIsShow = useSetRecoilState(isShowState);
  const [error, setError] = useState("");

  const onKeyChange = (key) => setActiveKey(key);
  const onKeyChangeParent = (key) => setParentKey(key);

  const handleOpenSearchNV = () => {
    setIsOpenModalSearchNV(true);
  };

  // CREATE PHYSICAL DETAIL
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

  // UPDATE PHYSICAL DETAIL
  const handleUpdatePhysicalDetail = async (data, id, callback) => {
    try {
      await physicalDetailApi.updatePhysicalDetail(data, id);
      physicalExamByQueryData(
        physicalExamOption,
        setPhysicalExamOption,
        {
          INPUT_STATUS: 1,
          TYPE: 5,
        },
        isDelete
      );
    } catch (error) {
      console.log("error");
    }
  };

  // GET PHYSICAL DETAIL BY ID
  const handleGetPhysicalDetai = async (id) => {
    try {
      let res = await physicalDetailApi.getPhysicalDetail(id);
      if (res.data) {
        setPhysicalDetail(res.data.elements.physicalDetail);
      }
    } catch (error) {
      console.log("Get physical detail fail!");
    }
  };

  // CREATE CLINICAL DETAIL
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

  //UPDATE CLINICAL DETAIL
  const handleUpdateClinicalExam = async (data, id, callback) => {
    try {
      let res = await clinicalDetailApi.updateClinicalDetail(data, id);
      if (res.data) {
        await clinicalDetailApi.getAllClinicalDetails();
        physicalExamByQueryData(
          physicalExamOption,
          setPhysicalExamOption,
          {
            INPUT_STATUS: 1,
            TYPE: 5,
          },
          isDelete
        );
      }
    } catch (error) {
      console.log("error");
    }
  };

  // GET CLINICAL DETAIL BY ID
  const handleGetClinical = async (id) => {
    try {
      let res = await clinicalDetailApi.getClinicalDetailById(id);
      if (res.data) {
        setClinicalDetail(res.data.elements.clinicalDetail);
      }
    } catch (error) {}
  };

  // PRECLINICAL DETAIL
  const handleCreatePreclinicalExam = async (data, callback) => {
    try {
      let res = await preclinicalDetailApi.createPreclinicalDetail(data);
      physicalExamByQueryData(
        physicalExamOption,
        setPhysicalExamOption,
        {
          INPUT_STATUS: 1,
          TYPE: 5,
        },
        isDelete
      );
      if (res.data) {
        setNewPreClinicDetail(res.data.elements);
      }
    } catch (error) {
      console.log("error");
    }
  };

  // UPDATE PRECLINICAL DETAIL
  const handleUpdatePreclinicalExam = async (data, id, callback) => {
    try {
      await preclinicalDetailApi.updatePreclinicalDetail(data, id);
      physicalExamByQueryData(
        physicalExamOption,
        setPhysicalExamOption,
        {
          INPUT_STATUS: 1,
          TYPE: 5,
        },
        isDelete
      );
    } catch (error) {
      console.log("error");
    }
  };

  // GET CLINICAL DETAIL BY ID
  const handleGetPreClinical = async (id) => {
    try {
      let res = await preclinicalDetailApi.getPreclinicalDetailById(id);
      if (res.data) {
        setPreclinicalDetail(res.data.elements.preclinicalDetail);
      }
    } catch (error) {}
  };

  // CREATE PHYSICAL EXAM RESULT
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

  // UPDATE PHYSICAL EXAM RESULT
  const handleUpdatePhysicalExamResult = async (data, id, callback) => {
    try {
      await physicalExamResultApi.updatePhysicalExamResult(data, id);
      physicalExamByQueryData(
        physicalExamOption,
        setPhysicalExamOption,
        {
          INPUT_STATUS: 1,
          TYPE: 5,
        },
        isDelete
      );
    } catch (error) {
      console.log("error");
    }
  };

  const handleCancel = () => {
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
    setPhysicalExamSelect(undefined);
    setNewPhysicalDetail(undefined);
    setNewClinicDetail(undefined);
    setNewPreClinicDetail(undefined);
    setNewPhysicalResult(undefined);
    setPhysicalExamGetNew(undefined);
    setphysicalExamProcess(undefined);
    setHealthHistoryStatus([]);
    setReloadPhysical(!reloadPhysical);
    setPhysicalDetail(undefined);
    setFileList([]);
    setIsShow(false);
    setGeneralSetting([]);
    setError("");
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
    setPhysicalExamGetNew(undefined);
    setphysicalExamProcess(undefined);
    setHealthHistoryStatus([]);
    setIsShow(false);
    setGeneralSetting([]);
    setError("");
  };

  const handleCloseModal = () => {
    setIsOpenModalSearchNV(false);
    // setPhysicalExam(undefined);
    // setEmployeeSelet(undefined);
  };

  const handleAddNew = (data) => {
    setEmployeeSelet(data);
    setIsOpenModalSearchNV(false);
  };

  return (
    <>
      <Modal
        visible={isOpen}
        title="1.6.1 Nhập thông tin khám sức khỏe nặng nhọc, độc hại"
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
              activeKey={parentKey}
              onChange={onKeyChangeParent}
            >
              <Tabs.TabPane tab="Nhập kết quả KSK nặng nhọc, độc hại" key="1">
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
                      error={error}
                      setError={setError}
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
                      onGetClinicalDetail={handleGetClinical}
                      setFileList={setFileList}
                      fileList={fileList}
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
                      onUpdatePhysicalExam={onUpdatePhysicalExam}
                      onCancel={handleCancel}
                      onCreateAgain={handleCreateAgain}
                      onGetPhysicalExam={onGetPhysicalExam}
                      onGetPreClinicalDetail={handleGetPreClinical}
                    />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Nhập file kết quả KSK nặng nhọc, độc hại"
                key="2"
              >
                <Tabs defaultActiveKey="1" centered className=" tabs_children">
                  <Tabs.TabPane
                    tab="Nhập file kết quả KSK nặng nhọc, độc hại"
                    key="7"
                  >
                    <ImportFile
                      examType={5}
                      onCancel={handleCancel}
                      isOpen={isOpen}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Xem lịch sử nhập file kết quả KSK nặng nhọc, độc hại"
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
