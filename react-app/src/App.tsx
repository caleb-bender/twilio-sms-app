/**
 * App.tsx
 * Description: The main component of the react application that renders all other components.
 * Use Cases: It is injected first into the DOM
 */

import React from "react";
import { Container, Header, Sidebar, Content, FlexboxGrid, Col } from "rsuite";
import ContactGroupDisplayList from "./components/contact-groups/ContactGroupDisplayList";
import CreateContactEntryForm from "./components/contact-groups/contacts/CreateContactEntryForm";
import "rsuite/dist/rsuite.min.css";
import ContactEntriesResultList from "./components/contact-groups/contacts/ContactEntriesResultList";

function App() {
    return <>
        <h1 style={{ textAlign: "center", margin: "2rem" }}>Twilio SMS App</h1>
        <FlexboxGrid justify="start" style={{ height: "100%", margin: "1rem", flexWrap: "wrap" }}>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <h3 style={{ fontWeight: "normal"}}>Contacts</h3>
                <CreateContactEntryForm />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <ContactEntriesResultList />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <Content>
                    <h1>Hello</h1>
                </Content>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "400px", flexGrow: "2", width: "25%" }}>
                <h3 style={{ fontWeight: "normal"}}>Contact Groups</h3>
                <ContactGroupDisplayList />
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </>;
}

export default App;