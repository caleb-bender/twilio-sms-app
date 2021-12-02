/**
 * CreateContactEntryCommand.ts
 * Description: This command is executed when a user wants to create a new contact entry
 */

import ContactEntry, { ContactEntrySchema } from "../../business-logic/contact-entry/ContactEntry";
import ICommand from "../ICommand";

export default class CreateContactEntryCommand implements ICommand<void> {

    private _contactEntrySchema: ContactEntrySchema;

    public constructor(contactEntrySchema: ContactEntrySchema) {
        this._contactEntrySchema = contactEntrySchema;
    }
    public async execute(): Promise<void> {
        const contactEntry = await ContactEntry.createContactEntry(this._contactEntrySchema);
        await contactEntry.save();
    }
}