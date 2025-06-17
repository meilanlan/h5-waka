<template>
  <view class="header">
      <view class="left">嗨币充值</view>
      <view class="right">
        余额:{{props.haib.banlance}} <image src="../../static/image/home-4.png"></image>
      </view>
    </view>
    <view class="hi-list">
      <view :class="['hi-box', curIndex===index&&'active']" v-for="(item,index) in props.haib.list" :key="'hi'+index" @click="switchHi(item,index)">
        <view class="box">
          <image src="../../static/image/home-4.png" mode=""></image>
          <text>{{item.haib}}</text>
        </view>
        <view class="price">¥{{item.cash}}</view>
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
          <label class="uni-list-cell uni-list-cell-pd visibility-none">
              <view class="left">
                <image src="../../static/image/wx.png"></image>微信
              </view>
              <radio value="2" :checked="curPay === '2'" color="#22c0ff" />
          </label>
        </radio-group>
    </view>
    <view :class="['now-pay', curIndex!=-1&&'active']" @click="toPay">
      立即充值<text v-if="curIndex!=-1">{{props.haib.list[curIndex].cash}}元</text>
    </view>
    <view class="exp"  @click="openAgreement(1)">
      点击支付即代表同意 <text>《嗨币用户协议》</text>
    </view>
    
    <!-- 嗨币用户协议 -->
    <uni-popup ref="agreementPopup" type="center">
      <view class="common-popup">
        <image @click="openAgreement(2)" class="close" src="/static/image/close.png"></image>
       <user-agreement-x-vue></user-agreement-x-vue>
      </view>
    </uni-popup>
  
</template>

<script setup>
  import {ref,reactive,inject} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import userAgreementXVue from '../../pages/robotAccount/components/user-agreement-x.vue'
  import {alipayOrder} from '@/service/robotAccount/index.js'
  
  const props = defineProps({
    haib: Object
  })
  const parentInfo = reactive({data:{}})
  parentInfo.data = inject('parentGroupInfo')
  console.log(encodeURIComponent(window.location.origin+`/index.html#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=3&show_title=0`),'url')
  const agreementPopup = ref(null)
  
  // const hiList = ref([
  //   {id:1,price: 1,hi: 10},
  //   {id:2,price: 6,hi: 60},
  //   {id:3,price: 30,hi: 300},
  //   {id:4,price: 98,hi: 980},
  //   {id:5,price: 298,hi: 2980},
  //   {id:6,price: 588,hi: 5880},
  // ])
  const curPay = ref('1')
  const curPrice = ref(-1)
  const curIndex = ref(-1)
  const payLock = ref(false)
  
  function switchHi(item, index) {
    curIndex.value = index
    console.log(props.haib.list[index], 'jkjk')
  }
  
  function toPay(){
    if (payLock.value === false) {
      payLock.value = true
      uni.showLoading({mask: true})
      let returnUrl=encodeURIComponent(window.location.origin+`/index.html#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=3&show_title=0`)
      alipayOrder({prod_id: props.haib.list[curIndex.value].id,return_url:returnUrl}, res => {
        if (res.code === 0) {
          // location.href = res.data.request_params+'&redirect_url=' + encodeURIComponent(window.location.origin+`/index.html#/pages/robotAccount/robotDetail?group_id=${parentInfo.data.group_id}&pid=3&show_title=0`)
          location.href = res.data.request_params
          payLock.value = false
          uni.hideLoading()
        } else {
          payLock.value = false
          uni.showToast({
            title: res.msg,
            icon: 'none'
          });
          uni.hideLoading()
        }
      })
    }  
  }
  
  function radioChange(){
    
  }
  function openAgreement(type){
    type === 1 && agreementPopup.value.open()
    type === 2 && agreementPopup.value.close()
    
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