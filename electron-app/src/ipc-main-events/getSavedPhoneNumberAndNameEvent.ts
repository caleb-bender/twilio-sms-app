/**
 * getSavedPhoneNumberAndNameEvent.ts
 * Description: this event calls when the user requests to send a new message, in which case the cached values of the
 * phone number and name are sent back to the client.
 */

import SavedAccountPhoneAndName from "../business-logic/messaging/SavedAccountPhoneAndName";

export default async function getSavedPhoneNumberAndNameEvent(event: Electron.IpcMainEvent) {
    try {
        event.reply("get-saved-phone-number-and-name-success", await SavedAccountPhoneAndName.getPhoneAndName());
    } catch (err) {
        
    }
}