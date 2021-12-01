const { ipcRenderer } = window.require("electron");
import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, FlexboxGrid, Col, Row } from "rsuite";
import ContactEntryCard from "../contacts/ContactEntryCard";

interface EditContactGroupModalProps {
    contactGroupName: string;
    isOpen: boolean;
    onClose(): void;
}

export default function EditContactGroupModal(props: EditContactGroupModalProps) {

    const [contactsList, setContactsList] = useState([]);
    const hasRetrievedContacts = useRef(false);

    
    const updateContactsList = () => {
        ipcRenderer.send("request-contacts", props.contactGroupName);
    };
    
    if (props.isOpen && !hasRetrievedContacts.current) {
        hasRetrievedContacts.current = true;
        updateContactsList();
    }

    if (!props.isOpen) {
        hasRetrievedContacts.current = false;
    }

    useEffect(() => {
        ipcRenderer.on(`get-contacts-success-for-${props.contactGroupName}`, (event: any, arg: any) => {
            setContactsList(arg);
        });
        return () => ipcRenderer.removeAllListeners(["get-contacts-success"]);
    }, []);


    return <Modal open={props.isOpen} onClose={props.onClose}>
        <Modal.Header>
        <Modal.Title>Edit Contact Group "{props.contactGroupName}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FlexboxGrid justify="center">
                {contactsList.map((contact: any) => <FlexboxGrid.Item as={Row} key={`${contact.firstName} ${contact.lastName}`}>
                        <ContactEntryCard contactGroupName={props.contactGroupName}
                        firstName={contact.firstName} lastName={contact.lastName} phoneNumber={contact.phoneNumber}/>
                    </FlexboxGrid.Item>)}
            </FlexboxGrid>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>;
}