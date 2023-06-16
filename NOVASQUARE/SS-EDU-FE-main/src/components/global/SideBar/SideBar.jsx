import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import staticLogo from "../../../assets/images/logo.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { generalState } from "../../../recoil/atom/generalState";
import { useModule } from "../../../hooks/module";
import { Avatar, Button, Empty, Image, Skeleton, Spin } from "antd";
import MutationModule from "../../Admin/Modules/MutationModule";
import { appState } from "../../../recoil/atom/appState";
import { authState } from "../../../recoil/atom/authState";
import { logoState } from "../../../recoil/atom/logoState";
import { useOrg } from "../../../hooks/org";

import { moduleMenuState } from "../../../recoil/atom/moduleMenuState";
import { imgUrl } from "../../../config/serverHost";
// import "./style.scss";
const SideBar = () => {
  const history = useHistory();
  const { page, appName } = useParams();
  const [isOpenMutation, setIsOpenMutation] = useState(false);
  const { isLoading, createModule } = useModule();
  const { appSelected } = useRecoilValue(generalState);
  const [general, setGeneral] = useRecoilState(generalState);
  const menuModules = useRecoilValue(moduleMenuState);
  const { profile } = useRecoilValue(authState);
  const ORG_ID = profile?.ORG_ID;
  // const [logoByUser, setLogoByUser] = useState();
  const { getOrg, isLoading: loadingLogo, getOrgByDefault } = useOrg();
  // const [logo, setLogo] = useState(undefined);
  const [logo, setLogo] = useRecoilState(logoState);

  // useEffect(() => {

  // }, [menuModules]);

  const handleGetOrgsbyId = async (ORG_ID) => {
    const data = await getOrg(ORG_ID);
    setLogo(`${imgUrl}/orgs/${data.LOGO_NAME}`);
  };
  const handleGetOrgByDefault = async () => {
    const data = await getOrgByDefault();
    setLogo(`${imgUrl}/orgs/${data.LOGO_NAME}`);
  };
  useEffect(() => {
    if (ORG_ID) {
      handleGetOrgsbyId(ORG_ID);
    } else {
      handleGetOrgByDefault();
    }
  }, []);

  // const apps = useRecoilValue(appState);

  // const { getAllModulesByApp } = useModule();
  // const handleGetModules = async () => {
  //   await getAllModulesByApp();
  // };

  // useEffect(() => {
  //   if (!org) {
  //     getOrgsbyId();
  //   } else {
  //     setLogoByUser(org.LOGO_NAME);
  //   }
  // }, [org]);
  // useEffect(() => {
  //   if (appSelected && appSelected.id) {
  //     handleGetModules();
  //   }
  // }, [appSelected]);

  const handleCreateModule = async (module, appId, callback) => {
    await createModule(module, appId, callback);
  };

  const handleClick = (module) => {
    setGeneral({
      ...general,
      moduleSelected: {
        id: module.MODULE_ID,
        label: module.MODULE_NAME,
      },
    });
    history.push(module.url);
  };

  const menuModule = () => {
    return menuModules && menuModules.length > 0 ? (
      menuModules.map((item, index) => (
        <>
          <li
            key={index}
            style={{ marginBottom: 10 }}
            className={`nav-item ${page === item.MODULE_CD ? "active" : ""}`}
            onClick={() => handleClick(item)}
          >
            <div
              className="nav-link"
              style={{
                cursor: "pointer",
                whiteSpace: "normal",
                height: "50px",
              }}
            >
              <Avatar
                shape="square"
                src={
                  <img
                    alt={item.MODULE_NAME}
                    src={item.ICON_NAME}
                    style={{
                      width: 20,
                      height: 20,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                }
              />
              {/* show menu name */}
              <span className="menu-link"> {item.MODULE_NAME}</span>
              {/* <span className="link-title">{item.MODULE_NAME}</span> */}
            </div>
          </li>
        </>
      ))
    ) : (
      <Empty style={{ marginTop: 20 }}>
        <Button onClick={() => setIsOpenMutation(true)} type="primary">
          Create Now
        </Button>
      </Empty>
    );
  };
  const logoMain = () => {
    if (logo) {
      return <img style={{ height: 50 }} src={logo} />;
    }
    return (
      <img style={{ width: 54, alignContent: "center" }} src={staticLogo} />
    );
  };

  return (
    <nav
      className="sidebar"
      style={{
        backgroundColor: `#${process.env.REACT_APP_SIDEBAR_COLOR}`,
        // paddingLeft: "10px",
      }}
    >
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand" style={{ margin: "auto" }}>
          {loadingLogo ? (
            <Skeleton.Button
              active={true}
              size={20}
              shape={"default"}
              block={false}
            />
          ) : (
            logoMain()
          )}
        </Link>
        {/* <div className="sidebar-toggler active">
           <span />
           <span />
           <span />
        </div> */}
      </div>
      <div className="sidebar-body">
        <ul className="nav">
          {loadingLogo ? (
            <Spin />
          ) : (
            <>
              {/* lable of app menu selected */}
              <li
                className="nav-item nav-category"
                style={{ marginLeft: "10px" }}
              >
                {appSelected.label}
              </li>
              {menuModule()}
              {/* {apps && apps.length > 0 && menuModule()} */}
            </>
          )}
        </ul>
      </div>
      <MutationModule
        loading={isLoading}
        onOk={handleCreateModule}
        title={"Create Module"}
        onCancel={() => setIsOpenMutation(false)}
        isOpen={isOpenMutation}
      />
    </nav>
  );
};

export default SideBar;
