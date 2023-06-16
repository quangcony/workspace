import { atom, selector } from "recoil";
import { employeeSelectState } from "./employeeState";

const healthHistoryState = atom({
    key: "healthHistoryState",
    default: [],
});

const healthHistoryByUserState = selector({
    key: "healthHistoryByUserState",
    get: ({ get }) => {
        const healthHistoryList = get(healthHistoryState);
        const employee = get(employeeSelectState);
        if (healthHistoryList.length && employee) {
            return healthHistoryList.filter(item => item?.USER_ID === employee.USER_ID);
        }
        return [];
    }
});

const healthHistoryStatusState = atom({
    key: "healthHistoryStatus",
    default: [],
});

const addHealthHisStatus = (healthHistoryStatus, item) => {
    const newHealthHis = [...healthHistoryStatus];

    newHealthHis.push({
        ...item,
        id: new Date().getTime()
    })

    return newHealthHis;
}

const deleteHealthHisStatus = (healthHistoryStatus, item) => {
    const newHealthHis = [...healthHistoryStatus];
    return newHealthHis.filter(x => x.id !== item.id)
}

export {
    healthHistoryState,
    healthHistoryByUserState,
    healthHistoryStatusState,
    addHealthHisStatus,
    deleteHealthHisStatus
}