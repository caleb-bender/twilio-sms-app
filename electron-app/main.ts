import { app, BrowserWindow } from "electron";
import path from "path";
import dotenv from "dotenv";
import { ipcMain } from "electron";
import fs from "fs";
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
dotenv.config();

// create the twilio app folder if it does not exist
if (!fs.existsSync(APP_DATA_DIRECTORY)) {
    promisify(fs.mkdir)(APP_DATA_DIRECTORY);
}

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
ipcMain.on("get-all-contacts", searchForContactsEvent("get-all-contacts-success"));
ipcMain.on("get-contacts-of-contact-group", getContactsOfContactGroupEvent);

let electronWindow: BrowserWindow | null = null;

function initializeWindow() {
    electronWindow = new BrowserWindow({
        title: process.env.APP_NAME ?? "Loading",
        autoHideMenuBar: true,
        width: 960,
        height: 640,
        webPreferences: ({
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        } as any)
    });
    if (process.env.NODE_ENV === "production") {
        electronWindow.loadFile(path.join(__dirname, "../../react-app/build/index.html"));
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