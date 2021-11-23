/**
 * App.tsx
 * Description: The main component of the react application that renders all other components.
 * Use Cases: It is injected first into the DOM
 */

import React from "react";
import { Container, Header, Sidebar, Content, FlexboxGrid, Col } from "rsuite";
import ContactGroupDisplayList from "./components/contact-groups/ContactGroupDisplayList";
import "rsuite/dist/rsuite.min.css";

function App() {
    return <>
        <h1 style={{ textAlign: "center", margin: "2rem" }}>Twilio SMS App</h1>
        <FlexboxGrid justify="start" style={{ height: "100%", margin: "1rem", flexWrap: "wrap" }}>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "330px", flexGrow: "1", width: "33%" }}>
                <ContactGroupDisplayList />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ minWidth: "330px", flexGrow: "2", width: "66%" }}>
                <Content>
                    <h1>Hello</h1>
                </Content>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </>;
}

export default App;