<template>
  <myCustomNavbar
    :navBg="navbarBgImg" 
    backIcon="../../static/image/btn_back_white.png" 
    :navBgStyle="{height: '252rpx'}" 
    @backPage="backPage"
  >
    <template v-slot:leftTitle>
      <view class="tab-box">
        <view :class="['box',curTab===item&&'active']" v-for="item in 2" :key="'box-'+item" @click="switchTab(item)">{{item===1?'收到的福袋':'发出的福袋'}}</view>
        <view class="line" :style="{left: curTab===1?'50rpx':'240rpx'}"></view>
      </view>
    </template>
  </myCustomNavbar>
</template>

<script setup>
  import {ref} from 'vue'
  import myCustomNavbar from '../../components/myCustomNavbar.vue'
  import navbarBgImg from '@/static/image/luckybag-tit.png'
  
  const curTab = ref(1)
  
  function switchTab(item){
    curTab.value = item
  }
  
  function backPage() {
    window.client.closeWebview()
  }
</script>

<style lang="scss" scoped>
  .tab-box {
    position: absolute;
    left: 104rpx;
    top: 0;
    width: 352rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box {
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(255,255,255,0.6);
      &.active {
        color: #ffffff;
        font-weight: 600;
      }
    }
    .line {
      position: absolute;
      bottom: 12rpx;
      width: 60rpx;
      height: 8rpx;
      background: #FFFFFF;
      border-radius: 4rpx;
      transition: left .2s;
    }
  }
</style>