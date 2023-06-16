import { atom, selector } from "recoil";
import { userListState } from "./userState";

const employeeState = atom({
    key: "employeeState",
    default: [],
});

const employeeGetPhysicalExamState = atom({
    key: "employeeGetPhysicalExamState",
    default: [],
});

const employeeIdState = atom({
    key: "employeeIdState",
    default: [],
});

const employeeSelectState = atom({
    key: "employeeSelected",
    default: undefined,
})

const modifyEmployeeState = selector({
    key: "modifyEmployeeState",
    get: ({ get }) => {
        const users = get(userListState);
        const employees = get(employeeState);

        if (users.length > 0 && employees.length > 0) {
            const dataArr = [];
            users.forEach((user) => {
                employees.forEach((employee) => {
                    if (employee.USER_ID === user.id) {
                        let getcityName = {
                            CITY_NAME: employee.City?.CITY_NAME,
                        };
                        let getAreaName = { AREA_NAME: employee.Area?.AREA_NAME };
                        let getDepartmentName = {
                            DEPARTMENT_NAME: employee.Department?.DEPARTMENT_NAME,
                        };
                        let getDivisionName = {
                            DIVISION_NAME: employee.Division?.DIVISION_NAME,
                        };
                        let getUnitName = {
                            UNIT_NAME: employee.Unit?.UNIT_NAME,
                        };
                        let getWorkPlaceName = {
                            BRANCH_NAME: employee.Workplace?.BRANCH_NAME,
                        };
                        let getPositionName = {
                            POSITION_NAME: employee.Position?.POSITION_NAME,
                        };
                        let getMaritalName = {
                            MARITAL_STATUS_NAME: employee.Marital_Status?.MARITAL_STATUS_NAME,
                        };
                        let getEmployeeContracTypeName = {
                            EMPLOYEE_CONTRACT_NAME: employee.Position?.EMPLOYEE_CONTRACT_NAME,
                        };
                        const dataList = {
                            ...user,
                            ...employee,
                            ...getcityName,
                            ...getAreaName,
                            ...getDepartmentName,
                            ...getDivisionName,
                            ...getUnitName,
                            ...getWorkPlaceName,
                            ...getPositionName,
                            ...getMaritalName,
                            ...getEmployeeContracTypeName,
                        };
                        dataArr.push({ ...dataList });
                    }
                });
            });
            return dataArr;
        }
        return [];
    }
})

const filterEmployeeState = atom({
    key: "filterEmployeeState",
    default: undefined,
})


export {
    employeeState,
    employeeIdState,
    employeeSelectState,
    modifyEmployeeState,
    employeeGetPhysicalExamState,
    filterEmployeeState
}