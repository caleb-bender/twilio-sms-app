/**
 * ContactEntryCard.tsx
 * Description: A component that contains information about a contact entry and allows editing/deletion as well
 */

import React, { useState } from "react";
import { Col, FlexboxGrid, Notification, Input } from "rsuite";
import { Edit, Trash, Check } from "@rsuite/icons";
import DeleteContactEntryModal from "./DeleteContactEntryModal";

const cardIconStyle = { cursor: "pointer", fontSize: "1.3rem", margin: "0 1rem" };
const cardContentStyle = { margin: "0.25rem" };

export interface ContactEntryCardProps {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    removeContactEntryFromDisplay(deletedContactEntry: ContactEntryCardProps): void;
}

export default function ContactEntryCard(props: ContactEntryCardProps) {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
    const [editing, setEditing] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    
    const openDeleteContactGroupModal = () => setDeleteModalIsOpen(true);
    const closeDeleteContactGroupModal = () => setDeleteModalIsOpen(false);

    const editContact = () => {
        setEditing(true);
    };

    const saveContact = () => {
        setEditing(false);
    }

    return <Notification style={{ margin: "0.5rem", width: "100%" }}>
        <FlexboxGrid justify="space-between" align="middle" style={{ width: "100%", minWidth: "200px" }}>
            <FlexboxGrid.Item as={Col} style={cardContentStyle}>
                {editing ? <Input name="firstName" id={`contact-firstName-(${props.firstName}-${props.lastName})`} defaultValue={props.firstName}/> : <h5>{props.firstName}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={cardContentStyle}>
                {editing ? <Input name="lastName" id={`contact-lastName-(${props.firstName}-${props.lastName})`} defaultValue={props.lastName} /> : <h5>{props.lastName}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={cardContentStyle}>
                {editing ? <Input name="phoneNumber" id={`contact-phoneNumber-(${props.firstName}-${props.lastName})`} defaultValue={props.phoneNumber} /> : <h5>{`+${props.phoneNumber.slice(0,1)}-(${props.phoneNumber.slice(1,4)})-${props.phoneNumber.slice(4,7)}-${props.phoneNumber.slice(7)}`}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={cardContentStyle}>
                {editing ? <Check style={cardIconStyle} onClick={saveContact}/> : <Edit style={cardIconStyle} onClick={editContact}/>}
                <Trash style={cardIconStyle} onClick={openDeleteContactGroupModal}/>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <DeleteContactEntryModal contactEntry={{ firstName: props.firstName, lastName: props.lastName, phoneNumber: props.phoneNumber } as any} isOpen={deleteModalIsOpen} onClose={closeDeleteContactGroupModal} removeContactEntryFromDisplay={props.removeContactEntryFromDisplay}/>
    </Notification>;
}