import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "setting",
});

export const settingState = atom({
    key: "setting",
    default: {
        theme: "light"
    },
    effects_UNSTABLE: [persistAtom],
});