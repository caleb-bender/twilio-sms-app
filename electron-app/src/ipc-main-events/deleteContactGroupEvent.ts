/**
 * deleteContactGroupsListEvent.ts
 * Description: event that the client-side fires when the user wants to delete a contact group and all its data
 */
 import Electron from "electron";
import DeleteContactGroupCommand from "../commands/contact-group/DeleteContactGroupCommand";

export default async function deleteContactGroupEvent(event: Electron.IpcMainEvent, arg: any) {
    try {
        await new DeleteContactGroupCommand(arg).execute();
        event.reply("delete-contact-group-success");
    } catch (err) {
        event.reply("delete-contact-group-error", (err as Error).message);
    }
}