const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional preload script
      nodeIntegration: true, // Might be disabled for security reasons in future versions
      contextIsolation: false, // Might be enabled for security reasons in future versions
      enableRemoteModule: true, // Might be disabled for security reasons in future versions
    },
  });

  win.loadFile('dist/inventory-management-ui/browser/index.html'); // Path to your Angular app's index.html

  win.webContents.openDevTools(); // Optional: Enable developer tools in the window

  win.on('closed', () => {
    win = null;
  });
}

// app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// app.activate(() => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });
