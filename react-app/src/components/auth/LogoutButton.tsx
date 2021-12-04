/**
 * LogoutButton.tsx
 * Description: prompts the user with a modal when clicked that confirms whether or not they want to log out.
 */
import React, { useState } from "react";
import { Button, Modal } from "rsuite";
import { Exit } from "@rsuite/icons";

export default function LogoutButton() {

    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return <>
    <Exit onClick={onOpen} style={{ position: "absolute", top: "1rem", right: "2rem", zIndex: "100000", fontSize: "1.5rem", cursor: "pointer" }} />
    <Modal open={isOpen} onClose={onClose}>
        <Modal.Header>
        <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you would like to log out and end your current session?
        </Modal.Body>
        <Modal.Footer>
            <Button appearance="primary" onClick={onClose}>
                Log out
            </Button>
        </Modal.Footer>
    </Modal>
    </>;
}