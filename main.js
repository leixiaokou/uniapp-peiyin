import Vue from 'vue'
import App from './App'
import { http } from '@/common/service.js' // 全局挂载引入，配置相关在该index.js文件里修改
/***
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
**/
Vue.prototype.$http = http
Vue.config.productionTip = false
// #ifdef  MP-WEIXIN
Vue.prototype.APP_ID = ''
// #endif
// #ifdef  MP-QQ
Vue.prototype.APP_ID = ''
// #endif
// #ifdef  MP-TOUTIAO
Vue.prototype.APP_ID = ''
// #endif

Vue.prototype.logo = '../../static/default-share.png'
Vue.prototype.shareTitle = '牛逼小程序'
Vue.prototype.shareImage = '../../static/default-share.png'
Vue.prototype.imageUrl = ''
Vue.prototype.requestUrl = ''
Vue.prototype.commonUrl = ''
App.mpType = 'app'
 
const app = new Vue({
	...App
})
app.$mount() 
