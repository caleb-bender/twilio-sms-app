/**
 * getAllContactGroupNamesEvent.ts
 * Description: event that the client-side fires when the app requests the contact entries of a specific contact group
 */
 import Electron from "electron";
import ContactGroup from "../business-logic/contact-group/ContactGroup";

export default async function getAllContactGroupNamesEvent(event: Electron.IpcMainEvent) {
    try {
        const contactGroups = await ContactGroup.getContactGroupsJson();
        event.reply("get-all-contact-group-names-success", Object.keys(contactGroups));
    } catch (err) {
        
    }
}