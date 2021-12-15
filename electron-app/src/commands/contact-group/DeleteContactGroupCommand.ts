/**
 * DeleteContactGroupCommand.ts
 * Description: A Command that executes the business logic to find and delete a contact group.
 */

import ContactGroup from "../../business-logic/contact-group/ContactGroup";
import ICommand from "../ICommand";

export default class DeleteContactGroupCommand implements ICommand<void> {

    private _contactGroupName: string;

    public constructor(contactGroupName: string) {
        this._contactGroupName = contactGroupName;
    }
    /** Executes the code necessary to delete an existing contact group */
    public async execute(): Promise<void> {
        const contactGroup = await ContactGroup.loadFromFile(this._contactGroupName);
        await contactGroup.delete();
    }
}