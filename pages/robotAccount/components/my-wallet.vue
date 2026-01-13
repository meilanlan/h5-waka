<template>
  <view class="wallet-box">
    <view class="wallet">
      <view class="title">我的嗨币</view>
      <view class="info">
        <view class="left">
          <image src="../../../static/image/home-4.png" mode=""></image>
          <text>{{props.haib.banlance}}</text>
        </view>
        <view class="right" @click="openPayHi">去充值</view>
      </view>
      <view class="wallet-bottom wallet-bottom-1">
        <view class="box" @click="toPage('/pages/wallet/rechargeDetail?show_title=0')">充值明细</view>
        <view class="line"></view>
        <view class="box" @click="toPage(`/pages/wallet/myBill?accountId=1&group_id=${props.robotInfo.group_id}&show_title=0`)">支付明细</view>
      </view>
    </view>
    <template v-if="source==='user'">
      <view class="wallet wallet-2">
        <view class="title">我的福袋</view>
        <view class="info">
          <view class="left">
            <image src="../../../static/image/icon_lucky.png" mode=""></image>
            <text>{{props.haib.banlance}}</text>
          </view>
          <view class="right" @click="openPayHi">去提现</view>
        </view>
        <view class="wallet-bottom">
          <view class="box">
            <!-- <view class="num">{{props.wallet.energy}}</view> -->
            <view class="text">收到福袋</view>
          </view>
          <view class="line"></view>
          <view class="box">
            <!-- <view class="num">{{props.wallet.yuanqi}}</view> -->
            <view class="text">发出福袋</view>
          </view>
          <view class="line"></view>
          <view class="box">
            <!-- <view class="num">{{props.wallet.charm}}</view> -->
            <view class="text">福气袋</view>
          </view>
        </view>
      </view>
      <view class="wallet wallet-3">
        <view class="title">我的红包</view>
        <view class="info">
          <view class="left">
            <image src="../../../static/image/icon-red.png" mode=""></image>
            <text>{{props.haib.banlance}}</text>
          </view>
          <!-- <view class="right" @click="openPayHi">去充值</view> -->
        </view>
        <view class="wallet-bottom wallet-bottom-1">
          <view class="box" @click="toPage('/pages/wallet/rechargeDetail?show_title=0')">收到红包</view>
          <view class="line"></view>
          <view class="box" @click="toPage(`/pages/wallet/myBill?accountId=1&group_id=${props.robotInfo.group_id}&show_title=0`)">发出红包</view>
        </view>
      </view>
    </template>
    
    <!-- <view class="bill" @click="toPage">
      <view class="left">
        <image src="../../../static/image/bill.png"></image>账单
      </view>
      <image class="right" src="../../../static/image/next.png"></image>
    </view> -->
    
    <!-- 嗨币充值 -->
    <uni-popup ref="payPopup" type="bottom" :safe-area="false" background-color="#ffffff">
      <view class="common-popup">
        <pay-x :haib="props.haib" @updateInfo="updateInfo" @openAgreement="openAgreement"></pay-x>
      </view>
    </uni-popup>
    
    <!-- 嗨币用户协议 -->
    <uni-popup ref="agreementPopup" type="center">
      <view class="common-popup common-popup-agreement">
        <image @click="openAgreement(2)" class="close" src="/static/image/close.png"></image>
       <userReachargeAgreement></userReachargeAgreement>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import payX from '../../../components/pay-x/pay-x.vue';
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import userReachargeAgreement from './user-reacharge-agreement.vue'
  
  const payPopup = ref(null)
  const agreementPopup = ref(null)
  const props = defineProps({
    source: String,
    wallet: Object,
    haib: Object,
    robotInfo: Object
  })
  const emit = defineEmits(['updateProfile'])
  function openPayHi(){
    payPopup.value.open()
  }
  
  function openAgreement(type){
    type === 1 && agreementPopup.value.open()
    type === 2 && agreementPopup.value.close()
  }
  
  function updateInfo(data){
    //关闭弹窗并更新我的主页接口
    payPopup.value.close()
    emit('updateProfile')
  }
  function toPage(url){
    uni.navigateTo({
    	url: url
    });
  }
</script>

<style lang="scss" scoped>
  .wallet-box {
    margin-top: 32rpx;
    // font-family: 'MiSans';
    .wallet {
      margin-bottom: 24rpx;
      width: 100%;
      height: 274rpx;
      background: url('../../../static/image/wallet-bg.png') no-repeat;
      background-size: 100% 100%;
      position: relative;
      .title {
        padding: 32rpx 32rpx 0;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(255,255,255,0.8);
        line-height: 32rpx;
      }
      .info {
        margin: 36rpx 0 34rpx;
        padding: 0 32rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          text {
            font-weight: 700;
            font-size: 48rpx;
            color: #FFFFFF;
            line-height: 48rpx;
          }
        }
        image {
          margin-right: 16rpx;
          width: 56rpx;
          height: 56rpx;
        }
        .right {
          width: 124rpx;
          height: 64rpx;
          background: #FFFFFF;
          border-radius: 32rpx;
          line-height: 64rpx;
          text-align: center;
          font-weight: 500;
          font-size: 28rpx;
          color: #22C0FF;
        }
      }
      .wallet-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 84rpx;
        background: #59B8FF;
        border-radius: 0 0 24rpx 24rpx;
        display: flex;
        align-items: center;
        
        .line {
          width: 2rpx;
          height: 36rpx;
          background: rgba(255,255,255,0.4);
        }
        .box {
          // padding-top: 18rpx;
          width: 227rpx;
          text-align: center;
          font-size: 28rpx;
          color: #FFFFFF;
          // .num {
          //   font-weight: 700;
          //   color: #FFFFFF;
          //   line-height: 32rpx;
          // }
          .text {
            margin-top: 8rpx;
            font-weight: 400;
            // color: rgba(255,255,255,0.6);
            line-height: 32rpx;
          }
        }
        &.wallet-bottom-1 {
          justify-content: space-between;
          .box {
            width: 49%;
          }
        }
      }
      &.wallet-2 {
        background: url('../../../static/image/luckybag.png') no-repeat;
        background-size: 100% 100%;
        .right {
          color: #FF4A4A;
        }
        .wallet-bottom {
          background: #FF846C;
        }
      }
      &.wallet-3 {
        background: url('../../../static/image/redpackage.png') no-repeat;
        background-size: 100% 100%;
        .wallet-bottom {
          background: #FFBC6A;
        }
      }
    }
    .bill {
      padding: 0 32rpx;
      margin-top: 32rpx;
      width: 100%;
      height: 120rpx;
      background: #F0F3F8;
      border-radius: 24rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      image {
        width: 32rpx;
        height: 32rpx;
      }
      .left {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 32rpx;
        color: #000000;
        line-height: 40rpx;
        image {
          margin-right: 24rpx;
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
  .common-popup {
    height: auto;
  }
  .common-popup-agreement {
    width: 92vw;
    height: calc(100vh - 120px);
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