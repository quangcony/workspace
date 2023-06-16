import ModalInvestigationCase from "../../../components/Admin/InvestigationCase/ModalInvestigationCase";
import ListInvestigationCase from "../../../components/Admin/InvestigationCase/ListInvestigationCase";
import BreadcrumbProvider from "../../../components/global/Breadcrumb";
import Card from "../../../components/global/Card";
import { Button, Col, Row, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import HeadBar from "../../../components/global/HeadBar";
import { useSearch } from "react-use-search";
import { useInvestigationCase } from "../../../hooks/investigationCase";
import { useRecoilValue } from "recoil";
import { generalState } from "../../../recoil/atom/generalState";
import { useHistory } from "react-router-dom";
import moduleApi from "../../../api/moduleApi";
import Permissions_CD from "../../../data_json/Permissions_CD.json";
import { findExistance } from "../../../utils/findExistance";
import { removeAccents, selectOptions } from "../../../common";
import { color } from "@mui/system";
import ModalHistory from "../../../components/Admin/InvestigationCase/ModalHistory";
const predicate = (apps, query) => {
    
  const newQuery = removeAccents(String(query)).toLowerCase().trim();
  const SUBJECT_TO_FULLNAME = removeAccents(String(apps.SUBJECT_TO_FULLNAME)).toLowerCase().trim();
  const STATUS = removeAccents(String(apps.STATUS)).toLowerCase().trim();
  return SUBJECT_TO_FULLNAME.includes(newQuery) || STATUS.includes(newQuery);
};
const InvestigationCases = () => {
  const { moduleSelected } = useRecoilValue(generalState);
  const [permissionsCD, setPermissionsCD] = useState();
  const [idConvert, setIdConvert] = useState();
  const [investigationOption, setInvestigationOption] = useState([]);
  const history = useHistory();


  const {
    demSo,
    investigationCases,
    investigationCaseHistory,
    getAllInvestigationCases,
    updateInvestigationCase,
    isLoading,
    deleteInvestigationCase,
    createInvestigationCase,
    getInvestigationCase,
    getInvestigationCaseHistory,
    investigationCase,
    setInvestigationCase,
  } = useInvestigationCase();
  useEffect(() => {
        const inves = investigationCases?.data?.filter((invess)=>invess.STATUS==="Chưa xác minh")
        setInvestigationOption(inves)
  }, [investigationCases]);
  
  const [isOpenMutation, setIsOpenMutation] = useState(false);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [convertOption, setConvertOption] = useState(false);
  const handleCreateApp = async (app, callback) => {
    await createInvestigationCase(app, callback);
  };
  const handleUpdateApp = async (app, id, callback) => {
    await updateInvestigationCase(app, id, callback);
  };
  const handleOpenUpdate = async (id) => {
    await getInvestigationCase(id, () => setIsOpenMutation(true));
    setIsOpenMutation(true);
  };
  const handleOpenHistory = async (id) => {
    await getInvestigationCaseHistory(id, () => setIsOpenHistory(true));
    setIsOpenHistory(true);
  };
  const handleOpenConvert = async (id) =>{
    setIdConvert(id)
    await getInvestigationCase(id, () => setConvertOption(true));

    setIsOpenMutation(false);
    setConvertOption(true);
  };
  const handleDelete = async (id) => {
    await deleteInvestigationCase(id);
  };

  const [filteredInvestigationCases, query, handleChange, setQuery] = useSearch(
    investigationCases.data,
    predicate,
    { debounce: 200 }
  );

  useEffect(() => {
    (async () => {
      const response = await moduleApi.getPermissionsByModuleId(
        moduleSelected?.id
      );
      if (response.status === 200 && response.data.elements.length > 0) {
        const temp = [
          ...response.data.elements.map((item) => item.PERMISSION_CD),
        ];
        setPermissionsCD(temp);
      } else {
        setPermissionsCD([]);
        history.push("/");
      }
    })();
  }, []);
  return (
    <div className="page-content">
      <BreadcrumbProvider
        adrress= 'Investigation Case'
      />
      <Row>
        <Col span={24}>
          <Card title= 'Investigation case'>
            
            <HeadBar
            btnReLoad={"none"}
            reLoadGet={getAllInvestigationCases}
              query={query}
              onSearch={handleChange}
              openAdd={() => {
                setIsOpenMutation(true);
                setInvestigationCase(undefined);
              }}
              isDisplayBtn={findExistance(permissionsCD, Permissions_CD.create)}
            />
              <div style={{marginBottom:"10px", color:"red",display:investigationCases.valid===true?"none":"block"}}>Có {demSo} dữ liệu không hợp lệ</div>

            <ListInvestigationCase
              onDelete={handleDelete}
              openEdit={handleOpenUpdate}
              openHistory={handleOpenHistory}
              investigationCases={
                filteredInvestigationCases && filteredInvestigationCases.length > 0
                  ? filteredInvestigationCases
                  : investigationOption
              }
              isLoading={isLoading}
              isDisplayEditBtn={findExistance(
                permissionsCD,
                Permissions_CD.update
              )}
              isDisplayDeleteBtn={findExistance(
                permissionsCD,
                Permissions_CD.delete
              )}
            />
          </Card>
        </Col>
      </Row>
      <ModalHistory
      onUpdate={handleOpenHistory}
        isOpen={isOpenHistory}
        onCancel={() => setIsOpenHistory(false)}
        investigationCases={investigationCaseHistory}
      />
      <ModalInvestigationCase
        dataConvert={investigationCase?.blockchainData}
        openConvert={handleOpenConvert}
        onUpdate={handleUpdateApp}
        investigationCase={investigationCase}
        loading={isLoading}
        onOk={handleCreateApp}
        title={
          investigationCase ? "Update investigation case" : "Create investigation case"
        }
        onCancel={() => setIsOpenMutation(false)}
        isOpen={isOpenMutation}
      />
    </div>
  );
};

export default InvestigationCases;
