/**
 * SearchContactsCommand.ts
 * Description: A command that gets all contacts given a contact group name and a search query
 */

import ContactEntry, { ContactEntrySchema } from "../../business-logic/contact-entry/ContactEntry";
import ICommand from "../ICommand";

export default class SearchContactsCommand implements ICommand<ContactEntrySchema[]> {

    private _contactGroupName: string;
    private _contactNameSearch: string;

    public constructor(contactGroupName: string, contactNameSearch: string) {
        this._contactGroupName = contactGroupName;
        this._contactNameSearch = contactNameSearch;
    }

    public async execute(): Promise<ContactEntrySchema[]> {
        const contactEntriesRecord = await ContactEntry.getContactEntriesJson();
        const contactEntriesArr =
        Object.keys(contactEntriesRecord)
        .map(contactEntryKey => contactEntriesRecord[contactEntryKey])
        .filter(contactEntry => `${contactEntry.firstName} ${contactEntry.lastName}`.search(this._contactNameSearch) !== -1 ? false : true);
        return contactEntriesArr;
    }

}