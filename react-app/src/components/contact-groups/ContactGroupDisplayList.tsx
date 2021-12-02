/**
 * ContactGroupDisplayList.tsx
 * Description: A list of created contact group components in addition to the contact group creation form.
 */

const { ipcRenderer } = window.require("electron");
import React, { useEffect, useState } from "react";
import { Col, FlexboxGrid } from "rsuite";
import ContactGroupCard from "./contact-group-card/ContactGroupCard";
import ContactGroupCreationForm from "./ContactGroupCreationForm";

export default function ContactGroupDisplayList() {

    const [contactGroupComponentList, setContactGroupComponentList] = useState([]);

    useEffect(() => {
        updateContactGroupsList();
        // receives the most up to date contact groups list
        ipcRenderer.on("receive-contact-groups-success", (event: any, contactGroupsList: string[]) => {
            setContactGroupComponentList(contactGroupsList as any);
        });
        return () => ipcRenderer.removeAllListeners(["receive-contact-groups-success", "receive-contact-groups-error"]);
    }, []);

    // requests the most up to date contact groups list
    const updateContactGroupsList = () => {
        ipcRenderer.send("request-contact-groups-list");
    };

    return <div style={{ margin: "1em auto" }}>
        <ContactGroupCreationForm updateContactGroupsList={updateContactGroupsList}/>
        <div style={{ height: "500px", overflowY: "scroll" }}>
            {contactGroupComponentList.map((name, index) =>
            <div key={index}>
                <ContactGroupCard contactGroupName={name} updateContactGroupsList={updateContactGroupsList}/>
            </div>)}
        </div>
    </div>;
}