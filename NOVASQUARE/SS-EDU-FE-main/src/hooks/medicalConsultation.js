import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import medicalConsultationApi from "../api/medicalConsultationApi";
import { medicalConsultationState, newestMedicalConsultationIdState } from "../recoil/atom/medicalConsultationState";

export const useMedicalConsultation = () => {
    const [medicalConsultations, setMedicalConsultations] = useState([]);
    const [medicalConsultation, setMedicalConsultation] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    const setMedicalConsultationList = useSetRecoilState(medicalConsultationState);
    const setNewestMedicalConsultationId = useSetRecoilState(newestMedicalConsultationIdState)

    useEffect(() => {
        getAllMedicalConsultations();
    }, []);

    const getAllMedicalConsultations = async () => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationApi.getAllMedicalConsultation();
            if (res.data) {
                setMedicalConsultations(res.data.elements);
                setMedicalConsultationList(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getMedicalConsultation = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationApi.getMedicalConsultation(id);
            if (res.data) {
                console.log("response:", res.data);
                setMedicalConsultation(res.data.elements.medicalConsultation);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createMedicalConsultation = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationApi.createMedicalConsultation(data);
            if (res.data) {
                getAllMedicalConsultations();
                setNewestMedicalConsultationId(() => res.data.elements.id);
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setMedicalConsultation(undefined);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateMedicalConsultation = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationApi.updateMedicalConsultation(data, id);
            if (res.data) {
                getAllMedicalConsultations();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setMedicalConsultation(undefined);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteMedicalConsultation = async (id) => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationApi.deleteMedicalConsultation(id);
            if (res.data) {
                getAllMedicalConsultations();
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
        medicalConsultations,
        medicalConsultation,
        getAllMedicalConsultations,
        getMedicalConsultation,
        createMedicalConsultation,
        updateMedicalConsultation,
        deleteMedicalConsultation,
        setMedicalConsultation,
        isLoading,
        error,
    };
};
