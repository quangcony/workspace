import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "general",
});

export const generalState = atom({
  key: "general",
  default: {
    appSelected: {
      id: undefined,
      label: undefined,
    },
    moduleSelected: {
      id: undefined,
      label: undefined,
    },
  },
  effects_UNSTABLE: [persistAtom],
});
