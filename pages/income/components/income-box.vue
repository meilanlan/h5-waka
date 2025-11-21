<template>
  <view>
    <view :class="['wrapper-profit', 'wrapper-profit-'+props.source]">
      <view class="list-box">
        <view class="tit">今日总收益(嗨币)</view>
        <view class="price" @click="toIncomeDetail(1)">
          <text>{{profitData.hi_coin.day_num}}</text>
          收益明细
          <image src="@/static/image/next-1.png"></image>
        </view>
        <view class="list list-1">
          <view class="text">收益嗨币</view>
          <view class="num">{{profitData.hi_coin.num}}</view>
          <view class="btn" @click="toExchange">去结算</view>
        </view>
      </view>
      <view class="list-box">
        <view class="tit">当月累计收入(嗨币)</view>
        <view class="price" @click="toIncomeDetail(2)">
          <text>{{profitData.hi_coin.month_num}}</text>
          收益明细
          <image src="@/static/image/next-1.png"></image>
        </view>
        <view class="list">
          <view class="text">嗨豆数量</view>
          <view class="num">{{profitData.hi_dou.num}}</view>
          <view class="btn" @click="toWithdrawal">去提现</view>
        </view>
      </view>
    </view>
    <view class="tablist">
      <view class="tab-box">
        <text :class="['text1', tabIndex===item?'active':'']" v-for="(item,index) in 2" :key="'tab-'+index" @click="switchTab(item)">{{item===1?'收益明细':'交易记录'}}</text>
      </view>
    </view>
   <view class="wrapper-list">
      <!-- 收益明细 -->
      <templat v-if="tabIndex===1">
        <slot name="profitDetailSlot"></slot>
      </templat>
      <!-- 交易记录 -->
      <tradeDetail :boxstyle="props.source==='group'?{backgroundColor: '#F0F3F8'}:{}" :rangeObject="rangeObject" v-else></tradeDetail>
    </view>
  </view>
</template>

<script setup>
  import {ref,nextTick, reactive} from 'vue'
  import {onShow} from '@dcloudio/uni-app'
  import {myProfitApi} from '@/service/income/index.js'
  // import myProfitGroups from './my-profit-groups.vue'
  import tradeDetail from './trade-detail.vue'
  import {getRecentWeekRange,getRecentMonthRange,getRecentThreeMonthsRange} from '@/unit/common.js'
  
  const rangeObject = {
    0: {start_time: '2025-01-01 00:00:00',end_time: ''},
    1: {start_time: getRecentWeekRange().start+' 00:00:00',end_time: getRecentWeekRange().end+' 23:59:59'},
    2: {start_time: getRecentMonthRange().start+' 00:00:00',end_time: getRecentMonthRange().end+' 23:59:59'},
    3: {start_time: getRecentThreeMonthsRange().start+' 00:00:00',end_time: getRecentThreeMonthsRange().end+' 23:59:59'},
  }
  
  const props = defineProps({
    source: String,
    group_id: {
      type: Number,
      dafaut: 0
    }
  })
  
  const profitData = reactive({
    hi_coin: {
      num:0,
      month_num:0,
      day_num:0
    },
    hi_dou: {num:0}
  })
  const tabIndex = ref(1)
  
  function switchTab(item){
    tabIndex.value = item
  }
  
  function getMyProfit(){
    myProfitApi({},res=>{
      if (~~res.code === 0) {
        profitData.hi_coin = res.data.hi_coin||[]
        profitData.hi_dou = res.data.hi_dou||[]
      }else {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
      }
    })
  }
  
  function toIncomeDetail(type){
    uni.navigateTo({
     url: '/pages/income/profitDetail?show_title=0&day='+type
    });
  }
  
  function toExchange(){
    //去结算：兑换嗨豆
    uni.navigateTo({
     url: '/pages/income/settlement?show_title=0&hiIcon='+profitData.hi_coin.num
    });
  }
  function toWithdrawal(){
    //去提现
    uni.navigateTo({
     url: `/pages/income/wathdrawal?show_title=0&group_id=${props.group_id||0}`
    });
  }
  onShow(()=>{
    getMyProfit()
  })
</script>

<style lang="scss" scoped>
  .wrapper-profit {
    padding: 32rpx;
    width: 100%;
    height: 400rpx;
    background: url('@/static/image/profit-bg.jpg') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    border-radius: 24rpx;
    .price {
      margin-top: 40rpx;
      display: flex;
      align-items: flex-end;
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
      .tit {
        // font-family: 'MiSans';
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
    &.wrapper-profit-group {
      .list-box { 
        .list {
          width: 300rpx;
        }
      }
    }
  }
  .tablist {
    margin-top: 24rpx;
    position: relative;
    .tab-box {
      height: 88rpx;
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
        font-family: 'MiSans-Medium', 'PingFang SC-Medium';
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
    margin-top: 12rpx;
  }
</style>