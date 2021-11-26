/**
 * ContactGroupDisplayList.tsx
 * Description: A list of created contact group components in addition to the contact group creation form.
 */

import React from "react";
import ContactGroupCreationForm from "./ContactGroupCreationForm";


export default function ContactGroupDisplayList() {

    return <div style={{ margin: "1em" }}>
        <ContactGroupCreationForm />
    </div>;
}