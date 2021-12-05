/**
 * sendMessageToContactGroupRecipientsEvent.ts
 * Description: This event executes when the user requests to send a message using their Twilio account
 */

import ContactEntry from "../business-logic/contact-entry/ContactEntry";
import ContactGroup from "../business-logic/contact-group/ContactGroup";
import MessageCredentialsValidator from "../business-logic/messaging/MessageCredentialsValidator";
import SavedAccountPhoneAndName from "../business-logic/messaging/SavedAccountPhoneAndName";
import { getTwilioClient } from "../business-logic/TwilioAccountCredentials";

interface MessageCredentialsProps {
    twilioPhoneNumber: string;
    nameOnMessage: string;
    selectedContactGroups: string[];
    messageBody: string;
}

export default async function sendMessageToContactGroupRecipientsEvent(event: Electron.IpcMainEvent, args: MessageCredentialsProps) {
    try {
        const messageCredentialsValidator = new MessageCredentialsValidator(
            args.twilioPhoneNumber, args.nameOnMessage, args.selectedContactGroups, args.messageBody);
        await messageCredentialsValidator.validate();
        // get the contact groups json and the contact entries
        const contactGroups = await ContactGroup.getContactGroupsJson();
        const contactEntries = await ContactEntry.getContactEntriesJson();
        const uniquePhoneNumbers: Record<string, boolean> = {};
        for (const contactGroupName of args.selectedContactGroups) {
            for (const contactName in contactGroups[contactGroupName]) {
                const phoneNumber = contactEntries[contactName].phoneNumber as string;
                if (!(phoneNumber in uniquePhoneNumbers)) {
                    uniquePhoneNumbers[phoneNumber] = true;
                }
            }
        }
        const client = getTwilioClient();
        // after we have all the distinct phone numbers, we can send the message to each one
        for (const recipientPhoneNumber in uniquePhoneNumbers) {
            await client.messages.create({
                from: args.twilioPhoneNumber,
                to: recipientPhoneNumber,
                body: `${args.nameOnMessage}: ${args.messageBody}`
            });
        }
        // save the phone number and name for later use
        await SavedAccountPhoneAndName.savePhoneAndName(args.twilioPhoneNumber, args.nameOnMessage);
        event.reply("send-message-to-contact-group-recipients-success", "The message was sent successfully to all contacts specified!");
    } catch (err) {
        console.log((err as Error).message);
        event.reply("send-message-to-contact-group-recipients-error", (err as Error).message);
    }
}