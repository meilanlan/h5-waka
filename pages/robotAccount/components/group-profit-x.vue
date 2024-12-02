<template>
  <view class="wrapper">
    <view class="wrapper-profit">
      <view class="title">
        <text class="left">今日总收益(嗨币)</text>
        <view class="why-box">
          <text>提现协议</text>
          <image src="../../../static/image/why.png"></image>
        </view>
      </view>
      <view class="price" @click="toPage(1)">
        <text>0</text>
        收益明细
        <image src="../../../static/image/next-1.png"></image>
      </view>
      <view class="list-box">
        <view class="list">
          <view class="text">持有嗨币</view>
          <view class="num">88</view>
          <view class="btn" @click="toPage(2)">去结算</view>
        </view>
        <view class="list">
          <view class="text">嗨豆数量</view>
          <view class="num">88</view>
          <view class="btn" @click="toPage(3)">去提现</view>
        </view>
      </view>
      
    </view>
    
    <view class="time-list">
      <view :class="['box', curTimeIndex===index&&'active']" v-for="(item,index) in timeList" :key="index" @click="switchTime(index)">
        {{item}}
      </view>
    </view>
    
    <view class="wrapper-list">
      <view class="box" v-for="(item, index) in 5" :key="'index-'+index">
        <view class="left">
          <view class="name">交易中</view>
          <view class="time">2024-03-08 16:24</view>
        </view>
        <view class="right">¥60.00</view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  
  const timeList = ref(['全部','最近1周','最近1个月','最近3个月'])
  const curTimeIndex = ref(0)
  
  function switchTime(index) {
    curTimeIndex.value = index
  }
  
  function toPage(type) {
    // 1:收益详情 2:去结算 3:去提现
    let url = type === 1 ? '/pages/robotAccount/profitDetail' : type === 2 ? '/pages/robotAccount/settlement' : '/pages/robotAccount/wathdrawal'
    uni.navigateTo({
    	url: url
    });
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 32rpx;
    font-family: 'MiSans';
  }
  .wrapper-profit {
    padding: 32rpx;
    width: 100%;
    height: 400rpx;
    background: url('../../../static/image/profit-bg.png') no-repeat;
    background-size: 100% 100%;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      .left {
        font-weight: 400;
        color: rgba(255,255,255,0.8);
        line-height: 32rpx;
      }
      .why-box {
        color: #ffffff;
        display: flex;
        align-items: center;
        image {
          margin-left: 8rpx;
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
    .price {
      margin-top: 40rpx;
      display: flex;
      align-items: end;
      font-weight: 400;
      font-size: 24rpx;
      color: rgba(255,255,255,0.6);
      line-height: 32rpx;
      text {
        margin-right: 16rpx;
        font-weight: 700;
        font-size: 48rpx;
        color: #FFFFFF;
        line-height: 48rpx;
      }
      image {
        width: 32rpx;
        height: 32rpx;
      }
    }
    .list-box {
      margin-top: 16rpx;
      display: flex;
      .list {
        padding-top: 32rpx;
        width: 304rpx;
        height: 200rpx;
        background: rgba(255,255,255,0.2);
        text-align: center;
        .text {
          font-weight: 400;
          font-size: 28rpx;
          color: rgba(255,255,255,0.6);
          line-height: 32rpx;
        }
        .num {
          margin-top: 8rpx;
          font-weight: 700;
          font-size: 28rpx;
          color: #FFFFFF;
          line-height: 32rpx;
        }
        .btn {
          margin: 16rpx auto 0;
          width: 104rpx;
          height: 48rpx;
          background: #FFFFFF;
          border-radius: 222rpx;
          text-align: center;
          line-height: 48rpx;
          font-weight: 500;
          font-size: 24rpx;
          color: #FFA332;
        }
      }
    }
    
  }
  .time-list {
    margin-top: 48rpx;
    display: flex;
    .box {
      flex-shrink: 0;
      margin-right: 24rpx;
      padding: 10rpx 24rpx;
      border-radius: 222rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(0,0,0,0.6);
      line-height: 36rpx;
      &:last-of-type {
        margin-right: 0;
      }
      &.active {
        background-color: #22C0FF;
        color: #ffffff;
      }
    }
  }
  .wrapper-list {
    margin-top: 24rpx;
    .box {
      margin-bottom: 24rpx;
      padding: 24rpx 32rpx;
      width: 100%;
      height: 128rpx;
      background: #F0F3F8;
      border-radius: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-weight: 400;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
      }
      .time {
        margin-top: 8rpx;
        font-weight: 400;
        font-size: 24rpx;
        color: rgba(0,0,0,0.3);
        line-height: 32rpx;
      }
      .right {
        font-weight: 500;
        font-size: 32rpx;
        color: #22C0FF;
        line-height: 40rpx;
      }
    }
  }
</style>