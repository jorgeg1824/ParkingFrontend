import { createApp } from 'vue'
import './style.css'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')
