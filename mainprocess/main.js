const { app } = require('electron')
const { CreateWin } = require('./utils/createwindow')
app.on('ready',()=>{
    new CreateWin({
        winname:'indexwindow',
        loadurl:'http://localhost:8086/index.html'
    })
})