import { atom } from "recoil";

const newestClinicalDetailState = atom({
    key: "newestClinicalDetailState",
    default: undefined
});

const newestClinicalDetailRecruitState = atom({
    key: "newestClinicalDetailRecruitState",
    default: undefined
});

const clinicalDetailState = atom({
    key: "clinicalDetailState",
    default: undefined
});

export {
    newestClinicalDetailState,
    clinicalDetailState,
    newestClinicalDetailRecruitState
}