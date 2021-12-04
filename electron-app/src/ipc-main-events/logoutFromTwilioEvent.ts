/**
 * logoutFromTwilioEvent.ts
 * Description: This event occurs when the user attempts to log out of their twilio account
 */

import { setTwilioAccountCredentials } from "../business-logic/TwilioAccountCredentials";

export default async function logoutFromTwilioEvent(event: Electron.IpcMainEvent) {
    try {
        // clear the account credentials in the environment
        setTwilioAccountCredentials("", "");
        event.reply("logout-success");
    } catch (err) {
    }
}