const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');
const menuBar = require('../../utils/menu_bar');

const createMainWindow = () => {
  const window = new BrowserWindow();
  window.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }),
  );

  Menu.setApplicationMenu(menuBar);

  window.on('close', () => app.quit());
};

module.exports = createMainWindow;
