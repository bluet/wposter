const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

const ejs = require('ejs');

let data = {user: {name: "Jeff"}};
let options = {root: __dirname};

function createWindow () {

    mainWindow = new BrowserWindow({width: 800, height: 600})

    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    ejs.renderFile('index.ejs', data, options, function (err, str) {
        if (err) {
          console.log(err);
        }

        // Load the rendered HTML to the BrowserWindow.
        mainWindow.loadURL('data:text/html;charset=utf-8,' + encodeURI(str));
    });
    
    mainWindow.on('closed', function () {
        mainWindow = null
    })


}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})  

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})
  