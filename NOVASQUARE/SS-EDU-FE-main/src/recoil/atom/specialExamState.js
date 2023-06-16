import { atom } from "recoil";

const specialExamState = atom({
    key: "specialExamState",
    default: [],
});

const newestSpecialExamState = atom({
    key: "newestSpecialExamState",
    default: undefined,
});

const specialExamTypeState = atom({
    key: "specialExamTypeState",
    default: undefined,
});

const specialDiseaseTypeState = atom({
    key: "specialDiseaseTypeState",
    default: undefined,
})

export {
    newestSpecialExamState,
    specialExamState,
    specialExamTypeState,
    specialDiseaseTypeState,
}