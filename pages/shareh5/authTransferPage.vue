<template>
  <view class="wrapper">
    <view class="bg"></view>
    <view class="wrapper-box">
      <image class="logo" src="/static/image/logo.jpg" mode=""></image>
      <view class="name">Whack</view>
      <view class="btn" @click="toAppstore">
        返回Whack APP
      </view>
    </view>
    
  </view>
</template>

<script setup>
  import {ref,reactive,onMounted} from 'vue'
  
  function toAppstore(){
    let url = 'whackverify://user-verify'
    window.location.href = url
  }
  
  onMounted(()=>{
    const appPage = document.getElementById('app');
    appPage.style.paddingTop = 0;
  })
</script>

<style lang="scss">
  .wrapper {
    padding-top: 200rpx;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 400rpx;
      background: linear-gradient(to bottom,rgba(40,193,255,0.5),#ffffff);
    }
    .wrapper-box {
      position: relative;
    }
    .logo {
      display: block;
      margin: 0 auto 0;
      width: 176rpx;
      height: 176rpx;
      border-radius: 24rpx;
    }
    .name {
      margin-top: 24rpx;
      font-weight: 500;
      font-size: 36rpx;
      color: #000000;
      line-height: 36rpx;
      text-align: center;
    }
    .btn {
      margin: 300rpx auto 0;
      width: 630rpx;
      height: 96rpx;
      background: #22C0FF;
      border-radius: 16rpx;
      text-align: center;
      line-height: 96rpx;
      font-weight: 600;
      font-size: 32rpx;
      color: #FFFFFF;
    }
  }
</style>