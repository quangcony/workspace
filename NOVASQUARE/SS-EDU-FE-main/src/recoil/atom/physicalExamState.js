import { atom } from "recoil";

const physicalExamsState = atom({
    key: "physicalExamsState",
    default: [],
});

const physicalExamState = atom({
    key: "physicalExamState",
    default: [],
});

const physicalExamIdState = atom({
    key: "physicalExamIdState",
    default: [],
});

const physicalExamRecruitIdState = atom({
    key: "physicalExamRecruitIdState",
    default: undefined,
});

const physicalExamSelectState = atom({
    key: "physicalExamSelected",
    default: undefined,
});

const physicalExamSelectRecruitState = atom({
    key: "physicalExamSelectRecruitState",
    default: undefined,
});

const physicalExamIdCreateState = atom({
    key: "physicalExamIdCreateState",
    default: undefined,
});

const newestPhysicalExamState = atom({
    key: "newestPhysicalExamState",
    default: undefined
});

const historyInfoState = atom({
    key: "historyInfoState",
    default: undefined
});
const physicalExamRecruimentState = atom({
    key: "physicalExamRecruimentState",
    default: []
});
const physicalExamPDFState = atom({
    key: "physicalExamRecruimentState",
    default: undefined
})
const physicalExamOptionState = atom({
    key: "physicalExamOptionState",
    default: [],
});
const physicalExamOptionStateOccupation = atom({
    key: "physicalExamOptionStateOccupation",
    default: [],
});
const physicalExamOptionStateRecruit = atom({
    key: "physicalExamOptionStateRecruit",
    default: [],
});
const physicalExamOptionStateHardToxic = atom({
    key: "physicalExamOptionStateHardToxic",
    default: [],
})
export {
    physicalExamsState,
    physicalExamState,
    physicalExamSelectState,
    physicalExamIdCreateState,
    newestPhysicalExamState,
    physicalExamIdState,
    historyInfoState,
    physicalExamRecruimentState,
    physicalExamPDFState,
    physicalExamSelectRecruitState,
    physicalExamRecruitIdState,
    physicalExamOptionState,
    physicalExamOptionStateOccupation,
    physicalExamOptionStateRecruit,
    physicalExamOptionStateHardToxic
}