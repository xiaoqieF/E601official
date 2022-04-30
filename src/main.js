import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局样式
import './style/global.less'

Vue.config.productionTip = false

// 按需导入element-ui组件
import element from './element'
Vue.use(element)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
