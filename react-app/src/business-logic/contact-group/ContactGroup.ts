/**
 * ContactGroup.ts
 * Description: ContactGroup is a class responsible for CRUD operations on a contact group object
 * Use Cases: Creating, Reading, Updating, or Deleting a contact group
 */
import Joi from "joi";
import path from "path";
import APP_DATA_DIRECTORY from "../AppDataDirectory";
import { getTwilioAccountId } from "../TwilioAccountCredentials";

interface ContactEntry {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}


export default class ContactGroup {

    private static nameField = (fieldName: string) => Joi.string().regex(/^\S+$/).required().max(100).messages({
        "any.required": `The ${fieldName} is required.`,
        "string.empty": `The ${fieldName} is required.`,
        "string.pattern.base": `The ${fieldName} cannot contain spaces.`,
        "string.max": `The ${fieldName} must be no longer than 100 characters.`
    });

    // each user has their own folder using their twilio account sid
    private _contactGroupJsonPath: string;

    private _contactGroupName: string;
    private _contacts: Record<string, ContactEntry>;

    private static _contactGroupNameSchema = Joi.string().regex(/^(\w|\s)+$/).required().max(200).messages({
        "string.empty": "The contact group name is required.",
        "any.required": "The contact group name is required.",
        "string.pattern.base": "The contact group name can only contain letters, numbers, and spaces.",
        "string.max": "The contact group name must be no longer than 200 characters."
    });

    private static _contactEntrySchema = Joi.object({
        firstName: this.nameField("first name"),
        lastName: this.nameField("last name"),
        phoneNumber: Joi.string().length(10).regex(/^\d+$/).required().messages({
            "any.required": "The phone number is required.",
            "string.empty": "The phone number is required.",
            "string.pattern.base": "The phone number must be all numbers.",
            "string.length": "The phone number must be exactly 10 digits long."
        })
    });

    private constructor(contactGroupName: string, contacts: Record<string, ContactEntry>) {
        if (getTwilioAccountId() === undefined) throw new Error("You are not logged in. Please close the window and try again.");
        this._contactGroupJsonPath = path.join(APP_DATA_DIRECTORY,  getTwilioAccountId(), "contact-groups.json");
        this._contactGroupName = contactGroupName;
        this._contacts = contacts;
    }

    public static async validateContactGroupName(contactGroupName: string): Promise<Joi.ValidationResult> {
        try {
            await this._contactGroupNameSchema.validateAsync(contactGroupName);
            return { value: contactGroupName };
        } catch (err) {
            return { value: contactGroupName, error: (err as Joi.ValidationError) };
        }
    }

    public static async validateContactEntry(contactEntry: ContactEntry): Promise<Joi.ValidationResult> {
        try {
            await this._contactEntrySchema.validateAsync(contactEntry);
            return { value: contactEntry };
        } catch (err) {
            return { value: contactEntry, error: (err as Joi.ValidationError) };
        }
    }

    public static async createFromName(contactGroupName: string): Promise<ContactGroup> {
        try {
            const contactGroupNameValidation = await this.validateContactGroupName(contactGroupName);
            if (contactGroupNameValidation.error) throw contactGroupNameValidation.error;
            return new ContactGroup(contactGroupName, {});
        } catch (err) {
            throw err;
        }
    }

    public static async loadFromFile(): Promise<ContactGroup> {
        throw 14;
        try {
            
        } catch (err) {
            
        }
    }
}