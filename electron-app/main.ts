import { app, BrowserWindow } from "electron";
import path from "path";
import dotenv from "dotenv";
import { ipcMain } from "electron";
import CreateContactGroupCommand from "./src/commands/contact-group/CreateContactGroupCommand";
import fs from "fs";
import { promisify } from "util";
import APP_DATA_DIRECTORY from "./src/business-logic/AppDataDirectory";
dotenv.config();

// create the twilio app folder if it does not exist
if (!fs.existsSync(APP_DATA_DIRECTORY)) {
    promisify(fs.mkdir)(APP_DATA_DIRECTORY);
}

ipcMain.on("create-contact-group", async (event, args) => {
    try {
        console.log("args:", args[0]);
        const createContactGroupCommand = new CreateContactGroupCommand(args[0]);
        await createContactGroupCommand.execute();
        event.reply("create-contact-group-success", `The contact group "${args[0]}" was created successfully!`);
    } catch (err) {
        event.reply("create-contact-group-error", (err as Error).message);
    }
});

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