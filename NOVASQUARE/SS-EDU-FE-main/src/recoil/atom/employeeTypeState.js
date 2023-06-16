import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const employeeTypeState = atom({
    key: "employeeTypeState",
    default: [],
});

const selectEmployeeTypeState = atom({
    key: "selectEmployeeTypeState",
    default: undefined,
});

const employeeTypeOptionsState = selector({
    key: "employeeTypeOptionsState",
    get: ({ get }) => {
        const employeeType = get(employeeTypeState);
        if (employeeType.length) {
            return selectOptions(employeeType);
        }
        return [];
    }
})

export {
    employeeTypeState,
    employeeTypeOptionsState,
    selectEmployeeTypeState
}