<template>
  <!-- 嗨币充值 -->
  <view class="wrapper">
    <!-- <pay-x :haib="userInfo.data.haib" @updateInfo="updateInfo"></pay-x> -->
    <!-- <uni-popup ref="payPopup" type="bottom" :is-mask-click="false" :safe-area="false"  background-color="#ffffff" @maskClick="closePopup">
      <view class="common-popup"> -->
      <!-- </view>
    </uni-popup> -->
    <view class="mask" @click="closePopup"></view>
    <!-- <view :class="['wrapper-bottom', show&&'active']"> -->
    <view class="wrapper-bottom">
      <pay-x :haib="userInfo.data.haib" @updateInfo="updateInfo" @openAgreement="openAgreement"></pay-x>
    </view>
    
    
    <!-- 嗨币用户协议 -->
    <uni-popup ref="agreementPopup" type="center">
      <view class="common-popup">
        <image @click="openAgreement(2)" class="close" src="/static/image/close.png"></image>
        <userReachargeAgreement></userReachargeAgreement>
      </view>
    </uni-popup>
      
  </view>
</template>

<script setup>
  import {ref,onMounted,nextTick, reactive,provide} from 'vue'
  import uniPopup from '@/components/uni-popup/components/uni-popup/uni-popup.vue'
  import payX from '../../components/pay-x/pay-x.vue';
  import {userProfileApi} from '@/service/robotAccount/index.js'
  import userReachargeAgreement from '../../pages/robotAccount/components/user-reacharge-agreement.vue'
  
  const agreementPopup = ref(null)
  const show = ref(false)
  const userInfo = reactive({data:{
    haib: {}
  }})
  provide('parentGroupInfo', {group_id:0})
  
  function openAgreement(type){
    type === 1 && agreementPopup.value.open()
    type === 2 && agreementPopup.value.close()
  }
  
  function closePopup(){
    window.client.closeWebview()
  }
  
  function updateInfo(){
    getHiMoney()
    // window.client.closeWebview()
  }
  
  function getHiMoney(){
    // uni.showLoading()
    userProfileApi({group_id: 0,channel:window.isiOS?'ios':'android'}, res => {
      if (res.code === 0) {
        userInfo.data = res.data
        // uni.hideLoading()
      } else{
        uni.showToast({
          title: res.msg,
          icon: 'none'
        });
        // uni.hideLoading()
      }
      show.value = true
    })
  }
  
  onMounted(()=>{
    // payPopup.value.open()
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            getHiMoney()
        });
    })
  })
  
</script>

<style lang="scss" scoped>
 @import url('@/common/body.css');
  .wrapper {
    // padding: 32rpx;
    width: 100vw;
    height: 100vh;
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0);
      z-index: 2;
    }
    .wrapper-bottom {
      min-height: 780rpx;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #ffffff;
      padding: 32rpx;
      border-radius: 24rpx 24rpx 0 0;
      z-index: 99;
      // transform: translateY(99999px);
      // &.active {
      //   transform: translateY(0);
      //   transition: transform .4s;
      // }
    }
  }
  .common-popup {
    width: 92vw;
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