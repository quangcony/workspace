import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const areaState = atom({
    key: "areaState",
    default: [],
});

const selectAreaState = atom({
    key: "selectAreaState",
    default: undefined,
});

const selectAreaRecruitState = atom({
    key: "selectAreaRecruitState",
    default: undefined,
});

const areaOptionsState = selector({
    key: "areaOptionsState",
    get: ({ get }) => {
        const areas = get(areaState);
        if (areas.length) {
            return selectOptions(areas);
        }
        return [];
    }
})

export {
    areaState,
    areaOptionsState,
    selectAreaState,
    selectAreaRecruitState
}