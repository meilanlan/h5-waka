<template>
  <view class="wrapper">
    <myCustomNavbar :navStyle="{background:'#ffffff',color:'#000000'}" title="Whack VIP会员服务协议" @backPage="backPage" />
    <vipAgreementX :noTit="true"></vipAgreementX>
  </view>
</template>

<script setup>
  import myCustomNavbar from '@/components/myCustomNavbar.vue'
  import vipAgreementX from '../robotAccount/components/vip-agreement-x.vue'
  
  function backPage() {
    window.client.closeWebview()
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    padding: 88rpx 32rpx;
    background-color: #ffffff;
  }
</style>