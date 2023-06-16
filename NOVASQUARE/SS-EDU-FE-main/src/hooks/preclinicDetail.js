import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import preclinicalDetailApi from "../api/preclinicDetailApi";


export const usePreclinicDetail = () => {
    const [preclinicDetails, setPreclinicDetails] = useState([]);
    const [preclinicDetail, setPreclinicDetail] = useState();
    const [preclinicDetailNew, setPreclinicDetailNew] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllPreclinicalDetails();
    }, []);

    const getAllPreclinicalDetails = async () => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailApi.getAllPreclinicalDetails();
            if (res.data) {
                setPreclinicDetails(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getPreclinicalDetailById = async (id, callback) => {
        setIsLoading(true);
        return new Promise(async (resolve, reject) => {
        try {
            let res = await preclinicalDetailApi.getPreclinicalDetailById(id);
            if (res.data) {
                setPreclinicDetail(res.data.elements.preclinicalDetail);
                callback();
                resolve(res.data.elements.preclinicalDetail)
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            reject(error)
        }})
    };
    const createPreclinicalDetail = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailApi.createPreclinicalDetail(data);
            if (res.data) {
                getAllPreclinicalDetails();
                setPreclinicDetailNew(res.data.elements)
                // enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setPreclinicDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    const updatePreclinicalDetail = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailApi.updatePreclinicalDetail(data, id);
            if (res.data) {
                getAllPreclinicalDetails();
                // enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setPreclinicDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const deletePreclinicalDetail = async (id) => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailApi.deletePreclinicalDetail(id);
            if (res.data) {
                getAllPreclinicalDetails();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };



    return {
        preclinicDetails,
        preclinicDetail,
        preclinicDetailNew,
        getAllPreclinicalDetails,
        getPreclinicalDetailById,
        createPreclinicalDetail,
        updatePreclinicalDetail,
        deletePreclinicalDetail,
        setPreclinicDetail,
        isLoading,
        error,
    };
};
