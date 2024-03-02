const { app, BrowserWindow, globalShortcut } = require('electron/main')
const path = require('node:path')
try {
  require('electron-reloader')(module)
} catch (_) { }
const {
  getWindowSettings,
  saveBounds,
} = require("./utils/settings");

function createWindow() {
  const bounds = getWindowSettings();
  console.log(bounds);
  const win = new BrowserWindow({
    width: bounds[0],
    height: bounds[1],
    titleBarStyle: "hiddenInset",
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  win.loadFile('./pages/weather.html')
  win.setVibrancy("hud");
  win.on("resized", () => saveBounds(win.getSize()));

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
