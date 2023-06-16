import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import clinicalDetailApi from "../api/clinicDetailApi";

export const useClinicDetail = () => {
    const [clinicDetails, setClinicDetails] = useState([]);
    const [clinicDetail, setClinicDetail] = useState();
    const [clinicDetailNew, setClinicDetailNew] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllClinicalDetails();
    }, []);

    const getAllClinicalDetails = async () => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.getAllClinicalDetails();
            if (res.data) {
                setClinicDetails(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getClinicalDetailById = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.getClinicalDetailById(id);
            if (res.data) {
                console.log("response:", res.data);
                setClinicDetail(res.data.elements.clinicDetail);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    const createClinicalDetail = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.createClinicalDetail(data);
            if (res.data) {
                getAllClinicalDetails();
                setClinicDetailNew(res.data.elements)
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
                callback();
                setClinicDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    const updateClinicalDetail = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.updateClinicalDetail(data, id);
            if (res.data) {
                getAllClinicalDetails();
                enqueueSnackbar(res.data.message, { variant: "success" });
                setIsLoading(false);
                callback();
                setClinicDetail(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const deleteClinicalDetail = async (id) => {
        setIsLoading(true);
        try {
            let res = await clinicalDetailApi.deleteClinicalDetail(id);
            if (res.data) {
                getAllClinicalDetails();
                enqueueSnackbar(res.data.message, { variant: "success" });
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return {
        clinicDetails,
        clinicDetail,
        clinicDetailNew,
        getAllClinicalDetails,
        getClinicalDetailById,
        createClinicalDetail,
        updateClinicalDetail,
        deleteClinicalDetail,
        setClinicDetail,
        isLoading,
        error,
    };
};
