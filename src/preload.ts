// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
	close: () => ipcRenderer.send('close'),
	sendMousePos: (x: number, y: number) => ipcRenderer.invoke("sendMousePos", x, y),
	copyToClipboard: (text: string) => ipcRenderer.send("copyToClipboard", text),
})
