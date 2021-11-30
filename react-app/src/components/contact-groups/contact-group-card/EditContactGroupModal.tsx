import React, { useState } from "react";
import { Modal, Button } from "rsuite";

interface EditContactGroupModalProps {
    contactGroupName: string;
    isOpen: boolean;
    onClose(): void;
}

export default function EditContactGroupModal(props: EditContactGroupModalProps) {

    return <Modal open={props.isOpen} onClose={props.onClose}>
        <Modal.Header>
        <Modal.Title>Edit "{props.contactGroupName}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.onClose} appearance="primary">
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>;
}