import { app, BrowserWindow } from "electron";
import path from "path";
import dotenv from "dotenv";
import { ipcMain } from "electron";
import fs from "fs";
import url from "url";
import { promisify } from "util";
import APP_DATA_DIRECTORY from "./src/business-logic/AppDataDirectory";
import createContactGroupEvent from "./src/ipc-main-events/createContactGroupEvent";
import requestContactGroupsListEvent from "./src/ipc-main-events/requestContactGroupsListEvent";
import deleteContactGroupEvent from "./src/ipc-main-events/deleteContactGroupEvent";
import createContactEntryEvent from "./src/ipc-main-events/createContactEntryEvent";
import searchForContactsEvent from "./src/ipc-main-events/searchForContactsEvent";
import deleteContactEntryEvent from "./src/ipc-main-events/deleteContactEntryEvent";
import editContactEntryEvent from "./src/ipc-main-events/editContactEntryEvent";
import addContactEntryEvent from "./src/ipc-main-events/addContactEntryEvent";
import removeContactEntryEvent from "./src/ipc-main-events/removeContactEntryEvent";
import getContactsOfContactGroupEvent from "./src/ipc-main-events/getContactsOfContactGroupEvent";
import saveContactEntriesForContactGroupEvent from "./src/ipc-main-events/saveContactEntriesForContactGroupEvent";
import loginToTwilioEvent from "./src/ipc-main-events/loginToTwilioEvent";
import logoutFromTwilioEvent from "./src/ipc-main-events/logoutFromTwilioEvent";
import getAllContactGroupNamesEvent from "./src/ipc-main-events/getAllContactGroupNamesEvent";
import sendMessageToContactGroupRecipientsEvent from "./src/ipc-main-events/sendMessageToContactGroupRecipientsEvent";
import getSavedPhoneNumberAndNameEvent from "./src/ipc-main-events/getSavedPhoneNumberAndNameEvent";
dotenv.config();

// create the twilio app folder if it does not exist
if (!fs.existsSync(APP_DATA_DIRECTORY)) {
    promisify(fs.mkdir)(APP_DATA_DIRECTORY);
}

ipcMain.on("login-to-twilio", loginToTwilioEvent);
ipcMain.on("logout-from-twilio", logoutFromTwilioEvent);
ipcMain.on("create-contact-group", createContactGroupEvent);
ipcMain.on("create-contact-entry", createContactEntryEvent);
ipcMain.on("save-contact-entries-for-contact-group", saveContactEntriesForContactGroupEvent);
ipcMain.on("add-contact-entry", addContactEntryEvent);
ipcMain.on("edit-contact-entry", editContactEntryEvent);
ipcMain.on("request-contact-groups-list", requestContactGroupsListEvent);
ipcMain.on("remove-contact-entry", removeContactEntryEvent);
ipcMain.on("delete-contact-entry", deleteContactEntryEvent);
ipcMain.on("delete-contact-group", deleteContactGroupEvent);
ipcMain.on("search-for-contacts", searchForContactsEvent());
ipcMain.on("get-all-contact-group-names", getAllContactGroupNamesEvent);
ipcMain.on("get-all-contacts", searchForContactsEvent("get-all-contacts-success"));
ipcMain.on("get-contacts-of-contact-group", getContactsOfContactGroupEvent);
ipcMain.on("get-saved-phone-number-and-name", getSavedPhoneNumberAndNameEvent);
ipcMain.on("send-message-to-contact-group-recipients", sendMessageToContactGroupRecipientsEvent);

let electronWindow: BrowserWindow | null = null;

function initializeWindow() {
    electronWindow = new BrowserWindow({
        title: process.env.APP_NAME ?? "Loading",
        autoHideMenuBar: true,
        width: 1280,
        height: 720,
        icon: "../../react-app/build/wizrds_icon.ico",
        webPreferences: ({
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        } as any)
    });
    if (process.env.NODE_ENV === "production") {
        electronWindow.loadFile(path.join(__dirname, "../../react-app/build/index.html"));
        // electronWindow.loadURL(url.format({
        //     pathname: path.join(__dirname, "../../react-app/build/index.html"),
        //     protocol: 'file:',
        //     slashes: true,
        // }));
        console.log("load react production build");
    } else {
        electronWindow.loadURL(process.env.ELECTRON_START_URL ?? "http://localhost:3000");
    }
    electronWindow.webContents.openDevTools();

    electronWindow.on("closed", () => {
        electronWindow = null;
    });
    
}

app.on("ready", initializeWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.on("activate", () => {
    if (electronWindow === null) {
        initializeWindow();
    }
});