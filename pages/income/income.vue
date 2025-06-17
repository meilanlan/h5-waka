<template>
  <view>
    <view :class="['common-header',isIos!=true?'safeTop':'']">
      <image class="back" src="@/static/image/btn_back.png" @click="backPage()"></image>
      <text>我的收益</text>
      <view class="tips" @click="openAgreement(1)">
        <text>提现协议</text>
        <image src="/static/image/why1.png"></image>
      </view>
    </view>
    <view class="wrapper">
      <view class="wrapper-profit">
        <view class="list-box">
          <view class="tit">今日总收益(嗨币)</view>
          <view class="price" @click="toPage(1)">
            <text>8888</text>
            收益明细
            <image src="@/static/image/next-1.png"></image>
          </view>
          <view class="list list-1">
            <view class="text">收益嗨币</view>
            <view class="num">66</view>
            <view class="btn" @click="toPage(2)">去结算</view>
          </view>
        </view>
        <view class="list-box">
          <view class="tit">当月累计收入(嗨币)</view>
          <view class="price" @click="toPage(2)">
            <text>888</text>
            收益明细
            <image src="@/static/image/next-1.png"></image>
          </view>
          <view class="list">
            <view class="text">嗨豆数量</view>
            <view class="num">666666</view>
            <view class="btn" @click="toPage(3)">去提现</view>
          </view>
        </view>
        <!-- <view class="title">
          <text class="left">今日总收益(嗨币)</text>
          <view class="why-box" @click="openAgreement(1)">
            <text>提现协议</text>
            <image src="@/static/image/why.png"></image>
          </view>
        </view>
        <view class="price" @click="toPage(1)">
          <text>888888</text>
          收益明细
          <image src="@/static/image/next-1.png"></image>
        </view> -->
        <!-- <view class="list-box">
          <view class="list">
            <view class="text">持有嗨币</view>
            <view class="num">888888</view>
            <view class="btn" @click="toPage(2)">去结算</view>
          </view>
          <view class="list">
            <view class="text">嗨豆数量</view>
            <view class="num">666666</view>
            <view class="btn" @click="toPage(3)">去提现</view>
          </view>
        </view> -->
      </view>
      <view class="tablist">
        <view class="tab-box">
          <text :class="['text1', tabIndex===item?'active':'']" v-for="(item,index) in 2" :key="'tab-'+index" @click="switchTab(item)">{{item===1?'收益明细':'交易记录'}}</text>
        </view>
      </view>
      <view class="time-list">
        <view :class="['box', curTimeIndex===index&&'active']" v-for="(item,index) in timeList" :key="index" @click="switchTime(index)">
          {{item}}
        </view>
      </view>
      <view class="wrapper-list">
        <!-- <view class="box" v-for="(item, index) in incomeInfo.data.list" :key="'index-'+index"> -->
        <view class="box" >
          <view class="left">
            <view class="name">交易中</view>
            <view class="time">2024-03-08 16:24</view>
          </view>
          <view class="right">¥60.00</view>
        </view>
      </view>
    </view>
    
    
    <!-- 提现协议 -->
    <uni-popup ref="agreementPopup" type="center">
      <view class="common-popup">
        <image @click="openAgreement(2)" class="close" src="@/static/image/close.png"></image>
        <profit-agreement-x-vue></profit-agreement-x-vue>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import profitAgreementXVue from '../robotAccount/components/profit-agreement-x.vue'
  
  const agreementPopup = ref(null)
  const tabIndex = ref(1)
  const timeList = ref(['全部','最近1周','最近1个月','最近3个月'])
  const curTimeIndex = ref(0)
  const isIos = ref(window.isiOS)
  function toPage(type) {
   // 1:收益详情 2:去结算 3:去提现
   let url = type === 1 ? '/pages/robotAccount/profitDetail' : type === 2 ? '/pages/robotAccount/settlement' : '/pages/robotAccount/wathdrawal'
   uni.navigateTo({
    url: url
   });
  }
  function openAgreement(type){
    type === 1 && agreementPopup.value.open()
    type === 2 && agreementPopup.value.close()
  }
  function backPage() {
    uni.navigateBack();
  }
  
  function switchTab(item){
    tabIndex.value = item
  }
  function switchTime(index) {
    curTimeIndex.value = index
  }
  
  
</script>

<style scoped lang="scss">
  .common-header {
    background-color: #ffffff;
    .tips {
      position: absolute;
      right: 40rpx;
      display: flex;
      align-items: center;
      text {
        font-family: MiSans, MiSans;
        font-weight: 400;
        font-size: 28rpx;
        color: #000000;
        line-height: 32rpx;
        margin-right: 8rpx;
      }
      image {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
  .common-popup {
    width: 96vw;
    border-radius: 30rpx;
    position: relative;
    .close {
      width: 48rpx;
      height: 48rpx;
      position: absolute;
      right: 28rpx;
      top: 58rpx;
      z-index: 10;
    }
  }
  .wrapper {
    padding: 24rpx 20rpx;
    font-family: 'MiSans';
    .wrapper-profit {
      padding: 32rpx;
      width: 100%;
      height: 400rpx;
      background: url('@/static/image/profit-bg.jpg') no-repeat;
      background-size: 100% 100%;
      display: flex;
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
        width: 50%;
        .tit {
          font-family: 'MiSans';
          font-weight: 400;
          font-size: 28rpx;
          color: rgba(255,255,255,0.8);
          line-height: 32rpx;
        }
        .list {
          margin-top: 16rpx;
          padding-top: 32rpx;
          width: 312rpx;
          height: 200rpx;
          background: rgba(255,255,255,0.2);
          text-align: center;
          border-radius: 10rpx;
          &.list-1 {
            margin-right: 22rpx;
          }
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
  }
  .tablist {
    margin-top: 48rpx;
    // height: 52rpx;
    position: relative;
    .tab-box {
      display: flex;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
    }
    .text1 {
      width: 50%;
      text-align: center;
      color: rgba(0,0,0,.3);
      font-weight: 400;
      font-size: 32rpx;
      color: #8F9AAB;
      line-height: 38rpx;
      position: relative;
      
      &::after{
        content: '';
        position: absolute;
        bottom: -10rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 60rpx;
        height: 8rpx;
        background: #22C0FF;
        border-radius: 4rpx;
        opacity: 0;
      }
      &.active {
        color: #000000;
        font-weight: 500;
        &::after{
          content: '';
          opacity: 1;
        }
      }
    }
    .line {
      display: block;
      position: absolute;
      left: 5%;
      bottom: 0;
      width: 40rpx;
      height: 8rpx;
      background-color: #22C0FF;
      transition: all .1s;
    }
  }
  .wrapper-list {
    margin-top: 24rpx;
    .box {
      margin-bottom: 24rpx;
      padding: 24rpx 32rpx;
      width: 100%;
      height: 128rpx;
      background: #ffffff;
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
      background-color: #ffffff;
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
</style>