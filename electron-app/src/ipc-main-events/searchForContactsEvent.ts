/**
 * searchForContactsEvent.ts
 * Description: event that the client-side fires when the user's contacts search query has changed
 */
 import Electron from "electron";
import SearchContactsCommand from "../commands/contacts/SearchContactsCommand";

export default function searchForContactsEvent(replyEvent: string = "search-for-contacts-success")  {
    return async (event: Electron.IpcMainEvent, searchQuery: string) => {
        try {
            const contactEntries = await new SearchContactsCommand(searchQuery).execute();
            event.reply(replyEvent, contactEntries);
        } catch (err) {

        }
    }
};