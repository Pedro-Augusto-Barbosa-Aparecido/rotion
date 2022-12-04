import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "node:path";

export function createTray(window: BrowserWindow) {
  const tray = new Tray(path.resolve(__dirname, "rotionTemplate.png"));

  app.setAboutPanelOptions({
    applicationName: "Rotion",
    applicationVersion: process.version,
    version: process.version,
    iconPath: path.resolve(__dirname, "icon.png"),
    credits: "Made by Pedro Augusto Barbosa",
    website: "https://github.com/Pedro-Augusto-Barbosa-Aparecido",
    authors: ["https://github.com/Pedro-Augusto-Barbosa-Aparecido"],
    copyright: "Copyright © https://github.com/Pedro-Augusto-Barbosa-Aparecido",
  });

  const menu = Menu.buildFromTemplate([
    { label: "Rotion", enabled: false },
    { type: "separator" },
    {
      label: "New Document",
      click: () => {
        window.webContents.send("new-document");
      },
    },
    { type: "separator" },
    {
      label: "Options",
      enabled: false,
    },
    {
      label: "Quit App",
      role: "quit",
    },
    { label: "About", role: "about" },
  ]);

  tray.setContextMenu(menu);
}
