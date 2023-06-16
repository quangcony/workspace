import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "auth",
});

export const authState = atom({
    key: "auth",
    default: {
        profile: "",
        isLogged: false
    },
    effects_UNSTABLE: [persistAtom],
});