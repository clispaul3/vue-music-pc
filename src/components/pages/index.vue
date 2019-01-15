<template>
    <div class="page-index">
        <ModuleSearch></ModuleSearch>
    </div>
</template>
<script>
import axios from 'axios'
import ModuleSearch from '@module/search/search.vue'
export default {
    data(){
        return{
            title:'index'
        }
    },
    components:{
        ModuleSearch,
    },
    mounted() {
        axios.get('http://localhost:8088/comment/music?id=186016&limit=1').then(res=>{
            console.log(res.data)
        })
    },
}
</script>
<style lang="scss">
    .page-index{
        background:$color_main;
    }
</style>



