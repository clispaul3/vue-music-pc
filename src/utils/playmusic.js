export function playmusic(url){
    if(window.$mp3){
        window.$mp3.pause()
    }
    window.$mp3 = new Audio(url)
    window.$mp3.play()
}