/**
 * ContactGroupDisplayList.tsx
 * Description: A list of created contact group components in addition to the contact group creation form.
 */

const { ipcRenderer } = window.require("electron");
import React, { useEffect, useState } from "react";
import ContactGroupCard from "./ContactGroupCard";
import ContactGroupCreationForm from "./ContactGroupCreationForm";


export default function ContactGroupDisplayList() {

    const [contactGroupComponentList, setContactGroupComponentList] = useState([]);

    useEffect(() => {
        updateContactGroupsList();
        return () => ipcRenderer.removeAllListeners(["receive-contact-groups-success", "receive-contact-groups-error"]);
    }, []);

    // requests the most up to date contact groups list
    const updateContactGroupsList = () => {
        ipcRenderer.send("request-contact-groups-list");
    };
    // recieves the most up to date contact groups list
    ipcRenderer.on("receive-contact-groups-success", (event: any, contactGroupsList: string[]) => {
        setContactGroupComponentList(contactGroupsList as any);
    });

    return <div style={{ margin: "1em" }}>
        <ContactGroupCreationForm />
        {contactGroupComponentList.map((name) => <ContactGroupCard contactGroupName={name} />)}
    </div>;
}