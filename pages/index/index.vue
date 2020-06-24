
<template>
	<view>
	<view class="container container-wrap">
		<view class="tbk-section">
			<form @submit="parseUrl" class="input-form">
				<icon type="clear" size="22" @tap="resetText" class="clear-text-icon"></icon>
				<view class="page-section">
					<view class="page-section-title">请输入或者黏贴要转成人声的文本</view>
					<view class="textarea-wrp">
						<textarea @input="bindTextAreaBlur" :value="text" maxlength="1000" />
					</view>
				</view>
				<view class="section section_gap">
					<radio-group class="radio-group" @change="radioChange">
						<radio class="radio" :color="radioActiveColor" v-for="(item, key) in items" :key="key"  :value="item.name" :checked="item.checked">
							<text class="radio-text">{{item.value}}</text>
						</radio>
					</radio-group>
				</view>
				<view class="section section_gap">
					<view class="body-view">
					<text class="section_title">音量</text>
					<slider @change="sliderSize" :block-size="blockSize"  :block-color="blockColor" :activeColor="sliderActiveColor"  :value="vol"  min="1" max="15" show-value/>
					</view>
				</view>
				<view class="section section_gap">
					<view class="body-view">
						<text class="section_title">语速</text>
						<slider @change="sliderSpeed" :block-size="blockSize"  :block-color="blockColor" :activeColor="sliderActiveColor" :value="spd" min="1" max="7" show-value/>
					</view>
				</view>
			    <view class="section section_gap">
					<view class="body-view">
					<text class="section_title">语调</text>
						<slider @change="sliderHigh" :block-size="blockSize"  :value="pit"  :block-color="blockColor" :activeColor="sliderActiveColor" min="1" max="7" show-value/>
					</view>
				</view>
			</form>
			  <!--<navigator url="/pages/user/user?title=navigate"  hover-class="navigator-hover">跳转到登页面</navigator>-->
		</view>
		<view class="section btn-container">
		  <button class='line-btn'  @tap="toVoice" >转成人声</button>
		  <button class='line-btn'  @tap="clipLink">复制链接</button>
		</view>
	</view> 
	<!--  #ifdef  MP-TOUTIAO -->
	<ad ad-intervals=32 unit-id="1tn7g248cm11d8a4a7" type="video"></ad>
	<!--  #endif -->
	</view>
</template>
<style>
	.ad-container{
		margin-top: 8upx;
	}
	page {
		  background-color: RGB(245,245,245);
	}
	.container-wrap {
	  min-height: 100%;
	  padding: 30rpx 5%;
	  width: 90%;
	}
	textarea {
	  width: 100%;
	  padding: 20rpx 0;
	  height: 250rpx;
	  font-size: 32rpx;
	}
	.textarea-wrp {
	  padding: 0 25rpx;
	  background-color: #fff;
	}
	.clear-text-icon{
	  position: absolute;
	  z-index: 2;
	 top: 60rpx;
	 left: 660rpx;
	}
	
	.page-section{
	  width: 100%;
	  margin-bottom: 60rpx;
	}
	.section_gap{
	  margin: 30rpx 0;
	}
	.page-section:last-child{
	  margin-bottom: 0;
	}
	
	.section_title{
	  width: 20%;
	  font-size: 36rpx;
	  line-height: 250%;
	  font-weight: 400;
	  color: #999999;
	}
	
	radio {
	  transform:scale(0.8);
	}
	.radio-text{
	  font-size: 36rpx;
	  color: #999999;
	}
	.body-view{
	   display: flex;
	   height: 50rpx;
	}
	.body-view slider{
	  width: 80%;
	}
	
	.page-section-title{
	   margin: 20rpx 0;
	  font-size: 36rpx;
	  font-weight: 400px;
	  color:#999999;
	  padding-left: 10rpx;
	  padding-right: 30rpx;
	}
	.btn-container{
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  margin-top: 80rpx;
	}
	.line-btn{
	   margin: 2rpx 60rpx;
	   background-color : #1E90FF;
	   color: white;
	   font-size: 36rpx;
	   line-height: 72rpx;
	}
