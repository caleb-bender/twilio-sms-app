/**
 * loginToTwilioEvent.ts
 * Description: This event occurs when the user attempts to login to their twilio account
 */

import TwilioCredentialsValidator from "../business-logic/auth/TwilioCredentialsValidator";

interface TwilioAccountCredentialsArgs {
    accountSid: string;
    authToken: string;
}

export default async function loginToTwilioEvent(event: Electron.IpcMainEvent, args: TwilioAccountCredentialsArgs) {
    try {
        const twilioCredentialsValidator = new TwilioCredentialsValidator(args.accountSid, args.authToken);
        await twilioCredentialsValidator.validateAndStoreCredentials();
        event.reply("login-success");
    } catch (err) {
        event.reply("login-error", (err as Error).message);
    }
}