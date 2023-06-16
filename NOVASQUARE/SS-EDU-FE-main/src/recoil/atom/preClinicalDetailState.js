import { atom } from "recoil";

const newestPreclinicalDetailState = atom({
    key: "newestPreclinicalDetailState",
    default: undefined
});

const newestPreClinicalDetailRecruitState = atom({
    key: "newestPreClinicalDetailRecruitState",
    default: undefined
});

const preclinicalDetailState = atom({
    key: "preclinicalDetailState",
    default: undefined
});

const fileListState = atom({
    key: "fileListState",
    default: []
});

export {
    newestPreclinicalDetailState,
    newestPreClinicalDetailRecruitState,
    preclinicalDetailState,
    fileListState
}