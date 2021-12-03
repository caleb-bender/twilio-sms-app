/**
 * removeContactEntryEvent.ts
 * Description: An event that gets fired by the client-side when the user requests to remove a contact entry from a contact group
 */

import Electron from "electron";
import RemoveContactEntryCommand from "../commands/contact-group/RemoveContactEntryCommand";

interface RemoveContactEntryEventData {
    contactGroupName: string;
    contactEntryKey: string;
}

export default async function removeContactEntryEvent(event: Electron.IpcMainEvent, args: RemoveContactEntryEventData) {
    try {
        const removeContactEntryCommand = new RemoveContactEntryCommand(args.contactGroupName, args.contactEntryKey);
        await removeContactEntryCommand.execute();
        event.reply("remove-contact-entry-success", args.contactEntryKey);
    } catch (err) {
        event.reply("remove-contact-entry-error", (err as Error).message);
    }
}