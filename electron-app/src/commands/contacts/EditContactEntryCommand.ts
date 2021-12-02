/**
 * EditContactEntryCommand.ts
 * Description: This command gets executed when the user requests to modify a contact entry's data
 */

import ContactEntry, { ContactEntrySchema } from "../../business-logic/contact-entry/ContactEntry";
import ICommand from "../ICommand";

export default class EditContactEntryCommand implements ICommand<void> {

    private _currentContactEntrySchema: ContactEntrySchema;
    private _newContactEntrySchema: ContactEntrySchema;

    public constructor(currentContactEntrySchema: ContactEntrySchema, newContactEntrySchema: ContactEntrySchema) {
        this._currentContactEntrySchema = currentContactEntrySchema;
        this._newContactEntrySchema = newContactEntrySchema;
    }
    public async execute(): Promise<void> {
        const contactEntry = await ContactEntry.loadContactEntryFromFile(`${this._currentContactEntrySchema.firstName} ${this._currentContactEntrySchema.lastName}`);
        await contactEntry.update(this._newContactEntrySchema);
        await contactEntry.save();
    }
}