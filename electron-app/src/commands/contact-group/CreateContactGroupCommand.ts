/**
 * CreateContactGroupCommand.ts
 * Description: A command that calls the business logic to create a new contact group.
 */

import ContactGroup from "../../business-logic/contact-group/ContactGroup";
import ICommand from "../ICommand";


export default class CreateContactGroupCommand implements ICommand {

    private _contactGroupName: string;

    public constructor(contactGroupName: string) {
        this._contactGroupName = contactGroupName;
    }

    public async execute(): Promise<void> {
        try {
            const contactGroup = await ContactGroup.createFromName(this._contactGroupName);
            await contactGroup.save();
        } catch (err) {
            throw err;
        }
    }
}