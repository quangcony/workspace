import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { appState } from "../../../recoil/atom/appState";
import { generalState } from "../../../recoil/atom/generalState";
import { useHistory } from "react-router-dom";
import { useApp } from "../../../hooks/app";
import { AppstoreOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import MutationApp from "../../Admin/Apps/MutationApp";
import { imgUrl } from "../../../config/serverHost";
import { useModule } from "../../../hooks/module";

// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const AppMenu = () => {
  const history = useHistory();
  const [apps, setApps] = useState([]);
  const [general, setGeneral] = useRecoilState(generalState);
  const [isOpenMutation, setIsOpenMutation] = useState(false);
  const { isLoading, createApp, getAppsByUserId } = useApp();
  const { getAllModulesByApp } = useModule();

  const handleCreateApp = async (app, callback) => {
    await createApp(app, callback);
  };

  const handleSetApp = async (app) => {
    await setGeneral({
      ...general,
      appSelected: {
        id: app.id,
        label: app.NAME,
        APP_CD: app.APP_CD,
      },
    });
    // console.log("appSelect onclick: ", {
    //   id: app.id,
    //   label: app.NAME,
    //   APP_CD: app.APP_CD,
    // },)
    // console.log("general: ", general)
    await getAllModulesByApp(app)
    history.push(
      app.defaultModule
        ? `/${app.APP_CD}/${app.defaultModule.MODULE_CD}`
        : `/${app.APP_CD}`
    );
  };

  useEffect(() => {
    (async () => {
      const response = await getAppsByUserId();
      if (response.status === 201 && response.data.elements.length > 0) {
        const sortApps = response?.data?.elements?.sort((a, b) => a.INDEX - b.INDEX);
        // console.log("sortApps: ", sortApps)
        setApps(sortApps);
      } else {
        setApps([]);
      }
    })();
  }, []);
  // console.log("apps: ", apps)

  return (
    <>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href
          id="appsDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <AppstoreOutlined />
        </a>
        <div
          style={{ width: 370 }}
          className="dropdown-menu p-0"
          aria-labelledby="appsDropdown"
        >
          <div className="px-3 py-2 d-flex align-items-center justify-content-between border-bottom">
            <p className="mb-0 fw-bold">Web Apps</p>
          </div>
          <div
            className="row g-0 p-1 "
            style={{
              // height: 400,
              overflowY: "auto",
              overflowX: "hidden",
              boxSizing: "border-box",
            }}
          >
            {apps && apps.length > 0 ? (
              apps.map((item, index) => {
                return (
                  <div key={item.id} className="col-4 text-center">
                    {item.TYPE === 0 ? (
                      <button
                      // style={{
                      //   height: "97px",
                      // }}
                        onClick={() => handleSetApp(item)}
                        className="dropdown-item d-flex flex-column align-items-center justify-content-center"
                      >
                        <img
                          alt="App Logo"
                          width={40}
                          height={40}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          src={`${imgUrl}/apps/${item.ICON_NAME}`}
                        />
                        <p className="tx-12 text-clamp">{item.NAME}</p>
                      </button>
                    ) : (
                      <a
                        target={"_blank"}
                        rel={"noreferrer"}
                        href={item.URL}
                        className="dropdown-item d-flex flex-column align-items-center justify-content-center"
                      >
                        <img
                          alt="App Logo"
                          width={40}
                          height={40}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                          src={`${imgUrl}/apps/${item.ICON_NAME}`}
                        />
                        <p className="tx-12 text-clamp">{item.NAME}</p>
                      </a>
                    )}
                  </div>
                );
              })
            ) : (
              <Empty style={{ marginTop: 20 }}>
                <Button onClick={() => setIsOpenMutation(true)} type="primary">
                  Create Now
                </Button>
              </Empty>
            )}
          </div>
        </div>
      </li>
      <MutationApp
        placeHolder={"User Management"}
        loading={isLoading}
        onOk={handleCreateApp}
        title={"Create App"}
        onCancel={() => setIsOpenMutation(false)}
        isOpen={isOpenMutation}
      />
    </>
  );
};

export default AppMenu;
