<template>
    <view class="tab-list">
      <view :class="['box', 'box-'+item, curTab===item?'active':'gray', ]" v-for="item in 2" :key="'tab-'+item" @click="switchTab(item)">
        <image v-show="item === 1" src="../../../static/image/vip.png"></image>
        <image v-show="item === 2" src="../../../static/image/svip.png"></image>
        {{item===1?'咓咔VIP':'咓咔SVIP'}}
      </view>
    </view>
    <view class="detail">
      <view class="top">
        <text class="text1"></text>开通会员<text class="text2"></text>
      </view>
      <view class="text3">订阅VIP会员每月获赠50点能量值</view>
      <scroll-view class="vip-scroll" scroll-x="true">
        <view class="vip-detail-list">
          <view :class="['vip-box',curVipIndex === index&&'active']" v-for="(item, index) in vipList" :key="'vip-'+item.id" @click="switchVip(item,index)">
            <view class="month">{{item.month}}</view>
            <view class="price">¥{{item.price}}</view>
            <view class="text4">每月仅需¥18/月</view>
            <view class="text5">节省40%</view>
            <view class="text6">最受欢迎</view>
          </view>
        </view>
      </scroll-view>
      
    </view>
    <view class="foot-wrapper">
      <view class="mask"></view>
      <view class="wrapper-box">
        <view class="foot-wrapper-btn">
          确定协议并支付19.5元
        </view>
        <view class="sure" @click="agaree=!agaree">
          <!-- <radio-group @change="radioChange">
            <label class="uni-list-cell uni-list-cell-pd">
                <radio value="1" :checked="agaree === '1'" color="#22c0ff" />
            </label>
          </radio-group> -->
          <view :class="['check-box', agaree === false&&'active']"></view>
          开通前确认 <text>《咓咔超级社群会员服务协议》</text>
        </view>
      </view>
    </view>
</template>

<script setup>
  import {ref} from 'vue'
  
  const curTab = ref(1)
  const curVipIndex = ref(0)
  const agaree = ref(false)
  const vipList = ref([
    {d:1, month: '1个月', price: 30, only: '', save: ''},
    {d:2, month: '3个月', price: 19.5, only: '', save: ''},
    {d:3, month: '连续包月', price: 216.5, only: 18, save: '35%'},
    {d:4, month: '1年', price: 300, only: 20, save: '40%'},
  ])
  
  function radioChange() {
    agaree.value = agaree.value === '1'?'':'1'
    console.log( agaree.value, 'uiuiu')
  }
  
  function switchVip(item, index){
    curVipIndex.value = index
  }
  function switchTab(item){
    curTab.value = item
  }
</script>

<style lang="scss" scoped>
  .tab-list {
    margin-top: 32rpx;
    background: #F0F3F8;
    border-radius: 16rpx;
    font-family: 'MiSans';
    display: flex;
    .box {
      width: 342rpx;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 28rpx;
      color: rgba(0,0,0,0.3);
      background: #F0F3F8;
      // border-radius: 16rpx;
      image {
        margin-right: 16rpx;
        width: 32rpx;
        height: 32rpx;
      }
      
      &.box-1 {
        &.gray {
          margin-right: -14rpx;
          border-radius: 16rpx 0 16rpx 16rpx;
          z-index: 10;
        }
        &.active {
          width: 360rpx;
          background-color: #22C0FF;
          border-radius: 16rpx 30rpx 0 16rpx;
          color: #ffffff;
        }
      }
      &.box-2 {
        &.gray {
          margin-left: -14rpx;
          border-radius: 0 16rpx 16rpx 16rpx;
        }
        &.active {
          width: 360rpx;
          background-color: #22C0FF;
          border-radius: 30rpx 16rpx 16rpx 0;
          color: #ffffff;
        }
      }
      
    }
  }
  .detail {
    margin-top: 32rpx;
    padding-bottom: 300rpx;
    font-family: 'MiSans';
    .top {
      text-align: center;
      font-size: 32rpx;
      color: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      text {
        display: block;
        width: 6rpx;
        height: 6rpx;
        border-radius: 50%;
        background: #22C0FF;
      }
      .text1 {
        margin-right: 10rpx;
        position: relative;
        &::before {
          content: '';
          width: 52rpx;
          height: 2rpx;
          background: linear-gradient( 90deg, rgba(34,192,255,0) 0%, #22C0FF 100%);
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
      .text2 {
        margin-left: 10rpx;
        position: relative;
        &::before {
          content: '';
          width: 52rpx;
          height: 2rpx;
          background: linear-gradient( 90deg, #22C0FF 0%, rgba(34,192,255,0) 100%);
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
    .text3 {
      margin-top: 4rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: #22C0FF;
      line-height: 36rpx;
      text-align: center;
    }
    .vip-scroll {
      width: 100%;
    }
    .vip-detail-list {
      width: 100%;
      margin-top: 24rpx;
      display: flex;
      position: relative;
      >*{
        flex-shrink: 0;
      }
      .vip-box {
        padding-top: 64rpx;
        margin-right: 20rpx;
        width: 216rpx;
        height: 280rpx;
        border-radius: 16rpx;
        background-color: #F0F3F8;
        text-align: center;
        color: #000000;
        border: 2px solid transparent;
        .month {
          font-weight: 500;
          font-size: 32rpx;
          line-height: 40rpx;
        }
        .price {
          font-weight: 700;
          font-size: 36rpx;
          line-height: 48rpx;
          margin-top: 10rpx;
        }
        .text4 {
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(0,0,0,0.3);
          line-height: 36rpx;
        }
        .text5 {
          margin-top: 18rpx;
          font-weight: 400;
          font-size: 28rpx;
          color: #22C0FF;
          line-height: 36rpx;
        }
        .text6 {
          position: absolute;
          top: 0;
          left: 0;
          width: 124rpx;
          height: 40rpx;
          background: #22C0FF;
          border-radius: 16rpx 0 16rpx 0;
          font-family: 'PingFang SC';
          font-weight: 500;
          font-size: 24rpx;
          color: #FFFFFF;
          line-height: 40rpx;
        }
        &.active {
          border-color: #22C0FF;
          background-color: rgba(34, 192, 255, .1);
        }
      }
    }
  }
  .foot-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .mask {
      width: 100%;
      height: 64rpx;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    }
    .wrapper-box {
      padding: 52rpx 32rpx 74rpx;
      width: 100%;
      background-color: #ffffff;
      .foot-wrapper-btn {
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
      .sure {
        margin-top: 32rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'PingFang SC';
        font-weight: 500;
        font-size: 24rpx;
        color: rgba(0,0,0,0.4);
        line-height: 32rpx;
        text {
          color: #22C0FF;
        }
        .check-box {
          margin-right: 8rpx;
          width: 32rpx;
          height: 32rpx;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.3);
          &.active {
            border: none;
            background: url('../../../static/image/choose.png') no-repeat;
            background-size: 32rpx 32rpx;
          }
        }
      }
    }
  }
</style>