import dotenv from "dotenv";
dotenv.config();

/**
 * TwilioAccountCredentials.ts
 * Description: A module used to get and set Twilio Account Credentials
 * Use Cases: Logging a user in or a user accesses their account data
 */

import twilio from "twilio";

/**
 * Save the specified credentials in the environment
 * @param accountSid the Twilio account id
 * @param authToken the Twilio account auth token
 */
export function setTwilioAccountCredentials(accountSid: string, authToken: string) {
    process.env.ACCOUNT_SID = accountSid;
    process.env.AUTH_TOKEN = authToken;
}

export function getTwilioAccountId(): string {
    return process.env.ACCOUNT_SID as string;
}

export function getTwilioClient(accountSid: string = process.env.ACCOUNT_SID as string, authToken: string = process.env.AUTH_TOKEN as string) {
    return twilio(accountSid, authToken);
}