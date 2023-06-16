import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import preclinicalDetailFileApi from "../api/preclinicalDetailFileApi";


export const usePreclinicalDetailFile = () => {
    const [preclinicDetails, setPreclinicDetails] = useState([]);
    const [preclinicDetail, setPreclinicDetail] = useState();
    const [preclinicDetailNew, setPreclinicDetailNew] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllPreclinicalDetailFiles();
    }, []);

    const getAllPreclinicalDetailFiles = async () => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailFileApi.getAllPreclinicalDetailFiles();
            if (res.data) {
                setPreclinicDetails(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getPreclinicalDetailFileById = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailFileApi.getPreclinicalDetailFileById(id);
            if (res.data) {
                setPreclinicDetail(res.data.elements.preclinicalDetailFile);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    const createPreclinicalDetailFile = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailFileApi.createPreclinicalDetailFile(data);
            if (res.data) {
                getAllPreclinicalDetailFiles();
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
    const updatePreclinicalDetailFile = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailFileApi.updatePreclinicalDetailFile(data, id);
            if (res.data) {
                getAllPreclinicalDetailFiles();
                // enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setPreclinicDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const deletePreclinicalDetailFile = async (id) => {
        setIsLoading(true);
        try {
            let res = await preclinicalDetailFileApi.deletePreclinicalDetailFile(id);
            if (res.data) {
                getAllPreclinicalDetailFiles();
                // enqueueSnackbar(res.data.message, { variant: "success" })
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
        getAllPreclinicalDetailFiles,
        getPreclinicalDetailFileById,
        createPreclinicalDetailFile,
        updatePreclinicalDetailFile,
        deletePreclinicalDetailFile,
        setPreclinicDetail,
        isLoading,
        error,
    };
};
