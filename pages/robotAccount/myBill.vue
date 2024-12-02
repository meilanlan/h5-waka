<template>
  <view class="common-header">
    <image class="back" src="../../static/image/btn_back.png"></image>
    <text>我的账单</text>
  </view>
  <view class="header-tab">
    <view :class="['box',curTab === item&&'active']" v-for="item in 2" :key="'tab-'+item" @click="switchTab(item)">
      {{item === 1 ? '获得嗨币' : '使用记录'}}
    </view>
  </view>
  <view class="list-box">
    <view class="box">
      <view class="left">
        <view class="tit textEllipsis">充值6元</view>
        <view class="time">2024-02-09</view>
      </view>
      <view class="right">
        +600嗨币
      </view>
    </view>
    <view class="box">
      <view class="left">
        <view class="tit textEllipsis">购买会员礼物赠送给OscarOscarOscar</view>
        <view class="time">2024-02-09</view>
      </view>
      <view class="right">
        +88,888,850嗨币
      </view>
    </view>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  
  const curTab = ref(1)
  
  
  function switchTab(item) {
    curTab.value = item
  }
</script>

<style lang="scss" scoped>
  .common-header {
    background-color: #ffffff;
  }
  .header-tab {
    width: 100%;
    height: 100rpx;
    background-color: #ffffff;
    display: flex;
    align-items: end;
    .box {
      width: 50%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 32rpx;
      color: rgba(0,0,0,.3);
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 10rpx;
        transform: translateX(-50%);
        display: block;
        width: 40rpx;
        height: 8rpx;
        border-radius: 4rpx;
      }
      &.active {
        color: #000000;
        font-weight: 500;
        &::after {
          content: '';
          background: #22C0FF;
        }
      }
    }
  }

  .list-box {
    padding: 32rpx;
    .box {
      margin-bottom: 32rpx;
      width: 100%;
      padding: 30rpx;
      background-color: #ffffff;
      border-radius: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        .tit {
          width: 360rpx;
          font-size: 30rpx;
          color: #0E1B2E;
          font-weight: 500;
        }
        .time {
          margin-top: 16rpx;
          font-size: 24rpx;
          color: #8C98A6;
        }
      }
      .right {
        font-size: 30rpx;
        font-weight: 500;
        color: #22C0FF;
      }
    }
  }
</style>