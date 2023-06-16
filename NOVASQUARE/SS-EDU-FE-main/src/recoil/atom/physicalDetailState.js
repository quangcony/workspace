import { atom, selector } from "recoil";

const physicalDetailState = atom({
    key: "physicalDetailState",
    default: []
});

const physicalDetailIdState = atom({
    key: "physicalDetailIdState",
    default: undefined
});

const physicalDetailByIdState = selector({
    key: "physicalDetailByIdState",
    get: ({ get }, id) => {
        const physicalDetailList = get(physicalDetailState);

        return physicalDetailList;
    }
});

const newestPhysicalDetailState = atom({
    key: "physicalDetailSelected",
    default: undefined
});

const newestPhysicalDetailRecruitState = atom({
    key: "newestPhysicalDetailRecruitState",
    default: undefined
});

const valueHeightState = atom({
    key: "valueHeightState",
    default: undefined
});

const valueWeightState = atom({
    key: "valueWeightState",
    default: undefined
});

export {
    physicalDetailState,
    physicalDetailByIdState,
    newestPhysicalDetailState,
    physicalDetailIdState,
    valueHeightState,
    valueWeightState,
    newestPhysicalDetailRecruitState
}