const { BrowserWindow } = require('electron')
const { platform } = require('os')
class CreateWin{
    constructor(params){
        this.mainWindow = null
        this.winname = params.winname
        this.winheight = 0
        this.winwidth = 0
        this.loadurl = params.loadurl
        this.init()
    }
    init(){
        this.mainWindow = new BrowserWindow(CreateWin.defaultConfig)
        this.mainWindow.loadURL(this.loadurl)
        this.mainWindow.on('ready-to-show',()=>{
            this.mainWindow.show()
            this.setSize(this.winname)
            this.mainWindow.webContents.openDevTools()
        })
    }
    setSize(winname){
        const { width } = require('electron').screen.getPrimaryDisplay().workAreaSize
        switch(winname){
            case 'indexwindow':
                this.winwidth = parseInt(width*0.5)
                this.winheight = parseInt(width*0.3)
                break
            default:
                this.winheight = 200
                this.winwidth = 200
        }
        if(platform()=='darwin'){
            this.mainWindow.setSize(this.winwidth,this.winheight,true)
        }
        if(platform()=='win32'){
            this.mainWindow.setSize(this.winwidth,this.winheight)
        }
    }
}
CreateWin.defaultConfig = {
    useContentSize:true,
    show:false,
    frame:false,
    resizable:false,
    autoHideMenuBar:true,
    webSecurity:false,
    titleBarStyle:'hidden',
}
CreateWin.winsArr = ['indexwindow']
module.exports = {
    CreateWin
}