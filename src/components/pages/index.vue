<template>
    <div class="page-index">
        <ModuleSearch></ModuleSearch>
    </div>
</template>
<script>
import axios from 'axios'
import ModuleSearch from '@module/search/search.vue'
const { platform } = window.require('os')
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
        if(platform=='win32'){
            $('.page-index').css({
                border:'1px solid #ddd'
            })
        }
    }
}
</script>
<style lang="scss">
    .page-index{
        box-sizing:border-box;
    }
</style>



