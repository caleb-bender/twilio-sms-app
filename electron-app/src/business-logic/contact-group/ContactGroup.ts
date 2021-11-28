/**
 * ContactGroup.ts
 * Description: ContactGroup is a class responsible for CRUD operations on a contact group object
 * Use Cases: Creating, Reading, Updating, or Deleting a contact group
 */
import Joi from "joi";
import path from "path";
import APP_DATA_DIRECTORY from "../AppDataDirectory";
import { getTwilioAccountId } from "../TwilioAccountCredentials";
import { promisify } from "util";
import fs from "fs";

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

    private static async createContactGroupsJsonIfNotExists() {
        const contactGroupFilePath = ContactGroup.getContactGroupsJsonFilePath();
        const userFolderPath = path.join(APP_DATA_DIRECTORY, getTwilioAccountId());
        if (!fs.existsSync(userFolderPath)) {
            await promisify(fs.mkdir)(userFolderPath);
        }
        if (!fs.existsSync(contactGroupFilePath)) {
            await promisify(fs.writeFile)(contactGroupFilePath, "{}");
        }
    }

    private constructor(contactGroupName: string, contacts: Record<string, ContactEntry>) {
        this._contactGroupName = contactGroupName;
        this._contacts = contacts;
    }

    /**
     * @returns the correct contact group file based on the current logged in user or throws an error
     */
    public static getContactGroupsJsonFilePath() {
        if (getTwilioAccountId() === undefined) throw new Error("You are not logged in. Please close the window and try again.");
        return path.join(APP_DATA_DIRECTORY,  getTwilioAccountId(), "contact-groups.json");
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

    public static async getContactGroupsJson(): Promise<Record<string, Record<string, ContactEntry>>> {
        return JSON.parse(await promisify(fs.readFile)(ContactGroup.getContactGroupsJsonFilePath(), "utf-8"));
    }

    public static async validateContactGroupNameIsAvailable(contactGroupName: string) {
        try {
            const contactGroupsJson: Record<string, ContactEntry> = await this.getContactGroupsJson();
            if (contactGroupName in contactGroupsJson) throw new Error("There is already a contact group with the name specified.");
        } catch (err) {
            throw err;
        }
    }

    public static async createFromName(contactGroupName: string): Promise<ContactGroup> {
        try {
            await this.createContactGroupsJsonIfNotExists();
            await this.validateContactGroupNameIsAvailable(contactGroupName);
            const contactGroupNameValidation = await this.validateContactGroupName(contactGroupName);
            if (contactGroupNameValidation.error) throw contactGroupNameValidation.error;
            return new ContactGroup(contactGroupName, {});
        } catch (err) {
            throw err;
        }
    }

    public static async loadFromFile(contactGroupName: string): Promise<ContactGroup> {
        try {
            const contactGroupsJson = await this.getContactGroupsJson();
            if (!(contactGroupName in contactGroupsJson)) throw new Error(`There is no such contact group with the name \"${contactGroupName}\".`);
            return new ContactGroup(contactGroupName, contactGroupsJson[contactGroupName]);
        } catch (err) {
            throw err;
        }
    }

    public async save() {
        try {
            const contactGroupsJson = await ContactGroup.getContactGroupsJson();
            contactGroupsJson[this._contactGroupName] = this._contacts;
            await promisify(fs.writeFile)(ContactGroup.getContactGroupsJsonFilePath(), JSON.stringify(contactGroupsJson));
        } catch (err) {
            throw err;
        }
    }

    public getContactEntryKey(contactEntry: ContactEntry) {
        return `${contactEntry.firstName} ${contactEntry.lastName}`;
    }

    public async createContactEntry(contactEntry: ContactEntry) {
        try {
            const contactEntryKey = this.getContactEntryKey(contactEntry);
            if (contactEntryKey in this._contacts) throw new Error(`${contactEntryKey} is already an existing contact.`);
            const contactEntryValidationResult = await ContactGroup.validateContactEntry(contactEntry);
            if (contactEntryValidationResult.error) throw contactEntryValidationResult.error;
        } catch (err) {
            throw err;
        }
    }

    public async updateContactEntry(oldContactEntry: ContactEntry, newContactEntry: ContactEntry) {
        try {
            const contactEntryValidationResult = await ContactGroup.validateContactEntry(newContactEntry);
            if (contactEntryValidationResult.error) throw contactEntryValidationResult.error;
            const contactEntryKey = this.getContactEntryKey(oldContactEntry);
            if (!(contactEntryKey in this._contacts)) throw new Error(`The ${contactEntryKey} could not be located for updating.`);
            delete this._contacts[contactEntryKey];
            this._contacts[this.getContactEntryKey(newContactEntry)] = newContactEntry;
        } catch (err) {
            throw err;
        }
    }

    public async delete() {
        try {
            const contactGroupsJson = await ContactGroup.getContactGroupsJson();
            delete contactGroupsJson[this._contactGroupName];
            await promisify(fs.writeFile)(ContactGroup.getContactGroupsJsonFilePath(), JSON.stringify(contactGroupsJson));
        } catch (err) {
            throw err;
        }
    }

    public async deleteContactEntry(contactEntry: ContactEntry) {
        try {
            const contactEntryKey = this.getContactEntryKey(contactEntry);
            if (!(contactEntryKey in this._contacts)) throw new Error(`The ${contactEntryKey} could not be located for updating.`);
            delete this._contacts[contactEntryKey];
        } catch (err) {
            throw err;
        }
    }
}