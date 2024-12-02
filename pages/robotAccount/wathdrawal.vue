<template>
  <view class="wrapper">
    <view class="common-header">
      <image class="back" src="@/static/image/btn_back.png" @click="returnPage"></image>
      <text>嗨币结算</text>
    </view>
    <view class="wrapper-box">
      <view class="info">
        <image class="headimg" src="@/static/logo.png"></image>
        <view class="">
          <view class="name">
            小金鱼HY<image src="@/static/image/vip.png"></image>
          </view>
          <view class="text">已实名认证</view>
        </view>
      </view>
      
      <view class="wathdrawal-box">
        <view class="top-box">
          <view class="text1">可提现:¥0</view>
          <view class="inpt-box">
            <input class="uni-input" v-model="num" type="number" />
            <view class="all">全部提现</view>
          </view>
          <view class="foot-box">
            <view class="box">
              <view class="price">
                66
              </view>
              <view class="text">
                嗨豆余额
              </view>
            </view>
            <view class="box">
              <view class="price">
                ¥2,232
              </view>
              <view class="text">
                累计提现
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="exp1">
        每月1日可以发起提现，提交后5个工作日到帐
      </view>
      
      <view class="btn">
        提现
      </view>
    </view>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  
  const num = ref('')
  
  function returnPage(){
    uni.navigateBack();
  }
</script>

<style lang="scss" scoped>
  .common-header {
    background-color: #ffffff;
  }
  .wrapper {
    min-height: 100vh;
    background-color: #ffffff;
    font-family: 'MiSans';
    .wrapper-box {
      padding: 20rpx 32rpx 32rpx;
      .info {
        display: flex;
        align-items: center;
        .headimg {
          margin-right: 20rpx;
          width: 112rpx;
          height: 112rpx;
          border-radius: 24rpx;
        }
        .name {
          font-weight: 600;
          font-size: 32rpx;
          color: #000000;
          line-height: 40rpx;
          image {
            margin-left: 8rpx;
            width: 32rpx;
            height: 28rpx;
          }
        }
        .text {
          margin-top: 16rpx;
          font-weight: 400;
          font-size: 28rpx;
          color: #22C0FF;
          line-height: 32rpx;
        }
      }
    }
  }
  .wathdrawal-box {
    margin-top: 32rpx;
    width: 100%;
    height: 296rpx;
    background-color: #F0F3F8;
    border-radius: 24rpx;
    position: relative;
    .top-box {
      padding: 32rpx 32rpx 0;
      .text1 {
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(0,0,0,0.4);
        line-height: 32rpx;
      }
      .inpt-box {
        margin-top: 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          height: 48rpx;
          color: #000000;
          font-weight: 700;
          font-size: 48rpx;
          color: #000000;
          line-height: 48rpx;
        }
      }
      .all {
        width: 128rpx;
        height: 48rpx;
        background: #FFFFFF;
        border-radius: 222rpx;
        font-weight: 500;
        font-size: 24rpx;
        color: rgba(0,0,0,0.6);
        line-height: 48rpx;
        text-align: center;
      }
    }
    .foot-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 106rpx;
      background-color: #AEB8C8;
      border-radius: 0 0 24rpx 24rpx;
      display: flex;
      .box {
        padding-top: 18rpx;
        width: 342rpx;
        height: 100%;
        text-align: center;
        font-size: 28rpx;
        line-height: 32rpx;
        .price {
          font-weight: 700;
          color: #FFFFFF;
        }
        .text {
          margin-top: 8rpx;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
        }
      }
    }
    
  }
  .exp1 {
    margin-top: 24rpx;
    text-align: center;
    font-weight: 400;
    font-size: 28rpx;
    color: #9E9E9E;
    line-height: 44rpx;
  }
  :deep .uni-input-input {
    width: 4rpx;
    caret-color: #22C0FF ;
  }
  .btn {
    margin-top: 48rpx;
    width: 100%;
    height: 96rpx;
    line-height: 96rpx;
    background: #22C0FF;
    border-radius: 16rpx;
    text-align: center;
    font-weight: 600;
    font-size: 32rpx;
    color: #FFFFFF;
  }
</style>