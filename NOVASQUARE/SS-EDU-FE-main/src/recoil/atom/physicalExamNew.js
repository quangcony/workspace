import { atom } from "recoil";

const physicalExamNewState = atom({
    key: "physicalExamState",
    default: [],
});

const physicalExamNewRecruitState = atom({
    key: "physicalExamNewRecruitState",
    default: undefined,
});


export {
    physicalExamNewState,
    physicalExamNewRecruitState
}