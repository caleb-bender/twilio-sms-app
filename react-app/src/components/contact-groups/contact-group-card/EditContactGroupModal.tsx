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

    // retrieve the contacts list on every open
    if (props.isOpen && !hasRetrievedContacts.current) {
        hasRetrievedContacts.current = true;
    }
    // reset the hasRetrievedContacts ref on every close
    if (!props.isOpen) {
        hasRetrievedContacts.current = false;
    }

    useEffect(() => {
        return () => ipcRenderer.removeAllListeners(["get-contacts-success"]);
    }, []);


    return <Modal open={props.isOpen} onClose={props.onClose}>
        <Modal.Header>
        <Modal.Title>Edit Contact Group "{props.contactGroupName}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>;
}