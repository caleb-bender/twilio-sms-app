const { ipcRenderer } = window.require("electron");
import React, { useEffect } from "react";
import { Modal, Button } from "rsuite";

interface DeleteContactGroupModalProps {
    contactGroupName: string;
    isOpen: boolean;
    onClose(): void;
    updateContactGroupsList(): void;
}

export default function DeleteContactGroupModal(props: DeleteContactGroupModalProps) {

    const deleteContactGroup = () => {
        ipcRenderer.send("delete-contact-group", props.contactGroupName);
        props.onClose();
    };

    ipcRenderer.on("delete-contact-group-success", (event: any, arg: any) => {
        props.updateContactGroupsList();
    });

    ipcRenderer.on("delete-contact-group-error", (event: any, arg: any) => {
        console.log(arg);
    });

    useEffect(() => {
        // remove all ipcRenderer events listeners before component unmounts
        return () => ipcRenderer.removeAllListeners(["delete-contact-group-success","delete-contact-group-error"]);
    }, []);

    return <Modal open={props.isOpen} onClose={props.onClose}>
        <Modal.Header>
        <Modal.Title>Delete "{props.contactGroupName}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the "{props.contactGroupName}" contact group? All its contacts and data will be lost forever.
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