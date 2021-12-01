/**
 * GetContactsCommand.ts
 * Description: A command that gets all contacts given a contact group name
 */

import ContactGroup, { ContactEntry } from "../../business-logic/contact-group/ContactGroup";
import ICommand from "../ICommand";

export default class GetContactsCommand implements ICommand<Record<string, ContactEntry>> {

    private _contactGroupName: string;

    public constructor(contactGroupName: string) {
        this._contactGroupName = contactGroupName;
    }

    public async execute(): Promise<Record<string, ContactEntry>> {
        const contactGroup = await ContactGroup.loadFromFile(this._contactGroupName);
        return contactGroup.contacts;
    }

}