import { atom, selector } from "recoil";
import { selectOptions } from "../../common";
import { cityIdSelectState } from "./cityState";

const districtState = atom({
    key: "districtState",
    default: [],
});

const districtIdSelectState = atom({
    key: "districtSelected",
    default: undefined,
});

const districtOptionsState = selector({
    key: "wardOptions",
    get: ({ get }) => {
        const cityId = get(cityIdSelectState);
        const districts = get(districtState)

        if (cityId && districts.length) {
            const newList = districts.filter((item) => item.CITY_ID === cityId);
            return (selectOptions(newList))
        } else if (!cityId && districts.length) {
            return (selectOptions(districts))
        }

        return [];
    }
});

export {
    districtState,
    districtIdSelectState,
    districtOptionsState,
}