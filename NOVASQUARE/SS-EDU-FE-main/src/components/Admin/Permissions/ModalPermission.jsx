import {
    Box,
    DialogActions,
    DialogContent,
    TextField,
    Dialog,
    Button,
    DialogTitle,
    IconButton,
    Grid,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { yellow, purple } from "@mui/material/colors";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { usePermission } from "../../../hooks/permission";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{ m: 0, p: 2, color: "#DD6B20" }}
            {...other}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ color: "white" }} />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

const ButtonPrimary = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    marginRight: 10,
    backgroundColor: "#DD6B20",
    "&:hover": {
        backgroundColor: "#DD6B20",
    },
    textTransform: "capitalize",
}));
const ButtonError = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    border: "1px solid #DD6B20",
    backgroundColor: "transparent",
    color: "#DD6B20",
    fontWeight: 600,
    "&:hover": {
        backgroundColor: "#DD6B20",
        color: "#ffffff",
    },
    textTransform: "capitalize",
}));

const initialState = {
    NAME: "",
    DESC: "",
};

const ModalPermission = ({ handleClose, open, permissionId, onRevert }) => {
    const { createPermission, updatePermission, getPermission, permission } = usePermission()
    const [isSubmit, setIsSubmit] = useState(false);


    const formik = useFormik({
        initialValues: initialState,
        validationSchema: Yup.object({
            NAME: Yup.string()
                .matches(/[^\s*].*[^\s*]/g)
                .required()
                .max(50)
                .label("Name Permission"),
            DESC: Yup.string()
                .matches(/[^\s*].*[^\s*]/g)
                .required()
                .max(255)
                .label("Description"),
        }),
        onSubmit: async (values) => {
            if (permissionId) {
                await updatePermission(values, permissionId)
                closeModal()
            } else {
                await createPermission(values)
                onRevert()
                closeModal()
            }
        },
    });
    const closeModal = () => {
        setIsSubmit(false);
        handleClose();
        formik.setValues(initialState);
    };
    const handleGetPermission = async () => {
        await getPermission(permissionId)
    }
    useEffect(() => {
       if(permissionId){
           handleGetPermission()
       }
    }, [permissionId])
    useEffect(() => {
        if (permissionId && permission) {
            formik.setValues(permission)
        } else {
            formik.setValues(initialState)
        }
    }, [permissionId, permission])


    return (
        <>
            <BootstrapDialog
                onClose={closeModal}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={closeModal}
                    style={{ fontSize: 15, color: '#DD6B20' }}
                >
                    {permissionId ? "Edit Permission" : "Create Permission"}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ padding: "20px 10px", minWidth: 200 }}>
                        <Grid maxWidth={"sm"} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    name={"NAME"}
                                    onChange={formik.handleChange}
                                    value={formik.values.NAME}
                                    label={"Name"}
                                    maxLength={25}
                                    autoFocus={true}
                                    isRequire
                                    fullWidth
                                />
                                {isSubmit && formik.errors && formik.errors.NAME && (
                                    <p className="text-danger">{formik.errors.NAME}</p>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name={"DESC"}
                                    onChange={formik.handleChange}
                                    value={formik.values.DESC}
                                    label={"Description"}
                                    maxLength={255}
                                    isRequire
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                                {isSubmit && formik.errors && formik.errors.DESC && (
                                    <p className="text-danger">{formik.errors.DESC}</p>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions style={{ justifyContent: "center" }}>
                    <ButtonPrimary
                        onClick={() => {
                            setIsSubmit(true);
                            formik.handleSubmit();
                        }}
                        variant="contained"
                    >
                        OK
                    </ButtonPrimary>
                    <ButtonError onClick={closeModal} variant="contained">
                        Cancel
                    </ButtonError>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

export default ModalPermission;