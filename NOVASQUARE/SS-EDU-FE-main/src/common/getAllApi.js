import areaApi from "../api/areaApi";
import cityApi from "../api/cityApi";
import departmentApi from "../api/departmentApi";
import diseaseApi from "../api/diseaseApi";
import diseaseStatusApi from "../api/diseaseStatusApi";
import districtApi from "../api/districtApi";
import divisionApi from "../api/divisionApi";
import employeeApi from "../api/employeeApi";
import employeeContractTypeApi from "../api/employeeContractTypeApi";
import genderApi from "../api/genderApi";
import generalSettingsApi from "../api/generalSettingsApi";
import healthHisApi from "../api/healthHisApi";
import maritalStatusApi from "../api/maritalStatusApi";
import medicalFacilityApi from "../api/medicalFacilityApi";
import physicalClassificationApi from "../api/physicalClassificationApi";
import physicalExamApi from "../api/physicalExamApi";
import positionApi from "../api/positionApi";
import unitApi from "../api/unitApi";
import workPlaceApi from "../api/workPlaceApi";
import axiosApiInstance from "../utils/axiosClient";


// GET ALL EMPLOYEE
export const employeeData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await employeeApi.getAllEmployees();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL PHYSICAL EXAM
export const physicalExamData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await physicalExamApi.getAllPhysicalExams();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL PHYSICAL EXAM BY QUERY
export const physicalExamByQueryData = (options, callback, data, isDelete) => {
    // if (options?.length === 0) {
    (async () => {
        const path = `physicalExam/getAllByQuery`;
        try {
            const res = await axiosApiInstance.post(path, data);
            if (res.data) {
                callback(() => res.data.elements);
            }
        } catch (err) {
            console.log(err);
        }
    })();
    // }
    if (isDelete === true) {
        (async () => {
            const path = `physicalExam/getAllByQuery`;
            try {
                const res = await axiosApiInstance.post(path, data);
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }
}

// GET ALL HEALTH HISTORY
export const healthHissData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await healthHisApi.getAllHealthHiss();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL DISEASE
export const diseasesData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await diseaseApi.getAllDisease();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET DISEASE BY QUERY
export const diseaseByQueryData = (options, callback, data) => {
    // if (options?.length === 0) {
    (async () => {
        const path = `disease/getAllByQuery`;
        try {
            const res = await axiosApiInstance.post(path, data);
            if (res.data) {
                callback(() => res.data.elements);
            }
        } catch (err) {
            console.log(err);
        }
    })();
    // }
}

//GET ALL MEDICAL FACILITY 
export const medicalFacilityData = (options, callback) => {
    (async () => {
        try {
            let res = await medicalFacilityApi.getAllMedicalFacilities();
            if (res.data) {
                callback(() => res.data.elements);
            }
        } catch (error) {
            console.log("error");
        }
    })();
}

// GET ALL GENDER 
export const genderData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await genderApi.getAllGenders();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL MARITAL
export const maritalStatusData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await maritalStatusApi.getAllMaritalStatuses();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL AREA
export const areaData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await areaApi.getAllAreas();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL DEPARTMENT
export const departmentData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await departmentApi.getAllDepartment();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL POSITION
export const positionData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await positionApi.getAllPosition();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL UNIT
export const unitData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await unitApi.getAllUnits();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL DIVISION
export const divisionData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await divisionApi.getAllDivisions();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL EMPLOYEE CONTRACT TYPE
export const employeeContractTypeData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await employeeContractTypeApi.getAllEmployeeContractTypes();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL WORK PLACE
export const workPlaceData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await workPlaceApi.getAllWorkPlaces();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL CITY
export const cityData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await cityApi.getAllCities();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL DISTRICT
export const districtData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await districtApi.getAllDistricts();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}
// GET ALL GENERAL SETTING
export const generalSettingData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await generalSettingsApi.getAllGeneralSettings();
                if (res.data) {
                    callback(() => res.data.elements.generalSetting);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

// GET ALL CLASSIFICATION
export const classificationData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await physicalClassificationApi.getAllPhysicalClassification();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}

export const diseaseStatusData = (options, callback) => {
    if (options?.length === 0) {
        (async () => {
            try {
                let res = await diseaseStatusApi.getAllDiseaseStatus();
                if (res.data) {
                    callback(() => res.data.elements);
                }
            } catch (error) {
                console.log("error");
            }
        })();
    }
}