</style>
<script>
	let videoAd = null
	let InterstitialAd = null
	import showTips from '@/components/redflower-showTips/redflower-showTips.vue'
	export default {
			components: {
				showTips 
			},
			 /**
			   * 用户点击右上角分享
			   */
		    onShareAppMessage: function (ops) {
				if (ops.from === 'button') {
				  // 来自页面内转发按钮
				  console.log(ops.target)
				}
				return {
				  title: 'Hi~我会人工智能把文字转成语音,厉害吧,你也快来试试~',
				  path: 'pages/voice/voice',
				  imageUrl: this.imageUrl + 'images/mini-program-douyin-share-voice.png',
				  success: function (res) {
					uni.showToast({
					  title: '谢谢您的转发，请收下我的膝盖',
					  icon: 'none',
					  duration: 1500
					})
				  },
				  fail: function (res) {
					uni.showToast({
					  title: '我这么棒，您怎么舍得不让我露脸呢',
					  icon: 'none',
					  duration: 1500
					})
				  }
			}
		},
		data() {
			return {
				  items: [
				    { name: 103, value: '米朵', checked: 'true'},
				    { name: 111, value: '小萌'},
				    { name: 1, value: '小帅'},
				    { name: 3, value: '逍遥' },
				    { name: 4, value: '丫丫' },
				    { name: 106, value: '博文' },
				    { name: 110, value: '小童' },
				    { name: 5, value: '小娇' },
				  ],
				  per : 103,
				  spd : 5,
				  vol : 5,
				  pit : 5,
				  text: '',
				  voiceSrc: "",
				  radioActiveColor: '#10AEFF',
				  sliderActiveColor: " #10AEFF",
				  blockSize: 16,
				  blockColor: "#1E90FF",
				  activeAd : 0
			}
		},
	
		  /**
		   * 生命周期函数--监听页面加载
		   */
		  onLoad: function (options) {
		    
		  },
		
		  /**
		   * 生命周期函数--监听页面初次渲染完成
		   */
		  onReady: function () {
		
		  },
		
		  /**
		   * 生命周期函数--监听页面显示
		   */
		  onShow: function () {
			   this.activeAd = 0
			   this.activeAd = 1   
		  },
		  methods: {
		   toVoice: function (e) {
			  var data = {}
			  data.text = this.text
			  data.per = this.per
			  data.spd = this.spd
			  data.vol = this.vol
			  data.pit = this.pit
			  console.log(data) 
			  if (!this.text) {
			    uni.showToast({
			      title: '请输入要转换成语音的文本',
			      icon: 'none',
			      duration: 1500
			    })
			     return;
			  }
			  uni.showLoading({
			    title: '加载中',
			  })
			  var that = this
			  uni.request({
			    url: this.requestUrl + 'api/douyin/to-voice',
			    method: 'post',
			    data: data,
			    header: {
			      'content-type': 'application/json' // 默认值
			    },
			    success(res) {
			      var data = res.data
			      var code = data.code
			      if (code == 1) {
			        var voiceSrc = data.data.url
			        that.voiceSrc = voiceSrc
			        that.playVoice(voiceSrc)
			      } else {
			        uni.showToast({
			          title: data.msg,
			          icon: 'none',
			          duration: 1500
			        })
			      }
			    },
			    fail(res) {
			      uni.showToast({
			        title: '网络错误，请稍后再试！',
			        icon: 'none',
			        duration: 1000
			      })
			    },
			    complete(res) {
			      uni.hideLoading()
			    }
			  })
			},
			
			bindTextAreaBlur: function (e) {
			  console.log(e.detail.value)
			  this.text = e.detail.value
			},
			resetText:function(e){
			    this.text = ''    
			},
			radioChange: function (e) {
			  this.per =  e.detail.value
			  console.log(this.per)
			},
			sliderSize:function (e) {
			  this.vol = e.detail.value
			  console.log(this.vol)
			},
			sliderSpeed: function (e) {
			  this.spd = e.detail.value
			  console.log(this.spd)
			},
			sliderHigh: function (e) {
			  this.pit = e.detail.value
			  console.log(this.pit)
			},
			playVoice: function (src) {
			  // 使用 uni.createAudioContext 获取 audio 上下文 context
			  const innerAudioContext = uni.createInnerAudioContext();  
              innerAudioContext.autoplay = true;
			  innerAudioContext.obeyMuteSwitch = false
			  console.log(src) 
			  innerAudioContext.src = src  
			  innerAudioContext.onPlay(() => {
			    console.log('开始播放'); 
			  });
			  innerAudioContext.onError((res) => {
			    console.log(res.errMsg);
			    console.log(res.errCode);
			  }); 
			  console.log(123)
			},
			clipLink: function (e) {
			  let downloadUrl = this.voiceSrc
			  if (downloadUrl) {
			    uni.setClipboardData({
			      data: downloadUrl,
			      success(res) {
			        uni.showToast({
			          title: '复制链接成功',
			          icon: 'success',
			          duration: 1000
			        })
			      }
			    }) 
			  }
			}
		},
	} 
</script>
