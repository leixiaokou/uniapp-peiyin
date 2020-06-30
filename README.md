
# uniapp-peiyin
文字转人声配音uniapp多端支持的小程序
### 声明
完整项目
开源不易，避免伸手党。如有配置问题加作者微信phpcoder666，先发任意金额红包
如果是完全伸手党请直接转红包18.88.
### 项目结构说明
*  voice 是后端PHP原生接口代码，直接部署在www下面即可使用， 该目录下README文件是后端项目的说明文件
*  修改main.js配置，

```
Vue.prototype.requestUrl = 'https://api.taokeduo.cn/'   //接口域名
index/index.vue 请求处也需要修改具体请求接口路径
//使用接口方式搞友链需要配置各个端的APPID
// #ifdef  MP-WEIXIN
Vue.prototype.APP_ID = ''
// #endif
// #ifdef  MP-QQ
Vue.prototype.APP_ID = ''
// #endif
// #ifdef  MP-TOUTIAO
Vue.prototype.APP_ID = ''
// #endif



```
### 应用场景
短视频制作泛滥的今天，基于大多数人不想真人发声，此时配音小程序就可以一显身手了。 输入文案后自动生成mp3格式文件。保存到本地，结合剪映放的导入音频功能就能完美的为自己的小视频配上软妹子或者其他好听的的声音

### UI
<img src="https://leijun-common.oss-cn-shenzhen.aliyuncs.com/peiyin-ui.png"/>

### 作品体验

<img src="https://leijun-common.oss-cn-shenzhen.aliyuncs.com/peiyin-union.jpg"/>

 ### 作者公众号
《一只码》分享有趣的小项目以及技术推广变现经验
<img src="https://leijun-common.oss-cn-shenzhen.aliyuncs.com/one-coder.png"/>
