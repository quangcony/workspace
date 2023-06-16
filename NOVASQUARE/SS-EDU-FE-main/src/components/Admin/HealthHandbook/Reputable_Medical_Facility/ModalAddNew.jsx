import React, { useEffect, useRef, useState } from "react";
import { Tabs, Col, Row, Modal } from "antd";
import ImportFileResult from "./ImportFileResult/ImportFileResult";
import FileImportHistory from "../Emp_Health_Info/ImportFile/ImportHistory";
import FrmReputableMedical from "./FrmReputableMedical";
import { countryIdSelectState } from "../../../../recoil/atom/countryState";
import { useSetRecoilState } from "recoil";
import { cityIdSelectState } from "../../../../recoil/atom/cityState";

const ModalAddNew = ({
  isOpen,
  onCloseModal,
  medicalFacility,
  onUpdateMedicalFacicality,
  onDelete,
}) => {
  const FrmReputableRef = useRef();
  const setCountryIdSelect = useSetRecoilState(countryIdSelectState);
  const setCityIdSelect = useSetRecoilState(cityIdSelectState);
  const [citySelect, setCitySelect] = useState("");
  const [countrySelect, setCountrySelect] = useState("");
  const [medicalModalSelect, setMedicalModalSelect] = useState(undefined);
  const [parentKey, setParentKey] = useState("1");
  const onKeyChangeParent = (key) => setParentKey(key);

  const handleCancel = () => {
    onCloseModal();
    FrmReputableRef.current.resetFields();
    setCountryIdSelect(undefined);
    setCityIdSelect(undefined);
    setCitySelect("");
    setCountrySelect("");
    setMedicalModalSelect(undefined);
    setParentKey("1");
  };

  return (
    <>
      <Modal
        visible={isOpen}
        title="1.9 Nhập thông tin cơ sở khám chữa bệnh uy tín"
        open={isOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={1200}
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
              <Tabs.TabPane tab="Nhập danh sách cơ sở khám chữa bệnh" key="1">
                <FrmReputableMedical
                  FrmReputableRef={FrmReputableRef}
                  oncancel={handleCancel}
                  medicalFacility={medicalFacility}
                  onUpdateMedicalFacicality={onUpdateMedicalFacicality}
                  onDelete={onDelete}
                  citySelect={citySelect}
                  setCitySelect={setCitySelect}
                  countrySelect={countrySelect}
                  setCountrySelect={setCountrySelect}
                  medicalModalSelect={medicalModalSelect}
                  setMedicalModalSelect={setMedicalModalSelect}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Import danh sách cơ sở khám chữa bệnh "
                key="2"
              >
                <Tabs defaultActiveKey="1" centered className=" tabs_children">
                  <Tabs.TabPane
                    tab="Import danh sách cơ sở khám chữa bệnh "
                    key="7"
                  >
                    <ImportFileResult onCancel={handleCancel} isOpen={isOpen} />
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab="Xem lịch sử nhập file kết quả cơ sở khám chữa bệnh"
                    key="8"
                  >
                    <FileImportHistory
                      onCancel={handleCancel}
                      isOpen={isOpen}
                    />
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
export default ModalAddNew;
