/**
 * SearchForContactsBar.tsx
 * Description: Allows the user to search for contacts asynchronously as the input changes
 */

import React, { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");
import { InputGroup, Input } from "rsuite";
import { Search } from "@rsuite/icons";
import { ContactEntryCardProps } from "./ContactEntryCard";

interface SearchForContactsBarProps {
    updateContactsDisplayList(contactEntries: ContactEntryCardProps[]): void;
}

export default function SearchForContactsBar(props: SearchForContactsBarProps) {

    const searchContactsGivenTheQuery = () => {
        const searchQuery = (document.getElementById("contacts-search-bar") as HTMLInputElement).value;
        ipcRenderer.send("search-for-contacts", searchQuery);
    }

    useEffect(() => {
        ipcRenderer.send("search-for-contacts", "");
        ipcRenderer.on("search-for-contacts-success", (event: any, contactEntries: ContactEntryCardProps[]) => {
            props.updateContactsDisplayList(contactEntries);
        });
        return () => ipcRenderer.removeAllListeners(["search-for-contacts-success"]);
    }, []);

    return <InputGroup>
        <Input id="contacts-search-bar" placeholder="Search for contacts by name" onChange={searchContactsGivenTheQuery}/>
        <InputGroup.Addon>
        <Search />
        </InputGroup.Addon>
    </InputGroup>
}