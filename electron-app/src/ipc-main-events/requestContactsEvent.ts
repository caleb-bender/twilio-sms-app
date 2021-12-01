/**
 * requestContactsEvent.ts
 * Description: An event that the client-side raises when the user requests to edit a contact group
 */

import GetContactsCommand from "../commands/contacts/GetContactsCommand";


export default async function requestContactsEvent(event: Electron.IpcMainEvent, contactGroupName: any) {
    try {
        const contactsObject = await new GetContactsCommand(contactGroupName).execute();
        event.reply("get-contacts-success", Object.keys(contactsObject).map(contactKey => contactsObject[contactKey]));
    } catch (err) {
        console.log(err);
    }
}