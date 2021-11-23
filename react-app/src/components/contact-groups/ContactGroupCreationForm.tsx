/**
 * ContactGroupCreationForm.tsx
 * Description: Creates a new contact group and saves it in the file system
 */

import React from "react";
import { Form, Button, Input, Message, FlexboxGrid, Col } from "rsuite";

export default function ContactGroupCreationForm() {

    return <Form layout="inline" style={{ width: "100%" }}>
        <Form.Group controlId="contact-group-name">
            <Form.Control name="contact-group-name" placeholder="Create a new contact group"/>
        </Form.Group>
        <Button appearance="primary" name="submit" type="submit">Create</Button>
        <Message showIcon type="error" header="Error"/>
    </Form>;
}