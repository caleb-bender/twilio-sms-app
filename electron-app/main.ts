import { app, BrowserWindow } from "electron";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

let electronWindow: BrowserWindow | null = null;

function initializeWindow() {
    electronWindow = new BrowserWindow({
        autoHideMenuBar: true,
        width: 960,
        height: 640,
        webPreferences: {
            nodeIntegration: true
        }
    });
    if (process.env.NODE_ENV === "production") {
        electronWindow.loadFile(path.join(__dirname, "../public/index.html"));
    } else {
        electronWindow.loadURL(process.env.ELECTRON_START_URL ?? "http://localhost:3000");
    }

    electronWindow.on("closed", () => {
        electronWindow = null;
    });
    //electronWindow.webContents.openDevTools();
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