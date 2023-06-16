import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useAuth } from "../../../hooks/auth";
import { authState } from "../../../recoil/atom/authState";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "antd";
import { imgUrl } from "../../../config/serverHost";
import { useRole } from "../../../hooks/role";
import i18n from '../../../lib/Language';

const UserMenu = () => {
  const { page } = useParams();

  const { logout } = useAuth();
  const handleLogout = async (e) => {
    // e.preventDefault();
    // console.log("Logout")
    await logout();
  };
  const { profile } = useRecoilValue(authState);
  const { Roles } = profile;

  return (
    <>
      <li className="nav-item dropdown">
        <Link
          to={`/profile/${profile?.id}`}
          className="nav-link dropdown-toggle"
          id="profileDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {profile?.FIRST_NAME + " " + profile?.LAST_NAME}
        </Link>
        <div className="dropdown-menu p-0" aria-labelledby="profileDropdown">
          <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
            <div className="mb-3">
              <Avatar size={64} src={profile?.AVATAR} />
            </div>
            <div className="text-center">
              <Link to={`/profile/${profile?.id}`}>
                <p className="tx-16 fw-bolder">
                  {profile?.FIRST_NAME} {profile?.LAST_NAME}
                </p>
              </Link>
              <p className="tx-12 text-muted">{profile?.EMAIL}</p>
              <p className="tx-12 text-muted">
                Roles:
                {Roles && Roles.length > 0
                  ? Roles.map((role, index) => {
                      if (index > 0) {
                        return ` || ${role.NAME}`;
                      } else {
                        return ` ${role.NAME}`;
                      }
                    })
                  : "Not Has Roles"}
              </p>
            </div>
          </div>
          <ul className="list-unstyled p-1">
            <li
              className={`dropdown-item ${
                page === "profile" ? "active" : ""
              }`}
            >
              <Link to={`/profile/${profile?.id}`} className="nav-link">
                <i className="me-2 icon-md" data-feather="user" />
                <span>{i18n.t("profile.lblProfile")}</span>
              </Link>
            </li>

            <li onClick={handleLogout} className="dropdown-item py-2">
              <a
                style={{ display: "flex"}}
                className="text-body ms-0"
                href
              >
                <i className="me-2 icon-md" data-feather="log-out" />
                <span>{i18n.t("profile.lblLogout")}</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
};

export default UserMenu;
