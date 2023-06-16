import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import zoneApi from "../api/zoneApi";

export const useZone = () => {
    const [zones, setZones] = useState([]);
    const [zone, setZone] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllZones();
    }, []);

    const getAllZones = async () => {
        setIsLoading(true);
        try {
            let res = await zoneApi.getAllZones();
            if (res.data) {
                setZones(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getZone = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await zoneApi.getZone(id);
            if (res.data) {
                console.log("response:", res.data);
                setZone(res.data.elements.zone);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createZone = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await zoneApi.createZone(data);
            if (res.data) {
                getAllZones();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setZone(undefined);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateZone = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await zoneApi.updateZone(data, id);
            if (res.data) {
                getAllZones();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setZone(undefined);
            }
        } catch (error) {

            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteZone = async (id) => {
        setIsLoading(true);
        try {
            let res = await zoneApi.deleteZone(id);
            if (res.data) {
                getAllZones();
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
        zones,
        zone,
        getAllZones,
        getZone,
        createZone,
        updateZone,
        deleteZone,
        setZone,
        isLoading,
        error,
    };
};
