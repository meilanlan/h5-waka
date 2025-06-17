<template>
  <view class="wrapper">
    <view class="wrapper-profit">
      <view class="title">
        <text class="left">今日总收益(嗨币)</text>
        <view class="why-box" @click="openAgreement(1)">
          <text>提现协议</text>
          <image src="../../../static/image/why.png"></image>
        </view>
      </view>
      <view class="price" @click="toPage(1)">
        <text>{{incomeInfo.data.today_haib}}</text>
        收益明细
        <image src="../../../static/image/next-1.png"></image>
      </view>
      <view class="list-box">
        <view class="list">
          <view class="text">持有嗨币</view>
          <view class="num">{{incomeInfo.data.hold_haib}}</view>
          <view class="btn" @click="toPage(2)">去结算</view>
        </view>
        <view class="list">
          <view class="text">嗨豆数量</view>
          <view class="num">{{incomeInfo.data.hold_haid}}</view>
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
      <view class="box" v-for="(item, index) in incomeInfo.data.list" :key="'index-'+index">
        <view class="left">
          <view class="name">{{item.order_status}}</view>
          <view class="time">{{item.order_desc}}</view>
        </view>
        <view class="right">{{item.order_num}}</view>
      </view>
    </view>
    
    <!-- 提现协议 -->
    <uni-popup ref="agreementPopup" type="center">
      <view class="common-popup">
        <image @click="openAgreement(2)" class="close" src="/static/image/close.png"></image>
        <profit-agreement-x-vue></profit-agreement-x-vue>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref,reactive, inject} from 'vue'
  import {groupIncomeApi} from '@/service/robotAccount/index.js'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import profitAgreementXVue from './profit-agreement-x.vue'
  
  const timeList = ref(['全部','最近1周','最近1个月','最近3个月'])
  const curTimeIndex = ref(0)
  const parentInfo = reactive(({data:{}}))
  parentInfo.data = inject('parentGroupInfo')
  const incomeInfo = reactive({data:{}})
  const agreementPopup = ref(null)
  getIncome()
  function getIncome(){
    uni.showLoading()
    groupIncomeApi({group_id: parentInfo.data.group_id}, res => {
      if (res.code === 0) {
        incomeInfo.data = res.data.income
        uni.hideLoading()
      } else if (res.code === -20001) {
        // uni.showToast({
        //   title: '登录失效，请重新登录',
        //   icon: 'none'
        // });
        clearAdminToken()
        uni.hideLoading()
      } else {
        if (res.code != -10002){
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
        } else {
          uni.hideLoading()
          if (JSON.stringify(dataSummary.data)== "{}") {
            uni.showLoading({
              title: "小嗨正在努力加载中...",
              icon: 'none'
            })
            setTimeout(()=>{
              getGroupSummaryInfo()
            },3000)
          }
          
        }
      }
    })
  }
  
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
  
  function openAgreement(type){
    type === 1 && agreementPopup.value.open()
    type === 2 && agreementPopup.value.close()
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
    background: url('../../../static/image/profit-bg.jpg') no-repeat;
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
</style>