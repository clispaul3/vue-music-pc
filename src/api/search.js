/*
 * @Description: 全局模糊搜索(单曲、专辑、歌手、视频、歌单)
 * @Author: zyb
 * @Date: 2019-01-16 09:37:49
 * @LastEditTime: 2019-01-16 20:19:43
 * @LastEditor: zyb
 */
import { CloundMusic } from './api'
export class Search{
    constructor({keywords}){
        this.keywords = keywords
    }
    async startSearch(callback){
        let result = []
        for(let item of CloundMusic.searchType){
            let dataList = await this.querySearch(item.type,item.limit)
            if(dataList){
                result.push(dataList)
            }
        }
        callback(result)
    }
    querySearch(type,limit){
        return new Promise((resolve,reject)=>{
            CloundMusic.keywordSearch(this.keywords,type,limit,res=>{
                const result = this.filterData(type,res)
                resolve(result)
            })
        })
    }
    filterData(type,data){
        if(!data) return
        let result = []
        let listType = ''
        switch(type){
            case 1:
                if(data.songCount==0) break
                for(let item of data.songs){
                    result.push({name:item.name,id:item.id})
                }
                listType = '单曲'
                break
            case 10:
                for(let item of data.albums){
                    result.push({name:item.name,id:item.id})
                }
                listType = '专辑'
                break
            case 100:
                for(let item of data.artists){
                    result.push({name:item.name,id:item.id})
                }
                listType = '歌手'
                break
            case 10014:
                for(let item of data.videos){
                    result.push({name:item.title,id:item.vid})
                }
                listType = '视频'
                break
            case 1000:
                for(let item of data.playlists){
                    result.push({name:item.name,id:item.id})
                }
                listType = '歌单'
                break
            default:
                return
        }
        return {listType,list:result}
    }
}
