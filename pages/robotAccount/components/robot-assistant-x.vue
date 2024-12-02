<template>
  <view class="wrapper-box">
    <view class="box" v-for="(item,index) in 4" :key="index">
      <image class="bg" src="../../../static/image/assistant-1.png"></image>
      <view class="robot-icon"></view>
      <view class="info">
        <view class="title textEllipsis">小嗨机器人群助手（基础版）</view>
        <view class="text text2">Hi AI Group Chat</view>
        <view class="text">开发者: wakagroup</view>
        <view class="text1 text3Ellipsis">
          创建超级社群后，每个社群都会自带基础班小嗨智能机器人群助于，它可以帮助群主更便捷的管理社群入群欢迎、退群提醒、改名提醒、签到、天气、潜水统计等功能
        </view>
        <view class="btn-list">
          <view class="left">永久免费</view>
          
          <!-- <view class="btn btn-1">已安装</view> -->
          <view class="btn btn-2" @click="openMethods">获取</view>
        </view>
      </view>
    </view>
    <!-- 获取支付方式 -->
    <uni-popup ref="payMethodsRef" type="bottom" :is-mask-click="false">
      <view class="common-popup">
        <pay-methods-x></pay-methods-x>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import payMethodsX from '../../../components/pay-methods-x/pay-methods-x.vue';
  
  const payMethodsRef = ref(null)
  
  function openMethods(){
    payMethodsRef.value.open()
  }
</script>

<style lang="scss" scoped>
  .wrapper-box {
    margin-top: 32rpx;
    display: flex;
    flex-wrap: wrap;
    font-family: 'MiSans';
    .box {
      margin-bottom: 24rpx;
      margin-right: 14rpx;
      width: 336rpx;
      height: 548rpx;
      background: #F0F3F8;
      border-radius: 24rpx;
      position: relative;
      &:nth-of-type(2n) {
        margin-right: 0;
      }
      .bg {
        width: 100%;
        height: 216rpx;
        border-radius: 24rpx 24rpx 0 0;
      }
      .robot-icon {
        position: absolute;
        left: 16rpx;
        top: 164rpx;
        width: 72rpx;
        height: 72rpx;
        border: 1px solid red;
      }
      .info {
        padding: 40rpx 16rpx 0;
        font-size: 24rpx;
        .title {
          color: #000000;
          font-weight: 500;
          line-height: 24rpx;
        }
        .text {
          font-weight: 400;
          color: rgba(0,0,0,0.4);
          line-height: 32rpx;
        }
        .text2 {
          margin-top: 8rpx;
        }
        .text1 {
          margin-top: 16rpx;
          font-weight: 400;
          color: rgba(0,0,0,0.6);
          line-height: 32rpx;
        }
        .btn-list {
          margin-top: 16rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            font-weight: 500;
            color: #000000;
            line-height: 24rpx;
          }
          .btn {
            width: 112rpx;
            height: 48rpx;
            border-radius: 46rpx;
            text-align: center;
            line-height: 48rpx;
            font-weight: 400;
            font-size: 24rpx;
            &.btn-1 {
              background: #FFFFFF;
              color: rgba(0,0,0,0.2);
            }
            &.btn-2 {
              background: #22C0FF;
              color: #ffffff;
            }
          }
        }
      }
    }
    .common-popup {
      padding: 0;
      height: 604rpx;
    }
  }
</style>