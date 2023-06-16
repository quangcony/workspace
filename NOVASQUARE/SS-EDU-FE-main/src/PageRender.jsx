import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./pages/404";
import SideBar from "./components/global/SideBar/SideBar";
import Header from "./components/global/Header/Header";
import Footer from "./components/global/Footer/Footer";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "./recoil/atom/authState";
import { useAuth } from "./hooks/auth";
import { generalState } from "./recoil/atom/generalState";
import { useApp } from "./hooks/app";
import { moduleMenuState } from "./recoil/atom/moduleMenuState";
import moduleApi from "./api/moduleApi";
import { useModule } from "./hooks/module";

const GeneratePage = (name, isLogged, appName, isValid, page, appSelected) => {
  const { moduleSelected } = useRecoilValue(generalState);
  const { profile } = useRecoilValue(authState);
  const component = () => {
    if (!appName) {
      // return require(`./pages/um`).default; tuan comment 2022.11.21
      return require(`./pages`).default; //new by tuan
    } else if (appName.startsWith("profile")) {
      return require(`./pages/${name}`).default;
    } else {
      if (!isValid && isValid !== undefined) {
        return require(`./pages/index`).default;
      }
      return require(`./pages/${appName}/${name}`).default;
    }
  };
  const userStatusPage = () => {
    if (!isValid && isValid !== undefined) {
      return require(`./pages/index`).default;
    }
    return require(`./pages/${appName}/${name}`).default;
  };

  const loginPage = () => {
    if (!page) {
      return require(`./pages/auth/login`).default;
    } else if (page !== "login") {
      return require(`./pages/auth/${page}`).default;
    } else {
      return require(`./pages/auth/login`).default;
    }
  };

  const [permissionsCD, setPermissionsCD] = useState();

  useEffect(() => {
    if (!moduleSelected) return;
    (async () => {
      const response = await moduleApi.getPermissionsByModuleId(
        moduleSelected?.id
      );
      if (response.data.elements.length > 0) {
        setPermissionsCD([
          ...response.data.elements.map((item) => item.PERMISSION_CD),
        ]);
      } else {
        setPermissionsCD([]);
      }
    })();
  }, [moduleSelected]);
  // console.log(isLogged ? "true" : "false");
  // console.log("name: ", name);
  // console.log("appName: ", appName);

  try {
    if (!isLogged) {
      return React.createElement(loginPage());
    }
    // if(profile?.User_Status && appSelected?.id === 0 && profile?.User_Status?.ACTION_LINK?.trim() !== "/"){
    //   console.log("profile?.User_Status")
    //   return React.createElement(component());
    // }
    if (!name.startsWith("auth")) {
      if (
        profile?.User_Status &&
        appSelected?.id === 0 &&
        profile?.User_Status?.ACTION_LINK?.trim() !== "/"
      ) {
        return React.createElement(component());
      } else {
        return (
          <>
            <SideBar />
            <div className="page-wrapper">
              <Header />
              {React.createElement(component(), {
                permissions_CD: permissionsCD,
              })}
              <Footer />
            </div>
          </>
        );
      }
    } else {
      return React.createElement(component());
    }
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { getAppsByUserId } = useApp();
  const { page, slug, id, appName } = useParams();
  const isLogged = localStorage.getItem("isLogged") || false;
  const { refreshToken } = useAuth();
  const { appSelected } = useRecoilValue(generalState);
  const [menuModules, setMenuModules] = useRecoilState(moduleMenuState);
  const [isValid, setIsValid] = useState(undefined);

  const handleGetProfile = async () => {
    await refreshToken();
  };

  React.useEffect(() => {
    handleGetProfile();
  }, []);

  React.useEffect(() => {
    // check if the current user has permission to accept appSelected
    if (appSelected?.id === 0) {
      setIsValid(true);
    } else {
      (async () => {
        const response = await getAppsByUserId();
        if (response.data.elements.length > 0) {
          const foundApp = response.data.elements.find(
            (app) => app.id === appSelected.id
          );
          if (foundApp) {
            setIsValid(true);
            return;
          }
          setMenuModules([]);
          setIsValid(false);
        }
      })();
    }
  }, [appSelected]);

  const { getAllModulesByApp, modulesByApp } = useModule();
  const handleGetModules = async (appSelected) => {
    await getAllModulesByApp(appSelected);
  };
  useEffect(() => {
    if (appSelected.id > -1) {
      handleGetModules(appSelected);
    }
  }, []);

  let name = "";

  if (page && !page.startsWith("auth") && isLogged) {
    if (page && appName.startsWith("profile")) {
      name = `${appName}/[id]`;
    } else {
      name = slug ? `${page}/${slug}` : `${page}`;
    }
  }

  return GeneratePage(name, isLogged, appName, isValid, page, appSelected);
};
export default PageRender;
