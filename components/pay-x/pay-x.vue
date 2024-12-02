<template>
  <view class="header">
      <view class="left">嗨币充值</view>
      <view class="right">
        余额:0 <image src="../../static/image/home-4.png"></image>
      </view>
    </view>
    <view class="hi-list">
      <view :class="['hi-box', curPrice===item.price&&'active']" v-for="(item,index) in hiList" :key="'hi'+index" @click="switchHi(item,index)">
        <view class="box">
          <image src="../../static/image/home-4.png" mode=""></image>
          <text>{{item.hi}}</text>
        </view>
        <view class="price">¥{{item.price}}</view>
      </view>
    </view>
    <view class="methods">
      <radio-group @change="radioChange">
          <label class="uni-list-cell uni-list-cell-pd">
              <view class="left">
                <image src="../../static/image/zfb.png"></image>支付宝
              </view>
              <radio value="1" :checked="curPay === '1'" color="#22c0ff" />
          </label>
          <label class="uni-list-cell uni-list-cell-pd">
              <view class="left">
                <image src="../../static/image/wx.png"></image>微信
              </view>
              <radio value="2" :checked="curPay === '2'" color="#22c0ff" />
          </label>
        </radio-group>
    </view>
    <view :class="['now-pay', curPrice!=-1&&'active']">
      立即充值<text v-if="curPrice!=-1">{{curPrice}}元</text>
    </view>
    <view class="exp">
      点击支付即代表同意 <text>《嗨币用户协议》</text>
    </view>
  
</template>

<script setup>
  import {ref} from 'vue'
  
  const hiList = ref([
    {id:1,price: 1,hi: 10},
    {id:2,price: 6,hi: 60},
    {id:3,price: 30,hi: 300},
    {id:4,price: 98,hi: 980},
    {id:5,price: 298,hi: 2980},
    {id:6,price: 588,hi: 5880},
  ])
  const curPay = ref('1')
  const curPrice = ref(-1)
  
  function switchHi(item, index) {
    curPrice.value = item.price
  }
  
  function radioChange(){
    
  }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000000;
    .left {
      font-weight: 500;
      font-size: 32rpx;
      line-height: 40rpx;
    }
    .right {
      display: flex;
      align-items: center;
      font-family: 'PingFang SC';
      font-weight: 500;
      font-size: 28rpx;
      line-height: 32rpx;
      image {
        margin-left: 8rpx;
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .hi-list {
    font-family: 'MiSans';
    margin-top: 32rpx;
    display: flex;
    flex-wrap: wrap;
    .hi-box {
      margin-right: 18rpx;
      margin-bottom: 20rpx;
      width: 216rpx;
      height: 200rpx;
      background: #F0F3F8;
      border-radius: 16rpx;
      border: 4rpx solid transparent;
      .box {
        margin-top: 50rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        text {
          font-weight: 600;
          font-size: 36rpx;
          color: #000000;
          line-height: 44rpx;
        }
      }
      image {
        margin-right: 8rpx;
        width: 48rpx;
        height: 48rpx;
      }
      .price {
        margin-top: 16rpx;
        text-align: center;
        font-weight: 600;
        font-size: 28rpx;
        color: rgba(0,0,0,0.4);
        line-height: 36rpx;
        
      }
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &.active {
        border-color: #22C0FF;
        background: rgba(34,192,255,0.1);
      }
    }
  }

  .methods {
    margin-top: 20rpx;
    .uni-list-cell {
      margin-bottom: 40rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      image {
        margin-right: 16rpx;
        width: 56rpx;
        height: 56rpx;
      }
      .left {
        display: flex;
        align-items: center;
      }
    }
  }
  .now-pay {
    width: 686rpx;
    height: 96rpx;
    border-radius: 16rpx;
    text-align: center;
    line-height: 96rpx;
    font-family: 'MiSans';
    font-weight: 600;
    font-size: 32rpx;
    color: #FFFFFF;
    background: rgba(34, 192, 255, .1);
    &.active {
      background: #22C0FF;
    }
  }
  .exp {
    margin-top: 16rpx;
    text-align: center;
    font-family: 'MiSans';
    font-weight: 400;
    font-size: 24rpx;
    color: rgba(0,0,0,0.4);
    line-height: 32rpx;
    text {
      color: #22C0FF;
    }
  }
</style>