import { atom, selector } from "recoil";
import { selectOptions } from "../../common";
import { countryIdSelectState } from "./countryState";

const cityState = atom({
    key: "cityState",
    default: [],
});

const cityIdSelectState = atom({
    key: "citySelected",
    default: undefined,
});

const selectCityState = atom({
    key: "selectCityState",
    default: undefined,
});

const cityOptionsState = selector({
    key: "cityOptions",
    get: ({ get }) => {
        const countryId = get(countryIdSelectState);
        const cities = get(cityState)

        if (countryId && cities.length) {
            const newList = cities.filter(
                (city) => city.COUNTRY_ID === countryId
            );

            return (selectOptions(newList));
        }
        else if (!countryId && cities.length) {

            return (selectOptions(cities));
        }

        return [];
    }
});

export {
    cityState,
    cityIdSelectState,
    cityOptionsState,
    selectCityState
}