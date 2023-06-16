import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import wardApi from "../api/wardApi";

export const useWard = () => {
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllWards();
    }, []);

    const getAllWards = async () => {
        setIsLoading(true);
        try {
            let res = await wardApi.getAllWards();
            if (res.data) {
                setWards(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getWard = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await wardApi.getWard(id);
            if (res.data) {
                console.log("response:", res.data);
                setWard(res.data.elements.ward);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createWard = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await wardApi.createWard(data);
            if (res.data) {
                getAllWards();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setWard(undefined);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateWard = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await wardApi.updateWard(data, id);
            if (res.data) {
                getAllWards();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setWard(undefined);
            }
        } catch (error) {

            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteWard = async (id) => {
        setIsLoading(true);
        try {
            let res = await wardApi.deleteWard(id);
            if (res.data) {
                getAllWards();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {

            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
        }
    };



    return {
        wards,
        ward,
        getAllWards,
        getWard,
        createWard,
        updateWard,
        deleteWard,
        setWard,
        isLoading,
        error,
    };
};
