import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const genderState = atom({
    key: "genderState",
    default: [],
});

const genderOptionsState = selector({
    key: "genderOptionsState",
    get: ({ get }) => {
        const genders = get(genderState);
        if (genders.length) {
            return selectOptions(genders);
        }
        return [];
    }
})

export {
    genderState,
    genderOptionsState,
}