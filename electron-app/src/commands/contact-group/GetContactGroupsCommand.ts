/**
 * GetContactGroupsCommand.ts
 * Description: A command that executes the business logic required to retrieve all the current contact groups
 */

import ContactGroup from "../../business-logic/contact-group/ContactGroup";
import ICommand from "../ICommand";

export default class GetContactGroupsCommand implements ICommand<string[]> {
    /** Executes code to retrieve all currently saved contact groups
     * @returns an array of contact group names
    */
    public async execute(): Promise<string[]> {
        const contactGroupData = await ContactGroup.getContactGroupsJson();
        return Object.keys(contactGroupData);
    }
}