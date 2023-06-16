import { atom } from "recoil";

const salarySelectstate = atom({
    key: "salarySelectstate",
    default: undefined,
});
const employeeSalaryState = atom({
    key: "employeeSalaryState",
    default: undefined,
})
const isApproveState = atom({
    key: "isApproveState",
    default: false,
})
export {
    salarySelectstate,
    employeeSalaryState,
    isApproveState
}