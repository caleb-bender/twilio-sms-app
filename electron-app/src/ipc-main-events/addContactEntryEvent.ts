/**
 * addContactEntryEvent.ts
 * Description: An event that gets fired by the client-side when the user requests to add a contact entry to a contact group
 */

import Electron from "electron";
import AddContactEntryCommand from "../commands/contact-group/AddContactEntryCommand";

interface AddContactEntryEventData {
    contactGroupName: string;
    contactEntryKey: string;
}

export default async function addContactEntryEvent(event: Electron.IpcMainEvent, args: AddContactEntryEventData) {
    try {
        const addContactEntryCommand = new AddContactEntryCommand(args.contactGroupName, args.contactEntryKey);
        await addContactEntryCommand.execute();
        event.reply("add-contact-entry-success", args.contactEntryKey);
    } catch (err) {
        event.reply("add-contact-entry-error", (err as Error).message);
    }
}