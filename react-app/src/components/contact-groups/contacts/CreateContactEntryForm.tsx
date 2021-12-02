/**
 * CreateContactEntryForm.tsx
 * Description: a form that the user can use to create a new contact entry
 */

 import React, { useEffect, useRef, useState } from "react";
import { Form, FlexboxGrid, Col, Button, Input, Message } from "rsuite";
const { ipcRenderer } = window.require("electron");
import "./CreateContactEntryForm.css";

interface ContactEntrySchema {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export default function CreateContactEntryForm() {

    const [loading, setLoading] = useState(false);
    const contactEntry = useRef({} as ContactEntrySchema);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        ipcRenderer.on("create-contact-entry-error", (event: any, errorMsg: any) => {
            setErrorMsg(errorMsg);
            setSuccessMsg("");
            setLoading(false);
        });
        
        ipcRenderer.on("create-contact-entry-success", (event: any, successMsg: any) => {
            setSuccessMsg(successMsg);
            setErrorMsg("");
            setLoading(false);
        });
        // remove all ipcRenderer events listeners before component unmounts
        return () => ipcRenderer.removeAllListeners(["create-contact-entry-error", "create-contact-entry-success"]);
    }, []);
    
    const createButtonClicked = () => {
        setLoading(true);
        contactEntry.current.firstName = (document.getElementById("contact-group-first-name") as HTMLInputElement).value;
        contactEntry.current.lastName = (document.getElementById("contact-group-last-name") as HTMLInputElement).value;
        contactEntry.current.phoneNumber = (document.getElementById("contact-group-phone-number") as HTMLInputElement).value;
        ipcRenderer.send("create-contact-entry", contactEntry.current);
    };
    
    const hideErrorAndSuccessMessages = () => {
        setSuccessMsg("");
        setErrorMsg("");
    };


    return <Form layout="inline" style={{ width: "100%", marginTop: "2rem" }}>
        <FlexboxGrid justify="start">
            <FlexboxGrid.Item as={Col} style={{ flexGrow: 4 }}>
                <Input name="contact-entry-first-name" id="contact-entry-first-name" placeholder="First Name" onFocus={hideErrorAndSuccessMessages}/>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ flexGrow: 4 }}>
                <Input name="contact-entry-last-name" id="contact-entry-last-name" placeholder="Last Name" onFocus={hideErrorAndSuccessMessages}/>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ flexGrow: 4 }}>
                <Input name="contact-entry-phone" id="contact-entry-phone" type="phone" placeholder="Phone Number" onFocus={hideErrorAndSuccessMessages}/>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ flexGrow: 1 }}>
                <Button name="submit" appearance="primary" onClick={createButtonClicked} loading={loading}>Create</Button>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <Message showIcon type="error" header="Error" hidden={errorMsg ? false : true}>
            {errorMsg}
        </Message>
        <Message showIcon type="success" header="Success" hidden={successMsg ? false : true}>
            {successMsg}
        </Message>
    </Form>;
}