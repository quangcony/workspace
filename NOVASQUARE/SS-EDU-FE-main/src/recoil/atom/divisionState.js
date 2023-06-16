import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const divisionState = atom({
    key: "divisionState",
    default: [],
});

const selectDivisionState = atom({
    key: "selectDivisionState",
    default: undefined,
});

const selectDivisionRecruitState = atom({
    key: "selectDivisionRecruitState",
    default: undefined,
});

const divisionOptionsState = selector({
    key: "divisionOptionsState",
    get: ({ get }) => {
        const divisions = get(divisionState);
        if (divisions.length) {
            return selectOptions(divisions);
        }
        return [];
    }
})

export {
    divisionState,
    divisionOptionsState,
    selectDivisionState,
    selectDivisionRecruitState
}