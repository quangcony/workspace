import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const maritalState = atom({
    key: "maritalState",
    default: [],
});

const maritalOptionsState = selector({
    key: "maritalOptionsState",
    get: ({ get }) => {
        const maritals = get(maritalState);
        if (maritals.length) {
            return selectOptions(maritals);
        }
        return [];
    }
})

export {
    maritalState,
    maritalOptionsState,
}