/**
 * ContactEntryCard.tsx
 * Description: A component that contains information about a contact entry and allows editing/deletion as well
 */

import React, { useState } from "react";
import { Col, FlexboxGrid, Notification, Input } from "rsuite";
import { Edit, Trash, Check } from "@rsuite/icons";

const cardIconStyle = { cursor: "pointer", fontSize: "1.3rem", margin: "0 1rem" };

interface ContactEntryCardProps {
    contactGroupName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export default function ContactEntryCard(props: ContactEntryCardProps) {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
    const [editing, setEditing] = useState(false);

    const editContact = () => {
        setEditing(true);
    };

    const saveContact = () => {
        setEditing(false);
    }

    return <Notification style={{ margin: "1rem", width: "100%" }}>
        <FlexboxGrid justify="space-between" align="middle" style={{ width: "100%", minWidth: "300px" }}>
            <FlexboxGrid.Item as={Col}>
                {editing ? <Input name="firstName" id={`contact-firstName-(${props.firstName}-${props.lastName})`} value={props.firstName} /> : <h5>{props.firstName}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col}>
                {editing ? <Input name="lastName" id={`contact-lastName-(${props.firstName}-${props.lastName})`} value={props.lastName} /> : <h5>{props.lastName}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col}>
                {editing ? <Input name="phoneNumber" id={`contact-phoneNumber-(${props.firstName}-${props.lastName})`} value={props.phoneNumber} /> : <h5>{props.phoneNumber}</h5>}
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col}>
                {editing ? <Check style={cardIconStyle} onClick={saveContact}/> : <Edit style={cardIconStyle} onClick={editContact}/>}
                <Trash style={cardIconStyle} />
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </Notification>;
}