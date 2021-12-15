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
import ContactEntry, { ContactEntrySchema } from "../contact-entry/ContactEntry";

export default class ContactGroup {

    private _contactGroupName: string;
    // references to contact entries
    private _contacts: Record<string, boolean>;

    private static _contactGroupNameSchema = Joi.string().regex(/^(\w|\s)+$/).required().max(200).messages({
        "string.empty": "The contact group name is required.",
        "any.required": "The contact group name is required.",
        "string.pattern.base": "The contact group name can only contain letters, numbers, and spaces.",
        "string.max": "The contact group name must be no longer than 200 characters."
    });
    /**
     * Creates the contact groups Json file if it does not already exist in the file system
     */
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

    private constructor(contactGroupName: string, contacts: Record<string, boolean>) {
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
    /**
     * @param contactGroupName The unique contact group name
     * @returns the Joi validation result with or without an error
     */
    public static async validateContactGroupName(contactGroupName: string): Promise<Joi.ValidationResult> {
        try {
            await this._contactGroupNameSchema.validateAsync(contactGroupName);
            return { value: contactGroupName };
        } catch (err) {
            return { value: contactGroupName, error: (err as Joi.ValidationError) };
        }
    }
    /**
     * @returns the deserialized record of all contact groups and their respective contact entry references
     */
    public static async getContactGroupsJson(): Promise<Record<string, Record<string, boolean>>> {
        return JSON.parse(await promisify(fs.readFile)(ContactGroup.getContactGroupsJsonFilePath(), "utf-8"));
    }
    /**
     * Asserts that the contact group name is not taken, if it is an error is thrown
     * @param contactGroupName the contact group name to validate
     */
    public static async validateContactGroupNameIsAvailable(contactGroupName: string) {
        try {
            const contactGroupsJson = await this.getContactGroupsJson();
            if (contactGroupName in contactGroupsJson) throw new Error("There is already a contact group with the name specified.");
        } catch (err) {
            throw err;
        }
    }
    /**
     * @param contactGroupName the unique contact group name
     * @returns the ContactGroup instance created from the name
     */
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
    /**
     * @param contactGroupName the unique contact group name
     * @returns the ContactGroup instance with the data from the Json file
     */
    public static async loadFromFile(contactGroupName: string): Promise<ContactGroup> {
        try {
            const contactGroupsJson = await this.getContactGroupsJson();
            if (!(contactGroupName in contactGroupsJson)) throw new Error(`There is no such contact group with the name \"${contactGroupName}\".`);
            return new ContactGroup(contactGroupName, contactGroupsJson[contactGroupName]);
        } catch (err) {
            throw err;
        }
    }
    /** Writes all changes to the current ContactGroup instance to disk */
    public async save() {
        try {
            const contactGroupsJson = await ContactGroup.getContactGroupsJson();
            // save the contact references
            contactGroupsJson[this._contactGroupName] = this._contacts;
            await promisify(fs.writeFile)(ContactGroup.getContactGroupsJsonFilePath(), JSON.stringify(contactGroupsJson));
        } catch (err) {
            throw err;
        }
    }
    /** Removes the ContactGroup instance data from the contact groups in memory. save() must be called to propogate those changes
     * to disk
    */
    public async delete() {
        try {
            const contactGroupsJson = await ContactGroup.getContactGroupsJson();
            delete contactGroupsJson[this._contactGroupName];
            await promisify(fs.writeFile)(ContactGroup.getContactGroupsJsonFilePath(), JSON.stringify(contactGroupsJson));
        } catch (err) {
            throw err;
        }
    }

    // Getter and setter for this._contacts
    public get contacts() { return this._contacts; }
    public set contacts(newContacts: Record<string, boolean>) { this._contacts = newContacts; }

    /**
     * Adds a reference to a contact entry
     * @param contactEntryKey The unique contact entry key
     */
    public addContactEntry(contactEntryKey: string ) {
        this._contacts[contactEntryKey] = true; 
    }
    /**
     * Removes a reference to a contact entry
     * @param contactEntryKey The unique contact entry key
     */
    public removeContactEntry(contactEntryKey: string) {
        delete this._contacts[contactEntryKey];
    }
}