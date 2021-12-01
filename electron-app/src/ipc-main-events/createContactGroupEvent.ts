/**
 * createContactGroupEvent.ts
 * Description: event that gets fired by the client-side when the user requests creating a contact group
 */

import Electron from "electron";
import CreateContactGroupCommand from "../commands/contact-group/CreateContactGroupCommand";

export default async function createContactGroupEvent(event: Electron.IpcMainEvent, contactGroupName: any) {
    try {
        const createContactGroupCommand = new CreateContactGroupCommand(contactGroupName);
        await createContactGroupCommand.execute();
        event.reply("create-contact-group-success", `The contact group "${contactGroupName}" was created successfully!`);
    } catch (err) {
        event.reply("create-contact-group-error", (err as Error).message);
    }
}