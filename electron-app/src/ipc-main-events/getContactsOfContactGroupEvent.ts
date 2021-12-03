/**
 * getContactGroupsListEvent.ts
 * Description: event that the client-side fires when the app requests the contact entries of a specific contact group
 */
 import Electron from "electron";
import ContactGroup from "../business-logic/contact-group/ContactGroup";

export default async function getContactsOfContactGroupEvent(event: Electron.IpcMainEvent, contactGroupName: string) {
    try {
        const contactGroup = await ContactGroup.loadFromFile(contactGroupName);
        event.reply("get-contacts-of-contact-group-success", Object.keys(contactGroup.contacts));
    } catch (err) {
        event.reply("get-contacts-of-contact-group-error", (err as Error).message);
    }
}