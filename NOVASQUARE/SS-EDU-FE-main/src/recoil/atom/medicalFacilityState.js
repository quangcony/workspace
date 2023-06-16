import { atom, selector } from "recoil";
import { selectOptions } from "../../common";
import { cityIdSelectState } from "./cityState";
import { countryIdSelectState } from "./countryState";

const medicalFacilityState = atom({
    key: 'medicalFacilityState',
    default: [],
});

const medicalFacilityOptionsState = selector({
    key: "medicalFacilityOptionsState",
    get: ({ get }) => {
        const countryId = get(countryIdSelectState);
        const cityId = get(cityIdSelectState)

        const medicalFacilities = get(medicalFacilityState);

        if (countryId && medicalFacilities.length) {
            const newList = medicalFacilities.filter(
                (item) => item?.COUNTRY_ID === countryId
            );
            if (cityId) {
                const newData = newList.filter(
                    (item) => item?.CITY_ID === cityId);

                return selectOptions(newData);
            }

            return (selectOptions(newList));
        }
        else if (!countryId && medicalFacilities.length) {

            return (selectOptions(medicalFacilities));
        }

        return [];
    }
});

export {
    medicalFacilityState,
    medicalFacilityOptionsState,
}