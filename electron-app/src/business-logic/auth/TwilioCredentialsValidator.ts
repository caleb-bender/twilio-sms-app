/**
 * TwilioCredentialsValidator.ts
 * Description: a class that when instantiated validates a set of twilio credentials
 */
import Joi from "joi";
import twilio, { Twilio } from "twilio";
import { getTwilioClient, setTwilioAccountCredentials } from "../TwilioAccountCredentials";

export default class TwilioCredentialsValidator {

    private static codeField = (fieldName: string) => Joi.string().required().regex(/^(\w)+$/).messages({
        "any.required": `The ${fieldName} is required.`,
        "string.empty": `The ${fieldName} is required.`,
        "string.pattern.base": `The ${fieldName} must be alphanumeric.`
    })

    private static _accountCredentialsSchema = Joi.object({
        accountSid: TwilioCredentialsValidator.codeField("Account SID"),
        authToken: TwilioCredentialsValidator.codeField("Auth Token"),
    });

    private _accountSid: string;
    private _authToken: string;

    public constructor(accountSid: string, authToken: string) {
        this._accountSid = accountSid;
        this._authToken = authToken;
    }

    public async validateAndStoreCredentials(): Promise<void> {
        try {
            await TwilioCredentialsValidator._accountCredentialsSchema.validateAsync({ accountSid: this._accountSid, authToken: this._authToken });
            await twilio(this._accountSid, this._authToken).verify.services.create({ channel: "sms", friendlyName: "Twilio Sender" } as any);
            setTwilioAccountCredentials(this._accountSid, this._authToken);
        } catch (err) {
            if (process.env.NODE_ENV === "production" && (err as any).code === 20003) {
                throw new Error("The credentials specified are invalid.");
            }
            throw err;
        }
    }
}