/**
 * AddContactEntryCommand.ts
 * Description: This command is executed when a user wants to add a contact entry to a contact group
 */

import ContactEntry from "../../business-logic/contact-entry/ContactEntry";
import ContactGroup from "../../business-logic/contact-group/ContactGroup";
import ICommand from "../ICommand";

export default class AddContactEntryCommand implements ICommand<void> {

    private _contactGroupName: string;
    private _contactEntryKey: string;

    public constructor(contactGroupName: string, contactEntryKey: string) {
        this._contactGroupName = contactGroupName;
        this._contactEntryKey = contactEntryKey;
    }
    /** Executes the business logic required to validate and add a reference to a contact entry in the contact group */
    public async execute(): Promise<void> {
        const contactEntries = await ContactEntry.getContactEntriesJson();
        // make sure the contact entry exists before adding it
        if (!(this._contactEntryKey in contactEntries)) throw new Error("The contact specified does not exist.");
        const contactGroup = await ContactGroup.loadFromFile(this._contactGroupName);
        contactGroup.addContactEntry(this._contactEntryKey);
        await contactGroup.save();
    }
}