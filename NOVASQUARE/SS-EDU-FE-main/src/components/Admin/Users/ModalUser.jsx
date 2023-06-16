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
import { useUser } from "../../../hooks/user";

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
    FIRST_NAME: "",
    LAST_NAME: "",
    EMAIL: "",
    USER_NAME: "",
    PRIMARY_PHONE: "",
    USER_PW: "",
};

const ModalUser = ({ handleClose, open, userId, onRevert }) => {
    const { createUser, updateUser, getUser, user } = useUser()
    const [isSubmit, setIsSubmit] = useState(false);

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: Yup.object({
            FIRST_NAME: Yup.string().required("Please add First Name."),
            LAST_NAME: Yup.string().required("Please add Last Name"),
            USER_PW:
                !user &&
                Yup.string()
                    .min(8)
                    .required("Please add password.")
                    .matches(
                        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,20}/g,
                        "Invalid Password."
                    ),
            EMAIL: Yup.string()
                .required("Please add email.")
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),

            PRIMARY_PHONE: Yup.string()
                .required("Please add Phone Number.")
                .matches(
                    /^(?:\d{10}|\d{3}-\d{3}-\d{4}|\d{2}-\d{4}-\d{4}|\d{3}-\d{4}-\d{4})$/,
                    "Invalid Phone Number"
                ),
            USER_NAME: Yup.string().required("Please add User Name")
        }),
        onSubmit: async (values) => {
            if (userId) {
                await updateUser(values, userId)
                closeModal()
            } else {
                await createUser(values)
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
    const handleGetUser = async () => {
        await getUser(userId)
    }
    useEffect(() => {
        if(userId){
            handleGetUser()
        }
    }, [userId])
    useEffect(() => {
        if (userId && user) {
            formik.setValues(user)
        } else {
            formik.setValues(initialState)
        }
    }, [userId, user])


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
                    style={{ fontSize: 15 }}
                >
                    {userId ? "Edit User" : "Create User"}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ padding: "20px 10px", minWidth: 200 }}>
                        <Grid maxWidth={"sm"} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <TextField
                                    name={"FIRST_NAME"}
                                    onChange={formik.handleChange}
                                    value={formik.values.FIRST_NAME}
                                    label={"First Name"}
                                    maxLength={25}
                                    autoFocus={true}
                                    isRequire
                                    fullWidth
                                />
                                {isSubmit && formik.errors && formik.errors.FIRST_NAME && (
                                    <p className="text-danger">{formik.errors.FIRST_NAME}</p>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name={"LAST_NAME"}
                                    onChange={formik.handleChange}
                                    value={formik.values.LAST_NAME}
                                    label={"Last Name"}
                                    maxLength={25}
                                    isRequire
                                    fullWidth
                                />
                                {isSubmit && formik.errors && formik.errors.LAST_NAME && (
                                    <p className="text-danger">{formik.errors.LAST_NAME}</p>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name={"EMAIL"}
                                    onChange={formik.handleChange}
                                    value={formik.values.EMAIL}
                                    label={"Email"}
                                    maxLength={25}
                                    isRequire
                                    fullWidth
                                />
                                {isSubmit && formik.errors && formik.errors.EMAIL && (
                                    <p className="text-danger">{formik.errors.EMAIL}</p>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name={"USER_NAME"}
                                    onChange={formik.handleChange}
                                    value={formik.values.USER_NAME}
                                    label={"User Name"}
                                    maxLength={25}
                                    isRequire
                                    fullWidth
                                />
                                {isSubmit && formik.errors && formik.errors.USER_NAME && (
                                    <p className="text-danger">{formik.errors.USER_NAME}</p>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name={"PRIMARY_PHONE"}
                                    onChange={formik.handleChange}
                                    value={formik.values.PRIMARY_PHONE}
                                    label={"Phone Number"}
                                    maxLength={25}
                                    isRequire
                                    fullWidth
                                />
                                {isSubmit && formik.errors && formik.errors.PRIMARY_PHONE && (
                                    <p className="text-danger">{formik.errors.PRIMARY_PHONE}</p>
                                )}
                            </Grid>
                            {
                                !userId && <Grid item xs={12}>
                                    <TextField
                                        name={"USER_PW"}
                                        onChange={formik.handleChange}
                                        value={formik.values.USER_PW}
                                        label={"Password"}
                                        maxLength={255}
                                        isRequire
                                        type="password"
                                        fullWidth
                                    />
                                    {isSubmit && formik.errors && formik.errors.USER_PW && (
                                        <p className="text-danger">{formik.errors.USER_PW}</p>
                                    )}
                                </Grid>
                            }
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

export default ModalUser;