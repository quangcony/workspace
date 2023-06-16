import { atom } from "recoil";

const booleanState = atom({
    key: "booleanState",
    default: [],
});

const isDownloadState = atom({
    key: "isDownloadState",
    default: false,
});

const isDeleteState = atom({
    key: "isDeleteState",
    default: true,
});

const isAccessConlusionState = atom({
    key: "isAccessConlusion",
    default: false
})

const statusRecruitState = atom({
    key: "statusRecruitState",
    default: null
})

const isShowState = atom({
    key: "isShowState",
    default: false
})

const isLoadingState = atom({
    key: "isLoadingState",
    default: false
})

const isSubmitState = atom({
    key: "isSubmitState",
    default: false
})

const isSearchState = atom({
    key: "isSearchState",
    default: false
})


export {
    booleanState,
    isDownloadState,
    isDeleteState,
    isAccessConlusionState,
    statusRecruitState,
    isShowState,
    isLoadingState,
    isSubmitState,
    isSearchState
}