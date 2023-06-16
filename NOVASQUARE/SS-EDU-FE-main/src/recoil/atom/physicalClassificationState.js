import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const physicalClassificationState = atom({
    key: "physicalClassificationState",
    default: [],
});

const physicalClassificationOptionsState = selector({
    key: "physicalClassificationOptionsState",
    get: ({ get }) => {
        const physicalClassifications = get(physicalClassificationState);
        if (physicalClassifications.length) {
            return selectOptions(physicalClassifications);
        }
        return [];
    }
})

export {
    physicalClassificationState,
    physicalClassificationOptionsState,
}