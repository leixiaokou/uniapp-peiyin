<template>
	<view>
		<view class="link-container" v-if="total > 0">
			<view  v-for="item, index in links" :key="item.id" @tap="goToLink(index)">
				
				<view class="link-item">
					<view class="logo">
						<image  :src="item.logo"></image>
					</view>
					<view class="link-middle">
						<view class="title"> 
							 {{item.app_name}}
						</view>
						<view class="desciption">
							{{item.description}}
						</view>  
					</view>
					<view class="go-link">
						<image src="../../static/user/to.png"></image> 
					</view>
				 </view>
				 
				<!--  #ifdef  MP-TOUTIAO -->
					<ad v-if="(index == adIndex) && isActiveAd" ad-intervals=32 unit-id="2koak5tat4f5acdquf" type="banner" scale="80"></ad>
				<!--  #endif -->

			</view>
		</view>
		<!--  #ifdef  MP-TOUTIAO -->
		<ad v-if="isActiveAd" ad-intervals=32 unit-id="d4l6cb7bfl81gf2cjc" type="video" scale="80"></ad>
		<!--  #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				links: [],
			    total: 0,
				isActiveAd: 1,
				adIndex: 0,
			}
		},
		onLoad() {
			this.loadLinks()
		},
		onShow() {
			this.isActiveAd = 0
			this.isActiveAd = 1
		},
		methods: {
			goToLink:function(e){
				let link = this.links[e]
				console.log(link)
				uni.navigateToMiniProgram({
				  appId: link.app_id,
				  path: link.url,
				  extraData: {
				  },
				  success(res) {
				    // 打开成功
				  }
				})
			},
			loadLinks: function(){
				let url = '/link?app_id=' + this.APP_ID
				this.$http.get(url).then(res => {
					console.log(res)
					let links = res.data.data 
					if (links) {
						this.links = links
					}
					let total = links.length
					this.total = total
					if (total > 0) {
						this.adIndex =  Math.ceil(total / 2) - 1
					} 
					console.log(this.links)
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f1f1f1 !important
	}
	.link-container{
		margin: 50rpx 30rpx; 
	}
	.link-item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 100rpx;
		padding: 30rpx;
		margin:20rpx auto;
		background-color:#ffffff;
		border-radius: 10upx;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);
	}	
	.logo image{
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
	}
	.link-middle{
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 20rpx;
	}
	.title {
		vertical-align: text-top;
		font-size: 32rpx;
		font-weight: 500;
	}	
	.desciption{
		font-size: 26rpx;
	}
	.go-link{
		display: flex;
		flex-direction: column;
		justify-items:center;
		justify-content: center;
	}
	.go-link image {
		height: 50rpx;
		width: 50rpx;
	}

</style>
