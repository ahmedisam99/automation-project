const url = require('url');
const path = require('path');
const { BrowserWindow } = require('electron');

const createAboutWindow = () => {
  let aboutWindow = new BrowserWindow({
    width: 400,
    height: 200,
  });

  aboutWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
    }),
  );

  aboutWindow.on('close', () => (aboutWindow = null));
};

module.exports = createAboutWindow;
