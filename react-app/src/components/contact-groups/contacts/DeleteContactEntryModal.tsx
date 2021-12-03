const { ipcRenderer } = window.require("electron");
import React, { useEffect, useRef } from "react";
import { Modal, Button } from "rsuite";
import { ContactEntryCardProps } from "./ContactEntryCard";

interface DeleteContactEntryModalProps {
    contactEntry: ContactEntryCardProps;
    isOpen: boolean;
    onClose(): void;
    removeContactEntryFromDisplay(deletedContactEntryKey: string): void;
}
/**
 * @param props contains the contact entry and additional data for the modal to use on open/close
 * @returns A modal component
 */
export default function DeleteContactEntryModal(props: DeleteContactEntryModalProps) {

    // keep track of the initial key for deletion
    const initialContactEntryKey = useRef(`${props.contactEntry.firstName} ${props.contactEntry.lastName}`);

    const deleteContactEntry = () => {
        ipcRenderer.send("delete-contact-entry", props.contactEntry);
        props.onClose();
    };

    const contactEntryKey = `${props.contactEntry.firstName} ${props.contactEntry.lastName}`;

    useEffect(() => {
        ipcRenderer.on("delete-contact-entry-success", (event: any, contactEntry: ContactEntryCardProps) => {
            props.removeContactEntryFromDisplay(initialContactEntryKey.current);
        });
    
        ipcRenderer.on("delete-contact-entry-error", (event: any, arg: any) => {
            console.log(arg);
        });
        // remove all ipcRenderer events listeners before component unmounts
        return () => ipcRenderer.removeAllListeners(["delete-contact-entry-success","delete-contact-entry-error"]);
    }, []);

    return <Modal open={props.isOpen} onClose={props.onClose}>
        <Modal.Header>
        <Modal.Title>Delete Contact Entry "{contactEntryKey}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the contact "{contactEntryKey}"?
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={deleteContactEntry} appearance="primary" color="red">
            Delete
        </Button>
        <Button onClick={props.onClose} appearance="ghost">
            Cancel
        </Button>
        </Modal.Footer>
    </Modal>;
}