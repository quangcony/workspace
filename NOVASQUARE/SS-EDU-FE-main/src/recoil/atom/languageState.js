import { atom } from "recoil";

export const languageState = atom({
    key: "language",
    default: process.env.REACT_APP_LANGUAGE,
});