import { atom } from "recoil";

const medicalConsultationState = atom({
    key: "medicalConsultationState",
    default: [],
});

const newestMedicalConsultationIdState = atom({
    key: "newestMedicalConsultationState",
    default: undefined
})

export {
    medicalConsultationState,
    newestMedicalConsultationIdState
}