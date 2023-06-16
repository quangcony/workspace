import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { i18nConfig } from "../lib/Language";
import { languageState } from "../recoil/atom/languageState";
import { useRecoilState, useRecoilValue } from "recoil";
import { logoState } from "../recoil/atom/logoState";
import Routes from "../routes/Routes";
import { useState, useEffect, useLayoutEffect } from "react";
import { authState } from "../recoil/atom/authState";
import { useOrg } from "../hooks/org";
import { imgUrl } from "../config/serverHost";

const Layout = () => {
  const { getOrg, isLoading: loadingLogo, getOrgByDefault } = useOrg();
  const { profile } = useRecoilValue(authState);
  const ORG_ID = profile?.ORG_ID;
  const [language, setLanguage] = useRecoilState(languageState);
  i18nConfig(language);
  const [logo, setLogo] = useState();
  const [org, setOrg] = useState();

  // change favicon according to org
  const changeFavicon = (url) =>{
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = url;
  }

  const handleGetOrgsbyId = async (ORG_ID) => {
    const data = await getOrg(ORG_ID);
    await changeFavicon(`${imgUrl}/orgs/${data.LOGO_NAME}`)
    document.title = data.NAME
    await setOrg(data)
    await setLogo(`${imgUrl}/orgs/${data.LOGO_NAME}`);
    
  };
  const handleGetOrgByDefault = async () => {
    const data = await getOrgByDefault();
    await changeFavicon(`${imgUrl}/orgs/${data.LOGO_NAME}`)
    document.title = data.NAME
    await setOrg(data)
    await setLogo(`${imgUrl}/orgs/${data.LOGO_NAME}`);
    
  };
  useLayoutEffect(() => {
    if (ORG_ID) {
      handleGetOrgsbyId(ORG_ID);
    } else {
      handleGetOrgByDefault();
    }
  }, []);

  return (
    <Router>
      <Route
        render={() => (
          <>
            <div className="main-wrapper">
              <Routes />
            </div>
          </>
        )}
      />
    </Router>
  );
};

export default Layout;
