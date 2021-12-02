/**
 * ContactEntriesResultList.tsx
 * Description: A component that asynchronously updates whenever the user changes the search query
 */
import React, { useState } from "react";
import { FlexboxGrid, Row } from "rsuite";
import ContactEntryCard, { ContactEntryCardProps } from "./ContactEntryCard";
import SearchForContactsBar from "./SearchForContactsBar";

export default function ContactEntriesResultList() {

    const [contactEntries, setContactEntries] = useState([] as ContactEntryCardProps[]);

    const updateContactsDisplayList = (contactEntries: ContactEntryCardProps[]) => {
        setContactEntries(contactEntries);
    };

    const removeContactEntryFromDisplay = (deletedContactEntry: ContactEntryCardProps) => {
        setContactEntries(prevContactEntries => prevContactEntries.filter(contactEntry =>
            `${contactEntry.firstName} ${contactEntry.lastName}` !== `${deletedContactEntry.firstName} ${deletedContactEntry.lastName}`));
    }

    return <div>
        <SearchForContactsBar updateContactsDisplayList={updateContactsDisplayList}/>
        <FlexboxGrid justify="center" style={{ margin: "1rem", width: "100%", minWidth: "450px", height: "500px", overflowY: "scroll" }}>
            {contactEntries.map((contact: any) => <FlexboxGrid.Item as={Row} key={`${contact.firstName} ${contact.lastName}`}>
                <ContactEntryCard firstName={contact.firstName} lastName={contact.lastName} phoneNumber={contact.phoneNumber} removeContactEntryFromDisplay={removeContactEntryFromDisplay}/>
            </FlexboxGrid.Item>)}
        </FlexboxGrid>
    </div>;
}