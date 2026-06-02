<template>
  <view class="wrapper" @click="acceptInvite">
    <image class="bg" src="/static/image/kings/bg-1.jpg" mode=""></image>
  </view>
</template>

<script setup>
  import {ref,reactive,onMounted} from 'vue'
  onMounted(()=>{
    const appPage = document.getElementById('app');
    if (appPage) {
      appPage.style.paddingTop = 0;
    }
  })
  
  function acceptInvite(){
    window.location.href = 'https://h5.nes.smoba.qq.com/pvpesport.next.user/views/match/match-detail-index?childid=76323602&adtag=wxsharechat'
  }
</script>

<style scoped>
  .wrapper {
    width: 100vw;
    position: relative;
    
  }
  .bg {
    width: 100vw;
    height: 1456rpx;
  }
</style>