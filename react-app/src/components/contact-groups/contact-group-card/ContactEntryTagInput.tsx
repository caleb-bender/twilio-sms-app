/**
 * ContactEntryTagInput.tsx
 * Description: Allows the user to add and remove contact entries as tags for the contact group
 */
const { ipcRenderer } = window.require("electron");
import { useEffect, useRef, useState } from "react";
import { CheckPicker, Message, Button } from "rsuite";
import { ContactEntryCardProps } from "../contacts/ContactEntryCard";


interface ContactEntryTagInputProps {
    contactGroupName: string;
    editModalIsOpen: boolean;
}

export default function ContactEntryTagInput(props: ContactEntryTagInputProps) {

    const [contactEntryTagsErrMsg, setContacyEntryTagsErrMsg] = useState("");

    const [contactEntryTags, setContactEntryTags] = useState([] as string[]);

    const [allContactEntries, setAllContactEntries] = useState([] as string[]);

    const contactEntriesHaveBeenRetrieved = useRef(false);

    const getAllConvertedContactEntries = (): any => {
        return allContactEntries.map(contactEntryKey => {
            return { label: contactEntryKey, value: contactEntryKey, role: contactEntryKey};
        });
    };

    const getLatestContactEntryTags = () => {
        // get all contact entries and the contact entries of the group
        ipcRenderer.send("search-for-contacts", "");
        ipcRenderer.send("get-contacts-of-contact-group", props.contactGroupName);
    };

    if (props.editModalIsOpen && !contactEntriesHaveBeenRetrieved.current) {
        getLatestContactEntryTags();
        contactEntriesHaveBeenRetrieved.current = true;
    }

    if (!props.editModalIsOpen) {
        contactEntriesHaveBeenRetrieved.current = false;
    }

    useEffect(() => {
        ipcRenderer.on("search-for-contacts-success", (event: any, contactEntries: ContactEntryCardProps[]) => {
            setAllContactEntries(contactEntries.map(contactEntry => `${contactEntry.firstName} ${contactEntry.lastName}`));
        });
        ipcRenderer.on("get-contacts-of-contact-group-error", (event: any, errorMsg: string) => {
            setContacyEntryTagsErrMsg(errorMsg);
        });
        ipcRenderer.on("get-contacts-of-contact-group-success", (event: any, contactEntryKeys: string[]) => {
            setContactEntryTags(contactEntryKeys);
        });
        return () => ipcRenderer.removeAllListeners(["get-contacts-of-contact-group-error", "get-contacts-of-contact-group-success", "search-for-contacts-success"]);
    }, []);

    return <div>
        <CheckPicker data={getAllConvertedContactEntries()} appearance="subtle" placeholder="Add contacts by full name" style={{ width: "100%" }} defaultValue={contactEntryTags} />
        <Message showIcon type="error" header="Error" hidden={contactEntryTagsErrMsg ? false : true}>
            {contactEntryTagsErrMsg}
        </Message>
        <Button appearance="primary" style={{margin: "6rem 0 0 0"}}>Save Changes</Button>
    </div>;
}