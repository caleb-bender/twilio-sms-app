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

    public static getSavedAccountPhoneAndNameJsonPath() {
        return path.join(APP_DATA_DIRECTORY, getTwilioAccountId(), "saved-phone-and-name.json");
    }

    public static async getSavedAccountPhoneAndNameJson(): Promise<Record<string, string>> {
        const savedPhoneAndNameJson = await promisify(fs.readFile)(this.getSavedAccountPhoneAndNameJsonPath(), "utf-8");
        return JSON.parse(savedPhoneAndNameJson);
    }

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

    public static async savePhoneAndName(phoneNumber: string, nameOnMessage: string) {
        await this.createSavedAccountPhoneAndNameJsonIfDoesNotExist();
        const savedPhoneAndNameJsonPath = this.getSavedAccountPhoneAndNameJsonPath();
        const savedPhoneAndNameJson = await this.getSavedAccountPhoneAndNameJson();
        savedPhoneAndNameJson["phoneNumber"] = phoneNumber;
        savedPhoneAndNameJson["nameOnMessage"] = nameOnMessage;
        await promisify(fs.writeFile)(savedPhoneAndNameJsonPath, JSON.stringify(savedPhoneAndNameJson));
    }

    public static async getPhoneAndName(): Promise<SavedAccountPhoneAndNameProps> {
        await this.createSavedAccountPhoneAndNameJsonIfDoesNotExist();
        const savedPhoneAndNameJson = await this.getSavedAccountPhoneAndNameJson();
        return (savedPhoneAndNameJson as unknown) as SavedAccountPhoneAndNameProps;
    }
}