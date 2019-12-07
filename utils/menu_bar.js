const { app, Menu, shell } = require('electron');
const createAboutWindow = require('../windows/about_window');

const menuBarTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New',
        accelerator: 'Ctrl+N',
      },
      {
        label: 'Save',
        accelerator: 'Ctrl+S',
      },
      {
        label: 'Load',
        accelerator: 'Ctrl+L',
      },
      {
        label: 'Quit',
        accelerator: 'Ctrl+Q',
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
        accelerator: 'Ctrl+O',
        click() {
          shell.openExternal(
            'https://github.com/ahmedisam99/automation-project',
          );
        },
      },
      {
        label: 'About',
        accelerator: 'Ctrl+H',
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
