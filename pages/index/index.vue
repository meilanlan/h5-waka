<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
    <image src="../../static/image/bg_wxq.jpg" mode=""></image> -->
		<!-- <view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
	</view>
</template>
<script setup>
  
  
</script>

// <script>
// 	export default {
// 		data() {
// 			return {
// 				title: 'Hello'
// 			}
// 		},
// 		onLoad() {

// 		},
// 		methods: {

// 		},
// 	}
// </script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
