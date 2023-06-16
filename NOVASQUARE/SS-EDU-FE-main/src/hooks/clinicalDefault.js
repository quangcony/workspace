import { useRecoilValue, useRecoilState } from "recoil"
import { userState } from "../recoil/atom/userState"
import { useEffect, useState } from "react"
import clinicalDefaultApi from "../api/ClinicalDefaultApi"
import { useSnackbar } from "notistack"

export const useClinicalDefault = () => {
  const [clinicaldefaults, setClinicaldefaults] = useState([])
  const [clinicaldefault, setClinicaldefault] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const [success, setSuccess] = useState(undefined)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" })
    }
    if (success) {
      enqueueSnackbar(success, { variant: "success" })
    }
  }, [error, success])

  useEffect(() => {
    getAllClinicalDefaults()
  }, [])

  const getAllClinicalDefaults = async () => {
    setIsLoading(true)
    try {
      let res = await clinicalDefaultApi.getAllClinicalDefaults()
      console.log("data :", res.data)
      if (res.data) {
        setClinicaldefaults(res.data.elements)
      }
      setIsLoading(false)
    } catch (error) {
      console.log("error:", error)
      setIsLoading(false)
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" })
      }
    }
  }
  const getClinicalDefault = async (id, callback) => {
    setIsLoading(true)
    try {
      let res = await clinicalDefaultApi.getClinicalDefault(id)
      if (res.data) {
        setClinicaldefault(res.data.elements.clinicalDefaultSetting)
        callback()
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" })
      }
    }
  }
  const createClinicalDefault = async (data, callback) => {
    setIsLoading(true)
    try {
      let res = await clinicalDefaultApi.createClinicalDefault(data)
      if (res.data) {
        getAllClinicalDefaults()
        setSuccess(res.data.message)
        setError(undefined)
        setIsLoading(false)
        callback()
        setClinicaldefault(undefined)
      }
    } catch (error) {
      setSuccess(undefined)
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" })
      }
      setIsLoading(false)
    }
  }

  const updateClinicalDefault = async (data, id, callback) => {
    setIsLoading(true)
    try {
      let res = await clinicalDefaultApi.updateClinicalDefault(data, id)
      if (res.data) {
        getAllClinicalDefaults()
        setSuccess(res.data.message)
        setError(undefined)
        setIsLoading(false)
        callback()
        setClinicaldefault(undefined)
      }
    } catch (error) {
      setSuccess(undefined)
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" })
      }
      setIsLoading(false)
    }
  }
  const deleteClinicalDefault = async (id) => {
    setIsLoading(true)
    try {
      let res = await clinicalDefaultApi.deleteClinicalDefault(id)
      if (res.data) {
        getAllClinicalDefaults()
        setSuccess(res.data.message)
        setError(undefined)
        setIsLoading(false)
      }
    } catch (error) {
      setSuccess(undefined)
      if (error?.response?.data.status !== 401) {
        enqueueSnackbar(error.response.data.message, { variant: "error" })
      }
      setIsLoading(false)
    }
  }

  return {
    clinicaldefaults,
    deleteClinicalDefault,
    clinicaldefault,
    getClinicalDefault,
    updateClinicalDefault,
    createClinicalDefault,
    getAllClinicalDefaults,
    isLoading,
    error,
    success,
    setClinicaldefault,
  }
}
