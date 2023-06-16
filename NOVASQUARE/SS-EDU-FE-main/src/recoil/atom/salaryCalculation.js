import { atom } from "recoil";

export const salaryCalculationCreateState = atom({
    key: "salaryCalculationCreateState",
    default: undefined,
});

export const countState = atom({
    key: "countState",
    default: 0,
});
export const noCountState = atom({
    key: "noCountState",
    default: 0,
});