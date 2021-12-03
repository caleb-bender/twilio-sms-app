/**
 * saveContactEntriesForContactGroupEvent.ts
 * Description: event that gets fired by the client-side when the user attempts to update a contact group with new contacts
 */

import Electron from "electron";
import ContactGroup from "../business-logic/contact-group/ContactGroup";

interface SaveContactEntriesForContactGroupEventArgs {
    contactGroupName: string;
    contactEntriesToSave: string[];
}

export default async function saveContactEntriesForContactGroupEvent(event: Electron.IpcMainEvent, args: SaveContactEntriesForContactGroupEventArgs) {
    try {
        const contactEntriesToSaveObject: Record<string, boolean> = {};
        args.contactEntriesToSave.forEach(contactEntryKey => contactEntriesToSaveObject[contactEntryKey] = true); 
        const contactGroup = await ContactGroup.loadFromFile(args.contactGroupName);
        contactGroup.contacts = contactEntriesToSaveObject;
        await contactGroup.save();
        event.reply("save-contact-entries-for-contact-group-success", `The contacts for the contact group "${args.contactGroupName}" were updated successfully.`);
    } catch (err) {
        event.reply("save-contact-entries-for-contact-group-error", (err as Error).message);
    }
}