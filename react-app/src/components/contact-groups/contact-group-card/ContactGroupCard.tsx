/**
 * ContactGroupCard.tsx
 * Description: A card that allows the user to modify/delete a contact group and its data
 */
import React, { useState } from "react";
const { ipcRenderer } = window.require("electron");
import { Notification, FlexboxGrid, Col } from "rsuite";
import { Edit, Trash } from "@rsuite/icons";
import DeleteContactGroupModal from "./DeleteContactGroupModal";
import EditContactGroupModal from "./EditContactGroupModal";

const cardIconStyle = { cursor: "pointer", fontSize: "1.3rem", margin: "0 1rem" };

interface ContactGroupCardProps {
    contactGroupName: string;
    updateContactGroupsList(): void;
}

export default function ContactGroupCard(props: ContactGroupCardProps) {

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    const openEditContactGroupModal = () => {
        setEditModalIsOpen(true);
    };
    const closeEditContactGroupModal = () => setEditModalIsOpen(false);
    
    const openDeleteContactGroupModal = () => setDeleteModalIsOpen(true);
    const closeDeleteContactGroupModal = () => setDeleteModalIsOpen(false);

    return <Notification style={{ margin: "1rem", width: "100%" }}>
        <FlexboxGrid justify="space-between" align="middle" style={{ width: "100%", minWidth: "300px" }}>
            <FlexboxGrid.Item as={Col}>
                <h5>{props.contactGroupName}</h5>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col}>
                <Edit style={cardIconStyle} onClick={openEditContactGroupModal} />
                <Trash style={cardIconStyle} onClick={openDeleteContactGroupModal}/>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <EditContactGroupModal isOpen={editModalIsOpen} contactGroupName={props.contactGroupName} onClose={closeEditContactGroupModal} />
        <DeleteContactGroupModal isOpen={deleteModalIsOpen}
        contactGroupName={props.contactGroupName} onClose={closeDeleteContactGroupModal}
        updateContactGroupsList={props.updateContactGroupsList} />
    </Notification>;
}