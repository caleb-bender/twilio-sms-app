/**
 * RemoveContactEntryCommand.ts
 * Description: This command is executed when a user wants to remove a contact entry from a contact group
 */

import ContactGroup from "../../business-logic/contact-group/ContactGroup";
import ICommand from "../ICommand";

export default class RemoveContactEntryCommand implements ICommand<void> {

    private _contactGroupName: string;
    private _contactEntryKey: string;

    public constructor(contactGroupName: string, contactEntryKey: string) {
        this._contactGroupName = contactGroupName;
        this._contactEntryKey = contactEntryKey;
    }
    /** Executes code to remove a contact entry reference from the contact group */
    public async execute(): Promise<void> {
        const contactGroup = await ContactGroup.loadFromFile(this._contactGroupName);
        contactGroup.removeContactEntry(this._contactEntryKey);
        await contactGroup.save();
    }
}