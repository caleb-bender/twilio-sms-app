/**
 * MessageCredentialsValidator.ts
 * Description: validates sent credentials used to send a message with Twilio
 */

import Joi from "joi";
import ContactGroup from "../contact-group/ContactGroup";

export default class MessageCredentialsValidator {

    private _phoneNumber: string;
    private _nameOnMessage: string;
    private _contactGroups: string[];
    private _messageBody: string;

    private static _messageCredentialsValidator = Joi.object({
        phoneNumber: Joi.string().length(11).regex(/^1(\d)+$/).required().messages({
            "any.required": "The Twilio sender phone number is required.",
            "string.empty": "The Twilio sender phone number is required.",
            "string.pattern.base": "The Twilio sender phone number must be a North American number exactly 11 digits long.",
            "string.length": "The Twilio sender phone number must be a North American number exactly 11 digits long."
        }),
        nameOnMessage: Joi.string().required().max(250).messages({
            "any.required": "The display name for the message is required.",
            "string.empty": "The display name for the message is required.",
            "string.max": "The display name must be a maximum of 250 characters."
        }),
        messageBody: Joi.string().required().max(1000).messages({
            "any.required": "The message body is required.",
            "string.empty": "The message body is required.",
            "string.max": "The message body must be a maximum of 1000 characters."
        })
    });

    public constructor(phoneNumber: string, nameOnMessage: string, contactGroups: string[], messageBody: string) {
        this._phoneNumber = phoneNumber.replace(/(\s|\+)+/g, "");
        this._nameOnMessage = nameOnMessage;
        this._contactGroups = contactGroups;
        this._messageBody = messageBody;
    }
    /**
     * Validates that the fields used to send a message are valid
     */
    public async validate() {
        try {
            await MessageCredentialsValidator
            ._messageCredentialsValidator
            .validateAsync({ phoneNumber: this._phoneNumber, nameOnMessage: this._nameOnMessage, messageBody: this._messageBody });
            // there must be at least one contact group
            if (this._contactGroups.length === 0) {
                throw new Error("You must specify at least one contact group to send the message to.");
            }
            // verify that all contact groups exist
            const contactGroups = await ContactGroup.getContactGroupsJson();
            for (const contactGroupName of this._contactGroups) {
                if (!(contactGroupName in contactGroups)) {
                    throw new Error(`The contact group "${contactGroupName}" does not exist.`);
                }
            }
        } catch (err) {
            throw err;
        }
    }
}