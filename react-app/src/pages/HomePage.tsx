/**
 * HomePage.tsx
 * Description: The main page once the user logs in.
 */

import React from "react";
import { FlexboxGrid, Col } from "rsuite";
import ContactGroupDisplayList from "./../components/contact-groups/ContactGroupDisplayList";
import CreateContactEntryForm from "./../components/contact-groups/contacts/CreateContactEntryForm";
import ContactEntriesResultList from "./../components/contact-groups/contacts/ContactEntriesResultList";
import LogoutButton from "../components/auth/LogoutButton";
import MessageSender from "../components/message-sending/MessageSender";

export default function HomePage() {
    return <>
        <LogoutButton />
        <FlexboxGrid justify="start" style={{ height: "100%", margin: "1rem", flexWrap: "wrap", marginTop: "3rem" }}>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <h3 style={{ fontWeight: "normal"}}>Contacts</h3>
                <CreateContactEntryForm />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <ContactEntriesResultList />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <h3 style={{ fontWeight: "normal"}}>Contact Groups</h3>
                <ContactGroupDisplayList />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <MessageSender />
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </>;
}