import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";

type success = "success";
type warning = "warning";
type error = "error";
type info = "info";

/**
 * @prop message is containing alert content
 * @prop severity contains the type of alert
 * @prop duration contains number of seconds in milliseconds
 * @prop origin contains string where it should appear
 */
export interface AlertMessage {
    message: string;
    severity: success | warning | error | info;
    duration?: number | undefined;
    destination: string;
}

/**
 * @prop origin is used to determine the window the alert should be visible
 */
interface AlertProps {
    origin: string;
}

/**
 * This component is an alert system that is able to visualize alerts sent by each component via the MessengerHelper.
 * Each message needs a destination. Each implementation of the AlertComponent requires an origin.
 * This is used to determine where the message should be displayed.
 */
export function AlertComponent(props: AlertProps) {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [messageContent, setMessageContent] = useState<AlertMessage>({
        destination: "", message: "", severity: "success"
    });

    const handleClose = () => {
        setSnackbarOpen(false);
    };
    const triggerAlert = new BroadcastChannel("triggerAlert");

    triggerAlert.onmessage = (message: MessageEvent<AlertMessage>) => {
        const data = message.data;
        if (props.origin === data.destination) {
            setSnackbarOpen(true);
            setMessageContent(data);
        }
    }
    return (
        <div style={{position: "relative", width: "100%"}}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={messageContent?.duration}
                onClose={handleClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                sx={{
                    position: "absolute"
                }}
            >
                <Alert
                    severity={messageContent.severity}
                    onClose={handleClose}
                    sx={{
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                        border: "1px solid black",
                        borderRadius: "10px",
                        fontWeight: "bold",
                    }}
                >
                    {messageContent.message}
                </Alert>
            </Snackbar>
        </div>
    )
}