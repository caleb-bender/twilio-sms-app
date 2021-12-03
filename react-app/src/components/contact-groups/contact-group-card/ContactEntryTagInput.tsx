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

    const [contactEntryTagsErrMsg, setContactEntryTagsErrMsg] = useState("");
    const [contactEntryTagsSuccessMsg, setContactEntryTagsSuccessMsg] = useState("");
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
        ipcRenderer.send("get-all-contacts", "");
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
        ipcRenderer.on("get-all-contacts-success", (event: any, contactEntries: ContactEntryCardProps[]) => {
            setAllContactEntries(contactEntries.map(contactEntry => `${contactEntry.firstName} ${contactEntry.lastName}`));
            ipcRenderer.removeAllListeners(["get-all-contacts-success"]);
        });
        ipcRenderer.on("get-contacts-of-contact-group-error", (event: any, errorMsg: string) => {
            setContactEntryTagsErrMsg(errorMsg);
            ipcRenderer.removeAllListeners(["get-contacts-of-contact-group-error"]);
        });
        ipcRenderer.on("get-contacts-of-contact-group-success", (event: any, contactEntryKeys: string[]) => {
            setContactEntryTags(contactEntryKeys);
            ipcRenderer.removeAllListeners(["get-contacts-of-contact-group-success"]);
        });
        ipcRenderer.on("save-contact-entries-for-contact-group-success", (event: any, message: string) => {
            setContactEntryTagsErrMsg("");
            setContactEntryTagsSuccessMsg(message);
            ipcRenderer.removeAllListeners(["save-contact-entries-for-contact-group-success"]);
        });
        ipcRenderer.on("save-contact-entries-for-contact-group-error", (event: any, message: string) => {
            setContactEntryTagsSuccessMsg("");
            setContactEntryTagsErrMsg(message);
            ipcRenderer.removeAllListeners(["save-contact-entries-for-contact-group-error"]);
        });
        return () => ipcRenderer.removeAllListeners(["get-contacts-of-contact-group-error", "get-contacts-of-contact-group-success", "search-for-contacts-success", "save-contact-entries-for-contact-group-success", "save-contact-entries-for-contact-group-error"]);
    }, []);

    const updateSelectedTags = (value: any, event: any) => {
        setContactEntryTags(value);
    };

    const saveChangesToContactEntries = () => {
        ipcRenderer.send("save-contact-entries-for-contact-group", { contactGroupName: props.contactGroupName, contactEntriesToSave: contactEntryTags });
    };

    const clearMessages = () => {
        setContactEntryTagsSuccessMsg("");
        setContactEntryTagsErrMsg("");
    }

    return <div>
        <CheckPicker sticky data={getAllConvertedContactEntries()} appearance="subtle" placeholder="Add contacts by full name" style={{ width: "100%" }} value={contactEntryTags} onChange={updateSelectedTags} onEnter={clearMessages}/>
        <Message showIcon type="error" header="Error" hidden={contactEntryTagsErrMsg ? false : true}>
            {contactEntryTagsErrMsg}
        </Message>
        <Message showIcon type="success" header="Success" hidden={contactEntryTagsSuccessMsg ? false : true}>
            {contactEntryTagsSuccessMsg}
        </Message>
        <Button appearance="primary" style={{margin: "6rem 0 0 0"}} onClick={saveChangesToContactEntries}>Save Changes</Button>
    </div>;
}