<template>
  <view class="content">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="我的钱包" @backPage="backPage"></myCustomNavbar>
    <view class="wrapper-cont">
      <view class="wrapper-cont-components" v-if="infoFlag">
        <myWallet :source="'user'" :luckyBag="userInfo.data.lucky_bag" :redPackage="userInfo.data.red_package" :haib="userInfo.data.haib" :wallet="userInfo.data.wallet" :robotInfo="{group_id:0}" @updateProfile="getUserProfile"></myWallet>
       <!-- <view class="bill" @click="toPage('/pages/wallet/rechargeDetail')">
          <view class="left">
            <image src="@/static/image/recharge.png"></image>充值明细
          </view>
          <image class="right" src="@/static/image/next.png"></image>
        </view> -->
        <!-- <view class="bill" @click="toPage('/pages/wallet/renewal')">
          <view class="left">
            <image src="@/static/image/renewal.png"></image>续订管理
          </view>
          <image class="right" src="@/static/image/next.png"></image>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script setup>
  import {ref, nextTick, reactive,provide} from 'vue'
  import {onShow} from '@dcloudio/uni-app'
  import myWallet from '../robotAccount/components/my-wallet.vue'
  import {userProfileApi} from '@/service/robotAccount/index.js'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  
  const userInfo = reactive({data:{}})
  const infoFlag = ref(false)
  provide('parentGroupInfo', {group_id:0})
  
  function backPage() {
    window.client.closeWebview()
  }
  // function toPage(url){
  //   uni.navigateTo({
  //   	url: url+'?show_title=0'
  //   });
  // }
  
  function getUserProfile(){
    uni.showLoading()
    
    userProfileApi({group_id: 0,channel:window.isiOS?'ios':'android'}, res => {
      if (res.code === 0) {
        userInfo.data = res.data
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
 
  onShow(()=>{
    nextTick(()=>{
        window.client.getUserinfo((res) => {
            getUserProfile()
        });
    })
  })
  
  
</script>

<style lang="scss" scoped>
  .content {
    padding-top: 88rpx;
    min-height: 100vh;
    // background-color: #ffffff;
    
    .wrapper-cont {
      position: relative;
      :deep .wrapper-cont-components {
        // background-color: #ffffff;
        border-radius: 20rpx;
        padding: 24rpx 32rpx 32rpx;
        .wallet-box{
          margin-top: 0;
        
          .bill {
            background-color: #ffffff;
          }
        }
      }
      .bill {
        background-color: #ffffff;
        padding: 0 32rpx;
        margin-top: 32rpx;
        width: 100%;
        height: 120rpx;
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
  }
</style>