<template>
  <view class="my-home">
    <view class="my-info">
      <image class="left" src="../../../static/logo.png"></image>
      <view class="right">
        <view class="name">
          <text class="nickname">小金鱼HY</text>
          <view class="grage"></view>
          <image class="masonry" src="../../../static/image/masonry.png"></image>
        </view>
        <view class="icon-list">
          <view class="icon-box"></view>
          <view class="icon-box"></view>
          <view class="icon-box"></view>
        </view>
        <view class="ip">
          IP:四川 成都<text>|</text>ID:22311128 <image class="copy" src="../../../static/image/copy.png" mode=""></image>
        </view>
      </view>
    </view>
  
    <view class="tab-list">
      <div :class="['tab-box', curTabIndex=== index&&'active']" v-for="(item, index) in tabList" :key="'TAB'+index" @click="switchTab(item,index)">
        <image :src="item.iconUrl"></image>
        <view class="value">{{item.value}}</view>
      </div>
    </view>
    
    <!-- 能量助力 -->
    <energy-assist-x v-if="curTabIndex === 0"></energy-assist-x>
    <!-- 我的钱包 -->
    <my-wallet v-else-if="curTabIndex === 1"></my-wallet>
    <!-- 会员中心 -->
    <vip-center-x v-else-if="curTabIndex === 2"></vip-center-x>
    <!-- 嗨币充值 -->
    <view v-else class="pay-model">
      <pay-x></pay-x>
    </view>
    
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import energyAssistX from './energy-assist-x.vue';
  import myWallet from './my-wallet.vue'
  import vipCenterX from './vip-center-x.vue';
  import payX from '../../../components/pay-x/pay-x.vue';
  
  const tabList = [
    {value: '能量助力',iconUrl: new URL("@/static/image/home-1.png", import.meta.url).href},
    {value: '我的钱包',iconUrl: new URL("@/static/image/home-2.png", import.meta.url).href},
    {value: '会员中心',iconUrl: new URL("@/static/image/home-3.png", import.meta.url).href},
    {value: 'Hi币充值',iconUrl: new URL("@/static/image/home-4.png", import.meta.url).href},
  ]
  
  const curTabIndex = ref(0)
  
  function switchTab(item, index) {
    curTabIndex.value = index
  }
  
  
</script>

<style lang="scss" scoped>
  .my-home {
    font-family: 'MiSans';
    margin-top: 34rpx;
    padding: 0 32rpx;
    .my-info {
      background-color: #333333;
      padding: 30rpx 36rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
      .left {
        margin-right: 20rpx;
        width: 124rpx;
        height: 124rpx;
      }
      .right {
        .name {
          display: flex;
          align-items: center;
        }
        .nickname {
          font-weight: 600;
          font-size: 32rpx;
          color: #FFFFFF;
        }
        .grage {
          margin-left: 12rpx;
          width: 96rpx;
          height: 30rpx;
          background-color: orange;
        }
        .masonry {
          margin-left: 8rpx;
          width: 32rpx;
          height: 32rpx;
        }
        .icon-list {
          margin-top: 18rpx;
          display: flex;
          align-items: center;
          .icon-box {
            margin-right: 10rpx;
            width: 124rpx;
            height: 28rpx;
            background: linear-gradient( 90deg, #FFC75D 0%, #EF4A2E 100%);
            border-radius: 288rpx;
            // border: 1px solid;
            border-image: linear-gradient(270deg, rgba(255, 150.0000062584877, 75.00000312924385, 1), rgba(255, 243.15266132354736, 204.22566533088684, 1)) 1 1;
          }
        }
        .ip {
          margin-top: 18rpx;
          font-weight: 400;
          font-size: 20rpx;
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          text {
            margin-left: 12rpx;
            margin-right: 16rpx;
          }
        }
        .copy {
          margin-left: 8rpx;
          width: 24rpx;
          height: 24rpx;
        }
      }
    }
    .tab-list {
      margin-top: 28rpx;
      display: flex;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
      .tab-box {
        margin-right: 16rpx;
        width: 160rpx;
        height: 140rpx;
        border-radius: 16rpx;
        border: 4rpx solid #F0F3F8;
        text-align: center;
        image {
          // display: block;
          margin: 18rpx auto 0;
          width: 56rpx;
          height: 56rpx;
        }
        .value {
          margin-top: 8rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.6);
          line-height: 32rpx;
        }
        &:last-of-type{
          margin-right: 0;
        }
        &.active {
          border-color: #22C0FF;
          background: rgba(34,192,255,0.1);
        }
      }
    }
  
  }
  .pay-model {
    margin-top: 32rpx;
  }
  
</style>