const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const menuBar = require('../../utils/menu_bar');

const createMainWindow = () => {
  const window = new BrowserWindow({
    minWidth: 720,
    minHeight: 550,
    webPreferences: { nodeIntegration: true },
    icon: path.join(__dirname, '..', '..', 'assets', 'icons', '512x512.png'),
  });
  window.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
    }),
  );

  Menu.setApplicationMenu(menuBar);

  window.on('close', () => app.quit());
};

module.exports = createMainWindow;
