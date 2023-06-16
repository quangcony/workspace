import React from "react";
import { languageState } from "../../../recoil/atom/languageState";
import { useRecoilState } from "recoil";

const LanguageSelect = () => {
  const [language, setLanguage] = useRecoilState(languageState);

  const languageList = [
    {
      lable: "English",
      value: "en",
      img: "https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg",
    },
    {
      lable: "Vietnamese",
      value: "vie",
      img: "https://cdn.pixabay.com/photo/2012/04/10/23/04/vietnam-26834_960_720.png",
    },
    {
      lable: "Japanese",
      value: "ja",
      img: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg",
    },
  ];

  return (
    <li className="nav-item dropdown">
      <div
        className="nav-link dropdown-toggle"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        style={{cursor: "pointer"}}
      >
        {languageList.map((row) => {
          return (
            language === row.value && (
              <>
                <img width={30} height={20} alt="" src={row.img} />{" "}
                <span className="ms-1 me-1 d-none d-md-inline-block">
                  {row.lable}
                </span>
              </>
            )
          );
        })}
      </div>
      <div className="dropdown-menu" aria-labelledby="languageDropdown">
        {languageList.map((row, index) => {
          return (
            <button
              className="dropdown-item py-2"
              onClick={() => {
                setLanguage(row.value);
              }}
            >
              <img width={30} height={20} alt="" src={row.img} />{" "}
              <span className="ms-1"> {row.lable} </span>
            </button>
          );
        })}
      </div>
    </li>
  );
};

export default LanguageSelect;
