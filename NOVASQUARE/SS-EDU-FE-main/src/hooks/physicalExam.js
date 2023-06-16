import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import physicalExamApi from "../api/physicalExamApi";
import { physicalExamNewState } from "../recoil/atom/physicalExamNew";
import { physicalExamsState } from "../recoil/atom/physicalExamState";

export const usePhysicalExam = () => {
    const [physicalExams, setPhysicalExams] = useState([]);
    const [physicalExam, setPhysicalExam] = useState();
    const [physicalExamNew, setPhysicalExamNew] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const { enqueueSnackbar } = useSnackbar();

    const setNewestPhysicalExam = useSetRecoilState(physicalExamNewState);
    const setPhysicalExamsState = useSetRecoilState(physicalExamsState);

    useEffect(() => {
        getAllPhysicalExams();
    }, []);

    const getAllPhysicalExams = async () => {
        setIsLoading(true);
        try {
            let res = await physicalExamApi.getAllPhysicalExams();
            if (res.data) {
                setPhysicalExams(res.data.elements);
                setPhysicalExamsState(res.data.elements)
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const getPhysicalExam = async (id, callback) => {
        setIsLoading(true);
        try {
            let res = await physicalExamApi.getPhysicalExam(id);
            if (res.data) {
                setPhysicalExam(res.data.elements.physicalExam);
                callback();
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };
    const createPhysicalExam = async (data, callback) => {
        setIsLoading(true);
        try {
            let res = await physicalExamApi.createPhysicalExam(data);
            if (res.data) {
                getAllPhysicalExams();
                setPhysicalExamNew(res.data.elements);
                setNewestPhysicalExam(res.data.elements);
                // enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setPhysicalExam(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };
    const updatePhysicalExam = async (data, id, callback) => {
        setIsLoading(true);
        try {
            let res = await physicalExamApi.updatePhysicalExam(data, id);
            if (res.data) {
                getAllPhysicalExams();
                // enqueueSnackbar(res.data.message, { variant: "success" })
                setIsLoading(false);
                callback();
                setPhysicalExam(undefined);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    const deletePhysicalExam = async (id) => {
        setIsLoading(true);
        try {
            let res = await physicalExamApi.deletePhysicalExam(id);
            if (res.data) {
                getAllPhysicalExams();
                enqueueSnackbar(res.data.message, { variant: "success" })
                setError(undefined);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return {
        physicalExams,
        physicalExam,
        getAllPhysicalExams,
        getPhysicalExam,
        createPhysicalExam,
        updatePhysicalExam,
        deletePhysicalExam,
        setPhysicalExam,
        isLoading,
        error,
        physicalExamNew,
        setPhysicalExamNew

    };
};
