/**
 * ContactGroupCard.tsx
 * Description: A card that allows the user to modify/delete a contact group and its data
 */
import React, { useState } from "react";
import { Notification, FlexboxGrid, Modal, Button, Col } from "rsuite";
import { Edit, Trash } from "@rsuite/icons";

interface ContactGroupCardProps {
    contactGroupName: string;
}

export default function ContactGroupCard(props: ContactGroupCardProps) {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openEditContactGroupModal = () => setModalIsOpen(true);
    const closeEditContactGroupModal = () => setModalIsOpen(false);

    const ContactGroupModal = () => <Modal open={modalIsOpen} onClose={closeEditContactGroupModal} >
        <Modal.Header>
        <Modal.Title>{props.contactGroupName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={closeEditContactGroupModal} appearance="primary">
            Save Changes
        </Button>
        </Modal.Footer>
    </Modal>;

    return <Notification style={{ width: "100%" }}>
        <FlexboxGrid justify="space-between" align="middle" style={{ width: "100%" }}>
            <FlexboxGrid.Item as={Col}>
                <h5>{props.contactGroupName}</h5>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col}>
                <Edit style={{ cursor: "pointer" }} onClick={openEditContactGroupModal}/>
                <Trash style={{ cursor: "pointer" }} />
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <ContactGroupModal />
    </Notification>;
}