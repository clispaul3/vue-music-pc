import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import $ from 'jquery'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
window.$ = $
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
}).$mount('#app')
