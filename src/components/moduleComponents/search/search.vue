<template>
    <div class="module-search">
        <el-autocomplete placeholder="搜索音乐，歌手，歌词，用户" 
           popper-class = "search-input"
           clearable 
           type="text"
           max="600"
           :fetch-suggestions="querySearch"
           prefix-icon="iconfont icon-shousuo"
           v-model="inputVal">
            <template slot-scope="item">
                <p class="list-type" 
                    @click="handleSelect(item['item']['listType'],$event)" 
                    v-if="item['item']['listType']!='热门搜索'">
                    <span :class="iconClassname( item['item']['listType'])"></span>
                    <span>{{ item['item']['listType'] }}</span>
                </p>
                <p class="list-type" 
                    v-if="item['item']['listType']=='热门搜索'"
                    @click="handleSelect(item['item']['listType'],$event,'hot-search')"
                    :style="{cursor:'default'}">
                    <span :class="iconClassname( item['item']['listType'])"></span>
                    <span>{{ item['item']['listType'] }}</span>
                </p>
                <p v-for="mem in item['item']['list']" 
                    :key="mem.id" 
                    class="list-item" 
                    @click="handleSelect({type:item['item']['listType'],name:mem.name,id:mem.id},$event)">
                    {{ mem['name'] }}
                </p>
            </template>
        </el-autocomplete>
    </div>
</template>
<script>
import axios from 'axios'
import { Search } from '@api/search.js'
import { CloundMusic } from '@api/api.js'
import $ from 'jquery'
import { playmusic } from '@utils/playmusic'

export default {
    data(){
        return {
            inputVal:''
        }
    },
    methods: {
        querySearch(val,callback){
            if(!val){
                CloundMusic.hotSearch( ({hots} = {}) =>{
                    hots.forEach(item=>{
                        item = Object.assign(item,{name:item.first})
                    })
                    const result = [{listType:'热门搜索',list:hots}]
                    callback(result)
                    this.updateDomStyle()
                })
                return
            }
            new Search({keywords:val}).startSearch(result=>{
                callback(result)
                this.updateDomStyle()
            })
        },
        updateDomStyle(){
            $('.el-autocomplete-suggestion__wrap').css({
                padding:'0px',
                maxHeight:'580px'
            })
            window.setTimeout(()=>{
                $('.el-autocomplete-suggestion li').css({
                    padding:'0px 0px',
                })  
            },0)
        },
        handleSelect(item,ev,str){
            if(str=='hot-search'){
                ev.stopPropagation()
                return
            }
            const dataType = typeof item
            // 搜索单曲、专辑、歌手、视频、歌单
            if(dataType=='string'){
                for(let o of CloundMusic.searchType){
                    if(o.title==item){
                        CloundMusic.keywordSearch(this.inputVal,o.type,30,res=>{
                            // console.log(res)
                        })
                    }
                }
            }
            if(dataType=='object'){
                if(!item.type) return
                console.log(item)
                if(item.type=='热门搜索'){
                    CloundMusic.keywordSearch(item.name,1,30,res=>{
                        // console.log(res)
                    })
                }
                if(item.type=='单曲'){
                    CloundMusic.songurl(item.id,res=>{
                        CloundMusic.lyric(item.id,({lyric})=>{
                            console.log(lyric)
                        })
                        playmusic(res[0].url)
                    })
                }
            }
        },
        iconClassname(type){
            switch(type){
                case '单曲':
                    return 'iconfont  icon-dianyingzhiye-gequbangdianjitai'
                case '专辑':
                    return 'iconfont  icon-zhuanji'
                case '歌手':
                    return 'iconfont icon-geshou'
                case '歌单':
                    return 'iconfont icon-gedan'
                case '视频':
                    return 'iconfont icon-shipinguanli'
                default:
                    return 'iconfont icon-shousuo'
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .module-search{
        -webkit-app-region: drag;
        height:60px;
        background-color:$color_main;
    }
    .el-autocomplete{
        width:300px;
        top:15px;
        -webkit-app-region: no-drag;
    }
    .el-autocomplete-suggestion li{
        padding:0px !important;
        .list-type{
            background:#f5f5f5;
            .iconfont{
                font-size:16px;
                padding:0 5px;
                color:#000;
            }
            .icon-gedan,.icon-geshou{
                font-size:20px;
            }
            span{
                font-weight:600;
            }
            .icon-shousuo{
                font-size:14px;
            }
        }
        .list-item{
            font-size:12px;
            width:100%;
            box-sizing:border-box;
            padding-left:20px;
            @include text_ellipse;
            &:hover{
                background:#ddd;
            }
        }
    }
</style>

