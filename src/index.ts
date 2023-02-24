import { app, BrowserWindow, desktopCapturer, ipcMain, Tray } from 'electron';
import path from 'path';

let tray: null | Tray = null

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

let mainWindow: BrowserWindow

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		fullscreen: true,
		minHeight: 100,
		frame: false,
		alwaysOnTop: true,
		autoHideMenuBar: true,
		transparent: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.maximize()

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, "../src", 'index.html'));

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => setTimeout(() => {
	// launch app to system tray
	tray = new Tray(path.join(__dirname, "../public", 'icon.png'))
	tray.setToolTip('Choose a color')
	tray.on("click", async () => {
		const sources = await desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: 1920, height: 1080 } })
		const screen = sources[0]
		setTimeout(async () => {
			createWindow()
			setTimeout(() => {
				mainWindow.webContents.send("screenshot", screen.thumbnail.toDataURL())
			}, 1000)
			console.log("SENT THE THING")
		}, 1)
	})

	ipcMain.handle("getPixelColor", () => {
		// const pixel = robot
	})

	ipcMain.on("close", () => {
		console.log("GOTTIT")
		mainWindow.hide()
	})
}, 500));

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

