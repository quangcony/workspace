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
import { useClinicalDefault } from "../../../hooks/clinicalDefault";
import { useHealthHis } from "../../../hooks/healthHis";
import { usePhysicalDetail } from "../../../hooks/physicalDetail";
import { useClinicDetail } from "../../../hooks/clinicDetail";
import { usePreclinicDetail } from "../../../hooks/preclinicDetail";
import { usePreClinicalDefault } from "../../../hooks/preClinicalDefault";
import { usePhysicalExamResult } from "../../../hooks/physicalExamResult";
import { useWorkingStatus } from "../../../hooks/workingStatus";
import { useDiseaseCurrent } from "../../../hooks/diseaseCurrent";

const ModalAddNewKSKDK = ({
  isOpen,
  onCancel,
  addNewId,
  departOption,
  positOption,
  areaOption,
  genderOption,
  unitOption,
  diseaseOption,
  maritalOption,
  emplyeeTypeOption,
  divisionOption,
  workPlaceOption,
  // medicalFacilityOption,
  medicalFacilities,
  listEmployee,
  onCreatePhysicalExam,
  diseaseStatusOption,
  setAddNewId,
  setFilterEmployee,
  physicalExamNew,
  countries,
  cities,
  openFilePDF,
  onUpdatePhysicalExam,
}) => {
  const { createHealthHis } = useHealthHis();
  const { createPhysicalDetail } = usePhysicalDetail();
  const { createClinicalDetail } = useClinicDetail();
  const { createPreclinicalDetail } = usePreclinicDetail();

  const {
    physicalExamResults,
    physicalExamResultNew,
    createPhysicalExamResult,
    updatePhysicalExamResult,
  } = usePhysicalExamResult();
  const { clinicaldefaults } = useClinicalDefault();
  const { preClinicalDefaults } = usePreClinicalDefault();
  const { workingstatuss } = useWorkingStatus();
  const {
    createDiseaseCurrent,
    deleteDiseaseCurrent,
    getDiseaseCurrentById,
    updateDiseaseCurrent,
  } = useDiseaseCurrent();

  const FrmPersionalInfoRef = useRef();
  const FrmPhysicalExamRef = useRef();
  const FrmHealthHisRef = useRef();
  const FrmClinicalExaminationRef = useRef();
  const FrmSubclinicalExamRef = useRef();
  const FrmConclusionRef = useRef();

  const [isOpenModalSearchNV, setIsOpenModalSearchNV] = useState(false);
  const [persionalInfo, setPertionalInfo] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [physicalExamination, setPhysicalExamination] = useState(null);
  const [clinicalValue, setClinicalValue] = useState(null);
  const [subClinicalValue, setSubClinicalValue] = useState(null);
  const [conclusion, setConclusion] = useState(null);
  const [activeKey, setActiveKey] = useState("1");
  const [userId, setUserId] = useState("");

  const onKeyChange = (key) => setActiveKey(key);

  const handleOpenSearchNV = () => {
    setIsOpenModalSearchNV(true);
  };

  const [processing, setProcessing] = useState();
  const [done, setDone] = useState();
  useEffect(() => {
    setProcessing(workingstatuss.filter((item) => item.NAME === "PROCESSING"));
    setDone(workingstatuss.filter((item) => item.NAME === "DONE"));
  }, [workingstatuss]);

  const handleCreateHealthHis = async (value) => {
    await createHealthHis(value);
  };

  const handleCreatePhysicalDetail = async (value, callback) => {
    await createPhysicalDetail(value, callback);
  };

  const handleCreateClinicalExam = async (value, callback) => {
    await createClinicalDetail(value);
  };

  const handleCreatePreclinicalExam = async (value, callback) => {
    await createPreclinicalDetail(value);
  };

  const handleCreatePhysicalExamResult = async (value, callback) => {
    await createPhysicalExamResult(value);
  };

  const handleUpdatePhysicalExamResult = async (value, id, callback) => {
    await updatePhysicalExamResult(value, id, callback);
  };

  const handleCreateDiseaseCurrent = async (value) => {
    await createDiseaseCurrent(value);
  };

  const handleCancel = () => {
    onCancel();
    FrmPersionalInfoRef.current?.resetFields();
    FrmPhysicalExamRef.current?.resetFields();
    FrmHealthHisRef.current?.resetFields();
    FrmClinicalExaminationRef.current?.resetFields();
    FrmSubclinicalExamRef.current?.resetFields();
    FrmConclusionRef.current?.resetFields();
    setPertionalInfo("");
    setMedicalHistory(null);
    setClinicalValue(null);
    setSubClinicalValue(null);
    setConclusion(null);
    setActiveKey("1");
  };

  const handleCreateAgain = () => {
    FrmPersionalInfoRef.current?.resetFields();
    FrmPhysicalExamRef.current?.resetFields();
    FrmHealthHisRef.current?.resetFields();
    FrmClinicalExaminationRef.current?.resetFields();
    FrmSubclinicalExamRef.current?.resetFields();
    FrmConclusionRef.current?.resetFields();
    setPertionalInfo("");
    setMedicalHistory(null);
    setClinicalValue(null);
    setSubClinicalValue(null);
    setConclusion(null);
    setActiveKey("1");
  };
  const handleCloseModal = () => {
    setIsOpenModalSearchNV(false);
  };

  const handleAddNew = (data) => {
    setAddNewId(data);
    setIsOpenModalSearchNV(false);
  };
  const [newPhysicalResult, setNewPhysicalResult] = useState("");
  useEffect(() => {
    setNewPhysicalResult(physicalExamResultNew);
  }, [physicalExamResults]);

  return (
    <>
      <Modal
        visible={isOpen}
        title="1.3.1 Nhập thông tin khám sức khỏe đầu vào"
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
            <Tabs defaultActiveKey="1" centered type="card">
              <Tabs.TabPane tab="Nhập kết quả KSK DK" key="1">
                <Tabs
                  defaultActiveKey="1"
                  centered
                  activeKey={activeKey}
                  onChange={onKeyChange}
                  type="card"
                  className=" tabs_children"
                >
                  <Tabs.TabPane tab="Thông tin cá nhân" key="1">
                    <FrmPersonalInformation
                      countries={countries}
                      cities={cities}
                      isOpenSearchNV={handleOpenSearchNV}
                      getNewData={setPertionalInfo}
                      onKeyChange={onKeyChange}
                      addNewId={addNewId}
                      setAddNewId={setAddNewId}
                      datas={listEmployee}
                      onCreatePhysicalExam={onCreatePhysicalExam}
                      userId={userId}
                      setUserId={setUserId}
                      // medicalFacilityOption={medicalFacilityOption}
                      medicalFacilities={medicalFacilities}
                      FrmPersionalInfoRef={FrmPersionalInfoRef}
                      onUpdatePhysicalExam={onUpdatePhysicalExam}
                      processing={processing}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Tiền sử bệnh tật"
                    key="2"
                    disabled={persionalInfo ? false : true}
                  >
                    <FrmMedicalHistory
                      setMedicalHistory={setMedicalHistory}
                      onKeyChange={onKeyChange}
                      FrmHealthHisRef={FrmHealthHisRef}
                      diseaseOption={diseaseOption}
                      onCreateHealthHis={handleCreateHealthHis}
                      diseaseStatusOption={diseaseStatusOption}
                      userId={userId}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám thể lực"
                    key="3"
                    disabled={medicalHistory ? false : true}
                  >
                    <FrmPhysicalExamination
                      setPhysicalExamination={setPhysicalExamination}
                      onKeyChange={onKeyChange}
                      onCreatePhysicalDetail={handleCreatePhysicalDetail}
                      FrmPhysicalExamRef={FrmPhysicalExamRef}
                      physicalExamId={physicalExamNew}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám lâm sàn"
                    key="4"
                    disabled={physicalExamination ? false : true}
                  >
                    <FrmClinicalExamination
                      setClinicalValue={setClinicalValue}
                      onKeyChange={onKeyChange}
                      onCreateClinicalExam={handleCreateClinicalExam}
                      physicalExamId={physicalExamNew}
                      clinicaldefaults={clinicaldefaults}
                      FrmClinicalExaminationRef={FrmClinicalExaminationRef}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Khám cận lâm sàn"
                    key="5"
                    // disabled={clinicalValue ? false : true}
                  >
                    <FrmSubclinicalExamination
                      setSubClinicalValue={setSubClinicalValue}
                      onKeyChange={onKeyChange}
                      SubclinicalExamRef={FrmSubclinicalExamRef}
                      onCreatePreClinicExam={handleCreatePreclinicalExam}
                      physicalExamId={physicalExamNew}
                      preClinicalDefaults={preClinicalDefaults}
                      onCreatePhysicalExamResult={
                        handleCreatePhysicalExamResult
                      }
                      userId={userId}
                    />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Kết luận"
                    key="6"
                    disabled={subClinicalValue ? false : true}
                  >
                    <FrmConclusion
                      setConclusion={setConclusion}
                      onKeyChange={onKeyChange}
                      FrmConclusionRef={FrmConclusionRef}
                      physicalExamId={physicalExamNew}
                      onUpdatePhysicalExamResult={
                        handleUpdatePhysicalExamResult
                      }
                      openFilePDF={openFilePDF}
                      onUpdatePhysicalExam={onUpdatePhysicalExam}
                      onCancel={handleCancel}
                      onCreateAgain={handleCreateAgain}
                      onCreateDiseaseCurrent={handleCreateDiseaseCurrent}
                      diseaseOption={diseaseOption}
                      processing={processing}
                      done={done}
                      physicalExamResultNew={newPhysicalResult}
                    />
                  </Tabs.TabPane>
                </Tabs>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Nhập file kết quả KSK DK" key="2">
                <Tabs
                  defaultActiveKey="1"
                  centered
                  type="card"
                  className=" tabs_children"
                >
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
          // medicalFacilityOption={medicalFacilityOption}
          divisionOption={divisionOption}
          departOption={departOption}
          positOption={positOption}
          areaOption={areaOption}
          genderOption={genderOption}
          unitOption={unitOption}
          maritalOption={maritalOption}
          emplyeeTypeOption={emplyeeTypeOption}
          workPlaceOption={workPlaceOption}
          isOpen={isOpenModalSearchNV}
          onCancel={handleCloseModal}
          datas={listEmployee}
          onAddNew={handleAddNew}
          setFilterEmployee={setFilterEmployee}
        />
      </Modal>
    </>
  );
};
export default ModalAddNewKSKDK;
