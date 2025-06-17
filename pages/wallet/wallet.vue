<template>
  <view class="content">
    <image class="bg" src="../../static/image/bg_wxq.jpg"></image>
    <view class="wrapper-cont">
      <view class="wrapper-cont-components">
        <my-wallet :haib="userInfo.haib" :wallet="userInfo.wallet" :robotInfo="userInfo.robotInfo"></my-wallet>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import myWallet from '../robotAccount/components/my-wallet.vue'
  
  let userInfo = {
    haib: {
      "banlance": 1000030,
      "list": [
          {
              "id": "3001",
              "cash": "0.01",
              "haib": "10"
          },
          {
              "id": "3002",
              "cash": "6.00",
              "haib": "60"
          },
          {
              "id": "3003",
              "cash": "30.00",
              "haib": "300"
          },
          {
              "id": "3004",
              "cash": "98.00",
              "haib": "980"
          },
          {
              "id": "3005",
              "cash": "298.00",
              "haib": "2980"
          },
          {
              "id": "3006",
              "cash": "588.00",
              "haib": "5880"
          }
      ]
    },
    wallet: {
      "energy": 138,
      "charm": 0,
      "yuanqi": 0
    },
    robotInfo:{
      
    }
  }
  
</script>

<style lang="scss" scoped>
  .content {
    min-height: 100vh;
    background-color: #ffffff;
    .bg {
      width: 100%;
      height: 460rpx;
      position: absolute;
      top: 0;
      left: 0;
    }
    .wrapper-cont {
      padding-top: 314rpx;
      position: relative;
      .wrapper-cont-components {
        background-color: #ffffff;
        border-radius: 20rpx;
        padding: 24rpx 32rpx 32rpx;
      }
    }
  }
</style>