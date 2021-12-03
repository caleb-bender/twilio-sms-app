/**
 * createContactEntryEvent.ts
 * Description: An event that gets fired by the client-side when the user requests creating a contact entry
 */

import Electron from "electron";
import { ContactEntrySchema } from "../business-logic/contact-entry/ContactEntry";
import CreateContactEntryCommand from "../commands/contacts/CreateContactEntryCommand";

export default async function createContactEntryEvent(event: Electron.IpcMainEvent, contactEntrySchema: ContactEntrySchema) {
    try {
        const createContactEntryCommand = new CreateContactEntryCommand(contactEntrySchema);
        await createContactEntryCommand.execute();
        event.reply("create-contact-entry-success", `The contact "${contactEntrySchema.firstName} ${contactEntrySchema.lastName}" was created successfully.`);
    } catch (err) {
        event.reply("create-contact-entry-error", (err as Error).message);
    }
}