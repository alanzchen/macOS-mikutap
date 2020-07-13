'use strict';

const { app, BrowserWindow, screen } = require('electron')
const console = require('console')



function createWindow () {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().size
  console.log(screen.getPrimaryDisplay().size)
  const win = new BrowserWindow({
    type: "desktop",
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    skipTaskbar: true,
    enableLargerThanScreen: true,
    hasShadow: false
  })

  // and load the index.html of the app.
  win.loadFile('aidn.jp/mikutap/index.html')
  win.webContents.toggleDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.