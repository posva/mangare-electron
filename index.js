'use strict';
const app = require('app');
const http = require('http');
const path = require('path');
const connect = require('connect');
const ipc = require('ipc');
const serveStatic = require('serve-static');
const BrowserWindow = require('browser-window');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being GC'd
let mainWindow, welcomerWindow;

let webapp, server, welcomer, mangare;

function createMainWindow() {
  welcomerWindow = new BrowserWindow({
    icon: path.join(__dirname, 'app/images/rice-ball.png'),
    width: 500,
    height: 250,
    center: true,
    resizable: false,
    frame: false
  });

  const win = new BrowserWindow({
    icon: path.join(__dirname, 'app/images/rice-ball.png'),
    width: 500,
    height: 250,
    center: true,
    'min-width': 320,
    'min-height': 480,
    resizable: true,
    'web-preferences': {
      'web-security': false
    },
    show: false
  });

  welcomerWindow.loadUrl(`file://${__dirname}/app/loading.html`);
  win.on('closed', onClosed);

  webapp = connect().use(serveStatic(path.join(__dirname, 'app')));
  server = http.createServer(webapp);
  server.listen(0);
  server.on('listening', function() {
    const port = server.address().port;
    setTimeout(function() {
      win.loadUrl('http://localhost:' + server.address().port);
    }, 1100);
  });

  return win;
}

function onClosed() {
  // deref the window
  // for multiple windows store them in an array
  mainWindow = null;
  webapp = null;
  server = null;
  mangare = null;
}

app.on('window-all-closed', function() {
  //if (process.platform !== 'darwin') {
    app.quit();
  //}
});

app.on('activate-with-no-open-windows', function() {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', function() {
  ipc.on('welcome', function(event) {
    welcomer = event.sender;
  });
  mainWindow = createMainWindow();
  ipc.on('page-ready', function(event) {
    mangare = event.sender;
    if (welcomer) welcomer.send('page-ready');
  });
  ipc.on('welcome-end', function() {
    welcomerWindow.close();
    welcomerWindow = null;
    welcomer = null;
    mainWindow.show();
    mainWindow.maximize();
  });
});
