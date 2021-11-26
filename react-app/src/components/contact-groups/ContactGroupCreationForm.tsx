/**
 * ContactGroupCreationForm.tsx
 * Description: Creates a new contact group and saves it in the file system
 */

import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Input, Message, FlexboxGrid, Col } from "rsuite";

export default function ContactGroupCreationForm() {

    const [loading, setLoading] = useState(false);
    const initialRender = useRef(true);
    const contactGroupName = useRef("");

    const createButtonClicked = () => {
        setLoading(true);
        const contactGroupInputElement = document.getElementById("contact-group-name");
        if (contactGroupInputElement !== null) contactGroupName.current = (contactGroupInputElement as HTMLInputElement).value;
    };


    useEffect(() => {
        // don't call on the initial render
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            console.log(`${contactGroupName.current}`);
        }
    }, [loading]);

    return <Form layout="inline" style={{ width: "100%" }}>
        <FlexboxGrid justify="start">
            <FlexboxGrid.Item as={Col} style={{ flexGrow: 4 }}>
                <Input name="contact-group-name" id="contact-group-name" placeholder="Name of new contact group"/>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item as={Col} style={{ flexGrow: 1 }}>
                <Button name="submit" appearance="primary" onClick={createButtonClicked} loading={loading}>Create</Button>
            </FlexboxGrid.Item>
        </FlexboxGrid>
        <Message showIcon type="error" header="Error" hidden/>
    </Form>;
}