const { app,BrowserWindow } = require('electron')
let mainwindow = null
function createWin(){
    mainwindow = new BrowserWindow({
        minHeight: 524,
        minWidth:856,
        useContentSize:true,
        show:true,
        frame:false,
        autoHideMenuBar:true,
        webSecurity:false,
        titleBarStyle:'hidden',
    })
    let localurl = 'http://localhost:8088/index.html'
    mainwindow.loadURL(localurl)
    mainwindow.webContents.openDevTools()
    mainwindow.on('ready-to-show',()=>{
        mainwindow.show()
    })
}
app.on('ready',()=>{
    createWin()
})