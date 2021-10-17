"use strict";

import { 
  app,
  protocol,
  BrowserWindow,
  autoUpdater, dialog
} from "electron";
import {
  createProtocol
} from "vue-cli-plugin-electron-builder/lib";
import installExtension, {
  VUEJS_DEVTOOLS
} from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";


require('update-electron-app')({
  repo: 'github-user/https://gitlab.com/hamza-solutions/haven-restaurant/frontend/cashier-v2.2.git',
  updateInterval: '1 hour',
  logger: require('electron-log')
})
const server = 'http://167.172.157.191:5050'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

setInterval(() => {
  autoUpdater.checkForUpdates()
}, 1000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})


autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: "app",
  privileges: {
    secure: true,
    standard: true
  }
},]);
const { ipcMain } = require('electron');

let printWindow, printBarCode;

async function createWindow() {
  // Create the browser window.


  const win = new BrowserWindow({

    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: true,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    },
  });


  let printWin = new BrowserWindow({ width: 400, height: 400, parent: win, show: false, webPreferences: { nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION } })

  let barCodeWindow = new BrowserWindow({ width: 400, height: 400, parent: win, show: false, webPreferences: { nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION } })

  printWin.on('close', function (event) {
    // event.sender.send("closed")
    event.preventDefault();
    // console.log("close window")
    // printWin.hide();

    printWin.hide();
    // printWin.close();
    // printWin = null;


  })

  barCodeWindow.on('close', function (event) {
    // event.sender.send("closed")
    event.preventDefault();
    // console.log("close window")
    // printWin.hide();

    barCodeWindow.hide();
    // printWin.close();
    // printWin = null;


  })

  // win.setMenu(null)
  win.maximize()


  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    printWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "#/printOrder")
    barCodeWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "#/printBarcode")
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    printWin.loadURL(`app://./index.html#printOrder`);
    barCodeWindow.loadURL(`app://./index.html#printBarcode`);
  }


  printWindow = printWin;
  printBarCode = barCodeWindow;
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});




// silent: true,  deviceName: 'POS-80'
app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {




  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }


  createWindow();



  // retransmit it to workerWindow
  ipcMain.on("printOrder", (event, args) => {
    console.log(args)
    console.log(args.total)
    console.log(printWindow.webContents.getURL())
    printWindow.show();

    if (args.kitchenPrinters) {
      printWindow.webContents.send("data", args);
    } else {
      printWindow.webContents.send("directData", args);
    }
  });

  // retransmit it to workerWindow
  ipcMain.on("printBarCode", (event, args) => {
    
    printBarCode.show();

    console.log("hiiii")

    printBarCode.webContents.send('printBarCodeNow', args);

  });



  ipcMain.on("printBarCodeNow", (event, args) => {



    const options = {
      silent: false,
      printBackground: true,
      margins: { 
        marginType: 'custom',
        top: 0,
        right: 10,
        left: 0,
        bottom: 0
      }
      // copies: 2,
    }


    printBarCode.webContents.print(options, (success, errorType) => {
      if (!success) {
        console.log(errorType)
      } else {
        printBarCode.close()
      }
    })


  });
  


  ipcMain.on("closePrinting", (event, args) => {
    printWindow.close();
  })




  ipcMain.on("printSpecificPrinter", (event, args) => {

    console.log("prinetr ", args.printer)


    const options = {
      deviceName: args.printer,
      silent: true,
      printBackground: false,
      color: false,
      margins: { 
        marginType: 'custom',
        top: 0,
        right: 10,
        left: 0,
        bottom: 0
      }
      // copies: 2,
    }


    printWindow.webContents.print(options, (success, errorType) => {
      if (!success) {
        console.log(errorType)
      } else {
        console.log("printing")
        event.reply('printed');
      }
    })


  });







  ipcMain.on("printTotalOrder", (event, args) => {

    // let x = printWindow.webContents.getPrinters()[0];

    console.log(args)

    // const options = {
    //   deviceName: args,
    //   silent: true,
    //   landscape: true,
    //   printBackground: true,
    //   copies:2,
      
     
    // }


    var options = {
      deviceName: args,
      silent: true,
      printBackground: true,
      color: false,
      margins: { 
        marginType: 'custom',
        top: 0,
        right: 10,
        left: 0,
        bottom: 0
      }

      // header: 'Header of the Page',
      // footer: 'Footer of the Page'
  }



    printWindow.webContents.print(options, (success, errorType) => {
      if (!success) {
        console.log(errorType)
      } else {
        event.reply('printedTotal');
      }
    })


  });




  ipcMain.on("closePrintOrder", (event, args) => {
    printWindow.close();
  });





});





// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}



