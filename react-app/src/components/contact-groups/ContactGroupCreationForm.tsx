/**
 * ContactGroupCreationForm.tsx
 * Description: Creates a new contact group and saves it in the file system
 */

import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Input, Message, FlexboxGrid, Col } from "rsuite";
const { ipcRenderer } = window.require("electron");

interface ContactGroupCreationFormProps {
    updateContactGroupsList(): void;
}

export default function ContactGroupCreationForm(props: ContactGroupCreationFormProps) {

    const [loading, setLoading] = useState(false);
    const contactGroupName = useRef("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        // remove all ipcRenderer events listeners before component unmounts
        return () => ipcRenderer.removeAllListeners(["create-contact-group-error", "create-contact-group-success"]);
    }, []);

    const createButtonClicked = async () => {
        setLoading(true);
        contactGroupName.current = (document.getElementById("contact-group-name") as HTMLInputElement).value;
        ipcRenderer.send("create-contact-group", contactGroupName.current);
    };

    ipcRenderer.on("create-contact-group-error", (event: any, errorMsg: any) => {
        setErrorMsg(errorMsg);
        setSuccessMsg("");
        setLoading(false);
    });

    ipcRenderer.on("create-contact-group-success", (event: any, successMsg: any) => {
        setSuccessMsg(successMsg);
        setErrorMsg("");
        setLoading(false);
        // tell the contact groups list to update
        props.updateContactGroupsList();
    });

    return <Form layout="inline" style={{ width: "100%", marginTop: "2rem" }}>
        <FlexboxGrid justify="start">
            <FlexboxGrid.Item as={Col} style={{ flexGrow: 4 }}>
                <Input name="contact-group-name" id="contact-group-name" placeholder="Name of new contact group"/>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ flexGrow: 1 }}>
                <Button name="submit" appearance="primary" onClick={createButtonClicked} loading={loading}>Create</Button>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <Message showIcon type="error" header={errorMsg} hidden={errorMsg ? false : true}/>
        <Message showIcon type="success" header={successMsg} hidden={successMsg ? false : true}/>
    </Form>;
}