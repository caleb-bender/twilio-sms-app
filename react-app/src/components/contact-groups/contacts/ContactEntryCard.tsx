/**
 * ContactEntryCard.tsx
 * Description: A component that contains information about a contact entry and allows editing/deletion as well
 */

import React, { useEffect, useState, useRef } from "react";
import { Col, FlexboxGrid, Notification, Input, Message } from "rsuite";
import { Edit, Trash, Check } from "@rsuite/icons";
import DeleteContactEntryModal from "./DeleteContactEntryModal";
const { ipcRenderer } = window.require("electron");

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
    const [editErrorMsg, setEditErrorMsg] = useState("");
    const contactEntryKey = `${props.firstName} ${props.lastName}`;
    
    const openDeleteContactGroupModal = () => setDeleteModalIsOpen(true);
    const closeDeleteContactGroupModal = () => setDeleteModalIsOpen(false);

    const editContact = () => {
        setEditErrorMsg("");
        setEditing(true);
    };

    const saveContact = () => {

        const newFirstName = (document.getElementById(`contact-firstName-(${contactEntryKey})`) as HTMLInputElement).value;
        const newLastName = (document.getElementById(`contact-lastName-(${contactEntryKey})`) as HTMLInputElement).value;
        const newPhoneNumber = (document.getElementById(`contact-phoneNumber-(${contactEntryKey})`) as HTMLInputElement).value;
        ipcRenderer.send(
            "edit-contact-entry",
            // send the current data along with the new data
            { current: { firstName, lastName, phoneNumber }, new: { firstName: newFirstName, lastName: newLastName, phoneNumber: newPhoneNumber} });
    };

    useEffect(() => {
        // declare listeners
        ipcRenderer.on(`edit-contact-entry-${contactEntryKey}-success`, (event: any, newContactEntry: ContactEntryCardProps) => {
            setFirstName(newContactEntry.firstName);
            setLastName(newContactEntry.lastName);
            setPhoneNumber(newContactEntry.phoneNumber);
            setEditErrorMsg("");
            setEditing(false);
        });
        ipcRenderer.on(`edit-contact-entry-${contactEntryKey}-error`, (event: any, errorMsg: string) => {
            setEditErrorMsg(errorMsg);
        });
        return () => ipcRenderer.removeAllListeners([
            `edit-contact-entry-${contactEntryKey}-success`,
            `edit-contact-entry-${contactEntryKey}-error`
        ]);
    });

    return <Notification style={{ margin: "0.5rem", width: "100%" }}>
        <FlexboxGrid justify="space-between" align="middle" style={{ width: "100%", minWidth: "200px" }}>
            <FlexboxGrid.Item as={Col} style={cardContentStyle}>
                {editing ? <Input name="firstName" id={`contact-firstName-(${contactEntryKey})`} defaultValue={props.firstName}/> : <h5>{props.firstName}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={cardContentStyle}>
                {editing ? <Input name="lastName" id={`contact-lastName-(${contactEntryKey})`} defaultValue={props.lastName} /> : <h5>{props.lastName}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={cardContentStyle}>
                {editing ? <Input name="phoneNumber" id={`contact-phoneNumber-(${contactEntryKey})`} defaultValue={props.phoneNumber} /> : <h5>{`+${props.phoneNumber.slice(0,1)}-(${props.phoneNumber.slice(1,4)})-${props.phoneNumber.slice(4,7)}-${props.phoneNumber.slice(7)}`}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={cardContentStyle}>
                {editing ? <Check style={cardIconStyle} onClick={saveContact}/> : <Edit style={cardIconStyle} onClick={editContact}/>}
                <Trash style={cardIconStyle} onClick={openDeleteContactGroupModal}/>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <Message showIcon type="error" header="Error" hidden={editErrorMsg ? false : true}>
                {editErrorMsg}
        </Message>
        <DeleteContactEntryModal contactEntry={{ firstName: props.firstName, lastName: props.lastName, phoneNumber: props.phoneNumber } as any} isOpen={deleteModalIsOpen} onClose={closeDeleteContactGroupModal} removeContactEntryFromDisplay={props.removeContactEntryFromDisplay}/>
    </Notification>;
}