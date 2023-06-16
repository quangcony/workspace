import { atom } from "recoil";

const physicalExamProcessState = atom({
    key: "physicalExamProcess",
    default: [],
});

const physicalExamFirseCreateRecruitState = atom({
    key: "physicalExamFirseCreateRecruitState",
    default: [],
});
const physicalExamOptionContinue = atom({
    key: "physicalExamOptionContinue",
    default: [],
})
const reLoadPhysicalExam = atom({
    key: "reLoadPhysicalExam",
    default: false,
})
const getPDFState = atom({
    key: "getPDF",
    default: false
})
export {
    physicalExamProcessState,
    physicalExamOptionContinue,
    reLoadPhysicalExam,
    getPDFState,
    physicalExamFirseCreateRecruitState
}