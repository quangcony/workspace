import { atom } from "recoil";

const fileListState = atom({
    key: "fileList",
    default: [],
});

export { fileListState }