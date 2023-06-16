import { Col, Modal, Row, Tabs } from "antd";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import clinicalDetailApi from "../../../api/clinicDetailApi";
import physicalDetailApi from "../../../api/physicalDetailApi";
import physicalExamResultApi from "../../../api/physicalExamResultApi";
import preclinicalDetailApi from "../../../api/preclinicDetailApi";
import { physicalExamByQueryData } from "../../../common/getAllApi";
import {
  isCreateState,
  isUpdateState,
} from "../../../recoil/atom/booleanState";
import { cityIdSelectState } from "../../../recoil/atom/cityState";
import {
  clinicalDetailState,
  newestClinicalDetailState,
} from "../../../recoil/atom/clinicalDetailState";
import { countryIdSelectState } from "../../../recoil/atom/countryState";
import { employeeSelectState } from "../../../recoil/atom/employeeState";
import { healthHistoryStatusState } from "../../../recoil/atom/healthHistotyState";
import {
  newestPhysicalDetailState,
  physicalDetailIdState,
} from "../../../recoil/atom/physicalDetailState";
import { physicalExamNewState } from "../../../recoil/atom/physicalExamNew";
import {
  physicalExamOptionHardToxicState,
  physicalExamOptionState,
  physicalExamProcessState,
  reLoadPhysicalExam,
} from "../../../recoil/atom/physicalExamProcess";
import { newestPhysicalExamResultState } from "../../../recoil/atom/physicalExamResult";
import {
  newestPreclinicalDetailState,
  preclinicalDetailState,
} from "../../../recoil/atom/preClinicalDetailState";
import FrmClinicalExamination from "./EnterNewResult/FrmClinicalExamination";
import FrmConclusion from "./EnterNewResult/FrmConclusion";
import FrmMedicalHistory from "./EnterNewResult/FrmMedicalHistory";
import FrmPersonalInformation from "./EnterNewResult/FrmPersonalInformation";
import FrmPhysicalExamination from "./EnterNewResult/FrmPhysicalExamination";
import FrmSubclinicalExamination from "./EnterNewResult/FrmSubclinicalExamination";
import ModalEmployeeSearch from "./EnterNewResult/ModalEmployeeSearch";
import FileImportHistory from "./ImportFileResult/FileImportHistory";
import ImportFileResult from "./ImportFileResult/ImportFileResult";

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
  isDelete,
  onGetPhysicalExamDirect,
}) => {
  const [physicalExamOption, setPhysicalExamOption] = useRecoilState(
    physicalExamOptionHardToxicState
  );
  const [newPhysicalDetail, setNewPhysicalDetail] = useRecoilState(
    newestPhysicalDetailState
  );
  const [physicalDetail, setPhysicalDetail] = useRecoilState(
    physicalDetailIdState
  );
  const [preclinicalDetail, setPreclinicalDetail] = useRecoilState(
    preclinicalDetailState
  );
  const [newClinicDetail, setNewClinicDetail] = useRecoilState(
    newestClinicalDetailState
  );
  const [clinicalDetail, setClinicalDetail] =
    useRecoilState(clinicalDetailState);
  const [newPreClinicDetail, setNewPreClinicDetail] = useRecoilState(
    newestPreclinicalDetailState
  );

  const [newPhysicalResult, setNewPhysicalResult] = useRecoilState(
    newestPhysicalExamResultState
  );

  const [reloadPhysical, setReloadPhysical] =
    useRecoilState(reLoadPhysicalExam);

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
  const handleGetClinical = async (id) => {
    try {
      let res = await clinicalDetailApi.getClinicalDetailById(id);
      if (res.data) {
        setClinicalDetail(res.data.elements.clinicalDetail);
      }
    } catch (error) {}
  };
  // can lam san
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
  const handleGetPreClinical = async (id) => {
    try {
      let res = await preclinicalDetailApi.getPreclinicalDetailById(id);
      if (res.data) {
        setPreclinicalDetail(res.data.elements.preclinicalDetail);
      }
    } catch (error) {}
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
  const handleGetPhysicalExamDirect = async (id) => {
    await onGetPhysicalExamDirect(id);
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
    // setClinicalDetail(undefined)
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
    setIsCreate(false);
    setIsUpdate(false);
  };

  const handleCloseModal = () => {
    setIsOpenModalSearchNV(false);
    // setPhysicalExam(undefined);
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
                      onGetPhysicalExam={handleGetPhysicalExamDirect}
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
                      onGetPhysicalExam={handleGetPhysicalExamDirect}
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
                      onGetPhysicalExam={handleGetPhysicalExamDirect}
                      onGetClinicalDetail={handleGetClinical}
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
                    <ImportFileResult />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Xem lịch sử nhập file kết quả KSK nặng nhọc, độc hại"
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
