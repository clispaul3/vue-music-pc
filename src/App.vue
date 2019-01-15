<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
import Index from '@page/index'

export default {
  name: 'app',
  components: {
    Index
  }
}
</script>

<style>
@import './style/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
