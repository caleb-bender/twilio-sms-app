/**
 * requestContactGroupsListEvent.ts
 * Description: event that the client-side fires when an up-to-date contact group list needs to be rendered
 */
 import Electron from "electron";
import GetContactGroupsCommand from "../commands/contact-group/GetContactGroupsCommand";

export default async function requestContactGroupsListEvent(event: Electron.IpcMainEvent, arg: any) {
    try {
        const contactGroupsList: string[] = await new GetContactGroupsCommand().execute();
        event.reply("receive-contact-groups-success", contactGroupsList);
    } catch (err) {
        // event.reply("receive-contact-groups-error", (err as Error).message);
    }
}