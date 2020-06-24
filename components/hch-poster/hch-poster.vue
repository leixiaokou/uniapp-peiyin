<template>
	<view class="content">
		<button class="share-btn" @tap="shareEvn">分享</button>
		<!-- 分享弹窗-->
		<view class="share-pro" >
			<view class="share-pro-mask" v-if="deliveryFlag"></view>
			<view class="share-pro-dialog" :class="deliveryFlag?'open':'close'" >
				<view class="close-btn" @tap="closeShareEvn">
					<span class="font_family">&#xe6e6;</span>
				</view>
				<view class="share-pro-title">分享</view>
				<view class="share-pro-body">
					<view class="share-item">
						<button open-type="share">
							<view class="font_family share-icon">&#xe6fa;</view>
							<view >分享给好友</view>
						</button>
					</view>
					<view class="share-item" @tap="createCanvasImageEvn">
						<view class="font_family share-icon">&#xe6f9;</view>
						<view >生成分享图片</view>
					</view>
				</view>

			</view>
		</view>
		<hchPoster ref="hchPoster" :canvasFlag.sync="canvasFlag" @cancel="canvasCancel" :posterObj.sync="posterData"/>
		<view :hidden="canvasFlag"><!-- 海报 要放外面放组件里面 会找不到 canvas-->
			<canvas class="canvas"  canvas-id="myCanvas" ></canvas><!-- 海报 -->
		</view>
	</view>
</template>

