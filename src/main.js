import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// 引入element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(ElementPlus).mount('#app')
