/**
 * CreateContactGroupCommand.ts
 * Description: A command that calls the business logic to create a new contact group.
 */

import ICommand from "../ICommand";


export default class CreateContactGroupCommand implements ICommand {

    private _contactGroupName: string;

    public constructor(contactGroupName: string) {
        this._contactGroupName = contactGroupName;
    }

    execute(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}