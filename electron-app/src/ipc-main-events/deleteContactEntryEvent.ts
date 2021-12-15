/**
 * deleteContactEntryEvent.ts
 * Description: event that gets fired by the client-side when the user requests to delete a contact entry
 */

import Electron from "electron";
import { promisify } from "util";
import fs from "fs";
import ContactEntry, { ContactEntrySchema } from "../business-logic/contact-entry/ContactEntry";
import ContactGroup from "../business-logic/contact-group/ContactGroup";
import DeleteContactEntryCommand from "../commands/contacts/DeleteContactEntryCommand";

/**
 * In addition to the contact entry being deleted, the deleted contact entry reference is removed from all contact groups
 * that reference it.
 */
export default async function deleteContactEntryEvent(event: Electron.IpcMainEvent, contactEntrySchema: ContactEntrySchema) {
    try {
        const createContactGroupCommand = new DeleteContactEntryCommand(contactEntrySchema);
        await createContactGroupCommand.execute();
        // delete all references to this contact in each contact group
        const contactGroups = await ContactGroup.getContactGroupsJson();
        Object.keys(contactGroups).forEach(contactGroupName => {
            delete contactGroups[contactGroupName][`${ContactEntry.getContactEntryKey(contactEntrySchema)}`];
        });
        await promisify(fs.writeFile)(ContactGroup.getContactGroupsJsonFilePath(), JSON.stringify(contactGroups));
        event.reply("delete-contact-entry-success", contactEntrySchema);
    } catch (err) {
        event.reply("delete-contact-entry-error", (err as Error).message);
    }
}