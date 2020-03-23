const { BrowserWindow, app } = require("electron");
const { autoUpdater } = require("electron-updater");
require("./app.js");

let mainWindow = null;

function main() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 1000
  });
  mainWindow.loadURL(`http://localhost:8080/`);
  mainWindow.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart-app", () => {
  autoUpdater.quitAndInstall();
});

app.on("ready", main);
