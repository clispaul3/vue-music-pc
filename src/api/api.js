/*
 * @Description: 网易云音乐api接口
 * @Author: zyb
 * @Date: 2019-01-16 19:58:30
 * @LastEditTime: 2019-01-16 21:00:52
 * @LastEditor: zyb
 */
import axios from 'axios'

const host = 'http://localhost:8088'
export class CloundMusic{
    static getRequest(apiUrl,type){
        return new Promise((resolve,reject)=>{
            axios.get(apiUrl).then(res=>{
                console.log(res.data)
                if(res.data.code==200){
                    let result = null
                    switch(type){
                        case 1:
                            result = res.data.result
                            break
                        case 2:
                            result = res.data.data
                            break
                        case 3:
                            result = res.data.lrc
                            break
                        default:
                            break
                    }
                    resolve(result)
                }
            })
        })
    }
    static hotSearch(callback){
        const apiUrl = host + '/search/hot'
        CloundMusic.getRequest(apiUrl,1)
          .then(res=>{
              callback(res)
          })
    }
    static keywordSearch(keywords,type,limit,callback){
        const apiUrl = host + `/search?keywords=${keywords}&type=${type}&limit=${limit}`
        CloundMusic.getRequest(apiUrl,1)
          .then(res=>{
              callback(res)
          })
    }
    static songurl(id,callback){
        const apiUrl = host + '/song/url?id=' + id
        CloundMusic.getRequest(apiUrl,2)
          .then(res=>{
              callback(res)
          })
    }
    static lyric(id,callback){
        const apiUrl = host + '/lyric?id=' + id
        CloundMusic.getRequest(apiUrl,3)
          .then(res=>{
              callback(res)
          })
    }
}
CloundMusic.searchType = [
    {type:1,limit:4,title:'单曲'}, // 单曲
    {type:10,limit:2,title:'专辑'}, // 专辑
    {type:100,limit:3,title:'歌手'}, // 歌手
    {type:1014,limit:2,title:'视频'}, // 视频
    {type:1000,limit:3,title:'歌单'} // 歌单
]
CloundMusic.dataType = [
    {type:1,url:['/search']},
    {type:2,url:['/song']},
    {type:3,url:['/lyric']}
]