<script>
	import hchPoster from '../../wxcomponents/hch-poster/hch-poster.vue'
	export default {
		components:{
			hchPoster,
		},
		data() {
			return {
				deliveryFlag: false,
				canvasFlag: true,
				posterData:{}
			}
		},
		onLoad() {

		},
		methods: {
			createCanvasImageEvn(){
				// 这个是固定写死的小程序码
				Object.assign(this.posterData,
				{
					url:'https://img0.zuipin.cn/mp_zuipin/poster/hch-pro.jpg',//商品主图
					icon:'https://img0.zuipin.cn/mp_zuipin/poster/hch-hyj.png',//醉品价图标
					title:"诗酒茶系列 武夷大红袍 2018年 花香型中火 一级 体验装 16g",//标题
					discountPrice:"250.00",//折后价格
					orignPrice:"300.00",//原价
					code:'https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png',//小程序码
				})
				this.$forceUpdate();//强制渲染数据
				setTimeout(()=>{
					this.canvasFlag=false;//显示canvas海报
					this.deliveryFlag = false;//关闭分享弹窗
					this.$refs.hchPoster.createCanvasImage();//调用子组件的方法
				},500)
				// 这个是固定写死的小程序码 end
				// 以下是根据后端接口动态生成小程序码
				// let code="https://img0.zuipin.cn/mp_zuipin/poster/hch-code.png";
				// this.codeImg().then((res)=>{
				// 	code = res;
				// 	Object.assign(this.posterData,
				// 	{
				// 		url:'https://img0.zuipin.cn/mp_zuipin/poster/hch-pro.jpg',//商品主图
				// 		icon:'https://img0.zuipin.cn/mp_zuipin/poster/hch-hyj.png',//醉品价图标
				// 		title:"诗酒茶系列 武夷大红袍 2018年 花香型中火 一级 体验装 16g",//标题
				// 		discountPrice:"250.00",//折后价格
				// 		orignPrice:"300.00",//原价
				// 		code:code,//小程序码
				// 	})
				// 	this.$forceUpdate();//强制渲染数据
				// 	setTimeout(()=>{
				// 		this.canvasFlag=false;//显示canvas海报
				// 		this.deliveryFlag = false;//关闭分享弹窗
				// 		this.$refs.hchPoster.createCanvasImage();//调用子组件的方法
				// 	},500)
				// })
				// 以下是根据后端接口动态生成小程序码 end
			},
			
			// 获取海报的小程序码
			codeImg(){
				return new Promise((resolve,reject)=>{
					wx.request({
						method: 'get',
						url:'http://javaXXXXX',//自己java接口
						header: { 'Content-Type': 'application/x-www-form-urlencoded'},
						data: {
							scene:`sku=${this.sku}`,//自己的参数
							page:"pages/product/detail",//想要生成小程序码的页面地址
							width:"128px",//小程序码大小
						},
						success: res => {
						  if(res.data.code==0){
							if (res.data.code==0) {
								const fsm = wx.getFileSystemManager();
								const FILE_BASE_NAME = 'tmp_img_src';
								let filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.jpg`;//图片临时地址
								fsm.writeFile({
									filePath,
									data: res.data.data,
									encoding: 'binary',
									success() {
										resolve(filePath)
									},
									fail() {
										this.canvasFlag=true;
										uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
									},
								});
							} else {
								uni.showToast({title: res.data.message, icon: 'none',duration: 2000,icon:'none'})
							}
						  }else{
							this.canvasFlag=true;
							uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
						  }
						},
						fail:res=>{
						  this.canvasFlag=true;
						  uni.showToast({title:'海报生成失败',duration:2000,icon:'none'});
						}
				  })
				})
			},
			// 分享弹窗
			shareEvn() {
				this.deliveryFlag = true;
			},
			// 关闭分享弹窗
			closeShareEvn() {
				this.deliveryFlag = false;
			},
			// 取消海报
			canvasCancel(val){
				this.canvasFlag=val;
			}
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css 放app.vue页面的 */
	 @font-face {
		font-family: 'font_family';  /* project id 1065286 */
		src: url('//at.alicdn.com/t/font_1065286_3bsye5aijur.eot');
		src: url('//at.alicdn.com/t/font_1065286_3bsye5aijur.eot?#iefix') format('embedded-opentype'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.woff') format('woff'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1065286_3bsye5aijur.svg#font_family') format('svg');
	  }
	  .font_family{
		font-family:"font_family" !important;
		font-size:16px;font-style:normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	  }
	  /* 按钮去掉边框 */
	  button::after {
		border: none;
	  }
	  button{
		margin-left: 0;
		margin-right: 0;
		padding-left: 0;
		padding-right: 0;
		line-height: 1;
		color: #1c1c1c;
		font-size: 28rpx;
		background: none;
	  }
	  .button-hover {
		color:#1c1c1c;
		background:none;
	  }
	  /*每个页面公共css */
	.content {
		text-align: center;
		height: 100%;
	}
	.share-btn{
		padding: 30upx 60upx;background-color:$uni-btn-color;color: $uni-text-color-inverse;
	}
	.share-pro{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
        z-index: 5;
        line-height: 1;
        box-sizing: border-box;
        .share-pro-mask{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        .share-pro-dialog {
            width: 750rpx;
            height: 310rpx;
            overflow: hidden;
            background-color: #fff;
            border-radius: 24rpx 24rpx 0px 0px;
            position: relative;
            box-sizing: border-box;
            position: fixed;
            bottom: 0;
            .close-btn {
                padding: 20rpx 15rpx;
                position: absolute;
                top: 0rpx;
                right: 29rpx;
            }
            .share-pro-title {
                font-size: 28rpx;
                color: #1c1c1c;
                padding: 28rpx 41rpx;
                background-color: #f7f7f7;
            }

            .share-pro-body{
                display: flex;
                flex-direction: row;
                justify-content:space-around;
                font-size: 28rpx;
	            color: #1c1c1c;
                .share-item{
                    display: flex;
                    flex-direction:column;
                    justify-content: center;
                    justify-content:space-around;
                    .share-icon{
                        text-align:center;
                        font-size: 70rpx;
                        margin-top: 39rpx;
                        margin-bottom: 16rpx;
                        color: #42ae3c;
                    }
                    &:nth-child(2){
                        .share-icon{
                            color: #ff5f33;
                        }
                    }
                }
            }
        }

        /* 显示或关闭内容时动画 */

        .open {
            transition: all 0.3s ease-out;
			transform: translateY(0);
        }

        .close {
            transition: all 0.3s ease-out;
			transform: translateY(310rpx);
        }

    }
	 .canvas{
	    position: fixed !important;
	    top: 0 !important;
	    left: 0 !important;
	    display: block !important;
	    width: 100% !important;
	    height: 100% !important;
	    z-index: 10;
	}
	
</style>
