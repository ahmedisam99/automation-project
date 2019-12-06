const { app } = require('electron');

const createMainWindow = require('./windows/main_window');

app.on('ready', createMainWindow);
