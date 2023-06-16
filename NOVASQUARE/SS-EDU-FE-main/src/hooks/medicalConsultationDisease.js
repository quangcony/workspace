import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import medicalConsultationDiseaseApi from "../api/medicalConsultationDiseaseApi";

export const useMedicalConsultationDisease = () => {
    const [medicalConsultationDiseases, setMedicalConsultationDiseases] = useState([]);
    const [medicalConsultationDisease, setMedicalConsultationDisease] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllMedicalConsultationDiseases();
    }, []);

    const getAllMedicalConsultationDiseases = async () => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationDiseaseApi.getAllMedicalConsultationDisease();
            if (res.data) {
                setMedicalConsultationDiseases(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };

    const getMedicalConsultationDisease = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationDiseaseApi.getMedicalConsultationDisease(id);
            if (res.data) {
                console.log("response:", res.data);
                setMedicalConsultationDisease(res.data.elements.medicalConsultationDisease);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            enqueueSnackbar("Request failed !", { variant: "error" })
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const createMedicalConsultationDisease = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationDiseaseApi.createMedicalConsultationDisease(data);
            if (res.data) {
                getAllMedicalConsultationDiseases();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setMedicalConsultationDisease(undefined);
            }
        } catch (error) {
            // enqueueSnackbar("Request failed !", { variant: "error" })
            setIsLoading(false);
            // enqueueSnackbar("Request failed !", { variant: "error" })
        }
    };
    const updateMedicalConsultationDisease = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationDiseaseApi.updateMedicalConsultationDisease(data, id);
            if (res.data) {
                getAllMedicalConsultationDiseases();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setMedicalConsultationDisease(undefined);
            }
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" })
            setIsLoading(false);
        }
    };

    const deleteMedicalConsultationDisease = async (id) => {
        setIsLoading(true);
        try {
            let res = await medicalConsultationDiseaseApi.deleteMedicalConsultationDisease(id);
            if (res.data) {
                getAllMedicalConsultationDiseases();
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
        medicalConsultationDiseases,
        medicalConsultationDisease,
        getAllMedicalConsultationDiseases,
        getMedicalConsultationDisease,
        createMedicalConsultationDisease,
        updateMedicalConsultationDisease,
        deleteMedicalConsultationDisease,
        setMedicalConsultationDisease,
        isLoading,
        error,
    };
};
