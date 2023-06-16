import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const workPlacesState = atom({
    key: "workPlacesState",
    default: [],
});

const selectWorkPlacesState = atom({
    key: "selectWorkPlacesState",
    default: undefined,
});

const selectWorkPlacesRecruitState = atom({
    key: "selectWorkPlacesRecruitState",
    default: undefined,
});

const workPlaceOptionsState = selector({
    key: "workPlaceOptionsState",
    get: ({ get }) => {
        const workPlaces = get(workPlacesState);
        if (workPlaces.length) {
            return selectOptions(workPlaces);
        }
        return [];
    }
})

export {
    workPlacesState,
    workPlaceOptionsState,
    selectWorkPlacesState,
    selectWorkPlacesRecruitState
}