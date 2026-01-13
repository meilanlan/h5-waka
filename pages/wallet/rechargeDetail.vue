<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="充值明细" @backPage="backPage"></myCustomNavbar>
    <view class="time-list">
      <view :class="['box', curTimeIndex===index&&'active']" v-for="(item,index) in timeList" :key="index" @click="switchTime(index)">
        {{item}}
      </view>
    </view>
    <scroll-view class="xuqiu-list" scroll-y scrollY="true" @scrolltolower="onReachBottom">
      <view class="box-list" v-for="item in list" :key="item.order_id">
        <view class="left">
          <image class="icon" :src="item.channel===1?apple:item.channel===2?zfb:wx"></image>
          <view class="info">
            <view class="name">
              {{item.channel === 1?'苹果支付':item.channel === 2?'支付宝支付':'微信支付'}}
            </view>
            <view class="time" v-if="item.pay_time>0">
              {{getDateTime(item.pay_time*1000)}}
            </view>
            <view class="time" v-else>
              {{item.status!=2&&'支付失败'}}
            </view>
          </view>
        </view>
        <view class="right">
          ¥{{item.price}}
        </view>
      </view>
      <view class="common-empty" v-if="!list.length">
        <image src="@/static/image/empty.png" mode=""></image>
        暂无数据~
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
  import {ref, nextTick, reactive} from 'vue'
  import {onLoad} from '@dcloudio/uni-app'
  import {rechargeOrderApi} from '@/service/wallet/index.js'
  import {getDateTime} from '@/components/uni-datetime-picker/components/uni-datetime-picker/util.js'
  import wx from '@/static/image/wx-1.png'
  import zfb from '@/static/image/zfb-1.png'
  import apple from '@/static/image/recharge-1.png'
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  import {getRecentWeekRange,getRecentMonthRange,getRecentThreeMonthsRange} from '@/unit/common.js'
  const rangeObject = {
    0: {start_time: '2025-01-01 00:00:00',end_time: ''},
    1: {start_time: getRecentWeekRange().start+' 00:00:00',end_time: getRecentWeekRange().end+' 23:59:59'},
    2: {start_time: getRecentMonthRange().start+' 00:00:00',end_time: getRecentMonthRange().end+' 23:59:59'},
    3: {start_time: getRecentThreeMonthsRange().start+' 00:00:00',end_time: getRecentThreeMonthsRange().end+' 23:59:59'},
  }
  
  const timeList = ref(['全部','最近1周','最近1个月','最近3个月'])
  const curTimeIndex = ref(0)
  const list = ref([])
  const searchData = reactive({
    page_id: 1,
  })
  const total = ref(0)
  function backPage() {
    uni.navigateBack();
  }
  function onRefresherRefresh(){
    searchData.page_id = 1
    list.value = []
    getRechargeOrder()
  }
  
  function onReachBottom(){
    if(list.value.length<total.value) {
      getRechargeOrder()
    }
  }
  
  function switchTime(index) {
    curTimeIndex.value = index
    searchData.page_id = 1
    getRechargeOrder()
  }
  function getRechargeOrder(){
    uni.showLoading()
    let param = {
      type: 'normal',
      ...searchData,
      ...rangeObject[curTimeIndex.value]
    }
    rechargeOrderApi(param,res=>{
      if (res.code === 0) {
        if(searchData.page_id === 1) {
          list.value = res.data.items || []
          total.value = res.data.total
        } else {
          list.value = [...list.value,...res.data.items]
        }
        searchData.page_id++
        uni.hideLoading()
      } else{
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        uni.hideLoading()
      }
    })
  }
  onLoad(option=>{
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            getRechargeOrder()
        });
    })
  })
  
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 112rpx 20rpx 24rpx;
    background-color: #F0F3F8;
  }
  .time-list {
    margin-bottom: 24rpx;
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
      background-color: #ffffff;
      &:last-of-type {
        margin-right: 0;
      }
      &.active {
        background-color: #22C0FF;
        color: #ffffff;
      }
    }
  }
  .box-list {
      margin-bottom: 24rpx;
      padding: 24rpx;
      width: 100%;
      height: 128rpx;
      background: #ffffff;
      border-radius: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >*{
        flex-shrink: 0;
      }
      .left {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 24rpx;
          width: 80rpx;
          height: 80rpx;
        }
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
      }
      .right {
        font-weight: 500;
        font-size: 32rpx;
        color: #22C0FF;
        line-height: 40rpx;
      }
  }
  .xuqiu-list {
    height: calc(100vh - 304rpx);
  }
  .common-header {
    background-color: #ffffff;
  }
</style>