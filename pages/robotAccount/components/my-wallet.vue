<template>
  <view class="wallet-box">
    <view class="wallet">
      <view class="title">我的嗨币</view>
      <view class="info">
        <view class="left">
          <image src="../../../static/image/home-4.png" mode=""></image>
          <text>0</text>
        </view>
        <view class="right">去充值</view>
      </view>
      <view class="wallet-bottom">
        <view class="box">
          <view class="num">66</view>
          <view class="text">能量值</view>
        </view>
        <view class="line"></view>
        <view class="box">
          <view class="num">12</view>
          <view class="text">元气值</view>
        </view>
        <view class="line"></view>
        <view class="box">
          <view class="num">30,244,300</view>
          <view class="text">魅力值</view>
        </view>
      </view>
    </view>
    <view class="bill" @click="toPage">
      <view class="left">
        <image src="../../../static/image/bill.png"></image>账单
      </view>
      <image class="right" src="../../../static/image/next.png"></image>
    </view>
  </view>
</template>

<script setup>
  
  function toPage(){
    uni.navigateTo({
    	url: '/pages/robotAccount/myBill?id='+1
    });
  }
</script>

<style lang="scss" scoped>
  .wallet-box {
    margin-top: 32rpx;
    font-family: 'MiSans';
    .wallet {
      width: 100%;
      height: 296rpx;
      background: url('../../../static/image/wallet-bg.png') no-repeat;
      background-size: 100% 100%;
      .title {
        padding: 32rpx 32rpx 0;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(255,255,255,0.8);
        line-height: 32rpx;
      }
      .info {
        margin-top: 32rpx;
        padding: 0 32rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          text {
            font-weight: 700;
            font-size: 48rpx;
            color: #FFFFFF;
            line-height: 48px;
          }
        }
        image {
          margin-right: 16rpx;
          width: 56rpx;
          height: 56rpx;
        }
        .right {
          width: 124rpx;
          height: 64rpx;
          background: #FFFFFF;
          border-radius: 32rpx;
          line-height: 64rpx;
          text-align: center;
          font-weight: 500;
          font-size: 28rpx;
          color: #22C0FF;
        }
      }
      .wallet-bottom {
        width: 100%;
        height: 106rpx;
        background: #59B8FF;
        border-radius: 0 0 24rpx 24rpx;
        display: flex;
        align-items: center;
        .line {
          width: 2rpx;
          height: 36rpx;
          background: rgba(255,255,255,0.4);
        }
        .box {
          padding-top: 18rpx;
          width: 227rpx;
          text-align: center;
          font-size: 28rpx;
          .num {
            font-weight: 700;
            color: #FFFFFF;
            line-height: 32rpx;
          }
          .text {
            margin-top: 8rpx;
            font-weight: 400;
            color: rgba(255,255,255,0.6);
            line-height: 32rpx;
          }
        }
      }
    }
    .bill {
      padding: 0 32rpx;
      margin-top: 32rpx;
      width: 100%;
      height: 120rpx;
      background: #F0F3F8;
      border-radius: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      image {
        width: 32rpx;
        height: 32rpx;
      }
      .left {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
        image {
          margin-right: 24rpx;
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
</style>