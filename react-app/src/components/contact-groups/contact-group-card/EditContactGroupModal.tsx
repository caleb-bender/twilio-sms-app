const { ipcRenderer } = window.require("electron");
import React, { useEffect, useState } from "react";
import { Modal, Button, FlexboxGrid, Col, Row } from "rsuite";
import ContactEntryCard from "../contacts/ContactEntryCard";

interface EditContactGroupModalProps {
    contactGroupName: string;
    isOpen: boolean;
    onClose(): void;
}

export default function EditContactGroupModal(props: EditContactGroupModalProps) {

    const [contactsList, setContactsList] = useState([]);

    ipcRenderer.on("get-contacts-success", (event: any, arg: any) => {
        setContactsList(arg);
    });
    
    const updateContactsList = () => {
        ipcRenderer.send("request-contacts", props.contactGroupName);
    };
    
    useEffect(() => {
        updateContactsList();
        return () => ipcRenderer.removeAllListeners(["get-contacts-success"]);
    }, []);


    return <Modal open={props.isOpen} onClose={props.onClose}>
        <Modal.Header>
        <Modal.Title>Edit "{props.contactGroupName}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FlexboxGrid justify="center">
                {contactsList.map((contact: any) => {
                    <FlexboxGrid.Item as={Row}>
                        <ContactEntryCard contactGroupName={props.contactGroupName}
                        firstName={contact.firstName} lastName={contact.lastName} phoneNumber={contact.phoneNumber}/>
                    </FlexboxGrid.Item>
                })}
            </FlexboxGrid>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.onClose} appearance="primary">
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>;
}