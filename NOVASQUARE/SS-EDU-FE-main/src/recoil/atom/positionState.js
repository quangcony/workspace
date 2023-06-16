import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const positionState = atom({
    key: "positionState",
    default: [],
});
const selectPositionState = atom({
    key: "selectPositionState",
    default: undefined,
});

const selectPositionRecruitState = atom({
    key: "selectPositionRecruitState",
    default: undefined,
});

const positionOptionsState = selector({
    key: "positionOptionsState",
    get: ({ get }) => {
        const positions = get(positionState);
        if (positions.length) {
            return selectOptions(positions);
        }
        return [];
    }
})

export {
    positionState,
    positionOptionsState,
    selectPositionState,
    selectPositionRecruitState
}