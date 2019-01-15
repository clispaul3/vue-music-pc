<template>
    <div class="module-search">
        <el-input placeholder="搜索音乐，歌手，歌词，用户" 
           clearable 
           type="text"
           prefix-icon="iconfont icon-shousuo"
           @change="search"
           v-model="inputVal">
        </el-input>
    </div>
</template>
<script>
export default {
    data(){
        return {
            inputVal:'333'
        }
    },
    methods: {
        search(val){
            console.log(val)
            console.log(this.inputVal)
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
    .el-input{
        width:300px;
        top:15px;
    }
</style>

