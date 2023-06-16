import { atom, selector } from "recoil"
import { specialDiseaseTypeState } from "./specialExamState";

const specialExamResultState = atom({
    key: "specialExamResultState",
    default: [],
});

const specialExamResultOptionsState = selector({
    key: "specialExamResultOptionsState",
    get: ({ get }) => {
        const resultList = get(specialExamResultState);
        const specialDiseaseType = get(specialDiseaseTypeState);

        if (resultList.length && specialDiseaseType !== undefined) {
            const data = resultList.filter(item => item.TYPE === specialDiseaseType);
            const options = data.filter((item) => item?.NAME)
                .map((item) => ({
                    value: String(item.id).concat("*-*", item.NAME),
                    label: item.NAME,
                    type: item?.NOTE,
                }))
            return options;
        }
        return [];
    }
});

export {
    specialExamResultState,
    specialExamResultOptionsState
}