import { atom } from "recoil";

const salaryContractAddSelectstate = atom({
    key: "salaryContractAddSelectstate",
    default: undefined,
});
const salaryContractSelectstate = atom({
    key: "salaryContractSelectstate",
    default: undefined,
});
const isViewState = atom({
    key: "isViewState",
    default: false,
});
export {
    salaryContractAddSelectstate,
    salaryContractSelectstate,
    isViewState

}