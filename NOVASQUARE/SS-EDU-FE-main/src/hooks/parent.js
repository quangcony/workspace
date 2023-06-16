import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import parentApi from "../api/parentApi";

export const useParent = () => {
    const [parents, setParents] = useState([]);
    const [parent, setParent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllParents();
    }, []);

    const getAllParents = async () => {
        setIsLoading(true);
        try {
            let res = await parentApi
                .getAllParents();
            if (res.data) {
                setParents(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getParent = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await parentApi
                .getParent(id);
            if (res.data) {
                console.log("response:", res.data);
                setParent(res.data.elements.parent);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createParent = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await parentApi
                .createParent(data);
            if (res.data) {
                getAllParents();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setParent(undefined);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateParent = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await parentApi
                .updateParent(data, id);
            if (res.data) {
                getAllParents();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setParent(undefined);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteParent = async (id) => {
        setIsLoading(true);
        try {
            let res = await parentApi
                .deleteParent(id);
            if (res.data) {
                getAllParents();
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
        parents,
        parent,
        getAllParents,
        getParent,
        createParent,
        updateParent,
        deleteParent,
        setParent,
        isLoading,
        error,
    };
};
