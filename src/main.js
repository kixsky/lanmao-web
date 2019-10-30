import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import { router } from './router';

Vue.config.productionTip = false
import './http/axios'
import http from './http/http';
import api from './http/api';
import store from './store';

//css
import './css/main.scss'

Vue.use(ViewUI);
// 对后端接口 进行全局注册
Vue.prototype.$api = api;
// 对请求方式 进行全局注册
Vue.prototype.$http = http;


new Vue({
  router,
  store,  
  render: h => h(App),
}).$mount('#app')
