import { Alert, AlertTitle } from "@mui/material";
import { FC, ReactElement } from "react";
import { useCustomAlertStyles } from "./styles/CustomAlert";

export interface AlertInterface {
    open: boolean
    type: "success" | "error" | "info"
    title: string
    message: string
}

const CustomAlert: FC<AlertInterface> = (props): ReactElement => {
    const { open, type, title, message } = props;
    const styles= useCustomAlertStyles();
    if (open) {
        return (
            <Alert severity={type} className={styles.alert} >
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>)
    } else {
        return (<>{null}</>)
    }
}

export default CustomAlert;