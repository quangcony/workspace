import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const diseasesStatusState = atom({
    key: "diseasesStatusState",
    default: []
});

const diseaseStatusOptionsState = selector({
    key: "diseaseStatusOptionsState",
    get: ({ get }) => {
        const diseaseStatusList = get(diseasesStatusState);

        if (diseaseStatusList.length) {
            return selectOptions(diseaseStatusList);
        }
        return [];
    }
})

export {
    diseasesStatusState,
    diseaseStatusOptionsState
}