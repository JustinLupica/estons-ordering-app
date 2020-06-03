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


app.on("ready", main);
