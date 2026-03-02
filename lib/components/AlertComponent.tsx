import {Alert, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import * as React from "react";
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles";

type success = "success";
type warning = "warning";
type error = "error";
type info = "info";

/**
 * @prop message is containing alert content
 * @prop severity contains the type of alert
 * @prop duration contains number of seconds in milliseconds
 * @prop destination contains string where it should appear
 * @prop customIcon optional custom icon to override the default severity icon
 */
export interface AlertMessage {
    message: string;
    severity: success | warning | error | info;
    duration?: number | undefined;
    destination: string;
    customIcon?: React.ReactNode;
}

/**
 * @prop origin is used to determine the window the alert should be visible
 * @prop ignoreParentComponentPosition If true, the component will always open centered at the top of the screen and will not be attached to the component.
 * @prop sx optional custom styling for the Alert component
 * @prop icon optional custom icon to override the default severity icon
 * */
interface AlertComponentProps{
    origin: string;
    ignoreParentComponentPosition?: boolean;
    sx?: SxProps<Theme>;
    icon: React.ReactNode;
}

/**
 * This component is an alert system that is able to visualize alerts sent by each component via the MessengerHelper.
 * Each message needs a destination. Each implementation of the AlertComponent requires an origin.
 * This is used to determine where the message should be displayed.
 */
export function AlertComponent(props: AlertComponentProps) {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [messageContent, setMessageContent] = useState<AlertMessage>({
        destination: "", message: "", severity: "success"
    });

    const handleClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const triggerAlert = new BroadcastChannel("triggerAlert");
        triggerAlert.onmessage = (message: MessageEvent<AlertMessage>) => {
            const data = message.data;
            if (props.origin === data.destination) {
                setSnackbarOpen(true);
                setMessageContent(data);
            }
        };
        return () => {
            triggerAlert.close();
        };
    }, [props.origin]);

    if (!props.ignoreParentComponentPosition)
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
                        icon={messageContent?.customIcon ?? props?.icon}
                        severity={messageContent.severity}
                        onClose={handleClose}
                        sx={{
                            boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                            border: "1px solid black",
                            borderRadius: "10px",
                            fontWeight: "bold",
                            ...props?.sx,
                        }}
                    >
                        {messageContent.message}
                    </Alert>
                </Snackbar>
            </div>
        )
    else return (
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
                icon={messageContent?.customIcon ?? props?.icon}
                severity={messageContent.severity}
                onClose={handleClose}
                sx={{
                    boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
                    border: "1px solid black",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    ...props?.sx,
                }}
            >
                {messageContent.message}
            </Alert>
        </Snackbar>
    );
}