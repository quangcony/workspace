import { atom } from "recoil";

const newestPhysicalExamResultState = atom({
    key: "newestPhysicalExamResultState",
    default: undefined
});

const newestPhysicalExamResultRecruitState = atom({
    key: "newestPhysicalExamResultRecruitState",
    default: undefined
});

const physicalExamResultState = atom({
    key: "physicalExamResultState",
    default: undefined
});

export {
    newestPhysicalExamResultState,
    newestPhysicalExamResultRecruitState,
    physicalExamResultState,
}