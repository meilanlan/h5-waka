<template>
  <view class="result-box">
    <view class="tit">恭喜获得</view>
    <image class="close" src="/static/image/close-1.png" @click="closePopup"></image>
    <image class="gift" :src="props.curAwaid.icon" mode="aspectFit"></image>
    <view class="gift-name">{{props.curAwaid.title}}</view>
    <view class="exp">请在【我的奖品】中激活并使用</view>
    <view class="btn" @click="openAppPage">去使用</view>
  </view>
</template>

<script setup>
  
  const props = defineProps({
    curAwaid: Object
  })
  const emit = defineEmits(['closePopup'])
  
  console.log(props.curAwaid, 'curAwaid is')
  function closePopup(){
    emit('closePopup')
  }
  
  function openAppPage(){
    //打开客户端我的背包页面
    emit('closePopup')
  }
</script>

<style lang="scss" scoped>
  .result-box {
    position: relative;
    padding-bottom: 50rpx;
    width: 590rpx;
    min-height: 592rpx;
    background: url('/static/image/lucky/result-bg.png') no-repeat;
    background-size: 100% 100%;
    font-family: MiSans, MiSans;
    .close {
      position: absolute;
      top: 32rpx;
      right: 30rpx;
      width: 33rpx;
      height: 33rpx;
    }
    .tit {
      padding-top: 60rpx;
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 48rpx;
      color: #FFFFFF;
      line-height: 64rpx;
    }
    .gift {
      display: block;
      margin: 26rpx auto 0;
      width: 96rpx;
      height: 96rpx;
    }
    .gift-name {
      margin-top: 32rpx;
      text-align: center;
      font-weight: 600;
      font-size: 48rpx;
      color: #FFFFFF;
      line-height: 64rpx;
      // text-shadow: 0px 2px 0px #1072CF;
      text-shadow: 
          -1px -1px 0 #0A78FF,  
           1px -1px 0 #0A78FF,
          -1px  1px 0 #0A78FF,
           1px  1px 0 #0A78FF,
           0px 2px 0px #1072CF;
    }
    .exp {
      text-align: center;
      margin-top: 16rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(255,255,255,0.6);
      line-height: 38rpx;
    }
    .btn {
      margin: 50rpx auto 0;
      width: 490rpx;
      height: 96rpx;
      background: #FFFFFF;
      border-radius: 16rpx;
      line-height: 96rpx;
      text-align: center;
      font-weight: 600;
      font-size: 32rpx;
      color: #22C0FF;
    }
  }
</style>