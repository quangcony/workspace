import { atom } from "recoil";

export const tabActiveState = atom({
    key: "tabActiveState",
    default: {
        personalInformation: false,
        medicalHistory: true,
        physicalExam: true,
        conclusions: true,
    }
})