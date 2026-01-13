<template>
  <view class="my-home">
    <view class="my-home-info">
      <view class="my-info-bg">
        <image :src="userInfo.data.user.bg_img" mode="aspectFill"></image>
      </view>
      <view class="my-info">
        <image class="left" :src="userInfo.data.user.head_img || gender" mode="aspectFill"></image>
        <view class="right">
          <view class="name">
            <text class="nickname">{{userInfo.data.user.nick_name}}</text>
            <!-- <view class="grage"></view> -->
            <image v-for="(item,idx) in userInfo.data.user.ic_list" :key="idx" class="masonry" :src="item" mode="heightFix"></image>
          </view>
          <!-- <view class="icon-list">
            <image v-for="(item,idx) in userInfo.data.user.ic_list" :key="'ic'+idx" :src="item" mode="heightFix"></image>
          </view> -->
          <view class="ip">
            IP:{{userInfo.data.user.location}}<text>|</text>ID: {{userInfo.data.user.user_id}}<image @click="copyId(props.robotInfo.group_id)" class="copy" src="../../../static/image/copy.png" mode=""></image>
          </view>
        </view>
      </view>
    </view>
    
    <view class="tab-list">
      <div :class="['tab-box', curTabIndex=== index&&'active']" v-for="(item, index) in tabList" :key="'TAB'+index" @click="switchTab(item,index)">
        <image :src="item.iconUrl"></image>
        <view class="value">{{item.value}}</view>
      </div>
    </view>
    <template v-if="infoFlag===true">
      <!-- 能量助力 -->
      <energy-assist-x v-if="curTabIndex === 0" :energy="userInfo.data.energy" :haib="userInfo.data.haib" @updateEnergy="updateEnergy"></energy-assist-x>
      <!-- 我的钱包 -->
      <my-wallet v-else-if="curTabIndex === 1" :source="'group'" :haib="userInfo.data.haib" :wallet="userInfo.data.wallet" :robotInfo="props.robotInfo" @updateProfile="updateProfile"></my-wallet>
      <!-- 会员中心 -->
      <vip-center-x v-else-if="curTabIndex === 2" :vip="userInfo.data.vip"></vip-center-x>
      <!-- 嗨币充值 -->
      <view v-else class="pay-model">
        <pay-x :haib="userInfo.data.haib" @updateInfo="updateProfile" @openAgreement="openAgreement"></pay-x>
      </view>
    </template>
    
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
  import {ref,reactive,inject} from 'vue'
  import energyAssistX from './energy-assist-x.vue';
  import myWallet from './my-wallet.vue'
  import vipCenterX from './vip-center-x.vue';
  import payX from '../../../components/pay-x/pay-x.vue';
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import userReachargeAgreement from './user-reacharge-agreement.vue'
  import {userProfileApi} from '@/service/robotAccount/index.js'
  
  const boyHeadimg = new URL("@/static/image/boy.png", import.meta.url).href
  const girlHeadimg = new URL("@/static/image/girl.png", import.meta.url).href
  const props = defineProps({
    robotInfo: Object
  })
  const tabList = [
    {value: '能量助力',iconUrl: new URL("@/static/image/home-1.png", import.meta.url).href},
    {value: '我的钱包',iconUrl: new URL("@/static/image/home-2.png", import.meta.url).href},
    {value: '会员中心',iconUrl: new URL("@/static/image/home-3.png", import.meta.url).href},
    {value: 'Hi币充值',iconUrl: new URL("@/static/image/home-4.png", import.meta.url).href},
  ]
  const agreementPopup = ref(null)
  const infoFlag = ref(false)
  const curTabIndex = ref(0)
  const gender = ref(window.userinfo.user.gender===1?boyHeadimg:girlHeadimg)
  const userInfo = reactive({
    data: {
      energy: {},
      haib: {},
      user: {},
      vip: {},
      wallet: {}
    }
  })
  const parentInfo = inject('parentGroupInfo')
  
  function openAgreement(type){
    type === 1 && agreementPopup.value.open()
    type === 2 && agreementPopup.value.close()
  }
  
  function updateEnergy(data){
    //更新能量值
    userInfo.data.wallet.energy = data
  }
  
  function updateProfile(){
    //更新我的主页的内容
    getUserProfile()
  }
  
  function copyId(content){
    uni.setClipboardData({
    	data: content,
    	success: function () {
    		console.log('success');
    	}
    });
  }
  
  function switchTab(item, index) {
    curTabIndex.value = index
  }
  
  getUserProfile()
  
  function getUserProfile(){
    uni.showLoading()
    
    userProfileApi({group_id: parentInfo.group_id,channel:window.isiOS?'ios':'android'}, res => {
      if (res.code === 0) {
        userInfo.data = res.data
        if(!userInfo.data.user.bg_img) {
          userInfo.data.user.bg_img = 'https://waka-1311025102.cos.ap-shanghai.myqcloud.com/app/prod/cover/u_free_1.png'
        }
        infoFlag.value = true
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
  
  
</script>

<style lang="scss" scoped>
  .my-home {
    // font-family: 'MiSans';
    margin-top: 34rpx;
    padding: 0 32rpx;
    .my-home-info {
      position: relative;
      .my-info-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        image {
          width: 100%;
          height: 100%;
          border-radius: 20rpx;
        }
      }
    }
    .my-info {
      // background-color: #333333;
      padding: 30rpx 36rpx;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 10;
      >*{
        flex-shrink: 0;
      }
      .left {
        margin-right: 20rpx;
        width: 124rpx;
        height: 124rpx;
        border-radius: 20rpx;
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
          width: auto;
          height: 36rpx;
          &:first-of-type {
            height: 36rpx;
          }
        }
        .icon-list {
          margin-top: 18rpx;
          display: flex;
          align-items: center;
          image {
            margin-right: 10rpx;
            width: auto;
            height: 28rpx;
            // background: linear-gradient( 90deg, #FFC75D 0%, #EF4A2E 100%);
            // border-radius: 288rpx;
            // // border: 1px solid;
            // border-image: linear-gradient(270deg, rgba(255, 150.0000062584877, 75.00000312924385, 1), rgba(255, 243.15266132354736, 204.22566533088684, 1)) 1 1;
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