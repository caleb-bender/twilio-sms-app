/**
 * SavedAccountPhoneAndName.ts
 * Description: saves and retrieves the phone number and name of a previously used message for the account
 */

import fs from "fs";
import path from "path";
import { promisify } from "util";
import APP_DATA_DIRECTORY from "../AppDataDirectory";
import { getTwilioAccountId } from "../TwilioAccountCredentials";

interface SavedAccountPhoneAndNameProps {
    phoneNumber: string;
    nameOnMessage: string;
}

export default class SavedAccountPhoneAndName {
    /** @returns the path to the saved phone number and name Json file */
    public static getSavedAccountPhoneAndNameJsonPath() {
        return path.join(APP_DATA_DIRECTORY, getTwilioAccountId(), "saved-phone-and-name.json");
    }
    /** @returns a deserialized record with the previously saved phone number and sender name for messaging */
    public static async getSavedAccountPhoneAndNameJson(): Promise<Record<string, string>> {
        const savedPhoneAndNameJson = await promisify(fs.readFile)(this.getSavedAccountPhoneAndNameJsonPath(), "utf-8");
        return JSON.parse(savedPhoneAndNameJson);
    }
    /** Creates the saved phone number and name json file with empty data if it does not already exist */
    public static async createSavedAccountPhoneAndNameJsonIfDoesNotExist() {
        const savedPhoneAndNameJsonPath = this.getSavedAccountPhoneAndNameJsonPath();
        const userFolderPath = path.join(APP_DATA_DIRECTORY, getTwilioAccountId());
        if (!fs.existsSync(userFolderPath)) {
            await promisify(fs.mkdir)(userFolderPath);
        }
        if (!fs.existsSync(savedPhoneAndNameJsonPath)) {
            await promisify(fs.writeFile)(savedPhoneAndNameJsonPath, "{ \"phoneNumber\": \"\", \"nameOnMessage\": \"\" }");
        }
    }
    /**
     * Saves the most recently used phone number and sender name to file
     * @param phoneNumber the phone number to save
     * @param nameOnMessage the name on the message to save
     */
    public static async savePhoneAndName(phoneNumber: string, nameOnMessage: string) {
        await this.createSavedAccountPhoneAndNameJsonIfDoesNotExist();
        const savedPhoneAndNameJsonPath = this.getSavedAccountPhoneAndNameJsonPath();
        const savedPhoneAndNameJson = await this.getSavedAccountPhoneAndNameJson();
        savedPhoneAndNameJson["phoneNumber"] = phoneNumber;
        savedPhoneAndNameJson["nameOnMessage"] = nameOnMessage;
        await promisify(fs.writeFile)(savedPhoneAndNameJsonPath, JSON.stringify(savedPhoneAndNameJson));
    }
    /** @returns an object with the properties `phoneNumber` and `nameOnMessage` that contain the data for the previously used phone and name. */
    public static async getPhoneAndName(): Promise<SavedAccountPhoneAndNameProps> {
        await this.createSavedAccountPhoneAndNameJsonIfDoesNotExist();
        const savedPhoneAndNameJson = await this.getSavedAccountPhoneAndNameJson();
        return (savedPhoneAndNameJson as unknown) as SavedAccountPhoneAndNameProps;
    }
}