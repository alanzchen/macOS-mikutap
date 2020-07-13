'use strict';

const { app, BrowserWindow, screen } = require('electron')
const ioHook = require('iohook')
const console = require('console');

const keyNames = {
  0: '§',
  1: 'Esc',
  2: '1',
  3: '2',
  4: '3',
  5: '4',
  6: '5',
  7: '6',
  8: '7',
  9: '8',
  10: '9',
  11: '0',
  12: '-',
  13: '=',
  14: 'Backspace',
  15: 'Tab',
  16: 'q',
  17: 'w',
  18: 'e',
  19: 'r',
  20: 't',
  21: 'y',
  22: 'u',
  23: 'i',
  24: 'o',
  25: 'p',
  26: '[',
  27: ']',
  28: 'Enter',
  29: 'Left Ctrl',
  30: 'a',
  31: 's',
  32: 'd',
  33: 'f',
  34: 'g',
  35: 'h',
  36: 'j',
  37: 'k',
  38: 'l',
  39: ';',
  40: '\'',
  41: '`',
  42: 'Left Shift',
  43: '\\',
  44: 'z',
  45: 'x',
  46: 'c',
  47: 'v',
  48: 'b',
  49: 'n',
  50: 'm',
  51: ',',
  52: '.',
  53: '/'
}

function getKeyCode(keycode) {
  console.log(keycode)
  var char = keyNames[keycode]
  console.log(char)
  var keyCode = char.charCodeAt(0);
  if(keyCode > 90) {  // 90 is keyCode for 'z'
    return keyCode - 32;
  }
  return keyCode;
}

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
  ioHook.on('keydown', (event) => {
    try {
      var keycode = getKeyCode(event.keycode)
      console.log(keycode)
      if (keycode) {
        win.webContents.send("ping", keycode)
      }
    } catch (error) {
      console.log(error)
    }
  });
  // and load the index.html of the app.
  win.loadFile('aidn.jp/mikutap/index.html')
  // win.webContents.toggleDevTools()
  ioHook.start(false)
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