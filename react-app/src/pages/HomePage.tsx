/**
 * HomePage.tsx
 * Description: The main page once the user logs in.
 */

import React from "react";
import { FlexboxGrid, Col, Footer } from "rsuite";
import ContactGroupDisplayList from "./../components/contact-groups/ContactGroupDisplayList";
import CreateContactEntryForm from "./../components/contact-groups/contacts/CreateContactEntryForm";
import ContactEntriesResultList from "./../components/contact-groups/contacts/ContactEntriesResultList";
import LogoutButton from "../components/auth/LogoutButton";
import MessageSender from "../components/message-sending/MessageSender";

interface HomePageProps {
    darkTheme: boolean;
}
/**
 * HomePage contains a flexbox grid layout that separates the various features
 * @param props contains the darkTheme boolean that tells the home page how to render its children */
export default function HomePage(props: HomePageProps) {
    return <>
        <LogoutButton />
        <FlexboxGrid justify="center" style={{ height: "100%", margin: "2rem 1rem", flexWrap: "wrap", marginTop: "3rem" }}>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <h3 style={{ fontWeight: "normal"}}>Contacts</h3>
                <CreateContactEntryForm />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <ContactEntriesResultList />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <ContactGroupDisplayList />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <MessageSender />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "100%" }}>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </>;
}