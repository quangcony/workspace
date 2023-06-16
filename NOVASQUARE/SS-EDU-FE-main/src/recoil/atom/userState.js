import { atom } from "recoil";

export const userState = atom({
    key: "user",
    default: [],
});

export const userListState = atom({
    key: "userListState",
    default: [],
})