/**
 * searchForContactsEvent.ts
 * Description: event that the client-side fires when the user's contacts search query has changed
 */
 import Electron from "electron";
import SearchContactsCommand from "../commands/contacts/SearchContactsCommand";

export default async function searchForContactsEvent(event: Electron.IpcMainEvent, searchQuery: string) {
    try {
        const contactEntries = await new SearchContactsCommand(searchQuery).execute();
        event.reply("search-for-contacts-success", contactEntries);
    } catch (err) {

    }
}