import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const unitState = atom({
    key: "unitState",
    default: [],
});

const selectUnitState = atom({
    key: "selectUnitState",
    default: undefined,
});

const selectUnitRecruitState = atom({
    key: "selectUnitRecruitState",
    default: undefined,
});

const unitOptionsState = selector({
    key: "unitOptionsState",
    get: ({ get }) => {
        const units = get(unitState);
        if (units.length) {
            return selectOptions(units);
        }
        return [];
    }
})

export {
    unitState,
    unitOptionsState,
    selectUnitState,
    selectUnitRecruitState
}