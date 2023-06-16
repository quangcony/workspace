import { atom, selector } from "recoil";
import { selectOptions } from "../../common";

const departmentState = atom({
    key: "departmentState",
    default: [],
});

const selectDepartmentState = atom({
    key: "selectDepartmentState",
    default: undefined,
});

const selectDepartmentRecruitState = atom({
    key: "selectDepartmentRecruitState",
    default: undefined,
});

const departmentOptionsState = selector({
    key: "departmentOptionsState",
    get: ({ get }) => {
        const departments = get(departmentState);
        if (departments.length) {
            return selectOptions(departments);
        }
        return [];
    }
})

export {
    departmentState,
    departmentOptionsState,
    selectDepartmentState,
    selectDepartmentRecruitState
}