const { ipcRenderer } = window.require("electron");
import React, { useEffect } from "react";
import { Modal, Button } from "rsuite";

interface DeleteContactGroupModalProps {
    contactGroupName: string;
    isOpen: boolean;
    onClose(): void;
    updateContactGroupsList(): void;
}
/**
 * @param props contains the contact group name and additional data for the modal to use on open/close
 * @returns A modal component
 */
export default function DeleteContactGroupModal(props: DeleteContactGroupModalProps) {

    const deleteContactGroup = () => {
        ipcRenderer.send("delete-contact-group", props.contactGroupName);
        props.onClose();
    };

    useEffect(() => {
        ipcRenderer.on("delete-contact-group-success", (event: any, arg: any) => {
            props.updateContactGroupsList();
        });
    
        ipcRenderer.on("delete-contact-group-error", (event: any, arg: any) => {
            console.log(arg);
        });
        // remove all ipcRenderer events listeners before component unmounts
        return () => ipcRenderer.removeAllListeners(["delete-contact-group-success","delete-contact-group-error"]);
    }, []);

    return <Modal open={props.isOpen} onClose={props.onClose}>
        <Modal.Header>
        <Modal.Title>Delete Contact Group"{props.contactGroupName}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the "{props.contactGroupName}" contact group?
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={deleteContactGroup} appearance="primary" color="red">
            Delete
        </Button>
        <Button onClick={props.onClose} appearance="ghost">
            Cancel
        </Button>
        </Modal.Footer>
    </Modal>;
}