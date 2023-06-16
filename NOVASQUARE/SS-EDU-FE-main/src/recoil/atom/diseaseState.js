import { atom, selector } from "recoil";
import { arrayToTree } from "../../common";

const diseasesState = atom({
    key: "diseasesState",
    default: [],
});

const diseaseIdSelectState = atom({
    key: "diseaseIdSelectState",
    default: [],
});

const diseaseByQueryState = atom({
    key: "diseaseByQueryState",
    default: [],
});

const diseaseSelectState = atom({
    key: "diseaseSelectState",
    default: undefined,
});

const diseasesWithoutConsultationState = selector({
    key: "diseasesWithoutConsultationState",
    get: ({ get }) => {
        const diseaseList = get(diseasesState);
        if (diseaseList.length) {
            const newData = diseaseList.filter(disease => disease?.Medical_Consultation_Diseases?.length === 0);

            const modifyData = newData?.map((item) => ({
                title: item.NAME,
                value: item.id,
                key: item.id,
                ...item,
            }));
            return arrayToTree(modifyData);
        }
        return [];
    }
})

const diseaseOptionsState = selector({
    key: "diseaseOptionsState",
    get: ({ get }) => {
        const diseaseList = get(diseasesState);

        if (diseaseList.length) {
            const modifyData = diseaseList?.map((item) => ({
                title: item.NAME,
                value: item.id,
                key: item.id,
                ...item,
            }));
            return arrayToTree(modifyData);
        }
        return [];
    }
});

const medicalConsultationDiseaseState = selector({
    key: "medicalConsultationDiseaseState",
    get: ({ get }) => {
        const diseaseList = get(diseasesState);
        const diseaseIdList = get(diseaseIdSelectState);

        const data = diseaseIdList.map(id =>
            diseaseList.filter(item => item.id === id)
        )
        return data;
    }
})

export {
    diseasesState,
    diseaseIdSelectState,
    diseaseOptionsState,
    diseaseSelectState,
    medicalConsultationDiseaseState,
    diseasesWithoutConsultationState,
    diseaseByQueryState
}