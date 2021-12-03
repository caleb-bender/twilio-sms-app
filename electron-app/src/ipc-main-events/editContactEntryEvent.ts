/**
 * editContactEntryEvent.ts
 * Description: An event that gets fired by the client-side when the user requests to edit a contact entry
 */

import Electron from "electron";
import { promisify } from "util";
import fs from "fs";
import ContactEntry, { ContactEntrySchema } from "../business-logic/contact-entry/ContactEntry";
import ContactGroup from "../business-logic/contact-group/ContactGroup";
import EditContactEntryCommand from "../commands/contacts/EditContactEntryCommand";

interface CurrentAndNewContactEntries {
    current: ContactEntrySchema;
    new: ContactEntrySchema;
}

export default async function editContactEntryEvent(event: Electron.IpcMainEvent, currentAndNew: CurrentAndNewContactEntries) {
    const currentContactEntryKey = `${ContactEntry.getContactEntryKey(currentAndNew.current)}`;
    try {
        // make sure the new contact entry does not already exist somewhere else 
        const contactEntries = await ContactEntry.getContactEntriesJson();
        const newContactEntryKey = ContactEntry.getContactEntryKey(currentAndNew.new);
        if (newContactEntryKey in contactEntries) throw new Error("The contact specified already exists elsewhere.");
        const editContactEntryCommand = new EditContactEntryCommand(currentAndNew.current, currentAndNew.new);
        await editContactEntryCommand.execute();
        // find and replace all references of this contact with the new name
        const contactGroups = await ContactGroup.getContactGroupsJson();
        Object.keys(contactGroups).forEach(contactGroupName => {
            // delete the old reference and create the new reference if it contains the old reference
            if (currentContactEntryKey in contactGroups[contactGroupName]) {
                delete contactGroups[contactGroupName][currentContactEntryKey];
                contactGroups[contactGroupName][`${ContactEntry.getContactEntryKey(currentAndNew.new)}`] = true;
            }
        });
        await promisify(fs.writeFile)(ContactGroup.getContactGroupsJsonFilePath(), JSON.stringify(contactGroups));
        // send back the new contact entry on success
        event.reply(`edit-contact-entry-${currentContactEntryKey}-success`, currentAndNew.new);
    } catch (err) {
        // send back an error message
        event.reply(`edit-contact-entry-${currentContactEntryKey}-error`, (err as Error).message);
    }
}