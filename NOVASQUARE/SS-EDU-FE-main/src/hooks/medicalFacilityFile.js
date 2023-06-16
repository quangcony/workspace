import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import medicalFacilityFileApi from "../api/medicalFacilityFileApi";


export const useMedicalFacilityFile = () => {
    const [medicalFacilityFiles, setMedicalFacilityFiles] = useState([]);
    const [medicalFacilityFile, setMedicalFacilityFile] = useState();
    const [medicalFacilityFileNew, setMedicalFacilityFileNew] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllMedicalFacilityFiles();
    }, []);

    const getAllMedicalFacilityFiles = async () => {
        setIsLoading(true);
        try {
            let res = await medicalFacilityFileApi.getAllMedicalFacilityFiles();
            if (res.data) {
                setMedicalFacilityFiles(res.data.elements);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getMedicalFacilityFileById = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalFacilityFileApi.getMedicalFacilityFileById(id);
            if (res.data) {
                setMedicalFacilityFile(res.data.elements.preclinicalDetailFile);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    const createMedicalFacilityFile = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalFacilityFileApi.createMedicalFacilityFile(data);
            if (res.data) {
                getAllMedicalFacilityFiles();
                setMedicalFacilityFileNew(res.data.elements)
                // enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setMedicalFacilityFile(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    const updateMedicalFacilityFile = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await medicalFacilityFileApi.updateMedicalFacilityFile(data, id);
            if (res.data) {
                getAllMedicalFacilityFiles();
                // enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setMedicalFacilityFile(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const deleteMedicalFacilityFile = async (id) => {
        setIsLoading(true);
        try {
            let res = await medicalFacilityFileApi.deleteMedicalFacilityFile(id);
            if (res.data) {
                getAllMedicalFacilityFiles();
                // enqueueSnackbar(res.data.message, { variant: "success" })
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };



    return {
        medicalFacilityFiles,
        medicalFacilityFile,
        medicalFacilityFileNew,
        getAllMedicalFacilityFiles,
        getMedicalFacilityFileById,
        createMedicalFacilityFile,
        updateMedicalFacilityFile,
        deleteMedicalFacilityFile,
        setMedicalFacilityFile,
        isLoading,
        error,
    };
};
