import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局样式
import './style/global.less'

Vue.config.productionTip = false

// 导入markdown插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 引入图标字体
import "./assets/iconfont/iconfont.css"
// 引入github-markdown样式(需要将该样式文件中和代码相关的删除！！！防止和prismjs冲突)
// import 'github-markdown-css/github-markdown.css'
// 数学公式katex支持
import katex from 'katex'
import 'katex/dist/katex.css'
import renderMathInElement from 'katex/contrib/auto-render/auto-render'

// 定义自动渲染的配置参数,这些参数根据你的需求进行修改，下面的参数是官网上抄下来的
const renderOption = {
  delimiters: [
    {left: '$$', right: '$$', display: true},
    {left: '$', right: '$', display: false},
    {left: '\\(', right: '\\)', display: false},
    {left: '\\[', right: '\\]', display: true}
  ],
  throwOnError : false
}

// 挂载公式自动渲染函数到vue原型
Vue.prototype.$formula = function (dom) {
  renderMathInElement(dom, renderOption)
}

// 按需导入element-ui组件
import element from './element'
Vue.use(element)

import dayjs from 'dayjs'
// 注册全局时间格式化过滤器
Vue.filter('dateFormat', function(originTime, format='YYYY年MM月DD日 HH:mm:ss'){
  return dayjs(originTime).format(format);
})

Vue.filter('dateFormat2', function(originTime, format='YYYY-MM-DD'){
  return dayjs(originTime).format(format);
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
