const { app, Menu } = require('electron');
const createAboutWindow = require('../windows/about_window');

const platform = process.platform;

const menuBarTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
      },
      {
        label: 'Save',
        accelerator: platform == 'darwin' ? 'Command+S' : 'Ctrl+S',
      },
      {
        label: 'Load',
        accelerator: platform == 'darwin' ? 'Command+L' : 'Ctrl+L',
      },
      {
        label: 'Quit',
        accelerator: platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Source Code on github',
      },
      {
        label: 'About',
        accelerator: platform == 'darwin' ? 'Command+H' : 'Ctrl+H',
        click: createAboutWindow,
      },
    ],
  },
];

if (process.env.NODE_ENV === 'dev') {
  menuBarTemplate.push({
    label: 'DevTools',
    submenu: [
      {
        role: 'toggleDevtools',
      },
      {
        role: 'reload',
      },
    ],
  });
}

module.exports = Menu.buildFromTemplate(menuBarTemplate);
