import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const countryState = atom({
    key: "countryState",
    default: [],
});

const countryIdSelectState = atom({
    key: "countrySelected",
    default: undefined,
});

const countryOptionsState = selector({
    key: "countryOptions",
    get: ({ get }) => {
        const countries = get(countryState);
        if (countries.length) {
            return selectOptions(countries);
        }
        return [];
    }
});

export {
    countryState,
    countryIdSelectState,
    countryOptionsState,
}