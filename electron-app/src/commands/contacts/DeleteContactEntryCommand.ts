/**
 * DeleteContactEntryCommand.ts
 * Description: This command is executed when a contact entry is deleted
 */

import ContactEntry, { ContactEntrySchema } from "../../business-logic/contact-entry/ContactEntry";
import ICommand from "../ICommand";

export default class DeleteContactEntryCommand implements ICommand<ContactEntrySchema> {

    private _contactEntrySchema: ContactEntrySchema;

    public constructor(contactEntrySchema: ContactEntrySchema) {
        this._contactEntrySchema = contactEntrySchema;
    }
    public async execute(): Promise<ContactEntrySchema> {
        const contactEntry = await ContactEntry.loadContactEntryFromFile(`${this._contactEntrySchema.firstName} ${this._contactEntrySchema.lastName}`);
        await contactEntry.delete();
        await contactEntry.save();
        return this._contactEntrySchema;
    }
}