/**
 * MessageSender.tsx
 * Description: The main component that sends messages using the Twilio API
 */
const { ipcRenderer } = window.require("electron");
import React, { useEffect, useState } from "react";
import { FlexboxGrid, Input, Button, Modal, Col, CheckPicker, Message } from "rsuite";

const textFieldsStyle: React.CSSProperties = {
    flexGrow: 4,
    width: "100%"
};

interface SavedMessageProps {
    phoneNumber: string;
    nameOnMessage: string;
}

export default function MessageSender() {

    const [selectedContactGroups, setSelectedContactGroups] = useState([] as string[]);
    const [allContactGroups, setAllContactGroups] = useState([] as string[]);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);
    // if the user has created a message before then use their previously used phone number and name
    const [savedTwilioPhoneNumber, setSavedTwilioPhoneNumber] = useState("");
    const [savedNameOnMessage, setSavedNameOnMessage] = useState("");

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const clearMessages = () => {
        setErrorMsg("");
        setSuccessMsg("");
    };

    const openConfirmationModal = () => setModalIsOpen(true);
    const closeConfirmationModal = () => {
        setModalIsOpen(false);
        clearMessages();
    };

    useEffect(() => {
        ipcRenderer.on("get-saved-phone-number-and-name-success", (event: any, savedMessageProps: SavedMessageProps) => {
            setSavedTwilioPhoneNumber(savedMessageProps.phoneNumber);
            setSavedNameOnMessage(savedMessageProps.nameOnMessage);
            ipcRenderer.removeAllListeners(["get-saved-phone-number-and-name-success"]);
        });
        ipcRenderer.on("send-message-to-contact-group-recipients-success", (event: any, message: string) => {
            setLoading(false);
            setErrorMsg("");
            setSuccessMsg(message);
            ipcRenderer.removeAllListeners(["send-message-to-contact-group-recipients-success"]);
        });
        ipcRenderer.on("send-message-to-contact-group-recipients-error", (event: any, message: string) => {
            setLoading(false);
            setSuccessMsg("");
            setErrorMsg(message);
            ipcRenderer.removeAllListeners(["send-message-to-contact-group-recipients-error"]);
        });
        ipcRenderer.on("get-all-contact-group-names-success", (event: any, allContactGroupNames: string[]) => {
            setAllContactGroups(allContactGroupNames);
            ipcRenderer.removeAllListeners(["get-all-contact-group-names-success"]);
        });
        ipcRenderer.send("get-all-contact-group-names");
        ipcRenderer.send("get-saved-phone-number-and-name");
        return () => ipcRenderer.removeAllListeners(["get-saved-phone-number-and-name-success","get-all-contact-group-names-success","send-message-to-contact-group-recipients-success","send-message-to-contact-group-recipients-error"]);
    });

    const getConvertedContactGroups = () => {
        return allContactGroups.map(contactGroupName => {
            return {
                label: contactGroupName,
                value: contactGroupName,
                role: contactGroupName
            };
        });
    };

    const updateSelectedContactGroups = (value: any, event: any) => {
        setSelectedContactGroups(value);
    };

    const sendMessageToContactGroups = () => {
        const twilioPhoneNumber = (document.getElementById("twilio-account-phone-number") as HTMLInputElement).value;
        const nameOnMessage = (document.getElementById("twilio-name-on-message") as HTMLInputElement).value;
        const messageBody = (document.getElementById("twilio-message-body") as HTMLInputElement).value;
        clearMessages();
        setLoading(true);
        ipcRenderer.send("send-message-to-contact-group-recipients", { twilioPhoneNumber, nameOnMessage, selectedContactGroups, messageBody });
    };

    return <div>
        <h3 style={{ fontWeight: "normal", marginBottom: "2rem" }}>Message Management</h3>
        <Button onClick={openConfirmationModal} appearance="primary">
                    Create New Message
        </Button>
        <Message showIcon type="error" header="Error" hidden={errorMsg ? false : true}>
            {errorMsg}
        </Message>
        <Message showIcon type="success" header="Success" hidden={successMsg ? false : true}>
            {successMsg}
        </Message>
        <Modal open={modalIsOpen} onClose={closeConfirmationModal} size="lg">
            <Modal.Header>
            <Modal.Title>Send a message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item as={Col} style={textFieldsStyle}>
                        <Input name="twilio-account-phone-number" id="twilio-account-phone-number" type="phone" placeholder="Your Twilio Phone Number" onFocus={clearMessages} defaultValue={savedTwilioPhoneNumber}/>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} style={textFieldsStyle}>
                        <Input name="twilio-name-on-message" id="twilio-name-on-message" type="phone" placeholder="Your Display Name On The Message" onFocus={clearMessages} defaultValue={savedNameOnMessage} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} style={textFieldsStyle}>
                        <CheckPicker sticky data={getConvertedContactGroups()} id="contact-group-recipients" appearance="subtle" placeholder="Add Contact Groups By Name" style={{ width: "100%" }} value={selectedContactGroups} onChange={updateSelectedContactGroups} onEnter={clearMessages} />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item as={Col} style={textFieldsStyle}>
                        <Input as="textarea" rows={10} placeholder="Enter a message to send" id="twilio-message-body" onFocus={clearMessages}/>
                    </FlexboxGrid.Item>
            </FlexboxGrid>
            <Message showIcon type="error" header="Error" hidden={errorMsg ? false : true}>
                {errorMsg}
            </Message>
            <Message showIcon type="success" header="Success" hidden={successMsg ? false : true}>
                {successMsg}
            </Message>
            <Message showIcon type="warning" header="Important" style={{ marginBottom: "1rem" }}>
                    Make sure that you review your information carefully before sending. Your Twilio account will be charged for each distinct contact in the contact groups specified.
            </Message>
            </Modal.Body>
            <Modal.Footer>
                <Button appearance="primary" onClick={sendMessageToContactGroups} loading={loading}>
                    Send Message
                </Button>
            </Modal.Footer>
        </Modal>
    </div>;
}