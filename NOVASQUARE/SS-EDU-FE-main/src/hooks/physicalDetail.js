import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import physicalDetailApi from "../api/physicalDetailApi";
import { newestPhysicalDetailState, physicalDetailState } from "../recoil/atom/physicalDetailState";

export const usePhysicalDetail = () => {
    const [physicalDetails, setPhysicalDetails] = useState([]);
    const [physicalDetail, setPhysicalDetail] = useState();
    const [physicalDetailNew, setPhysicalDetailNew] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    const setPhysicalDetailState = useSetRecoilState(physicalDetailState);
    const setNewestPhysicalDetailState = useSetRecoilState(newestPhysicalDetailState);

    useEffect(() => {
        getAllPhysicalDetails();
    }, []);

    const getAllPhysicalDetails = async () => {
        setIsLoading(true);
        try {
            let res = await physicalDetailApi.getAllPhysicalDetails();
            if (res.data) {
                setPhysicalDetails(res.data.elements);
                setPhysicalDetailState(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getPhysicalDetail = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await physicalDetailApi.getPhysicalDetail(id);
            if (res.data) {
                setPhysicalDetail(res.data.elements.physicalDetail);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    const createPhysicalDetail = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await physicalDetailApi.createPhysicalDetail(data);
            if (res.data) {
                getAllPhysicalDetails();
                setPhysicalDetailNew(res.data.elements);
                setNewestPhysicalDetailState(res.data.elements);
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
                callback();
                setPhysicalDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    const updatePhysicalDetail = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await physicalDetailApi.updatePhysicalDetail(data, id);
            if (res.data) {
                getAllPhysicalDetails();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setPhysicalDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const deletePhysicalDetail = async (id) => {
        setIsLoading(true);
        try {
            let res = await physicalDetailApi.deletePhysicalDetail(id);
            if (res.data) {
                getAllPhysicalDetails();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return {
        physicalDetails,
        physicalDetail,
        physicalDetailNew,
        getAllPhysicalDetails,
        getPhysicalDetail,
        createPhysicalDetail,
        updatePhysicalDetail,
        deletePhysicalDetail,
        setPhysicalDetail,
        isLoading,
        error,
    };
};
