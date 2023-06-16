import React, { useEffect, useState } from "react";
import i18n from "../../../lib/Language";
import NavBar from "./NavBar";
import { useOrg } from "../../../hooks/org";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atom/authState";
const Header = () => {
  const { getOrg, isLoading: loadingLogo, getOrgByDefault } = useOrg();
  const { profile } = useRecoilValue(authState);
  const ORG_ID = profile?.ORG_ID;
  const [org, setOrg] = useState();

  const handleGetOrgsbyId = async (ORG_ID) => {
    const data = await getOrg(ORG_ID);
    setOrg(data);
  };
  const handleGetOrgByDefault = async () => {
    const data = await getOrgByDefault();
    setOrg(data);
  };
  useEffect(() => {
    if (ORG_ID) {
      handleGetOrgsbyId(ORG_ID);
    } else {
      handleGetOrgByDefault();
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        <a href="#" className="sidebar-toggler">
          <i data-feather="menu" />
        </a>
        <div className="navbar-content">
          <a className="nav-link nav-title" style={{ paddingTop: 20 }}>
            {i18n.t("general.msgWelcome")}{" "}{org?.NAME}
          </a>
          {/* <form className="search-form">
            <div className="input-group">
              <div className="input-group-text">
                <i data-feather="search" />
              </div>
              <input type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
            </div>
          </form> */}
          <NavBar />
        </div>
      </nav>
    </>
  );
};

export default Header;
