/**
 * ContactEntry.ts
 * Description: A class that manages CRUD operations for contact entries
 */

import Joi from "joi";
import path from "path";
import APP_DATA_DIRECTORY from "../AppDataDirectory";
import { getTwilioAccountId } from "../TwilioAccountCredentials";
import fs from "fs";
import { promisify } from "util";

export interface ContactEntrySchema {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
}


export default class ContactEntry {

    private static nameField = (fieldName: string) => Joi.string().regex(/^(\w|\s|\.|'|-|,)+$/).required().max(100).messages({
        "any.required": `The ${fieldName} is required.`,
        "string.empty": `The ${fieldName} is required.`,
        "string.pattern.base": `The ${fieldName} contains invalid characters.`,
        "string.max": `The ${fieldName} must be no longer than 100 characters.`
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

    private _contactEntrySchema: ContactEntrySchema;
    private _contactEntries: Record<string, ContactEntrySchema>;

    public constructor(contactEntrySchema: ContactEntrySchema, contactEntries: Record<string, ContactEntrySchema>) {
        this._contactEntrySchema = contactEntrySchema;
        this._contactEntries = contactEntries;
    }

    /**
     * @returns the correct contact entries file based on the current logged in user or throws an error
     */
     public static getContactGroupsJsonFilePath() {
        if (getTwilioAccountId() === undefined) throw new Error("You are not logged in. Please close the window and try again.");
        return path.join(APP_DATA_DIRECTORY,  getTwilioAccountId(), "contact-entries.json");
    }

    private static async createContactEntriesJsonIfNotExists() {
        const contactEntryFilePath = ContactEntry.getContactGroupsJsonFilePath();
        const userFolderPath = path.join(APP_DATA_DIRECTORY, getTwilioAccountId());
        if (!fs.existsSync(userFolderPath)) {
            await promisify(fs.mkdir)(userFolderPath);
        }
        if (!fs.existsSync(contactEntryFilePath)) {
            await promisify(fs.writeFile)(contactEntryFilePath, "{}");
        }
    }

    public static async validateContactEntry(contactEntry: ContactEntrySchema): Promise<Joi.ValidationResult> {
        try {
            await this._contactEntrySchema.validateAsync(contactEntry);
            return { value: contactEntry };
        } catch (err) {
            return { value: contactEntry, error: (err as Joi.ValidationError) };
        }
    }

    public static async getContactEntriesJson(): Promise<Record<string, ContactEntrySchema>> {
        return JSON.parse(await promisify(fs.readFile)(ContactEntry.getContactGroupsJsonFilePath(), "utf-8"));
    }

    public static getContactEntryKey(contactEntry: ContactEntrySchema) {
        return `${contactEntry.firstName} ${contactEntry.lastName}`;
    }

    public static async createContactEntry(contactEntry: ContactEntrySchema): Promise<ContactEntry> {
        try {
            await this.createContactEntriesJsonIfNotExists();
            // validate the contact entry
            const contactEntryValidationResult = await ContactEntry.validateContactEntry(contactEntry);
            if (contactEntryValidationResult.error) throw contactEntryValidationResult.error;
            const contactEntryKey = this.getContactEntryKey(contactEntry);
            const contactEntries = await ContactEntry.getContactEntriesJson();
            // make sure the contact entry does not already exist
            if (contactEntryKey in contactEntries) throw new Error(`${contactEntryKey} is already an existing contact.`);
            // add the contact to the contact entries
            contactEntries[contactEntryKey] = contactEntry;
            return new ContactEntry(contactEntry, contactEntries);
        } catch (err) {
            throw err;
        }
    }

    public static async loadContactEntryFromFile(contactEntryKey: string) {
        try {
            const contactEntries = await ContactEntry.getContactEntriesJson();
            if (!(contactEntryKey in contactEntries)) throw new Error(`The contact "${contactEntryKey}" does not exist.`);
            const contactEntry = contactEntries[contactEntryKey];
            return new ContactEntry(contactEntry, contactEntries);
        } catch (err) {
            throw err;
        }
    }

    public async update(newContactEntryData: ContactEntrySchema) {
        try {
            // validate the new contact entry
            const newContactEntryValidationResult = await ContactEntry.validateContactEntry(newContactEntryData);
            if (newContactEntryValidationResult.error) throw newContactEntryValidationResult.error;
            const currentContactEntryKey = ContactEntry.getContactEntryKey(this._contactEntrySchema);
            this._contactEntries = await ContactEntry.getContactEntriesJson();
            // make sure the current contact entry exists
            if (!(currentContactEntryKey in this._contactEntries)) throw new Error(`The contact "${currentContactEntryKey}" could not be located for updating.`);
            // delete the current entry and add the new entry in its place
            delete this._contactEntries[currentContactEntryKey];
            this._contactEntries[ContactEntry.getContactEntryKey(newContactEntryData)] = newContactEntryData;
        } catch (err) {
            throw err;
        }
    }

    public async delete() {
        try {
            // get the contact entry key to delete the contact by
            const contactEntryKey = ContactEntry.getContactEntryKey(this._contactEntrySchema);
            delete this._contactEntries[contactEntryKey];
        } catch (err) {
            throw err;
        }
    }

    public async save() {
        const contactEntryFilePath = ContactEntry.getContactGroupsJsonFilePath();
        await promisify(fs.writeFile)(contactEntryFilePath, JSON.stringify(this._contactEntries));
    }
}